"use client";

import { useMemo } from "react";

/**
 * Reusable Sticky Stack Cards
 *
 * Props:
 * - items: Array of card objects
 * - className: section wrapper classes
 * - cardClassName: individual card classes
 * - stickyOffset: top offset for sticky cards
 * - cardHeight: card height
 * - showNumbers: show card number
 * - startNumber: starting number
 */

export default function StickyStackCards({
  items = [],
  className = "",
  cardClassName = "",
  stickyOffset = 0,
  cardHeight = "min-h-[130px]",
  showNumbers = true,
  startNumber = 1,
}) {
  const normalizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.id ?? index,
        number: item.number ?? startNumber + index,
        title: item.title ?? "",
        description: item.description ?? "",
        background:
          item.background ??
          "bg-[#202B3B]",
        textColor:
          item.textColor ??
          "text-white",
        numberColor:
          item.numberColor ??
          "text-white",
        titleClassName:
          item.titleClassName ?? "",
        descriptionClassName:
          item.descriptionClassName ?? "",
      })),
    [items, startNumber]
  );

  if (!normalizedItems.length) {
    return null;
  }

  return (
    <section
      className={`
        relative
        w-full
        overflow-visible
        ${className}
      `}
    >
      {normalizedItems.map((item, index) => {
        const isLast = index === normalizedItems.length - 1;

        return (
          <StickyCard
            key={item.id}
            item={item}
            index={index}
            isLast={isLast}
            stickyOffset={stickyOffset}
            cardHeight={cardHeight}
            showNumbers={showNumbers}
            className={cardClassName}
          />
        );
      })}
    </section>
  );
}

/* =========================================================
   CARD
========================================================= */

function StickyCard({
  item,
  index,
  stickyOffset,
  cardHeight,
  showNumbers,
  className,
}) {
  return (
    <article
      className={`
        sticky
        flex
        w-full
        items-center
        hover:bg-[#355A7D]
        ${cardHeight}
        ${item.background}
        ${item.textColor}

        ${className}
      `}
      style={{
        top: stickyOffset,
        zIndex: index + 1,
      }}
    >
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1400px]
          grid-cols-[70px_1fr]
          items-center
          gap-3
          px-5

          sm:grid-cols-[80px_1fr]
          sm:gap-8
          sm:px-8

          md:grid-cols-[80px_1fr]
          md:gap-12

          lg:grid-cols-[90px_1fr]
          lg:gap-14
          lg:px-12

          xl:grid-cols-[100px_1fr]
          xl:px-16
          py-8
          md:py-8
        "
      >
        {/* =================================================
            NUMBER
        ================================================== */}

        {showNumbers && (
          <div
            className="
              flex
              items-center
              justify-start
            "
          >
            <span
              className={`
                font-sans
                text-[32px]
                font-medium
                leading-none
                tracking-[-0.04em]

                sm:text-[38px]

                md:text-[44px]

                lg:text-[48px]

                xl:text-[52px]

                ${item.numberColor}
              `}
            >
              {String(item.number).padStart(1, "0")}
            </span>
          </div>
        )}

        {/* =================================================
            CONTENT
        ================================================== */}

        <div
          className="flex min-w-0 flex-col justify-center py-7 sm:py-8 md:py-10 lg:py-12"
        >
          {/* Title */}

          {item.title && (
            <h2
              className={`max-w-[850px] font-sans text-[24px] font-bold leading-[1.25] tracking-[0.02em] sm:text-[17px] md:text-[20px] lg:text-[32px] xl:text-[54px] mb-5
                

                ${item.titleClassName}
              `}
            >
              {item.title}
            </h2>
          )}

          {/* Description */}

          {item.description && (
            <p
              className={`text-lg font-normal leading-[1.7] sm:text-base sm:leading-[1.7] lg:text-lg lg:leading-[1.75]

                ${item.descriptionClassName}
              `}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}