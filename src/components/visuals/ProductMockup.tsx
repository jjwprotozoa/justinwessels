// src/components/visuals/ProductMockup.tsx — Layered product visualization for hero
import { motion } from 'framer-motion'
import { Phone, Video, Shield, Heart } from 'lucide-react'
import { getMetricValue } from '@/data/metrics'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface ProductMockupProps {
  className?: string
}

export function ProductMockup({ className }: ProductMockupProps) {
  const reducedMotion = useReducedMotion()
  const countries = getMetricValue('countries')

  const floatTransition = reducedMotion
    ? undefined
    : {
        duration: 5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut' as const,
      }

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-lg',
        'h-[210px] sm:h-[280px] md:aspect-square md:h-auto',
        className,
      )}
      aria-hidden="true"
    >
      {/* Ambient glow — desktop only; reads as empty circle on mobile */}
      <div className="pointer-events-none absolute inset-0 hidden rounded-full bg-hero-glow blur-3xl md:block" />

      {/* Back card — web dashboard */}
      <motion.div
        className="absolute top-2 right-0 w-[72%] rounded-2xl border border-glass-border glass p-4 shadow-elevated sm:top-8 sm:w-[75%] sm:p-5"
        initial={reducedMotion ? false : { opacity: 0, y: 20, rotate: 3 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <div className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
          <span className="text-[10px] font-medium text-muted sm:text-xs">Family Dashboard</span>
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          {['Mom', 'Dad', 'Grandma'].map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 rounded-xl bg-accent/60 px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-2.5"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-kch-muted sm:h-8 sm:w-8">
                <Heart className="h-3 w-3 text-kch sm:h-3.5 sm:w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium sm:text-xs">{name}</p>
                <p className="text-[9px] text-muted sm:text-[10px]">Available</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-kch text-white sm:h-7 sm:w-7">
                <Video className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Front card — phone mockup */}
      <motion.div
        className="absolute bottom-0 left-0 w-[58%] rounded-[1.75rem] border border-glass-border bg-card p-2 shadow-elevated sm:w-[65%] sm:rounded-[2rem] sm:p-3"
        initial={reducedMotion ? false : { opacity: 0, y: 30 }}
        animate={
          reducedMotion
            ? undefined
            : { opacity: 1, y: [0, -6, 0], rotate: [0, -0.5, 0] }
        }
        transition={
          reducedMotion
            ? { duration: 0.8, delay: 0.1 }
            : { opacity: { duration: 0.8, delay: 0.1 }, y: floatTransition, rotate: floatTransition }
        }
      >
        <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-kch-muted/40 to-background sm:rounded-[1.5rem]">
          <div className="flex items-center justify-between px-3 py-1.5 sm:px-5 sm:py-2">
            <span className="text-[9px] font-medium sm:text-[10px]">9:41</span>
            <div className="mx-auto h-4 w-12 rounded-full bg-foreground/10 sm:h-5 sm:w-16" />
            <Phone className="h-2.5 w-2.5 text-muted sm:h-3 sm:w-3" />
          </div>

          <div className="px-3 pb-4 pt-1 sm:px-5 sm:pb-6 sm:pt-2">
            <p className="text-xs font-semibold sm:text-sm">Kids Call Home</p>
            <p className="mt-0.5 text-[9px] text-muted sm:text-[10px]">Tap to call family</p>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
              {[
                { name: 'Mom', color: 'bg-rose-500' },
                { name: 'Dad', color: 'bg-blue-500' },
                { name: 'Grandma', color: 'bg-amber-500' },
                { name: 'Grandpa', color: 'bg-emerald-500' },
              ].map((contact) => (
                <div
                  key={contact.name}
                  className="flex flex-col items-center gap-1 rounded-xl bg-card/80 p-2.5 shadow-premium sm:gap-2 sm:rounded-2xl sm:p-4"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-12 sm:w-12 sm:text-sm ${contact.color}`}
                  >
                    {contact.name[0]}
                  </div>
                  <span className="text-[10px] font-medium sm:text-[11px]">{contact.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-2.5 flex items-center justify-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 sm:mt-4 sm:gap-1.5 sm:px-3 sm:py-1.5">
              <Shield className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400 sm:h-3 sm:w-3" />
              <span className="text-[9px] font-medium text-emerald-700 dark:text-emerald-400 sm:text-[10px]">
                Parent approved
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badge */}
      <motion.div
        className="absolute top-[38%] right-1 rounded-full border border-glass-border glass px-2.5 py-1 shadow-premium sm:top-1/2 sm:right-4 sm:px-4 sm:py-2"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
        animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-[10px] font-semibold tabular-nums sm:text-xs">{countries} countries</p>
      </motion.div>
    </div>
  )
}
