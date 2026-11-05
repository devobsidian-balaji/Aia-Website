
import React, { useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function DynamicPageHero({
  pageKey,
  fallbackImage = "",
  fallbackHeading = "",
  scrollTarget = "#about-overview",
}) {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pageKey) return;

    const controller = new AbortController();

    const fetchHero = async () => {
      try {
        const response = await fetch(
          `${API_URL}/page-heroes/${pageKey}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch page hero");
        }

        const result = await response.json();

        setHero(result?.data || result?.hero || result || null);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Page hero error:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchHero();

    return () => controller.abort();
  }, [pageKey]);

  const image = hero?.bannerImage || fallbackImage;
  const heading = hero?.heading || fallbackHeading;

  const overlayOpacity =
    typeof hero?.overlayOpacity === "number"
      ? hero.overlayOpacity / 100
      : 0.85;

  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden font-sans">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center select-none transition-opacity duration-500"
        style={{
          backgroundImage: image ? `url("${image}")` : "none",
        }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-[#0B131E]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B131E]/40 via-transparent to-[#0B131E]/70 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#0B131E]/50 via-transparent to-[#0B131E]/50 pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center pt-20 pb-12 flex flex-col items-center justify-between min-h-[580px] lg:min-h-[660px] w-full">

        <div className="my-auto max-w-4xl space-y-4">

          {!loading && heading && (
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] leading-[1] text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] whitespace-pre-line">
              {heading}
            </h1>
          )}

        </div>

        {/* Scroll Indicator */}
        <div className="mt-6 flex justify-center items-center">
          <a
            href={scrollTarget}
            aria-label="Scroll down"
            className="group flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <div className="w-5 h-8 rounded-full border-2 border-white/80 group-hover:border-white flex items-start justify-center p-1.5 transition-colors shadow-md">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
