import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const images = [
  { src: "/img/ditib-ahlen-aussenansicht-west.jpg", alt: "Geplantes Zentrum von DiTiB Ahlen - Aussenansicht von Westen", span: "col-span-2 row-span-2" },
  { src: "/img/ditib-ahlen-grundriss-erdgeschoss.jpg", alt: "Grundriss Erdgeschoss - Neubau DiTiB Ahlen", span: "col-span-1 row-span-1" },
  { src: "/img/ditib-ahlen-grundriss-obergeschoss.jpg", alt: "Grundriss Obergeschoss - Neubau DiTiB Ahlen", span: "col-span-1 row-span-1" },
  { src: "/img/ditib-ahlen-grundriss-kellergeschoss.jpg", alt: "Grundriss Kellergeschoss - Neubau DiTiB Ahlen", span: "col-span-1 row-span-1" },
  { src: "/img/ditib-ahlen-freiflaechenplan.jpg", alt: "Freiflaechenplan - Aussenbereich und Gruenflaeche des DiTiB-Ahlen-Zentrums", span: "col-span-1 row-span-1" },
  { src: "/img/ditib-ahlen-gebaeudeschnitt.jpg", alt: "Gebaeudeschnitt - Neubau DiTiB Ahlen", span: "col-span-1 row-span-1", hideOnMobile: true },
];
const GALLERY_VIDEO_SRC = "/video/hero-1080.mp4";
const GALLERY_VIDEO_POSTER =
  "/img/ditib-ahlen-bildungs-begegnungszentrum-960.webp";

const ImageGallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.04 });
  const videoRef = useScrollReveal({ threshold: 0.12 });
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useLockBodyScroll(lightbox !== null);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % images.length : null));
  const toggleVideoPlayback = () => {
    if (!videoElementRef.current) return;

    if (videoElementRef.current.paused) {
      void videoElementRef.current.play();
      return;
    }

    videoElementRef.current.pause();
  };

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
    <section
      className="relative overflow-visible px-0 pt-16 pb-[calc(7.5rem+50px)] md:pt-24 md:pb-[22rem]"
      style={{ backgroundColor: "#253e54" }}
    >
      {/* Header */}
      <div ref={headerRef} className="reveal px-5 md:px-10 mb-10">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>— Impressionen</p>
          <h2 className="heading-md text-white">Einblicke in das Projekt</h2>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 md:px-6">
        <div
          ref={gridRef}
          className="reveal reveal-delay-1 mx-auto grid max-w-[1440px] grid-cols-2 gap-2 auto-rows-[140px] md:grid-cols-3 md:gap-3 md:auto-rows-[220px]"
        >
          {images.map((image, i) => (
            <div
              key={i}
              onClick={() => open(i)}
              className={`${image.span} ${image.hideOnMobile ? "hidden md:block" : ""} rounded-xl overflow-hidden group relative cursor-pointer border-2 border-white/10 hover:border-white/50 transition-all duration-300 hover:scale-[1.01] shadow-md hover:shadow-xl`}
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
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-[calc(50%-30px)] px-4 md:translate-y-[50%] md:px-6">
        <div
          ref={videoRef}
          className="pointer-events-auto reveal reveal-delay-2 mx-auto w-full max-w-[960px]"
        >
          <div
            className="group relative overflow-hidden rounded-xl bg-black shadow-[0_28px_60px_rgba(0,0,0,0.28)]"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
          >
            <video
              ref={videoElementRef}
              className="block h-full w-full aspect-video object-cover"
              controls
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              playsInline
              preload="metadata"
              poster={GALLERY_VIDEO_POSTER}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => setIsVideoPlaying(false)}
            >
              <source src={GALLERY_VIDEO_SRC} type="video/mp4" />
            </video>

            <div
              className={`pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/10 transition-opacity duration-200 md:flex ${
                !isVideoPlaying || isVideoHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
                aria-label={isVideoPlaying ? "Video pausieren" : "Video abspielen"}
                onClick={toggleVideoPlayback}
                className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-black/50 text-white shadow-lg transition-transform duration-200 hover:scale-105"
              >
                {isVideoPlaying ? (
                  <Pause className="h-9 w-9" fill="currentColor" />
                ) : (
                  <Play className="ml-1 h-9 w-9" fill="currentColor" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[220] bg-black/90 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
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
