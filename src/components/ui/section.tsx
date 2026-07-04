// src/components/ui/section.tsx — Reusable page section wrapper
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'

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
}: SectionProps) {
  const { ref, inView } = useInView()

  const content = (
    <section id={id} className={cn('py-24 md:py-32', className)}>
      <div className={cn('mx-auto max-w-6xl px-6', containerClassName)}>
        {!hideHeader && (eyebrow || title || description) && (
          <header className="mb-16 max-w-2xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-muted leading-relaxed text-balance">{description}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )

  if (!animate) return content

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  )
}
