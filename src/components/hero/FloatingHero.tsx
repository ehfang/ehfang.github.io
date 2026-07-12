import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { LiquidIridescence } from '../fx/LiquidIridescence'
import { site } from '../../data/site'
import { Pill } from '../ui/Pill'
import { EASE_EDITORIAL } from '../ui/Reveal'
import { ScrollBadge } from '../ui/ScrollBadge'
import { Floating, FloatingElement } from './Floating'

/** Line that rises out of an overflow-hidden wrapper on load. */
function Rise({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <div className="overflow-hidden pb-[0.06em]">
      <motion.div
        initial={reduced ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.4, delay, ease: EASE_EDITORIAL }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function Fade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  )
}

const fragmentClass =
  'pointer-events-none font-mono text-[10.5px] uppercase tracking-[0.24em] text-mist whitespace-nowrap'

/* fragments only appear with real vertical room (≥720px) so they never
   collide with the name block on short viewports */
const fragmentVis = 'hidden md:tall:block'

export function FloatingHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <LiquidIridescence dim={0.8} />

      <Floating
        sensitivity={1}
        className="relative z-10 flex flex-1 flex-col justify-end px-6 pt-28 pb-24 md:px-10 md:pb-28"
      >
        {/* ghosted 方 watermark — Fang, drifting at depth */}
        <FloatingElement
          depth={2.2}
          className={`pointer-events-none top-[16%] right-[16%] ${fragmentVis}`}
        >
          <Fade delay={1.2}>
            <span
              aria-hidden
              className="block font-brush leading-none select-none"
              style={{
                fontSize: 'clamp(200px, 40vh, 420px)',
                color: 'transparent',
                WebkitTextStroke: '2px rgb(242 240 234 / 0.13)',
              }}
            >
              方
            </span>
          </Fade>
        </FloatingElement>

        {/* meta fragments, each at its own parallax depth, in zones the
            name block never reaches */}
        <FloatingElement depth={1.6} className={`top-[26%] right-[38%] ${fragmentVis}`}>
          <Fade delay={1.0}>
            <p className={fragmentClass}>PhD · Industrial &amp; Systems Engineering</p>
          </Fade>
        </FloatingElement>
        <FloatingElement depth={2.4} className={`top-[34%] right-[24%] ${fragmentVis}`}>
          <Fade delay={1.15}>
            <p className={fragmentClass}>NC State University</p>
          </Fade>
        </FloatingElement>
        <FloatingElement depth={3} className={`top-[56%] right-[20%] ${fragmentVis}`}>
          <Fade delay={1.3}>
            <p className={fragmentClass}>Raleigh · {site.coordinates}</p>
          </Fade>
        </FloatingElement>
        <FloatingElement
          depth={1.2}
          className={`right-[10%] bottom-[24%] hidden lg:tall:block`}
        >
          <Fade delay={1.45}>
            <p className="pointer-events-none font-serif text-3xl text-mist/80 italic">
              making tech more human
            </p>
          </Fade>
        </FloatingElement>

        {/* the name field — static so it stays anchored while the accents drift */}
        <div className="mx-auto w-full max-w-[1440px]">
          <Fade delay={0.2} className="mb-6 flex items-center gap-3">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-paper" />
            <span className="font-mono text-[10.5px] tracking-[0.24em] text-mist uppercase">
              {site.badge}
            </span>
          </Fade>

          <h1 className="text-[clamp(3.5rem,min(13.5vw,20svh),12rem)] leading-[0.88] font-extralight tracking-[-0.035em] uppercase">
            <Rise delay={0.35}>
              <span className="block">Emily</span>
            </Rise>
            <Rise delay={0.5}>
              <span className="flex items-baseline gap-6">
                Fang
                <span className="hidden font-serif text-[clamp(1.25rem,2vw,1.75rem)] tracking-normal normal-case italic text-mist sm:inline">
                  &amp; photography
                </span>
              </span>
            </Rise>
          </h1>

          <Fade delay={0.75} className="mt-8 max-w-xl">
            <p className="font-mono text-[11px] tracking-[0.22em] text-paper uppercase">
              {site.role}
            </p>
            <p className="mt-4 text-base leading-relaxed font-light text-mist">
              {site.heroDescription}
            </p>
          </Fade>

          <Fade delay={0.95} className="mt-10 flex flex-wrap items-center gap-4">
            <Pill variant="solid" href="#research">
              View research <span aria-hidden>↓</span>
            </Pill>
            <Pill variant="outline" to="/fang.at.f2">
              Photography <span aria-hidden>→</span>
            </Pill>
          </Fade>
        </div>
      </Floating>

      {/* rotating scroll badge — bottom-right so it never crowds the CTAs */}
      <Fade
        delay={1.6}
        className="absolute right-8 bottom-8 z-10 hidden md:tall:block"
      >
        <ScrollBadge />
      </Fade>
    </section>
  )
}
