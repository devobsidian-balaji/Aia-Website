import React, { useState } from "react";
import FeatureCard from "./ui/FeatureCard";

export default function ReusableCardGrid({
  title,
  cards = [],
  columns = 3,
  sectionId,
  backgroundImage = "/grid-bg.png",
  showBackground = true,
  readMoreText = "Read More",
  onCardClick,
}) {
  const [selectedCard, setSelectedCard] = useState(
    cards[0]?.id || cards[0]?._id || null
  );

  const handleCardClick = (card) => {
    const id = card.id || card._id;

    setSelectedCard(id);

    if (onCardClick) {
      onCardClick(card);
    }
  };

  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "md:grid-cols-2";

      case 4:
        return "sm:grid-cols-2 lg:grid-cols-4";

      case 3:
      default:
        return "sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (!cards.length) {
    return null;
  }

  return (
    <section
      id={sectionId}
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        py-16

        sm:py-20

        lg:py-24
      "
    >
      {/* ============================================
          BACKGROUND GRID
      ============================================= */}

      {showBackground && backgroundImage && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-repeat
            opacity-40
            [background-size:360px_360px]
          "
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* ============================================
          CONTENT
      ============================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-5

          sm:px-8

          lg:px-12
        "
      >
        {/* ==========================================
            TITLE
        =========================================== */}

        {title && (
          <h2
            className="
              mb-10
              text-center
              font-sans
              text-4xl
              font-black
              leading-tight
              tracking-tight
              text-[#1F2937]

              sm:mb-12
              sm:text-5xl

              lg:mb-16
              lg:text-[54px]
            "
          >
            {title}
          </h2>
        )}

        {/* ==========================================
            CARDS
        =========================================== */}

        <div
          className={`
            mx-auto
            grid
            w-full
            max-w-6xl
            grid-cols-1
            items-stretch
            gap-5

            sm:gap-6

            lg:gap-8

            ${getGridColumns()}
          `}
        >
          {cards.map((card) => {
            const cardId = card.id || card._id;
            const isSelected = selectedCard === cardId;

            return (
                <FeatureCard
                key={card._id}
                title={card.title}
                description={card.description}
                image={card.imageUrl}
                imageAlt={card.imageAlt || card.title}
              />
              // <article
              //   key={cardId}
              //   onClick={() => handleCardClick(card)}
              //   className={`
              //     group
              //     relative
              //     flex
              //     min-w-0
              //     cursor-pointer
              //     flex-col
              //     overflow-hidden
              //     rounded-2xl
              //     border
              //     border-red-100/70
              //     bg-white
              //     shadow-sm

              //     transition-all
              //     duration-500
              //     ease-out

              //     hover:-translate-y-2
              //     hover:shadow-2xl

              //     ${
              //       isSelected
              //         ? "ring-2 ring-[#E37263]/50 shadow-xl"
              //         : ""
              //     }
              //   `}
              // >
                
              //   {/* ==================================
              //       IMAGE
              //   =================================== */}

              //   {card.image && (
              //     <div
              //       className="
              //         relative
              //         h-[210px]
              //         w-full
              //         overflow-hidden
              //         bg-slate-100

              //         sm:h-[220px]

              //         lg:h-[230px]
              //       "
              //     >
              //       <img
              //         src={card.image}
              //         alt={card.title || "Card image"}
              //         loading="lazy"
              //         decoding="async"
              //         draggable="false"
              //         className="
              //           block
              //           h-full
              //           w-full
              //           object-cover

              //           transition-transform
              //           duration-700
              //           ease-out

              //           group-hover:scale-[1.04]
              //         "
              //       />
              //     </div>
              //   )}

              //   {/* ==================================
              //       CONTENT
              //   =================================== */}

              //   <div
              //     className="
              //       flex
              //       flex-1
              //       flex-col
              //       p-5

              //       sm:p-6
              //     "
              //   >
              //     {/* Title */}

              //     <h3
              //       className="
              //         font-sans
              //         text-lg
              //         font-extrabold
              //         leading-snug
              //         text-[#1F2937]

              //         sm:text-xl
              //       "
              //     >
              //       {card.title}

              //       {card.subtitle && (
              //         <>
              //           {" "}
              //           {card.subtitle}
              //         </>
              //       )}
              //     </h3>

              //     {/* Description */}

              //     {card.description && (
              //       <p
              //         className="
              //           mt-3
              //           text-xs
              //           leading-relaxed
              //           text-black/70

              //           sm:text-sm
              //         "
              //       >
              //         {card.description}
              //       </p>
              //     )}

              //     {/* Read More */}

              //     {card.readMore !== false && (
              //       <div className="mt-auto pt-6">
              //         <button
              //           type="button"
              //           onClick={(event) => {
              //             event.stopPropagation();
              //             handleCardClick(card);
              //           }}
              //           className="
              //             w-fit
              //             text-[10px]
              //             font-medium
              //             text-[#E37263]
              //             underline
              //             underline-offset-2

              //             transition-opacity
              //             duration-300

              //             hover:opacity-60

              //             sm:text-[11px]
              //           "
              //         >
              //           {card.readMoreText || readMoreText}
              //         </button>
              //       </div>
              //     )}
              //   </div>

              //   {/* ==================================
              //       ACTIVE BOTTOM LINE
              //   =================================== */}

              //   <div
              //     className={`
              //       absolute
              //       bottom-0
              //       left-6
              //       right-6
              //       h-1.5
              //       rounded-full
              //       bg-[#E37263]

              //       transition-all
              //       duration-500

              //       ${
              //         isSelected
              //           ? "translate-y-0 opacity-100"
              //           : "translate-y-2 opacity-0"
              //       }
              //     `}
              //   />
              // </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}