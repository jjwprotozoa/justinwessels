// src/components/ui/badge.tsx — Status badge component
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground',
        verified: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
        growing: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
        active: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
        primary: 'bg-kch-muted text-kch',
        future: 'bg-accent text-muted border border-dashed border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
