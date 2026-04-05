import heroImage from "@/assets/hero-render.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-end p-3 md:p-5">
      <div className="absolute inset-3 md:inset-5 rounded-2xl overflow-hidden">
        <img
          src={heroImage}
          alt="Architekturvisualisierung des DITIB Ahlen Kulturzentrums"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-foreground/10" />
      </div>

      {/* Top bar */}
      <div className="absolute top-3 md:top-5 left-3 md:left-5 right-3 md:right-5 z-10 px-5 py-5 md:px-8 md:py-6 flex items-center justify-between">
        <span className="font-body text-xs font-medium tracking-[0.15em] uppercase text-primary-foreground/80">
          DITIB Ahlen
        </span>
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-primary-foreground/50">
          ● Kulturzentrum in Planung
        </span>
      </div>

      {/* Hero content */}
      <div className="relative z-10 w-full px-5 pb-12 md:px-10 md:pb-16 lg:pb-20 max-w-4xl">
        <p className="section-label text-primary-foreground/50 mb-4">
          — Gemeinsam Zukunft bauen
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-primary-foreground mb-5">
          Ein Kulturzentrum
          <br />
          für Ahlen
        </h1>
        <p className="font-body text-sm md:text-base leading-relaxed text-primary-foreground/70 max-w-lg">
          Ein Ort der Begegnung, Bildung und Gemeinschaft. 
          Unterstützen Sie den Bau eines modernen Kultur- und Gemeindezentrums — 
          für alle Menschen in Ahlen.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
