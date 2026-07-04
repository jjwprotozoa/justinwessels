// src/components/sections/JourneySection.tsx — Founder journey timeline
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
    <div className="relative flex gap-6 pb-10">
      {!isLast && (
        <div className="absolute top-3 left-[11px] h-full w-px bg-border" aria-hidden="true" />
      )}
      <div
        className={cn(
          'relative z-10 mt-1 h-[22px] w-[22px] shrink-0 rounded-full border-2',
          milestone.status === 'active' ? 'border-kch bg-kch' : 'border-foreground bg-foreground',
        )}
        aria-hidden="true"
      />
      <div className="flex-1 pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <time className="text-sm font-medium text-muted">{milestone.date}</time>
          <Badge variant={milestone.status === 'active' ? 'active' : 'default'}>
            {milestone.type}
          </Badge>
        </div>
        <h3 className="mt-1 text-lg font-medium">{milestone.title}</h3>
        {milestone.company && (
          <p className="text-sm text-muted">{milestone.company}</p>
        )}
        <p className="mt-2 text-sm text-muted leading-relaxed">{milestone.description}</p>
      </div>
    </div>
  )
}

export function JourneySection({ limit, hideHeader }: { limit?: number; hideHeader?: boolean }) {
  const milestones = limit ? journeyMilestones.slice(0, limit) : journeyMilestones

  return (
    <Section
      id="journey"
      eyebrow="Timeline"
      title="Founder journey"
      description="The story told through products launched, companies founded, and milestones reached."
      hideHeader={hideHeader}
    >
      <div className="max-w-2xl">
        {milestones.map((milestone, i) => (
          <TimelineItem
            key={milestone.id}
            milestone={milestone}
            isLast={i === milestones.length - 1}
          />
        ))}
      </div>

      {limit && (
        <div className="mt-4">
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
