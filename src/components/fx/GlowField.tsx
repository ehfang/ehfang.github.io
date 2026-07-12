import { motion, useReducedMotion } from 'motion/react'
import { cn } from '../../lib/cn'

/*
 * Firefly glows: soft chromatic orbs scattered behind section content,
 * breathing in and out on slow, offset cycles and drifting a few pixels
 * so no two ever pulse in sync.
 */

type GlowColor = 'pond' | 'lily' | 'petal'

interface Glow {
  x: string
  y: string
  size: number
  color: GlowColor
  duration: number
  delay: number
}

const COLORS: Record<GlowColor, string> = {
  pond: 'rgb(47 106 89 / 0.38)',
  lily: 'rgb(96 142 122 / 0.33)',
  petal: 'rgb(232 190 202 / 0.26)',
}

const SCALE = 2.15

const VARIANTS: Record<'a' | 'b' | 'c' | 'gallery', Glow[]> = {
  /* tall masonry column — glows distributed down the full scroll */
  gallery: [
    { x: '4%', y: '5%', size: 280, color: 'pond', duration: 10, delay: 0 },
    { x: '84%', y: '12%', size: 320, color: 'lily', duration: 12, delay: 2 },
    { x: '10%', y: '27%', size: 240, color: 'petal', duration: 9, delay: 4 },
    { x: '80%', y: '38%', size: 300, color: 'pond', duration: 11, delay: 1.5 },
    { x: '5%', y: '52%', size: 340, color: 'lily', duration: 13, delay: 3 },
    { x: '86%', y: '63%', size: 260, color: 'petal', duration: 8.5, delay: 5.5 },
    { x: '12%', y: '77%', size: 300, color: 'pond', duration: 10.5, delay: 0.8 },
    { x: '78%', y: '88%', size: 320, color: 'lily', duration: 12.5, delay: 2.8 },
    { x: '42%', y: '96%', size: 240, color: 'pond', duration: 9.5, delay: 4.4 },
  ],
  a: [
    { x: '6%', y: '12%', size: 300, color: 'pond', duration: 9, delay: 0 },
    { x: '78%', y: '8%', size: 220, color: 'lily', duration: 12, delay: 2.5 },
    { x: '84%', y: '64%', size: 340, color: 'pond', duration: 10, delay: 5 },
    { x: '18%', y: '78%', size: 190, color: 'petal', duration: 8, delay: 1.2 },
  ],
  b: [
    { x: '82%', y: '16%', size: 280, color: 'pond', duration: 11, delay: 1 },
    { x: '4%', y: '48%', size: 320, color: 'lily', duration: 9, delay: 3.4 },
    { x: '58%', y: '84%', size: 240, color: 'pond', duration: 13, delay: 0 },
    { x: '30%', y: '6%', size: 170, color: 'petal', duration: 7.5, delay: 4.6 },
  ],
  c: [
    { x: '10%', y: '68%', size: 310, color: 'pond', duration: 10.5, delay: 2 },
    { x: '70%', y: '30%', size: 260, color: 'lily', duration: 8.5, delay: 0 },
    { x: '90%', y: '80%', size: 200, color: 'petal', duration: 12, delay: 3 },
    { x: '38%', y: '10%', size: 230, color: 'pond', duration: 9.5, delay: 5.5 },
  ],
}

interface GlowFieldProps {
  variant?: 'a' | 'b' | 'c' | 'gallery'
  className?: string
}

export function GlowField({ variant = 'a', className }: GlowFieldProps) {
  const reduced = useReducedMotion()
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      {VARIANTS[variant].map((glow, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: glow.x,
            top: glow.y,
            width: glow.size * SCALE,
            height: glow.size * SCALE,
              background: `radial-gradient(circle, ${COLORS[glow.color]} 0%, transparent 58%)`,
          }}
          initial={{ opacity: 0.45 }}
          animate={
            reduced
              ? undefined
              : {
                  opacity: [0.35, 1, 0.5, 0.85, 0.35],
                  x: [0, 60, -40, 28, 0],
                  y: [0, -44, 34, -22, 0],
                  scale: [1, 1.14, 0.94, 1.07, 1],
                }
          }
          transition={{
            duration: glow.duration,
            delay: glow.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
