
import React from "react";
import { ExternalLink } from "lucide-react";

export default function ViewSampleButton({
  href,
  label = "View Sample",
  className = "",
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-md border border-[#E52B18] bg-transparent px-5 py-3 text-sm font-semibold text-[#E52B18] transition-all duration-300 hover:bg-[#E52B18] hover:text-white active:scale-95 ${className}`}
    >
      {label}
      <ExternalLink
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </a>
  );
}
