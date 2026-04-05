import { Instagram } from "lucide-react";

const SocialSection = () => {
  return (
    <section className="px-5 md:px-10 py-16 md:py-20 bg-card">
      <div className="max-w-xl mx-auto text-center">
        <p className="section-label mb-4">— Folgen Sie uns</p>
        <h2 className="heading-md text-foreground mb-4">
          Bleiben Sie auf dem Laufenden
        </h2>
        <p className="body-md mb-8 max-w-md mx-auto">
          Verfolgen Sie den Baufortschritt und erhalten Sie aktuelle Neuigkeiten 
          direkt auf Instagram.
        </p>
        <a
          href="https://instagram.com/ditibahlen"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 border border-foreground/15 hover:border-foreground/30 text-foreground font-body text-sm font-medium px-7 py-3 rounded-sm transition-colors duration-200"
        >
          <Instagram className="w-4 h-4" />
          @ditibahlen
        </a>
      </div>
    </section>
  );
};

export default SocialSection;
