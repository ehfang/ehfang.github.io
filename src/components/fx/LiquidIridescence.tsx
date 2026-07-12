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
  p.x *= u_res.x / u_res.y;
  p *= 0.9;
  float t = u_time * 0.05;

  // water-like motion: two nested domain warps drifting at different speeds
  vec2 q = vec2(
    fbm(p + t * vec2(0.55, 0.32)),
    fbm(p + vec2(5.2, 1.3) - t * 0.4));
  vec2 r = vec2(
    fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.45),
    fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.3));
  float f = fbm(p + 3.0 * r);

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

  vec3 waterBand = mix(pond, celadon, smoothstep(0.26, 0.74, r.x));
  vec3 midw      = mix(blueLake, skyBlue, smoothstep(0.28, 0.72, q.x));

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
}

export function LiquidIridescence({
  className,
  dim = 0.8,
  scrim = false,
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
    gl.uniform1f(uDim, dim)

    let raf = 0
    let disposed = false
    let visible = true
    const start = performance.now()

    const drawFrame = () => {
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
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
    }
  }, [reduced, dim])

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
