import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-background/95 backdrop-blur-sm border-b border-border/60">
        <div className="max-w-5xl mx-auto px-5 md:px-10 h-14 flex items-center justify-between">
          <span className="font-body text-xs font-medium tracking-[0.18em] uppercase text-foreground/70">
            DITIB Ahlen
          </span>
          <a
            href="#spenden"
            className="inline-flex h-[52px] items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-xs font-medium px-5 py-0 rounded-full transition-all duration-300 hover:scale-[1.04]"
          >
            <Heart className="w-3.5 h-3.5" />
            Jetzt spenden
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
