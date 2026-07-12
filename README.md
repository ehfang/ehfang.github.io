# Emily Fang — Portfolio

A personal portfolio pairing academic work in UX research and human factors with street and travel photography. Built as a fast, accessible, statically-hosted single-page application.

**Live site:** [ehfang.github.io](https://ehfang.github.io)

## Overview

The site has two surfaces:

- **Home** — a single-page scroll through research experience, publications, awards, skills, and contact, opening on a type-driven hero.
- **Photography** (`/fang.at.f2`) — a dedicated gallery with a keyboard-navigable lightbox.

The visual language is a dark editorial monochrome — type-led layouts, hairline borders, generous whitespace — with a single chromatic gesture reserved for the hero and gallery header.

## Tech stack

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS v4**, with design tokens defined via `@theme`
- **Motion** (Framer Motion) for scroll reveals and the parallax hero
- **React Router** for the dedicated photography route
- Self-hosted fonts; no external runtime dependencies

## Highlights

- **Custom WebGL shader** — the "liquid" backdrop (`LiquidIridescence`) is domain-warped noise rendered to a canvas. It renders at half resolution, pauses when scrolled off-screen, and falls back to a single static frame under `prefers-reduced-motion`.
- **Accessibility** — a focus-trapped, keyboard-navigable lightbox (arrow keys and Escape), reduced-motion support throughout, real contrast on the dark palette, and semantic landmarks.
- **Performance** — source photography is downscaled at build time (~200 MB → ~7 MB) with intrinsic dimensions declared to prevent layout shift; imagery is lazy-loaded.
- **Content as data** — all copy lives in typed modules under `src/data/`, cleanly separated from presentation.
- **CI/CD** — pushes to `main` build and deploy automatically via GitHub Actions, with a generated `404.html` fallback so client-side routes deep-link correctly on static hosting.

## Getting started

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build to dist/
```

## Project structure

```
src/
  data/         content: bio, research, publications, awards, skills, photos
  components/    UI primitives, layout, hero, gallery, visual effects
  sections/      home-page sections
  pages/         routed pages (home, photography)
  assets/        self-hosted fonts and photography
```

## Deployment

Hosted on GitHub Pages. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/`. For a user site (`username.github.io`) the default `base` of `/` is correct; a project site requires setting `base` in `vite.config.ts`.
