// src/components/sections/MetricsBar.tsx — Animated data-driven metrics
import { metricsConfig, type Metric } from '@/data/metrics'
import { formatMetricValue } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/utils'

function MetricCard({ metric, active }: { metric: Metric; active: boolean }) {
  const numericValue = typeof metric.value === 'number' ? metric.value : 0
  const count = useCountUp(numericValue, active && metric.format === 'number')

  const display =
    metric.format === 'number'
      ? formatMetricValue(count, 'number', metric.prefix, metric.suffix)
      : formatMetricValue(metric.value, 'text')

  return (
    <article className="group relative rounded-2xl border border-border bg-card p-6 shadow-premium transition-shadow hover:shadow-elevated">
      <p className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">{display}</p>
      <h3 className="mt-2 text-sm font-medium">{metric.title}</h3>
      <p className="mt-1 text-xs text-muted leading-relaxed">{metric.description}</p>
      <footer className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="text-[10px] text-muted-foreground">Updated {metric.lastUpdated}</span>
        <span className="text-[10px] text-muted-foreground">{metric.source}</span>
      </footer>
    </article>
  )
}

export function MetricsBar({ className }: { className?: string }) {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="metrics" className={cn('py-16 md:py-20', className)} aria-labelledby="metrics-heading">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="metrics-heading" className="text-2xl font-semibold tracking-tight md:text-3xl">
              By the numbers
            </h2>
            <p className="mt-1 text-sm text-muted">
              Verifiable metrics. Last refreshed {metricsConfig.lastRefreshed}.
            </p>
          </div>
        </header>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metricsConfig.metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
