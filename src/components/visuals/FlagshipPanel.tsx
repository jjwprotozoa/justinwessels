// src/components/visuals/FlagshipPanel.tsx — KCH feature pillars and proof snapshot
import { Check, ExternalLink } from 'lucide-react'
import { kidsCallHome } from '@/data/kids-call-home'
import { getMetric } from '@/data/metrics'
import { cn } from '@/lib/utils'

interface FlagshipPanelProps {
  className?: string
}

export function FlagshipPanel({ className }: FlagshipPanelProps) {
  const trustedAdults = getMetric('trusted-adults')
  const countries = getMetric('countries')

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <ul className="space-y-2.5" aria-label="Product highlights">
        {kidsCallHome.pillars.map((pillar) => (
          <li key={pillar} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-kch-subtle">
              <Check className="h-3 w-3 text-kch" aria-hidden="true" />
            </span>
            <span className="text-sm leading-snug">{pillar}</span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-2.5">
        {trustedAdults && (
          <div className="liquid-glass-card rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5">
            <p className="text-lg font-semibold tracking-tight tabular-nums sm:text-xl">
              {trustedAdults.value}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">{trustedAdults.title}</p>
          </div>
        )}
        {countries && (
          <div className="liquid-glass-card rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5">
            <p className="text-lg font-semibold tracking-tight tabular-nums sm:text-xl">
              {countries.value}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">{countries.title}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={kidsCallHome.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass-card inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Kids Call Home on the Apple App Store"
        >
          App Store
          <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
        </a>
        <a
          href={kidsCallHome.playStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="liquid-glass-card inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Kids Call Home on Google Play"
        >
          Google Play
          <ExternalLink className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
