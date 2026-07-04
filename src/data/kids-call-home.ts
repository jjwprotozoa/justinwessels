// src/data/kids-call-home.ts — Flagship product data for Kids Call Home
import { getMetricValue } from './metrics'

export interface Feature {
  title: string
  description: string
}

export interface Platform {
  name: string
  status: 'live'
  url: string
}

export interface TimelineEvent {
  date: string
  title: string
  description: string
}

export const kidsCallHome = {
  name: 'Kids Call Home',
  tagline: 'Trusted technology that helps families stay connected.',
  url: 'https://kidscallhome.com',
  appStoreUrl: 'https://apps.apple.com/app/kids-call-home',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.kidscallhome',
  summary:
    'A safe, simple way for children to reach family — across iOS, Android, and web.',
  features: [
    {
      title: 'One-tap calling',
      description: 'Children connect with a single tap.',
    },
    {
      title: 'Parent-controlled',
      description: 'Parents approve every contact.',
    },
    {
      title: 'Cross-platform',
      description: 'iOS, Android, and web.',
    },
  ] satisfies Feature[],
  platforms: [
    { name: 'iOS', status: 'live', url: 'https://apps.apple.com/app/kids-call-home' },
    {
      name: 'Android',
      status: 'live',
      url: 'https://play.google.com/store/apps/details?id=com.kidscallhome',
    },
    { name: 'Web', status: 'live', url: 'https://kidscallhome.com' },
  ] satisfies Platform[],
  timeline: [
    {
      date: '2024',
      title: 'Founded',
      description: 'Company established.',
    },
    {
      date: '2025',
      title: 'Mobile launch',
      description: 'iOS and Android released.',
    },
    {
      date: '2025',
      title: 'Web',
      description: 'Web platform launched.',
    },
    {
      date: '2026',
      title: 'Global',
      description: `${getMetricValue('countries')} countries · ${getMetricValue('trusted-adults')} trusted adults.`,
    },
  ] satisfies TimelineEvent[],
  links: [
    { label: 'Visit Kids Call Home', url: 'https://kidscallhome.com', primary: true },
    { label: 'App Store', url: 'https://apps.apple.com/app/kids-call-home', primary: false },
    {
      label: 'Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.kidscallhome',
      primary: false,
    },
  ],
} as const
