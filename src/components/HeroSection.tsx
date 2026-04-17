import { useEffect, useRef, useState } from "react";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { handleCleanAnchorClick } from "@/lib/clean-anchor-navigation";
import { assetUrl } from "@/lib/asset-url";
import { useLang } from "@/i18n/useLang";
import { LangSwitcher } from "@/components/LangSwitcher";

const HERO_POSTER =
  assetUrl("/img/ditib-ahlen-bildungs-begegnungszentrum-960.webp");
const HERO_IMAGE_SRCSET =
  [
    `${assetUrl("/img/ditib-ahlen-bildungs-begegnungszentrum-960.webp")} 960w`,
    `${assetUrl("/img/ditib-ahlen-bildungs-begegnungszentrum-1280.webp")} 1280w`,
    `${assetUrl("/img/ditib-ahlen-bildungs-begegnungszentrum-1920.webp")} 1920w`,
    `${assetUrl("/img/ditib-ahlen-bildungs-begegnungszentrum.webp")} 2400w`,
  ].join(", ");

const HERO_VIDEO_SOURCES = {
  mobile: assetUrl("/video/hero-720.mp4"),
  default: assetUrl("/video/hero-1080.mp4"),
  vip: assetUrl("/video/hero-2160.mp4"),
} as const;
const HERO_PHOTO_HOLD_MS = 7000;
const HERO_VIDEO_TO_PHOTO_FADE_LEAD_MS = 2200;
const HERO_PHOTO_TO_VIDEO_FADE_MS = 1800;
const HERO_VIDEO_TO_PHOTO_FADE_MS = 2600;
const HERO_PLAY_RETRY_MS = 2500;

// Static image URLs — never change between languages
const THUMB_SRCS = [
  assetUrl("/img/ditib-ahlen-aussenansicht-west.jpg"),
  assetUrl("/img/ditib-ahlen-fassadenansicht.jpg"),
] as const;

type ConnectionInfo = {
  effectiveType?: string;
  saveData?: boolean;
};

const pickHeroVideoSource = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: ConnectionInfo }).connection;
  const effectiveType = connection?.effectiveType;
  const saveData = connection?.saveData;
  const viewportWidth = window.innerWidth;
  const pixelDensity = window.devicePixelRatio || 1;
  const isSlowConnection =
    effectiveType === "slow-2g" ||
    effectiveType === "2g" ||
    (effectiveType === "3g" && viewportWidth < 1024);

  if (reducedMotion || saveData) {
    return null;
  }

  if (viewportWidth < 768 || isSlowConnection) {
    return HERO_VIDEO_SOURCES.mobile;
  }

  if (viewportWidth >= 1720 && pixelDensity >= 1.25 && effectiveType !== "3g") {
    return HERO_VIDEO_SOURCES.vip;
  }

  return HERO_VIDEO_SOURCES.default;
};

