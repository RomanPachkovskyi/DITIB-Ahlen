import { Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { handleCleanAnchorClick } from "@/lib/clean-anchor-navigation";
import { useLang } from "@/i18n/useLang";

const FinalCTA = () => {
  const { t } = useLang();
  const ornamentRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <section id="final-cta" className="px-5 md:px-10 py-20 md:py-32 bg-white">
      <div className="max-w-2xl mx-auto text-center">

        <div ref={ornamentRef} className="reveal flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="h-px w-16 bg-primary/30" />
        </div>

        <div ref={headingRef} className="reveal reveal-delay-1 mb-10">
          <h2 className="heading-lg text-foreground mb-5">
            {t.finalCta.heading}
          </h2>
          <p className="body-lg max-w-md mx-auto">{t.finalCta.body}</p>
        </div>

        <div ref={ctaRef} className="reveal reveal-delay-3">
          <a
            href="#spenden"
            onClick={(e) => handleCleanAnchorClick(e, "#spenden")}
            className="inline-flex h-[52px] items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-9 py-0 rounded-full transition-all duration-300 hover:scale-[1.04] hover:shadow-lg"
          >
            <Heart className="w-4 h-4" />
            {t.finalCta.cta}
          </a>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-16 bg-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="h-px w-16 bg-primary/30" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
