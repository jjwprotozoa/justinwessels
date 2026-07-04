// src/components/sections/PageHeader.tsx — Reusable page header for subpages
import { motion } from 'framer-motion'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-border py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {eyebrow && (
          <motion.p
            className="mb-3 text-sm font-medium tracking-wide text-muted uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          className="text-4xl font-semibold tracking-tight text-balance md:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-4 max-w-2xl text-lg text-muted leading-relaxed"
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
