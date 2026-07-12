import { motion } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'
import type { Photo } from '../../data/photos'
import { EASE_EDITORIAL } from '../ui/Reveal'

interface LightboxProps {
  photos: Photo[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const photo = photos[index]

  const prev = useCallback(
    () => onNavigate((index - 1 + photos.length) % photos.length),
    [index, photos.length, onNavigate],
  )
  const next = useCallback(
    () => onNavigate((index + 1) % photos.length),
    [index, photos.length, onNavigate],
  )

  useEffect(() => {
    dialogRef.current?.focus()
  }, [])

  // lock page scroll while open
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'Tab') {
      // keep focus inside the dialog
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photograph ${index + 1} of ${photos.length}`}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_EDITORIAL }}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/97 outline-none backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <p className="font-mono text-[11px] tracking-[0.2em] text-ash uppercase">
          {String(index + 1).padStart(2, '0')} /{' '}
          {String(photos.length).padStart(2, '0')}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[11px] tracking-[0.2em] text-mist uppercase transition-colors duration-500 ease-editorial hover:text-paper"
        >
          Close ✕
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 md:px-24">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous photograph"
          className="absolute left-3 text-3xl font-extralight text-mist transition-colors duration-500 ease-editorial hover:text-paper md:left-8"
        >
          ←
        </button>

        <motion.img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
          className="max-h-full max-w-full object-contain"
        />

        <button
          type="button"
          onClick={next}
          aria-label="Next photograph"
          className="absolute right-3 text-3xl font-extralight text-mist transition-colors duration-500 ease-editorial hover:text-paper md:right-8"
        >
          →
        </button>
      </div>

      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <p className="font-mono text-[10.5px] tracking-[0.18em] text-mist uppercase">
          {photo.caption}
        </p>
        <p className="font-mono text-[10.5px] tracking-[0.18em] text-ash uppercase">
          Fujifilm X100VI
        </p>
      </div>
    </motion.div>
  )
}
