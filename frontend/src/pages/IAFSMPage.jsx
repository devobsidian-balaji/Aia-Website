import React from 'react'
import IAFSMHero from '../components/IAFSMHero.jsx'
import IAFSMPillars from '../components/IAFSMPillars.jsx'
import WhatIsIAFSM from '../components/WhatIsIAFSM.jsx'
import EventsSection from '../components/EventsSection.jsx'
import OurInitiatives from '../components/OurInitiatives.jsx'

export default function IAFSMPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Hero Section matching Image 1 & 2 */}
      <IAFSMHero />

      {/* 2. Pillars Section matching Image 1 staggered alignment */}
      <IAFSMPillars />

      {/* 3. What is IAFSM Section matching Image 4 */}
      <WhatIsIAFSM />

      {/* 4. Events 2-Column Showcase (Event 1 left, Event 2 right, Event 3 down) */}
      <EventsSection />

      {/* 5. Our Initiatives Section matching Image 2 */}
      <OurInitiatives />
    </div>
  )
}
