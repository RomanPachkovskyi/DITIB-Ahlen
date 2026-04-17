import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/useLang";

const CONTACT_EMAIL = "info@ditib-ahlen-projekte.de";

const CompanySupportSection = () => {
  const { t } = useLang();
  const headerRef = useScrollReveal();
  const listRef = useScrollReveal({ threshold: 0.08 });
  const ctaRef = useScrollReveal({ threshold: 0.08 });

  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div ref={headerRef} className="reveal mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="section-label mb-4">{t.companySupport.label}</p>
          <h2 className="heading-md mb-5 text-foreground">
            {t.companySupport.heading}
          </h2>
          <p className="body-lg">{t.companySupport.body}</p>
        </div>

        <div
          ref={listRef}
          className="reveal reveal-delay-1 grid gap-px bg-border md:grid-cols-3"
        >
          {t.companySupport.options.map((option, index) => (
            <article
              key={option.title}
              className="group bg-background p-7 transition-colors duration-300 hover:bg-[#f0f0f0] md:p-8"
            >
              <p className="mb-8 font-body text-xs tracking-[0.18em] text-muted-foreground/60">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-3 font-body text-lg font-semibold text-foreground">
                {option.title}
              </h3>
              <p className="body-md text-sm leading-relaxed">{option.description}</p>
              <div className="mt-8 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        <div ref={ctaRef} className="reveal reveal-delay-2 mt-10 text-center">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Unterstuetzung%20fuer%20das%20DITIB%20Projekt%20in%20Ahlen`}
            className="group inline-flex h-[52px] items-center justify-center gap-3 rounded-full bg-primary px-8 py-0 font-body text-sm font-medium text-primary-foreground shadow-[0_10px_24px_rgba(199,65,65,0.16)] transition-all duration-300 hover:scale-[1.04] hover:bg-primary/90 hover:shadow-[0_18px_36px_rgba(199,65,65,0.22)] motion-reduce:transform-none"
          >
            {t.companySupport.cta}
            <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompanySupportSection;
