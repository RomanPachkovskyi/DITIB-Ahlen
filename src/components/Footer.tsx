import { useState } from "react";
import Modal from "./Modal";

type ModalType = "impressum" | "datenschutz" | "kontakt" | null;

const Footer = () => {
  const [open, setOpen] = useState<ModalType>(null);
  const close = () => setOpen(null);

  return (
    <>
      <footer className="px-5 md:px-10 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-body text-xs text-muted-foreground">
            © 2026 DITIB Ahlen · Kulturzentrum Ahlen e.V.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setOpen("impressum")}
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Impressum
            </button>
            <button
              onClick={() => setOpen("datenschutz")}
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Datenschutz
            </button>
            <button
              onClick={() => setOpen("kontakt")}
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Kontakt
            </button>
          </div>
        </div>
      </footer>

      {open === "impressum" && (
        <Modal title="Impressum" onClose={close}>
          <p className="text-foreground font-medium">Inhalt folgt</p>
          <p>Die vollständigen Angaben gemäß § 5 TMG werden hier ergänzt.</p>
        </Modal>
      )}

      {open === "datenschutz" && (
        <Modal title="Datenschutzerklärung" onClose={close}>
          <p className="text-foreground font-medium">Inhalt folgt</p>
          <p>Die Datenschutzerklärung gemäß DSGVO wird hier ergänzt.</p>
        </Modal>
      )}

      {open === "kontakt" && (
        <Modal title="Kontakt" onClose={close}>
          <div className="space-y-8">

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Bauherr</p>
              <p className="font-display text-base font-semibold text-foreground leading-snug">DITIB - Ahlen (Westf.)</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Türkisch Islamische Kultur Verein e.V.</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Rottmannstr. 62, 59229 Ahlen</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Fon 02382/61599 &nbsp;·&nbsp; Fax 02382/702397</p>
              <a href="mailto:info@ditib-ahlen-projekte.de" className="font-body text-sm text-foreground hover:text-primary transition-colors mt-1 inline-block">
                info@ditib-ahlen-projekte.de
              </a>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Entwurfsverfasser / Tragwerksplanung</p>
              <p className="font-display text-base font-semibold text-foreground leading-snug">Ingenieurbüro Theismann & Partner</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Dipl.-Ing. Bernd Theismann</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Nordstraße 29, 59227 Ahlen</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Fon 02382/85050 &nbsp;·&nbsp; Fax 02382/85051</p>
              <a href="mailto:info@theismannundpartner.de" className="font-body text-sm text-foreground hover:text-primary transition-colors mt-1 inline-block">
                info@theismannundpartner.de
              </a>
            </div>

          </div>
        </Modal>
      )}
    </>
  );
};

export default Footer;
