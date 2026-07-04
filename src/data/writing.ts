// src/data/writing.ts — Writing infrastructure and topic taxonomy
export interface WritingTopic {
  id: string
  label: string
  description: string
}

export interface WritingPost {
  id: string
  title: string
  excerpt: string
  date: string
  topics: string[]
  slug: string
  published: boolean
  url?: string
}

export const writingTopics: WritingTopic[] = [
  { id: 'building', label: 'Building products', description: 'Lessons from shipping real software.' },
  { id: 'family-tech', label: 'Family technology', description: 'Designing for the people who matter most.' },
  { id: 'ai', label: 'AI', description: 'Practical applications of artificial intelligence.' },
  { id: 'systems', label: 'Systems thinking', description: 'Architecture, scale, and long-term design.' },
  { id: 'engineering', label: 'Engineering', description: 'Technical decisions and craft.' },
  { id: 'founder', label: 'Founder lessons', description: 'What building companies teaches you.' },
]

export const writingPosts: WritingPost[] = [
  // Infrastructure ready — posts added via data file as they're published
]

export const writingConfig = {
  title: 'Writing',
  description: 'Thoughts on building products, family technology, and solving real problems.',
  emptyState: {
    title: 'Coming soon',
    description:
      'Essays on building products, family technology, and the craft of solving real problems. The first pieces are in progress.',
  },
} as const
