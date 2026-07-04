// src/data/evidence.ts — Verifiable evidence (real items only)
import { getMetricValue } from './metrics'

export type EvidenceType =
  | 'app-store'
  | 'play-store'
  | 'website'
  | 'search'
  | 'global-availability'
  | 'github'
  | 'press'
  | 'awards'
  | 'speaking'
  | 'downloads'

export interface EvidenceItem {
  id: string
  title: string
  description: string
  type: EvidenceType
  url?: string
  status: 'verified'
  value?: string
}

export const evidenceItems: EvidenceItem[] = [
  {
    id: 'app-store',
    title: 'Apple App Store',
    description: 'Published iOS application.',
    type: 'app-store',
    url: 'https://apps.apple.com/app/kids-call-home',
    status: 'verified',
  },
  {
    id: 'play-store',
    title: 'Google Play',
    description: 'Published Android application.',
    type: 'play-store',
    url: 'https://play.google.com/store/apps/details?id=com.kidscallhome',
    status: 'verified',
  },
  {
    id: 'website',
    title: 'Website',
    description: 'Production web application at kidscallhome.com.',
    type: 'website',
    url: 'https://kidscallhome.com',
    status: 'verified',
  },
  {
    id: 'global-availability',
    title: 'Global Availability',
    description: `Available in ${getMetricValue('countries')} countries.`,
    type: 'global-availability',
    status: 'verified',
    value: getMetricValue('countries'),
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Public engineering profile.',
    type: 'github',
    url: 'https://github.com/justinwessels',
    status: 'verified',
  },
]

export const evidenceCategories = [
  { id: 'distribution', label: 'Distribution' },
  { id: 'presence', label: 'Presence' },
] as const
