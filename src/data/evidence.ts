// src/data/evidence.ts — Verifiable evidence (real items only)
import { proofMetrics } from './metrics'

function metricDisplay(id: string): string {
  return proofMetrics.find((m) => m.id === id)?.displayValue ?? ''
}

export interface EvidenceItem {
  id: string
  title: string
  description: string
  category: 'distribution' | 'impact'
  url?: string
  status: 'verified'
  icon: 'app-store' | 'play-store' | 'web' | 'github' | 'calls' | 'globe' | 'users'
}

export const evidenceItems: EvidenceItem[] = [
  {
    id: 'app-store',
    title: 'Apple App Store',
    description: 'Published iOS application available for download.',
    category: 'distribution',
    url: 'https://apps.apple.com/app/kids-call-home',
    status: 'verified',
    icon: 'app-store',
  },
  {
    id: 'play-store',
    title: 'Google Play',
    description: 'Published Android application available for download.',
    category: 'distribution',
    url: 'https://play.google.com/store/apps/details?id=com.kidscallhome',
    status: 'verified',
    icon: 'play-store',
  },
  {
    id: 'web-platform',
    title: 'Web Platform',
    description: 'Production web application at kidscallhome.com.',
    category: 'distribution',
    url: 'https://kidscallhome.com',
    status: 'verified',
    icon: 'web',
  },
  {
    id: 'github',
    title: 'GitHub',
    description: 'Public engineering profile and project history.',
    category: 'distribution',
    url: 'https://github.com/justinwessels',
    status: 'verified',
    icon: 'github',
  },
  {
    id: 'trusted-adults',
    title: 'Trusted Adults Connected',
    description: `${metricDisplay('trusted-adults')} trusted adults connected on the platform.`,
    category: 'impact',
    status: 'verified',
    icon: 'users',
  },
  {
    id: 'family-calls',
    title: 'Safe Family Calls',
    description: `${metricDisplay('safe-family-calls')} safe family calls completed.`,
    category: 'impact',
    status: 'verified',
    icon: 'calls',
  },
  {
    id: 'global-availability',
    title: 'Countries Available',
    description: `Available in ${metricDisplay('countries')} countries via App Store and Google Play.`,
    category: 'impact',
    status: 'verified',
    icon: 'globe',
  },
]

export const evidenceCategories = [
  { id: 'distribution', label: 'Distribution' },
  { id: 'impact', label: 'Impact' },
] as const
