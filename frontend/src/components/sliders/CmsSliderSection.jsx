
import { useEffect, useState } from "react";
import ReusableCardSlider from "./ReusableCardSlider";
// import ReusableCardSlider from "./ReusableCardSlider";


const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function CmsSliderSection({
  pageKey,
  sectionKey,
  className = "py-12 lg:py-16",
}) {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadContent() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `${API_URL}/sliders/${encodeURIComponent(
            pageKey
          )}/${encodeURIComponent(sectionKey)}`,
          { signal: controller.signal }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Unable to load slider content");
        }

        setSection(result.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("CMS slider:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => controller.abort();
  }, [pageKey, sectionKey]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-12">
        <div className="h-7 w-56 rounded bg-slate-100" />
        <div className="mt-5 h-64 rounded-lg bg-slate-100" />
      </div>
    );
  }

  if (error || !section || !section.isActive) {
    return null;
  }

  const slides = [
    ...(section.intro?.enabled !== false && section.intro?.title
      ? [
          {
            id: "intro",
            type: "intro",
            eyebrow: section.intro.eyebrow,
            title: section.intro.title,
            color: section.intro.color,
          },
        ]
      : []),
    ...(section.cards || []).map((card) => ({
      id: card._id,
      title: card.title,
      description: card.description,
      image: card.imageUrl,
      imageAlt: card.imageAlt,
      link: card.link,
      linkText: card.linkText,
    })),
  ];

  if (!slides.length) return null;

  return (
    <section className={className}>
      {(section.heading || section.subtitle) && (
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
            
        <div className="mx-auto max-w-5xl text-center">
          {section.heading && (
            <h2 className="mb-8 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-[#1F2937] sm:mb-6 sm:text-5xl lg:mb-16 lg:text-[54px]">
              {section.heading}
            </h2>
          )}

          {section.subtitle && (
            <p className="text-sm font-normal leading-[1.7] text-gray-600 sm:text-base sm:leading-[1.7] lg:text-lg lg:leading-[1.75] mb-5">
              {section.subtitle}
            </p>
          )}
        </div>
        </div>
      )}

      <ReusableCardSlider
        slides={slides}
        visibleSlides={section.visibleSlides || 3}
        introColor={section.intro?.color || "bg-[#E52B18]"}
        accentColor={section.accentColor || "#E96F62"}
      />
    </section>
  );
}
