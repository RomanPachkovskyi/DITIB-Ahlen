const Footer = () => {
  return (
    <footer className="px-5 md:px-10 py-8 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-body text-xs text-muted-foreground">
          © 2026 DITIB Ahlen · Kulturzentrum Ahlen e.V.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
            Impressum
          </a>
          <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
            Datenschutz
          </a>
          <a href="#" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
