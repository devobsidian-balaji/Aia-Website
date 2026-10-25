
import { useEffect, useState } from "react";
import HomeFeatureCard from "./HomeFeatureCard";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function HomeFeatureSection() {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(
          `${API_URL}/home-features/home`,
          { signal: controller.signal }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to load Home Features");
        }

        setSection(result.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Home Features:", error);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (loading || !section || section.isActive === false) return null;

  const items = [...(section.items || [])]
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (!items.length) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#193b60] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_100%,rgba(92,148,199,0.35),transparent_45%)]"
      />

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 md:py-12 lg:px-12">
        {(section.heading || section.subtitle) && (
          <header className="mb-5">
            {section.heading && (
              <h2 className="text-2xl font-semibold sm:text-3xl">
                {section.heading}
              </h2>
            )}

            {section.subtitle && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-50/80">
                {section.subtitle}
              </p>
            )}
          </header>
        )}

        <div className="divide-y divide-dashed divide-white/60">
          {items.map((item, index) => (
            <HomeFeatureCard
              key={item._id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
