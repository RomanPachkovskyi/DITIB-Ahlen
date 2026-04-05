import { Instagram, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SocialSection = () => {
  const ref = useScrollReveal();

  return (
    <section className="px-5 md:px-10 py-16 md:py-20 bg-card">
      <div ref={ref} className="reveal max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="section-label mb-3">— Folgen Sie uns</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Baufortschritt live
          </h2>
          <p className="body-md max-w-sm">
            Aktuelle Updates, Einblicke und Neuigkeiten direkt auf Instagram.
          </p>
        </div>
        <a
          href="https://instagram.com/ditibahlen"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-foreground hover:bg-foreground/90 text-background font-body text-sm font-medium px-7 py-3.5 rounded-sm transition-colors duration-200 self-start md:self-auto shrink-0"
        >
          <Instagram className="w-4 h-4" />
          @ditibahlen
          <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </a>
      </div>
    </section>
  );
};

export default SocialSection;
