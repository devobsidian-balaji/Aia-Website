
import React, { useEffect, useState } from "react";
import { getCouncilMembers } from "../services/api";
import { RefreshCw } from "lucide-react";

function MemberSkeleton() {
  return (
    <div className="flex animate-pulse flex-col space-y-3">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100 bg-gray-100 p-1.5">
        <div className="h-full w-full rounded-xl bg-gray-200" />
      </div>

      <div className="space-y-2 pt-1">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/3 rounded bg-gray-200" />
        <div className="h-3 w-4/5 rounded bg-gray-100" />
        <div className="h-3 w-2/3 rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default function CurrentExecutiveCouncil() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCouncilMembers();

      // Only API data will be displayed
      const activeMembers = Array.isArray(data)
        ? data.filter((member) => member.isActive !== false)
        : [];

      setMembers(activeMembers);
    } catch (err) {
      console.error("Council Members API Error:", err);
      setError(
        err.message || "Unable to load council members. Please try again."
      );
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <section
      id="executive-council"
      className="relative bg-white py-16 font-sans text-left sm:py-20 lg:py-24"
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
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">

          {/* LEFT STICKY CONTENT */}
          <div className="lg:col-span-3 lg:self-stretch">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <h2 className="text-4xl font-black leading-[1.15] tracking-tight text-[#1F2937] sm:text-5xl lg:text-[46px]">
                Current
                <br />
                Executive
                <br />
                Council
              </h2>
            </div>
          </div>

          {/* RIGHT MEMBERS SECTION */}
          <div className="lg:col-span-9">

            {/* Loading Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <MemberSkeleton key={index} />
                ))}
              </div>
            )}

            {/* API Error */}
            {!loading && error && (
              <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 px-5 text-center">
                <p className="text-sm font-medium text-red-600">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchMembers}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#E37263] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d65d50]"
                >
                  <RefreshCw size={15} />
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && members.length === 0 && (
              <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 text-center">
                <h3 className="text-lg font-bold text-[#1F2937]">
                  No Council Members Available
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Council member information will appear here once published.
                </p>
              </div>
            )}

            {/* Actual API Members */}
            {!loading && !error && members.length > 0 && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

                {members.map((member, index) => (
                  <div
                    key={member._id || index}
                    className="group flex flex-col space-y-3"
                  >
                    {/* Member Image */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#E37263]/70 bg-white p-1.5 shadow-sm transition-all duration-300 group-hover:shadow-xl">
                      <div className="h-full w-full overflow-hidden rounded-xl bg-slate-100">
                        <img
                          src={member.imageUrl}
                          alt={member.name || "Council Member"}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full select-none object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Member Details */}
                    <div className="space-y-1 pt-1">
                      <h3 className="text-base font-black tracking-tight text-[#1F2937] transition-colors duration-300 group-hover:text-[#E37263] sm:text-lg">
                        {member.name}
                      </h3>

                      {member.role && (
                        <div className="text-xs font-bold text-[#E37263]">
                          {member.role}
                        </div>
                      )}

                      <div className="space-y-0.5 pt-0.5 text-[11px] leading-snug text-gray-600 sm:text-xs">
                        {member.fullRole && (
                          <p className="font-normal text-gray-700">
                            {member.fullRole}
                          </p>
                        )}

                        {member.companyName && (
                          <p className="font-normal text-gray-500">
                            {member.companyName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
