import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ArticleNavigation({
  previousArticle,
  nextArticle,
  basePath = "/publication/article",
}) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Previous */}
      {previousArticle ? (
        <Link
          to={`${basePath}/${previousArticle.slug}`}
          className="group flex min-h-[75px] flex-col justify-center rounded-[4px] border border-[#E87565]/40 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#E87565] hover:bg-[#FFF9F8] hover:shadow-md"
        >
          <div className="mb-2 flex items-center gap-2 text-[16px] text-[#E87565]">
            <ArrowLeft size={12} />
            Previous
          </div>

          <p className="text-[13px] font-medium leading-relaxed text-[#263247]">
            {previousArticle.title}
          </p>
        </Link>
      ) : <div />}

      {/* Next */}
      {nextArticle ? (
        <Link
          to={`${basePath}/${nextArticle.slug}`}
          className="group flex min-h-[75px] flex-col items-start justify-center rounded-[4px] border border-[#E87565]/40 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#E87565] hover:bg-[#FFF9F8] hover:shadow-md sm:items-end sm:text-right"
        >
          <div className="mb-2 flex items-center gap-2 text-[16px] text-[#E87565]">
            Next
            <ArrowRight size={12} />
          </div>

          <p className="text-[13px] font-medium leading-relaxed text-[#263247]">
            {nextArticle.title}
          </p>
        </Link>
      ) : <div />}
    </div>
  );
}