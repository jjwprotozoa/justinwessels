// src/components/sections/ContactSection.tsx — Contact section
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, ExternalLink } from 'lucide-react'
import { contactConfig } from '@/data/contact'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'

export function ContactSection({ compact = false, hideHeader }: { compact?: boolean; hideHeader?: boolean }) {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={contactConfig.title}
      description={contactConfig.description}
      className={compact ? 'py-16 md:py-24' : undefined}
      hideHeader={hideHeader}
    >
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {contactConfig.channels.map((channel) => (
          <div
            key={channel.id}
            className="rounded-xl border border-border/60 px-5 py-4 transition-colors hover:border-border sm:px-6 sm:py-5"
          >
            <p className="text-xs font-medium text-muted uppercase tracking-wide">
              {channel.label}
            </p>
            <a
              href={channel.href}
              target={channel.type === 'email' ? undefined : '_blank'}
              rel={channel.type === 'email' ? undefined : 'noopener noreferrer'}
              className="mt-2 flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
            >
              {channel.type === 'email' && <Mail className="h-4 w-4" aria-hidden="true" />}
              {channel.value}
              {channel.type !== 'email' && (
                <ExternalLink className="h-3 w-3 text-muted" aria-hidden="true" />
              )}
            </a>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="mt-12">
          <Button asChild>
            <Link to="/contact">
              Contact page
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      )}
    </Section>
  )
}
