import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const GOAL = 5_000_000;
const CURRENT = 2_340_000;
const PERCENTAGE = Math.round((CURRENT / GOAL) * 100);
const PAYPAL_URL =
  "https://www.paypal.com/donate/?hosted_button_id=3VHQAUC5S3BMY&locale.x=de_DE";
const IBAN = "DE34 4005 0150 0001 0040 76";
const BANK_NAME = "Sparkasse Muensterland Ost";
const ACCOUNT_HOLDER = "DITIB - Tuerkisch Islamische Gemeinde zu Ahlen e.V.";
const PAYMENT_REFERENCE = "Spende Kulturzentrum Ahlen";

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
  const bankDetailsRef = useScrollReveal({ threshold: 0.08 });
  const desktopDonateRef = useScrollReveal({ threshold: 0.08 });

  const { value: currentVal, ref: currentRef } = useCountUp(CURRENT, 2000);
  const { value: pctVal, ref: pctRef } = useCountUp(PERCENTAGE, 1400);

  return (
    <section id="spenden" className="px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-8 lg:gap-10 items-start">
          <div>
            {/* Stats — stagger */}
            <div ref={statsRef} className="reveal-stagger grid grid-cols-2 gap-px bg-border mb-px">
              <div className="bg-background p-6 md:p-8">
                <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  Gesammelt
                </p>
                <p
                  ref={currentRef as React.RefObject<HTMLParagraphElement>}
                  className="font-body text-2xl md:text-3xl font-semibold text-foreground tabular-nums"
                >
                  {formatEur(currentVal)} €
                </p>
              </div>
              <div className="bg-background p-6 md:p-8">
                <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  Erreicht
                </p>
                <p
                  ref={pctRef as React.RefObject<HTMLParagraphElement>}
                  className="font-body text-2xl md:text-3xl font-semibold text-primary tabular-nums"
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
            <div ref={ctaRef} className="reveal reveal-delay-2 text-center lg:text-left">
              <a
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.04] hover:shadow-lg"
              >
                Spenden mit PayPal
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>
            </div>

            <div ref={bankDetailsRef} className="reveal reveal-delay-2 mt-10">
              <div className="rounded-[22px] border border-border bg-background p-5">
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  Bankueberweisung
                </p>

                <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-[140px_minmax(0,1fr)] md:gap-x-4 md:gap-y-4 md:items-start">
                  <div className="space-y-1 md:contents">
                    <p className="font-body text-sm font-medium text-foreground">Bank</p>
                    <p className="font-body text-sm text-muted-foreground">{BANK_NAME}</p>
                  </div>

                  <div className="space-y-1 md:contents">
                    <p className="font-body text-sm font-medium text-foreground">Empfaenger</p>
                    <p className="font-body text-sm text-muted-foreground">{ACCOUNT_HOLDER}</p>
                  </div>

                  <div className="space-y-1 md:contents">
                    <p className="font-body text-sm font-medium text-foreground">IBAN</p>
                    <p className="font-body text-sm font-semibold text-foreground tracking-[0.06em] break-words">
                      {IBAN}
                    </p>
                  </div>

                  <div className="space-y-1 md:contents">
                    <p className="font-body text-sm font-medium text-foreground">Verwendungszweck</p>
                    <p className="font-body text-sm text-muted-foreground">{PAYMENT_REFERENCE}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside ref={desktopDonateRef} className="hidden lg:flex reveal reveal-delay-2 justify-center pt-4">
            <a
              href={PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="/img/qr-spende-paypal.png"
                alt="PayPal QR-Code für Spenden"
                className="block w-[170px] h-auto"
                loading="lazy"
              />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DonationProgress;
