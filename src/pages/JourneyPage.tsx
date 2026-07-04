// src/pages/JourneyPage.tsx — Full founder journey timeline
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { JourneySection } from '@/components/sections/JourneySection'

export function JourneyPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Journey', url: `${siteConfig.url}/journey` },
  ])

  return (
    <>
      <PageMetaTags meta={pageMeta.journey} />
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Timeline"
        title="Founder journey"
        description="Products launched. Companies founded. Milestones reached."
      />
      <JourneySection hideHeader />
    </>
  )
}
