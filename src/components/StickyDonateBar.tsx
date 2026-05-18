import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { handleCleanAnchorClick } from "@/lib/clean-anchor-navigation";
import { useLang } from "@/i18n/useLang";
import { LangSwitcher } from "@/components/LangSwitcher";

const StickyDonateBar = () => {
  const { t, lang } = useLang();
  const { pathname } = useLocation();
  const isMainPage = pathname === "/" || pathname === "/tr" || pathname === "/tr/";
  const spendenHref = isMainPage ? "#spenden" : (lang === "tr" ? "/tr/#spenden" : "/#spenden");
  const [visible, setVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const tryObserve = () => {
      if (observer) return true;

      const target = document.getElementById("final-cta") ?? document.querySelector("footer");
      if (!target) return false;

      observer = new IntersectionObserver(
        ([entry]) => setCtaVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );
      observer.observe(target);
      return true;
    };

    if (!tryObserve()) {
      mutationObserver = new MutationObserver(() => {
        if (tryObserve()) {
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible && !ctaVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-primary">
        <div className="max-w-5xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between md:justify-center gap-3">
          <div className="md:hidden shrink-0 h-11 rounded-full border border-white/20 bg-white/10 px-4 text-white backdrop-blur-sm">
            <LangSwitcher className="h-full items-center gap-2 text-sm font-semibold tracking-[0.08em] text-white [&_a]:inline-flex [&_a]:items-center [&_a]:px-1.5" />
          </div>
          <a
            href={spendenHref}
            onClick={isMainPage ? (e) => handleCleanAnchorClick(e, "#spenden") : undefined}
            className="ml-auto inline-flex h-11 md:h-[52px] items-center justify-center gap-2 bg-white hover:bg-white/90 text-primary font-body text-[13px] md:text-sm font-semibold px-5 md:px-8 py-0 rounded-full transition-all duration-300 hover:scale-[1.04] shrink-0 md:ml-0"
          >
            <Heart className="w-3.5 h-3.5" />
            {t.stickyBar.cta}
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyDonateBar;
