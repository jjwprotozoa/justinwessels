// src/components/sections/Hero.tsx — Homepage hero section
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { ProductMockup } from '@/components/visuals/ProductMockup'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-6 pt-6 md:pb-20 md:pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 gradient-subtle" />
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30 md:opacity-40" />
      <div className="pointer-events-none absolute top-0 right-0 hidden h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-hero-glow blur-3xl md:block" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Eyebrow className="mb-3 md:mb-6">{siteConfig.founder.eyebrow}</Eyebrow>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem] lg:leading-[1.05]"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <HeroHeadline />
            </motion.h1>

            <motion.p
              className="mt-4 max-w-md text-sm text-muted leading-relaxed text-balance md:mt-8 md:text-base"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {siteConfig.founder.subheading}
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap gap-2.5 md:mt-12 md:gap-3"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="h-11 md:h-12">
                <Link to="/kids-call-home">
                  Kids Call Home
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="h-11 md:h-12">
                <Link to="/journey">Founder journey</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="order-1 lg:order-2"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <ProductMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
