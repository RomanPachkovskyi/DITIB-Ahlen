import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

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
      <div className="bg-primary">
        <div className="max-w-5xl mx-auto px-5 md:px-10 h-16 flex items-center justify-center">
          <a
            href="#spenden"
            className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-primary font-body text-sm font-semibold px-8 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.04] shrink-0"
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
