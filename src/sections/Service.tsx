import { awards } from '../data/awards'
import { GlowField } from '../components/fx/GlowField'
import { cn } from '../lib/cn'
import { serviceGroups, type ServiceGroup } from '../data/service'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

/* Awards keep their own data file but render here rather than in a section of
   their own: four short cards were paying a full 320px of section padding plus
   a heading for 0.7 screens of content. */
const groups: ServiceGroup[] = [
  {
    title: 'Honors & Awards',
    items: awards.map((a) => ({ role: a.title, detail: a.org, dates: a.dates })),
  },
  ...serviceGroups,
]

/* One row per group, items across it. Stacking the groups into columns instead
   capped every item at the width of a half-page column while the other half
   sat empty; a row lets the full 1200px carry the content and roughly halves
   the section's height. The class strings are spelled out rather than built
   from the count, so Tailwind's scanner can see them. */
const columnsFor = (n: number) =>
  n >= 4
    ? 'sm:grid-cols-2 lg:grid-cols-4'
    : n === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2'

export function Service() {
  return (
    <section
      id="awards"
      className="relative border-t border-line-soft scroll-mt-20"
    >
      <GlowField variant="b" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeading
          num="05"
          label="Awards"
          title="Awards &"
          accent="outreach"
        />

        <div className="space-y-16">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <h3 className="border-t border-line-soft pt-7 font-mono text-[11px] tracking-[0.22em] text-ash uppercase">
                {group.title}
              </h3>
              <div
                className={cn(
                  'mt-9 grid gap-10 lg:gap-8',
                  columnsFor(group.items.length),
                )}
              >
                {group.items.map((item) => (
                  <div
                    key={item.role}
                    className="flex h-full flex-col border-l border-line pl-6"
                  >
                    <p className="font-mono text-[10.5px] tracking-[0.2em] text-ash uppercase">
                      {item.dates}
                    </p>
                    <p className="mt-4 leading-snug font-light text-paper">
                      {item.role}
                    </p>
                    {item.detail && (
                      <p className="mt-3 text-sm leading-relaxed font-light text-mist">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
