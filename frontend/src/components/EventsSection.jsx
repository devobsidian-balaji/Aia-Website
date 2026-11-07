import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { getEvents } from "../services/api";

// ==========================================
// CATEGORY NORMALIZER
// ==========================================

const normalizeCategory = (category = "") => {
  const value = String(category).trim().toLowerCase();

  if (["conference", "conferences"].includes(value)) {
    return "Conference";
  }

  if (["workshop", "workshops"].includes(value)) {
    return "Workshops";
  }

  if (["webinar", "webinars"].includes(value)) {
    return "Webinars";
  }

  if (["training program", "training programs"].includes(value)) {
    return "Training Program";
  }

  return category;
};

// ==========================================
// EVENT CARD
// ==========================================

const EventCard = ({ event }) => {
  const eventLink = event.eventLink || event.link || "";
  const isInternal = eventLink.startsWith("/");

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-md bg-[#F7F8FA] transition-shadow duration-500 hover:shadow-lg">

      {/* IMAGE */}

      <div className="relative block aspect-[16/9] overflow-hidden bg-slate-200">
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title || "Event"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}

        {event.date && (
          <span className="absolute bottom-3 right-3 rounded-md bg-[#E87568] px-3 py-2 text-[10px] font-bold text-white">
            {event.date}
          </span>
        )}
      </div>

      {/* CONTENT */}

      <div className="flex flex-1 flex-col p-4 sm:p-5">

        <span className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#E87568]">
          {normalizeCategory(event.category)}
        </span>

        <h3 className="mb-3 line-clamp-2 text-base font-bold leading-snug text-[#202B3D] sm:text-lg">
          {event.title}
        </h3>

        <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-[#354052] sm:text-[13px]">
          {event.description}
        </p>

        {eventLink && (
          <a
            href={eventLink}
            target={!isInternal ? "_blank" : undefined}
            rel={!isInternal ? "noopener noreferrer" : undefined}
            className="mt-auto w-fit text-xs font-semibold text-[#D94F42] underline underline-offset-2 transition-colors hover:text-[#A92C20]"
          >
            Read More
          </a>
        )}
      </div>
    </article>
  );
};

// ==========================================
// EVENTS SECTION
// ==========================================

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Events");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sliderRef = useRef(null);

  const ITEMS_PER_PAGE = 2;

  // ==========================================
  // FETCH EVENTS FROM DATABASE API
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getEvents();

        if (!mounted) return;

        const activeEvents = (Array.isArray(data) ? data : [])
          .filter(
            (event) =>
              event &&
              event.isActive !== false &&
              event.imageUrl &&
              event.title
          )
          .sort(
            (a, b) =>
              (a.order ?? 0) - (b.order ?? 0)
          );

        setEvents(activeEvents);
      } catch (err) {
        console.error("Unable to fetch events:", err);

        if (mounted) {
          setEvents([]);
          setError("Unable to load events. Please try again later.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================
  // DYNAMIC CATEGORY FILTERS
  // ==========================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        events
          .map((event) => normalizeCategory(event.category))
          .filter(Boolean)
      ),
    ];

    return ["All Events", ...uniqueCategories];
  }, [events]);

  // ==========================================
  // FILTER EVENTS
  // ==========================================

  const filteredEvents = useMemo(() => {
    if (activeCategory === "All Events") {
      return events;
    }

    return events.filter(
      (event) =>
        normalizeCategory(event.category) === activeCategory
    );
  }, [events, activeCategory]);

  const totalPages = Math.ceil(
    filteredEvents.length / ITEMS_PER_PAGE
  );

  // ==========================================
  // CATEGORY CHANGE
  // ==========================================

  const changeCategory = (category) => {
    setActiveCategory(category);
    setActiveIndex(0);

    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // ==========================================
  // SLIDER SCROLL
  // ==========================================

  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const isMobile = window.innerWidth < 768;
    const pageWidth = slider.clientWidth;

    if (!pageWidth) return;

    const index = Math.round(
      slider.scrollLeft / pageWidth
    );

    setActiveIndex(
      isMobile
        ? index
        : Math.min(index, Math.max(totalPages - 1, 0))
    );
  };

  // ==========================================
  // SLIDER NAVIGATION
  // ==========================================

  const moveSlider = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: direction * slider.clientWidth,
      behavior: "smooth",
    });
  };

  // ==========================================
  // PAGINATION
  // ==========================================

  const pageNumber = (number) =>
    String(number).padStart(2, "0");

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

  const displayedCurrent =
    filteredEvents.length > 0 ? activeIndex + 1 : 0;

  const displayedTotal = isMobile
    ? filteredEvents.length
    : totalPages;

  // ==========================================
  // UI
  // ==========================================

  return (
    <section
      id="events-section"
      className="w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* DYNAMIC CATEGORY FILTERS */}

        {categories.length > 1 && (
          <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => changeCategory(category)}
                className={`shrink-0 rounded-md border border-dashed px-3 py-2 text-[11px] font-semibold transition-all duration-300 sm:text-xs ${
                  activeCategory === category
                    ? "border-[#E87568] bg-[#E87568] text-white"
                    : "border-[#E87568]/50 bg-white text-[#263244] hover:bg-[#FFF2EF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* MAIN LAYOUT */}

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 lg:gap-5">

          {/* EVENTS INTRO */}

          <div className="relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-md bg-gradient-to-br from-[#D52B13] via-[#E33C27] to-[#F0786D] p-5 text-white sm:min-h-[300px] sm:p-6">
            <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="relative z-10">
              <span className="mb-3 block text-[11px] font-medium">
                Events
              </span>

              <p className="max-w-sm text-lg font-medium leading-[1.5] sm:text-xl">
                Explore our latest events, conferences and learning opportunities.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold">
                {events.length} {events.length === 1 ? "Event" : "Events"}
              </span>
            </div>
          </div>

          {/* EVENTS SLIDER */}

          <div className="min-w-0 md:col-span-2">

            {loading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-md bg-slate-50 text-sm text-slate-500">
                Loading events...
              </div>
            ) : error ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-md bg-slate-50 px-5 text-center text-sm text-red-500">
                {error}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div
                ref={sliderRef}
                onScroll={handleScroll}
                className="flex w-full snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth scrollbar-hide md:gap-5"
                style={{
                  scrollBehavior: "smooth",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="w-full shrink-0 snap-start md:w-[calc((100%-1.25rem)/2)]"
                  >
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[260px] items-center justify-center rounded-md bg-[#F7F8FA] px-5 text-center">
                <p className="text-sm text-slate-500">
                  No events available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SLIDER CONTROLS */}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="mt-5 flex items-center justify-between">

            <div className="flex items-center gap-1 text-sm text-[#263244]">
              <span className="font-bold">
                {pageNumber(displayedCurrent)}
              </span>

              <span className="text-slate-400">/</span>

              <span className="text-slate-500">
                {pageNumber(displayedTotal)}
              </span>
            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() => moveSlider(-1)}
                disabled={activeIndex === 0}
                aria-label="Previous events"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E87568]/50 text-[#E87568] transition-all hover:bg-[#FFF2EF] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => moveSlider(1)}
                disabled={
                  activeIndex >=
                  (isMobile
                    ? filteredEvents.length - 1
                    : totalPages - 1)
                }
                aria-label="Next events"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E87568] text-white transition-all hover:bg-[#D94F42] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}