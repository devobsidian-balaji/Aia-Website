
"use client";

import { useEffect, useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import FeatureCard from "../ui/FeatureCard";

// Update this to match your existing API configuration.
const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/v1"
).replace(/\/$/, "");

const FALLBACK_SECTION = {
  heading: "What AIA does",
  subtitle:
    "AIA brings together players who build, sell, integrate, deploy and maintain the technology infrastructure around automation in India, ensuring the sector grows around shared standards, shared skills, and a shared voice with policymakers.",
  cards: [
    {
      _id: "represent",
      title: "Represent",
      description:
        "A credible, collective voice across industry forums and policy discussions.",
      imageUrl: "/images/aia-represent.jpg",
      imageAlt: "Speaker at an industry discussion",
      order: 0,
    },
    {
      _id: "equip",
      title: "Equip",
      description:
        "Skilling and campus programs that build India's automation talent pipeline.",
      imageUrl: "/images/aia-equip.jpg",
      imageAlt: "Participants attending a training session",
      order: 1,
    },
    {
      _id: "connect",
      title: "Connect",
      description:
        "A committed member network spanning technology providers and integrators, supporting a community of adopters and innovators.",
      imageUrl: "/images/aia-connect.jpg",
      imageAlt: "Community members at an industry gathering",
      order: 2,
    },
  ],
};

function SectionSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[10px]"
      aria-label="Loading AIA content"
    >
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-md border border-rose-100 p-2"
        >
          <div className="aspect-[4/3] rounded-sm bg-slate-100" />
          <div className="mt-4 h-4 w-1/2 rounded bg-slate-100" />
          <div className="mt-3 h-3 w-full rounded bg-slate-100" />
          <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export default function AIASection() {
  const [section, setSection] = useState(FALLBACK_SECTION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSection() {
      try {
        const response = await fetch(`${API_URL}/what-aia`, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch What AIA Does content");
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error("Invalid What AIA Does API response");
        }

        const data = result.data;

        setSection({
          heading: data.heading || FALLBACK_SECTION.heading,
          subtitle:
            data.subtitle ?? FALLBACK_SECTION.subtitle,
          cards: Array.isArray(data.cards)
            ? [...data.cards]
                .filter((card) => card.isActive !== false)
                .sort(
                  (a, b) => (a.order ?? 0) - (b.order ?? 0)
                )
            : [],
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("AIA section error:", error);
          // Keep fallback content if the API is unavailable.
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchSection();

    return () => controller.abort();
  }, []);

  return (
    <section
      id="what-aia-does"
      aria-labelledby="what-aia-heading"
      className="relative isolate overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      {/* Subtle dotted background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-2/3 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(#d9dce2 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
          maskImage:
            "linear-gradient(to left, black, transparent)",
          WebkitMaskImage:
            "linear-gradient(to left, black, transparent)",
        }}
      />

      <div className="mx-auto max-w-[1120px]">
        <SectionTitle
          title={section.heading}
          description={section.subtitle}
          className="mb-7"
        />

        {loading ? (
          <SectionSkeleton />
        ) : section.cards.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[10px]">
            {section.cards.map((card) => (
              <FeatureCard
                key={card._id}
                title={card.title}
                description={card.description}
                image={card.imageUrl}
                imageAlt={card.imageAlt || card.title}
              />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-slate-500">
            Content is currently unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
