// src/components/ui/glass-panel.tsx — Liquid glass surface container
import { cn } from '@/lib/utils'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  variant?: 'panel' | 'card' | 'nav'
  as?: 'div' | 'section' | 'article'
}

export function GlassPanel({
  children,
  className,
  variant = 'panel',
  as: Tag = 'div',
}: GlassPanelProps) {
  return (
    <Tag
      className={cn(
        'rounded-3xl',
        variant === 'panel' && 'liquid-glass',
        variant === 'card' && 'liquid-glass-card',
        variant === 'nav' && 'liquid-glass-nav',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
