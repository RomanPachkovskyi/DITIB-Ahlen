import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CookingPot,
  Flower2,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const features = [
  {
    icon: BookOpen,
    title: "Bildung & Seminare",
    description:
      "Moderne Seminar- und Schulungsräume für Sprachkurse, Workshops und Weiterbildung — für alle Altersgruppen und Lebensphasen. Wissen, das Menschen zusammenbringt.",
    number: "01",
  },
  {
    icon: Users,
    title: "Begegnung & Dialog",
    description:
      "Großzügige Räume für Veranstaltungen, Feste und Gemeinschaftsabende — Orte, an denen Geschichten geteilt werden und echte Verbindungen entstehen.",
    number: "02",
  },
  {
    icon: HeartHandshake,
    title: "Bestattungsvorbereitung",
    description:
      "Das Zentrum bietet speziell ausgestattete Räumlichkeiten für die würdevolle Vorbereitung Verstorbener sowie einen geschützten Raum für die Abschiednahme im familiären Rahmen. Für die kurzfristige Aufbewahrung Verstorbener steht ein eigens dafür vorgesehener Raum zur Verfügung.",
    number: "03",
  },
  {
    icon: CookingPot,
    title: "Professionelle Küche",
    description:
      "Eine voll ausgestattete Profiküche macht es möglich, Gemeinschaftsveranstaltungen kulinarisch zu begleiten — von kleinen Zusammenkünften bis zu großen Festen. Essen, das Menschen zusammenbringt.",
    number: "04",
  },
  {
    icon: Flower2,
    title: "Grünfläche & Außenbereich",
    description:
      "Rund um das Gebäude entsteht eine großzügige Grünfläche — mitten in der Stadt ein ruhiger Ort zum Spazierengehen, Verweilen und Zusammensein. Für Familien, Kinder und alle, die den Alltag kurz hinter sich lassen möchten.",
    number: "05",
  },
  {
    icon: ShieldCheck,
    title: "Barrierefrei & Nachhaltig",
    description:
      "Von Anfang an vollständig barrierefrei geplant — alle Räume sind so gestaltet, dass das gesamte Zentrum für Menschen mit Mobilitätseinschränkungen problemlos nutzbar ist. Photovoltaik und Wärmepumpe machen das Zentrum zudem zu einem Ort, der Verantwortung für morgen trägt.",
    number: "06",
  },
];

const arrowClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-300 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-35";

const VisionSection = () => {
  const headerRef = useScrollReveal();
  const carouselRef = useScrollReveal({ threshold: 0.06 });
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateControls = (emblaApi: CarouselApi) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    updateControls(api);
    const handleSelect = () => updateControls(api);

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div
          ref={headerRef}
          className="reveal mb-12 flex flex-col gap-8 md:mb-14"
        >
          <div className="max-w-2xl">
            <p className="section-label mb-4">— Vision & Räume</p>
            <h2 className="heading-md mb-5 text-foreground">
              Räume, die verbinden und inspirieren
            </h2>
            <p className="body-md">
              Das Zentrum vereint sechs zentrale Bereiche unter einem Dach — für
              Bildung, Begegnung und ein gemeinschaftliches Leben mit Zukunft.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 md:justify-end">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground md:hidden">
              Wischen oder ziehen
            </p>
            <div className="flex items-center gap-3">
              <span className="min-w-[56px] text-right font-body text-xs tracking-[0.18em] text-muted-foreground">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                className={arrowClassName}
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Vorherige Karte"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className={arrowClassName}
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Nächste Karte"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div ref={carouselRef} className="reveal reveal-delay-2 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-background to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-16" />
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              dragFree: false,
              containScroll: "trimSnaps",
              loop: true,
            }}
            className="cursor-grab select-none active:cursor-grabbing"
          >
            <CarouselContent className="ml-0">
              {features.map((feature) => (
                <CarouselItem
                  key={feature.title}
                  className="basis-[86%] pl-0 sm:basis-[72%] md:basis-[46%] xl:basis-[31%]"
                >
                  <article className="group relative flex h-full min-h-[320px] select-none flex-col bg-background px-6 py-6 transition-colors duration-300 hover:bg-[#f0f0f0] md:min-h-[360px] md:px-8 md:py-8">
                    <div className="absolute inset-y-6 right-0 w-px bg-border" />
                    <div className="mb-7 flex items-start justify-between gap-4">
                      <span className="font-body text-6xl font-semibold leading-none text-muted-foreground/20 transition-colors duration-300 group-hover:text-[#232323]">
                        {feature.number}
                      </span>
                      <feature.icon className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/35 transition-colors duration-300 group-hover:text-[#232323]" />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="mb-3 font-body text-lg font-semibold text-foreground md:text-xl">
                        {feature.title}
                      </h3>
                      <p className="body-md text-sm leading-relaxed md:text-[15px]">
                        {feature.description}
                      </p>
                    </div>

                    <div className="mt-8 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
