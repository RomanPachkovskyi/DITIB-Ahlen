import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const leftColumnItems = [
  {
    title: "Ein neues Zentrum entsteht",
    body:
      "Das neue Bildungs- & Begegnungszentrum von DiTiB Ahlen wird ein moderner, offener Ort für Begegnung, Austausch und gemeinschaftliches Miteinander. Von Anfang an vollständig barrierefrei geplant — damit wirklich jeder Mensch diesen Ort nutzen kann.",
  },
  {
    title: "Bildung & Begegnung",
    body:
      "Das Zentrum schafft Räume, in denen Wissen wächst und echte Begegnungen entstehen — bei Sprachkursen, Seminaren und Abenden, zu denen DiTiB Ahlen herzlich einlädt. Eine professionelle Küche sorgt dafür, dass Gemeinschaft auch am Tisch entsteht: bei gemeinsamen Mahlzeiten, die Gespräche beginnen und Menschen einander näherbringen.",
  },
];

const rightColumnItems = [
  {
    title: "Nachhaltig gebaut, verantwortungsvoll gedacht",
    body:
      "Das Gebäude denkt an morgen: Photovoltaik auf dem Dach und eine moderne Wärmepumpe machen es zu einem Ort, der nicht nur die Gemeinschaft, sondern auch die Umwelt im Blick hat — ein Zeichen dafür, wie Verantwortung heute aussieht.",
  },
  {
    title: "Ein Ort zum Durchatmen",
    body:
      "Rund um das Gebäude entsteht eine weitläufige Grünfläche — ein Ort für Spaziergänge, stille Momente und lebhafte Gespräche unter freiem Himmel. Ein Platz, an dem Familien Zeit finden, Kinder spielen und Menschen jeden Alters einfach zusammen sein können.",
  },
];

const ProjectIntro = () => {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section
      id="projekt"
      className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32 -mt-[3px]"
    >
      <div className="mx-auto max-w-5xl">
        <div ref={headerRef} className="reveal mx-auto mb-14 max-w-4xl text-center md:mb-16">
          <p className="section-label mb-5">— Über das Projekt</p>
          <h2 className="heading-lg text-foreground">
            Mehr als ein Gebäude — ein Versprechen an Ahlen.
          </h2>
        </div>

        <div
          ref={gridRef}
          className="reveal reveal-delay-2 grid gap-x-14 gap-y-10 pt-10 lg:grid-cols-2 lg:gap-x-20 lg:pt-12"
        >
          <div className="space-y-10">
            {leftColumnItems.map((item) => (
              <article key={item.title} className="max-w-[34rem]">
                <p className="mb-2 text-base font-semibold tracking-[-0.01em] text-foreground md:text-lg">
                  {item.title}
                </p>
                <p className="body-lg">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="space-y-10">
            {rightColumnItems.map((item) => (
              <article key={item.title} className="max-w-[34rem]">
                <p className="mb-2 text-base font-semibold tracking-[-0.01em] text-foreground md:text-lg">
                  {item.title}
                </p>
                <p className="body-lg">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;
