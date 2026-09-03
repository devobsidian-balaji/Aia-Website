import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import IAFSMPage from './pages/IAFSMPage.jsx'
import CampusConnectPage from './pages/CampusConnectPage.jsx'
import EventsPage from './pages/EventsPage.jsx'
import AdminLayout from './admin/AdminLayout.jsx'

// Helper to scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Public Layout Wrapper with Header & Footer
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#0B1B2B] selection:text-white">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/home" element={<PublicLayout><HomePage /></PublicLayout>} />
        
        {/* /about */}
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/about-us" element={<PublicLayout><AboutPage /></PublicLayout>} />
        
        {/* /iafsm and alias /ifsm */}
        <Route path="/iafsm" element={<PublicLayout><IAFSMPage /></PublicLayout>} />
        <Route path="/ifsm" element={<PublicLayout><IAFSMPage /></PublicLayout>} />
        
        {/* /campus-connect */}
        <Route path="/campus-connect" element={<PublicLayout><CampusConnectPage /></PublicLayout>} />
        
        {/* /events and alias /event */}
        <Route path="/events" element={<PublicLayout><EventsPage /></PublicLayout>} />
        <Route path="/event" element={<PublicLayout><EventsPage /></PublicLayout>} />
        
        {/* Admin CMS Routes */}
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/admin/:tab" element={<AdminLayout />} />

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}
