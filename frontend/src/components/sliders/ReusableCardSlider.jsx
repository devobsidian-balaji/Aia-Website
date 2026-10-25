
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SliderIntroCard from "./SliderIntroCard";
import SliderContentCard from "./SliderContentCard";
import SliderControls from "./SliderControls";

export default function ReusableCardSlider({
  slides = [],
  visibleSlides = 3,
  introColor = "bg-[#E52B18]",
  accentColor = "#E96F62",
  backgroundColor = "bg-white",
  className = "",
  showControls = true,
}) {
  const desktopTrackRef = useRef(null);
  const mobileTrackRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [desktopCardWidth, setDesktopCardWidth] = useState(0);

  const introSlide = slides.find((slide) => slide.type === "intro");

  const contentSlides = useMemo(
    () => slides.filter((slide) => slide.type !== "intro"),
    [slides]
  );

  const total = contentSlides.length;

  // visibleSlides includes the intro column, matching the original API.
  const desktopVisible = Math.max(1, visibleSlides - (introSlide ? 1 : 0));
  const maxDesktopIndex = Math.max(0, total - desktopVisible);
  const desktopGap = 8;
  const mobileGap = 16;

  const slidesKey = slides
    .map((slide) => `${slide.id || slide.title}:${slide.image || ""}`)
    .join("|");

  const measureDesktopCard = useCallback(() => {
    const firstCard = desktopTrackRef.current?.firstElementChild;
    setDesktopCardWidth(firstCard?.getBoundingClientRect().width || 0);
  }, []);

  useEffect(() => {
    measureDesktopCard();

    const track = desktopTrackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(measureDesktopCard);
    observer.observe(track);

    return () => observer.disconnect();
  }, [measureDesktopCard, desktopVisible, total]);

  useEffect(() => {
    setCurrent(0);

    if (mobileTrackRef.current) {
      mobileTrackRef.current.scrollTo({ left: 0, behavior: "auto" });
    }
  }, [slidesKey]);

  const desktopNext = () => {
    setCurrent((previous) =>
      previous >= maxDesktopIndex ? 0 : previous + 1
    );
  };

  const desktopPrevious = () => {
    setCurrent((previous) =>
      previous <= 0 ? maxDesktopIndex : previous - 1
    );
  };

  const handleMobileScroll = () => {
    const track = mobileTrackRef.current;
    const firstCard = track?.firstElementChild;

    if (!track || !firstCard) return;

    const step = firstCard.getBoundingClientRect().width + mobileGap;
    if (!step) return;

    const index = Math.round(track.scrollLeft / step);
    setCurrent(Math.min(Math.max(index, 0), total - 1));
  };

  const mobileGoTo = (index) => {
    const track = mobileTrackRef.current;
    const card = track?.children[index];

    if (!track || !card) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });

    setCurrent(index);
  };

  const handlePrevious = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      mobileGoTo(current <= 0 ? total - 1 : current - 1);
    } else {
      desktopPrevious();
    }
  };

  const handleNext = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      mobileGoTo(current >= total - 1 ? 0 : current + 1);
    } else {
      desktopNext();
    }
  };

  if (!slides.length) return null;

  return (
    <section
      className={`w-full overflow-hidden ${backgroundColor} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Desktop and tablet */}
        <div
          className={`hidden md:grid md:gap-2 lg:gap-3 ${
            introSlide
              ? "md:grid-cols-[0.9fr_2fr]"
              : "md:grid-cols-1"
          }`}
        >
          {introSlide && (
            <SliderIntroCard
              eyebrow={introSlide.eyebrow}
              title={introSlide.title}
              color={introSlide.color || introColor}
            />
          )}

          <div className="min-w-0 overflow-hidden">
            <div
              ref={desktopTrackRef}
              className="flex w-full gap-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={{
                transform: `translate3d(-${
                  current * (desktopCardWidth + desktopGap)
                }px, 0, 0)`,
              }}
            >
              {contentSlides.map((slide, index) => (
                <div
                  key={slide.id || `${slide.title}-${index}`}
                  className="min-w-0 shrink-0"
                  style={{
                    width: `calc((100% - ${
                      desktopGap * (desktopVisible - 1)
                    }px) / ${desktopVisible})`,
                  }}
                >
                  <SliderContentCard
                    image={slide.image || slide.imageUrl}
                    imageAlt={slide.imageAlt}
                    title={slide.title}
                    description={slide.description}
                    link={slide.link}
                    linkText={slide.linkText}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          {introSlide && (
            <SliderIntroCard
              eyebrow={introSlide.eyebrow}
              title={introSlide.title}
              color={introSlide.color || introColor}
              mobile
            />
          )}

          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {contentSlides.map((slide, index) => (
              <div
                key={slide.id || `${slide.title}-${index}`}
                className="w-[calc(100vw-32px)] max-w-[500px] shrink-0 snap-center"
              >
                <SliderContentCard
                  image={slide.image || slide.imageUrl}
                  imageAlt={slide.imageAlt}
                  title={slide.title}
                  description={slide.description}
                  link={slide.link}
                  linkText={slide.linkText}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {showControls && total > 0 && (
          <SliderControls
            current={current}
            total={total}
            onPrevious={handlePrevious}
            onNext={handleNext}
            accentColor={accentColor}
          />
        )}
      </div>
    </section>
  );
}
