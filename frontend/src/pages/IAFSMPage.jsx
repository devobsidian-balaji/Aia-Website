import React from 'react'
import IAFSMHero from '../components/IAFSMHero.jsx'
import IAFSMPillars from '../components/IAFSMPillars.jsx'
import WhatIsIAFSM from '../components/WhatIsIAFSM.jsx'
import EventsSection from '../components/EventsSection.jsx'
import OurInitiatives from '../components/OurInitiatives.jsx'
import HomeFeatureSection from '../components/home/HomeFeatureSection.jsx'
import DynamicPageHero from '../components/common/DynamicPageHero.jsx'
import DynamicContentSection from '../components/DynamicContentSection.jsx'
import OurPillarsData from '../data/iafsmdata/OurPillars.js'

export default function IAFSMPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Hero Section matching Image 1 & 2 */}
      {/* <IAFSMHero /> */}
      <DynamicPageHero
  pageKey="iafsm"
  fallbackImage="'/iafsm-hero.jpg"
  fallbackHeading="Driving India’s smart manufacturing revolution"
  scrollTarget="#iafsm-content"
/>
      

           <HomeFeatureSection page="iafsm" />
            
      {/* 2. Pillars Section matching Image 1 staggered alignment */}
      {/* <IAFSMPillars /> */}
      <DynamicContentSection
        id="iafsm"
        title="Our Pillar"
        paragraph=""
        {...OurPillarsData}
      />


      {/* 3. What is IAFSM Section matching Image 4 */}
      {/* <WhatIsIAFSM /> */}

      {/* 4. Events 2-Column Showcase (Event 1 left, Event 2 right, Event 3 down) */}
      {/* <EventsSection /> */}

      {/* 5. Our Initiatives Section matching Image 2 */}
      {/* <OurInitiatives /> */}
    </div>
  )
}
