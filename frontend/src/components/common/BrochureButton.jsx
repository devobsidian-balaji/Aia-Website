
import React from "react";
import { Download } from "lucide-react";

export default function BrochureButton({
  href,
  label = "Download Brochure",
  fileName,
  className = "",
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      download={fileName || undefined}
      target={fileName ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-md bg-[#E52B18] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#C92313] active:scale-95 ${className}`}
    >
      {label}
      <Download
        size={17}
        className="transition-transform duration-300 group-hover:translate-y-0.5"
      />
    </a>
  );
}
