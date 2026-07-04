// src/pages/KidsCallHomePage.tsx — Dedicated Kids Call Home page
import { ExternalLink } from 'lucide-react'
import { kidsCallHome } from '@/data/kids-call-home'
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { ProofMetrics } from '@/components/sections/ProofMetrics'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProductMockup } from '@/components/visuals/ProductMockup'

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
        description={kidsCallHome.tagline}
      />

      <ProofMetrics id="kch-metrics" showHeader={false} compact />

      <Section animate={false} className="pt-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <ProductMockup />
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-medium text-muted uppercase tracking-wide">
                {kidsCallHome.problem.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed">{kidsCallHome.problem.description}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted uppercase tracking-wide">
                {kidsCallHome.mission.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed">{kidsCallHome.mission.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {kidsCallHome.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-border bg-card px-4 py-2.5 shadow-premium"
                >
                  <p className="text-[10px] font-medium text-muted uppercase tracking-wide">
                    {h.label}
                  </p>
                  <p className="text-sm font-medium">{h.value}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {kidsCallHome.links.map((link) => (
                <Button key={link.label} asChild variant={link.primary ? 'default' : 'secondary'}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Features" title="Built for families." className="gradient-subtle">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kidsCallHome.features.map((f) => (
            <Card key={f.title} className="border-border/60">
              <CardContent className="p-6">
                <h3 className="font-medium">{f.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Platforms" title="Available on iOS, Android, and web.">
        <div className="flex flex-wrap gap-4">
          {kidsCallHome.platforms.map((p) => (
            <Card key={p.name} className="min-w-[140px] border-border/60">
              <CardContent className="p-6 text-center">
                <p className="text-lg font-semibold">{p.name}</p>
                <Badge variant="verified" className="mt-2">
                  Live
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Timeline" title="How we got here.">
        <div className="max-w-2xl space-y-8">
          {kidsCallHome.timeline.map((event) => (
            <div key={event.title} className="flex gap-6">
              <time className="w-16 shrink-0 text-sm font-medium text-muted">{event.date}</time>
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
