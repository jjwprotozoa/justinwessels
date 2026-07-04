// src/data/evidence.ts — Verifiable evidence cards for due diligence
export interface EvidenceItem {
  id: string
  title: string
  description: string
  category: 'distribution' | 'presence' | 'impact' | 'organization'
  url?: string
  status: 'verified' | 'growing' | 'active'
  icon: 'app-store' | 'play-store' | 'web' | 'github' | 'search' | 'calls' | 'globe' | 'building' | 'package'
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
    title: 'Open Development',
    description: 'Active engineering presence and public contributions.',
    category: 'presence',
    url: 'https://github.com/justinwessels',
    status: 'active',
    icon: 'github',
  },
  {
    id: 'search-presence',
    title: 'Growing Search Presence',
    description: 'Indexed and discoverable across major search engines.',
    category: 'presence',
    status: 'growing',
    icon: 'search',
  },
  {
    id: 'family-calls',
    title: 'Family Calls',
    description: '10,000+ completed family calls on the platform.',
    category: 'impact',
    status: 'verified',
    icon: 'calls',
  },
  {
    id: 'global-availability',
    title: 'Global Availability',
    description: 'Available in 40+ countries worldwide.',
    category: 'impact',
    status: 'verified',
    icon: 'globe',
  },
  {
    id: 'companies',
    title: 'Companies Founded',
    description: 'Four ventures founded and operated.',
    category: 'organization',
    status: 'verified',
    icon: 'building',
  },
  {
    id: 'products',
    title: 'Products Shipped',
    description: 'Multiple published applications across platforms.',
    category: 'organization',
    status: 'verified',
    icon: 'package',
  },
]

export const evidenceCategories = [
  { id: 'distribution', label: 'Distribution' },
  { id: 'presence', label: 'Presence' },
  { id: 'impact', label: 'Impact' },
  { id: 'organization', label: 'Organization' },
] as const
