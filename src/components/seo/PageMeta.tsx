// src/components/seo/PageMeta.tsx — Per-page meta tags via react-helmet alternative
import { useEffect } from 'react'
import { siteConfig } from '@/data/site'
import type { PageMeta } from '@/data/seo'

interface PageMetaTagsProps {
  meta: PageMeta
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function PageMetaTags({ meta, jsonLd }: PageMetaTagsProps) {
  const url = `${siteConfig.url}${meta.path}`

  useEffect(() => {
    document.title = meta.title

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', meta.description)
    setMeta('og:title', meta.title, true)
    setMeta('og:description', meta.description, true)
    setMeta('og:url', url, true)
    setMeta('og:type', meta.ogType || 'website', true)
    setMeta('og:site_name', siteConfig.name, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', meta.title)
    setMeta('twitter:description', meta.description)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [meta, url])

  return jsonLd ? (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  ) : null
}
