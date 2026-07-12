# Emily Fang — Portfolio

Dark editorial portfolio: academic research (home) + street/travel photography (`/fang.at.f2`).

**Stack:** Vite · React · TypeScript · Tailwind CSS v4 · motion (framer-motion) · react-router-dom

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build into dist/ (also creates dist/404.html for GitHub Pages)
```

## Content lives in `src/data/`

All copy is data, not markup. To update the site, edit these files only:

| File | Contents |
| --- | --- |
| `site.ts` | name, role, links (email, LinkedIn, Instagram, print shop), resume path |
| `about.ts` | bio paragraphs, stats, education |
| `research.ts` | research projects (`**bold**` spans get emphasis) |
| `publications.ts` | papers with DOIs |
| `awards.ts`, `skills.ts` | awards, skill categories |
| `photos.ts` | gallery manifest |

## TODO before launch

1. **Resume PDF** — drop `UXR_EmilyFang.pdf` into `public/`. The nav links to it but the file wasn't in the old site folder.
2. **Print shop URL** — set `printShop` in `src/data/site.ts` (currently `'#'`).
3. **Real photos** — put X100VI exports in `src/assets/photos/`, then update the imports/captions in `src/data/photos.ts`. Mixed aspect ratios are expected; the masonry grid and lightbox handle both orientations.

## Deploying to GitHub Pages

- **User site** (`username.github.io` repo) or custom domain: no changes needed — `base` is `'/'`.
- **Project site** (`username.github.io/repo-name`): set `base: '/repo-name/'` in `vite.config.ts`.
- Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.
  (One-time setup: repo **Settings → Pages → Source → GitHub Actions**.)
- Deep links like `/fang.at.f2` work via the `404.html` SPA fallback the build generates.

## Design system (don't fight it)

Tokens are in `src/index.css` (`@theme`): ink/paper/mist/ash monochrome palette, hairline borders only (no shadows), 0px corners everywhere except pill buttons/tags, one easing curve (`--ease-editorial`). Type: Switzer (display/body, self-hosted in `src/assets/fonts`), Instrument Serif italic (accents), IBM Plex Mono (meta labels).

Atmosphere lives in `src/components/fx/`: `LiquidIridescence` (a WebGL domain-warped-noise shader — monopo's molten liquid recolored to Monet's Nymphéas: deep water teal → pond green → reflection blue → lavender → rose — behind the home hero and the photography header; `dim` sets exposure, `scrim` adds an ink veil) and `GlowField` (firefly glows pulsing behind every non-molten section — variants `a`/`b`/`c` scatter them differently). All of it is chrome-free: UI controls stay strictly monochrome, and every effect goes static under `prefers-reduced-motion` (the shader draws one still frame).
