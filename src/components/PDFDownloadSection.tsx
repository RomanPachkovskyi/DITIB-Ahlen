import { useState } from "react";
import { Download, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const documents = [
  {
    index: "01",
    name: "Architekturkonzept",
    subtitle: "Gesamtübersicht",
    size: "4.2 MB",
    pages: "24 Seiten",
  },
  {
    index: "02",
    name: "Grundrissplanung",
    subtitle: "Erdgeschoss",
    size: "2.8 MB",
    pages: "8 Seiten",
  },
  {
    index: "03",
    name: "Grundrissplanung",
    subtitle: "Obergeschoss",
    size: "2.5 MB",
    pages: "8 Seiten",
  },
  {
    index: "04",
    name: "Fassadengestaltung",
    subtitle: "& Materialkonzept",
    size: "3.1 MB",
    pages: "16 Seiten",
  },
];

const PDFDownloadSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const headerRef = useScrollReveal();
  const listRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section className="px-5 md:px-10 py-16 md:py-24 bg-card">
      <div className="max-w-5xl mx-auto">
        <div ref={headerRef} className="reveal mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="section-label mb-3">— Dokumente</p>
            <h2 className="heading-md text-foreground">Planungsunterlagen</h2>
          </div>
          <p className="body-md max-w-xs md:text-right">
            Aktuelle Architekturpläne und Konzeptdokumente zum Download.
          </p>
        </div>

        {/* Document list */}
        <div ref={listRef} className="reveal border-t border-border">
          {documents.map((doc, i) => (
            <a
              key={doc.index}
              href="#"
              onClick={(e) => e.preventDefault()}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group flex items-center gap-5 md:gap-8 py-5 md:py-6 border-b border-border transition-colors duration-200 hover:bg-background/60 px-0 -mx-0"
            >
              {/* Index number */}
              <span
                className={`font-body text-xs tracking-[0.15em] text-muted-foreground/40 transition-colors duration-200 w-6 shrink-0 ${
                  hovered === i ? "text-foreground/60" : ""
                }`}
              >
                {doc.index}
              </span>

              {/* Title block */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-display text-lg md:text-xl font-semibold text-foreground group-hover:text-[#232323] transition-colors duration-200">
                    {doc.name}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    {doc.subtitle}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="hidden md:flex items-center gap-6 text-right shrink-0">
                <span className="font-body text-xs text-muted-foreground/60 tabular-nums">
                  {doc.pages}
                </span>
                <span className="font-body text-xs text-muted-foreground/60 tabular-nums w-14">
                  PDF · {doc.size}
                </span>
              </div>

              {/* Download action */}
              <div
                className={`shrink-0 flex items-center gap-2 transition-all duration-200 ${
                  hovered === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                }`}
              >
                <span className="hidden md:inline font-body text-xs font-medium text-foreground tracking-wider uppercase">
                  Herunterladen
                </span>
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-foreground/30 transition-colors">
                  <Download className="w-3.5 h-3.5 text-foreground" />
                </div>
              </div>

              {/* Arrow (mobile) */}
              <ArrowRight
                className={`md:hidden w-4 h-4 text-muted-foreground transition-all duration-200 shrink-0 ${
                  hovered === i ? "translate-x-1 text-foreground" : ""
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PDFDownloadSection;
