"use client";


import { useCallback, useEffect, useMemo, useState } from "react";

export default function MembersCarousel({
  title = "Our Members",
  members = [],
  slidesPerView = 5,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  showIndicators = true,
  indicatorCount = 3,
  className = "",
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalMembers = members.length;

  if (!totalMembers) {
    return null;
  }

  /*
   * Create groups/pages.
   *
   * Example:
   * 15 members / 5 visible = 3 slides
   */
  const pages = useMemo(() => {
    const result = [];

    for (let i = 0; i < totalMembers; i += slidesPerView) {
      result.push(members.slice(i, i + slidesPerView));
    }

    return result;
  }, [members, slidesPerView, totalMembers]);

  const totalSlides = pages.length;

  /*
   * Keep indicator count configurable.
   */
  const indicators = Math.min(
    indicatorCount,
    totalSlides
  );

  /*
   * Infinite next.
   */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev >= totalSlides - 1) {
        return 0;
      }

      return prev + 1;
    });
  }, [totalSlides]);

  /*
   * Infinite previous.
   */
  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (prev <= 0) {
        return totalSlides - 1;
      }

      return prev - 1;
    });
  }, [totalSlides]);

  /*
   * Autoplay.
   */
  useEffect(() => {
    if (!autoplay || totalSlides <= 1) {
      return;
    }

    if (pauseOnHover && isHovered) {
      return;
    }

    const interval = window.setInterval(() => {
      nextSlide();
    }, autoplayDelay);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    nextSlide,
    pauseOnHover,
    totalSlides,
  ]);

  /*
   * Indicator click.
   */
  const goToSlide = (index) => {
    if (index >= totalSlides) return;

    setCurrentSlide(index);
  };

  /*
   * Determine active indicator.
   *
   * If there are exactly 3 pages:
   * 0 -> bar 1
   * 1 -> bar 2
   * 2 -> bar 3
   */
  const activeIndicator =
    currentSlide % indicators;

  return (
    <section
      className={`
        w-full
        overflow-hidden
        bg-white
        py-12

        sm:py-14

        md:py-16

        lg:py-20

        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =================================================
          TITLE
      ================================================== */}

      {title && (
        <h2
          className="
            mb-9
            text-center
            font-sans
            text-[28px]
            font-bold
            leading-none
            tracking-[-0.035em]
            text-[#1F2937]

            sm:mb-11
            sm:text-[32px]

            md:text-[36px]

            lg:mb-12
            lg:text-[38px]
          "
        >
          {title}
        </h2>
      )}

      {/* =================================================
          CAROUSEL
      ================================================== */}

      <div className="relative mx-auto w-full overflow-hidden">
        {/* Left fade */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            z-10
            h-full
            w-8
            bg-gradient-to-r
            from-white
            to-transparent

            sm:w-12

            lg:w-20
          "
        />

        {/* Right fade */}

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            z-10
            h-full
            w-8
            bg-gradient-to-l
            from-white
            to-transparent

            sm:w-12

            lg:w-20
          "
        />

        {/* Track */}

        <div
          className="
            flex
            w-full
            transition-transform
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
            transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
          }}
        >
          {pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="
                flex
                w-full
                shrink-0
                items-center
                justify-center
              "
            >
              <div
                className="
                  flex
                  w-full
                  max-w-[1200px]
                  items-center
                  justify-center
                "
              >
                {page.map((member) => (
                  <MemberLogo
                    key={member.id || member.name}
                    member={member}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =================================================
          INDICATORS
      ================================================== */}

      {showIndicators && indicators > 1 && (
        <div
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-1.5

            sm:mt-9
          "
        >
          {Array.from({ length: indicators }).map(
            (_, index) => {
              const active =
                index === activeIndicator;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to members slide ${
                    index + 1
                  }`}
                  aria-current={active}
                  className="
                    flex
                    h-4
                    w-6
                    items-center
                    justify-center
                    outline-none
                  "
                >
                  <span
                    className={`
                      block
                      h-px
                      transition-all
                      duration-500

                      ${
                        active
                          ? `
                            w-6
                            bg-[#3178C6]
                          `
                          : `
                            w-5
                            bg-[#B7D2EB]
                            hover:bg-[#3178C6]
                          `
                      }
                    `}
                  />
                </button>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}

/* =========================================================
   MEMBER LOGO
========================================================= */

function MemberLogo({ member }) {
  return (
    <div
      className="
        flex
        h-[60px]
        w-[145px]
        shrink-0
        items-center
        justify-center
        px-3

        sm:h-[65px]
        sm:w-[165px]
        sm:px-4

        md:h-[70px]
        md:w-[185px]

        lg:h-[75px]
        lg:w-[205px]

        xl:w-[220px]
      "
    >
      <div
        className="
          relative
          h-full
          w-full
        "
      >
        <img
          src={member.logo}
          alt={member.alt || member.name}
          fill
          sizes="
            (max-width: 640px) 145px,
            (max-width: 768px) 165px,
            (max-width: 1024px) 185px,
            220px
          "
          className="
            object-contain
          "
        />
      </div>
    </div>
  );
}