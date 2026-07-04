// src/pages/WritingPage.tsx — Writing page with topic taxonomy
import { pageMeta, buildBreadcrumbJsonLd } from '@/data/seo'
import { siteConfig } from '@/data/site'
import { writingTopics } from '@/data/writing'
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageHeader } from '@/components/sections/PageHeader'
import { WritingSection } from '@/components/sections/WritingSection'
import { Section } from '@/components/ui/section'
import { Card, CardContent } from '@/components/ui/card'

export function WritingPage() {
  const breadcrumbs = buildBreadcrumbJsonLd([
    { name: 'Home', url: siteConfig.url },
    { name: 'Writing', url: `${siteConfig.url}/writing` },
  ])

  return (
    <>
      <PageMetaTags meta={pageMeta.writing} />
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Essays"
        title="Writing"
        description="Thoughts on building products, family technology, and solving real problems."
      />
      <Section className="pt-0 pb-8" animate={false} eyebrow="Topics" title="What I write about.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {writingTopics.map((topic) => (
            <Card key={topic.id} className="border-border/60">
              <CardContent className="p-6">
                <h3 className="font-medium">{topic.label}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
      <WritingSection showAll hideHeader />
    </>
  )
}
