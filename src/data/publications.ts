export interface Publication {
  year: string
  title: string
  /** occurrences of "Fang, E." are emphasized when rendered */
  authors: string
  venue: string
  highlights: string[]
  url: string
}

export const publications: Publication[] = [
  {
    year: '2025',
    title:
      'Study Design and Assessment Framework for Testing AR Tools in Engineering Education',
    authors: 'Perera, G. N., Fang, E., Bottomley, L., Chen, K. B., & Ivy, J.',
    venue: 'ASEE Annual Conference & Exposition',
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
]
