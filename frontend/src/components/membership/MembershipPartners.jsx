
import React from "react";

export default function MembershipPartners({ partners = [] }) {
  if (!partners.length) return null;

  return (
    <div className="rounded-lg border border-[#F2D5D1] bg-white p-4">
      <h3 className="mb-3 text-xs font-bold text-[#E87565]">
        Contributing Partners
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {partners.map((partner) => (
          <div
            key={partner.id || partner.name}
            className="flex h-auto w-auto items-center justify-center rounded border border-gray-100 bg-white shadow-lg"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
