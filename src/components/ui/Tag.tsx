import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Pill tag for skills and project keywords. */
export function Tag({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-paper/25 px-3.5 py-1.5 font-mono text-xs tracking-[0.12em] text-mist uppercase transition-colors duration-500 ease-editorial hover:border-paper/50 hover:text-paper',
        className,
      )}
    >
      {children}
    </span>
  )
}
