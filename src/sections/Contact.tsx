import { GlowField } from '../components/fx/GlowField'
import { site } from '../data/site'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

const rowClass =
  'group flex flex-col gap-2 border-t border-line-soft py-9 sm:flex-row sm:items-baseline sm:justify-between'
const labelClass = 'font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash'
const valueClass =
  'text-xl font-extralight tracking-[-0.01em] text-paper transition-transform duration-700 ease-editorial md:text-3xl'

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-line-soft scroll-mt-20"
    >
      <GlowField variant="c" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeading num="06" label="Contact" title="Let's" accent="connect" />

        <Reveal>
          <p className="max-w-xl text-lg leading-relaxed font-light text-mist">
            Got a research idea? Want to chat about AR/VR? Or just say hi?{' '}
            <span className="font-serif text-xl text-paper italic">
              I'm always up for a good conversation.
            </span>
          </p>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <a href={`mailto:${site.email}`} className={rowClass}>
              <span className={labelClass}>Email</span>
              <span className={`${valueClass} group-hover:-translate-x-2`}>
                {site.email} <span aria-hidden className="text-ash">↗</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className={rowClass}
            >
              <span className={labelClass}>LinkedIn</span>
              <span className={`${valueClass} group-hover:-translate-x-2`}>
                {site.linkedinLabel} <span aria-hidden className="text-ash">↗</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.16}>
            <div className={rowClass}>
              <span className={labelClass}>Location</span>
              <span className={valueClass}>{site.location}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
