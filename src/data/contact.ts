// src/data/contact.ts — Contact information and channels
export interface ContactChannel {
  id: string
  label: string
  value: string
  href: string
  type: 'email' | 'link' | 'social'
}

export const contactConfig = {
  title: 'Contact',
  description: 'Partnerships, press, or product conversations.',
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
      value: '@jjwprotozoa',
      href: 'https://github.com/jjwprotozoa',
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
