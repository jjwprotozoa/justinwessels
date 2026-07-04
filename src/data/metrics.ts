// src/data/metrics.ts — Founder metrics (single source of truth)

// TODO: Replace static metrics with a safe public Kids Call Home metrics endpoint later.
// Future endpoint shape:
// GET https://kidscallhome.com/api/public-metrics
// {
//   trustedAdults: number,
//   callsCompleted: number,
//   countriesAvailable: number,
//   lastUpdated: string
// }

export type MetricIcon =
  | 'users'
  | 'phone'
  | 'globe'
  | 'smartphone'
  | 'book'
  | 'layers'
  | 'building'
  | 'calendar'

export interface Metric {
  id: string
  title: string
  value: string
  numericValue?: number
  suffix?: string
  prefix?: string
  icon?: MetricIcon
  description?: string
  source?: string
  lastUpdated?: string
  animate?: boolean
  futureApiKey?: string
}

export const metricsConfig = {
  lastUpdated: '2026-07-04',
  homepageMetricIds: [
    'trusted-adults',
    'family-calls',
    'countries',
    'published-apps',
    'knowledge-pages',
    'platforms',
    'companies-founded',
    'years-building',
  ] as const,
}

export const metrics: Metric[] = [
  {
    id: 'trusted-adults',
    title: 'Trusted Adults Connected',
    value: '1,031+',
    numericValue: 1031,
    suffix: '+',
    icon: 'users',
    description: 'Verified adults connected on Kids Call Home.',
    source: 'Kids Call Home analytics',
    lastUpdated: '2026-07-04',
    animate: true,
    futureApiKey: 'trustedAdults',
  },
  {
    id: 'family-calls',
    title: 'Family Calls Completed',
    value: '1,900+',
    numericValue: 1900,
    suffix: '+',
    icon: 'phone',
    description: 'Safe family calls completed on the platform.',
    source: 'Kids Call Home analytics',
    lastUpdated: '2026-07-04',
    animate: true,
    futureApiKey: 'callsCompleted',
  },
  {
    id: 'countries',
    title: 'Countries Available',
    value: '177',
    numericValue: 177,
    icon: 'globe',
    description: 'App Store and Google Play distribution.',
    source: 'App Store / Google Play',
    lastUpdated: '2026-07-04',
    animate: true,
    futureApiKey: 'countriesAvailable',
  },
  {
    id: 'published-apps',
    title: 'Published Apps',
    value: '3',
    numericValue: 3,
    icon: 'smartphone',
    description: 'iOS, Android, and web applications.',
    lastUpdated: '2026-07-04',
    animate: true,
  },
  {
    id: 'knowledge-pages',
    title: 'Knowledge Pages',
    value: '100+',
    numericValue: 100,
    suffix: '+',
    icon: 'book',
    description: 'Published help and support content.',
    lastUpdated: '2026-07-04',
    animate: true,
  },
  {
    id: 'platforms',
    title: 'Platforms',
    value: 'iOS • Android • Web',
    icon: 'layers',
    description: 'Cross-platform product distribution.',
    animate: false,
  },
  {
    id: 'companies-founded',
    title: 'Companies Founded',
    value: '2',
    numericValue: 2,
    icon: 'building',
    description: 'Technology companies built from zero.',
    lastUpdated: '2026-07-04',
    animate: true,
  },
  {
    id: 'years-building',
    title: 'Years Building',
    value: '4+',
    numericValue: 4,
    suffix: '+',
    icon: 'calendar',
    description: 'Shipping products since 2022.',
    lastUpdated: '2026-07-04',
    animate: true,
  },
]

export function getMetric(id: string): Metric | undefined {
  return metrics.find((m) => m.id === id)
}

export function getMetricValue(id: string): string {
  return getMetric(id)?.value ?? ''
}

export function getHomepageMetrics(): Metric[] {
  return metricsConfig.homepageMetricIds
    .map((id) => getMetric(id))
    .filter((m): m is Metric => m !== undefined)
}
