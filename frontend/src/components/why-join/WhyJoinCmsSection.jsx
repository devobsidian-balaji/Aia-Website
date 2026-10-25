
import { useEffect, useState } from "react";
import WhyJoinSection from "./WhyJoinSection";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

export default function WhyJoinCmsSection({
  pageKey,
  sectionKey = "why-join",
  className = "",
}) {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSection() {
      setLoading(true);

      try {
        const response = await fetch(
          `${API_URL}/why-join/${encodeURIComponent(
            pageKey
          )}/${encodeURIComponent(sectionKey)}`,
          { signal: controller.signal }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to load section");
        }

        setSection(result.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Why Join CMS:", error);
          setSection(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadSection();

    return () => controller.abort();
  }, [pageKey, sectionKey]);

  if (loading || !section || !section.isActive) return null;

  return (
    <WhyJoinSection
      heading={section.heading}
      subtitle={section.subtitle}
      items={section.items || []}
      lineColor={section.lineColor || "#FF6B5F"}
      className={className}
    />
  );
}
