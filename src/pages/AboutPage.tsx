// src/pages/AboutPage.tsx — About the founder
import { about } from '@/data/about'
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { Section } from '@/components/ui/section'

export function AboutPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'About', url: `${siteConfig.url}/about` },
  ])

  return (
    <>
      <PageMetaTags meta={pageMeta.about} />
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Founder"
        title={about.title}
        description={about.subtitle}
      />

      <Section animate={false}>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xl leading-relaxed">{about.intro}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-lg text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted uppercase tracking-wide">Focus areas</h2>
            <ul className="mt-4 space-y-3">
              {about.focus.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-premium"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}
