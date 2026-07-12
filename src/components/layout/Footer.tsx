import { site } from '../../data/site'

export function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-[10.5px] tracking-[0.2em] text-ash uppercase">
          Emily Fang — {site.location}
        </p>
        <p className="text-sm font-light text-ash">
          Designed &amp; built with <span className="text-mist">♥</span> by Emily
          Fang · 2025
        </p>
      </div>
    </footer>
  )
}
