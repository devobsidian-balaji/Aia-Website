"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const members = [
  {
    id: 1,
    logo: "",
    name: "INDXO AI Pvt Ltd.",
    location: "Bengaluru, South India",
  },
  {
    id: 2,
    logo: "",
    name: "Yantra 24*7",
    location: "Coimbatore, South India",
  },
  {
    id: 3,
    logo: "",
    name: "Renata Envirocomp Pvt Ltd.",
    location: "System IntegratorsDelhi, North India",
  },
  {
    id: 4,
    logo: "",
    name: "Member Company Four",
    location: "Mumbai, West India",
  },
  {
    id: 5,
    logo: "",
    name: "Member Company Five",
    location: "Pune, West India",
  },
  {
    id: 6,
    logo: "",
    name: "Member Company Six",
    location: "Chennai, South India",
  },
];

export default function MemberDirectory() {
  const [current, setCurrent] = useState(0);

  const total = members.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#24496D]
        text-white
      "
    >
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          right-[-5%]
          h-[280px]
          w-[65%]
          rounded-full
          bg-[#4C83B7]/30
          blur-[80px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-full
          w-[1px]
          bg-cyan-300/70
        "
      />

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[430px]
          w-full
          max-w-[1440px]
          flex-col
          px-6
          py-10

          sm:px-8
          sm:py-12

          md:px-10
          md:py-14

          lg:min-h-[480px]
          lg:flex-row
          lg:px-14
          lg:py-16

          xl:px-16
        "
      >
        {/* =================================================
            LEFT SECTION
        ================================================= */}

        <div
          className="
            relative
            flex
            shrink-0
            flex-col
            justify-between

            lg:w-[22%]
            lg:pr-8

            xl:w-[23%]
          "
        >
          {/* Heading */}

          <h2
            className="
              max-w-[220px]
              font-sans
              text-[32px]
              font-semibold
              leading-[1.25]
              tracking-[-0.03em]

              sm:text-[38px]

              md:text-[42px]

              lg:text-[36px]

              xl:text-[40px]
            "
          >
            Member
            <br />
            Directory
          </h2>

          {/* Desktop Navigation */}

          <div className="mt-8 hidden gap-2 lg:flex">
            <NavigationButton
              direction="prev"
              onClick={prevSlide}
            />

            <NavigationButton
              direction="next"
              onClick={nextSlide}
              filled
            />
          </div>
        </div>

        {/* =================================================
            MEMBER CARDS
        ================================================= */}

        <div
          className="
            mt-8
            min-w-0
            flex-1

            lg:mt-0
          "
        >
          {/* Desktop / Tablet */}

          <div
            className="
              hidden
              gap-3

              sm:grid
              sm:grid-cols-2

              lg:grid
              lg:grid-cols-3
            "
          >
            {[0, 1, 2].map((offset) => {
              const index = (current + offset) % total;

              return (
                <MemberCard
                  key={`${members[index].id}-${offset}`}
                  member={members[index]}
                />
              );
            })}
          </div>

          {/* Mobile */}

          <div className="block sm:hidden">
            <MemberCard member={members[current]} />
          </div>
        </div>

        {/* =================================================
            MOBILE NAVIGATION
        ================================================= */}

        <div
          className="
            mt-7
            flex
            gap-2

            lg:hidden
          "
        >
          <NavigationButton
            direction="prev"
            onClick={prevSlide}
          />

          <NavigationButton
            direction="next"
            onClick={nextSlide}
            filled
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MEMBER CARD
========================================================= */

function MemberCard({ member }) {
  return (
    <article className="w-full">
      {/* =================================================
          LOGO FRAME
      ================================================= */}

      <div
        className="
          relative
          flex
          aspect-square
          w-full
          items-center
          justify-center
          overflow-hidden
          bg-white

          sm:aspect-[1.12/1]

          lg:aspect-square

          xl:aspect-[1.08/1]
        "
      >
        {/* =================================================
            YOUR LOGO

            You can simply provide:

            logo: "/images/member-1.png"

            in the members array.
        ================================================= */}

        {member.logo ? (
          <img
            src={member.logo}
            alt={member.name}
            className="
              max-h-[65%]
              max-w-[78%]
              object-contain
            "
          />
        ) : (
          <span
            className="
              select-none
              font-sans
              text-xs
              uppercase
              tracking-[0.15em]
              text-black/30
            "
          >
            Logo
          </span>
        )}
      </div>

      {/* =================================================
          MEMBER INFORMATION
      ================================================= */}

      <div className="pt-4">
        <h3
          className="
            font-sans
            text-[14px]
            font-medium
            leading-[1.25]
            tracking-[-0.01em]
            text-white

            sm:text-[15px]

            lg:text-[14px]

            xl:text-[15px]
          "
        >
          {member.name}
        </h3>

        <p
          className="
            mt-2
            font-sans
            text-[9px]
            font-normal
            leading-[1.35]
            text-white/90

            sm:text-[10px]

            lg:text-[9px]

            xl:text-[10px]
          "
        >
          {member.location}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   NAVIGATION BUTTON
========================================================= */

function NavigationButton({
  direction,
  onClick,
  filled = false,
}) {
  const isNext = direction === "next";

  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isNext ? "Next member" : "Previous member"}
      className={`
        group
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        transition-all
        duration-300

        sm:h-11
        sm:w-11

        ${
          filled
            ? "border-[#F07B69] bg-[#F07B69] hover:bg-[#E96754]"
            : "border-white bg-transparent hover:bg-white"
        }
      `}
    >
      <Icon
        size={18}
        strokeWidth={1.5}
        className={`
          transition-colors
          duration-300

          ${
            filled
              ? "text-white"
              : "text-white group-hover:text-[#24496D]"
          }
        `}
      />
    </button>
  );
}