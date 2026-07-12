import { useAnimationFrame, useReducedMotion } from 'motion/react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react'
import { useMousePositionRef } from '../../hooks/useMousePositionRef'
import { cn } from '../../lib/cn'

/*
 * Mouse-parallax field: FloatingElement children drift toward the cursor
 * at speeds proportional to their `depth`, lerped every frame for the
 * patient, weightless feel. Adapted from the floating reference.
 */

interface FloatingItem {
  element: HTMLDivElement
  depth: number
  current: { x: number; y: number }
}

interface FloatingContextType {
  register: (id: string, element: HTMLDivElement, depth: number) => void
  unregister: (id: string) => void
}

const FloatingContext = createContext<FloatingContextType | null>(null)

interface FloatingProps {
  children: ReactNode
  className?: string
  /** global multiplier on drift distance */
  sensitivity?: number
  /** 0–1, how quickly elements chase their target */
  easingFactor?: number
}

export function Floating({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.045,
}: FloatingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef(new Map<string, FloatingItem>())
  const mouseRef = useMousePositionRef(containerRef)
  const reduced = useReducedMotion()

  const register = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      itemsRef.current.set(id, { element, depth, current: { x: 0, y: 0 } })
    },
    [],
  )

  const unregister = useCallback((id: string) => {
    itemsRef.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    if (!containerRef.current || reduced) return
    const { width, height } = containerRef.current.getBoundingClientRect()

    itemsRef.current.forEach((item) => {
      const strength = (item.depth * sensitivity) / 22
      const targetX = (mouseRef.current.x - width / 2) * strength
      const targetY = (mouseRef.current.y - height / 2) * strength

      item.current.x += (targetX - item.current.x) * easingFactor
      item.current.y += (targetY - item.current.y) * easingFactor
      item.element.style.transform = `translate3d(${item.current.x}px, ${item.current.y}px, 0)`
    })
  })

  return (
    <FloatingContext.Provider value={{ register, unregister }}>
      <div ref={containerRef} className={cn('absolute inset-0', className)}>
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  /** higher = drifts further; the name sits shallow, fragments sit deep */
  depth?: number
  /** false keeps the element in normal flow (transform still applies) */
  absolute?: boolean
}

export function FloatingElement({
  children,
  className,
  depth = 1,
  absolute = true,
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const id = useId()
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    context.register(id, elementRef.current, depth)
    return () => context.unregister(id)
  }, [context, id, depth])

  return (
    <div
      ref={elementRef}
      className={cn(
        absolute ? 'absolute' : 'relative',
        'will-change-transform',
        className,
      )}
    >
      {children}
    </div>
  )
}
