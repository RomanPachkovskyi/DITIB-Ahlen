import { FileText, Download } from "lucide-react";

const documents = [
  { name: "Architekturkonzept — Gesamtübersicht", size: "4.2 MB", type: "PDF" },
  { name: "Grundrissplanung Erdgeschoss", size: "2.8 MB", type: "PDF" },
  { name: "Grundrissplanung Obergeschoss", size: "2.5 MB", type: "PDF" },
  { name: "Fassadengestaltung & Materialkonzept", size: "3.1 MB", type: "PDF" },
];

const PDFDownloadSection = () => {
  return (
    <section className="px-5 md:px-10 py-16 md:py-24 bg-card">
      <div className="max-w-3xl mx-auto">
        <p className="section-label mb-4">— Dokumente</p>
        <h2 className="heading-md text-foreground mb-3">
          Planungsunterlagen
        </h2>
        <p className="body-md mb-10 max-w-lg">
          Laden Sie die aktuellen Architekturpläne und Konzeptdokumente herunter.
        </p>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center gap-4 bg-background rounded-sm border border-border/60 px-5 py-4 hover:border-primary/20 transition-colors duration-200 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-sm bg-terracotta-light flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-foreground truncate">
                  {doc.name}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {doc.type} · {doc.size}
                </p>
              </div>
              <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PDFDownloadSection;
