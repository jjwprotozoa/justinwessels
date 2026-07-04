// src/components/ui/theme-toggle.tsx — Light / dark / auto theme switcher
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme, type Theme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const options: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'auto', icon: Monitor, label: 'Auto' },
]

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className={cn('flex items-center gap-0.5 rounded-full border border-border bg-accent/50 p-1', className)}
      role="radiogroup"
      aria-label="Theme preference"
    >
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          onClick={() => setTheme(value)}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
            theme === value
              ? 'bg-background text-foreground shadow-premium'
              : 'text-muted hover:text-foreground',
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
