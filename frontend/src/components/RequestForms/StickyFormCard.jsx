
import React from "react";

export default function StickyFormCard({
  number,
  title,
  children,
  index = 0,
  className = "",
  maxHeight = "calc(100svh - 110px)",
}) {
  return (
    <section
      className={`
        relative
        flex
        w-full
        flex-col
        overflow-visible
        rounded-md
        border
        border-[#E4EAF0]
        bg-white
        shadow-sm

        lg:sticky
        lg:overflow-hidden

        ${className}
      `}
      style={{
        top: `${76 + index * 10}px`,
        zIndex: index + 1,
        "--card-max-height": maxHeight,
      }}
    >
      {/* Header */}
      {(number || title) && (
        <div className="shrink-0 px-5 pt-6 sm:px-7 sm:pt-7 lg:px-8">
          {number && (
            <div className="mb-2 text-[10px] font-semibold tracking-widest text-[#E87565]">
              SECTION {String(number).padStart(2, "0")}
            </div>
          )}

          {title && (
            <h2 className="mb-5 text-lg font-bold text-[#263247] sm:text-xl">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Content */}
      <div
        className="
          min-h-0
          w-full
          flex-1
          px-5
          pb-6
          sm:px-7
          sm:pb-7
          lg:overflow-y-auto
          lg:overscroll-contain
          lg:px-8
          lg:pb-8
          lg:[scrollbar-width:thin]
          lg:[scrollbar-color:#E87565_#F3F4F6]
          lg:[&::-webkit-scrollbar]:w-1.5
          lg:[&::-webkit-scrollbar-track]:bg-gray-100
          lg:[&::-webkit-scrollbar-thumb]:rounded-full
          lg:[&::-webkit-scrollbar-thumb]:bg-[#E87565]
        "
        style={{
          maxHeight: "var(--card-max-height)",
          touchAction: "pan-y",
        }}
      >
        {children}
      </div>
    </section>
  );
}
