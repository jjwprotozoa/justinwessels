// src/components/ui/section.tsx — Reusable page section wrapper
import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/ui/eyebrow'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  containerClassName?: string
  eyebrow?: string
  title?: string
  description?: string
  animate?: boolean
  hideHeader?: boolean
  compact?: boolean
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  eyebrow,
  title,
  description,
  animate = true,
  hideHeader = false,
  compact = false,
}: SectionProps) {
  const { ref, inView } = useInView()
  const reducedMotion = useReducedMotion()

  const content = (
    <section
      id={id}
      className={cn(compact ? 'py-20 md:py-28' : 'py-28 md:py-40', className)}
    >
      <div className={cn('mx-auto max-w-6xl px-6', containerClassName)}>
        {!hideHeader && (eyebrow || title || description) && (
          <header className={cn('max-w-2xl', compact ? 'mb-12' : 'mb-20')}>
            {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-base text-muted leading-relaxed text-balance">{description}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )

  if (!animate || reducedMotion) return content

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  )
}
