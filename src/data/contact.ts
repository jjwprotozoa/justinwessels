// src/data/contact.ts — Contact information and channels
export interface ContactChannel {
  id: string
  label: string
  value: string
  href: string
  type: 'email' | 'link' | 'social'
}

export const contactConfig = {
  title: 'Get in touch',
  description:
    'For partnerships, press inquiries, or conversations about building products that matter.',
  channels: [
    {
      id: 'email',
      label: 'Email',
      value: 'hello@justinwessels.com',
      href: 'mailto:hello@justinwessels.com',
      type: 'email',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'Justin Wessels',
      href: 'https://www.linkedin.com/in/justinwessels',
      type: 'social',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: '@justinwessels',
      href: 'https://github.com/justinwessels',
      type: 'social',
    },
    {
      id: 'kids-call-home',
      label: 'Kids Call Home',
      value: 'kidscallhome.com',
      href: 'https://kidscallhome.com',
      type: 'link',
    },
  ] satisfies ContactChannel[],
  inquiryTypes: [
    'Partnerships',
    'Press & media',
    'Investment inquiries',
    'Technical collaboration',
    'General',
  ],
} as const
