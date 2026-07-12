import { Reveal } from './Reveal'

interface SectionHeadingProps {
  num: string
  label: string
  title: string
  /** trailing word set in serif italic — the editorial counterpoint */
  accent?: string
}

/**
 * Editorial section opener: mono index + running hairline, then a
 * whisper-weight display title with an optional serif italic accent.
 */
export function SectionHeading({ num, label, title, accent }: SectionHeadingProps) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-baseline gap-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ash">
        <span>{num}</span>
        <span>{label}</span>
        <span aria-hidden className="h-px flex-1 self-center bg-line-soft" />
      </div>
      <h2 className="mt-7 text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.02] font-extralight tracking-[-0.02em]">
        {title}
        {accent && (
          <>
            {' '}
            <span className="font-serif tracking-normal italic">{accent}</span>
          </>
        )}
      </h2>
    </Reveal>
  )
}
