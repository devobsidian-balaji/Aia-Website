import React from "react";
import EventIntroductionSection from "../../components/event/EventIntroductionSection";
import SplitFeatureCard from "../../components/learn-more/SplitFeatureCard";
import EventAgendaSection from "../../components/event/EventAgendaSection";
import AutomationEcosystem from "../../components/AutomationEcosystem";

export default function EventDetailsPage() {
      const automationItems = [
    {
      id: 1,
      image: "/Pillars/Technology and Cloud Licensing.png",
      alt: "Automotive",
    },
    {
      id: 2,
      image: "/Pillars/Education & Training.png",
      alt: "Discrete Manufacturing",
    },
    {
      id: 3,
      image: "/Pillars/Research & Consulting.png",
      alt: "System Integrators",
    },
    {
      id: 4,
      image: "/Pillars/Simulation.png",
      alt: "Electricals & Electricals",
    },
    {
      id: 5,
      image: "/Pillars/Skill Certification.png",
      alt: "Machine & Machine Tools",
    },
  ];
  return (
    <main>
      <SplitFeatureCard
        eyebrow=""
        title="Driving India's Smart Manufacturing Mission"
        description=""
        image="/smart-maintenance-management.png"
        imageAlt="Smart Maintenance Management"
        imagePosition="right"
        background="dark"
      />
      <EventIntroductionSection
        event={{
          date: "Friday, 16th Oct, 2026",
          title: "AI & Industrial Manufacturing",
          venue:
            "At research and innovation park, IIT Delhi campus, Hauz Khas, New Delhi - 110016",
          time: "From 10 am - 5pm",
          saveDateLink: "/events/industrial-automation.ics",
          registrationLink: "/contact-us",
          locationLink: "https://maps.google.com/?q=IIT+Delhi",
        }}
        partners={[
          {
            name: "INDXO",
            logo: "/images/events/partners/indxo.png",
          },
          {
            name: "Yantra247",
            logo: "/images/events/partners/yantra247.png",
          },
          {
            name: "Renata",
            logo: "/images/events/partners/renata.png",
          },
          {
            name: "JTN",
            logo: "/images/events/partners/jtn.png",
          },
        ]}
        supporters={[
          {
            name: "ASDC",
            logo: "/images/events/supporters/asdc.png",
          },
        ]}
        contact={{
          email: "info@aia-india.org",
          phone: "",
          website: "",
        }}
      />
      <EventAgendaSection
        title="Workshop Agenda"
        image="/event-agenda-img.png"
      />
      <AutomationEcosystem
              id="pillars"
              title="Who should attend?"
              paragraph="Participants from the following Industry segments will find this workshop extremely relevant."
              items={automationItems}
            />
    </main>
  );
}
