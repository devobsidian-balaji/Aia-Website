
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getPastPresidents } from "../services/api";

// Skeleton Card
function PresidentSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-center space-y-5">
      <div className="h-52 w-52 rounded-full border-2 border-gray-100 bg-gray-200 p-2 sm:h-60 sm:w-60">
        <div className="h-full w-full rounded-full bg-gray-300" />
      </div>

      <div className="w-full space-y-3 text-center">
        <div className="mx-auto h-6 w-3/4 rounded bg-gray-200" />
        <div className="mx-auto h-3 w-1/2 rounded bg-gray-200" />
      </div>

      <div className="w-full max-w-[190px] space-y-2">
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="mx-auto h-3 w-2/3 rounded bg-gray-100" />
      </div>

      <div className="h-3 w-20 rounded bg-gray-200" />
    </div>
  );
}

export default function PastPresidents() {
  const location = useLocation();

  // Detect current page automatically
  const isAllPresidentsPage =
    location.pathname.replace(/\/+$/, "") === "/about/past-presidents";

  const [presidents, setPresidents] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedBio, setSelectedBio] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 3;

  // Fetch Past Presidents from API
  const fetchPresidents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPastPresidents();

      const activePresidents = Array.isArray(data)
        ? data.filter((president) => president.isActive !== false)
        : [];

      setPresidents(activePresidents);
      setStartIndex(0);
      setSelectedBio(null);
    } catch (err) {
      console.error("Past Presidents API Error:", err);

      setPresidents([]);
      setError(
        err.message ||
          "Unable to load past presidents. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresidents();
  }, []);

  // Carousel Navigation (About page only)
  const canPrev = startIndex > 0;

  const canNext =
    startIndex + itemsPerPage < presidents.length;

  const handlePrev = () => {
    if (canPrev) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canNext) {
      setStartIndex((prev) =>
        Math.min(presidents.length - itemsPerPage, prev + 1)
      );
    }
  };

  // About page: 3 members at a time
  // Past Presidents page: All members
  const visiblePresidents = isAllPresidentsPage
    ? presidents
    : presidents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section
      id="past-presidents"
      className="relative overflow-hidden bg-white py-16 font-sans text-center sm:py-20 lg:py-24"
    >
      {/* Background Micro-Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-repeat opacity-40"
        style={{
          backgroundImage: "url('/grid-bg.png')",
          backgroundSize: "360px 360px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="relative mx-auto mb-12 flex max-w-6xl flex-col items-center justify-between gap-5 sm:mb-16 sm:flex-row">

          {/* Spacer for centered heading on About page */}
          <div className="hidden w-28 sm:block" />

          <h2 className="text-3xl font-black tracking-tight text-[#1F2937] sm:text-4xl lg:text-[54px] font-semibold">
            AIA Past Presidents
          </h2>

          {/* Previous / Next buttons only on About page */}
          {!isAllPresidentsPage && (
            <div className="flex items-center gap-3 sm:w-28 sm:justify-end">

              <button
                type="button"
                onClick={handlePrev}
                disabled={!canPrev || loading}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-[#E37263] transition-all ${
                  canPrev && !loading
                    ? "cursor-pointer text-[#E37263] hover:bg-[#E37263] hover:text-white active:scale-95"
                    : "cursor-not-allowed border-[#E37263]/40 text-[#E37263]/40"
                }`}
                aria-label="Previous Presidents"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canNext || loading}
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#E37263] text-white shadow-md transition-all ${
                  canNext && !loading
                    ? "cursor-pointer hover:bg-[#d0594a] active:scale-95"
                    : "cursor-not-allowed opacity-40"
                }`}
                aria-label="Next Presidents"
              >
                <ArrowRight size={16} />
              </button>

            </div>
          )}

          {/* Spacer for all presidents page */}
          {isAllPresidentsPage && (
            <div className="hidden w-28 sm:block" />
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {Array.from({ length: isAllPresidentsPage ? 6 : 3 }).map(
              (_, index) => (
                <PresidentSkeleton key={index} />
              )
            )}
          </div>
        )}

        {/* API Error */}
        {!loading && error && (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 px-5">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchPresidents}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#E37263] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d0594a]"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && presidents.length === 0 && (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5">
            <h3 className="text-lg font-bold text-[#1F2937]">
              No Past Presidents Available
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
              Past President information will appear here once published.
            </p>
          </div>
        )}

        {/* Presidents Grid */}
        {!loading && !error && presidents.length > 0 && (
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

            {visiblePresidents.map((president, idx) => (
              <div
                key={president._id || idx}
                className="group flex flex-col items-center space-y-5 text-center"
              >
                {/* Circular Portrait */}
                <div className="relative h-52 w-52 rounded-full border-2 border-[#E37263] bg-white p-2 shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-60 sm:w-60">
                  <div className="h-full w-full overflow-hidden rounded-full bg-gray-100">
                    <img
                      src={president.imageUrl}
                      alt={president.name || "Past President"}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full select-none object-cover"
                    />
                  </div>
                </div>

                {/* Name and Term */}
                <div className="space-y-1">
                  <h3 className="text-xl font-black tracking-tight text-[#1F2937] sm:text-2xl font-semibold">
                    {president.name}
                  </h3>

                  {president.term && (
                    <div className="text-xs font-bold text-[#E37263] sm:text-sm">
                      ({president.term})
                    </div>
                  )}
                </div>

                {/* Description */}
                {president.description && (
                  <p className="mx-auto w-full max-w-[350px] break-words text-center text-[15px] font-normal leading-[1.6] text-[#253044] sm:text-[16px]">
                    {president.description}
                  </p>
                )}

                {/* Read More */}
                {/* <button
                  type="button"
                  onClick={() => setSelectedBio(president)}
                  className="text-xs font-bold text-[#E37263] underline underline-offset-4 transition-colors hover:text-[#d0594a]"
                >
                  Read More
                </button> */}
              </div>
            ))}

          </div>
        )}

        {/* View All button only on About page */}
        {!isAllPresidentsPage &&
          !loading &&
          !error &&
          presidents.length > 3 && (
            <div className="mt-12 text-center">
              <Link
                to="/about/past-presidents"
                className="inline-flex items-center gap-2 rounded-full bg-[#E37263] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#d0594a] hover:shadow-lg"
              >
                View All Past Presidents
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
      </div>

      {/* Bio Modal */}
      {selectedBio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedBio(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg space-y-4 rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-2xl sm:p-8"
          >
            {/* Profile Image */}
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#E37263] shadow-md">
              <img
                src={selectedBio.imageUrl}
                alt={selectedBio.name || "Past President"}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Name */}
            <div>
              <h3 className="text-2xl font-black text-[#1F2937]">
                {selectedBio.name}
              </h3>

              {selectedBio.term && (
                <p className="text-sm font-bold text-[#E37263]">
                  ({selectedBio.term})
                </p>
              )}
            </div>

            {/* Full Description */}
            <p className="break-words text-left text-sm leading-relaxed text-gray-700">
              {selectedBio.description ||
                "No additional information available."}
            </p>

            {/* Close */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedBio(null)}
                className="rounded-xl bg-[#E37263] px-6 py-2.5 text-xs font-bold text-white shadow transition hover:bg-[#d0594a]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
