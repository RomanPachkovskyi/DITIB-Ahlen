import { Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const FinalCTA = () => {
  const ref = useScrollReveal();

  return (
    <section id="final-cta" className="px-5 md:px-10 py-20 md:py-32 bg-card">
      <div ref={ref} className="reveal max-w-2xl mx-auto text-center">
        {/* Thin ornamental line */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="h-px w-16 bg-primary/30" />
        </div>

        <h2 className="heading-lg text-foreground mb-5">
          Werden Sie Teil dieses Projekts
        </h2>
        <p className="body-lg max-w-md mx-auto mb-10">
          Jeder Beitrag bringt uns einem Ort näher, der Generationen verbinden wird.
          Gemeinsam schaffen wir etwas Bleibendes.
        </p>
        <a
          href="#spenden"
          className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-9 py-4 rounded-sm transition-all duration-200 hover:shadow-lg"
        >
          <Heart className="w-4 h-4" />
          Ich möchte spenden
        </a>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="h-px w-16 bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="h-px w-16 bg-primary/30" />
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
