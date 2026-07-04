// src/components/sections/ProofMetrics.tsx — Verified Kids Call Home proof metrics display
import type { ProofMetric } from '@/data/metrics'
import {
  getGrowthMetric,
  getHeadlineMetrics,
  proofMetricsConfig,
} from '@/data/metrics'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { cn } from '@/lib/utils'

function ProofMetricCard({ metric, active }: { metric: ProofMetric; active: boolean }) {
  const count = useCountUp(metric.value, active)
  const animatedDisplay =
    metric.id === 'countries'
      ? String(count)
      : metric.displayValue.includes('+') && !metric.displayValue.startsWith('+')
        ? `${count.toLocaleString('en-US')}+`
        : metric.displayValue.startsWith('+')
          ? `+${count}`
          : count.toLocaleString('en-US')

  return (
    <article className="rounded-2xl border border-border bg-card p-6 shadow-premium">
      <p className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl">
        {active ? animatedDisplay : metric.displayValue}
      </p>
      <h3 className="mt-2 text-sm font-medium">{metric.label}</h3>
      <footer className="mt-4 border-t border-border pt-3">
        <span className="text-[10px] text-muted-foreground">{metric.source}</span>
      </footer>
    </article>
  )
}

interface ProofMetricsProps {
  className?: string
  id?: string
  showHeader?: boolean
  compact?: boolean
}

export function ProofMetrics({
  className,
  id = 'metrics',
  showHeader = true,
  compact = false,
}: ProofMetricsProps) {
  const { ref, inView } = useInView(0.1)
  const headlineMetrics = getHeadlineMetrics()
  const growthMetric = getGrowthMetric()

  return (
    <section
      id={id}
      className={cn(compact ? 'py-12 md:py-16' : 'py-16 md:py-20', className)}
      aria-labelledby={showHeader ? 'proof-metrics-heading' : undefined}
    >
      <div className="mx-auto max-w-6xl px-6">
        {showHeader && (
          <header className="mb-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium tracking-wide text-muted uppercase">
                  Kids Call Home
                </p>
                <h2
                  id="proof-metrics-heading"
                  className="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Verified proof
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Platform metrics as of {proofMetricsConfig.lastUpdated}.
                </p>
              </div>
              {growthMetric && (
                <p className="text-sm text-muted">
                  <span className="font-medium text-foreground">{growthMetric.displayValue}</span>{' '}
                  {growthMetric.label.toLowerCase()}
                </p>
              )}
            </div>
          </header>
        )}

        {!showHeader && growthMetric && (
          <p className="mb-6 text-sm text-muted">
            <span className="font-medium text-foreground">{growthMetric.displayValue}</span>{' '}
            {growthMetric.label.toLowerCase()} · Updated {proofMetricsConfig.lastUpdated}
          </p>
        )}

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid gap-4 sm:grid-cols-3"
        >
          {headlineMetrics.map((metric) => (
            <ProofMetricCard key={metric.id} metric={metric} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
