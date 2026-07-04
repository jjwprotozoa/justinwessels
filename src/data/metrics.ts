// src/data/metrics.ts — Data-driven metrics system with future API support
export type MetricFormat = 'number' | 'text'

export interface Metric {
  id: string
  title: string
  value: number | string
  format: MetricFormat
  suffix?: string
  prefix?: string
  description: string
  lastUpdated: string
  source: string
  /** Future: endpoint for live metric updates */
  apiEndpoint?: string
}

export const metricsConfig = {
  lastRefreshed: '2026-07-01',
  metrics: [
    {
      id: 'companies-founded',
      title: 'Companies Founded',
      value: 4,
      format: 'number',
      description: 'Ventures built from the ground up.',
      lastUpdated: '2026-07-01',
      source: 'Founder records',
    },
    {
      id: 'published-apps',
      title: 'Published Apps',
      value: 3,
      format: 'number',
      description: 'Live on App Store, Play Store, and web.',
      lastUpdated: '2026-07-01',
      source: 'App Store & Play Store',
    },
    {
      id: 'family-calls',
      title: 'Family Calls Completed',
      value: 10000,
      format: 'number',
      suffix: '+',
      description: 'Real connections between families worldwide.',
      lastUpdated: '2026-07-01',
      source: 'Kids Call Home platform',
      apiEndpoint: '/api/metrics/family-calls',
    },
    {
      id: 'countries-reached',
      title: 'Countries Reached',
      value: 40,
      format: 'number',
      suffix: '+',
      description: 'Families connected across borders.',
      lastUpdated: '2026-07-01',
      source: 'Kids Call Home analytics',
      apiEndpoint: '/api/metrics/countries',
    },
    {
      id: 'knowledge-pages',
      title: 'Knowledge Pages',
      value: 50,
      format: 'number',
      suffix: '+',
      description: 'Documentation and guides published.',
      lastUpdated: '2026-07-01',
      source: 'Platform documentation',
    },
    {
      id: 'years-building',
      title: 'Years Building',
      value: 10,
      format: 'number',
      suffix: '+',
      description: 'Shipping products that matter.',
      lastUpdated: '2026-07-01',
      source: 'Founder records',
    },
    {
      id: 'platforms',
      title: 'Platforms',
      value: 3,
      format: 'number',
      description: 'iOS, Android, and web.',
      lastUpdated: '2026-07-01',
      source: 'Product distribution',
    },
    {
      id: 'safety-first',
      title: 'Safety First',
      value: 'Always',
      format: 'text',
      description: 'Family safety built into every decision.',
      lastUpdated: '2026-07-01',
      source: 'Product principles',
    },
  ] satisfies Metric[],
} as const
