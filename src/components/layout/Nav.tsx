import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { cn } from '../../lib/cn'
import { EASE_EDITORIAL } from '../ui/Reveal'

const PHOTO_PATH = '/fang.at.f2'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const onPhotography = pathname === PHOTO_PATH
  const sectionIds = useMemo(() => sections.map((s) => s.id), [])
  const active = useActiveSection(sectionIds, isHome)
  const [menuOpen, setMenuOpen] = useState(false)

  // lock scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => setMenuOpen(false), [pathname])

  const linkClass = (id: string) =>
    cn(
      'font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ease-editorial hover:text-paper',
      active === id ? 'text-paper' : 'text-ash',
    )

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line-soft bg-ink/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-[72px] md:px-10"
      >
        <Link
          to="/"
          aria-label="Emily Fang — home"
          className="font-brush text-[28px] leading-none text-paper transition-colors duration-500 ease-editorial hover:text-mist"
        >
          <span aria-hidden>方</span>
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {sections.map(({ id, label }) =>
            isHome ? (
              <a key={id} href={`#${id}`} className={linkClass(id)}>
                {label}
              </a>
            ) : (
              <Link key={id} to={`/#${id}`} className={linkClass(id)}>
                {label}
              </Link>
            ),
          )}
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] tracking-[0.18em] text-ash uppercase transition-colors duration-500 ease-editorial hover:text-paper"
          >
            Resume&thinsp;↗
          </a>
          <Link
            to={PHOTO_PATH}
            className={cn(
              'inline-flex h-9 items-center rounded-full border px-5 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-500 ease-editorial',
              onPhotography
                ? 'border-paper bg-paper text-ink'
                : 'border-line text-paper hover:border-paper',
            )}
          >
            Photography
          </Link>
        </div>

        {/* mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
        >
          <span
            className={cn(
              'h-px w-6 bg-paper transition-transform duration-500 ease-editorial',
              menuOpen && 'translate-y-[4px] rotate-45',
            )}
          />
          <span
            className={cn(
              'h-px w-6 bg-paper transition-transform duration-500 ease-editorial',
              menuOpen && '-translate-y-[4px] -rotate-45',
            )}
          />
        </button>
      </nav>

      {/* mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
            className="absolute inset-x-0 top-full z-40 flex h-[calc(100svh-4rem)] flex-col justify-between overflow-y-auto bg-ink px-6 pt-12 pb-10 md:hidden"
          >
            <div className="flex flex-col gap-7">
              {sections.map(({ id, label }, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.08 * i,
                    ease: EASE_EDITORIAL,
                  }}
                >
                  <Link
                    to={`/#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-extralight tracking-[-0.02em] text-paper"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.32, ease: EASE_EDITORIAL }}
              >
                <Link
                  to={PHOTO_PATH}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-4xl italic text-paper"
                >
                  Photography
                </Link>
              </motion.div>
            </div>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_EDITORIAL }}
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[12px] tracking-[0.2em] text-mist uppercase"
            >
              Resume ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
