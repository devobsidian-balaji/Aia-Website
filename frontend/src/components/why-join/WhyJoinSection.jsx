
import {
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SVG_NS = "http://www.w3.org/2000/svg";

function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS(SVG_NS, tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });

  return element;
}

export default function WhyJoinSection({
  heading = "Why Join",
  subtitle = "",
  items = [],
  lineColor = "#FF766B",
  className = "",
}) {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const svgRef = useRef(null);

  const visibleItems = useMemo(
    () =>
      [...items]
        .filter((item) => item.isActive !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [items]
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const svg = svgRef.current;

    if (!section || !timeline || !svg) return;

    let resizeObserver;
    let frameId = 0;
    let destroyed = false;
    let connectorAnimations = [];

    const drawConnectors = () => {
      if (destroyed) return;

      // Clean up previous scroll animations before rebuilding the paths.
      connectorAnimations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });

      connectorAnimations = [];
      svg.replaceChildren();

      const rows = Array.from(
        timeline.querySelectorAll("[data-join-row]")
      );

      const bounds = timeline.getBoundingClientRect();

      svg.setAttribute(
        "viewBox",
        `0 0 ${Math.max(1, bounds.width)} ${Math.max(1, bounds.height)}`
      );

      svg.setAttribute("width", bounds.width);
      svg.setAttribute("height", bounds.height);

      // Hide decorative connectors on mobile.
      if (
        window.innerWidth < 768 ||
        rows.length < 2 ||
        bounds.width === 0
      ) {
        return;
      }

      const defs = createSvgElement("defs");
      svg.appendChild(defs);

      const connectors = [];

      rows.slice(0, -1).forEach((row, index) => {
        const nextRow = rows[index + 1];

        const currentImage = row.querySelector("[data-join-image]");
        const nextImage = nextRow.querySelector("[data-join-image]");

        if (!currentImage || !nextImage) return;

        const current = currentImage.getBoundingClientRect();
        const next = nextImage.getBoundingClientRect();

        /*
         * Alternate the curve direction:
         * image 1 -> image 2 -> image 3.
         *
         * The endpoint is near the left edge of the next image,
         * not its center.
         */
        const start = {
          x: current.left - bounds.left + current.width * 0.22,
          y: current.bottom - bounds.top,
        };

        const end = {
          x: next.left - bounds.left - 9,
          y: next.top - bounds.top + 22,
        };

        const verticalGap = Math.max(35, end.y - start.y);

        // Smooth S curve with a gentle horizontal finish.
        const control1 = {
          x: start.x + 12,
          y: start.y + verticalGap * 0.75,
        };

        const control2 = {
          x: end.x - Math.min(105, Math.abs(end.x - start.x) * 0.55),
          y: end.y + verticalGap * 0.2,
        };

        const pathData = [
          `M ${start.x} ${start.y}`,
          `C ${control1.x} ${control1.y}`,
          `${control2.x} ${control2.y}`,
          `${end.x} ${end.y}`,
        ].join(" ");

        const maskId = `why-join-mask-${index}`;

        // Mask used to reveal both line and arrow as the user scrolls.
        const mask = createSvgElement("mask", {
          id: maskId,
          maskUnits: "userSpaceOnUse",
          x: 0,
          y: 0,
          width: bounds.width,
          height: bounds.height,
        });

        const revealPath = createSvgElement("path", {
          d: pathData,
          fill: "none",
          stroke: "white",
          "stroke-width": 5,
          "stroke-linecap": "round",
        });

        mask.appendChild(revealPath);
        defs.appendChild(mask);

        const line = createSvgElement("path", {
          d: pathData,
          fill: "none",
          stroke: lineColor,
          "stroke-width": 1.85,
          "stroke-opacity": 0.9,
          "stroke-dasharray": "3.5 4",
          "stroke-linecap": "round",
          mask: `url(#${maskId})`,
        });

        svg.appendChild(line);

        // Small arrowhead pointing toward the next image's left edge.
        const arrowSize = 3.2;

        const arrow = createSvgElement("path", {
          d: [
            `M ${end.x - arrowSize * 2.3} ${end.y - arrowSize}`,
            `L ${end.x} ${end.y}`,
            `L ${end.x - arrowSize * 2.3} ${end.y + arrowSize}`,
            "Z",
          ].join(" "),
          fill: lineColor,
          opacity: 0.9,
          mask: `url(#${maskId})`,
        });

        svg.appendChild(arrow);

        // Place a subtle circular marker halfway along the curve.
        const temporaryPath = createSvgElement("path", {
          d: pathData,
          fill: "none",
        });

        const length = temporaryPath.getTotalLength();
        const midpoint = temporaryPath.getPointAtLength(length * 0.5);

        const marker = createSvgElement("circle", {
          cx: midpoint.x,
          cy: midpoint.y,
          r: 2.4,
          fill: lineColor,
          opacity: 0.85,
        });

        svg.appendChild(marker);

        gsap.set(revealPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        connectors.push({
          revealPath,
          marker,
          length,
          row,
          nextRow,
        });
      });

      // Reveal each connector progressively during scrolling.
      connectors.forEach(
        ({ revealPath, marker, length, row, nextRow }, index) => {
          const animation = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "bottom 82%",
              endTrigger: nextRow,
              end: "top 65%",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });

          animation.to(revealPath, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
          });

          animation.fromTo(
            marker,
            { opacity: 0.35, scale: 0.75 },
            {
              opacity: 0.85,
              scale: 1,
              duration: 0.25,
              ease: "none",
            },
            0.45
          );

          connectorAnimations.push(animation);
        }
      );

      ScrollTrigger.refresh();
    };

    const scheduleDraw = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(drawConnectors);
    };

    const ctx = gsap.context(() => {
      const images = Array.from(timeline.querySelectorAll("img"));

      const onImageReady = () => scheduleDraw();

      images.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", onImageReady);
          img.addEventListener("error", onImageReady);
        }
      });

      resizeObserver = new ResizeObserver(scheduleDraw);

      resizeObserver.observe(timeline);

      timeline
        .querySelectorAll("[data-join-row], [data-join-image]")
        .forEach((element) => resizeObserver.observe(element));

      window.addEventListener("resize", scheduleDraw);

      scheduleDraw();

      gsap.fromTo(
        timeline.querySelectorAll("[data-join-row]"),
        { opacity: 0.85, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: "power1.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 82%",
            once: true,
          },
        }
      );

      return () => {
        window.removeEventListener("resize", scheduleDraw);

        images.forEach((img) => {
          img.removeEventListener("load", onImageReady);
          img.removeEventListener("error", onImageReady);
        });
      };
    }, section);

    return () => {
      destroyed = true;
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();

      connectorAnimations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });

      ctx.revert();
    };
  }, [visibleItems, lineColor]);

  return (
    <section
      ref={sectionRef}
      className={`overflow-hidden bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center sm:mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1F2937] tracking-tight">
            {heading}
          </h2>

          {subtitle && (
            <p className="text-sm font-normal leading-[1.7] text-gray-600 sm:text-base sm:leading-[1.7] lg:text-lg lg:leading-[1.75] mb-5">
              {subtitle}
            </p>
          )}
        </header>

        <div ref={timelineRef} className="relative">
          <svg
            ref={svgRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible md:block"
          />

          <div className="relative z-10 space-y-10 sm:space-y-12 lg:space-y-14">
            {visibleItems.map((item, index) => {
              const imageFirst = index % 2 === 1;

              return (
                <article
                  key={item._id || item.id || `${item.title}-${index}`}
                  data-join-row
                  className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-8 lg:gap-10"
                >
                  <div
                    className={`flex flex-col justify-center ${
                      imageFirst
                        ? "md:order-2 md:pl-2"
                        : "md:order-1 md:pr-2"
                    }`}
                  >
                    <h2 className="text-4xl sm:text-5xl lg:text-[34px] font-black text-[#1F2937] tracking-tight">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="text-sm sm:text-base text-black/70 leading-relaxed max-w-lg font-normal mt-5">
                        {item.description}
                      </p>
                    )}

                    {item.link && (
                      <a
                        href={item.link}
                        className="w-fit inline-flex items-center justify-center px-6 py-2 rounded-xl border border-[#E37263] bg-white text-[#E37263] hover:bg-[#E37263] hover:text-white font-bold text-xs shadow-xs hover:shadow transition-all duration-200 mt-5"
                      >
                        {item.linkText || "Learn More"}
                      </a>
                    )}
                  </div>

                  <div
                    data-join-image
                    className={`group relative ${
                      imageFirst ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div
                      className="absolute inset-0 translate-x-[3px] translate-y-[3px] rounded-[3px]"
                      style={{ backgroundColor: lineColor }}
                    />

                    {item.imageUrl || item.image ? (
                      <img
                        src={item.imageUrl || item.image}
                        alt={item.imageAlt || item.title}
                        loading="lazy"
                        decoding="async"
                        className="relative z-10 aspect-[1.55/1] w-full rounded-[3px] object-cover"
                      />
                    ) : (
                      <div className="relative z-10 flex aspect-[1.55/1] items-center justify-center rounded-sm bg-slate-100 text-xs text-slate-500">
                        Upload an image in CMS
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
