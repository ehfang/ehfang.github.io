import { Fragment } from 'react'
import { GlowField } from '../components/fx/GlowField'
import { cn } from '../lib/cn'
import { publications, type Publication } from '../data/publications'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

/** Emphasizes "Fang, E." within an author string. */
function Authors({ value }: { value: string }) {
  const parts = value.split('Fang, E.')
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="font-normal text-paper">Fang, E.</span>}
          {part}
        </Fragment>
      ))}
    </>
  )
}

/* Published work groups under its year; anything unpublished groups under its
   status instead, so "Under review" and "In preparation" reuse the same
   sticky-label layout rather than needing a section of their own. */
const groupOf = (p: Publication) => p.status ?? p.year


export function Publications() {
  const groups = [...new Set(publications.map(groupOf))]

  return (
    <section
      id="publications"
      className="relative border-t border-line-soft scroll-mt-20"
    >
      <GlowField variant="c" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeading num="03" label="Publications" title="Publications" />

        {groups.map((group) => (
          <div
            key={group}
            className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-10"
          >
            <Reveal>
              <p
                aria-hidden
                className={cn(
                  'pt-10 text-ash/85 md:sticky md:top-28',
                  /* A year is a numeral and carries display size; a status is
                     words and wraps badly at that size, so it uses the serif
                     italic accent from the section headings, sized to stay on
                     one line within the 180px label column. */
                  /^\d{4}$/.test(group)
                    ? 'text-6xl font-extralight tracking-[-0.02em]'
                    : 'font-serif text-3xl tracking-[0.03em] whitespace-nowrap italic',
                )}
              >
                {group}
              </p>
            </Reveal>

            <div>
              {publications
                .filter((p) => groupOf(p) === group)
                .map((pub) => (
                  <Reveal key={pub.title}>
                    <article className="border-t border-line-soft py-10">
                      <h3 className="max-w-[52ch] text-xl leading-snug font-light text-paper">
                        {pub.title}
                      </h3>
                      <p className="mt-4 text-sm font-light text-mist">
                          <span className="sr-only">{group} — </span>
                        <Authors value={pub.authors} />
                      </p>
                      {pub.venue && (
                        <p className="mt-2 font-mono text-xs tracking-[0.16em] text-ash uppercase">
                          {pub.venue}
                        </p>
                      )}
                      {pub.award && (
                        <p className="mt-3 flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-paper uppercase">
                          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-paper" />
                          {pub.award}
                        </p>
                      )}
                      <ul className="mt-5 space-y-2">
                        {pub.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-4 text-sm leading-relaxed font-light text-mist"
                          >
                            <span aria-hidden className="text-ash">
                              —
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      {pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2.5 -mb-3.5 inline-block py-3.5 font-mono text-xs tracking-[0.18em] text-link uppercase underline decoration-link/40 underline-offset-[6px] transition-colors duration-500 ease-editorial hover:text-paper hover:decoration-paper"
                        >
                          View paper <span aria-hidden>↗</span>
                        </a>
                      )}
                    </article>
                  </Reveal>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
