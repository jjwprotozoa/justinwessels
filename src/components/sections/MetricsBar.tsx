// src/components/sections/MetricsBar.tsx — Reusable founder metrics bar
import { motion } from 'framer-motion'
import {
  BookOpen,
  Building2,
  Calendar,
  Globe,
  Layers,
  Phone,
  Smartphone,
  Users,
} from 'lucide-react'
import type { Metric, MetricIcon } from '@/data/metrics'
import { getHomepageMetrics, metricsConfig } from '@/data/metrics'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/utils'

const iconMap: Record<MetricIcon, typeof Users> = {
  users: Users,
  phone: Phone,
  globe: Globe,
  smartphone: Smartphone,
  book: BookOpen,
  layers: Layers,
  building: Building2,
  calendar: Calendar,
}

function formatAnimatedValue(metric: Metric, count: number): string {
  if (!metric.animate || metric.numericValue === undefined) return metric.value

  const formatted = count.toLocaleString('en-US')
  if (metric.prefix) return `${metric.prefix}${formatted}`
  if (metric.suffix) return `${formatted}${metric.suffix}`
  return formatted
}

function MetricCard({ metric, active, index }: { metric: Metric; active: boolean; index: number }) {
  const count = useCountUp(metric.numericValue ?? 0, active && !!metric.animate)
  const Icon = metric.icon ? iconMap[metric.icon] : null
  const display = active && metric.animate ? formatAnimatedValue(metric, count) : metric.value

  return (
    <motion.article
      className="group rounded-xl border border-border/60 bg-card/50 px-5 py-4 transition-colors hover:border-border hover:bg-card"
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'font-semibold tracking-tight tabular-nums text-foreground',
              metric.id === 'platforms' ? 'text-base leading-snug' : 'text-2xl md:text-3xl',
            )}
          >
            {display}
          </p>
          <h3 className="mt-1.5 text-xs font-medium text-muted leading-snug">{metric.title}</h3>
          {metric.description && (
            <p className="mt-1 text-[11px] text-muted-foreground leading-snug opacity-0 transition-opacity group-hover:opacity-100">
              {metric.description}
            </p>
          )}
        </div>
        {Icon && (
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
        )}
      </div>
      {metric.source && (
        <p className="mt-2 text-[10px] text-muted-foreground/70">{metric.source}</p>
      )}
    </motion.article>
  )
}

interface MetricsBarProps {
  className?: string
  id?: string
  showHeader?: boolean
  compact?: boolean
  metrics?: Metric[]
}

export function MetricsBar({
  className,
  id = 'metrics',
  showHeader = true,
  compact = false,
  metrics: metricsProp,
}: MetricsBarProps) {
  const { ref, inView } = useInView(0.08)
  const displayMetrics = metricsProp ?? getHomepageMetrics()

  return (
    <section
      id={id}
      className={cn(compact ? 'py-16 md:py-20' : 'py-20 md:py-28', className)}
      aria-labelledby={showHeader ? 'metrics-heading' : undefined}
    >
      <div className="mx-auto max-w-6xl px-6">
        {showHeader && (
          <header className="mb-10 max-w-xl">
            <h2 id="metrics-heading" className="text-3xl font-semibold tracking-tight md:text-4xl">
              By the numbers
            </h2>
            <p className="mt-2 text-sm text-muted">
              Verified metrics · Updated {metricsConfig.lastUpdated}
            </p>
          </header>
        )}

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {displayMetrics.map((metric, i) => (
            <MetricCard key={metric.id} metric={metric} active={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
