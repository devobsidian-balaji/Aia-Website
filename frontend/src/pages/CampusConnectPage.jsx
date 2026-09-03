import React from 'react'
import CampusConnectHero from '../components/CampusConnectHero.jsx'
import ThreePillarsFootprint from '../components/ThreePillarsFootprint.jsx'
import CampusAimsObjectives from '../components/CampusAimsObjectives.jsx'
import CampusOurEvents from '../components/CampusOurEvents.jsx'

export default function CampusConnectPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Hero Section matching Image 1 */}
      <CampusConnectHero />

      {/* 2. Our 3 Pillars Footprint matching Image 1 */}
      <ThreePillarsFootprint />

      {/* 3. Our Aims, Objectives & Blended Learning matching Image 1 */}
      <CampusAimsObjectives />

      {/* 4. Our Events matching Image 1 */}
      <CampusOurEvents />
    </div>
  )
}
