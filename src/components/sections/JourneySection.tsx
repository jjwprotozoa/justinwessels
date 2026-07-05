// src/components/sections/JourneySection.tsx — Founder journey timeline with glass rail
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { journeyMilestones } from '@/data/journey'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function TimelineItem({
  milestone,
  isLast,
}: {
  milestone: (typeof journeyMilestones)[0]
  isLast: boolean
}) {
  return (
    <div className="relative flex gap-4 pb-6 sm:gap-5 sm:pb-7">
      {!isLast && (
        <div
          className="absolute top-3 left-[10px] h-full w-px bg-foreground/10"
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          'relative z-10 mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 sm:h-[22px] sm:w-[22px]',
          milestone.status === 'active' ? 'border-kch bg-kch' : 'border-foreground bg-foreground',
        )}
        aria-hidden="true"
      />
      <div className="liquid-glass-card min-w-0 flex-1 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <time className="text-sm font-medium tabular-nums text-muted-foreground">
            {milestone.date}
          </time>
          <Badge variant={milestone.status === 'active' ? 'active' : 'default'}>
            {milestone.type}
          </Badge>
        </div>
        <h3 className="mt-1.5 text-base font-semibold tracking-tight">{milestone.title}</h3>
        {milestone.company && (
          <p className="text-sm text-muted-foreground">{milestone.company}</p>
        )}
        <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{milestone.description}</p>
      </div>
    </div>
  )
}

export function JourneySection({
  limit,
  hideHeader,
  compact,
}: {
  limit?: number
  hideHeader?: boolean
  compact?: boolean
}) {
  const milestones = limit ? journeyMilestones.slice(0, limit) : journeyMilestones

  return (
    <Section
      id="journey"
      eyebrow="Timeline"
      title="Founder journey"
      description="Companies founded. Products launched. Milestones reached."
      hideHeader={hideHeader}
      compact={compact}
      glass
    >
      <div className="max-w-xl">
        {milestones.map((milestone, i) => (
          <TimelineItem
            key={milestone.id}
            milestone={milestone}
            isLast={i === milestones.length - 1}
          />
        ))}
      </div>

      {limit && journeyMilestones.length > limit && (
        <div className="mt-6 sm:mt-8">
          <Button asChild variant="secondary">
            <Link to="/journey">
              Full timeline
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  )
}
