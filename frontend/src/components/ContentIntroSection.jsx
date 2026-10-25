"use client";

export default function ContentIntroSection({
  id,
  title,
  description,
  secondaryDescription,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`
        relative
        w-full
        overflow-hidden
        bg-white
        py-16
        font-sans

        sm:py-20
        lg:py-24

        ${className}
      `}
    >
      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-6xl
          px-5
          sm:px-8
          lg:px-12
        "
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Title */}

          {title && (
            <h2
              className="
                mb-8
                text-4xl
                font-black
                leading-[1.05]
                tracking-[-0.035em]
                text-[#1F2937]

                sm:mb-12
                sm:text-5xl

                lg:mb-16
                lg:text-[54px]
              "
            >
              {title}
            </h2>
          )}

          {/* Main Description */}

          {description && (
            <p
              className="
                text-sm
                font-normal
                leading-[1.7]
                text-gray-600

                sm:text-base
                sm:leading-[1.7]

                lg:text-lg
                lg:leading-[1.75]
              "
            >
              {description}
            </p>
          )}

          {/* Secondary Description */}

          {secondaryDescription && (
            <p
              className="
                mt-6
                text-xs
                font-normal
                leading-[1.7]
                text-gray-600

                sm:mt-8
                sm:text-base

                lg:text-lg
              "
            >
              {secondaryDescription}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}