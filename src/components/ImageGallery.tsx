import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import heroRender from "@/assets/hero-render.jpg";
import interiorSeminar from "@/assets/interior-seminar.jpg";
import detailArchitecture from "@/assets/detail-architecture.jpg";
import communityLife from "@/assets/community-life.jpg";
import interiorPrayer from "@/assets/interior-prayer.jpg";
import atmosphereEvening from "@/assets/atmosphere-evening.jpg";

const images = [
  { src: heroRender, alt: "Außenansicht — Architekturvisualisierung", span: "col-span-2 row-span-2" },
  { src: detailArchitecture, alt: "Architektonisches Detail", span: "col-span-1 row-span-1" },
  { src: communityLife, alt: "Gemeinschaftsleben", span: "col-span-1 row-span-1" },
  { src: interiorSeminar, alt: "Seminarraum — Innenansicht", span: "col-span-1 row-span-2" },
  { src: interiorPrayer, alt: "Gebetsraum — Innenansicht", span: "col-span-1 row-span-1" },
  { src: atmosphereEvening, alt: "Abendstimmung — Außenansicht", span: "col-span-1 row-span-1" },
];

const ImageGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.05 });

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % images.length : null));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal mb-10">
          <p className="section-label mb-4">— Impressionen</p>
          <h2 className="heading-md text-foreground">Einblicke in das Projekt</h2>
        </div>

        <div
          ref={gridRef}
          className="reveal grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[140px] md:auto-rows-[200px]"
        >
          {images.map((image, i) => (
            <div
              key={i}
              onClick={() => open(i)}
              className={`${image.span} rounded-xl overflow-hidden group relative cursor-pointer`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/25 transition-colors duration-300" />
              {/* Hover label */}
              <span className="absolute bottom-3 left-3 font-body text-[10px] tracking-wider uppercase text-white/0 group-hover:text-white/80 transition-colors duration-300">
                {image.alt}
              </span>
              {/* Expand icon */}
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                <svg className="w-3.5 h-3.5 text-white/0 group-hover:text-white transition-colors duration-300" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative max-w-5xl w-full max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="w-full h-full object-contain max-h-[80vh] rounded-lg"
            />
            {/* Caption */}
            <p className="mt-3 font-body text-xs text-center tracking-wider uppercase text-white/40">
              {images[lightbox].alt}
            </p>
          </div>

          {/* Controls */}
          <button
            onClick={close}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Counter */}
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-[11px] tracking-wider text-white/30">
            {lightbox + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
