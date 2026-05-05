import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { useLang } from "@/i18n/useLang";
import {
  fetchInstagramFeed,
  type InstagramItem,
} from "@/lib/instagram-feed";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const formatCount = (n: number | null): string => {
  if (n == null) return "—";
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const arrowClassName =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-300 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35";

const FeedCard = ({
  item,
  viewLabel,
}: {
  item: InstagramItem;
  viewLabel: string;
}) => (
  <a
    href={item.permalink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={viewLabel}
    className="group flex h-full flex-col select-none"
  >
    <div className="relative overflow-hidden rounded-lg bg-muted">
      <img
        src={item.imageUrl}
        alt=""
        loading="lazy"
        width={640}
        height={640}
        className="aspect-square h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0.24,1)] group-hover:scale-[1.04]"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 opacity-0 transition-all duration-[350ms] ease-[cubic-bezier(0.32,0.72,0.24,1)] group-hover:bg-black/45 group-hover:opacity-100 rounded-lg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white opacity-0 transition-opacity duration-[350ms] ease-[cubic-bezier(0.32,0.72,0.24,1)] group-hover:opacity-100">
        <Instagram
          className="h-6 w-6 translate-y-1.5 transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0.72,0.24,1)] group-hover:translate-y-0"
          strokeWidth={1.5}
        />
        <span className="translate-y-1.5 text-[11px] font-light tracking-wide transition-transform duration-[400ms] delay-[60ms] ease-[cubic-bezier(0.32,0.72,0.24,1)] group-hover:translate-y-0">
          {viewLabel}
        </span>
      </div>
    </div>

    {/* Caption */}
    {item.caption && (
      <p className="mt-3 line-clamp-2 text-[13px] font-light leading-relaxed text-muted-foreground">
        {item.caption}
      </p>
    )}

    {/* Counters */}
    <div className="mt-2.5 flex items-center gap-4 text-xs font-light text-muted-foreground/80">
      <span className="inline-flex items-center gap-1.5">
        <Heart className="h-3.5 w-3.5" strokeWidth={1.5} />
        {formatCount(item.likeCount)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
        {formatCount(item.commentsCount)}
      </span>
    </div>
  </a>
);

const FeedSkeleton = () => (
  <div className="flex gap-5">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="flex shrink-0 basis-[calc((100%-1.25rem)/1.5)] flex-col sm:basis-[calc((100%-2.5rem)/2.5)] lg:basis-[calc((100%-3.75rem)/3.5)]"
      >
        <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
        <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    ))}
  </div>
);

