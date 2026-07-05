// src/data/evidence.ts — Verifiable evidence (real items only)
import { getMetricValue } from './metrics'

export type EvidenceType =
  | 'app-store'
  | 'play-store'
  | 'website'
  | 'search'
  | 'global-availability'
  | 'github'
  | 'linkedin'
  | 'press'
  | 'awards'
  | 'speaking'
  | 'downloads'

export interface EvidenceItem {
  id: string
  title: string
  description: string
  type: EvidenceType
  url: string
  status: 'verified'
  value?: string
}

export interface EvidenceProductMetric {
  id: string
  value: string
  title: string
  source: string
}

export const evidenceConfig = {
  lastUpdated: 'July 2026',
}

export const evidenceItems: EvidenceItem[] = [
  {
    id: 'app-store',
    title: 'Apple App Store',
    description:
      'Available on the App Store with actively maintained production releases.',
    type: 'app-store',
    url: 'https://apps.apple.com/app/call-home-family-connect/id6756827237',
    status: 'verified',
  },
  {
    id: 'play-store',
    title: 'Google Play',
    description:
      'Available on Google Play across phones, tablets and large-screen Android devices.',
    type: 'play-store',
    url: 'https://play.google.com/store/apps/details?id=com.kidscallhome.app',
    status: 'verified',
  },
  {
    id: 'website',
    title: 'Kids Call Home',
    description: 'Production platform serving families across web, desktop and mobile.',
    type: 'website',
    url: 'https://kidscallhome.com',
    status: 'verified',
  },
  {
    id: 'github',
    title: 'GitHub',
    description:
      'Public repositories documenting engineering work, experiments and product infrastructure.',
    type: 'github',
    url: 'https://github.com/jjwprotozoa',
    status: 'verified',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Founder updates, product milestones and engineering journey.',
    type: 'linkedin',
    url: 'https://www.linkedin.com/in/justinwessels/',
    status: 'verified',
  },
  {
    id: 'global-availability',
    title: 'Global Availability',
    description:
      'Available through Google Play in 177 countries and regions.',
    type: 'global-availability',
    url: 'https://play.google.com/store/apps/details?id=com.kidscallhome.app',
    status: 'verified',
    value: getMetricValue('countries'),
  },
]

export const evidenceProductMetrics: EvidenceProductMetric[] = [
  {
    id: 'trusted-adults',
    value: getMetricValue('trusted-adults'),
    title: 'Trusted adults connected',
    source: 'Kids Call Home production metrics',
  },
  {
    id: 'family-calls',
    value: getMetricValue('family-calls'),
    title: 'Safe family calls completed',
    source: 'Kids Call Home production metrics',
  },
  {
    id: 'countries',
    value: getMetricValue('countries'),
    title: 'Countries & regions',
    source: 'Google Play distribution',
  },
]
