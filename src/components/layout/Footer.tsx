// src/components/layout/Footer.tsx — Glass footer with grouped navigation
import { Link } from 'react-router-dom'
import { footerNavGroups } from '@/data/navigation'
import { siteConfig } from '@/data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 sm:px-4">
      <div className="mx-auto max-w-6xl liquid-glass rounded-[1.5rem] p-6 sm:rounded-[1.75rem] sm:p-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">{siteConfig.founder.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.founder.tagline}
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            aria-label="Footer navigation"
          >
            {footerNavGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {group.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-foreground/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.founder.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Canonical source for {siteConfig.founder.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
