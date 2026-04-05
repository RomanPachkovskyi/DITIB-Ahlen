const partners = [
  {
    role: "Bauherr",
    name: "DITIB - Ahlen (Westf.)",
    subtitle: "Türkisch Islamische Kultur Verein e.V.",
    address: "Rottmannstr. 62, 59229 Ahlen",
    logoInitials: "DITIB",
  },
  {
    role: "Entwurfsverfasser / Tragwerksplanung",
    name: "Ingenieurbüro Theismann & Partner",
    subtitle: "Dipl.-Ing. Bernd Theismann",
    address: "Nordstraße 29, 59227 Ahlen",
    logoInitials: "T&P",
  },
];

const ProjectPartners = () => {
  return (
    <section className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <p className="section-label mb-4">— Projektbeteiligte</p>
        <h2 className="heading-md text-foreground mb-12 max-w-xl">
          Wer baut und wer plant
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-start gap-5"
            >
              {/* Logo placeholder */}
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 border border-border">
                <span className="font-body text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {partner.logoInitials}
                </span>
              </div>
              <div>
                <p className="font-body text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                  {partner.role}
                </p>
                <h3 className="font-display text-base md:text-lg font-semibold text-foreground leading-snug">
                  {partner.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {partner.subtitle}
                </p>
                <p className="font-body text-xs text-muted-foreground/70 mt-1">
                  {partner.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectPartners;
