import { Download } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/useLang";

// Document names and file paths stay in German per TZ §10
const documents = [
  { name: "Lageplan", subtitle: "Rottmannstraße", file: "Lageplan_Ditib_Ahlen_Rottmannstraße.pdf" },
  { name: "Freiflächenplan", subtitle: "Außenanlagen", file: "Freiflächenplan_Ditib_Ahlen_Rottmannstraße.pdf" },
  { name: "Freiflächen Poster", subtitle: "Übersicht", file: "Poster_Freiflächenplan_DITIB_Ahlen.pdf" },
  { name: "Ansichten", subtitle: "Genehmigungsplanung", file: "Genehmigungsplanung_Ditib_Ahlen_GE02_Ansichten.pdf" },
  { name: "Kellergeschoss", subtitle: "Grundriss", file: "Genehmigungsplanung_Ditib_Ahlen_GE03_KG.pdf" },
  { name: "Erdgeschoss", subtitle: "Grundriss", file: "Genehmigungsplanung_Ditib_Ahlen_GE04_EG.pdf" },
  { name: "1. Obergeschoss", subtitle: "Grundriss", file: "Genehmigungsplanung_Ditib_Ahlen_GE05_1.OG.pdf" },
  { name: "2. Obergeschoss", subtitle: "Grundriss", file: "Genehmigungsplanung_Ditib_Ahlen_GE06_2.OG.pdf" },
  { name: "Draufsicht", subtitle: "Genehmigungsplanung", file: "Genehmigungsplanung_Ditib_Ahlen_GE07_Draufsicht.pdf" },
  { name: "Gebäudeschnitt", subtitle: "Genehmigungsplanung", file: "Genehmigungsplanung_Ditib_Ahlen_GE08_Schnitt.pdf" },
];

const COLS = 4;
const remainder = documents.length % COLS;
const fillers = remainder === 0 ? 0 : COLS - remainder;

const PDFDownloadSection = () => {
  const { t } = useLang();
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="px-5 md:px-10 py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal mb-10">
          <p className="section-label mb-3">{t.pdf.label}</p>
          <h2 className="heading-md text-foreground">{t.pdf.heading}</h2>
        </div>

        <div
          ref={gridRef}
          className="reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border"
        >
          {documents.map((doc, i) => (
            <a
              key={i}
              href={`/pdf/${doc.file}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${doc.name} — ${t.pdf.linkAriaLabel}`}
              className="group flex flex-col justify-between gap-8 p-6 md:p-7 bg-white hover:bg-primary transition-colors duration-200"
            >
              <div>
                <p className="font-body text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground group-hover:text-primary-foreground transition-colors duration-200 leading-tight">
                  {doc.name}
                </p>
                <p className="font-body text-[11px] tracking-[0.12em] uppercase text-muted-foreground group-hover:text-primary-foreground/70 transition-colors duration-200 mt-0.5 leading-tight">
                  {doc.subtitle}
                </p>
              </div>
              <Download className="w-8 h-8 md:w-4 md:h-4 text-muted-foreground/50 group-hover:text-primary-foreground transition-colors duration-200" />
            </a>
          ))}

          {/* Fill last row so no empty gap cells show */}
          {Array.from({ length: fillers }).map((_, i) => (
            <div key={`filler-${i}`} className="bg-white hidden lg:block" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PDFDownloadSection;
