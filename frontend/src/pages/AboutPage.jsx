import React from 'react'
import AboutHero from '../components/AboutHero.jsx'
import AboutAIAOverview from '../components/AboutAIAOverview.jsx'
import VisionMissionObjectives from '../components/VisionMissionObjectives.jsx'
import PastPresidents from '../components/PastPresidents.jsx'
import CurrentExecutiveCouncil from '../components/CurrentExecutiveCouncil.jsx'
import AutomationEcosystem from '../components/AutomationEcosystem.jsx'

export default function AboutPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Full-Bleed About Hero */}
      <AboutHero />

      {/* 2. Dynamic 3-Card About Overview */}
      <AboutAIAOverview />

      {/* 3. Dynamic Vision, Mission, Objectives with Dotted Curves */}
      <VisionMissionObjectives />

      {/* 4. AIA Past Presidents matching Image 1 */}
      <PastPresidents />

      {/* 5. Current Executive Council matching Image 2 */}
      <CurrentExecutiveCouncil />

      {/* 6. Automation Ecosystem */}
      <AutomationEcosystem />
    </div>
  )
}
