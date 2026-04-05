import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const CURRENT = 2_340_000;
const GOAL = 8_000_000;
const PERCENTAGE = Math.round((CURRENT / GOAL) * 100);

const StickyDonateBar = () => {
  const [visible, setVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const cta = document.getElementById("final-cta");
    if (!cta) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible && !ctaVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Progress line at top of bar */}
      <div className="h-0.5 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-700"
          style={{ width: `${PERCENTAGE}%` }}
        />
      </div>

      <div className="bg-background/96 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-5xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Left: progress info */}
          <div className="hidden sm:flex items-baseline gap-2">
            <span className="font-display text-base font-semibold text-foreground">
              {PERCENTAGE}%
            </span>
            <span className="font-body text-xs text-muted-foreground">
              von 8.000.000 € erreicht
            </span>
          </div>

          {/* Mobile: just label */}
          <span className="sm:hidden font-body text-xs text-muted-foreground">
            Kulturzentrum Ahlen
          </span>

          {/* Right: CTA */}
          <a
            href="#spenden"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-6 py-2.5 rounded-sm transition-colors duration-200 shrink-0"
          >
            <Heart className="w-3.5 h-3.5" />
            Jetzt spenden
          </a>
        </div>
      </div>
    </div>
  );
};

export default StickyDonateBar;
