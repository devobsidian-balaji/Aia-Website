
export default function FeatureCard({
  image,
  imageAlt = "",
  title,
  description,
}) {
  return (
    <article className="group relative flex h-full flex-col rounded-[5px] border border-rose-100 bg-white p-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-rose-200 hover:shadow-[0_10px_30px_rgba(190,24,60,0.07)]">
      <div className="overflow-hidden rounded-[3px] bg-slate-100">
        <img
          src={image}
          alt={imageAlt || title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col px-0 pb-4 pt-3">
        <h3 className="text-[17px] font-semibold leading-snug text-slate-800">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-black/70 leading-relaxed max-w-lg font-normal">
          {description}
        </p>
      </div>

      {/* Red accent appears on hover */}
      <span
        aria-hidden="true"
        className="absolute -bottom-[4px] left-1/2 h-[4px] w-0 -translate-x-1/2 rounded-full bg-[#ef6b61] transition-[width] duration-300 ease-out group-hover:w-[76%]"
      />
    </article>
  );
}
