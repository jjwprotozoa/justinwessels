// src/components/sections/KidsCallHomeSection.tsx — Flagship product with glass flow
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
    <Section id="kids-call-home" compact glass animate={false}>
      <div className="flex flex-col gap-6 lg:gap-10">
        <ProductMockup compact className="mx-auto lg:hidden" />

        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-5 sm:gap-6">
            <div>
              <Eyebrow className="mb-2.5">Flagship product</Eyebrow>
              <h2 className="text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
                {kidsCallHome.name}
              </h2>
              <p className="mt-3 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:mt-4">
                {kidsCallHome.summary}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={kidsCallHome.url} target="_blank" rel="noopener noreferrer">
                  Visit site
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link to="/kids-call-home">
                  Details
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <FlagshipPanel />
          </div>

          <ProductMockup className="mx-auto hidden lg:block" />
        </div>
      </div>
    </Section>
  )
}
