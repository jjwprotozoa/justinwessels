// src/data/journey.ts — Founder journey timeline (completed and active milestones only)
import { getMetricValue } from './metrics'

const countries = getMetricValue('countries')
const trustedAdults = getMetricValue('trusted-adults')

export interface JourneyMilestone {
  id: string
  date: string
  year: number
  title: string
  description: string
  type: 'company' | 'product' | 'milestone'
  company?: string
  status: 'completed' | 'active'
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'first-company',
    date: '2022',
    year: 2022,
    title: 'First company founded',
    description: 'Began building technology products.',
    type: 'company',
    status: 'completed',
  },
  {
    id: 'kch-founded',
    date: '2024',
    year: 2024,
    title: 'Kids Call Home founded',
    description: 'Company established to solve family communication.',
    type: 'company',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-launch',
    date: '2025',
    year: 2025,
    title: 'Mobile launch',
    description: 'Released on iOS and Android.',
    type: 'product',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-web',
    date: '2025',
    year: 2025,
    title: 'Web platform',
    description: 'Extended to web.',
    type: 'product',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-growth',
    date: '2026',
    year: 2026,
    title: 'Global distribution',
    description: `${countries} countries · ${trustedAdults} trusted adults.`,
    type: 'milestone',
    company: 'Kids Call Home',
    status: 'active',
  },
]
