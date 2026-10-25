"use client";

import StickyStackCards from "@/components/common/StickyStackCards/StickyStackCards";
import { editorialItems } from "@/data/editorialData";

export default function EditorialSection() {
  return (
    <section className="w-full bg-white">
      {/* <StickyStackCards
        items={editorialItems}
        stickyOffset={0}
        cardHeight="
          min-h-[130px]
          sm:min-h-[145px]
          md:min-h-[155px]
          lg:min-h-[165px]
        "
      /> */}
      <StickyStackCards
        items={editorialItems}
        stickyOffset={0}
        cardHeight="
    min-h-[130px]
    sm:min-h-[145px]
    md:min-h-[155px]
    lg:min-h-[165px]
    xl:min-h-[175px]
  "
        className="bg-[#202B3B]"
      />
    </section>
  );
}
