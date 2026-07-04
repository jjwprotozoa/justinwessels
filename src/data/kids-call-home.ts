// src/data/kids-call-home.ts — Flagship product data for Kids Call Home
export interface Feature {
  title: string
  description: string
}

export interface Platform {
  name: string
  status: 'live' | 'coming-soon'
  url?: string
}

export interface TimelineEvent {
  date: string
  title: string
  description: string
}

export interface Highlight {
  label: string
  value: string
}

export const kidsCallHome = {
  name: 'Kids Call Home',
  tagline: 'Trusted technology that helps families stay connected.',
  url: 'https://kidscallhome.com',
  appStoreUrl: 'https://apps.apple.com/app/kids-call-home',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.kidscallhome',
  problem: {
    title: 'The problem',
    description:
      'Families are spread across cities, countries, and time zones. Parents need a simple, safe way for children to reach them — without complexity, without compromise.',
  },
  mission: {
    title: 'The mission',
    description:
      'Build technology that makes family connection effortless, secure, and accessible to everyone — regardless of device, location, or technical ability.',
  },
  features: [
    {
      title: 'One-tap calling',
      description: 'Children connect to family with a single tap. No phone numbers to remember.',
    },
    {
      title: 'Parent-controlled access',
      description: 'Parents approve every contact. Full visibility into who children can reach.',
    },
    {
      title: 'Cross-platform',
      description: 'Works on iOS, Android, and web. Families connect regardless of device.',
    },
    {
      title: 'Safety by design',
      description: 'Built from the ground up with child safety as the primary constraint.',
    },
    {
      title: 'Global availability',
      description: 'Available in 40+ countries with localized experiences.',
    },
    {
      title: 'Reliable infrastructure',
      description: 'Engineered for uptime. When families need to connect, it works.',
    },
  ] satisfies Feature[],
  platforms: [
    { name: 'iOS', status: 'live', url: 'https://apps.apple.com/app/kids-call-home' },
    { name: 'Android', status: 'live', url: 'https://play.google.com/store/apps/details?id=com.kidscallhome' },
    { name: 'Web', status: 'live', url: 'https://kidscallhome.com' },
  ] satisfies Platform[],
  highlights: [
    { label: 'Platforms', value: 'iOS · Android · Web' },
    { label: 'Availability', value: '40+ countries' },
    { label: 'Focus', value: 'Family safety' },
    { label: 'Status', value: 'Actively developed' },
  ] satisfies Highlight[],
  timeline: [
    {
      date: '2024',
      title: 'Concept & research',
      description: 'Identified the gap in family communication technology for children.',
    },
    {
      date: '2025',
      title: 'First release',
      description: 'Launched on iOS and Android with core calling features.',
    },
    {
      date: '2025',
      title: 'Web platform',
      description: 'Extended reach with a web application for broader accessibility.',
    },
    {
      date: '2026',
      title: 'Global expansion',
      description: 'Expanded to 40+ countries with growing user base.',
    },
  ] satisfies TimelineEvent[],
  links: [
    { label: 'Visit Kids Call Home', url: 'https://kidscallhome.com', primary: true },
    { label: 'App Store', url: 'https://apps.apple.com/app/kids-call-home', primary: false },
    { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.kidscallhome', primary: false },
  ],
} as const
