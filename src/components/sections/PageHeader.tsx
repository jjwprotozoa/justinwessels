// src/components/sections/PageHeader.tsx — Reusable page header for subpages
import { motion } from 'framer-motion'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {eyebrow && (
          <motion.p
            className="mb-4 text-sm font-medium tracking-wide text-muted uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          className="text-5xl font-semibold tracking-tight text-balance md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-6 max-w-lg text-base text-muted leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </header>
  )
}
