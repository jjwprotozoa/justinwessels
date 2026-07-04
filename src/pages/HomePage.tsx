// src/pages/HomePage.tsx — Homepage with all sections
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
import { WritingSection } from '@/components/sections/WritingSection'
import { ContactSection } from '@/components/sections/ContactSection'

export function HomePage() {
  return (
    <>
      <PageMetaTags meta={pageMeta.home} />
      <JsonLd data={getAllJsonLd()} />
      <Hero />
      <MetricsBar />
      <KidsCallHomeSection />
      <MissionSection />
      <EvidenceSection limit={6} />
      <JourneySection limit={5} />
      <VenturesSection />
      <WritingSection />
      <ContactSection compact />
    </>
  )
}
