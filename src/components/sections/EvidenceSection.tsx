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
  Users,
  ArrowRight,
} from 'lucide-react'
import {
  evidenceItems,
  evidenceProductMetrics,
  type EvidenceItem,
  type EvidenceProductMetric,
  type EvidenceType,
} from '@/data/evidence'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

const iconMap: Record<EvidenceType, typeof Globe> = {
  'app-store': Apple,
  'play-store': Smartphone,
  website: Globe,
  search: Search,
  'global-availability': Globe,
  github: Code2,
  linkedin: Users,
  press: Globe,
  awards: Award,
  speaking: Mic,
  downloads: Download,
}

function EvidenceCard({ item }: { item: EvidenceItem }) {
  const Icon = iconMap[item.type]

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      aria-label={`${item.title} (opens in new tab)`}
    >
      <article className="group flex h-full flex-col rounded-xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-border hover:bg-card">
        <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
        <h3 className="mt-4 font-medium">{item.title}</h3>
        <p className="mt-1.5 flex-1 text-sm text-muted leading-snug">{item.description}</p>
        {item.value && (
          <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{item.value}</p>
        )}
      </article>
    </a>
  )
}

function EvidenceMetricCard({ metric }: { metric: EvidenceProductMetric }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-border hover:bg-card">
      <p className="text-2xl font-semibold tracking-tight tabular-nums">{metric.value}</p>
      <h3 className="mt-4 font-medium">{metric.title}</h3>
      <p className="mt-1.5 flex-1 text-sm text-muted leading-snug">{metric.source}</p>
    </article>
  )
}

export function EvidenceSection({
  limit,
  hideHeader,
  compact,
  showProductMetrics,
}: {
  limit?: number
  hideHeader?: boolean
  compact?: boolean
  showProductMetrics?: boolean
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

      {showProductMetrics && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {evidenceProductMetrics.map((metric) => (
            <EvidenceMetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      )}

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
