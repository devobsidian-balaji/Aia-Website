
// import React from "react";
// import { CalendarDays,Clock3, MapPin, Mail, Phone, Globe } from "lucide-react";


// const defaultSections = [
//   {
//     heading: "Understanding Trends: The Progression of the Event History",
//     paragraphs: [
//       "Progressively, companies are looking to integrate flexible automation with the increasing manufacturing systems and operations, by adopting IoT devices, cloud computing and AI applications. These technologies are expected to play an important role in the development of smart manufacturing environments that are driven by connected industrial systems.",
//     ],
//   },
//   {
//     heading:
//       "Industrial Trends: The shift in manufacturing is in favour of mass customisation.",
//     paragraphs: [
//       "Flexibility is not just a buzz word. Every year new materials of every new standard, in a lean and flexible production line, ought to be the goal. The competitiveness of the supply chain is different from previous years. There is no longer one-size-fits-all approach to production systems. Highly connected and technologically advanced manufacturing setups, having a wide range of process capabilities, are the new normal in modern manufacturing.",
//     ],
//   },
//   {
//     heading:
//       "Digitalisation Trends: Visualisation, Virtualisation, Digital Twins, AI and VR convergence for manufacturing.",
//     paragraphs: [
//       "Companies are investigating how to close the gap between isolated and physical environments by using digital layers. With digitalisation, design, visualisation and training tools can provide rich interactive digital environments to showcase products, features, design elements and processes within the factory. People process visual information much faster and more accurately than text alone, making visualisation an important method to share knowledge.",
//     ],
//   },
//   {
//     heading: "Human-Machine Interaction Trends",
//     paragraphs: [
//       "The industrial production line will take an intuitive role of visualised environments. Although the term Digital Twin brings the point towards virtual and real-time connections between systems, tools and information, the digitalisation of every process is essential to empower people within the process and company. Without this, the goal of technology would be unclear.",
//     ],
//   },
//   {
//     heading:
//       "Digitalisation empowers each of the following positions in knowledge ways:",
//     bullets: [
//       "Supervisors & Managers: Leadership personnel gain a comprehensive understanding of their business processes, allowing them to make more informed judgements.",
//       "Engineers: With complete transparency of the ins and outs of every process, engineers can quickly solve problems and take better decisions for the specific needs of the production line.",
//       "Workers: With complete automated processes, being aware of the machines and their safety levels, workers can provide important human insights and perform actions that machines are incapable of doing.",
//     ],
//     paragraphs: [
//       "We have created a cost-effective Engagement Facility within the IIT Delhi campus where your team can participate in different kinds of machine automation hardware and software tools and learn how to build solutions unique to their specific needs. This centre also trains on a seamless course through advanced manufacturing and digital transformation.",
//     ],
//   },
//   {
//     heading: "Outcomes for the participants",
//     bullets: [
//       "Participants will be able to spot clear technology gaps for their individual needs and get practical solutions.",
//       "They will discover the challenges of migration to a digital network and its impact on overall productivity.",
//       "They will see what it takes to upskill and explore appropriate training programmes to suit their needs.",
//       "Participants will go back with a clear understanding of the important steps needed to embrace their manufacturing competitiveness.",
//     ],
//   },
// ];

// const defaultPartners = [
//   { name: "INDXO", logo: "/images/events/partners/indxo.png" },
//   { name: "Yantra247", logo: "/images/events/partners/yantra247.png" },
//   { name: "Renata", logo: "/images/events/partners/renata.png" },
//   { name: "JTN", logo: "/images/events/partners/jtn.png" },
// ];

// function SidebarCard({ title, children }) {
//   return (
//     <div className="rounded-[9px] border border-[#F16B5C] bg-[#FFFBFA] p-5 shadow-[0_8px_25px_rgba(231,107,92,0.06)] sm:p-7">
//       <h3 className="mb-4 text-sm font-bold text-[#E87565] sm:text-base">
//         {title}
//       </h3>
//       {children}
//     </div>
//   );
// }



// function EventInformation({ event }) {
//   return (
//     <div className="rounded-[9px] border border-[#F16B5C] bg-[#FFFBFA] p-5 shadow-[0_8px_25px_rgba(231,107,92,0.06)] sm:p-7">

//       {/* Event Date */}
//       <h2 className="mb-6 text-xl font-bold leading-tight text-[#E87565] sm:text-xl">
//         {event.date}
//       </h2>

