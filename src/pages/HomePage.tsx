// src/pages/HomePage.tsx — Homepage with launch sections only
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { getAllJsonLd, pageMeta } from '@/data/seo'
import { Hero } from '@/components/sections/Hero'
import { MetricsBar } from '@/components/sections/MetricsBar'
import { KidsCallHomeSection } from '@/components/sections/KidsCallHomeSection'
import { MissionSection } from '@/components/sections/MissionSection'
import { EvidenceSection } from '@/components/sections/EvidenceSection'
import { JourneySection } from '@/components/sections/JourneySection'
import { VenturesSection } from '@/components/sections/VenturesSection'
import { ContactSection } from '@/components/sections/ContactSection'

export function HomePage() {
  return (
    <>
      <PageMetaTags meta={pageMeta.home} />
      <JsonLd data={getAllJsonLd()} />
      <Hero />
      <MetricsBar showHeader={false} variant="bar" className="pb-10 md:pb-16" />
      <KidsCallHomeSection />
      <MissionSection />
      <EvidenceSection compact />
      <JourneySection limit={4} compact />
      <VenturesSection compact />
      <ContactSection compact />
    </>
  )
}
