// src/pages/KidsCallHomePage.tsx — Dedicated Kids Call Home page with glass surfaces
import { ExternalLink } from 'lucide-react'
import { kidsCallHome } from '@/data/kids-call-home'
import { getMetric, metricsConfig } from '@/data/metrics'
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { MetricsBar } from '@/components/sections/MetricsBar'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/eyebrow'
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

      <header className="px-3 pt-2 sm:px-4">
        <div className="mx-auto max-w-6xl liquid-glass rounded-[1.5rem] p-6 sm:rounded-[1.75rem] sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div>
              <Eyebrow className="mb-2.5">Flagship</Eyebrow>
              <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                {kidsCallHome.name}
              </h1>
              <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-4">
                {kidsCallHome.summary}
              </p>
            </div>
            <ProductMockup compact className="mx-auto lg:justify-self-end" />
          </div>
        </div>
      </header>

      <MetricsBar
        id="kch-metrics"
        showHeader={false}
        variant="bar"
        metrics={kchMetrics}
        className="px-3 py-4 sm:px-4 md:py-6"
      />

      <Section eyebrow="Features" title="Built for families." compact glass animate={false}>
        <dl className="grid gap-3 sm:grid-cols-3">
          {kidsCallHome.features.map((f) => (
            <div key={f.title} className="liquid-glass-card rounded-2xl p-4 sm:p-5">
              <dt className="font-semibold tracking-tight">{f.title}</dt>
              <dd className="mt-1.5 text-sm leading-snug text-muted-foreground">{f.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Platforms" title="Available everywhere." compact glass animate={false}>
        <div className="flex flex-wrap gap-3">
          {kidsCallHome.platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-card flex min-w-[120px] flex-col items-center rounded-2xl px-6 py-5 transition-transform duration-200 hover:scale-[1.02] md:px-8 md:py-6"
            >
              <p className="text-lg font-semibold">{p.name}</p>
              <Badge variant="verified" className="mt-2">
                Live
              </Badge>
            </a>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap">
          {kidsCallHome.links.map((link) => (
            <Button key={link.label} asChild variant={link.primary ? 'primary' : 'secondary'} className="w-full sm:w-auto">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          ))}
        </div>
      </Section>

      <Section eyebrow="Timeline" title="Milestones." compact glass animate={false}>
        <div className="max-w-xl space-y-3">
          {kidsCallHome.timeline.map((event) => (
            <div key={event.title} className="liquid-glass-card flex gap-4 rounded-2xl p-4 sm:gap-5 sm:p-5">
              <time className="w-12 shrink-0 text-sm font-medium tabular-nums text-muted-foreground sm:w-14">
                {event.date}
              </time>
              <div>
                <h3 className="font-semibold tracking-tight">{event.title}</h3>
                <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Metrics updated {metricsConfig.lastUpdated}
        </p>
      </Section>
    </>
  )
}