//       {/* Venue */}
//       {event.venue && (
//         <div className="mb-5 flex items-start gap-4">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D92315] to-[#F16B5C] text-white shadow-sm">
//             <MapPin size={16} fill="white" stroke="#D92315" />
//           </div>

//           <p className="pt-0.5 text-sm leading-[1.55] text-[#263247] sm:text-sm">
//             {event.venue}
//           </p>
//         </div>
//       )}

//       {/* Time */}
//       {event.time && (
//         <div className="mb-6 flex items-center gap-4">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D92315] to-[#F16B5C] text-white shadow-sm">
//             <Clock3 size={19} />
//           </div>

//           <p className="text-sm text-[#263247] sm:text-sm">
//             {event.time}
//           </p>
//         </div>
//       )}

//       {/* Save Date + Register */}
//       <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

//         {event.saveDateLink && (
//           <a
//             href={event.saveDateLink}
//             target="_blank"
//             rel="noreferrer"
//             className="flex min-h-[44px] items-center justify-center rounded-[9px] border border-[#F5C8C1] bg-white px-2 py-2 text-center text-sm font-medium text-[#E87565] transition hover:border-[#E87565] hover:bg-[#FFF1EE]"
//           >
//             Save The Date
//           </a>
//         )}

//         {event.registrationLink && (
//           <a
//             href={event.registrationLink}
//             target="_blank"
//             rel="noreferrer"
//             className="flex min-h-[44px] items-center justify-center rounded-[9px] bg-gradient-to-r from-[#D92315] via-[#E43C2D] to-[#F17B6D] px-2 py-2 text-center text-sm font-medium text-white shadow-sm transition hover:brightness-95"
//           >
//             Register Now
//           </a>
//         )}
//       </div>

//       {/* Directions */}
//       {event.locationLink && (
//         <a
//           href={event.locationLink}
//           target="_blank"
//           rel="noreferrer"
//           className="mt-5 flex min-h-[44px] w-full items-center justify-center rounded-[9px] border border-[#F5C8C1] bg-white px-3 py-2 text-center text-sm font-medium text-[#E87565] transition hover:border-[#E87565] hover:bg-[#FFF1EE]"
//         >
//           Directions to reach the venue
//         </a>
//       )}

//     </div>
//   );
// }



// function PartnerCard({ partners }) {
//   return (
//     <SidebarCard title="Contributing Partners">
//       <div className="grid grid-cols-2 gap-3">
//         {partners.map((partner, index) => (
//           <div
//             key={partner.name || index}
//             className="flex aspect-[1.4/1] items-center justify-center overflow-hidden border border-gray-100 bg-white p-2 shadow-lg"
//           >
//             <img
//               src={partner.logo}
//               alt={partner.name}
//               loading="lazy"
//               decoding="async"
//               className="max-h-full max-w-full object-contain"
//             />
//           </div>
//         ))}
//       </div>
//     </SidebarCard>
//   );
// }

// function SupportedByCard({ supporters, contact }) {
//   return (
//     <SidebarCard title="Supported by">
//       <div className="flex flex-wrap items-center gap-3">
//         {supporters.map((supporter, index) => (
//           <img
//             key={supporter.name || index}
//             src={supporter.logo}
//             alt={supporter.name}
//             loading="lazy"
//             decoding="async"
//             className="max-h-12 max-w-[150px] object-contain"
//           />
//         ))}
//       </div>

//       <p className="mb-3 mt-4 text-xs font-semibold text-[#E87565]">
//         Contact us for more info
//       </p>

//       <div className="flex items-center gap-3">
//         {contact.email && (
//           <a
//             href={`mailto:${contact.email}`}
//             aria-label="Email"
//             className="transition hover:text-[#263247]"
//           >
//             <Mail size={16} />
//           </a>
//         )}

//         {contact.phone && (
//           <a
//             href={`tel:${contact.phone}`}
//             aria-label="Phone"
//             className="transition hover:text-[#263247]"
//           >
//             <Phone size={16} />
//           </a>
//         )}

//         {contact.website && (
//           <a
//             href={contact.website}
//             target="_blank"
//             rel="noreferrer"
//             aria-label="Website"
//             className="transition hover:text-[#263247]"
//           >
//             <Globe2 size={16} />
//           </a>
//         )}
//       </div>
//     </SidebarCard>
//   );
// }

