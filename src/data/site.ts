// This module is imported both by the app (where Vite defines import.meta.env)
// and by vite.config.ts in Node (where it doesn't exist, and isn't typed), so
// read BASE_URL defensively rather than assuming either environment.
const BASE =
  (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ??
  '/'

export const site = {
  name: 'Emily Fang',
  role: 'UX Researcher & Human Factors Engineer',
  heroDescription: 'PhD @ NC State',
  location: 'Raleigh, NC',
  coordinates: '35.78° N · 78.64° W',
  email: 'efang2@ncsu.edu',
  linkedin: 'https://linkedin.com/in/ehfang/',
  linkedinLabel: 'linkedin.com/in/ehfang',
  resume: `${BASE}UXR_EmilyFang.pdf`,
  instagram: 'https://www.instagram.com/fang.at.f2',
  instagramHandle: 'fang.at.f2',
  footerCredit: 'Designed & built with ♥ by Emily Fang · 2025',
} as const
