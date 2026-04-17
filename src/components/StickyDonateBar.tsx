import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { handleCleanAnchorClick } from "@/lib/clean-anchor-navigation";
import { useLang } from "@/i18n/useLang";
import { LangSwitcher } from "@/components/LangSwitcher";

const StickyDonateBar = () => {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let ctaObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const observeFinalCta = () => {
      if (ctaObserver) return true;

      const cta = document.getElementById("final-cta");
      if (!cta) return false;

      ctaObserver = new IntersectionObserver(
        ([entry]) => setCtaVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );
      ctaObserver.observe(cta);
      return true;
    };

    if (!observeFinalCta()) {
      mutationObserver = new MutationObserver(() => {
        if (observeFinalCta()) {
          mutationObserver?.disconnect();
          mutationObserver = null;
        }
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      ctaObserver?.disconnect();
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
          <div className="md:hidden shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white backdrop-blur-sm">
            <LangSwitcher className="text-[13px] font-semibold tracking-[0.08em] text-white" />
          </div>
          <a
            href="#spenden"
            onClick={(e) => handleCleanAnchorClick(e, "#spenden")}
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
