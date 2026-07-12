import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface PillProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: 'solid' | 'outline'
  /** internal route — rendered as a router Link */
  to?: string
}

const base =
  'inline-flex h-11 items-center gap-2.5 rounded-full px-6 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ease-editorial'

const variants = {
  solid: 'bg-paper text-ink hover:bg-mist',
  outline: 'border border-line text-paper hover:border-paper',
}

/** The only rounded shape in the system: a full pill. */
export function Pill({
  children,
  variant = 'outline',
  to,
  className,
  ...rest
}: PillProps) {
  const classes = cn(base, variants[variant], className)
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  )
}
