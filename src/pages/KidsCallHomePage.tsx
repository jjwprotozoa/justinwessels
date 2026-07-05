// src/pages/KidsCallHomePage.tsx — Dedicated Kids Call Home page
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

      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Eyebrow className="mb-3">Flagship</Eyebrow>
              <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
                {kidsCallHome.name}
              </h1>
              <p className="mt-4 max-w-md text-base text-muted leading-relaxed">
                {kidsCallHome.summary}
              </p>
            </div>
            <ProductMockup compact className="lg:justify-self-end" />
          </div>
        </div>
      </header>

      <MetricsBar
        id="kch-metrics"
        showHeader={false}
        variant="bar"
        metrics={kchMetrics}
        className="py-6 md:py-8"
      />

      <Section eyebrow="Features" title="Built for families." className="gradient-subtle py-16 md:py-24" animate={false}>
        <dl className="grid gap-6 sm:grid-cols-3 md:gap-8">
          {kidsCallHome.features.map((f) => (
            <div key={f.title}>
              <dt className="font-medium">{f.title}</dt>
              <dd className="mt-1 text-sm text-muted leading-snug">{f.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Platforms" title="Available everywhere." className="py-16 md:py-24" animate={false}>
        <div className="flex flex-wrap gap-3">
          {kidsCallHome.platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[120px] flex-col items-center rounded-xl border border-border/60 px-6 py-5 transition-colors hover:border-border md:px-8 md:py-6"
            >
              <p className="text-lg font-semibold">{p.name}</p>
              <Badge variant="verified" className="mt-2">
                Live
              </Badge>
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
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

      <Section eyebrow="Timeline" title="Milestones." className="pb-20 md:pb-28" animate={false}>
        <div className="max-w-xl space-y-5">
          {kidsCallHome.timeline.map((event) => (
            <div key={event.title} className="flex gap-6 md:gap-8">
              <time className="w-12 shrink-0 text-sm font-medium text-muted tabular-nums md:w-14">
                {event.date}
              </time>
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="mt-0.5 text-sm text-muted leading-snug">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Metrics updated {metricsConfig.lastUpdated}
        </p>
      </Section>
    </>
  )
}
