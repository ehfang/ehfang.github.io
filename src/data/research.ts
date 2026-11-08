export interface ResearchProject {
  dates: string
  title: string
  /** external link on the title (e.g. project site) */
  titleUrl?: string
  /** extra label rendered after the title, e.g. grant number */
  titleNote?: string
  role: string
  /** `**bold**` spans are rendered with emphasis */
  bullets: string[]
  tags: string[]
  /** labelled links shown under the tags, e.g. "View code on GitHub" */
  links?: { label: string; url: string }[]
}

export const research: ResearchProject[] = [
  {
    dates: 'Aug 2025 – Oct 2026',
    title: 'AI-Assisted AR for Hazard Recognition',
    role: 'Graduate Research Assistant',
    bullets: [
      'Built AR prototype in **Unity3D (C#)** deployed to Meta Quest 3 using passthrough camera API',
      'Integrated **OpenAI GPT-4o** with a hand-tracked, controller-free UI (poke and distance interaction) for real-time hazard analysis',
      'Developed interactive checklist overlays for occupational safety training',
    ],
    tags: ['Unity3D', 'C#', 'Meta Quest 3', 'GPT-4o', 'Occupational Safety'],
    links: [
      {
        label: 'View code on GitHub',
        url: 'https://github.com/ehfang/ar-hazard-recognition',
      },
    ],
  },
  {
    dates: 'May 2024 – Present',
    title: 'Cognitive Effects of Video Game Tasks',
    role: 'Graduate Research Assistant',
    bullets: [
      'Administered 2-hour in-lab protocols conducting cognitive tests assessing selective attention, inhibitory control, and working memory',
      'Facilitated computer-based tasks, conducted semi-structured interviews, and collected behavioral performance, eye-tracking, and survey data (Qualtrics, PANAS, NASA-TLX) for quantitative and qualitative analysis',
    ],
    tags: ['Eye-Tracking', 'Qualtrics', 'Mixed Methods', 'Cognitive Testing'],
  },
  {
    dates: 'Aug 2023 – Jul 2025',
    title: 'SCALE-VR',
    titleUrl: 'https://vr.ise.ncsu.edu/scale-worlds/',
    titleNote: 'NSF Award #2055680',
    role: 'Graduate Research Assistant',
    bullets: [
      'Assisted in iterative improvement of NSF-funded VR application teaching scale and numeracy',
      'Performed thematic analysis on formative evaluation data to improve UX',
      'Led outreach at NC Science Museum and underserved middle school',
    ],
    tags: [
      'VR',
      'Education',
      'Mixed Methods',
      'Thematic Analysis',
      'Usability',
      'Iterative Improvement',
    ],
  },
  {
    dates: 'Oct 2022 – May 2024',
    title: 'AREEA: AR for Engineering Education Advancement',
    role: 'Undergraduate Research Assistant',
    bullets: [
      'Mixed-methods evaluation of game-based AR app teaching statistics',
      'Administered validated questionnaires and conducted usability interviews',
    ],
    tags: ['AR', 'Education', 'Mixed Methods', 'Thematic Analysis', 'Usability'],
  },
  {
    dates: 'Aug 2021 – Oct 2022',
    title: 'VIA 2: Virtual Instructor Application',
    titleNote: 'NSF Award #1822477',
    role: 'Undergraduate Research Assistant',
    bullets: [
      'Improved AR-based postural training tool for occupational safety',
      'Applied PSSUQ, Bipolar Laddering, and semi-structured interview methods',
    ],
    tags: [
      'AR',
      'Mixed Methods',
      'Usability',
      'Thematic Analysis',
      'Iterative Improvement',
      'Occupational Safety',
    ],
  },
]
