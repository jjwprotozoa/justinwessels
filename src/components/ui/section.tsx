// src/components/ui/section.tsx — Mobile-first section wrapper with optional glass surfaces
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
  /** Wrap content in a frosted glass panel for visual flow */
  glass?: boolean
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
  glass = false,
}: SectionProps) {
  const { ref, inView } = useInView()
  const reducedMotion = useReducedMotion()

  const content = (
    <section
      id={id}
      className={cn(
        compact ? 'px-3 py-8 sm:px-4 md:py-14' : 'px-3 py-12 sm:px-4 md:py-20',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-6xl',
          glass &&
            'liquid-glass rounded-[1.5rem] p-5 sm:rounded-[1.75rem] sm:p-8 lg:p-10',
          containerClassName,
        )}
      >
        {!hideHeader && (eyebrow || title || description) && (
          <header className={cn('max-w-2xl', compact ? 'mb-8 sm:mb-10' : 'mb-10 sm:mb-14')}>
            {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="text-balance text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
                {description}
              </p>
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
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {content}
    </motion.div>
  )
}
