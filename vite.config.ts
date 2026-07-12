import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// .js extensions: tsconfig.node.json uses nodenext resolution, which requires
// them on relative ESM imports (TypeScript maps them back to the .ts sources)
import { aboutParagraphs, education } from './src/data/about.js'
import { publications } from './src/data/publications.js'
import { research } from './src/data/research.js'
import { site } from './src/data/site.js'

const SITE_URL = 'https://ehfang.github.io/'

/* The app renders entirely in the browser, so anything that fetches the page
   without running JavaScript — AI assistants, LLM screening tools, simple
   crawlers — sees only an empty <div id="root">. These two blocks give those
   readers the real content. Both are generated from src/data at build time so
   they can never drift from what the site actually shows. */

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
/** strip the **bold** markers the About section renders itself */
const plain = (s: string) => s.replace(/\*\*/g, '')

function structuredData() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: SITE_URL,
    jobTitle: site.role,
    description: plain(aboutParagraphs[0]),
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Raleigh',
      addressRegion: 'NC',
      addressCountry: 'US',
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'North Carolina State University',
    },
    alumniOf: education.map((e) => ({
      '@type': 'CollegeOrUniversity',
      name: e.school,
      description: `${e.degree} (${e.dates})`,
    })),
    knowsAbout: [
      'Human Factors Engineering',
      'Human-Computer Interaction',
      'User Experience Research',
      'Augmented Reality',
      'Virtual Reality',
      'Mixed-Methods Research',
    ],
    sameAs: [site.linkedin, site.instagram],
  }

  const articles = publications.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    name: p.title,
    datePublished: p.year,
    isPartOf: { '@type': 'Periodical', name: p.venue },
    url: p.url,
    // the full byline stays verbatim; only Emily is modelled as a Person so
    // co-author names are never mangled by naive parsing
    author: { '@type': 'Person', name: site.name },
    creditText: p.authors,
  }))

  return JSON.stringify([person, ...articles])
}

function noscriptShell() {
  const bio = aboutParagraphs.map((p) => `<p>${esc(plain(p))}</p>`).join('')
  const edu = education
    .map((e) => `<li>${esc(e.degree)} — ${esc(e.school)}, ${esc(e.dates)}</li>`)
    .join('')
  const pubs = publications
    .map(
      (p) =>
        `<li><a href="${esc(p.url)}">${esc(p.title)}</a> — ${esc(p.authors)}. ` +
        `<em>${esc(p.venue)}</em>, ${esc(p.year)}.` +
        (p.award ? ` ${esc(p.award)}.` : '') +
        `</li>`,
    )
    .join('')
  const proj = research
    .map(
      (r) =>
        `<li><strong>${esc(r.title)}</strong> — ${esc(r.role)}, ${esc(r.dates)}</li>`,
    )
    .join('')

  return `<div style="max-width:70ch;margin:0 auto;padding:2rem;font-family:system-ui,sans-serif;color:#e8e6e1;background:#0a0a09">
<h1>${esc(site.name)}</h1>
<p><strong>${esc(site.role)}</strong> — ${esc(site.heroDescription)}, ${esc(site.location)}</p>
${bio}
<h2>Education</h2><ul>${edu}</ul>
<h2>Research</h2><ul>${proj}</ul>
<h2>Publications</h2><ol>${pubs}</ol>
<h2>Contact</h2>
<ul>
<li>Email: <a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>
<li>LinkedIn: <a href="${esc(site.linkedin)}">${esc(site.linkedinLabel)}</a></li>
<li>Instagram: <a href="${esc(site.instagram)}">${esc(site.instagramHandle)}</a></li>
<li>Resume: <a href="/UXR_EmilyFang.pdf">UXR_EmilyFang.pdf</a></li>
</ul>
<p>This page requires JavaScript for its full interactive version.</p>
</div>`
}

// GitHub Pages:
//  - user/org site (username.github.io) or custom domain -> base: '/'
//  - project site (username.github.io/repo-name)         -> base: '/repo-name/'
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'machine-readable-shell',
      transformIndexHtml() {
        return [
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: structuredData(),
            injectTo: 'head' as const,
          },
          {
            tag: 'noscript',
            children: noscriptShell(),
            injectTo: 'body-prepend' as const,
          },
        ]
      },
    },
    {
      // GitHub Pages serves 404.html for unknown paths; shipping the SPA
      // shell there keeps deep links like /fang.at.f2 working.
      name: 'spa-github-pages-fallback',
      closeBundle() {
        try {
          copyFileSync(
            resolve(__dirname, 'dist/index.html'),
            resolve(__dirname, 'dist/404.html'),
          )
        } catch {
          /* dist not built (e.g. dev server) */
        }
      },
    },
  ],
})
