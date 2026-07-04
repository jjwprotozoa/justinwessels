// src/data/seo.ts — SEO metadata and JSON-LD structured data
import { siteConfig } from './site'
import { kidsCallHome } from './kids-call-home'
import { ventures } from './ventures'

export interface PageMeta {
  title: string
  description: string
  path: string
  ogType?: string
}

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: 'Justin Wessels — Founder of Kids Call Home',
    description: siteConfig.description,
    path: '/',
    ogType: 'profile',
  },
  kidsCallHome: {
    title: 'Kids Call Home — Justin Wessels',
    description: kidsCallHome.tagline,
    path: '/kids-call-home',
  },
  journey: {
    title: 'Founder Journey — Justin Wessels',
    description: 'The story of building companies and products that solve real problems.',
    path: '/journey',
  },
  evidence: {
    title: 'Evidence — Justin Wessels',
    description: 'Verifiable proof of products, companies, and impact.',
    path: '/evidence',
  },
  ventures: {
    title: 'Ventures — Justin Wessels',
    description: 'Companies founded by Justin Wessels.',
    path: '/ventures',
  },
  writing: {
    title: 'Writing — Justin Wessels',
    description: 'Essays on building products, family technology, and solving real problems.',
    path: '/writing',
  },
  about: {
    title: 'About — Justin Wessels',
    description: 'Justin Wessels builds technology that solves meaningful real-world problems.',
    path: '/about',
  },
  contact: {
    title: 'Contact — Justin Wessels',
    description: 'Get in touch with Justin Wessels.',
    path: '/contact',
  },
}

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.founder.name,
    url: siteConfig.url,
    email: siteConfig.founder.email,
    jobTitle: 'Founder',
    description: siteConfig.description,
    sameAs: siteConfig.founder.sameAs,
    worksFor: ventures.map((v) => ({
      '@type': 'Organization',
      name: v.name,
      url: v.url,
    })),
    founder: ventures.map((v) => ({
      '@type': 'Organization',
      name: v.name,
    })),
  }
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization-kch`,
    name: 'Kids Call Home',
    url: kidsCallHome.url,
    description: kidsCallHome.tagline,
    founder: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.founder.name,
    },
    sameAs: [kidsCallHome.appStoreUrl, kidsCallHome.playStoreUrl],
  }
}

export function buildSoftwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Kids Call Home',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'iOS, Android, Web',
    url: kidsCallHome.url,
    description: kidsCallHome.mission.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.founder.name,
    },
  }
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
    },
  }
}

export function buildProfilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/#profilepage`,
    name: siteConfig.founder.name,
    url: siteConfig.url,
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
    },
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function getAllJsonLd() {
  return [
    buildPersonJsonLd(),
    buildOrganizationJsonLd(),
    buildSoftwareApplicationJsonLd(),
    buildWebSiteJsonLd(),
    buildProfilePageJsonLd(),
  ]
}
