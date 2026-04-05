import { Download } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const documents = [
  { name: "Architekturkonzept", subtitle: "Gesamtübersicht" },
  { name: "Grundriss", subtitle: "Erdgeschoss" },
  { name: "Grundriss", subtitle: "Obergeschoss" },
  { name: "Fassadengestaltung", subtitle: "& Materialkonzept" },
  { name: "Schnittzeichnung", subtitle: "Längsschnitt A–A" },
  { name: "Schnittzeichnung", subtitle: "Querschnitt B–B" },
  { name: "Ansichten", subtitle: "Nord & Süd" },
  { name: "Ansichten", subtitle: "Ost & West" },
  { name: "Lageplan", subtitle: "& Außenanlagen" },
  { name: "Tragwerksplanung", subtitle: "Statik Übersicht" },
];

const COLS = 4;
const remainder = documents.length % COLS;
const fillers = remainder === 0 ? 0 : COLS - remainder;

const PDFDownloadSection = () => {
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="px-5 md:px-10 py-16 md:py-24 bg-card">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal mb-10">
          <p className="section-label mb-3">— Dokumente</p>
          <h2 className="heading-md text-foreground">Planungsunterlagen</h2>
        </div>

        <div
          ref={gridRef}
          className="reveal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border"
        >
          {documents.map((doc, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group flex flex-col justify-between gap-8 p-6 md:p-7 bg-card hover:bg-primary transition-colors duration-200"
            >
              <div>
                <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground group-hover:text-primary-foreground transition-colors duration-200 leading-tight">
                  {doc.name}
                </p>
                <p className="font-body text-[11px] tracking-[0.12em] uppercase text-muted-foreground group-hover:text-primary-foreground/70 transition-colors duration-200 mt-0.5 leading-tight">
                  {doc.subtitle}
                </p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary-foreground transition-colors duration-200" />
            </a>
          ))}

          {/* Fill last row so no empty gap cells show */}
          {Array.from({ length: fillers }).map((_, i) => (
            <div key={`filler-${i}`} className="bg-card hidden lg:block" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PDFDownloadSection;
