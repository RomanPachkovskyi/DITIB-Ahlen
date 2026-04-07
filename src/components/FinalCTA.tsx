import { Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const FinalCTA = () => {
  const ornamentRef = useScrollReveal();
  const headingRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <section id="final-cta" className="px-5 md:px-10 py-20 md:py-32 bg-white">
      <div className="max-w-2xl mx-auto text-center">

        <div ref={ornamentRef} className="reveal flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="h-px w-16 bg-primary/30" />
        </div>

        <div ref={headingRef} className="reveal reveal-delay-1 mb-10">
          <h2 className="heading-lg text-foreground mb-5">
            Werden Sie Teil dieses Projekts
          </h2>
          <p className="body-lg max-w-md mx-auto">
            Jeder Beitrag bringt uns einem Ort näher, der Generationen verbinden wird.
            Gemeinsam schaffen wir etwas Bleibendes.
          </p>
        </div>

        <div ref={ctaRef} className="reveal reveal-delay-3">
          <a
            href="#spenden"
            className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-9 py-4 rounded-xl transition-all duration-200 hover:shadow-lg"
          >
            <Heart className="w-4 h-4" />
            Ich möchte spenden
          </a>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-16 bg-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="h-px w-16 bg-primary/30" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
