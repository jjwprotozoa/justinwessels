// src/pages/KidsCallHomePage.tsx — Dedicated Kids Call Home page
import { ExternalLink } from 'lucide-react'
import { kidsCallHome } from '@/data/kids-call-home'
import { getMetric, metricsConfig } from '@/data/metrics'
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { MetricsBar } from '@/components/sections/MetricsBar'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProductMockup } from '@/components/visuals/ProductMockup'

const kchMetricIds = ['trusted-adults', 'family-calls', 'countries', 'platforms'] as const
const kchMetrics = kchMetricIds
  .map((id) => getMetric(id))
  .filter((m): m is NonNullable<typeof m> => m !== undefined)

export function KidsCallHomePage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Kids Call Home', url: `${siteConfig.url}/kids-call-home` },
  ])

  return (
    <>
      <PageMetaTags meta={pageMeta.kidsCallHome} />
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Flagship"
        title={kidsCallHome.name}
        description={kidsCallHome.summary}
      />

      <Section animate={false} className="pt-0 pb-0">
        <ProductMockup />
      </Section>

      <MetricsBar
        id="kch-metrics"
        showHeader={false}
        compact
        metrics={kchMetrics}
      />

      <Section eyebrow="Features" title="Built for families." className="gradient-subtle pt-16">
        <dl className="grid gap-8 sm:grid-cols-3">
          {kidsCallHome.features.map((f) => (
            <div key={f.title}>
              <dt className="font-medium">{f.title}</dt>
              <dd className="mt-1 text-sm text-muted leading-snug">{f.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Platforms" title="Available everywhere.">
        <div className="flex flex-wrap gap-3">
          {kidsCallHome.platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[120px] flex-col items-center rounded-xl border border-border/60 px-8 py-6 transition-colors hover:border-border"
            >
              <p className="text-lg font-semibold">{p.name}</p>
              <Badge variant="verified" className="mt-2">
                Live
              </Badge>
            </a>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {kidsCallHome.links.map((link) => (
            <Button key={link.label} asChild variant={link.primary ? 'default' : 'secondary'}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ))}
        </div>
      </Section>

      <Section eyebrow="Timeline" title="Milestones." className="pb-32">
        <div className="max-w-xl space-y-6">
          {kidsCallHome.timeline.map((event) => (
            <div key={event.title} className="flex gap-8">
              <time className="w-14 shrink-0 text-sm font-medium text-muted tabular-nums">
                {event.date}
              </time>
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="mt-0.5 text-sm text-muted leading-snug">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Metrics updated {metricsConfig.lastUpdated}
        </p>
      </Section>
    </>
  )
}
