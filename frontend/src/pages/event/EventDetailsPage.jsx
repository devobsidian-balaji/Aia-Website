// import React from "react";
// import EventIntroductionSection from "../../components/event/EventIntroductionSection";
// import SplitFeatureCard from "../../components/learn-more/SplitFeatureCard";
// import EventAgendaSection from "../../components/event/EventAgendaSection";
// import AutomationEcosystem from "../../components/AutomationEcosystem";
// import DynamicContentSection from "../../components/DynamicContentSection";
// import WhatShouldAttendData from "../../data/eventdata/WhatShouldAttendData";

// export default function EventDetailsPage() {
//   const automationItems = [
//     {
//       id: 1,
//       image: "/Pillars/Technology and Cloud Licensing.png",
//       alt: "Automotive",
//     },
//     {
//       id: 2,
//       image: "/Pillars/Education & Training.png",
//       alt: "Discrete Manufacturing",
//     },
//     {
//       id: 3,
//       image: "/Pillars/Research & Consulting.png",
//       alt: "System Integrators",
//     },
//     {
//       id: 4,
//       image: "/Pillars/Simulation.png",
//       alt: "Electricals & Electricals",
//     },
//     {
//       id: 5,
//       image: "/Pillars/Skill Certification.png",
//       alt: "Machine & Machine Tools",
//     },
//   ];
//   return (
//     <main>
//       <SplitFeatureCard
//         eyebrow=""
//         title="Driving India's Smart Manufacturing Mission"
//         description=""
//         image="/smart-maintenance-management.png"
//         imageAlt="Smart Maintenance Management"
//         imagePosition="right"
//         background="dark"
//       />
//       <EventIntroductionSection
//         event={{
//           date: "Friday, 16th Oct, 2026",
//           title: "AI & Industrial Manufacturing",
//           venue:
//             "At research and innovation park, IIT Delhi campus, Hauz Khas, New Delhi - 110016",
//           time: "From 10 am - 5pm",
//           saveDateLink: "/events/industrial-automation.ics",
//           registrationLink: "/contact-us",
//           locationLink: "https://maps.google.com/?q=IIT+Delhi",
//         }}
//         partners={[
//           {
//             name: "INDXO",
//             logo: "/member-directory-images/indxo.png",
//           },
//           {
//             name: "Yantra247",
//             logo: "/member-directory-images/yantra.png",
//           },
//           {
//             name: "Renata",
//             logo: "/member-directory-images/renata.png",
//           },
//           {
//             name: "JTN",
//             logo: "/member-directory-images/jendamark.png",
//           },
//         ]}
//         supporters={[
//           {
//             name: "ASDC",
//             logo: "/member-directory-images/asdc.png",
//           },
//         ]}
//         contact={{
//           email: "info@aia.org",
//           phone: "",
//           website: "",
//         }}
//       />
//       <EventAgendaSection
//         title="Workshop Agenda"
//         image="/event-agenda-img.png"
//       />
//       {/* <AutomationEcosystem
//               id="pillars"
//               title="Who should attend?"
//               paragraph="Participants from the following Industry segments will find this workshop extremely relevant."
//               items={automationItems}
//             /> */}
//       <DynamicContentSection
//         id="who-should-attend"
//         title="Who should attend?"
//         paragraph="Participants from the following Industry segments will find this workshop extremely relevant."
//         {...WhatShouldAttendData}
//       />
//     </main>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// import { getEventBySlug } from "../../services/api";

// import SplitFeatureCard from "../../components/learn-more/SplitFeatureCard";
// import EventIntroductionSection from "../../components/event/EventIntroductionSection";
// import EventAgendaSection from "../../components/event/EventAgendaSection";

// // Apne existing component ka exact path use karein.
// import DynamicContentSection from "../../components/DynamicContentSection";

// export default function EventDetailsPage() {
//   const { slug } = useParams();

//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     const fetchEvent = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const data = await getEventBySlug(slug);

//         if (mounted) {
//           setEvent(data);
//         }
//       } catch (err) {
//         console.error("Event detail fetch error:", err);

//         if (mounted) {
//           setError(
//             err.response?.data?.message || "Unable to load event."
//           );
//         }
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchEvent();

