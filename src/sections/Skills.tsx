import { GlowField } from '../components/fx/GlowField'
import { skillCategories } from '../data/skills'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Tag } from '../components/ui/Tag'

export function Skills() {
  return (
    <section
      id="skills"
      className="relative border-t border-line-soft scroll-mt-20"
    >
      <GlowField variant="b" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeading num="05" label="Skills" title="Skills &" accent="expertise" />

        <div className="grid gap-14 md:grid-cols-3 md:gap-10">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={i * 0.08}>
              <h3 className="border-t border-line-soft pt-7 font-mono text-[11px] tracking-[0.22em] text-ash uppercase">
                {category.title}
              </h3>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
