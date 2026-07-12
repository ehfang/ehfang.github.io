import { GlowField } from '../components/fx/GlowField'
import { research } from '../data/research'
import { Reveal } from '../components/ui/Reveal'
import { RichText } from '../components/ui/RichText'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Tag } from '../components/ui/Tag'

export function Research() {
  return (
    <section
      id="research"
      className="relative border-t border-line-soft scroll-mt-20"
    >
      <GlowField variant="b" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeading
          num="02"
          label="Research"
          title="Research"
          accent="experience"
        />

        <div>
          {research.map((project, i) => (
            <Reveal key={project.title} delay={0.05}>
              <article className="group grid gap-6 border-t border-line-soft py-12 md:grid-cols-[90px_200px_1fr] md:gap-10 md:py-16">
                <span
                  aria-hidden
                  className="hidden text-4xl font-extralight text-ash/60 md:block"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="font-mono text-[10.5px] leading-loose tracking-[0.18em] text-ash uppercase">
                  <p>{project.dates}</p>
                  <p className="mt-1 text-mist">{project.role}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-light tracking-[-0.01em] text-paper transition-transform duration-700 ease-editorial group-hover:translate-x-2 md:text-3xl">
                    {project.titleUrl ? (
                      <a
                        href={project.titleUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-line underline-offset-8 transition-colors duration-500 ease-editorial hover:decoration-paper"
                      >
                        {project.title}&thinsp;↗
                      </a>
                    ) : (
                      project.title
                    )}
                    {project.titleNote && (
                      <span className="ml-4 align-middle font-mono text-[10.5px] tracking-[0.18em] text-ash uppercase">
                        {project.titleNote}
                      </span>
                    )}
                  </h3>

                  <ul className="mt-6 space-y-3">
                    {project.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-4 text-[15px] leading-relaxed font-light text-mist"
                      >
                        <span aria-hidden className="mt-[2px] text-ash">
                          —
                        </span>
                        <span>
                          <RichText text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
