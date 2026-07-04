// src/pages/ContactPage.tsx — Dedicated contact page
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { contactConfig } from '@/data/contact'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { ContactSection } from '@/components/sections/ContactSection'
import { Section } from '@/components/ui/section'

export function ContactPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Contact', url: `${siteConfig.url}/contact` },
  ])

  return (
    <>
      <PageMetaTags meta={pageMeta.contact} />
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Reach out"
        title={contactConfig.title}
        description={contactConfig.description}
      />
      <Section className="pt-0" animate={false} eyebrow="Inquiry types" title="Topics">
        <div className="flex flex-wrap gap-3">
          {contactConfig.inquiryTypes.map((type) => (
            <span
              key={type}
              className="rounded-full border border-border bg-accent px-4 py-2 text-sm"
            >
              {type}
            </span>
          ))}
        </div>
      </Section>
      <ContactSection hideHeader />
    </>
  )
}
