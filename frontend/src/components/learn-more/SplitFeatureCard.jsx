
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SplitFeatureCard({
  eyebrow,
  title,
  description,
  paragraphs = [],
  image,
  imageAlt = "",
  imagePosition = "right",
  background = "dark",
  buttonText,
  buttonLink,
  name,
}) {
    console.log(buttonText)
  const isDark = background === "dark";

  return (
    <section
      className={`relative overflow-hidden ${
        isDark ? "bg-[#244665] text-white" : "bg-white text-[#263247]"
      }`}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-12 lg:py-16">
        {/* Text */}
        <div
          className={`min-w-0 ${
            imagePosition === "left" ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {eyebrow && (
            <span
              className={`mb-3 block text-xs font-semibold uppercase tracking-[0.18em] ${
                isDark ? "text-[#F18A7D]" : "text-[#E87565]"
              }`}
            >
              {eyebrow}
            </span>
          )}

          <h2 className="max-w-[600px] text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            {title}
          </h2>

          {description && (
            <p
              className={`mt-5 max-w-[580px] text-sm leading-7 sm:text-base ${
                isDark ? "text-white/80" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          )}

          {paragraphs.length > 0 && (
            <div className="mt-4 space-y-3">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-xs leading-6 sm:text-sm ${
                    isDark ? "text-white/75" : "text-gray-600"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          {name && (
            <h4
              className={`mt-5 max-w-[580px] text-sm leading-7 sm:text-base font-bold ${
                isDark ? "text-white/80" : "text-gray-600"
              }`}
            >
              {name}
            </h4>
          )}

          {buttonText && buttonLink && (
            <Link
              to={buttonLink}
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[#E87565] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#d65d50]"
            >
              {buttonText}
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {/* Image */}
        {image && (
          <div
            className={`min-w-0 ${
              imagePosition === "left" ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="overflow-hidden rounded-sm border border-white/20 shadow-xl">
              <img
                src={image}
                alt={imageAlt || title}
                loading="lazy"
                decoding="async"
                className="h-[220px] w-full object-cover sm:h-[320px] lg:h-[390px]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
