// src/App.tsx — Application router (production launch routes)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { KidsCallHomePage } from '@/pages/KidsCallHomePage'
import { JourneyPage } from '@/pages/JourneyPage'
import { EvidencePage } from '@/pages/EvidencePage'
import { VenturesPage } from '@/pages/VenturesPage'
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/writing" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
