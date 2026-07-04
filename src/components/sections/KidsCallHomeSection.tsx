// src/components/sections/KidsCallHomeSection.tsx — Featured flagship product section
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { kidsCallHome } from '@/data/kids-call-home'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ProductMockup } from '@/components/visuals/ProductMockup'

export function KidsCallHomeSection() {
  return (
    <Section id="kids-call-home" className="gradient-subtle" animate={false}>
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Badge variant="primary" className="mb-4">
            Flagship
          </Badge>
          <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            {kidsCallHome.name}
          </h2>
          <p className="mt-4 text-xl text-muted text-balance">{kidsCallHome.tagline}</p>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-muted uppercase tracking-wide">
                {kidsCallHome.problem.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed">{kidsCallHome.problem.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted uppercase tracking-wide">
                {kidsCallHome.mission.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed">{kidsCallHome.mission.description}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {kidsCallHome.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-xl border border-border bg-card px-4 py-2.5 shadow-premium"
              >
                <p className="text-[10px] font-medium text-muted uppercase tracking-wide">
                  {h.label}
                </p>
                <p className="text-sm font-medium">{h.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={kidsCallHome.url} target="_blank" rel="noopener noreferrer">
                Visit Kids Call Home
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/kids-call-home">
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <ProductMockup />
      </div>

      <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kidsCallHome.features.map((feature) => (
          <Card key={feature.title} className="border-border/60">
            <CardContent className="p-6">
              <h3 className="font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
