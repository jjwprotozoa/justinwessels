// src/components/sections/WritingSection.tsx — Writing infrastructure section
import { Link } from 'react-router-dom'
import { ArrowRight, PenLine } from 'lucide-react'
import { writingTopics, writingPosts, writingConfig } from '@/data/writing'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function WritingSection({ showAll = false, hideHeader }: { showAll?: boolean; hideHeader?: boolean }) {
  const published = writingPosts.filter((p) => p.published)
  const topics = showAll ? writingTopics : writingTopics.slice(0, 4)

  return (
    <Section
      id="writing"
      eyebrow="Essays"
      title={writingConfig.title}
      description={writingConfig.description}
      hideHeader={hideHeader}
    >
      {published.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {published.map((post) => (
            <Card key={post.id} className="border-border/60">
              <CardContent className="p-6">
                <time className="text-xs text-muted">{post.date}</time>
                <h3 className="mt-2 text-lg font-medium">{post.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-accent/30 p-12 text-center">
          <PenLine className="mx-auto h-8 w-8 text-muted" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-medium">{writingConfig.emptyState.title}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted leading-relaxed">
            {writingConfig.emptyState.description}
          </p>
        </div>
      )}

      <div className="mt-10">
        <p className="mb-4 text-sm font-medium text-muted">Topics</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic.id}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm"
            >
              {topic.label}
            </span>
          ))}
        </div>
      </div>

      {!showAll && (
        <div className="mt-10">
          <Button asChild variant="secondary">
            <Link to="/writing">
              Writing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  )
}
