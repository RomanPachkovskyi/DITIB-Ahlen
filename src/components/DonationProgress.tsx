import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/use-count-up";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const GOAL = 8_000_000;
const CURRENT = 2_340_000;
const PERCENTAGE = Math.round((CURRENT / GOAL) * 100);
const DONORS = 1_847;

const formatEur = (n: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(n);

const AnimatedBar = ({ percentage }: { percentage: number }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percentage), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div ref={barRef} className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-[3600ms] ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const DonationProgress = () => {
  const headerRef = useScrollReveal();
  const statsRef = useScrollReveal({ threshold: 0.08 });
  const barRef = useScrollReveal({ threshold: 0.08 });
  const ctaRef = useScrollReveal({ threshold: 0.08 });

  const { value: currentVal, ref: currentRef } = useCountUp(CURRENT, 2000);
  const { value: donorsVal, ref: donorsRef } = useCountUp(DONORS, 1600);
  const { value: pctVal, ref: pctRef } = useCountUp(PERCENTAGE, 1400);

  return (
    <section id="spenden" className="px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="reveal mb-12">
          <p className="section-label mb-4">— Spendenfortschritt</p>
          <h2 className="heading-md text-foreground mb-3">
            Transparenz & Vertrauen
          </h2>
          <p className="body-md max-w-lg">
            Jeder Beitrag zählt. Verfolgen Sie den aktuellen Stand der Spendensammlung in Echtzeit.
          </p>
        </div>

        {/* Stats — stagger */}
        <div ref={statsRef} className="reveal-stagger grid grid-cols-3 gap-px bg-border mb-px">
          <div className="bg-background p-6 md:p-8">
            <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Gesammelt
            </p>
            <p
              ref={currentRef as React.RefObject<HTMLParagraphElement>}
              className="font-display text-2xl md:text-3xl font-semibold text-foreground tabular-nums"
            >
              {formatEur(currentVal)} €
            </p>
          </div>
          <div className="bg-background p-6 md:p-8">
            <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Spender:innen
            </p>
            <p
              ref={donorsRef as React.RefObject<HTMLParagraphElement>}
              className="font-display text-2xl md:text-3xl font-semibold text-foreground tabular-nums"
            >
              {formatEur(donorsVal)}
            </p>
          </div>
          <div className="bg-background p-6 md:p-8">
            <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
              Erreicht
            </p>
            <p
              ref={pctRef as React.RefObject<HTMLParagraphElement>}
              className="font-display text-2xl md:text-3xl font-semibold text-primary tabular-nums"
            >
              {pctVal}%
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div ref={barRef} className="reveal reveal-delay-1 bg-background border border-border p-6 md:p-8 mb-8">
          <div className="flex justify-between items-baseline mb-4">
            <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
              Fortschritt
            </span>
            <span className="font-body text-xs text-muted-foreground">
              Ziel: {formatEur(GOAL)} €
            </span>
          </div>
          <AnimatedBar percentage={PERCENTAGE} />
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="reveal reveal-delay-2 text-center">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=3VHQAUC5S3BMY&locale.x=de_DE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-xl transition-all duration-200"
          >
            Jetzt spenden
          </a>
        </div>

      </div>
    </section>
  );
};

export default DonationProgress;
