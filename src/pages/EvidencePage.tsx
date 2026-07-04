// src/pages/EvidencePage.tsx — Full evidence page for due diligence
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { evidenceCategories } from '@/data/evidence'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { EvidenceSection } from '@/components/sections/EvidenceSection'
import { Section } from '@/components/ui/section'

export function EvidencePage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Evidence', url: `${siteConfig.url}/evidence` },
  ])

  return (
    <>
      <PageMetaTags meta={pageMeta.evidence} />
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Due diligence"
        title="Evidence"
        description="Verifiable proof of distribution, platform metrics, and impact."
      />
      <Section className="pt-0 pb-8" animate={false}>
        <div className="flex flex-wrap gap-3">
          {evidenceCategories.map((cat) => (
            <span
              key={cat.id}
              className="rounded-full border border-border bg-accent px-4 py-1.5 text-sm text-muted"
            >
              {cat.label}
            </span>
          ))}
        </div>
      </Section>
      <EvidenceSection hideHeader />
    </>
  )
}
