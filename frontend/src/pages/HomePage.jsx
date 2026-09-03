import React from 'react'
import Hero from '../components/Hero.jsx'
import GovernmentInitiative from '../components/GovernmentInitiative.jsx'
import WhoAreYou from '../components/WhoAreYou.jsx'
import HomeServices from '../components/HomeServices.jsx'
import IndustrySectors from '../components/IndustrySectors.jsx'
import ImpactDashboard from '../components/ImpactDashboard.jsx'
import FactoryInsight from '../components/FactoryInsight.jsx'
import BuildYourFactory from '../components/BuildYourFactory.jsx'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <GovernmentInitiative />
      <HomeServices />
      <WhoAreYou />
      <IndustrySectors />
      <ImpactDashboard />
      <FactoryInsight />
      <BuildYourFactory />
    </main>
  )
}
