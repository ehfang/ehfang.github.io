/**
 * Rotating circular scroll indicator — a spinning ring of text around a
 * pulsing downward arrow. Brighter than a whisper so it reads over the
 * molten backdrop.
 */
export function ScrollBadge() {
  return (
    <div aria-hidden className="relative size-20 select-none md:size-28">
      <svg
        viewBox="0 0 100 100"
        className="size-full animate-spin-slow motion-reduce:animate-none"
      >
        <defs>
          <path
            id="scroll-circle"
            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <text
          className="fill-paper font-mono text-[8.5px] uppercase"
          style={{ letterSpacing: '0.28em' }}
        >
          <textPath href="#scroll-circle">scroll down · scroll down ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="animate-pulse-dot text-base leading-none text-paper md:text-lg">↓</span>
      </span>
    </div>
  )
}
