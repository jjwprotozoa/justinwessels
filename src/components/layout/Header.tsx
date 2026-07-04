// src/components/layout/Header.tsx — Site header with navigation
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { primaryNav } from '@/data/navigation'
import { siteConfig } from '@/data/site'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="mx-auto max-w-6xl px-6">
        <nav
          className="mt-4 flex items-center justify-between rounded-2xl border border-border glass px-4 py-3 shadow-premium"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
            onClick={() => setOpen(false)}
          >
            {siteConfig.founder.name}
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'rounded-full px-3 py-1.5 text-sm transition-colors',
                  location.pathname === item.href
                    ? 'bg-accent text-foreground font-medium'
                    : 'text-muted hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="mt-2 rounded-2xl border border-border glass p-4 shadow-elevated md:hidden">
            <div className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'rounded-xl px-4 py-3 text-sm transition-colors',
                    location.pathname === item.href
                      ? 'bg-accent font-medium'
                      : 'text-muted hover:bg-accent hover:text-foreground',
                  )}
                  onClick={() => setOpen(false)}
                >
                  <span className="block font-medium">{item.label}</span>
                  {item.description && (
                    <span className="text-xs text-muted">{item.description}</span>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
