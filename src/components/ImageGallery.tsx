import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const images = [
  { src: "/img/ditib-ahlen-kulturzentrum-aussenansicht-west.jpg", alt: "Westansicht des geplanten DITIB Kulturzentrums in Ahlen", span: "col-span-2 row-span-2" },
  { src: "/img/ditib-ahlen-kulturzentrum-grundriss-erdgeschoss.jpg", alt: "Grundriss des Erdgeschosses des DITIB Kulturzentrums in Ahlen", span: "col-span-1 row-span-1" },
  { src: "/img/ditib-ahlen-kulturzentrum-grundriss-obergeschoss.jpg", alt: "Grundriss des Obergeschosses des DITIB Kulturzentrums in Ahlen", span: "col-span-1 row-span-1" },
  { src: "/img/ditib-ahlen-kulturzentrum-grundriss-kellergeschoss.jpg", alt: "Grundriss des Kellergeschosses des DITIB Kulturzentrums in Ahlen", span: "col-span-1 row-span-1" },
  { src: "/img/ditib-ahlen-kulturzentrum-freiflaechenplan.jpg", alt: "Freiflächenplan des DITIB Kulturzentrums in Ahlen", span: "col-span-1 row-span-1" },
  { src: "/img/ditib-ahlen-kulturzentrum-gebaeudeschnitt.jpg", alt: "Gebäudeschnitt des DITIB Kulturzentrums in Ahlen", span: "col-span-1 row-span-1" },
];

const ImageGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.04 });

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
    <section className="py-16 md:py-24" style={{ backgroundColor: "#253e54" }}>
      {/* Header */}
      <div ref={headerRef} className="reveal px-5 md:px-10 mb-10">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>— Impressionen</p>
          <h2 className="heading-md text-white">Einblicke in das Projekt</h2>
        </div>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="reveal reveal-delay-1 px-4 md:px-6 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[140px] md:auto-rows-[220px]"
      >
        {images.map((image, i) => (
          <div
            key={i}
            onClick={() => open(i)}
            className={`${image.span} rounded-xl overflow-hidden group relative cursor-pointer border-2 border-white/10 hover:border-white/50 transition-all duration-300 hover:scale-[1.01] shadow-md hover:shadow-xl`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={close}
        >
          <div
            className="relative max-w-5xl w-full max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              className="w-full h-full object-contain max-h-[80vh] rounded-lg"
            />
          </div>
          <button onClick={close} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-[11px] tracking-wider text-white/30">
            {lightbox + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
