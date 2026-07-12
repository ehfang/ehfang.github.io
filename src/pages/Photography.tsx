import { AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { GlowField } from '../components/fx/GlowField'
import { LiquidIridescence } from '../components/fx/LiquidIridescence'
import { Lightbox } from '../components/gallery/Lightbox'
import { Pill } from '../components/ui/Pill'
import { Reveal } from '../components/ui/Reveal'
import { ScrollBadge } from '../components/ui/ScrollBadge'
import { photos } from '../data/photos'
import { site } from '../data/site'

export function Photography() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <main>
      {/* header — liquid iridescence behind editorial silence */}
      <section className="relative overflow-hidden border-b border-line-soft">
        <LiquidIridescence dim={0.8} />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 pt-40 pb-40 md:px-10 md:pt-52 md:pb-32">
          <Reveal>
            <p className="font-mono text-[10.5px] tracking-[0.24em] text-mist uppercase">
              Street &amp; travel — Fujifilm X100VI · 23mm
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-[clamp(3.25rem,11vw,10rem)] leading-[0.95] font-extralight tracking-[-0.03em]">
              {site.instagramHandle}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed font-light text-mist">
              <span className="font-serif text-xl text-paper italic">
                photographs from the street and the road
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 font-mono text-[10.5px] tracking-[0.22em] text-mist uppercase">
              4×6 and 8×12 prints available for sale
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Pill
                variant="solid"
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram <span aria-hidden>↗</span>
              </Pill>
            </div>
          </Reveal>
        </div>
        {/* same rotating scroll badge as the home hero */}
        <Reveal delay={0.4} className="absolute right-8 bottom-8 z-10 hidden [@media(min-height:560px)]:block">
          <ScrollBadge />
        </Reveal>
      </section>

      {/* gallery */}
      <section aria-label="Photo gallery" className="relative">
        <GlowField variant="gallery" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
          {/* uniform 2:3 grid — reads left-to-right, top-to-bottom */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {photos.map((photo, i) => (
              <Reveal key={photo.src} delay={(i % 3) * 0.07} immediate={i < 3}>
                <figure>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`Open ${photo.alt}`}
                    className="group block w-full overflow-hidden"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading={i < 3 ? 'eager' : 'lazy'}
                      className="aspect-[2/3] w-full object-cover opacity-90 transition-opacity duration-700 ease-out group-hover:opacity-100"
                    />
                  </button>
                  <figcaption className="flex items-baseline justify-between pt-3 font-mono text-[10px] tracking-[0.18em] text-ash uppercase">
                    <span>{photo.caption}</span>
                    <span aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
