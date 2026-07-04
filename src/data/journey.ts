// src/data/journey.ts — Founder journey timeline through products and companies
export interface JourneyMilestone {
  id: string
  date: string
  year: number
  title: string
  description: string
  type: 'company' | 'product' | 'milestone'
  company?: string
  status: 'completed' | 'active' | 'future'
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'started-building',
    date: '2016',
    year: 2016,
    title: 'Started building products',
    description: 'Began shipping software that solves real problems.',
    type: 'milestone',
    status: 'completed',
  },
  {
    id: 'fluid-investment',
    date: '2018',
    year: 2018,
    title: 'Founded Fluid Investment Group',
    description: 'Built investment and financial technology solutions.',
    type: 'company',
    company: 'Fluid Investment Group',
    status: 'completed',
  },
  {
    id: 'access-innovation',
    date: '2020',
    year: 2020,
    title: 'Founded Access Innovation Group',
    description: 'Focused on accessibility and innovation in technology.',
    type: 'company',
    company: 'Access Innovation Group',
    status: 'completed',
  },
  {
    id: 'codmsquadup',
    date: '2022',
    year: 2022,
    title: 'Founded CodmSquadUp',
    description: 'Built community and gaming technology products.',
    type: 'company',
    company: 'CodmSquadUp',
    status: 'active',
  },
  {
    id: 'kch-concept',
    date: '2024',
    year: 2024,
    title: 'Kids Call Home — Concept',
    description: 'Identified the family communication gap and began development.',
    type: 'product',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-launch',
    date: '2025',
    year: 2025,
    title: 'Kids Call Home — Launch',
    description: 'Released on iOS and Android. First families connected.',
    type: 'product',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-web',
    date: '2025',
    year: 2025,
    title: 'Kids Call Home — Web',
    description: 'Extended platform to web for broader accessibility.',
    type: 'product',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-global',
    date: '2026',
    year: 2026,
    title: 'Kids Call Home — Global',
    description: 'Expanded to 40+ countries. Growing user base.',
    type: 'milestone',
    company: 'Kids Call Home',
    status: 'active',
  },
  {
    id: 'future-ventures',
    date: 'Future',
    year: 2030,
    title: 'Next ventures',
    description: 'Building the foundation for what comes next.',
    type: 'milestone',
    status: 'future',
  },
]
