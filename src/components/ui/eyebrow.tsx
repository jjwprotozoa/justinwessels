// src/components/ui/eyebrow.tsx — Consistent editorial eyebrow label
import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-xs font-medium tracking-[0.14em] text-muted uppercase',
        className,
      )}
    >
      {children}
    </p>
  )
}