// export default function EventIntroductionSection({
//   title = "Introduction",
//   sections = defaultSections,
//   event = {
//     date: "Friday, 10th Oct, 2025",
//     title: "AI & Industrial Manufacturing",
//     time: "10:00 AM – 05:00 PM",
//     venue: "",
//     locationLink: "",
//     registrationLink: "",
//     website: "",
//   },
//   partners = defaultPartners,
//   supporters = [
//     { name: "ASDC", logo: "/images/events/supporters/asdc.png" },
//   ],
//   contact = {
//     email: "",
//     phone: "",
//     website: "",
//   },
//   className = "",
// }) {
//   return (
//     <section
//       className={`bg-white px-5 py-10 font-sans sm:px-8 sm:py-14 lg:px-12 lg:py-16 ${className}`}
//     >
//       <div className="mx-auto grid max-w-[1250px] grid-cols-1 items-start gap-9 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_330px]">

//         {/* Main Article */}
//         <article className="min-w-0">
//           <h1 className="mb-6 text-2xl font-bold tracking-tight text-[#263247] sm:text-3xl">
//             {title}
//           </h1>

//           <div className="space-y-7">
//             {sections.map((section, index) => (
//               <section key={section.id || index}>
//                 {section.heading && (
//                   <h2 className="mb-3 text-xs font-semibold leading-relaxed text-[#E87565] sm:text-sm">
//                     {section.heading}
//                   </h2>
//                 )}

//                 {section.paragraphs?.length > 0 && (
//                   <div className="space-y-3">
//                     {section.paragraphs.map((paragraph, paragraphIndex) => (
//                       <p
//                         key={paragraphIndex}
//                         className="text-[13px] leading-[1.8] text-[#344054] sm:text-sm sm:leading-[1.85]"
//                       >
//                         {paragraph}
//                       </p>
//                     ))}
//                   </div>
//                 )}

//                 {section.bullets?.length > 0 && (
//                   <ul className="my-4 space-y-3 pl-4">
//                     {section.bullets.map((bullet, bulletIndex) => (
//                       <li
//                         key={bulletIndex}
//                         className="list-disc text-[11px] leading-[1.8] text-[#344054] marker:text-[#E87565] sm:text-xs"
//                       >
//                         {bullet}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </section>
//             ))}
//           </div>
//         </article>

//         {/* Right Sidebar */}
//         <aside className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:sticky lg:top-24 lg:grid-cols-1">
//           <EventInformation event={event} />

//           <PartnerCard partners={partners} />

//           <SupportedByCard
//             supporters={supporters}
//             contact={contact}
//           />
//         </aside>
//       </div>
//     </section>
//   );
// }



import React from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

const defaultSections = [];

const defaultPartners = [
  { name: "INDXO", logo: "/images/events/partners/indxo.png" },
  { name: "Yantra247", logo: "/images/events/partners/yantra247.png" },
  { name: "Renata", logo: "/images/events/partners/renata.png" },
  { name: "JTN", logo: "/images/events/partners/jtn.png" },
];

function SidebarCard({ title, children }) {
  return (
    <div className="rounded-[9px] border border-[#F16B5C] bg-[#FFFBFA] p-5 shadow-[0_8px_25px_rgba(231,107,92,0.06)] sm:p-7">
      <h3 className="mb-4 text-sm font-bold text-[#E87565] sm:text-base">
        {title}
      </h3>
      {children}
    </div>
  );
}

// Google Calendar expects YYYYMMDDTHHmmss format.
// datetime-local values are interpreted in Asia/Kolkata.
function formatGoogleCalendarDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const values = {};

  parts.forEach((part) => {
    values[part.type] = part.value;
  });

  return (
    `${values.year}${values.month}${values.day}` +
    `T${values.hour}${values.minute}${values.second}`
  );
}

