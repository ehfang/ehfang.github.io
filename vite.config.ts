import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages:
//  - user/org site (username.github.io) or custom domain -> base: '/'
//  - project site (username.github.io/repo-name)         -> base: '/repo-name/'
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
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
