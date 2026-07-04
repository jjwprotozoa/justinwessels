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
    <Section
      id="kids-call-home"
      className="gradient-subtle py-16 md:py-28 lg:py-40"
      animate={false}
    >
      <div className="grid items-start gap-8 md:gap-12 lg:grid-cols-2 lg:gap-24">
        <div>
          <Eyebrow className="mb-3 md:mb-5">Flagship product</Eyebrow>
          <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl">
            {kidsCallHome.name}
          </h2>
          <p className="mt-3 max-w-md text-base text-muted text-balance leading-relaxed md:mt-6 md:text-lg">
            {kidsCallHome.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 md:mt-10 md:gap-3">
            <Button asChild size="lg" className="h-11 md:h-12">
              <a href={kidsCallHome.url} target="_blank" rel="noopener noreferrer">
                Visit site
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-11 md:h-12">
              <Link to="/kids-call-home">
                Details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <FlagshipPanel className="lg:pt-2" />
      </div>
    </Section>
  )
}
