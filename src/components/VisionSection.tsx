import { BookOpen, Users, Landmark } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Bildung & Seminare",
    description:
      "Moderne Seminar- und Schulungsräume für Sprachkurse, Workshops und Weiterbildungsangebote für alle Altersgruppen.",
  },
  {
    icon: Users,
    title: "Begegnung & Dialog",
    description:
      "Großzügige Veranstaltungs- und Mehrzweckräume für interkulturelle Begegnungen, Feste und Gemeinschaftsveranstaltungen.",
  },
  {
    icon: Landmark,
    title: "Gebet & Besinnung",
    description:
      "Ein architektonisch gestalteter Gebetsraum, der Ruhe und Spiritualität in einem modernen Umfeld vereint.",
  },
];

const VisionSection = () => {
  return (
    <section className="px-5 md:px-10 py-16 md:py-24 bg-card geometric-pattern">
      <div className="max-w-5xl mx-auto">
        <p className="section-label mb-4">— Vision & Räume</p>
        <h2 className="heading-md text-foreground mb-12 max-w-xl">
          Räume, die verbinden und inspirieren
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-background/80 backdrop-blur-sm rounded-sm p-7 md:p-8 border border-border/60 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-sm bg-terracotta-light flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="body-md">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
