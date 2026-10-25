
import { useEffect, useState } from "react";
import StickyStackCards from "./industry-insight/StickyStackCards";


const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function StickyStackCmsSection({
  pageKey,
  sectionKey,
  fallbackHeading = "",
  fallbackItems = [],
}) {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadSection() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/sticky-stack/${encodeURIComponent(pageKey)}/${encodeURIComponent(sectionKey)}`,
          { signal: controller.signal }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to load section");
        }

        setSection(result.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadSection();
    return () => controller.abort();
  }, [pageKey, sectionKey]);

  // Keep the existing design visible if CMS content is not available yet.
  if (loading && !section) {
    return (
      <section className="w-full py-8">
        <p className="text-center text-sm text-slate-500">
          Loading section...
        </p>
      </section>
    );
  }

  if (error && !section && !fallbackItems.length) {
    return null;
  }

  const heading = section?.heading || fallbackHeading;
  const items = (section?.items?.length ? section.items : fallbackItems)
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (section?.isActive === false || !items.length) return null;

  return (
    <section className="w-full">
      {heading && (
        <div className="bg-white px-5 py-5 text-center sm:py-6 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
          <h2 className="mb-8 text-4xl font-black leading-[1.05] tracking-[-0.035em] text-[#1F2937] sm:mb-12 sm:text-5xl lg:mb-6 lg:text-[54px]">
            {heading}
          </h2>
          {section?.subtitle && (
            <p className="text-sm font-normal leading-[1.7] text-gray-600 sm:text-base sm:leading-[1.7] lg:text-lg lg:leading-[1.75] mb-5">
              {section.subtitle}
            </p>
          )}
        </div>
      )}

      <StickyStackCards
        items={items}
        cardHeight="min-h-[130px]"
        showNumbers
      />
    </section>
  );
}
