
import React from "react";

export default function AutomationEcosystemSection({
  id = "content-grid",
  title = "",
  items = [],
  backgroundColor = "#FAFCFF",
  staggered = true,
}) {
  return (
    <section
      id={id}
      className="relative overflow-hidden py-24 text-center font-sans select-none"
      style={{ backgroundColor }}
    >
      {/* Background Micro-Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-repeat opacity-35"
        style={{
          backgroundImage: "url('/grid-bg.png')",
          backgroundSize: "360px 360px",
        }}
      />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Dynamic Heading */}
        {title && (
          <h2 className="mb-16 text-4xl font-black tracking-tight text-[#1F2937] sm:mb-20 sm:text-5xl lg:text-[56px]">
            {title}
          </h2>
        )}

        {/* Responsive Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`overflow-hidden rounded-2xl shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-xl ${
                staggered && index % 4 >= 1 && index % 4 <= 2
                  ? ""
                  : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.alt || item.title || "Content image"}
                className="block h-auto w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
