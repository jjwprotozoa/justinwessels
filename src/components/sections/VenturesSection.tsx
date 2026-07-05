// src/components/sections/VenturesSection.tsx — Companies and ventures in glass cards
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { ventures } from '@/data/ventures'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function VentureCard({ venture }: { venture: (typeof ventures)[0] }) {
  const isPrimary = venture.status === 'primary'

  return (
    <article
      className={cn(
        'liquid-glass-card rounded-2xl p-5 transition-transform duration-200 hover:scale-[1.005] sm:p-6',
        isPrimary && 'ring-1 ring-kch/25',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {isPrimary && (
            <Badge variant="primary" className="mb-2.5">
              Primary
            </Badge>
          )}
          <h3 className={cn('font-semibold tracking-tight', isPrimary ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl')}>
            {venture.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {venture.role}
            {venture.founded && ` · ${venture.founded}`}
          </p>
        </div>
        <Badge
          variant={
            venture.status === 'primary' ? 'primary' : venture.status === 'active' ? 'active' : 'default'
          }
        >
          {venture.status}
        </Badge>
      </div>

      <p className="mt-4 max-w-lg text-sm leading-snug text-muted-foreground">{venture.description}</p>

      {venture.url && (
        <a
          href={venture.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071e3] transition-opacity hover:opacity-80"
        >
          Visit
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </article>
  )
}

export function VenturesSection({
  showAll = false,
  hideHeader,
  compact,
}: {
  showAll?: boolean
  hideHeader?: boolean
  compact?: boolean
}) {
  const displayed = showAll ? ventures : ventures

  return (
    <Section
      id="ventures"
      eyebrow="Companies"
      title="Ventures"
      hideHeader={hideHeader}
      compact={compact}
      glass
    >
      <div className="grid gap-3">
        {displayed.map((venture) => (
          <VentureCard key={venture.id} venture={venture} />
        ))}
      </div>

      {!showAll && ventures.length > 1 && (
        <div className="mt-8 sm:mt-10">
          <Button asChild variant="secondary">
            <Link to="/ventures">
              All ventures
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  )
}
