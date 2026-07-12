export interface SkillCategory {
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Technical Tools',
    skills: [
      'JavaScript',
      'Python',
      'C#',
      'R Studio',
      'Unity3D',
      'Tableau',
      'Qualtrics',
      'Dedoose',
      'NVivo',
    ],
  },
  {
    title: 'Research Methods',
    skills: [
      'Mixed Methods',
      'Experimental Design',
      'Thematic Analysis',
      'Usability Analysis',
      'User-Centered Design',
      'Qualitative Analysis',
      'Quantitative Analysis',
      'Iterative Improvement',
    ],
  },
  {
    title: 'Languages',
    skills: ['English (Native)', 'Mandarin (Native)'],
  },
]
