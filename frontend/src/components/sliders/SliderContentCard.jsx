
// export default function SliderContentCard({
//   image,
//   imageAlt,
//   title,
//   description,
//   link,
//   linkText = "Read More",
// }) {
//   return (
//     <article className="group flex h-full min-h-[315px] w-full flex-col overflow-hidden rounded-[5px] sm:min-h-[350px] lg:min-h-[420px] xl:min-h-[450px]">
//       <div className="shrink-0 overflow-hidden">
//         {image ? (
//           <img
//             src={image}
//             alt={imageAlt || title || "Card image"}
//             loading="lazy"
//             decoding="async"
//             draggable="false"
//             className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-xs text-black/40">
//             No image available
//           </div>
//         )}
//       </div>

//       <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 lg:px-7 lg:pb-7 lg:pt-6 xl:px-8">
//         <h3 className="text-xl font-semibold leading-tight tracking-tight text-[#17202B] sm:text-[22px] lg:text-2xl">
//           {title}
//         </h3>

//         {description && (
//           <p className="mt-4 max-w-[390px] text-sm leading-relaxed text-[#17202B] sm:mt-5 sm:text-[13px] lg:mt-6">
//             {description}
//           </p>
//         )}

//         {link && (
//           <a
//             href={link}
//             className="mt-auto w-fit pt-5 text-[11px] font-medium text-[#E96F62] underline underline-offset-2 transition-opacity hover:opacity-60"
//           >
//             {linkText}
//           </a>
//         )}
//       </div>
//     </article>
//   );
// }




export default function SliderContentCard({
  image,
  imageAlt,
  title,
  description,
  link,
  linkText = "Read More",
}) {
  const hasTitle =
    typeof title === "string" && title.trim().length > 0;

  const hasDescription =
    typeof description === "string" &&
    description.trim().length > 0;

  const hasLink =
    typeof link === "string" && link.trim().length > 0;

  const hasTextContent =
    hasTitle || hasDescription || hasLink;

  return (
    <article className="group h-full w-full overflow-hidden">

      {/* Image */}
      {image ? (
        <div className="w-full overflow-hidden aspect-[16/9] rounded-[5px]">
          <img
            src={image}
            alt={imageAlt || title || "Card image"}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex min-h-[200px] w-full items-center justify-center bg-gray-100 text-xs text-black/40">
          No image available
        </div>
      )}

      {/* Text content only when data exists */}
      {hasTextContent && (
        <div className="flex flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 lg:px-7 lg:pb-7 lg:pt-6 xl:px-8">

          {hasTitle && (
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-[#17202B] sm:text-[22px] lg:text-2xl">
              {title}
            </h3>
          )}

          {hasDescription && (
            <p className="mt-4 max-w-[390px] text-sm leading-relaxed text-[#17202B] sm:mt-5 sm:text-[13px] lg:mt-6">
              {description}
            </p>
          )}

          {hasLink && (
            <a
              href={link}
              className="mt-auto w-fit pt-5 text-[11px] font-medium text-[#E96F62] underline underline-offset-2 transition-opacity hover:opacity-60"
            >
              {linkText}
            </a>
          )}

        </div>
      )}
    </article>
  );
}
