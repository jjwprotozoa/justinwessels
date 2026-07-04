// src/App.tsx — Application router and layout
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { KidsCallHomePage } from '@/pages/KidsCallHomePage'
import { JourneyPage } from '@/pages/JourneyPage'
import { EvidencePage } from '@/pages/EvidencePage'
import { VenturesPage } from '@/pages/VenturesPage'
import { WritingPage } from '@/pages/WritingPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kids-call-home" element={<KidsCallHomePage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/ventures" element={<VenturesPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
