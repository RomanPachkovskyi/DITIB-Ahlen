import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const ProjectIntro = () => {
  const headerRef = useScrollReveal();
  const bodyRef = useScrollReveal();

  return (
    <section id="projekt" className="px-5 md:px-10 py-20 md:py-28 lg:py-32 -mt-[3px]">
      <div className="max-w-3xl mx-auto">
        <div ref={headerRef} className="reveal mb-8">
          <p className="section-label mb-6">— Über das Projekt</p>
          <h2 className="heading-lg text-foreground">
            Mehr als ein Gebäude — ein Versprechen an die Gemeinschaft.
          </h2>
        </div>

        <div ref={bodyRef} className="reveal reveal-delay-2 space-y-5">
          <p className="body-lg">
            Das DITIB Kulturzentrum Ahlen wird ein modernes Gemeindezentrum,
            das Räume für Bildung, Dialog und kulturelle Begegnung schafft.
            Mit einer Investition von rund 8 Millionen Euro entsteht ein
            architektonisch anspruchsvoller Bau, der Tradition und Moderne verbindet.
          </p>
          <p className="body-md">
            Das Zentrum wird nicht nur der muslimischen Gemeinde dienen, sondern
            allen Bürgerinnen und Bürgern der Stadt Ahlen als offener Ort für
            Austausch und Zusammenhalt zur Verfügung stehen.
          </p>
        </div>

        {/* Subtle geometric divider */}
        <div className="mt-14 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <div className="w-2 h-2 rotate-45 border border-warm-gray" />
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;
