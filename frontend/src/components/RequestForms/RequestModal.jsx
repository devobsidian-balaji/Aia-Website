
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const requestOptions = [
  {
    id: "membership",
    title: "Membership of AIA",
    path: "/request-form/membership",
  },
  {
    id: "automation",
    title: "Request for Automation Product & Services",
    path: "/request-form/automation",
  },
  {
    id: "partnership",
    title: "Request for Partnership with AIA",
    path: "/request-form/partnership",
  },
];

export default function RequestModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-[3px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Select request type"
        className="relative w-full max-w-[340px] rounded-lg border border-white/10 bg-[#252525] p-5 shadow-2xl sm:p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="absolute right-3 top-3 rounded-full p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X size={17} />
        </button>

        <div className="flex flex-col gap-3 pt-3">
          {requestOptions.map((option, index) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.path)}
              className={`
                min-h-[43px] w-full rounded-md px-3 py-3
                text-center text-[11px] font-medium
                transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-lg
                sm:text-xs
                ${
                  index === 2
                    ? "border border-white bg-gradient-to-r from-[#D72C1D] to-[#F27D70] text-white"
                    : "bg-white text-[#263247] hover:bg-gray-100"
                }
              `}
            >
              {option.title}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-1 text-center text-[10px] text-white/70 transition hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
