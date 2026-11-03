
import React from "react";

const defaultAgenda = [
  {
    id: 1,
    title: "Making legacy machines smart and connected",
    link: "#",
  },
  {
    id: 2,
    title: "Smart Engineering using digital modeling and simulation",
    link: "#",
  },
  {
    id: 3,
    title: "Understanding use cases of ML and AI in manufacturing",
    link: "#",
  },
  {
    id: 4,
    title: "Process maturity and data-based decision-making",
    link: "#",
  },
  {
    id: 5,
    title: "Skilling for emerging job roles",
    link: "#",
  },
  {
    id: 6,
    title:
      "Tour of Smart Manufacturing Centre of Excellence labs and workshop",
    link: "#",
  },
];

export default function EventAgendaSection({
  title = "Workshop Agenda",
  image = "/images/events/workshop-agenda.jpg",
  imageAlt = "Workshop participants",
  agenda = defaultAgenda,
  className = "",
}) {
  return (
    <section
      className={`w-full bg-white px-5 py-9 sm:px-8 sm:py-11 lg:px-12 lg:py-12 ${className}`}
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-4 lg:gap-5">

        {/* LEFT IMAGE */}
        <div className="relative w-full max-w-[550px]">
          {/* Coral offset border */}
          <div className="absolute -bottom-[5px] -left-[5px] h-full w-full rounded-[4px] bg-[#F07869]" />

          <div className="relative aspect-[1.35/1] w-full overflow-hidden rounded-[4px] bg-[#F1F1F1]">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="min-w-0 sm:pl-1 lg:pl-2">
          <h2 className="mb-5 text-[16px] font-bold leading-[1.3] text-[#263247] sm:mb-4 sm:text-[24px] lg:text-[32px]">
            {title}
          </h2>

          <ol className="list-decimal space-y-[7px] pl-[14px] marker:text-[10px] marker:text-[#0875E8] sm:space-y-[7px]">
            {agenda.map((item, index) => (
              <li
                key={item.id ?? index}
                className="pl-0 text-[16px] leading-[2] text-[#0875E8] sm:text-[16px] lg:text-[16px] font-semibold cursor-pointer marker:text-[16px]"
              >
                {item.link && item.link !== "#" ? (
                  <a
                    href={item.link}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="underline decoration-[#0875E8] underline-offset-[2px] transition-colors hover:text-[#E87565]"
                  >
                    {item.title}
                  </a>
                ) : (
                  <span className="underline decoration-[#0875E8] underline-offset-[2px]">
                    {item.title}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
