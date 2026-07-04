// src/data/metrics.ts — Verified Kids Call Home proof metrics (static launch data)

// TODO: Replace static metrics with a safe public Kids Call Home metrics endpoint later.
// Future endpoint shape:
// GET https://kidscallhome.com/api/public-metrics
// {
//   trustedAdults: number,
//   trustedAdults7d: number,
//   callsCompleted: number,
//   countriesAvailable: number,
//   lastUpdated: string
// }

export interface ProofMetric {
  id: string
  label: string
  value: number
  displayValue: string
  source: string
  lastUpdated: string
  isLive: boolean
  futureApiKey: string
}

export const proofMetrics: ProofMetric[] = [
  {
    id: 'trusted-adults',
    label: 'Trusted adults connected',
    value: 1031,
    displayValue: '1,031+',
    source: 'Kids Call Home analytics',
    lastUpdated: '2026-07-04',
    isLive: false,
    futureApiKey: 'trustedAdults',
  },
  {
    id: 'weekly-joined',
    label: 'Joined this week',
    value: 106,
    displayValue: '+106',
    source: 'Kids Call Home analytics',
    lastUpdated: '2026-07-04',
    isLive: false,
    futureApiKey: 'trustedAdults7d',
  },
  {
    id: 'safe-family-calls',
    label: 'Safe family calls',
    value: 1900,
    displayValue: '1,900+',
    source: 'Kids Call Home analytics',
    lastUpdated: '2026-07-04',
    isLive: false,
    futureApiKey: 'callsCompleted',
  },
  {
    id: 'countries',
    label: 'Countries available',
    value: 177,
    displayValue: '177',
    source: 'App Store / Google Play availability',
    lastUpdated: '2026-07-04',
    isLive: false,
    futureApiKey: 'countriesAvailable',
  },
]

export const proofMetricsConfig = {
  lastUpdated: '2026-07-04',
  growthMetricId: 'weekly-joined',
  headlineMetricIds: ['trusted-adults', 'safe-family-calls', 'countries'] as const,
}

export function getProofMetric(id: string): ProofMetric | undefined {
  return proofMetrics.find((m) => m.id === id)
}

export function getHeadlineMetrics(): ProofMetric[] {
  return proofMetricsConfig.headlineMetricIds
    .map((id) => getProofMetric(id))
    .filter((m): m is ProofMetric => m !== undefined)
}

export function getGrowthMetric(): ProofMetric | undefined {
  return getProofMetric(proofMetricsConfig.growthMetricId)
}
