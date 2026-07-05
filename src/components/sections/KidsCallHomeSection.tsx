// src/components/sections/KidsCallHomeSection.tsx — Featured flagship product section
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { kidsCallHome } from '@/data/kids-call-home'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'
import { ProductMockup } from '@/components/visuals/ProductMockup'

export function KidsCallHomeSection() {
  return (
    <Section id="kids-call-home" className="gradient-subtle" animate={false}>
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="order-2 lg:order-1">
          <Eyebrow className="mb-4">Flagship product</Eyebrow>
          <h2 className="text-5xl font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl">
            {kidsCallHome.name}
          </h2>
          <p className="mt-6 max-w-sm text-lg text-muted text-balance">{kidsCallHome.summary}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {kidsCallHome.platforms.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/20"
              >
                {p.name}
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={kidsCallHome.url} target="_blank" rel="noopener noreferrer">
                Visit site
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/kids-call-home">
                Details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <ProductMockup />
        </div>
      </div>
    </Section>
  )
}