const HeroSection = () => {
  const { t } = useLang();
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoTimerRef = useRef<number | null>(null);
  const playRetryTimerRef = useRef<number | null>(null);
  const hasStartedEndingFadeRef = useRef(false);

  // Thumbnails — alt texts come from translations
  const thumbnails = [
    { src: THUMB_SRCS[0], alt: t.hero.thumbExteriorAlt },
    { src: THUMB_SRCS[1], alt: t.hero.thumbFacadeAlt },
  ];

  useLockBodyScroll(activeThumb !== null);

  useEffect(() => {
    setVideoSource(pickHeroVideoSource());
  }, []);

  useEffect(() => {
    if (!videoSource) {
      return;
    }

    setShowVideo(false);

    return () => {
      if (photoTimerRef.current !== null) {
        window.clearTimeout(photoTimerRef.current);
        photoTimerRef.current = null;
      }

      if (playRetryTimerRef.current !== null) {
        window.clearTimeout(playRetryTimerRef.current);
        playRetryTimerRef.current = null;
      }
    };
  }, [videoSource]);

  useEffect(() => {
    if (!videoSource || !videoRef.current) {
      return;
    }

    const video = videoRef.current;

    const clearTimers = () => {
      if (photoTimerRef.current !== null) {
        window.clearTimeout(photoTimerRef.current);
        photoTimerRef.current = null;
      }

      if (playRetryTimerRef.current !== null) {
        window.clearTimeout(playRetryTimerRef.current);
        playRetryTimerRef.current = null;
      }
    };

    const attemptStartVideo = () => {
      hasStartedEndingFadeRef.current = false;
      setShowVideo(false);
      video.currentTime = 0;

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          setShowVideo(false);

          if (playRetryTimerRef.current !== null) {
            window.clearTimeout(playRetryTimerRef.current);
          }

          playRetryTimerRef.current = window.setTimeout(() => {
            attemptStartVideo();
          }, HERO_PLAY_RETRY_MS);
        });
      }
    };

    const schedulePhotoDelay = () => {
      clearTimers();

      photoTimerRef.current = window.setTimeout(() => {
        attemptStartVideo();
      }, HERO_PHOTO_HOLD_MS);
    };

    video.load();
    video.pause();
    video.currentTime = 0;
    hasStartedEndingFadeRef.current = false;
    schedulePhotoDelay();

    return () => {
      clearTimers();
      video.pause();
      video.currentTime = 0;
      hasStartedEndingFadeRef.current = false;
    };
  }, [videoSource]);

  const handleVideoTimeUpdate = () => {
    if (!videoRef.current || hasStartedEndingFadeRef.current) {
      return;
    }

    const { currentTime, duration } = videoRef.current;
    if (!Number.isFinite(duration) || duration <= 0) {
      return;
    }

    const remainingMs = (duration - currentTime) * 1000;
    if (remainingMs <= HERO_VIDEO_TO_PHOTO_FADE_LEAD_MS) {
      hasStartedEndingFadeRef.current = true;
      setShowVideo(false);
    }
  };

  const handleVideoEnded = () => {
    setShowVideo(false);
    hasStartedEndingFadeRef.current = false;

    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;

    if (photoTimerRef.current !== null) {
      window.clearTimeout(photoTimerRef.current);
    }

    if (playRetryTimerRef.current !== null) {
      window.clearTimeout(playRetryTimerRef.current);
      playRetryTimerRef.current = null;
    }

    photoTimerRef.current = window.setTimeout(() => {
      if (!videoRef.current) {
        return;
      }

      hasStartedEndingFadeRef.current = false;
      setShowVideo(false);
      videoRef.current.currentTime = 0;

      const playPromise = videoRef.current.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          setShowVideo(false);

          playRetryTimerRef.current = window.setTimeout(() => {
            if (!videoRef.current) {
              return;
            }

            const retryPromise = videoRef.current.play();
            if (retryPromise && typeof retryPromise.catch === "function") {
              retryPromise.catch(() => {
                setShowVideo(false);
              });
            }
          }, HERO_PLAY_RETRY_MS);
        });
      }
    }, HERO_PHOTO_HOLD_MS);
  };

  const handleVideoPlaying = () => {
    setShowVideo(true);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden -mb-px"
      style={{ backgroundColor: "hsl(220, 20%, 12%)" }}
    >
      {/* Keep the LCP image visually stable from the first paint. */}
      <div className="absolute inset-0">
        {videoSource ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            poster={HERO_POSTER}
            aria-hidden="true"
            onPlaying={handleVideoPlaying}
            onError={() => setVideoSource(null)}
            onEnded={handleVideoEnded}
            onTimeUpdate={handleVideoTimeUpdate}
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ease-out ${showVideo ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          transitionDuration: `${HERO_VIDEO_TO_PHOTO_FADE_MS}ms`,
        }}
      />

      <div
        className={`absolute inset-0 transition-opacity ease-out ${showVideo ? "opacity-0" : "opacity-100"}`}
        style={{
          transitionDuration: showVideo
            ? `${HERO_PHOTO_TO_VIDEO_FADE_MS}ms`
            : `${HERO_VIDEO_TO_PHOTO_FADE_MS}ms`,
        }}
      >
        <picture className="block h-full w-full">
          <source
            type="image/webp"
            srcSet={HERO_IMAGE_SRCSET}
            sizes="100vw"
          />
          <img
            src={HERO_POSTER}
            alt={t.meta.ogImageAlt}
            className="h-full w-full object-cover"
            width="960"
            height="540"
            decoding="async"
            fetchpriority="high"
            loading="eager"
          />
        </picture>
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
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">

            {/* Left — text block */}
            <div className="max-w-2xl">
              <p className="animate-hero-slide-up delay-400 font-body text-sm md:text-base font-medium tracking-widest uppercase text-white/70 mb-3">
                {t.hero.eyebrow}
              </p>

              <h1 className="font-body text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-3 drop-shadow-lg">
                {t.hero.title}
                <br />
                <span className="font-light italic">{t.hero.titleItalic}</span>
              </h1>

              <p className="animate-hero-slide-up delay-800 font-body text-lg md:text-xl lg:text-2xl font-light text-white/90 mb-8 drop-shadow-sm">
                {t.hero.subtitle}{" "}
                <span className="font-semibold italic">{t.hero.subtitleAccent}</span>
                {t.hero.subtitleSuffix}
              </p>

              {/* CTAs */}
              <div className="animate-hero-fade-scale delay-1000 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="#spenden"
                  onClick={(e) => handleCleanAnchorClick(e, "#spenden")}
                  className="group font-body inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl hover:bg-primary/90"
                >
                  {t.hero.cta}
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
                  onClick={(e) => handleCleanAnchorClick(e, "#projekt")}
                  className="font-body inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-white/60 hover:bg-white/10"
                >
                  {t.hero.ctaSecondary}
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
                    aria-label={thumb.alt}
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

          <div className="mt-9 flex justify-center text-white">
            <LangSwitcher />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeThumb !== null && (
        <div
          className="fixed inset-0 z-[220] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
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
              aria-label={t.hero.lightboxClose}
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
