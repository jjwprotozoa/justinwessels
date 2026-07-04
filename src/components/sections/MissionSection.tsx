// src/components/sections/MissionSection.tsx — Mission (the WHY) section
import { mission } from '@/data/mission'
import { Section } from '@/components/ui/section'

export function MissionSection() {
  return (
    <Section id="mission" eyebrow={mission.eyebrow} title={mission.title}>
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <p className="max-w-md text-base text-muted leading-relaxed">{mission.paragraph}</p>

        <dl className="grid gap-6 sm:grid-cols-2">
          {mission.principles.map((principle) => (
            <div key={principle.title}>
              <dt className="font-medium">{principle.title}</dt>
              <dd className="mt-1 text-sm text-muted leading-snug">{principle.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
