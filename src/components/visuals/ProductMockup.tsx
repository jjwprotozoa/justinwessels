// src/components/visuals/ProductMockup.tsx — Layered product visualization for hero
import { motion } from 'framer-motion'
import { Phone, Video, Shield, Heart } from 'lucide-react'
import { getMetricValue } from '@/data/metrics'

export function ProductMockup() {
  const countries = getMetricValue('countries')

  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg" aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-hero-glow blur-3xl" />

      <motion.div
        className="absolute top-8 right-0 w-[75%] rounded-2xl border border-glass-border glass p-5 shadow-elevated"
        initial={{ opacity: 0, y: 20, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-muted">Family Dashboard</span>
        </div>
        <div className="space-y-2">
          {['Mom', 'Dad', 'Grandma'].map((name) => (
            <div key={name} className="flex items-center gap-3 rounded-xl bg-accent/60 px-3 py-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-kch-muted">
                <Heart className="h-3.5 w-3.5 text-kch" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">{name}</p>
                <p className="text-[10px] text-muted">Available</p>
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-kch text-white">
                <Video className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 w-[65%] rounded-[2rem] border border-glass-border bg-card p-3 shadow-elevated"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-kch-muted/40 to-background">
          <div className="flex items-center justify-between px-5 py-2">
            <span className="text-[10px] font-medium">9:41</span>
            <div className="mx-auto h-5 w-16 rounded-full bg-foreground/10" />
            <Phone className="h-3 w-3 text-muted" />
          </div>

          <div className="px-5 pb-6 pt-2">
            <p className="text-sm font-semibold">Kids Call Home</p>
            <p className="mt-0.5 text-[10px] text-muted">Tap to call family</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { name: 'Mom', color: 'bg-rose-500' },
                { name: 'Dad', color: 'bg-blue-500' },
                { name: 'Grandma', color: 'bg-amber-500' },
                { name: 'Grandpa', color: 'bg-emerald-500' },
              ].map((contact) => (
                <div
                  key={contact.name}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-card/80 p-4 shadow-premium"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${contact.color} text-sm font-semibold text-white`}
                  >
                    {contact.name[0]}
                  </div>
                  <span className="text-[11px] font-medium">{contact.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5">
              <Shield className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                Parent approved
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-4 rounded-full border border-glass-border glass px-4 py-2 shadow-premium"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-xs font-semibold tabular-nums">{countries} countries</p>
      </motion.div>
    </div>
  )
}
