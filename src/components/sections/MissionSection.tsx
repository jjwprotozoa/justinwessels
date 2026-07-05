// src/components/sections/MissionSection.tsx — Mission section with glass principles grid
import { mission } from '@/data/mission'
import { Section } from '@/components/ui/section'

export function MissionSection() {
  return (
    <Section id="mission" eyebrow={mission.eyebrow} title={mission.title} compact glass>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <p className="max-w-md text-base leading-relaxed text-muted-foreground">{mission.paragraph}</p>

        <dl className="grid gap-3 sm:grid-cols-2">
          {mission.principles.map((principle) => (
            <div
              key={principle.title}
              className="liquid-glass-card rounded-2xl p-4 sm:p-5"
            >
              <dt className="font-semibold tracking-tight">{principle.title}</dt>
              <dd className="mt-1.5 text-sm leading-snug text-muted-foreground">
                {principle.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
