
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getMembers } from "../../services/api";

export default function MemberDirectory() {
  const [current, setCurrent] = useState(0);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      try {
        setLoading(true);

        const data = await getMembers();

        if (isMounted) {
          setMembers(Array.isArray(data) ? data : []);
          setCurrent(0);
        }
      } catch (error) {
        console.error("Error fetching members:", error);

        if (isMounted) {
          setMembers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const total = members.length;

  const nextSlide = () => {
    if (total <= 1) return;
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total <= 1) return;
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const getVisibleMembers = (count) => {
    return Array.from(
      { length: Math.min(count, total) },
      (_, offset) => ({
        member: members[(current + offset) % total],
        offset,
      })
    );
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
      {/* BACKGROUND DECORATION */}

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

      {/* MAIN CONTAINER */}

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
        {/* LEFT SECTION */}

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
          <h2
            className="
              max-w-[220px]
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

          {/* DESKTOP NAVIGATION */}

          <div className="mt-8 hidden gap-2 lg:flex">
            <NavigationButton
              direction="prev"
              onClick={prevSlide}
              disabled={loading || total <= 1}
            />

            <NavigationButton
              direction="next"
              onClick={nextSlide}
              filled
              disabled={loading || total <= 1}
            />
          </div>
        </div>

        {/* MEMBER CARDS */}

        <div
          className="
            mt-8
            min-w-0
            flex-1
            lg:mt-0
          "
        >
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center text-sm text-white/80">
              Loading members...
            </div>
          ) : total === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center text-sm text-white/80">
              No members available.
            </div>
          ) : (
            <>
              {/* DESKTOP / TABLET */}

              <div
                className="
                  hidden
                  items-stretch
                  gap-5
                  sm:grid
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {getVisibleMembers(3).map(({ member, offset }) => (
                  <div
                    key={member._id || member.id || member.slug || offset}
                    className={`h-full ${
                      offset === 2 ? "hidden lg:block" : ""
                    }`}
                  >
                    <MemberCard member={member} />
                  </div>
                ))}
              </div>

              {/* MOBILE */}

              <div className="block sm:hidden">
                <MemberCard member={members[current]} />
              </div>
            </>
          )}
        </div>

        {/* MOBILE NAVIGATION */}

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
            disabled={loading || total <= 1}
          />

          <NavigationButton
            direction="next"
            onClick={nextSlide}
            filled
            disabled={loading || total <= 1}
          />
        </div>
      </div>
    </section>
  );
}

/* ==========================================
   MEMBER CARD
========================================== */

function MemberCard({ member }) {
  const logo =
    typeof member.logo === "string"
      ? member.logo
      : member.logo?.url ||
        member.coverLogo?.url ||
        "";

  const name =
    member.name ||
    member.shortName ||
    member.companyName ||
    member.organizationName ||
    "Member";

  const location =
    member.location ||
    member.city ||
    member.address ||
    member.category ||
    "";

  const detailUrl = member.slug
    ? `/membership/member-directory/${member.slug}`
    : null;

  return (
    <article className="flex h-full w-full flex-col">
      {/* LOGO FRAME */}

      <div
        className="
          relative
          flex
          aspect-square
          w-full
          shrink-0
          items-center
          justify-center
          overflow-hidden
          bg-white
          sm:aspect-[1.12/1]
          lg:aspect-square
          xl:aspect-[1.08/1]
        "
      >
        {logo ? (
          <img
            src={logo}
            alt={`${name} logo`}
            loading="lazy"
            onError={(e) => {
              console.error("Member image failed:", logo);
              e.currentTarget.style.display = "none";
            }}
            className="
              h-full
              w-full
              object-contain
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        ) : (
          <span className="text-sm font-medium text-gray-400">
            {name}
          </span>
        )}
      </div>

      {/* MEMBER INFORMATION */}

      <div className="flex flex-1 flex-col pt-4">
        {detailUrl ? (
          <a
            href={detailUrl}
            className="
              line-clamp-2
              min-h-[2.5rem]
              text-[14px]
              font-medium
              leading-[1.25]
              tracking-[-0.01em]
              text-white
              transition-opacity
              hover:opacity-75
              sm:text-[15px]
              lg:text-[14px]
              xl:text-[15px]
            "
          >
            {name}
          </a>
        ) : (
          <h3
            className="
              line-clamp-2
              min-h-[2.5rem]
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
            {name}
          </h3>
        )}

        <p className="mt-2 min-h-[1.25rem] line-clamp-1 text-[10px] leading-[1.35] text-white/80 sm:text-[11px] xl:text-[12px]">
          {location}
        </p>

        {/* VIEW MEMBER BUTTON */}

        {detailUrl && (
          <a
            href={detailUrl}
            className="
              mt-auto
              inline-flex
              w-fit
              items-center
              gap-2
              self-start
              pt-4
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#F07B69]
                bg-[#F07B69]
                px-4
                py-2
                text-[11px]
                font-medium
                text-white
                transition-all
                duration-300
                hover:border-[#E96754]
                hover:bg-[#E96754]
                sm:text-xs
              "
            >
              View Member
              <ArrowRight size={14} strokeWidth={1.8} />
            </span>
          </a>
        )}
      </div>
    </article>
  );
}

/* ==========================================
   NAVIGATION BUTTON
========================================== */

function NavigationButton({
  direction,
  onClick,
  filled = false,
  disabled = false,
}) {
  const isNext = direction === "next";
  const Icon = isNext ? ArrowRight : ArrowLeft;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
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
        disabled:cursor-not-allowed
        disabled:opacity-40
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
