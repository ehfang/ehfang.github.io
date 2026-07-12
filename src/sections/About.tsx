import { GlowField } from '../components/fx/GlowField'
import { aboutParagraphs, education, stats } from '../data/about'
import { Reveal } from '../components/ui/Reveal'
import { RichText } from '../components/ui/RichText'
import { SectionHeading } from '../components/ui/SectionHeading'

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-line-soft scroll-mt-20"
    >
      <GlowField variant="a" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeading num="01" label="About" title="About" accent="me" />

        <div className="grid gap-16 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <div>
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-6 text-lg leading-relaxed font-light text-mist">
                  <RichText text={p} />
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.15}>
              <div className="mt-14 flex gap-14 border-t border-line-soft pt-9">
                {stats.map((s) => (
                  <div key={s.label}>
                    <span className="block text-5xl font-extralight tracking-[-0.02em] text-paper">
                      {s.number}
                    </span>
                    <span className="mt-3 block font-mono text-[10.5px] tracking-[0.2em] text-ash uppercase">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <h3 className="font-mono text-[11px] tracking-[0.22em] text-ash uppercase">
                Education
              </h3>
            </Reveal>
            <div className="mt-8">
              {education.map((e, i) => (
                <Reveal key={e.degree} delay={i * 0.1}>
                  <div className="border-t border-line-soft py-7">
                    <h4 className="text-xl font-light text-paper">{e.degree}</h4>
                    <p className="mt-2 text-sm font-light text-mist">
                      {e.school} · {e.dates}
                    </p>
                    <p className="mt-3 font-mono text-[10.5px] tracking-[0.18em] text-ash uppercase">
                      {e.focus}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
