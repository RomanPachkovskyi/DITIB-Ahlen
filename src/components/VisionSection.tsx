import { BookOpen, Users, Landmark } from "lucide-react";

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
  return (
    <section className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <p className="section-label mb-4">— Vision & Räume</p>
        <h2 className="heading-md text-foreground mb-6 max-w-xl">
          Räume, die verbinden und inspirieren
        </h2>
        <p className="body-md max-w-lg mb-16">
          Das Zentrum vereint drei zentrale Funktionsbereiche unter einem Dach —
          für eine lebendige, offene Gemeinschaft.
        </p>

        <div className="space-y-0 border-t border-border">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[60px_200px_1fr_40px] items-start md:items-center gap-4 md:gap-8 py-8 md:py-10 border-b border-border group"
            >
              <span className="font-body text-xs text-muted-foreground/50 tracking-wider pt-1 md:pt-0">
                {feature.number}
              </span>
              <div className="space-y-1 md:space-y-0">
                <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="body-md col-span-2 md:col-span-1 md:col-start-3">
                {feature.description}
              </p>
              <feature.icon className="hidden md:block w-5 h-5 text-muted-foreground/40 group-hover:text-primary transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
