import React from "react";
import EventsHero from "../../components/EventsHero";
import EventsMetrics from "../../components/EventsMetrics";
import EventsCatalogue from "../../components/EventsCatalogue";
import AIASection from "../../components/sections/AIASection";
import EventFeatureSection from "../../components/event/EventFeatureSection";
import EventsSection from "../../components/event/EventsSection";
import DynamicPageHero from "../../components/common/DynamicPageHero";

export default function EventsPage() {
  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Hero Section matching Image 1 */}
      {/* <EventsHero /> */}
      <DynamicPageHero
        pageKey="events"
        fallbackImage="'/eventsassets/eventHero-img.png"
        fallbackHeading="Find AlA where the industry already gathers."
        scrollTarget="#events-content"
      />

      {/* 2. Key Metrics Strip (20+ Events, 15+ Speakers, 5k+ Participants, 10+ Partners) */}
      <EventsMetrics />
      <EventFeatureSection />
      <EventsSection />

      {/* 3. Events Catalogue with Orange Box Cards, Date Badges & Category Filters */}
      {/* <EventsCatalogue /> */}
    </div>
  );
}
