// src/components/sections/EvidenceSection.tsx — Verifiable evidence cards
import { Link } from 'react-router-dom'
import {
  Apple,
  Smartphone,
  Globe,
  Code2,
  Search,
  Award,
  Mic,
  Download,
  ArrowRight,
} from 'lucide-react'
import { evidenceItems, type EvidenceItem, type EvidenceType } from '@/data/evidence'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

const iconMap: Record<EvidenceType, typeof Globe> = {
  'app-store': Apple,
  'play-store': Smartphone,
  website: Globe,
  search: Search,
  'global-availability': Globe,
  github: Code2,
  press: Globe,
  awards: Award,
  speaking: Mic,
  downloads: Download,
}

function EvidenceCard({ item }: { item: EvidenceItem }) {
  const Icon = iconMap[item.type]
  const content = (
    <article className="group flex h-full flex-col rounded-xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-border hover:bg-card">
      <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
      <h3 className="mt-4 font-medium">{item.title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted leading-snug">{item.description}</p>
      {item.value && (
        <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{item.value}</p>
      )}
    </article>
  )

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        aria-label={`${item.title} (opens in new tab)`}
      >
        {content}
      </a>
    )
  }
  return content
}

export function EvidenceSection({
  limit,
  hideHeader,
  compact,
}: {
  limit?: number
  hideHeader?: boolean
  compact?: boolean
}) {
  const items = limit ? evidenceItems.slice(0, limit) : evidenceItems

  return (
    <Section
      id="evidence"
      title="Evidence"
      description="Verifiable facts. No testimonials."
      hideHeader={hideHeader}
      compact={compact}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <EvidenceCard key={item.id} item={item} />
        ))}
      </div>

      {limit && evidenceItems.length > limit && (
        <div className="mt-12">
          <Button asChild variant="secondary">
            <Link to="/evidence">
              All evidence
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  )
}
