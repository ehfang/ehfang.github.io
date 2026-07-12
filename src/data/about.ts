// .js extension: this module is also imported by vite.config.ts, whose tsconfig
// uses nodenext resolution (TypeScript maps it back to publications.ts)
import { publications } from './publications.js'

export const aboutParagraphs: string[] = [
  "I'm a PhD student in Industrial Engineering at North Carolina State University, focusing on **Human Factors Engineering** and **Human-Computer Interaction**. My research explores how emerging technologies like AR and VR can enhance learning, occupational safety, and user experience.",
  "With a background in mixed-methods research, I bridge the gap between qualitative insights and quantitative data to create meaningful, user-centered solutions. I'm passionate about making technology more intuitive and accessible.",
]

// counted from the publications list rather than hand-maintained, so adding a
// paper can't leave this stat stale (it has twice already). Entries carrying a
// status are under review or in preparation and are not published yet, so they
// are excluded rather than inflating the figure.
export const stats = [
  {
    number: String(publications.filter((p) => !p.status).length),
    label: 'Publications',
  },
  { number: '4+', label: 'Years Research' },
  { number: '3.94', label: 'GPA' },
]

export const education = [
  {
    degree: 'Ph.D. in Industrial Engineering',
    school: 'North Carolina State University',
    dates: '2024 – Present',
    focus: 'Human Factors & HCI',
  },
  {
    degree: 'B.S. in Industrial Engineering',
    school: 'North Carolina State University',
    dates: '2019 – 2024',
    focus: 'Minor: Supply Chain Management',
  },
] as const
