import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in the middle band of the
 * viewport. Drives active-link highlighting in the nav.
 */
export function useActiveSection(ids: string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}
