// src/components/sections/Hero.tsx — Homepage hero with mobile-first liquid glass flow
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { ProductMockup } from '@/components/visuals/ProductMockup'

function HeroHeadline() {
  const emphasis = siteConfig.founder.taglineEmphasis
  const tagline = siteConfig.founder.tagline
  const index = tagline.lastIndexOf(emphasis)

  if (index === -1) return tagline

  return (
    <>
      {tagline.slice(0, index)}
      <span className="text-kch">{emphasis}</span>
      {tagline.slice(index + emphasis.length)}
    </>
  )
}

export function Hero() {
  return (
    <section
      id="hero"
      className="px-3 pb-6 pt-4 sm:px-4 md:pb-10 md:pt-8"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="liquid-glass rounded-[1.5rem] p-6 sm:rounded-[1.75rem] sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Eyebrow className="mb-3">{siteConfig.founder.eyebrow}</Eyebrow>

          <h1
            id="hero-heading"
            className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]"
          >
            <HeroHeadline />
          </h1>

          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
            {siteConfig.founder.subheading}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/kids-call-home">
                Kids Call Home
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              <Link to="/journey">Founder journey</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ProductMockup />
        </motion.div>
      </div>
    </section>
  )
}
