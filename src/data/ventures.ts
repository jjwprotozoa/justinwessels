// src/data/ventures.ts — Active ventures (launch: verified only)
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
      'Trusted family communication. iOS, Android, and web. 177 countries.',
    status: 'primary',
    url: 'https://kidscallhome.com',
    founded: '2024',
    focus: 'Family technology',
    featured: true,
  },
]
