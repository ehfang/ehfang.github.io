import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export const EASE_EDITORIAL = [0.19, 1, 0.22, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** distance the element rises from, in px */
  distance?: number
  /** play on mount (on arrival) instead of when scrolled into view */
  immediate?: boolean
}

/** Patient reveal: fade + rise, fires once — on scroll, or on mount if immediate. */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 36,
  immediate = false,
}: RevealProps) {
  const reduced = useReducedMotion()
  const shown = { opacity: 1, y: 0 }
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: distance }}
      {...(immediate
        ? { animate: shown }
        : {
            whileInView: shown,
            viewport: { once: true, margin: '0px 0px -80px 0px' },
          })}
      transition={{ duration: 1.1, delay, ease: EASE_EDITORIAL }}
    >
      {children}
    </motion.div>
  )
}
