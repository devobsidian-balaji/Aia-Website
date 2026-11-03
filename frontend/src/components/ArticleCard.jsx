
import React from "react";
import { Link } from "react-router-dom";

export default function ArticleCard({
  image,
  imageAlt = "",
  title,
  category,
  categoryLink,
  slug,
  link,
  className = "",
}) {
  const content = (
    <article
      className={`group flex h-full min-w-0 flex-col bg-white font-sans ${className}`}
    >
      {/* Image */}
      <div className="aspect-[1.15/1] w-full overflow-hidden border border-[#DCDCDC] bg-gray-100 p-1">
        <div className="h-full w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt || title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-2.5 text-[11px] font-medium leading-[1.5] text-[#172337] transition-colors duration-300 group-hover:text-[#E87565] sm:text-sm">
        {title}
      </h3>

      {/* Category */}
      {category && (
        <div className="mt-3">
          {categoryLink ? (
            <a
              href={categoryLink}
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] text-gray-500 underline decoration-gray-400 underline-offset-2 transition-colors hover:text-[#E87565]"
            >
              {category}
            </a>
          ) : (
            <span className="text-[11px] text-gray-500 underline decoration-gray-400 underline-offset-2">
              {category}
            </span>
          )}
        </div>
      )}
    </article>
  );

  const destination = link || (slug ? `/publication/${slug}` : "");

  return destination ? (
   <Link
    to={`/publication/${slug}`}
    className="block h-full"
    aria-label={`Read ${title}`}
  >
    {content}
  </Link>
  ) : (
    content
  );
}
