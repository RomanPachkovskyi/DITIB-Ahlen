import heroRender from "@/assets/hero-render.jpg";
import interiorSeminar from "@/assets/interior-seminar.jpg";
import detailArchitecture from "@/assets/detail-architecture.jpg";
import communityLife from "@/assets/community-life.jpg";
import interiorPrayer from "@/assets/interior-prayer.jpg";
import atmosphereEvening from "@/assets/atmosphere-evening.jpg";

const images = [
  { src: heroRender, alt: "Außenansicht — Architekturvisualisierung", span: "col-span-2 row-span-2" },
  { src: detailArchitecture, alt: "Architektonisches Detail", span: "col-span-1 row-span-1" },
  { src: communityLife, alt: "Gemeinschaftsleben", span: "col-span-1 row-span-1" },
  { src: interiorSeminar, alt: "Seminarraum — Innenansicht", span: "col-span-1 row-span-2" },
  { src: interiorPrayer, alt: "Gebetsraum — Innenansicht", span: "col-span-1 row-span-1" },
  { src: atmosphereEvening, alt: "Abendstimmung — Außenansicht", span: "col-span-1 row-span-1" },
];

const ImageGallery = () => {
  return (
    <section className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <p className="section-label mb-4">— Impressionen</p>
        <h2 className="heading-md text-foreground mb-10">
          Einblicke in das Projekt
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[140px] md:auto-rows-[200px]">
          {images.map((image, i) => (
            <div
              key={i}
              className={`${image.span} rounded-xl overflow-hidden group relative`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />
              <span className="absolute bottom-3 left-3 font-body text-[10px] tracking-wider uppercase text-primary-foreground/0 group-hover:text-primary-foreground/80 transition-colors duration-300">
                {image.alt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
