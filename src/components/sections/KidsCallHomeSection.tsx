// src/components/sections/KidsCallHomeSection.tsx — Featured flagship product section
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { kidsCallHome } from '@/data/kids-call-home'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'
import { FlagshipPanel } from '@/components/visuals/FlagshipPanel'

export function KidsCallHomeSection() {
  return (
    <Section id="kids-call-home" className="gradient-subtle" animate={false}>
      <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Eyebrow className="mb-5">Flagship product</Eyebrow>
          <h2 className="text-5xl font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl">
            {kidsCallHome.name}
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted text-balance leading-relaxed">
            {kidsCallHome.summary}
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
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

        <FlagshipPanel className="lg:pt-4" />
      </div>
    </Section>
  )
}