const SocialSection = () => {
  const { t } = useLang();
  const { consent, saveCustom } = useCookieConsent();
  const textRef = useScrollReveal();
  const btnsRef = useScrollReveal();
  const feedRef = useScrollReveal({ threshold: 0.06 });
  const canLoadInstagramFeed = Boolean(consent?.external);

  const [items, setItems] = useState<InstagramItem[] | null>(null);
  const [error, setError] = useState(false);

  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!canLoadInstagramFeed) {
      setItems(null);
      setError(false);
      return;
    }

    const ctrl = new AbortController();
    fetchInstagramFeed(ctrl.signal)
      .then((feed) => {
        if (!feed.items?.length) {
          setItems([]);
        } else {
          setItems(feed.items);
          if (feed.error) {
            setError(true);
          }
        }
      })
      .catch((e) => {
        if ((e as Error).name === "AbortError") return;
        setError(true);
        setItems([]);
      });
    return () => ctrl.abort();
  }, [canLoadInstagramFeed]);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const showSkeleton = items === null && !error;
  const showConsentPlaceholder = !canLoadInstagramFeed;
  const showEmpty = items !== null && items.length === 0 && !error;
  const showError = error;
  const showCarousel = canLoadInstagramFeed && items !== null && items.length > 0;

  const total = items?.length ?? 0;

  const handleLoadFeed = () => {
    saveCustom({
      necessary: true,
      analytics: consent?.analytics ?? false,
      external: true,
    });
  };

  return (
    <section className="px-5 md:px-10 py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div ref={textRef} className="reveal">
            <p className="section-label mb-3">{t.social.label}</p>
            <h2 className="font-body text-2xl md:text-3xl font-black text-foreground mb-2">
              {t.social.heading}
            </h2>
            <p className="body-md max-w-sm">{t.social.cta}</p>
          </div>
          <div
            ref={btnsRef}
            className="reveal reveal-delay-2 self-center md:self-auto shrink-0 flex flex-col items-center sm:flex-row gap-3"
          >
            <a
              href="https://www.instagram.com/ditib_ahlen_projekte"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-[52px] items-center justify-center gap-3 bg-[#253e54] hover:bg-[#1e3345] text-white font-body text-sm font-medium px-9 py-0 rounded-full transition-all duration-300 hover:scale-[1.04]"
            >
              <Instagram className="w-4 h-4" />
              Instagram
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>
            <a
              href="https://www.facebook.com/people/Ditib-Ahlen-Projekte/61573315285318"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-[52px] items-center justify-center gap-3 bg-[#253e54] hover:bg-[#1e3345] text-white font-body text-sm font-medium px-9 py-0 rounded-full transition-all duration-300 hover:scale-[1.04]"
            >
              <FacebookIcon />
              Facebook
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>
          </div>
        </div>

        {/* Feed */}
        <div ref={feedRef} className="reveal mt-12 md:mt-16">
          {showConsentPlaceholder && (
            <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-border bg-secondary/35 px-6 py-10 text-center">
              <div className="max-w-xl">
                <Instagram
                  className="mx-auto mb-4 h-7 w-7 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <p className="font-body text-lg font-semibold text-foreground md:text-xl">
                  {t.social.feedConsentTitle}
                </p>
                <p className="body-md mx-auto mt-3 max-w-lg text-sm md:text-base">
                  {t.social.feedConsentBody}
                </p>
                <button
                  type="button"
                  onClick={handleLoadFeed}
                  className="mt-6 inline-flex h-[52px] items-center justify-center rounded-full bg-primary px-8 py-0 font-body text-sm font-medium text-primary-foreground shadow-[0_10px_24px_rgba(199,65,65,0.16)] transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_18px_36px_rgba(199,65,65,0.22)] motion-reduce:transform-none"
                >
                  {t.social.feedConsentCta}
                </button>
              </div>
            </div>
          )}

          {!showConsentPlaceholder && showSkeleton && <FeedSkeleton />}

          {showCarousel && (
            <>
              {/* Counter + arrows */}
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground md:hidden">
                  {t.social.feedHint}
                </p>
                <div className="flex items-center gap-3 ml-auto">
                  <span className="min-w-[56px] text-right font-body text-xs tracking-[0.18em] text-muted-foreground">
                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    className={arrowClassName}
                    onClick={() => api?.scrollPrev()}
                    disabled={!canScrollPrev}
                    aria-label="Vorheriger Beitrag"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className={arrowClassName}
                    onClick={() => api?.scrollNext()}
                    disabled={!canScrollNext}
                    aria-label="Nächster Beitrag"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Carousel */}
              <div className="relative">
                {/* Right fade — hint for next card */}
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-20" />
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "start",
                    dragFree: false,
                    containScroll: "trimSnaps",
                    loop: false,
                  }}
                  className="cursor-grab select-none active:cursor-grabbing"
                >
                  <CarouselContent className="ml-0 gap-5">
                    {items!.map((item) => (
                      <CarouselItem
                        key={item.id}
                        className="basis-[calc((100%-1.25rem)/1.5)] pl-0 sm:basis-[calc((100%-2.5rem)/2.5)] lg:basis-[calc((100%-3.75rem)/3.5)]"
                      >
                        <FeedCard
                          item={item}
                          viewLabel={t.social.feedViewOnInstagram}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </>
          )}

          {showEmpty && (
            <p className="py-8 text-center text-sm font-light text-muted-foreground">
              {t.social.feedEmpty}
            </p>
          )}
          {showError && (
            <p className="py-8 text-center text-sm font-light text-muted-foreground">
              {t.social.feedError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