//     return () => {
//       mounted = false;
//     };
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <div className="text-sm font-semibold text-gray-500">
//           Loading event...
//         </div>
//       </div>
//     );
//   }

//   if (error || !event) {
//     return (
//       <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
//         <h1 className="text-2xl font-bold text-[#263247]">
//           Event Not Found
//         </h1>

//         <p className="mt-2 text-sm text-gray-500">
//           {error || "This event may have been removed or is unavailable."}
//         </p>

//         <Link
//           to="/events"
//           className="mt-5 rounded-lg bg-[#E25238] px-5 py-3 text-sm font-semibold text-white"
//         >
//           Back to Events
//         </Link>
//       </div>
//     );
//   }

//   const detail = event.detailPage || {};
//   const hero = detail.hero || {};
//   const introduction = detail.introduction || {};
//   const eventInfo = introduction.eventInfo || {};
//   const agenda = detail.agenda || {};

//   const heroImage = hero.imageUrl || event.imageUrl || "";

//   return (
//     <main className="min-h-screen bg-white">

//       {/* HERO */}
//       {hero.title || hero.description || heroImage ? (
//         <SplitFeatureCard
//           eyebrow={hero.eyebrow || ""}
//           title={hero.title || event.title}
//           description={hero.description || event.description}
//           image={heroImage}
//           imageAlt={hero.imageAlt || event.title}
//           imagePosition={hero.imagePosition || "right"}
//           background={hero.background || "dark"}
//           buttonText=""
//           buttonLink=""
//           name={event.title}
//         />
//       ) : null}

//       {/* INTRODUCTION */}
//       <EventIntroductionSection
//         title={introduction.title || "Introduction"}
//         sections={introduction.sections || []}
//         event={{
//           date: eventInfo.date || event.date || "",
//           title: eventInfo.title || event.title || "",
//           time: eventInfo.time || "",
//           venue: eventInfo.venue || "",
//           saveDateLink: eventInfo.saveDateLink || "",
//           registrationLink: eventInfo.registrationLink || "",
//           locationLink: eventInfo.locationLink || "",
//           website: introduction.contact?.website || "",
//         }}
//         partners={introduction.partners || []}
//         supporters={introduction.supporters || []}
//         contact={{
//           email: introduction.contact?.email || "",
//           phone: introduction.contact?.phone || "",
//           website: introduction.contact?.website || "",
//         }}
//       />

//       {/* AGENDA */}
//       {(agenda.title ||
//         agenda.imageUrl ||
//         agenda.items?.length > 0) && (
//         <EventAgendaSection
//           title={agenda.title || "Event Agenda"}
//           image={agenda.imageUrl || ""}
//           imageAlt={agenda.imageAlt || event.title}
//           agenda={agenda.items || []}
//         />
//       )}

//       {/* DYNAMIC CONTENT */}
//       {Array.isArray(detail.contentSections) &&
//         detail.contentSections.length > 0 && (
//           <DynamicContentSection
//             sections={detail.contentSections}
//           />
//         )}

//     </main>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getEventBySlug } from "../../services/api";

import EventIntroductionSection from "../../components/event/EventIntroductionSection";
import EventAgendaSection from "../../components/event/EventAgendaSection";
import DynamicContentSection from "../../components/DynamicContentSection";
import WhatShouldAttendData from "../../data/eventdata/WhatShouldAttendData";

function getEventData(response) {
  return response?.data?.data || response?.data || response;
}

