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
        'inline-flex items-center rounded-full border border-line-soft px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.12em] text-mist uppercase transition-colors duration-500 ease-editorial hover:border-line hover:text-paper',
        className,
      )}
    >
      {children}
    </span>
  )
}
