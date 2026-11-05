
import React from "react";

export default function DynamicContentSection({
  id = "content-grid",
  title = "",
  paragraph = "",
  items = [],
  backgroundColor = "#FFF9F8",
}) {
  return (
    <section
      id={id}
      className="relative isolate w-full overflow-hidden px-4 py-14 font-sans sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      style={{ backgroundColor }}
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE9E5]/50 blur-[110px] sm:h-[400px] sm:w-[700px]" />

      <div className="mx-auto w-full max-w-[1200px]">

        {/* Section Heading */}
        <div className="mx-auto max-w-[700px] text-center">

          {title && (
            <h2 className="text-[25px] font-bold leading-tight tracking-[-0.035em] text-[#252D3B] sm:text-[30px] md:text-[34px] lg:text-[36px]">
              {title}
            </h2>
          )}

          {paragraph && (
            <p className="mx-auto mt-4 max-w-[600px] whitespace-pre-line text-[11px] font-normal leading-[1.7] text-[#252D3B] sm:mt-5 sm:text-xs md:text-[13px]">
              {paragraph}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        {items.length > 0 && (
          <div className="mx-auto mt-7 grid grid-cols-2 items-stretch gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-3 xl:grid-cols-4">

            {items.map((item, index) => (
              <div
                key={item.id || item._id || index}
                className="group flex min-h-[112px] flex-col items-start justify-between rounded-[5px] border border-[#F4E2DF] bg-white px-3 py-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#EF7768] hover:bg-[#FFF0EE] hover:shadow-[0_8px_25px_rgba(226,111,97,0.10)] sm:min-h-[125px] sm:px-3.5 sm:py-5 md:min-h-[135px] md:px-4"
              >
                {/* Card Image / Icon */}
                <div className="mb-3 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden bg-white transition-all duration-300 group-hover:border-[#E76F61] group-hover:bg-[#FFF8F6] sm:mb-3.5 sm:h-9 sm:w-9">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.alt || item.title || "Card icon"}
                      loading="lazy"
                      decoding="async"
                      className="h-[19px] w-[19px] object-contain sm:h-[40px] sm:w-[40px]"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-[#EF7768]">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Card Title */}
                <h3 className="max-w-full text-[10px] font-semibold leading-[1.5] text-[#253044] transition-colors duration-300 group-hover:text-[#D85F52] sm:text-[16px] md:text-sm">
                  {item.title}
                </h3>
              </div>
            ))}

          </div>
        )}

        {/* Empty state */}
        {!items.length && (
          <div className="mt-8 text-center text-sm text-gray-400">
            No cards available.
          </div>
        )}
      </div>
    </section>
  );
}
