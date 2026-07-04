// src/data/site.ts — Core site configuration and founder identity
export const siteConfig = {
  name: 'Justin Wessels',
  title: 'Justin Wessels — Founder of Kids Call Home',
  description:
    'Justin Wessels builds technology that solves meaningful real-world problems. Founder of Kids Call Home, building trusted technology that helps families stay connected.',
  url: 'https://justinwessels.com',
  locale: 'en_US',
  founder: {
    name: 'Justin Wessels',
    role: 'Founder & Builder',
    tagline: 'Building products that solve real problems.',
    subheading:
      'Founder of Kids Call Home, building trusted technology that helps families stay connected.',
    email: 'hello@justinwessels.com',
    location: 'Global',
    sameAs: [
      'https://www.linkedin.com/in/justinwessels',
      'https://github.com/justinwessels',
      'https://kidscallhome.com',
    ],
  },
  flagship: {
    name: 'Kids Call Home',
    slug: 'kids-call-home',
    url: 'https://kidscallhome.com',
    tagline: 'Trusted technology that helps families stay connected.',
  },
} as const

export type SiteConfig = typeof siteConfig
