export interface SkillCategory {
  title: string
  skills: string[]
}

/* Mirrors the grouping in CV_EmilyFang.pdf rather than collapsing everything
   into one "tools" bucket: the split between what she builds with and what she
   runs studies with is the distinction an engineer and a researcher each scan
   for. Five categories fill the three-column grid as 3 + 2, with the two short
   lists sharing the second row. */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming & Development',
    skills: [
      'Python',
      'PyTorch',
      'scikit-learn',
      'C#',
      'JavaScript',
      'R',
      'Unity3D',
      'Meta XR SDK',
      'OpenAI API',
      'Streamlit',
      'Gurobi',
      'Git/GitHub',
    ],
  },
  {
    title: 'Research Software',
    skills: [
      'Qualtrics',
      'Dedoose',
      'NVivo',
      'Tableau',
      'Figma',
      'PsyToolkit',
      'Pupil Labs (Pupil Core)',
    ],
  },
  {
    title: 'Research Methods',
    skills: [
      'Mixed Methods',
      'Qualitative Analysis',
      'Quantitative Analysis',
      'Experimental Design',
      'Signal Detection Theory',
      'Eye Tracking & Pupillometry',
      'Thematic Analysis',
      'Usability Analysis',
      'Formative Evaluation',
      'Think-Aloud Protocols',
      'User-Centered Design',
      'Study Coordination',
      'Technical Writing',
    ],
  },
  {
    title: 'Experimental Paradigms',
    skills: ['n-back', 'Flanker', 'Task Switching'],
  },
  {
    title: 'Languages',
    skills: ['English (Native)', 'Mandarin (Native)'],
  },
]