export default function EventDetailsPage() {
  const { slug } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getEventBySlug(slug);
        const eventData = getEventData(response);

        if (!eventData) {
          throw new Error("Event not found.");
        }

        if (isMounted) {
          setEvent(eventData);
        }
      } catch (err) {
        console.error("Event detail fetch error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load event details."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchEvent();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white px-5">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#FCE5DF] border-t-[#E25238]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading event details...
          </p>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white px-5">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#263247]">
            Event not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error || "This event may have been removed or is unavailable."}
          </p>

          <Link
            to="/events"
            className="mt-6 inline-flex rounded-xl bg-[#E25238] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c9442d]"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const detailPage = event.detailPage || {};
  const hero = detailPage.hero || {};
  const introduction = detailPage.introduction || {};
  const agenda = detailPage.agenda || {};

  const heroImage =
    hero.imageUrl ||
    hero.image ||
    event.imageUrl ||
    "";

  const introductionSections =
    introduction.sections || [];

  const eventInfo = introduction.eventInfo || {};

  const agendaItems = agenda.items || [];

  const contentSections = detailPage.contentSections || [];

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      {/* HERO SECTION */}
      <section
        className={`relative overflow-hidden ${
          hero.background === "light"
            ? "bg-[#FFF9F7] text-[#263247]"
            : "bg-[#172033] text-white"
        }`}
      >
        <div className="mx-auto grid min-h-[480px] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-12">
          <div className="relative z-10">
            {hero.eyebrow && (
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#E87565]">
                {hero.eyebrow}
              </p>
            )}

            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {hero.title || event.title}
            </h1>

            {hero.subtitle && (
              <h2 className="mt-5 text-lg font-semibold leading-relaxed text-[#E87565] sm:text-xl">
                {hero.subtitle}
              </h2>
            )}

            {(hero.description || event.description) && (
              <p
                className={`mt-5 max-w-2xl text-sm leading-7 sm:text-base ${
                  hero.background === "light"
                    ? "text-[#596579]"
                    : "text-white/70"
                }`}
              >
                {hero.description || event.description}
              </p>
            )}

            {event.date && (
              <p className="mt-7 inline-flex rounded-full bg-[#E87565] px-5 py-2.5 text-xs font-bold text-white">
                {event.date}
              </p>
            )}
          </div>

          {heroImage && (
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-[#E87565]/15 blur-2xl" />
              <img
                src={heroImage}
                alt={hero.imageAlt || hero.title || event.title}
                fetchPriority="high"
                decoding="async"
                className="relative max-h-[580px] min-h-[280px] w-full rounded-2xl object-cover shadow-2xl"
              />
            </div>
          )}
        </div>
      </section>

      {/* INTRODUCTION */}
      {(introduction.title ||
        introduction.description ||
        introduction.blocks?.length ||
        introductionSections.length ||
        eventInfo.date ||
        introduction.partners?.length ||
        introduction.supporters?.length) && (
        <EventIntroductionSection
          eyebrow={introduction.eyebrow}
          title={introduction.title || "Introduction"}
          description={introduction.description}
          blocks={introduction.blocks || []}
          sections={introductionSections}
          event={{
            date: eventInfo.date || event.date || "",
            title: eventInfo.title || event.title || "",
            time: eventInfo.time || "",
            venue: eventInfo.venue || "",
            saveDateLink: eventInfo.saveDateLink || "",
            registrationLink:
              eventInfo.registrationLink || "",
            locationLink: eventInfo.locationLink || "",
          }}
          partners={introduction.partners || []}
          supporters={introduction.supporters || []}
          contact={introduction.contact || {}}
        />
      )}

      {/* AGENDA */}
      {(agenda.title ||
        agenda.description ||
        agendaItems.length ||
        agenda.imageUrl ||
        agenda.image) && (
        <EventAgendaSection
          eyebrow={agenda.eyebrow}
          title={agenda.title || "Event Agenda"}
          description={agenda.description}
          image={agenda.imageUrl || agenda.image || ""}
          imageAlt={agenda.imageAlt || "Event agenda"}
          agenda={agendaItems}
        />
      )}

      <DynamicContentSection
  id="who-should-attend"
  title="Who should attend?"
  paragraph="Participants from the following Industry segments will find this workshop extremely relevant."
  {...WhatShouldAttendData}
/>

      {/* EVENT FOOTER CTA */}
      {event.eventLink && (
        <section className="bg-[#172033] px-5 py-12 text-center text-white sm:px-8 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Be a part of this event
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/65">
              Explore the event and connect with the AIA community.
            </p>

            <a
              href={event.eventLink}
              target={
                event.eventLink.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                event.eventLink.startsWith("http")
                  ? "noreferrer"
                  : undefined
              }
              className="mt-7 inline-flex rounded-xl bg-[#E87565] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#d85f50]"
            >
              Learn More
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
