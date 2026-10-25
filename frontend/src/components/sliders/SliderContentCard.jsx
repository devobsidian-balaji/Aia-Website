
export default function SliderContentCard({
  image,
  imageAlt,
  title,
  description,
  link,
  linkText = "Read More",
}) {
  return (
    <article className="group flex h-full min-h-[315px] w-full flex-col overflow-hidden rounded-[5px] sm:min-h-[350px] lg:min-h-[420px] xl:min-h-[450px]">
      <div className="shrink-0 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={imageAlt || title || "Card image"}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-black/40">
            No image available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 lg:px-7 lg:pb-7 lg:pt-6 xl:px-8">
        <h3 className="text-xl font-semibold leading-tight tracking-tight text-[#17202B] sm:text-[22px] lg:text-2xl">
          {title}
        </h3>

        {description && (
          <p className="mt-4 max-w-[390px] text-sm leading-relaxed text-[#17202B] sm:mt-5 sm:text-[13px] lg:mt-6">
            {description}
          </p>
        )}

        {link && (
          <a
            href={link}
            className="mt-auto w-fit pt-5 text-[11px] font-medium text-[#E96F62] underline underline-offset-2 transition-opacity hover:opacity-60"
          >
            {linkText}
          </a>
        )}
      </div>
    </article>
  );
}
