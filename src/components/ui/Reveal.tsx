import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export const EASE_EDITORIAL = [0.19, 1, 0.22, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** distance the element rises from, in px */
  distance?: number
}

/** Patient scroll-reveal: fade + rise, fires once. */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 36,
}: RevealProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  )
}
