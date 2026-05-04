import { useEffect, useState } from "react";
import { ArrowUpRight, Heart, Instagram, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/useLang";
import {
  fetchInstagramFeed,
  type InstagramItem,
} from "@/lib/instagram-feed";

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

const FeedCard = ({ item, viewLabel }: { item: InstagramItem; viewLabel: string }) => (
  <a
    href={item.permalink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={viewLabel}
    className="group flex h-full flex-col"
  >
    <div className="relative overflow-hidden rounded-lg bg-muted">
      <img
        src={item.imageUrl}
        alt=""
        loading="lazy"
        width={768}
        height={768}
        className="aspect-square h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.32,0.72,0.24,1)] group-hover:scale-[1.03]"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 opacity-0 transition-opacity duration-[350ms] ease-[cubic-bezier(0.32,0.72,0.24,1)] group-hover:bg-black/45 group-hover:opacity-100" />
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
      <p className="mt-4 line-clamp-2 text-[13.5px] font-light leading-relaxed text-muted-foreground">
        {item.caption}
      </p>
    )}

    {/* Counters */}
    <div className="mt-3 flex items-center gap-4 text-xs font-light text-muted-foreground/80">
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
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
    {[0, 1, 2].map((i) => (
      <div key={i} className="flex flex-col">
        <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
        <div className="mt-4 h-3 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    ))}
  </div>
);

const SocialSection = () => {
  const { t } = useLang();
  const textRef = useScrollReveal();
  const btnsRef = useScrollReveal();
  const feedRef = useScrollReveal({ threshold: 0.06 });

  const [items, setItems] = useState<InstagramItem[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchInstagramFeed(ctrl.signal)
      .then((feed) => {
        if (feed.error || !feed.items?.length) {
          setItems([]);
        } else {
          setItems(feed.items);
        }
      })
      .catch((e) => {
        if ((e as Error).name === "AbortError") return;
        setError(true);
        setItems([]);
      });
    return () => ctrl.abort();
  }, []);

  const showSkeleton = items === null && !error;
  const showEmpty = items !== null && items.length === 0 && !error;
  const showError = error;
  const showGrid = items !== null && items.length > 0;

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
          {showSkeleton && <FeedSkeleton />}
          {showGrid && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {items!.slice(0, 3).map((item) => (
                <FeedCard
                  key={item.id}
                  item={item}
                  viewLabel={t.social.feedViewOnInstagram}
                />
              ))}
            </div>
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
