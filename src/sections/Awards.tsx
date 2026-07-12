import { GlowField } from '../components/fx/GlowField'
import { awards } from '../data/awards'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

export function Awards() {
  return (
    <section
      id="awards"
      className="relative border-t border-line-soft scroll-mt-20"
    >
      <GlowField variant="a" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeading num="04" label="Awards" title="Awards &" accent="recognition" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {awards.map((award, i) => (
            <Reveal key={award.title} delay={i * 0.08}>
              <div className="flex h-full flex-col border-l border-line pl-6">
                <p className="font-mono text-[10.5px] tracking-[0.2em] text-ash uppercase">
                  {award.dates}
                </p>
                <h3 className="mt-4 text-xl leading-snug font-light text-paper">
                  {award.title}
                </h3>
                <p className="mt-3 text-sm font-light text-mist">{award.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
