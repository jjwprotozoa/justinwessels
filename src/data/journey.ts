// src/data/journey.ts — Founder journey timeline (completed and active milestones only)
import { proofMetrics } from './metrics'

const countries = proofMetrics.find((m) => m.id === 'countries')?.displayValue ?? '177'
const trustedAdults = proofMetrics.find((m) => m.id === 'trusted-adults')?.displayValue ?? '1,031+'

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
    id: 'started-building',
    date: '2016',
    year: 2016,
    title: 'Started building products',
    description: 'Began shipping software that solves real problems.',
    type: 'milestone',
    status: 'completed',
  },
  {
    id: 'kch-concept',
    date: '2024',
    year: 2024,
    title: 'Kids Call Home — development',
    description: 'Identified the family communication gap and began building.',
    type: 'product',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-launch',
    date: '2025',
    year: 2025,
    title: 'Kids Call Home — mobile launch',
    description: 'Released on iOS and Android. First families connected.',
    type: 'product',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-web',
    date: '2025',
    year: 2025,
    title: 'Kids Call Home — web',
    description: 'Extended the platform to web for broader accessibility.',
    type: 'product',
    company: 'Kids Call Home',
    status: 'completed',
  },
  {
    id: 'kch-growth',
    date: '2026',
    year: 2026,
    title: 'Kids Call Home — growth',
    description: `Available in ${countries} countries. ${trustedAdults} trusted adults connected.`,
    type: 'milestone',
    company: 'Kids Call Home',
    status: 'active',
  },
]
