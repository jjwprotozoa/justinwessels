// src/data/site.ts — Core site configuration and founder identity
export const siteConfig = {
  name: 'Justin Wessels',
  title: 'Justin Wessels — Founder of Kids Call Home',
  description:
    'Justin Wessels builds technology people can trust. Founder of Kids Call Home and other products solving meaningful real-world problems.',
  url: 'https://justinwessels.com',
  locale: 'en_US',
  founder: {
    name: 'Justin Wessels',
    role: 'Founder & Builder',
    tagline: 'Building technology people can trust.',
    subheading:
      'I build products that solve meaningful problems. Kids Call Home is my flagship — trusted technology helping families stay connected worldwide.',
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
