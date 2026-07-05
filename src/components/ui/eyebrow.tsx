// src/components/ui/eyebrow.tsx — Apple-style eyebrow label
import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-[11px] font-semibold tracking-[0.12em] text-[#0071e3] uppercase sm:text-xs',
        className,
      )}
    >
      {children}
    </p>
  )
}
