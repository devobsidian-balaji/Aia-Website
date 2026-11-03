
import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function MemberCard({ member }) {
  return (
    <a
      href={`/membership/member-directory/${member.slug}`}
      className="group block min-w-0"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#E87565] group-hover:shadow-lg sm:p-7">
        <img
          src={member.logo}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-xs font-bold leading-relaxed text-[#243247] transition-colors group-hover:text-[#E87565] sm:text-sm">
            {member.name}
          </h3>

          <p className="mt-1 text-[10px] leading-relaxed text-gray-500 sm:text-[11px]">
            {member.category}
          </p>
        </div>

        <ArrowUpRight
          size={16}
          className="mt-1 shrink-0 text-gray-400 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#E87565]"
        />
      </div>
    </a>
  );
}
