// src/components/sections/EvidenceSection.tsx — Verifiable evidence cards
import { Link } from 'react-router-dom'
import {
  Apple,
  Smartphone,
  Globe,
  Code2,
  Search,
  Phone,
  Building2,
  Package,
  ArrowRight,
} from 'lucide-react'
import { evidenceItems, type EvidenceItem } from '@/data/evidence'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const iconMap = {
  'app-store': Apple,
  'play-store': Smartphone,
  web: Globe,
  github: Code2,
  search: Search,
  calls: Phone,
  globe: Globe,
  building: Building2,
  package: Package,
}

function EvidenceCard({ item }: { item: EvidenceItem }) {
  const Icon = iconMap[item.icon]
  const content = (
    <Card className="h-full border-border/60 transition-shadow hover:shadow-elevated">
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
            <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
          </div>
          <Badge variant={item.status}>{item.status}</Badge>
        </div>
        <h3 className="mt-4 font-medium">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">{item.description}</p>
      </CardContent>
    </Card>
  )

  if (item.url) {
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    )
  }
  return content
}

export function EvidenceSection({ limit, hideHeader }: { limit?: number; hideHeader?: boolean }) {
  const items = limit ? evidenceItems.slice(0, limit) : evidenceItems

  return (
    <Section
      id="evidence"
      eyebrow="Proof"
      title="Evidence, not testimonials."
      description="Verifiable facts for investors, journalists, partners, and due diligence."
      hideHeader={hideHeader}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <EvidenceCard key={item.id} item={item} />
        ))}
      </div>

      {limit && (
        <div className="mt-10 text-center">
          <Button asChild variant="secondary">
            <Link to="/evidence">
              View all evidence
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  )
}
