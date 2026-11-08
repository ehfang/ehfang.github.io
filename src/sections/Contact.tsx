import { GlowField } from '../components/fx/GlowField'
import { site } from '../data/site'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

const rowClass =
  'group flex flex-col gap-2 border-t border-line-soft py-9 sm:flex-row sm:items-baseline sm:justify-between'
const labelClass =
  'font-mono text-xs uppercase tracking-[0.2em] text-ash md:text-[13px]'
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
            Got a research idea? Want to chat about AR/VR? Or just say hi?
            <span className="mt-3 block font-serif text-xl tracking-[0.03em] text-paper italic">
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
          {/* Both documents live here rather than in the nav: the nav keeps a
              single obvious link for recruiters, while anyone who has read the
              research and publications lands on this section. The descriptions
              matter because "resume" and "CV" are the same word in much of the
              world outside the US. They describe content rather than length:
              the CV is two pages to the resume's one, so a size claim would
              promise a gap that isn't there. Avoid "academic record" here —
              that is the registrar's term for a transcript. */}
          <Reveal delay={0.24}>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className={rowClass}
            >
              <span className={labelClass}>Resume</span>
              <span className={`${valueClass} group-hover:-translate-x-2`}>
                UX research{' '}
                <span aria-hidden className="text-ash">↗</span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.32}>
            <a
              href={site.cv}
              target="_blank"
              rel="noreferrer"
              className={rowClass}
            >
              <span className={labelClass}>CV</span>
              <span className={`${valueClass} group-hover:-translate-x-2`}>
                Academic work{' '}
                <span aria-hidden className="text-ash">↗</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
