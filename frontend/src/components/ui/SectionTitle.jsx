export default function SectionTitle({
  title,
  description,
  className = "",
}) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <h2
        id="what-aia-heading"
        className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight"
      >
        {title}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-black/70 leading-relaxed font-normal mt-5">
          {description}
        </p>
      )}
    </div>
  );
}