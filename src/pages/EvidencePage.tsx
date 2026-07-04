// src/pages/EvidencePage.tsx — Full evidence page for due diligence
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { EvidenceSection } from '@/components/sections/EvidenceSection'

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
        title="Evidence"
        description="Verifiable facts from distribution, platforms, and public presence."
      />
      <EvidenceSection hideHeader />
    </>
  )
}
