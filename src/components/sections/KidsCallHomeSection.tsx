// src/components/sections/KidsCallHomeSection.tsx — Featured flagship product section
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { kidsCallHome } from '@/data/kids-call-home'
import { Section } from '@/components/ui/section'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Button } from '@/components/ui/button'
import { ProductMockup } from '@/components/visuals/ProductMockup'
import { FlagshipPanel } from '@/components/visuals/FlagshipPanel'

export function KidsCallHomeSection() {
  return (
    <Section id="kids-call-home" className="gradient-subtle py-12 md:py-28" animate={false}>
      <div className="flex flex-col gap-6 lg:gap-12">
        <ProductMockup compact className="lg:hidden" />

        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6 lg:gap-8">
          <div>
            <Eyebrow className="mb-3">Flagship product</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl">
              {kidsCallHome.name}
            </h2>
            <p className="mt-4 max-w-md text-base text-muted text-balance md:mt-6 md:text-lg">
              {kidsCallHome.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Button asChild size="lg" className="h-11">
              <a href={kidsCallHome.url} target="_blank" rel="noopener noreferrer">
                Visit site
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="h-11">
              <Link to="/kids-call-home">
                Details
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <FlagshipPanel />
        </div>

        <ProductMockup className="hidden lg:block" />
      </div>
      </div>
    </Section>
  )
}
