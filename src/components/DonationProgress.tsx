import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/useLang";

const GOAL = 5_000_000;
const CURRENT = 300_000;
const PERCENTAGE = Math.round((CURRENT / GOAL) * 100);
const PROGRESS_DURATION = 2400;
const CTA_PULSE_DELAY = 180;
const PAYPAL_URL =
  "https://www.paypal.com/donate/?hosted_button_id=3VHQAUC5S3BMY&locale.x=de_DE";
const IBAN = "DE34 4005 0150 0001 0040 76";
const BANK_NAME = "Sparkasse Muensterland Ost";
const ACCOUNT_HOLDER = "DITIB - Tuerkisch Islamische Gemeinde zu Ahlen e.V.";
const PAYMENT_REFERENCE = "Spende DiTiB Ahlen Projekt";

const formatEur = (n: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(n);

const AnimatedBar = ({
  percentage,
  duration,
  isActive,
}: {
  percentage: number;
  duration: number;
  isActive: boolean;
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timeoutId = window.setTimeout(() => setWidth(percentage), 80);
    return () => window.clearTimeout(timeoutId);
  }, [isActive, percentage]);

  return (
    <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
        aria-hidden="true"
        data-progress-active={isActive}
        data-progress-complete={width === percentage}
        style={{
          width: `${width}%`,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
};

const DonationProgress = () => {
  const { t } = useLang();
  const headerRef = useScrollReveal();
  const barRef = useScrollReveal({ threshold: 0.08 });
  const ctaRef = useScrollReveal({ threshold: 0.08 });
  const bankDetailsRef = useScrollReveal({ threshold: 0.08 });
  const desktopDonateRef = useScrollReveal({ threshold: 0.08 });
  const [isPaypalAccentActive, setIsPaypalAccentActive] = useState(false);

  const {
    ref: progressTriggerRef,
    started: hasStartedProgress,
    completed: hasCompletedProgress,
  } = useCountUp(CURRENT, PROGRESS_DURATION);

  useEffect(() => {
    if (!hasCompletedProgress) return;

    const delayId = window.setTimeout(() => setIsPaypalAccentActive(true), CTA_PULSE_DELAY);
    const resetId = window.setTimeout(() => setIsPaypalAccentActive(false), CTA_PULSE_DELAY + 1800);

    return () => {
      window.clearTimeout(delayId);
      window.clearTimeout(resetId);
    };
  }, [hasCompletedProgress]);

  return (
    <section id="spenden" className="px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="reveal mb-12">
          <p className="section-label mb-4">{t.donation.label}</p>
          <h2 className="heading-md text-foreground mb-3">
            {t.donation.heading}
          </h2>
          <p className="body-md max-w-lg">{t.donation.subheading}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-8 lg:gap-10 items-start">
          <div>
            {/* Progress bar */}
            <div
              ref={barRef}
              className="reveal reveal-delay-1 bg-background border border-border p-6 md:p-8 mb-8"
            >
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
                  {t.donation.progressLabel}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  {t.donation.goalLabel}: {formatEur(GOAL)} €
                </span>
              </div>
              <div ref={progressTriggerRef as React.RefObject<HTMLDivElement>}>
                <AnimatedBar
                  percentage={PERCENTAGE}
                  duration={PROGRESS_DURATION}
                  isActive={hasStartedProgress}
                />
              </div>
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="reveal reveal-delay-2 text-center lg:text-left">
              <a
                href={PAYPAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-[52px] items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-8 py-0 rounded-full shadow-[0_10px_24px_rgba(199,65,65,0.16)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_18px_36px_rgba(199,65,65,0.22)] motion-reduce:transform-none"
                data-cta-accent={isPaypalAccentActive}
              >
                {t.donation.ctaPaypal}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>
              <p className="mx-auto mt-4 max-w-md font-body text-xs leading-relaxed text-muted-foreground lg:mx-0">
                {t.donation.anonNote}
              </p>
            </div>

            <div ref={bankDetailsRef} className="reveal reveal-delay-2 mt-10">
              <div className="rounded-[22px] border border-border bg-background p-5">
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  {t.donation.bankLabel}
                </p>

                <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-[140px_minmax(0,1fr)] md:gap-x-4 md:gap-y-4 md:items-start">
                  <div className="space-y-1 md:contents">
                    <p className="font-body text-sm font-medium text-foreground">{t.donation.bankName}</p>
                    <p className="font-body text-sm text-muted-foreground">{BANK_NAME}</p>
                  </div>

                  <div className="space-y-1 md:contents">
                    <p className="font-body text-sm font-medium text-foreground">{t.donation.recipient}</p>
                    <p className="font-body text-sm text-muted-foreground">{ACCOUNT_HOLDER}</p>
                  </div>

                  <div className="space-y-1 md:contents">
                    <p className="font-body text-sm font-medium text-foreground">{t.donation.ibanLabel}</p>
                    <p className="font-body text-sm font-semibold text-foreground tracking-[0.06em] break-words">
                      {IBAN}
                    </p>
                  </div>

                  <div className="space-y-1 md:contents">
                    <p className="font-body text-sm font-medium text-foreground">{t.donation.purpose}</p>
                    <p className="font-body text-sm text-muted-foreground">{PAYMENT_REFERENCE}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside ref={desktopDonateRef} className="hidden lg:flex reveal reveal-delay-2 justify-center self-start">
            <a
              href={PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="/img/ditib-ahlen-paypal-spenden-qr.png"
                alt={t.donation.qrAlt}
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
