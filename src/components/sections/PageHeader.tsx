// src/components/sections/PageHeader.tsx — Subpage header with glass surface
import { motion } from 'framer-motion'
import { Eyebrow } from '@/components/ui/eyebrow'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  lastUpdated?: string
}

export function PageHeader({ eyebrow, title, description, lastUpdated }: PageHeaderProps) {
  return (
    <header className="px-3 pb-2 pt-2 sm:px-4">
      <motion.div
        className="mx-auto max-w-6xl liquid-glass rounded-[1.5rem] p-6 sm:rounded-[1.75rem] sm:p-8 md:p-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <h1 className="text-balance text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
            {description}
          </p>
        )}
        {lastUpdated && (
          <p className="mt-4 text-xs text-muted-foreground">Last updated · {lastUpdated}</p>
        )}
      </motion.div>
    </header>
  )
}
