import { BookOpen, Users, Landmark } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    icon: BookOpen,
    title: "Bildung & Seminare",
    description:
      "Moderne Seminar- und Schulungsräume für Sprachkurse, Workshops und Weiterbildungsangebote für alle Altersgruppen.",
    number: "01",
  },
  {
    icon: Users,
    title: "Begegnung & Dialog",
    description:
      "Großzügige Veranstaltungs- und Mehrzweckräume für interkulturelle Begegnungen, Feste und Gemeinschaftsveranstaltungen.",
    number: "02",
  },
  {
    icon: Landmark,
    title: "Gebet & Besinnung",
    description:
      "Ein architektonisch gestalteter Gebetsraum, der Ruhe und Spiritualität in einem modernen Umfeld vereint.",
    number: "03",
  },
];

const VisionSection = () => {
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal({ threshold: 0.08 });

  return (
    <section className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal mb-14 md:mb-16">
          <p className="section-label mb-4">— Vision & Räume</p>
          <h2 className="heading-md text-foreground mb-5 max-w-xl">
            Räume, die verbinden und inspirieren
          </h2>
          <p className="body-md max-w-lg">
            Das Zentrum vereint drei zentrale Funktionsbereiche unter einem Dach —
            für eine lebendige, offene Gemeinschaft.
          </p>
        </div>

        {/* Desktop: 3-column cards */}
        <div ref={cardsRef} className="reveal hidden md:grid md:grid-cols-3 gap-px bg-border">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-background p-8 lg:p-10 flex flex-col gap-6 group hover:bg-card transition-colors duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Large number watermark */}
              <span className="font-display text-6xl font-semibold text-muted-foreground/20 group-hover:text-[#232323] leading-none select-none transition-colors duration-300">
                {feature.number}
              </span>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <feature.icon className="w-4 h-4 text-muted-foreground/30 group-hover:text-[#232323] transition-colors duration-300 shrink-0" />
                </div>
                <p className="body-md text-sm leading-relaxed">{feature.description}</p>
              </div>
              {/* Bottom accent line */}
              <div className="h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Mobile: numbered list */}
        <div className="md:hidden space-y-0 border-t border-border">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="grid grid-cols-[32px_1fr] gap-4 py-7 border-b border-border"
            >
              <span className="font-body text-xs text-muted-foreground/50 tracking-wider pt-0.5">
                {feature.number}
              </span>
              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="body-md text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
