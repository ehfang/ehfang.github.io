/**
 * Rotating circular scroll indicator — a typographic punctuation mark,
 * not a button (from the monopo reference).
 */
export function ScrollBadge() {
  return (
    <div aria-hidden className="relative size-24 select-none">
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
        <text className="fill-ash font-mono text-[8px] uppercase" style={{ letterSpacing: '0.32em' }}>
          <textPath href="#scroll-circle">scroll down · scroll down ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="block size-1 animate-pulse-dot rounded-full bg-ash" />
      </span>
    </div>
  )
}
