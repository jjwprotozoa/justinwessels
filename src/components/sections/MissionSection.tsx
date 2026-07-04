// src/components/sections/MissionSection.tsx — Mission (the WHY) section
import { mission } from '@/data/mission'
import { Section } from '@/components/ui/section'
import { Card, CardContent } from '@/components/ui/card'

export function MissionSection() {
  return (
    <Section
      id="mission"
      eyebrow={mission.eyebrow}
      title={mission.title}
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          {mission.paragraphs.map((p, i) => (
            <p key={i} className="text-lg text-muted leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {mission.principles.map((principle) => (
            <Card key={principle.title} className="border-border/60">
              <CardContent className="p-6">
                <h3 className="font-medium">{principle.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
