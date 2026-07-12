import { useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

/*
 * "Liquid iridescence behind editorial silence" — a WebGL shader in the
 * monopo manner: domain-warped noise flowing like water. The palette leans
 * into Monet's lilies: ink -> pond green -> celadon -> blue lake -> sky blue ->
 * pink-lilac -> petal pink highlights. Renders at
 * half resolution (the texture is soft by nature), pauses off-screen, and
 * draws a single still frame under prefers-reduced-motion.
 */

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_dim;
// ring buffer of recent pointer samples: xy in uv space, z = birth time in
// seconds (negative = empty slot). Headings ride in a parallel array as unit
// vectors rather than angles — an angle would cost a sin and a cos per drop
// per fragment, which is 60 transcendentals a pixel at 30 slots.
uniform vec3 u_drops[30];
uniform vec2 u_dirs[30];
// smoothed cursor: xy in uv space, z = how hard the water is being stirred
uniform vec3 u_cursor;
// current heading, normalised — the axis the blade is travelling along
uniform vec2 u_vel;
// 1 while any ring is still alive. Branching on a uniform is coherent across
// every fragment, so this genuinely skips the loop rather than masking it —
// without it an idle visitor pays for 30 dead rings on every pixel, forever.
uniform float u_live;

// Two separate fields do the work. The rings propagate — they're the part that
// spreads across the pond. The stir is continuous and stays under the cursor —
// it's the hand actually in the water, and it never pops because it isn't
// made of discrete events.
// Heavy water: waves crawl outward, damp hard with both age and distance, and
// never travel far from the cut. Viscosity is mostly SPEED and SPREAD — a low
// speed keeps the disturbance near the blade, a high spread kills it as it goes.
const float RIPPLE_LIFE   = 2.2;   // seconds a ring survives
const float RIPPLE_SPEED  = 0.20;  // wavefront travel, p-space units per second
const float RIPPLE_FREQ   = 34.0;  // wave count across a p-space unit
const float RIPPLE_WIDTH  = 260.0; // gaussian tightness — high keeps the ring thin
const float RIPPLE_DECAY  = 0.85;  // damps quickly with age, as thick liquid does
const float RIPPLE_SPREAD = 2.20;  // and hard with distance, so it stays local
const float RIPPLE_AMP    = 0.020; // amplitude is independent of ring thickness —
                                   // WIDTH keeps it thin, this keeps it readable

const float STIR_TIGHT = 95.0;  // radius of the hand — high keeps it local
const float STIR_CURL  = 1.00;  // tangential vs radial — the curl is what mixes
const float STIR_AMP   = 0.055; // stir strength at full grip
// Mixing is driven by how far the three noise channels shear APART, not by how
// far the water moves — so these can be pushed without adding visible motion.
const float MIX_SPLIT = 0.15;   // pigment channels pull against each other
const float MIX_PERP  = 1.10;   // ...and across each other, which is the shear
const float MIX_LUMA  = 0.70;   // luminance rides its own axis too, so bright and
                                // dark land on pigments they otherwise never meet
// Shear-based mixing scales with displacement, so calm water can only ever mix
// a little — the two goals fight. This bleeds the pigment channels into each
// other's ranges directly instead, which blends hue without moving anything.
const float MIX_BLEED = 1.00;
// Bleeding costs no displacement, so its radius doesn't have to obey the
// viscosity budget — it reaches wider than the hand, letting colour blend over
// a readable area while the water itself stays heavy and local.
const float BLEED_TIGHT = 34.0;

// the pointer is a blade, not a ball. Both the rings and the hand are measured
// in a frame aligned to travel: stretched along the heading, tight across it.
const float CUT_ELONG   = 2.6;  // ring elongation along the heading
const float CUT_SHARP   = 0.75; // how hard waves favour sideways over fore/aft
const float BLADE_ELONG = 2.2;  // same stretch applied to the hand itself
const float STIR_BOW    = 0.90; // water shoved forward along the heading

// sinless hash (Dave Hoskins) — sin-based hashes collapse on ANGLE/D3D
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;
  float aspect = u_res.x / u_res.y;
  p.x *= aspect;
  p *= 0.9;

  // sum the live rings. Masked arithmetic rather than continue/break: ANGLE
  // unrolls these loops onto D3D and early-outs are where it miscompiles.
  // The one branch that IS safe is on a uniform — every fragment agrees on it,
  // so an untouched surface skips the whole loop instead of summing 30 zeroes.
  vec2 wake = vec2(0.0);
  if (u_live > 0.5) {
  for (int i = 0; i < 30; i++) {
    vec3 d = u_drops[i];
    float age = u_time - d.z;
    float live = step(0.0, d.z) * step(0.0, age);
    // u_dirs carries heading AND pace: its length is how fast the blade was
    // moving when this ring was cut, so each ring propagates at the speed that
    // made it. A fast stroke throws quick waves, a slow one leaves sluggish ones.
    vec2 dv = u_dirs[i];
    float pace = length(dv);
    vec2 md = dv / max(pace, 1e-4);       // heading at the moment of the cut
    vec2 mp = vec2(-md.y, md.x);          // across the cut
    vec2 off = p - vec2(d.x * aspect, d.y) * 0.9;
    float raw = length(off);
    vec2 dir = off / max(raw, 1e-4);      // guard: off is 0 at the cut itself

    // measure in the blade's own frame — stretched along the heading, so the
    // wavefront is an ellipse drawn out along the stroke, not a circle
    float dist = length(vec2(dot(off, md) / CUT_ELONG, dot(off, mp)));
    float front = dist - RIPPLE_SPEED * pace * age;
    float ring = sin(front * RIPPLE_FREQ) * exp(-front * front * RIPPLE_WIDTH);
    // a blade throws water sideways, barely fore and aft
    float lobe = mix(1.0, abs(dot(dir, mp)), CUT_SHARP);
    // ease each ring in and out; hard edges at birth and death are what read
    // as stutter when the pointer is crawling
    float birth = smoothstep(0.0, 0.10, age);
    float death = 1.0 - smoothstep(RIPPLE_LIFE * 0.55, RIPPLE_LIFE, age);
    float atten = exp(-age * RIPPLE_DECAY) / (1.0 + RIPPLE_SPREAD * dist);
    wake += dir * ring * lobe * birth * death * atten * live;
  }
  }

  // the hand: radial push, tangential curl, and a bow wave along the heading.
  // Radial alone only compresses the pigment bands — the curl is what shears
  // them past each other, and the bow is what makes motion read as cutting.
  vec2 toC = p - vec2(u_cursor.x * aspect, u_cursor.y) * 0.9;
  vec2 vp = vec2(-u_vel.y, u_vel.x);
  float cd = length(vec2(dot(toC, u_vel) / BLADE_ELONG, dot(toC, vp)));
  vec2 cdir = toC / max(length(toC), 1e-4);
  float grip = clamp(u_cursor.z, 0.0, 1.0);
  vec2 stir = (cdir * 0.35 + vec2(-cdir.y, cdir.x) * STIR_CURL + u_vel * STIR_BOW)
            * exp(-cd * cd * STIR_TIGHT) * grip * STIR_AMP;

  vec2 flow = wake * RIPPLE_AMP + stir;

  float t = u_time * 0.05;

  // water-like motion: two nested domain warps drifting at different speeds.
  // q and r read the field along *different axes* — pr takes a perpendicular
  // component, so the two pigment channels shear past each other instead of
  // sliding together as one rigid pattern. That shear is the mixing: a small
  // lag only smears the bands, but crossing them produces pigment combinations
  // the undisturbed field never makes.
  vec2 flowPerp = vec2(-flow.y, flow.x);
  vec2 pq = p + flow;
  vec2 pr = p - flow * MIX_SPLIT + flowPerp * MIX_PERP;
  vec2 pf = p + flow * MIX_LUMA - flowPerp * 0.30;
  vec2 q = vec2(
    fbm(pq + t * vec2(0.55, 0.32)),
    fbm(pq + vec2(5.2, 1.3) - t * 0.4));
  vec2 r = vec2(
    fbm(pr + 3.2 * q + vec2(1.7, 9.2) + t * 0.45),
    fbm(pr + 3.2 * q + vec2(8.3, 2.8) - t * 0.3));
  float f = fbm(pf + 3.0 * r);

  // Nymphéas pigments — Monet layers hues side by side, so the water and
  // mid bands each blend two pigments driven by separate noise channels
  // (q, r) rather than following a single luminance ramp.
  vec3 ink         = vec3(0.012, 0.018, 0.028);
  vec3 pond        = vec3(0.08, 0.49, 0.36);
  vec3 celadon     = vec3(0.26, 0.70, 0.54);
  vec3 blueLake    = vec3(0.18, 0.45, 0.73);
  vec3 skyBlue     = vec3(0.42, 0.64, 0.88);
  vec3 pinkLilac   = vec3(0.82, 0.58, 0.72);
  vec3 petal       = vec3(0.93, 0.73, 0.80);
  vec3 cream       = vec3(0.95, 0.92, 0.84);
  vec3 coal        = vec3(0.0, 0.0, 0.0);

  // Pigment exchange under the blade: each band takes on some of the other's
  // distribution, so pond/celadon and lake/sky bleed into ranges they never
  // occupy on their own. Costs no displacement, so the water stays heavy.
  float bleed = exp(-cd * cd * BLEED_TIGHT) * sqrt(grip) * MIX_BLEED;
  float rx = mix(r.x, q.x, bleed);
  float qx = mix(q.x, r.x, bleed);

  vec3 waterBand = mix(pond, celadon, smoothstep(0.26, 0.74, rx));
  vec3 midw      = mix(blueLake, skyBlue, smoothstep(0.28, 0.72, qx));

  vec3 col = mix(ink, waterBand, smoothstep(0.12, 0.38, f));
  col = mix(col, midw,   smoothstep(0.42, 0.60, f));
  col = mix(col, pinkLilac, smoothstep(0.60, 0.78, f));
  col = mix(col, petal,   smoothstep(0.76, 0.92, f) * 0.84);
  col = mix(col, cream,   smoothstep(0.84, 0.98, f) * 0.42);
  col = mix(col, coal, smoothstep(0.18, 0.66, 1.0 - f) * 0.44);
  // dark valleys (edges must be ascending — reversed edges are UB)
  col = mix(col, ink, (1.0 - smoothstep(0.10, 0.30, f)) * 0.82);

  col *= u_dim * 0.86;

  // gentle vignette settles the light back into the page ink
  vec2 c = uv - 0.5;
  col *= 1.0 - dot(c, c) * 0.92;
  col = mix(col, coal, smoothstep(0.18, 0.88, dot(c, c)) * 0.22);

  gl_FragColor = vec4(col, 1.0);
}`

interface LiquidIridescenceProps {
  className?: string
  /** exposure multiplier, 0–1 — lower where text must stay sovereign */
  dim?: number
  /** extra ink scrim over the canvas for long-form reading sections */
  scrim?: boolean
  /** cursor wake — false leaves the surface unreactive to the pointer */
  ripples?: boolean
}

export function LiquidIridescence({
  className,
  dim = 0.8,
  scrim = false,
  ripples = true,
}: LiquidIridescenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', {
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
    if (!gl) return // no WebGL: the ink background simply stays

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_res')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uDim = gl.getUniformLocation(program, 'u_dim')
    const uDrops = gl.getUniformLocation(program, 'u_drops')
    const uCursor = gl.getUniformLocation(program, 'u_cursor')
    const uDirs = gl.getUniformLocation(program, 'u_dirs')
    const uVel = gl.getUniformLocation(program, 'u_vel')
    const uLive = gl.getUniformLocation(program, 'u_live')
    gl.uniform1f(uDim, dim)
    gl.uniform2f(uVel, 1, 0)

    let raf = 0
    let disposed = false
    let visible = true
    const start = performance.now()

    // ring buffer of pointer samples, xyz per slot; z < 0 means empty, so an
    // untouched surface renders exactly as it did before ripples existed
    // 30 slots at one ring per 60ms covers 1.8s — just over RIPPLE_LIFE, so a
    // ring always completes its life before its slot is reused. Under-sizing
    // this is what made fast drags produce nothing: emission ran every frame
    // and recycled the whole buffer before any ring could expand.
    const DROPS = 30
    // rate cap AND a minimum spacing. The cap alone stamped co-located rings
    // during a slow drag, which reads as one ripple pulsing in place; the
    // spacing alone let a fast drag emit every frame and recycle the buffer.
    // 30 slots x 0.075s covers 2.25s, just past RIPPLE_LIFE.
    const EMIT_INTERVAL = 0.075
    // must match RIPPLE_LIFE in the shader — it gates the whole ring loop
    const RIPPLE_LIFE = 2.2
    // tight enough that a slow drag still lays a near-continuous furrow. At the
    // old 0.008 a 20px/s drag emitted one ring every ~0.5s, and those isolated
    // pops are what read as stutter — the fix is more of them, not fewer.
    const EMIT_SPACING = 0.0035
    const drops = new Float32Array(DROPS * 3).fill(-1)
    const dirs = new Float32Array(DROPS * 2)
    let slot = 0
    let lastEmit = -1
    let sinceEmit = 0
    let velX = 1
    let velY = 0
    // smoothed speed in uv/second. A slow mouse reports in whole-pixel steps
    // that arrive in bursts, so the per-frame delta is violently uneven —
    // averaging it over time is what stops that reaching the picture.
    let speed = 0
    let lastNow = 0
    // raw pointer target vs the smoothed cursor the shader actually sees. The
    // smoothing happens per frame rather than per event, so pointer cadence
    // (which is wildly uneven on a slow drag) can never show through as stutter.
    let targetX = 0.5
    let targetY = 0.5
    let curX = 0.5
    let curY = 0.5
    let grip = 0
    let inside = false
    let primed = false

    const drawFrame = () => {
      const now = (performance.now() - start) / 1000
      if (wake) {
        const prevX = curX
        const prevY = curY
        // heavier chase — the hand has mass and the water resists it
        curX += (targetX - curX) * 0.085
        curY += (targetY - curY) * 0.085
        const moved = Math.hypot(curX - prevX, curY - prevY)

        // real elapsed time, clamped so a stalled tab can't spike the estimate
        const dt = Math.min(Math.max(now - lastNow, 1 / 240), 1 / 20)
        lastNow = now
        speed += (moved / dt - speed) * 0.10

        // Everything downstream reads the SMOOTHED speed, never the raw delta.
        // `pace` is presence — 0 when parked, full by the time the pointer is
        // properly moving (~0.018 uv/s is a deliberate slow drag, not a twitch).
        // `fast` is separate, and only scales intensity. Folding the two
        // together is what once left slow drags barely stirring at all.
        const FULL_SPEED = 0.9
        const t0 = Math.min(Math.max((speed - 0.0015) / (0.018 - 0.0015), 0), 1)
        const pace = t0 * t0 * (3 - 2 * t0)
        const fast = Math.min(speed / FULL_SPEED, 1)
        const want = inside ? pace * Math.min(0.42 + fast * 0.58, 1) : 0
        grip += (want - grip) * (want > grip ? 0.12 : 0.02)

        // smooth the heading too — recomputed from a near-zero delta it flips
        // on quantisation noise, which is its own source of jitter
        if (moved > 3e-4) {
          const nx = (curX - prevX) / moved
          const ny = (curY - prevY) / moved
          velX += (nx - velX) * 0.18
          velY += (ny - velY) * 0.18
          const m = Math.hypot(velX, velY) || 1
          velX /= m
          velY /= m
        }

        // a ring needs BOTH: enough time since the last one (so a fast drag
        // can't recycle the buffer) and enough travel (so a slow drag lays a
        // trail down the path instead of stacking rings on one spot)
        sinceEmit += moved
        if (inside && pace > 0.02 && sinceEmit > EMIT_SPACING && now - lastEmit > EMIT_INTERVAL) {
          lastEmit = now
          sinceEmit = 0
          drops[slot * 3] = curX
          drops[slot * 3 + 1] = curY
          drops[slot * 3 + 2] = now
          // bake the stroke's pace into the heading vector's LENGTH, so this
          // ring keeps propagating at the speed that cut it even after the
          // pointer has sped up or stopped
          const scale = 0.40 + fast * 1.15
          dirs[slot * 2] = velX * scale
          dirs[slot * 2 + 1] = velY * scale
          slot = (slot + 1) % DROPS
        }

        // the newest ring is the last to die, so one comparison covers all 30
        gl.uniform1f(uLive, now - lastEmit < RIPPLE_LIFE ? 1 : 0)
        gl.uniform3f(uCursor, curX, curY, grip)
        gl.uniform2f(uVel, velX, velY)
        gl.uniform3fv(uDrops, drops)
        gl.uniform2fv(uDirs, dirs)
      }
      gl.uniform1f(uTime, now)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const loop = () => {
      if (disposed || reduced || !visible) return
      drawFrame()
      raf = requestAnimationFrame(loop)
    }

    const resize = () => {
      // half-resolution: the texture is soft, the GPU cost isn't
      const w = Math.max(1, Math.floor(canvas.clientWidth * 0.5))
      const h = Math.max(1, Math.floor(canvas.clientHeight * 0.5))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      // unconditional: this effect may be re-running on an already-sized
      // canvas (StrictMode/HMR) with a fresh program whose uniforms are 0
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uRes, w, h)
      drawFrame() // keep a valid frame even when the loop is paused
    }

    // the canvas is pointer-events:none, so read the pointer off window and map
    // it into the canvas box; only samples landing on the surface emit a ring
    // events only set a target; all smoothing and emission happens in the frame
    // loop, so this stays cheap no matter how fast the pointer reports
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1 - (e.clientY - rect.top) / rect.height
      inside = x >= 0 && x <= 1 && y >= 0 && y <= 1
      if (!inside) return
      targetX = x
      targetY = y
      // snap on first contact so the cursor doesn't sweep in from the centre
      if (!primed) {
        primed = true
        curX = x
        curY = y
      }
    }
    const wake = ripples && !reduced
    if (wake) window.addEventListener('pointermove', onPointerMove, { passive: true })

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      const wasVisible = visible
      visible = entry.isIntersecting
      if (visible && !wasVisible && !reduced) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(loop)
      }
    })
    io.observe(canvas)

    resize()
    raf = requestAnimationFrame(loop)

    // no loseContext() here: under StrictMode the effect re-runs on the same
    // canvas and getContext would hand back the dead context. The context is
    // released with the canvas element itself on unmount.
    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      if (wake) window.removeEventListener('pointermove', onPointerMove)
    }
  }, [reduced, dim, ripples])

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <canvas ref={canvasRef} className="size-full" />
      {scrim && <div className="absolute inset-0 bg-ink/55" />}
    </div>
  )
}
