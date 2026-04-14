import { useEffect, useRef, useState } from "react";

const thumbnails = [
  {
    src: "/img/ditib-ahlen-kulturzentrum-aussenansicht-west.jpg",
    alt: "Westansicht des geplanten DITIB Kulturzentrums in Ahlen",
    label: "Außenansicht",
  },
  {
    src: "/img/ditib-ahlen-kulturzentrum-fassadenansicht.jpg",
    alt: "Fassadenansicht des DITIB Kulturzentrums in Ahlen",
    label: "Ansicht",
  },
];

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden -mb-px"
      style={{ backgroundColor: "hsl(220, 20%, 12%)" }}
    >
      {/* Background image with parallax + zoom-in entrance */}
      <div
        className="absolute inset-0 animate-hero-zoom"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      >
        <img
          src="/img/ditib-ahlen-kulturzentrum-hero-visualisierung.webp"
          alt="Architekturvisualisierung des neuen DITIB Kulturzentrums in Ahlen"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </div>

      {/* Gradient overlay — subtle, only bottom area for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 30%, hsla(220, 20%, 8%, 0.45) 65%, hsla(220, 20%, 8%, 0.88) 100%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col justify-end px-6 pb-[32px] md:px-12 md:pb-[114px] lg:px-16">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">

          {/* Left — text block */}
          <div
            className="max-w-2xl"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          >
            <p className="animate-hero-slide-up delay-400 font-body text-sm md:text-base font-medium tracking-widest uppercase text-white/70 mb-3">
              DiTiB Ahlen · Ein Zukunftsprojekt
            </p>

            <h1 className="animate-hero-slide-up delay-600 font-body text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-3 drop-shadow-lg">
              Bildungs- &amp; Begegnungszentrum
              <br />
              <span className="font-light italic">für Ahlen</span>
            </h1>

            <p className="animate-hero-slide-up delay-800 font-body text-lg md:text-xl lg:text-2xl font-light text-white/90 mb-8 drop-shadow-sm">
              Zusammenhalt <span className="font-semibold italic">stärken</span>.
              {" "}Ahlen gestalten.
            </p>

            {/* CTAs */}
            <div className="animate-hero-fade-scale delay-1000 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#spenden"
                className="group font-body inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:bg-primary/90"
              >
                Jetzt unterstützen
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#projekt"
                className="font-body inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-white/60 hover:bg-white/10"
              >
                Mehr erfahren
              </a>
            </div>
          </div>

          {/* Right — thumbnail strip (hidden on mobile) */}
          <div className="hidden md:flex animate-hero-fade-scale delay-1200 flex-col items-end gap-4 shrink-0">
            <div className="flex flex-row lg:flex-col gap-3">
              {thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  className="group relative overflow-hidden rounded-xl border-2 border-white/20 hover:border-white/60 transition-all duration-300 hover:scale-[1.03] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setActiveThumb(activeThumb === i ? null : i)}
                  aria-label={thumb.label}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    className="h-[156px] w-[249px] object-cover transition-transform duration-500 group-hover:scale-110 md:h-[188px] md:w-[312px]"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeThumb !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setActiveThumb(null)}
        >
          <div
            className="relative max-w-4xl w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={thumbnails[activeThumb].src}
              alt={thumbnails[activeThumb].alt}
              className="w-full rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setActiveThumb(null)}
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Schließen"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Bottom curved SVG divider */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V40C360 10 720 0 1080 15C1260 22 1380 35 1440 40V80H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
        <div className="w-full h-1" style={{ background: "hsl(var(--background))" }} />
      </div>
    </section>
  );
};

export default HeroSection;
