import { Heart } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="px-5 md:px-10 py-20 md:py-28 geometric-pattern">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-full bg-terracotta-light flex items-center justify-center mx-auto mb-6">
          <Heart className="w-5 h-5 text-primary" />
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
          className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-8 py-4 rounded-sm transition-all duration-200 hover:shadow-lg"
        >
          <Heart className="w-4 h-4" />
          Ich möchte spenden
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
