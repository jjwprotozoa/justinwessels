// src/components/sections/ContactSection.tsx — Contact channels in glass tiles
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
      hideHeader={hideHeader}
      compact={compact}
      glass
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {contactConfig.channels.map((channel) => (
          <div
            key={channel.id}
            className="liquid-glass-card rounded-2xl px-4 py-4 sm:px-5 sm:py-5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {channel.label}
            </p>
            <a
              href={channel.href}
              target={channel.type === 'email' ? undefined : '_blank'}
              rel={channel.type === 'email' ? undefined : 'noopener noreferrer'}
              className="mt-2 flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-80"
            >
              {channel.type === 'email' && <Mail className="h-4 w-4" aria-hidden="true" />}
              <span className="break-all">{channel.value}</span>
              {channel.type !== 'email' && (
                <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden="true" />
              )}
            </a>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="mt-8 sm:mt-10">
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
