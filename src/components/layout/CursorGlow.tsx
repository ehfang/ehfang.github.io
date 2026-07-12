import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect } from 'react'

const SIZE = 640

/**
 * Carried over from the original site, recast monochrome: a large,
 * very faint paper-white glow trailing the cursor. Desktop only.
 */
export function CursorGlow() {
  const reduced = useReducedMotion()
  const x = useMotionValue(-SIZE)
  const y = useMotionValue(-SIZE)
  const springX = useSpring(x, { stiffness: 55, damping: 18, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 55, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - SIZE / 2)
      y.set(e.clientY - SIZE / 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 hidden rounded-full md:block"
      style={{
        width: SIZE,
        height: SIZE,
        x: springX,
        y: springY,
        background:
          'radial-gradient(circle, rgb(232 190 202 / 0.08) 0%, transparent 65%)',
      }}
    />
  )
}
