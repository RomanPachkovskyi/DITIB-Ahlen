import { Link } from "react-router-dom";
import { useLang } from "@/i18n/useLang";
import { LangSwitcher } from "@/components/LangSwitcher";
import StickyDonateBar from "@/components/StickyDonateBar";
import Footer from "@/components/Footer";

interface Props {
  children: React.ReactNode;
}

const LegalLayout = ({ children }: Props) => {
  const { lang } = useLang();
  const homeUrl = lang === "tr" ? "/tr/" : "/";
  const backLabel = lang === "tr" ? "Ana sayfaya dön" : "Zur Startseite";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StickyDonateBar />
      {/* Transparent, non-sticky header */}
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-5 flex items-center justify-between">
          <Link to={homeUrl} aria-label="DiTiB Ahlen — Zur Startseite">
            <img
              src="/img/ditib-ahlen-logo.png"
              alt="DiTiB Ahlen"
              className="h-12 w-auto transition-opacity hover:opacity-80"
            />
          </Link>
          <LangSwitcher className="text-sm text-foreground/70" />
        </div>
      </header>

      <main className="flex-1 w-full pt-28">
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-10 md:py-16 legal-page-enter">
          <Link
            to={homeUrl}
            className="inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground transition-colors hover:text-foreground mb-8"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {backLabel}
          </Link>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalLayout;
