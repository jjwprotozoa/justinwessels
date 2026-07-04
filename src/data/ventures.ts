// src/data/ventures.ts — Companies and ventures data
export interface Venture {
  id: string
  name: string
  role: string
  description: string
  status: 'primary' | 'active' | 'completed'
  url?: string
  founded?: string
  focus: string
  featured?: boolean
}

export const ventures: Venture[] = [
  {
    id: 'kids-call-home',
    name: 'Kids Call Home',
    role: 'Founder',
    description:
      'Trusted technology that helps families stay connected. Published on iOS, Android, and web. Available in 40+ countries.',
    status: 'primary',
    url: 'https://kidscallhome.com',
    founded: '2024',
    focus: 'Family technology',
    featured: true,
  },
  {
    id: 'fluid-investment',
    name: 'Fluid Investment Group',
    role: 'Founder',
    description: 'Investment and financial technology solutions.',
    status: 'completed',
    founded: '2018',
    focus: 'Financial technology',
  },
  {
    id: 'access-innovation',
    name: 'Access Innovation Group',
    role: 'Founder',
    description: 'Accessibility and innovation in technology products.',
    status: 'completed',
    founded: '2020',
    focus: 'Accessibility',
  },
  {
    id: 'codmsquadup',
    name: 'CodmSquadUp',
    role: 'Founder',
    description: 'Community and gaming technology products.',
    status: 'active',
    founded: '2022',
    focus: 'Gaming & community',
  },
]
