// src/components/layout/Footer.tsx — Site footer
import { Link } from 'react-router-dom'
import { footerNavGroups } from '@/data/navigation'
import { siteConfig } from '@/data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold tracking-tight">{siteConfig.founder.name}</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {siteConfig.founder.tagline}
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            aria-label="Footer navigation"
          >
            {footerNavGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-medium tracking-wide text-muted uppercase">
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
                          className="text-sm text-muted transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-muted transition-colors hover:text-foreground"
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

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
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
