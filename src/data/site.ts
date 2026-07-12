// This module is imported both by the app (where Vite defines import.meta.env)
// and by vite.config.ts in Node (where it doesn't exist, and isn't typed), so
// read BASE_URL defensively rather than assuming either environment.
const BASE =
  (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ??
  '/'

/* Injected by vite.config.ts from each PDF's own bytes. Read through typeof
   because this module is imported by vite.config in Node too, where define()
   does not run and the identifiers are simply absent. */
declare const __RESUME_V__: string
declare const __CV_V__: string
const stamp = (v: string) => (v ? `?v=${v}` : '')
const RESUME_V = typeof __RESUME_V__ === 'string' ? __RESUME_V__ : ''
const CV_V = typeof __CV_V__ === 'string' ? __CV_V__ : ''

export const site = {
  name: 'Emily Fang',
  role: 'UX Researcher & Human Factors Engineer',
  heroDescription: 'PhD @ NC State',
  location: 'Raleigh, NC',
  coordinates: '35.78° N · 78.64° W',
  email: 'efang2@ncsu.edu',
  linkedin: 'https://linkedin.com/in/ehfang/',
  linkedinLabel: 'linkedin.com/in/ehfang',
  resume: `${BASE}UXR_EmilyFang.pdf${stamp(RESUME_V)}`,
  cv: `${BASE}CV_EmilyFang.pdf${stamp(CV_V)}`,
  instagram: 'https://www.instagram.com/fang.at.f2',
  instagramHandle: 'fang.at.f2',
  footerCredit: 'Designed & built with ♥ by Emily Fang · 2025',
} as const
