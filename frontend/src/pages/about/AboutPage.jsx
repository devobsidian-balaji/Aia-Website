import React from "react";
import AboutHero from "../../components/AboutHero.jsx";
import AboutAIAOverview from "../../components/AboutAIAOverview.jsx";
import VisionMissionObjectives from "../../components/VisionMissionObjectives.jsx";
import PastPresidents from "../../components/PastPresidents.jsx";
import CurrentExecutiveCouncil from "../../components/CurrentExecutiveCouncil.jsx";
import AutomationEcosystem from "../../components/AutomationEcosystem.jsx";
import WhyJoinCmsSection from "../../components/why-join/WhyJoinCmsSection.jsx";
import CmsSliderSection from "../../components/sliders/CmsSliderSection.jsx";
import MembersCarousel from "../../components/MembersCarousel.jsx";
import { membersData } from "../../data/membersData.js";
import StickyStackCards from "../../components/industry-insight/StickyStackCards.jsx";
import { editorialItems } from "../../data/editorialData.js";
import StickyStackCmsSection from "../../components/StickyStackCmsSection.jsx";
import DynamicPageHero from "../../components/common/DynamicPageHero.jsx";
import DynamicContentSection from "../../components/DynamicContentSection.jsx";
import AutomationEcosystemData from "../../data/aboutpagedata/AutomationEcosystemData.js";


export default function AboutPage() {
  const automationItems = [
    {
      id: 1,
      image: "/Pillars/Technology and Cloud Licensing.png",
      alt: "Technology and Cloud Licensing",
    },
    {
      id: 2,
      image: "/Pillars/Education & Training.png",
      alt: "Education & Training",
    },
    {
      id: 3,
      image: "/Pillars/Research & Consulting.png",
      alt: "Research & Consulting",
    },
    {
      id: 4,
      image: "/Pillars/Simulation.png",
      alt: "Simulation",
    },
    {
      id: 5,
      image: "/Pillars/Skill Certification.png",
      alt: "Skill Certification",
    },
    {
      id: 6,
      image: "/Pillars/Integration.png",
      alt: "Integration",
    },
    {
      id: 7,
      image: "/Pillars/testing.png",
      alt: "Testing",
    },
    {
      id: 8,
      image: "/Pillars/Prototyping.png",
      alt: "Prototyping",
    },
  ];
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Full-Bleed About Hero */}
      {/* <AboutHero /> */}
       <DynamicPageHero
        pageKey="about-aia"
        fallbackImage=""
        fallbackHeading={"Shaping the Future of India's\nManufacturing Industry"}
        scrollTarget="#about-overview"
      />

      <CmsSliderSection pageKey="about-aia" sectionKey="about-slider" />

      {/* <AutomationEcosystem
        id="pillars"
        title="Automation Ecosystem"
        items={automationItems}
      /> */}

      <DynamicContentSection
  id="automation-ecosystem"
  title="Automation Ecosystem"
  paragraph=""
  {...AutomationEcosystemData}
/>


      {/* 3. Dynamic Vision, Mission, Objectives with Dotted Curves */}
      {/* <VisionMissionObjectives /> */}

      {/* Second Slider - different CMS content */}
      <CmsSliderSection pageKey="about-aia" sectionKey="about-slider-2" />

      <WhyJoinCmsSection pageKey="about-aia" sectionKey="why-join" />

      <section className="w-full">
        <StickyStackCmsSection pageKey="about-aia" sectionKey="our-journey" />
      </section>
      {/* 5. Current Executive Council matching Image 2 */}
      <CurrentExecutiveCouncil />
      {/* 2. Dynamic 3-Card About Overview */}
      {/* 4. AIA Past Presidents matching Image 1 */}
      <PastPresidents />
      {/* <AboutAIAOverview /> */}

      {/* 6. Automation Ecosystem */}
      {/* <AutomationEcosystem /> */}
      <MembersCarousel
        title="Our Members"
        members={membersData}
        slidesPerView={5}
        autoplay
        autoplayDelay={3500}
        pauseOnHover
        indicatorCount={3}
      />
    </div>
  );
}
