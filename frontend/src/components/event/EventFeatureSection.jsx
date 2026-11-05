
import React from "react";
import FeatureCard from "../ui/FeatureCard";


const eventCards = [
  {
    id: 1,
    image: "/eventsassets/Mask group.png",
    imageAlt: "Joint Events and Forums",
    title: "Joint Events & Forums",
    description:
      "Conferences and forums AIA co-hosts or partners on.",
  },
  {
    id: 2,
    image: "/eventsassets/Mask group (1).png",
    imageAlt: "Panel Discussions",
    title: "Panel Discussions",
    description:
      "AIA leadership and members contribute to and industry events.",
  },
  {
    id: 3,
    image: "/eventsassets/Mask group (2).png",
    imageAlt: "Expo Pavilions",
    title: "Expo Pavilions",
    description:
      "Dedicated AIA presence at major trade shows.",
  },
];

export default function EventFeatureSection() {
  return (
    <section className="bg-[#244665] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">

        {eventCards.map((card) => (
          <FeatureCard
            key={card.id}
            image={card.image}
            imageAlt={card.imageAlt}
            title={card.title}
            description={card.description}
          />
        ))}

      </div>
    </section>
  );
}
