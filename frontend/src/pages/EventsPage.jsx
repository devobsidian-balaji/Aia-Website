import React from 'react'
import EventsHero from '../components/EventsHero.jsx'
import EventsMetrics from '../components/EventsMetrics.jsx'
import EventsCatalogue from '../components/EventsCatalogue.jsx'

export default function EventsPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Hero Section matching Image 1 */}
      <EventsHero />

      {/* 2. Key Metrics Strip (20+ Events, 15+ Speakers, 5k+ Participants, 10+ Partners) */}
      <EventsMetrics />

      {/* 3. Events Catalogue with Orange Box Cards, Date Badges & Category Filters */}
      <EventsCatalogue />
    </div>
  )
}
