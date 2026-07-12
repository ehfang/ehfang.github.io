export interface Publication {
  /** empty for work that has no publication year yet; see `status` */
  year: string
  /**
   * set on work that is not published: 'Under review', 'In preparation'.
   * Groups the entry under that label instead of a year, and keeps it out of
   * the published count and the schema.org article list.
   */
  status?: string
  title: string
  /** occurrences of "Fang, E." are emphasized when rendered */
  authors: string
  /** omitted where no venue is settled yet */
  venue?: string
  /** recognition the paper itself received, shown beneath the venue */
  award?: string
  highlights: string[]
  /** omitted until there is something to link to */
  url?: string
}

export const publications: Publication[] = [
  {
    year: '2026',
    title:
      'Examining Short-Term Video Game Play on Subsequent Working Memory Performance',
    authors: 'Fang, E., & Chen, K. B.',
    venue: 'Proceedings of the Human Factors and Ergonomics Society Annual Meeting',
    highlights: [
      'Mixed-methods comparison of first-person shooter, real-time strategy & narrative gameplay',
      'Measured working memory by n-back before and after a 30-minute session, with workload, affect & interviews',
      'Explored brief gameplay as pre-task preparation for cognitively demanding work',
    ],
    url: 'https://doi.org/10.1177/10711813261484466',
  },
  {
    year: '2026',
    title:
      'Elicitation and Assessment of Hand-Based Gestures for Information Processing in Immersive Environments',
    authors: 'Cheng, F., Fang, E., & Chen, K. B.',
    venue: 'Human Factors: The Journal of the Human Factors and Ergonomics Society',
    highlights: [
      "Gesture elicitation study mapping cognitive processes from the revised Bloom's taxonomy to hand-based gestures",
      'Validated candidate gestures on discoverability, memorability & usability',
      'Identified four mapping strategies and proposed a recommended gesture set',
    ],
    url: 'https://doi.org/10.1177/00187208261480471',
  },
  {
    year: '2026',
    title: 'Human Factors Extended Reality Showcase 2026',
    authors:
      'Chen, K. B., Alabi, C., Bailey, S. K. T., Fang, E., Fussell, S. G., Harris, J., Akash, K., & Wu, L.',
    venue: 'Proceedings of the Human Factors and Ergonomics Society Annual Meeting',
    highlights: [
      'Interactive HFES session demonstrating XR for training, workplace safety & human-AI collaboration',
      'Presented an AR hazard-detection demo on Meta Quest 3 using an AI backend to flag construction site risks',
      "Generated in-view mitigation checklists centered on OSHA's Focus Four hazards",
    ],
    url: 'https://doi.org/10.1177/10711813261498754',
  },
  {
    year: '2025',
    title:
      'Study Design and Assessment Framework for Testing AR Tools in Engineering Education',
    authors: 'Perera, G. N., Fang, E., Bottomley, L., Chen, K. B., & Ivy, J.',
    venue: 'ASEE Annual Conference & Exposition',
    award: '1st Place · Best New Career Paper Award',
    highlights: [
      'Novel framework for longitudinal AR evaluation in STEM education',
      'Assessed usability, knowledge retention & educational efficacy',
      'Compared game-based AR learning with traditional classroom settings',
    ],
    url: 'https://peer.asee.org/57157',
  },
  {
    year: '2025',
    title:
      'Examining User Interactions With Signaling Elements in a VR Learning Application',
    authors:
      'Fang, E., Kulasingam, R., Cheng, F., Peterson, M., Delgado, C., & Chen, K. B.',
    venue: 'Proceedings of the Human Factors and Ergonomics Society Annual Meeting',
    highlights: [
      'Evaluated signaling elements in VR for improved learning outcomes',
      'Analyzed user interaction patterns with visual cues in immersive environments',
    ],
    url: 'https://doi.org/10.1177/10711813251360711',
  },
  {
    year: '2025',
    title: 'Mental Models of Gestural Interaction for Information Processing in VR',
    authors: 'Cheng, F., Fang, E., & Chen, K. B.',
    venue: 'Proceedings of the Human Factors and Ergonomics Society Annual Meeting',
    highlights: [
      'Investigated user mental models for gesture-based VR interactions',
      'Identified design implications for intuitive gestural interfaces',
    ],
    url: 'https://doi.org/10.1177/10711813251357931',
  },
  {
    year: '2024',
    title:
      'Negative Emotions From VR Usage: A Preliminary Exploratory Study Using Online Forums',
    authors: 'Fang, E., Sivaramakrishnan, A., & Chen, K. B.',
    venue: 'Proceedings of the Human Factors and Ergonomics Society Annual Meeting',
    highlights: [
      'Exploratory analysis of negative emotional experiences in VR',
      'Qualitative analysis of user-reported issues from online communities',
    ],
    url: 'https://doi.org/10.1177/10711813241275079',
  },
  {
    year: '2022',
    title:
      'Augmented Reality (AR) Posture Training for Manual Material Handling: Iterative Design, Evaluation, and Recommendation for AR Interface',
    authors: 'Chen, K., Perera, G., Fang, E., & Chen, K. B.',
    venue: 'Proceedings of the Human Factors and Ergonomics Society Annual Meeting',
    highlights: [
      'Designed Virtual Instructor Application (VIA) for MMH posture training',
      'Iterative usability testing with 10 participants experienced in MMH',
      'Framework applicable to future AR-based training program design',
    ],
    url: 'https://doi.org/10.1177/1071181322661093',
  },
  {
    year: '',
    status: 'Under review',
    title:
      'Worker-Centered Design and Evaluation of Augmented Reality Application for Posture Training',
    authors: 'Perera, G. N., Fang, E., Chen, K., Ivy, J. S., & Chen, K. B.',
    venue: 'Ergonomics in Design',
    highlights: [],
  },
  {
    year: '',
    status: 'In preparation',
    title:
      'Balancing Usability and Theory: An Iterative Evaluation Framework for Virtual Learning Environments',
    authors: 'Wu, L., Fang, E., Cheng, F., & Chen, K. B.',
    highlights: [],
  },
]
