// src/data/navigation.ts — Production navigation (launch routes only)
export interface NavItem {
  label: string
  href: string
  description?: string
}

export interface FooterNavLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterNavGroup {
  title: string
  links: FooterNavLink[]
}

export const primaryNav: NavItem[] = [
  { label: 'Kids Call Home', href: '/kids-call-home', description: 'Flagship product' },
  { label: 'Journey', href: '/journey', description: 'Founder timeline' },
  { label: 'Evidence', href: '/evidence', description: 'Verifiable proof' },
  { label: 'Ventures', href: '/ventures', description: 'Companies founded' },
  { label: 'Contact', href: '/contact', description: 'Get in touch' },
]

export const footerNavGroups: FooterNavGroup[] = [
  {
    title: 'Products',
    links: [{ label: 'Kids Call Home', href: 'https://kidscallhome.com', external: true }],
  },
  {
    title: 'Company',
    links: [
      { label: 'Journey', href: '/journey' },
      { label: 'Evidence', href: '/evidence' },
      { label: 'Ventures', href: '/ventures' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com/jjwprotozoa', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/justinwessels/', external: true },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export const homeSections = [
  { id: 'hero', label: 'Home' },
  { id: 'metrics', label: 'Proof' },
  { id: 'kids-call-home', label: 'Kids Call Home' },
  { id: 'mission', label: 'Mission' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'journey', label: 'Journey' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'contact', label: 'Contact' },
] as const