function getGoogleCalendarLink(event = {}) {
  if (!event.startDateTime || !event.endDateTime) {
    return "";
  }

  const start = formatGoogleCalendarDate(event.startDateTime);
  const end = formatGoogleCalendarDate(event.endDateTime);

  if (!start || !end) return "";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title || "AIA Event",
    dates: `${start}/${end}`,
    details: event.description || "",
    location: event.venue || "",
    ctz: "Asia/Kolkata",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function getGoogleMapsLink(event = {}) {
  if (event.locationLink) {
    return event.locationLink;
  }

  if (event.venue) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      event.venue
    )}`;
  }

  return "";
}

function EventInformation({ event = {} }) {
  const hasInfo =
    event.date ||
    event.venue ||
    event.time ||
    event.registrationLink ||
    event.locationLink ||
    (event.startDateTime && event.endDateTime);

  if (!hasInfo) return null;

  const calendarLink = getGoogleCalendarLink(event);
  const mapsLink = getGoogleMapsLink(event);

  return (
    <div className="rounded-[9px] border border-[#F16B5C] bg-[#FFFBFA] p-5 shadow-[0_8px_25px_rgba(231,107,92,0.06)] sm:p-7">
      {event.date && (
        <h2 className="mb-6 text-xl font-bold leading-tight text-[#E87565]">
          {event.date}
        </h2>
      )}

      {event.venue && (
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D92315] to-[#F16B5C] text-white">
            <MapPin size={16} />
          </div>

          <p className="pt-0.5 text-sm leading-relaxed text-[#263247]">
            {event.venue}
          </p>
        </div>
      )}

      {event.time && (
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D92315] to-[#F16B5C] text-white">
            <Clock3 size={19} />
          </div>

          <p className="text-sm text-[#263247]">
            {event.time}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {calendarLink && (
          <a
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center rounded-[9px] border border-[#F5C8C1] bg-white px-2 py-2 text-center text-sm font-medium text-[#E87565] transition hover:bg-[#FFF1EE]"
          >
            <CalendarDays size={15} className="mr-2 shrink-0" />
            Save The Date
          </a>
        )}

        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center rounded-[9px] bg-gradient-to-r from-[#D92315] via-[#E43C2D] to-[#F17B6D] px-2 py-2 text-center text-sm font-medium text-white transition hover:brightness-95"
          >
            Register Now
          </a>
        )}
      </div>

      {mapsLink && (
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex min-h-[44px] w-full items-center justify-center rounded-[9px] border border-[#F5C8C1] bg-white px-3 py-2 text-center text-sm font-medium text-[#E87565] transition hover:bg-[#FFF1EE]"
        >
          <MapPin size={15} className="mr-2 shrink-0" />
          Directions to reach the venue
        </a>
      )}
    </div>
  );
}

function PartnerCard({ partners = [] }) {
  const validPartners = partners.filter(
    (partner) =>
      partner &&
      (partner.logo || partner.logoUrl || partner.imageUrl)
  );

  if (!validPartners.length) return null;

  return (
    <SidebarCard title="Contributing Partners">
      <div className="grid grid-cols-2 gap-3">
        {validPartners.map((partner, index) => {
          const logo =
            partner.logo ||
            partner.logoUrl ||
            partner.imageUrl;

          return (
            <div
              key={partner._id || partner.name || index}
              className="flex aspect-[1.4/1] items-center justify-center overflow-hidden border border-gray-100 bg-white p-2 shadow-lg"
            >
              <img
                src={logo}
                alt={partner.name || "Partner"}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          );
        })}
      </div>
    </SidebarCard>
  );
}

function SupportedByCard({ supporters = [], contact = {} }) {
  const validSupporters = supporters.filter(
    (item) =>
      item &&
      (item.logo || item.logoUrl || item.imageUrl)
  );

  const hasSupporters = validSupporters.length > 0;

  const hasContact =
    contact.email ||
    contact.phone ||
    contact.website;

  if (!hasSupporters && !hasContact) return null;

  return (
    <SidebarCard title="Supported by">
      {hasSupporters && (
        <div className="flex flex-wrap items-center gap-3">
          {validSupporters.map((supporter, index) => {
            const logo =
              supporter.logo ||
              supporter.logoUrl ||
              supporter.imageUrl;

            return (
              <img
                key={supporter._id || supporter.name || index}
                src={logo}
                alt={supporter.name || "Supporter"}
                loading="lazy"
                decoding="async"
                className="max-h-12 max-w-[150px] object-contain"
              />
            );
          })}
        </div>
      )}

      {hasContact && (
        <>
          <p className="mb-3 mt-4 text-xs font-semibold text-[#E87565]">
            Contact us for more info
          </p>

          <div className="flex items-center gap-4 text-[#263247]">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                aria-label={`Email ${contact.email}`}
                className="transition hover:text-[#E87565]"
              >
                <Mail size={17} />
              </a>
            )}

            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                aria-label={`Call ${contact.phone}`}
                className="transition hover:text-[#E87565]"
              >
                <Phone size={17} />
              </a>
            )}

            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="transition hover:text-[#E87565]"
              >
                <Globe size={17} />
              </a>
            )}
          </div>
        </>
      )}
    </SidebarCard>
  );
}

function LegacySections({ sections = [] }) {
  if (!sections.length) return null;

  return (
    <div className="space-y-7">
      {sections.map((section, index) => (
        <section key={section._id || section.id || index}>
          {section.heading && (
            <h2 className="mb-3 text-xs font-semibold leading-relaxed text-[#E87565] sm:text-sm">
              {section.heading}
            </h2>
          )}

          {section.paragraphs?.length > 0 && (
            <div className="space-y-3">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="text-[13px] leading-[1.8] text-[#344054] sm:text-sm sm:leading-[1.85]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {section.bullets?.length > 0 && (
            <ul className="my-4 space-y-3 pl-5">
              {section.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  className="list-disc text-[13px] leading-[1.8] text-[#344054] marker:text-[#E87565] sm:text-sm"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

function IntroductionBlocks({ blocks = [] }) {
  if (!blocks.length) return null;

  return (
    <div className="space-y-7">
      {blocks.map((block, index) => {
        const image = block.imageUrl || block.image;
        const type = block.type || "paragraph";

        if (type === "heading") {
          return (
            <h2
              key={block._key || block._id || index}
              className="text-lg font-bold leading-relaxed text-[#E87565] sm:text-xl"
            >
              {block.text || block.heading}
            </h2>
          );
        }

        if (
          type === "list" ||
          type === "bullet" ||
          type === "bullets"
        ) {
          const items = Array.isArray(block.items)
            ? block.items
            : [];

          return (
            <ul
              key={block._key || block._id || index}
              className="space-y-3 pl-5"
            >
              {items.filter(Boolean).map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="list-disc text-[13px] leading-[1.8] text-[#344054] marker:text-[#E87565] sm:text-sm"
                >
                  {typeof item === "string" ? item : item.text}
                </li>
              ))}
            </ul>
          );
        }

        if (type === "image") {
          if (!image) return null;

          return (
            <figure
              key={block._key || block._id || index}
              className="space-y-2"
            >
              <img
                src={image}
                alt={block.imageAlt || block.caption || "Event image"}
                loading="lazy"
                decoding="async"
                className={`max-h-[650px] w-full rounded-xl object-cover ${
                  block.imagePosition === "left"
                    ? "lg:mr-auto lg:w-3/4"
                    : block.imagePosition === "right"
                      ? "lg:ml-auto lg:w-3/4"
                      : ""
                }`}
              />

              {block.caption && (
                <figcaption className="text-xs text-gray-500">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return block.text ? (
          <p
            key={block._key || block._id || index}
            className="text-[13px] leading-[1.8] text-[#344054] sm:text-sm sm:leading-[1.85]"
          >
            {block.text}
          </p>
        ) : null;
      })}
    </div>
  );
}

export default function EventIntroductionSection({
  title = "Introduction",
  eyebrow = "",
  description = "",
  blocks = [],
  sections = defaultSections,
  event = {},
  partners = defaultPartners,
  supporters = [],
  contact = {},
  className = "",
}) {
  const hasNewBlocks =
    Array.isArray(blocks) && blocks.length > 0;

  const hasLegacySections =
    Array.isArray(sections) && sections.length > 0;

  return (
    <section
      className={`bg-white px-5 py-10 font-sans sm:px-8 sm:py-14 lg:px-12 lg:py-16 ${className}`}
    >
      <div className="mx-auto grid max-w-[1250px] grid-cols-1 items-start gap-9 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_330px]">
        <article className="min-w-0">
          {eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#E87565]">
              {eyebrow}
            </p>
          )}

          {title && (
            <h1 className="mb-6 text-2xl font-bold tracking-tight text-[#263247] sm:text-3xl">
              {title}
            </h1>
          )}

          {description && (
            <p className="mb-7 text-[13px] leading-[1.8] text-[#344054] sm:text-sm">
              {description}
            </p>
          )}

          {hasNewBlocks ? (
            <IntroductionBlocks blocks={blocks} />
          ) : (
            <LegacySections
              sections={hasLegacySections ? sections : []}
            />
          )}
        </article>

        <aside className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:sticky lg:top-24 lg:grid-cols-1">
          <EventInformation event={event} />

          <PartnerCard partners={partners} />

          <SupportedByCard
            supporters={supporters}
            contact={contact}
          />
        </aside>
      </div>
    </section>
  );
}
