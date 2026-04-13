import { Instagram, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SocialSection = () => {
  const textRef = useScrollReveal();
  const btnRef = useScrollReveal();

  return (
    <section className="px-5 md:px-10 py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div ref={textRef} className="reveal">
          <p className="section-label mb-3">— Folgen Sie uns</p>
          <h2 className="font-body text-2xl md:text-3xl font-black text-foreground mb-2">
            Baufortschritt live
          </h2>
          <p className="body-md max-w-sm">
            Aktuelle Updates, Einblicke und Neuigkeiten direkt auf Instagram.
          </p>
        </div>
        <div ref={btnRef} className="reveal reveal-delay-2 self-start md:self-auto shrink-0">
          <a
            href="https://instagram.com/ditibahlen"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-foreground hover:bg-foreground/90 text-background font-body text-sm font-medium px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.04]"
          >
            <Instagram className="w-4 h-4" />
            @ditibahlen
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
