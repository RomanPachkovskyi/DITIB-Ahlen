import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const partners = [
  {
    role: "Bauherr",
    name: "DITIB - Ahlen (Westf.)",
    subtitle: "Türkisch Islamische Kultur Verein e.V.",
    address: "Rottmannstr. 62, 59229 Ahlen",
    email: "info@ditib-ahlen-projekte.de",
    logo: "/img/ditib-ahlen-logo.png",
    logoAlt: "DITIB Ahlen Logo",
  },
  {
    role: "Entwurfsverfasser / Tragwerksplanung",
    name: "Ingenieurbüro Theismann & Partner",
    subtitle: "Dipl.-Ing. Bernd Theismann",
    address: "Nordstraße 29, 59227 Ahlen",
    email: "info@theismannundpartner.de",
    logo: "/img/theismann-partner-logo.jpg",
    logoAlt: "Ingenieurbüro Theismann & Partner Logo",
  },
];

const ProjectPartners = () => {
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal({ threshold: 0.08 });

  return (
    <section className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal mb-12">
          <p className="section-label mb-4">— Projektbeteiligte</p>
          <h2 className="heading-md text-foreground max-w-xl">
            Wer baut und wer plant
          </h2>
        </div>

        <div ref={cardsRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col gap-2.5">
              {/* bg-background wrapper ensures multiply blends against cream, not white compositing layer */}
              <div className="bg-background w-fit">
                <img
                  src={partner.logo}
                  alt={partner.logoAlt}
                  className="max-w-[160px] max-h-[80px] w-auto h-auto object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
              {/* Info */}
              <div>
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                  {partner.role}
                </p>
                <h3 className="font-body text-base md:text-lg font-semibold text-foreground leading-snug">
                  {partner.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {partner.subtitle}
                </p>
                <p className="font-body text-xs text-muted-foreground/70 mt-1">
                  {partner.address}
                </p>
                {partner.email && (
                  <a
                    href={`mailto:${partner.email}`}
                    className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors mt-1 inline-block"
                  >
                    {partner.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectPartners;
