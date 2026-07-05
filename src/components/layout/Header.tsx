// src/components/layout/Header.tsx
// Apple-style floating glass navigation — mobile sheet + desktop bar.

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'
import { primaryNav } from '@/data/navigation'
import type { NavItem } from '@/data/navigation'
import { Button } from '@/components/ui/button'

export function Header() {
  const [open, setOpen] = useState(false)
  const navItems = primaryNav.filter((item) => item.href !== '/contact')

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-4">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 rounded-[1.25rem] border border-white/50 bg-white/55 px-3 shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-2xl backdrop-saturate-150 sm:h-14 sm:px-4">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0071e3] to-[#5ac8fa] text-xs font-bold text-white shadow-sm">
            JW
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
          {navItems.map((item: NavItem) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors',
                  isActive
                    ? 'bg-foreground/8 text-foreground'
                    : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm" variant="primary">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-foreground/5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[1.25rem] border border-white/50 bg-white/70 p-2 shadow-[0_8px_32px_rgba(15,23,42,0.1)] backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-0.5" aria-label="Mobile">
              {navItems.map((item: NavItem) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-3 text-[15px] font-medium transition-colors',
                      isActive
                        ? 'bg-[#0071e3]/10 text-[#0071e3]'
                        : 'text-foreground hover:bg-foreground/5',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-[#0071e3] px-4 py-3 text-center text-[15px] font-semibold text-white"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
