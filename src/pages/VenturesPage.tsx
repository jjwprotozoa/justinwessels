// src/pages/VenturesPage.tsx — All ventures page
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { VenturesSection } from '@/components/sections/VenturesSection'

export function VenturesPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Ventures', url: `${siteConfig.url}/ventures` },
  ])

  return (
    <>
      <PageMetaTags meta={pageMeta.ventures} />
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Companies"
        title="Ventures"
        description="Kids Call Home — trusted technology that helps families stay connected."
      />
      <VenturesSection showAll hideHeader />
    </>
  )
}
