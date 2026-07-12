import { Fragment } from 'react'
import { GlowField } from '../components/fx/GlowField'
import { publications } from '../data/publications'
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

export function Publications() {
  const years = [...new Set(publications.map((p) => p.year))]

  return (
    <section
      id="publications"
      className="relative border-t border-line-soft scroll-mt-20"
    >
      <GlowField variant="c" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeading num="03" label="Publications" title="Publications" />

        {years.map((year) => (
          <div
            key={year}
            className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-10"
          >
            <Reveal>
              <p
                aria-hidden
                className="pt-10 text-6xl font-extralight tracking-[-0.02em] text-ash/50 md:sticky md:top-28"
              >
                {year}
              </p>
            </Reveal>

            <div>
              {publications
                .filter((p) => p.year === year)
                .map((pub) => (
                  <Reveal key={pub.title}>
                    <article className="border-t border-line-soft py-10">
                      <h3 className="max-w-[52ch] text-xl leading-snug font-light text-paper">
                        {pub.title}
                      </h3>
                      <p className="mt-4 text-sm font-light text-mist">
                        <span className="sr-only">{year} — </span>
                        <Authors value={pub.authors} />
                      </p>
                      <p className="mt-2 font-mono text-[10.5px] tracking-[0.16em] text-ash uppercase">
                        {pub.venue}
                      </p>
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
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-paper uppercase transition-colors duration-500 ease-editorial hover:text-mist"
                      >
                        View paper <span aria-hidden>↗</span>
                      </a>
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
