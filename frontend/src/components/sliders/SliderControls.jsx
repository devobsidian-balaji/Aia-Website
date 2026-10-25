
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SliderControls({
  current = 0,
  total = 0,
  onPrevious,
  onNext,
  accentColor = "#E96F62",
}) {
  if (!total) return null;

  return (
    <div className="mt-5 flex items-center justify-between sm:mt-6 lg:mt-7">
      <div className="flex items-center gap-2 font-sans text-sm">
        <span className="font-medium">
          {String(Math.min(current + 1, total)).padStart(2, "0")}
        </span>
        <span className="text-black/40">/</span>
        <span className="text-black/50">
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Previous slide"
          className="group flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-all duration-300 hover:bg-[#E96F62] active:scale-95 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
          style={{ borderColor: accentColor }}
        >
          <ArrowLeft
            size={18}
            strokeWidth={1.5}
            className="transition-colors group-hover:text-white"
            style={{ color: accentColor }}
          />
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
          style={{ backgroundColor: accentColor }}
        >
          <ArrowRight size={18} strokeWidth={1.5} className="text-white" />
        </button>
      </div>
    </div>
  );
}
