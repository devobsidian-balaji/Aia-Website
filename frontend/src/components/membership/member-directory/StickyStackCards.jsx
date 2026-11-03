
import { useMemo } from "react";

/**
 * Reusable Sticky Stack Cards
 *
 * Props:
 * items, title, className, cardClassName,
 * stickyOffset, cardHeight, showNumbers, startNumber
 *
 * Item:
 * title, description, paragraph, points,
 * background, textColor, numberColor
 */

export default function StickyStackCards({
  items = [],
  title = "",
  className = "",
  cardClassName = "",
  stickyOffset = 0,
  cardHeight = "min-h-[137px]",
  showNumbers = true,
  startNumber = 1,
}) {
  const normalizedItems = useMemo(
    () =>
      items.map((item, index) => ({
        id: item.id ?? index,
        number: item.number ?? startNumber + index,
        title: item.title ?? "",

        // Supports both old and new data properties
        description: item.description ?? item.paragraph ?? "",

        // Paragraph is hidden by default for the reference design
        showDescription:
          item.showDescription ?? Boolean(item.description),

        points: Array.isArray(item.points) ? item.points : [],

       background: item.background ?? "bg-[#202B3B]",

        textColor: item.textColor ?? "text-white",
        numberColor: item.numberColor ?? "text-white",
        titleClassName: item.titleClassName ?? "",
        descriptionClassName: item.descriptionClassName ?? "",
        pointsClassName: item.pointsClassName ?? "",
      })),
    [items, startNumber]
  );

  if (!normalizedItems.length) return null;

  return (
    <section className={`relative w-full overflow-visible ${className}`}>

      {/* Section Heading */}
      {title && (
        <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight text-center mb-16">
          {title}
        </h2>
      )}

      {/* Sticky Cards */}
      {normalizedItems.map((item, index) => (
        <StickyCard
          key={item.id}
          item={item}
          index={index}
          stickyOffset={stickyOffset}
          cardHeight={cardHeight}
          showNumbers={showNumbers}
          className={cardClassName}
        />
      ))}

    </section>
  );
}

/* =========================================================
   INDIVIDUAL STICKY CARD
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
  className={`sticky flex w-full items-center ${cardHeight} ${item.background} ${item.textColor} transition-colors duration-300 hover:!bg-[#355A7D] ${className} py-12
  `}
  style={{
    top: stickyOffset,
    zIndex: index + 1,
  }}
>
      <div
        className={`mx-auto grid w-full max-w-[1400px] items-center gap-3 px-5 ${showNumbers ? "grid-cols-[70px_1fr]" : "grid-cols-1"} sm:gap-8 sm:px-8 ${showNumbers ? "sm:grid-cols-[80px_1fr]" : "sm:grid-cols-1"} md:gap-12
          ${showNumbers ? "md:grid-cols-[80px_1fr]" : "md:grid-cols-1"} lg:gap-24 lg:px-12 ${showNumbers ? "lg:grid-cols-[90px_1fr]" : "lg:grid-cols-1"} xl:px-16 ${showNumbers ? "xl:grid-cols-[100px_1fr]" : "xl:grid-cols-1"} py-5 sm:py-6
        `}
      >

        {/* NUMBER */}
        {showNumbers && (
          <div className="flex items-center justify-start">
            <span
              className={`font-sans text-[32px] font-semibold leading-none tracking-[-0.04em] sm:text-[38px] md:text-[44px] lg:text-[80px] xl:text-[100px] ${item.numberColor}
              `}
            >
              {item.number}
            </span>
          </div>
        )}

        {/* CONTENT */}
        <div className="flex min-w-0 flex-col justify-center py-2">

          {/* Title */}
          {item.title && (
            <h2
              className={`max-w-[850px] font-sans text-[24px] font-bold leading-[1.25] tracking-[0.02em] sm:text-[17px] md:text-[20px] lg:text-[32px] xl:text-[32px] mb-5 ${item.titleClassName}
              `}
            >
              {item.title}
            </h2>
          )}

          {/* Description / Paragraph */}
          {item.showDescription && item.description && (
            <p
              className={`mb-3 max-w-[850px] text-[11px] leading-relaxed text-white/75 sm:text-xs ${item.descriptionClassName}
              `}
            >
              {item.description}
            </p>
          )}

          {/* Bullet Points */}
          {item.points.length > 0 && (
            <ul
              className={`space-y-1.5 text-[10px] font-normal leading-relaxed text-white/85 sm:text-[16px] ${item.pointsClassName}
              `}
            >
              {item.points.map((point, pointIndex) => (
                <li
                  key={pointIndex}
                  className="flex items-start gap-1.5"
                >
                  <span className="shrink-0 text-white">
                    •
                  </span>

                  <span>
                    {typeof point === "string" ? point : point.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
    </article>
  );
}
