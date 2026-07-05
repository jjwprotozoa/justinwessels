// src/components/sections/EvidenceSection.tsx — Verifiable evidence in glass cards
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
import { cn } from '@/lib/utils'

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
      <article className="liquid-glass-card group flex h-full flex-col rounded-2xl p-5 transition-transform duration-200 hover:scale-[1.01] sm:p-6">
        <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <h3 className="mt-4 font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-snug text-muted-foreground">{item.description}</p>
        {item.value && (
          <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{item.value}</p>
        )}
      </article>
    </a>
  )
}

function EvidenceMetricCard({ metric }: { metric: EvidenceProductMetric }) {
  return (
    <article className="liquid-glass-card flex h-full flex-col rounded-2xl p-5 sm:p-6">
      <p className="text-2xl font-semibold tracking-tight tabular-nums">{metric.value}</p>
      <h3 className="mt-4 font-semibold tracking-tight">{metric.title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-snug text-muted-foreground">{metric.source}</p>
    </article>
  )
}

export function EvidenceSection({
  limit,
  hideHeader,
  compact,
  showProductMetrics,
  glass,
}: {
  limit?: number
  hideHeader?: boolean
  compact?: boolean
  showProductMetrics?: boolean
  glass?: boolean
}) {
  const items = limit ? evidenceItems.slice(0, limit) : evidenceItems

  return (
    <Section
      id="evidence"
      title="Evidence"
      description="Verifiable facts. No testimonials."
      hideHeader={hideHeader}
      compact={compact}
      glass={glass ?? !hideHeader}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <EvidenceCard key={item.id} item={item} />
        ))}
      </div>

      {showProductMetrics && (
        <div className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', items.length > 0 && 'mt-3')}>
          {evidenceProductMetrics.map((metric) => (
            <EvidenceMetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      )}

      {limit && evidenceItems.length > limit && (
        <div className="mt-8 sm:mt-10">
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
