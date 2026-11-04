import React from "react";
import ArticleCard from "../../ArticleCard";

export default function NewsCardGrid({
  items = [],
  columns = 4,
  className = "",
}) {
  if (!items.length) return null;

  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section
      className={`bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 ${className}`}
    >
      <div
        className={`mx-auto grid max-w-[1250px] ${
          columnClasses[columns] || columnClasses[4]
        } gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:gap-x-7`}
      >
        {items.map((item, index) => (
          <ArticleCard
            key={item._id || index}
            image={item.image}
            imageAlt={item.imageAlt}
            title={item.title}
            category={item.category}
            categoryLink={item.categoryLink}
            slug={item.slug}
            detailBasePath="/publication/news"
          />
        ))}
      </div>
    </section>
  );
}
