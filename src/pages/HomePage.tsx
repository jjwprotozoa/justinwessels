// src/pages/HomePage.tsx — Homepage with launch sections only
import { PageMetaTags } from '@/components/seo/PageMeta'
import { JsonLd } from '@/components/seo/JsonLd'
import { getAllJsonLd, pageMeta } from '@/data/seo'
import { Hero } from '@/components/sections/Hero'
import { ProofMetrics } from '@/components/sections/ProofMetrics'
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
      <ProofMetrics />
      <KidsCallHomeSection />
      <MissionSection />
      <EvidenceSection limit={6} />
      <JourneySection limit={4} />
      <VenturesSection />
      <ContactSection compact />
    </>
  )
}
