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
          <p className="text-foreground font-medium">Inhalt folgt</p>
          <p>Die Kontaktdaten werden hier ergänzt.</p>
        </Modal>
      )}
    </>
  );
};

export default Footer;
