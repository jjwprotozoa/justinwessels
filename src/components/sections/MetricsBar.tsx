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
import { useReducedMotion } from '@/hooks/useReducedMotion'
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

function MetricItem({
  metric,
  active,
  index,
  variant,
}: {
  metric: Metric
  active: boolean
  index: number
  variant: 'grid' | 'bar'
}) {
  const reducedMotion = useReducedMotion()
  const count = useCountUp(metric.numericValue ?? 0, active && !!metric.animate && !reducedMotion)
  const Icon = metric.icon ? iconMap[metric.icon] : null
  const display = active && metric.animate && !reducedMotion
    ? formatAnimatedValue(metric, count)
    : metric.value

  const isBar = variant === 'bar'

  if (isBar) {
    return (
      <motion.article
        className="group px-1 py-0.5 text-center md:px-2 md:py-1"
        title={metric.description}
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={active && !reducedMotion ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      >
        {Icon && (
          <Icon
            className="mx-auto mb-1 h-3.5 w-3.5 text-kch opacity-70 md:mb-2 md:h-4 md:w-4"
            aria-hidden="true"
          />
        )}
        <p
          className={cn(
            'font-semibold tracking-tight tabular-nums text-foreground',
            metric.id === 'platforms'
              ? 'text-[10px] leading-snug md:text-sm'
              : 'text-base md:text-2xl',
          )}
        >
          {display}
        </p>
        <h3 className="mt-0.5 text-[9px] font-medium leading-snug text-muted-foreground md:mt-1 md:text-xs">
          {metric.title}
        </h3>
        {metric.description && <span className="sr-only">{metric.description}</span>}
      </motion.article>
    )
  }

  return (
    <motion.article
      className="group relative liquid-glass-card rounded-2xl px-5 py-4 transition-transform duration-200 hover:scale-[1.01]"
      title={metric.description}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={active && !reducedMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
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
          <h3 className="mt-1.5 text-xs font-medium leading-snug text-muted-foreground">{metric.title}</h3>
        </div>
        {Icon && (
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
        )}
      </div>
      {metric.source && (
        <p className="mt-2 text-[10px] text-muted-foreground/70">{metric.source}</p>
      )}
      {metric.description && <span className="sr-only">{metric.description}</span>}
    </motion.article>
  )
}

interface MetricsBarProps {
  className?: string
  id?: string
  showHeader?: boolean
  compact?: boolean
  variant?: 'grid' | 'bar'
  metrics?: Metric[]
}

export function MetricsBar({
  className,
  id = 'metrics',
  showHeader = true,
  compact = false,
  variant = 'grid',
  metrics: metricsProp,
}: MetricsBarProps) {
  const { ref, inView } = useInView(0.08)
  const displayMetrics = metricsProp ?? getHomepageMetrics()
  const isBar = variant === 'bar'

  return (
    <section
      id={id}
      className={cn(
        isBar ? 'px-3 py-0 sm:px-4' : compact ? 'px-3 py-12 sm:px-4 md:py-16' : 'px-3 py-12 sm:px-4 md:py-20',
        className,
      )}
      aria-labelledby={showHeader ? 'metrics-heading' : undefined}
    >
      <div className="mx-auto max-w-6xl">
        {showHeader && (
          <header className="mb-8 max-w-xl">
            <h2 id="metrics-heading" className="text-3xl font-semibold tracking-tight md:text-4xl">
              By the numbers
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Verified metrics · Updated {metricsConfig.lastUpdated}
            </p>
          </header>
        )}

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={cn(
            isBar &&
              'liquid-glass rounded-[1.25rem] px-3 py-4 sm:rounded-[1.5rem] sm:px-6 sm:py-5 md:px-8 md:py-6',
          )}
        >
          <div
            className={cn(
              isBar
                ? 'grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-4 md:gap-6 xl:grid-cols-8'
                : 'grid gap-3 sm:grid-cols-2 lg:grid-cols-4',
            )}
          >
            {displayMetrics.map((metric, i) => (
              <MetricItem
                key={metric.id}
                metric={metric}
                active={inView}
                index={i}
                variant={variant}
              />
            ))}
          </div>

          {isBar && (
            <p className="mt-3 text-center text-[10px] text-muted-foreground md:mt-5 md:text-[11px]">
              Verified · Updated {metricsConfig.lastUpdated}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
