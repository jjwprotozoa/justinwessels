// src/data/navigation.ts — Site navigation structure
export interface NavItem {
  label: string
  href: string
  description?: string
}

export const primaryNav: NavItem[] = [
  { label: 'Kids Call Home', href: '/kids-call-home', description: 'Flagship product' },
  { label: 'Journey', href: '/journey', description: 'Founder timeline' },
  { label: 'Evidence', href: '/evidence', description: 'Verifiable proof' },
  { label: 'Ventures', href: '/ventures', description: 'Companies founded' },
  { label: 'Writing', href: '/writing', description: 'Thoughts on building' },
  { label: 'About', href: '/about', description: 'The founder' },
]

export const footerNav: NavItem[] = [
  { label: 'Kids Call Home', href: '/kids-call-home' },
  { label: 'Journey', href: '/journey' },
  { label: 'Evidence', href: '/evidence' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
]

export const homeSections = [
  { id: 'hero', label: 'Home' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'kids-call-home', label: 'Kids Call Home' },
  { id: 'mission', label: 'Mission' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'journey', label: 'Journey' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
] as const
