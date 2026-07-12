export interface ServiceItem {
  /** the role, talk title, or activity */
  role: string
  /** venue, course, or a sentence of detail */
  detail?: string
  dates: string
}

export interface ServiceGroup {
  title: string
  items: ServiceItem[]
}

/* Only outreach lives here now. Professional service and memberships came
   off the page because the linked CV already carries them in full and they
   do not earn space on a page people skim; outreach stays because it is the
   one item a reader remembers rather than verifies. */
export const serviceGroups: ServiceGroup[] = [
  {
    title: 'Outreach',
    items: [
      {
        role: 'Counselor — ISE Summer Camp for High School Students',
        detail:
          'The Engineering Place, NC State. Mentored about 25 campers on college, research and industrial engineering, and designed end-of-camp review games covering manufacturing and human factors tools.',
        dates: 'Summers 2025 – 2026',
      },
      {
        role: 'Scale Worlds demonstrations',
        detail:
          'Hands-on sessions with the NSF-funded VR learning environment at the NC Science Museum, summer camps, an underserved middle school, the NC State Engineering Open House, and lab tours for visiting seminar speakers.',
        dates: '2023 – 2025',
      },
    ],
  },
]
