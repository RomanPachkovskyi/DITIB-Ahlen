import { useState, useEffect } from "react";
import { X, Settings, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useCookieConsent, type ConsentState } from "@/hooks/use-cookie-consent";

/* ─── Category data ──────────────────────────────────────────────── */

interface Category {
  key: keyof ConsentState;
  label: string;
  description: string;
  required: boolean;
  details: string;
}

const categories: Category[] = [
  {
    key: "necessary",
    label: "Technisch notwendig",
    description: "Erforderlich für die grundlegende Funktion der Website.",
    required: true,
    details:
      "Speichert Ihren Cookie-Einwilligungsstatus im Local Storage des Browsers. Ohne diese Funktion müsste der Hinweis bei jedem Seitenaufruf erneut angezeigt werden. Es werden keine personenbezogenen Daten erhoben.",
  },
  {
    key: "analytics",
    label: "Analyse & Statistik",
    description: "Helfen uns, die Nutzung der Website zu verstehen.",
    required: false,
    details:
      "Derzeit setzen wir keine Analyse-Tools ein. Diese Kategorie ist für eine mögliche zukünftige Einbindung datenschutzfreundlicher Statistik-Tools vorgesehen (z. B. Plausible, Matomo). Erst nach Ihrer Einwilligung würden solche Dienste aktiviert.",
  },
  {
    key: "external",
    label: "Externe Inhalte",
    description: "Ermöglichen die Einbindung externer Medien und Dienste.",
    required: false,
    details:
      "Betrifft die Einbindung externer Inhalte wie eingebettete Videos, Karten oder Social-Media-Beiträge. Beim Laden solcher Inhalte kann Ihre IP-Adresse an Drittanbieter übermittelt werden. Derzeit werden keine externen Inhalte automatisch geladen.",
  },
];

/* ─── Toggle Switch ──────────────────────────────────────────────── */

const Toggle = ({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 shrink-0 ${
      disabled
        ? "bg-primary/60 cursor-not-allowed"
        : checked
        ? "bg-primary cursor-pointer"
        : "bg-gray-300 cursor-pointer hover:bg-gray-400"
    }`}
  >
    <span
      className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
        checked ? "translate-x-[18px]" : "translate-x-[3px]"
      }`}
    />
  </button>
);

/* ─── Expandable Category Row ────────────────────────────────────── */

const CategoryRow = ({
  cat,
  checked,
  onChange,
}: {
  cat: Category;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex-1 flex items-center gap-2 text-left min-w-0"
        >
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          )}
          <div className="min-w-0">
            <p className="font-body text-sm font-medium text-foreground leading-snug">
              {cat.label}
              {cat.required && (
                <span className="text-[10px] text-muted-foreground ml-2 font-normal">
                  (immer aktiv)
                </span>
              )}
            </p>
            <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {cat.description}
            </p>
          </div>
        </button>
        <Toggle checked={checked} onChange={onChange} disabled={cat.required} />
      </div>
      {expanded && (
        <div className="px-4 pb-3 pt-0 border-t border-border">
          <p className="font-body text-xs text-muted-foreground leading-relaxed pt-3">
            {cat.details}
          </p>
        </div>
      )}
    </div>
  );
};

/* ─── Settings Modal ─────────────────────────────────────────────── */

const CookieSettings = ({
  current,
  onSave,
  onAcceptAll,
  onClose,
}: {
  current: ConsentState | null;
  onSave: (c: ConsentState) => void;
  onAcceptAll: () => void;
  onClose: () => void;
}) => {
  const [local, setLocal] = useState<ConsentState>(
    current ?? { necessary: true, analytics: false, external: false }
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full md:max-w-lg bg-background rounded-t-2xl md:rounded-xl max-h-[90svh] md:max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <h2 className="font-body text-lg font-semibold text-foreground">
              Cookie-Einstellungen
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Schließen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto overscroll-contain px-6 py-5 flex-1 space-y-3">
          <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
            Hier können Sie Ihre Einstellungen zur Verwendung von Cookies und
            ähnlichen Technologien anpassen. Detaillierte Informationen finden
            Sie in unserer Datenschutzerklärung.
          </p>
          {categories.map((cat) => (
            <CategoryRow
              key={cat.key}
              cat={cat}
              checked={local[cat.key]}
              onChange={(v) => setLocal((prev) => ({ ...prev, [cat.key]: v }))}
            />
          ))}
        </div>

        {/* Footer buttons */}
        <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={() => onSave(local)}
            className="flex-1 font-body text-sm font-medium px-5 py-2.5 border border-border rounded-xl text-foreground hover:bg-secondary transition-colors"
          >
            Auswahl speichern
          </button>
          <button
            onClick={onAcceptAll}
            className="flex-1 font-body text-sm font-medium px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
          >
            Alle akzeptieren
          </button>
        </div>

        {/* Mobile drag handle */}
        <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border" />
      </div>
    </div>
  );
};

/* ─── Banner ─────────────────────────────────────────────────────── */

const CookieBanner = ({
  onAcceptAll,
  onRejectAll,
  onSettings,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSettings: () => void;
}) => (
  <div className="fixed bottom-0 left-0 right-0 z-[190] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="max-w-3xl mx-auto bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
      <div className="px-5 py-5 md:px-6 md:py-5">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-body text-base font-semibold text-foreground mb-1.5">
              Ihre Privatsphäre ist uns wichtig
            </p>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              Wir verwenden technisch notwendige Speichermethoden, damit diese
              Website funktioniert. Optionale Kategorien werden nur mit Ihrer
              Einwilligung aktiviert. Sie können Ihre Einstellungen jederzeit
              über das Datenschutz-Symbol unten rechts anpassen.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onRejectAll}
            className="flex-1 font-body text-xs font-medium px-4 py-2.5 border border-border rounded-xl text-foreground hover:bg-secondary transition-colors"
          >
            Nur Notwendige
          </button>
          <button
            onClick={onSettings}
            className="flex-1 font-body text-xs font-medium px-4 py-2.5 border border-border rounded-xl text-foreground hover:bg-secondary transition-colors"
          >
            Einstellungen
          </button>
          <button
            onClick={onAcceptAll}
            className="flex-1 font-body text-xs font-medium px-4 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Floating Widget ─────────────────────────────────────────────── */

const STICKY_BAR_H = 66;   // StickyDonateBar: h-16 (64px) + 2px progress line
const STICKY_THRESHOLD = 0.7; // matches StickyDonateBar scroll trigger

const CookieWidget = ({ onClick }: { onClick: () => void }) => {
  const [bottomPx, setBottomPx] = useState(20);

  useEffect(() => {
    const footer = document.querySelector("footer");

    const update = () => {
      const viewH = window.innerHeight;
      const stickyVisible = window.scrollY > viewH * STICKY_THRESHOLD;

      // How far the footer has scrolled into view from the bottom
      const footerInView = footer
        ? Math.max(0, viewH - footer.getBoundingClientRect().top)
        : 0;

      // Base: above sticky bar on mobile, or default 20px on desktop
      const base = stickyVisible ? STICKY_BAR_H + 8 : 20;

      // Lift further if footer is visible
      setBottomPx(Math.max(base, footerInView + 20));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      style={{ bottom: `${bottomPx}px` }}
      className="fixed left-5 z-[180] w-10 h-10 rounded-full bg-[#253e54] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-[bottom,transform] duration-300"
      aria-label="Cookie-Einstellungen öffnen"
      title="Cookie-Einstellungen"
    >
      <Shield className="w-4 h-4" />
    </button>
  );
};

/* ─── Main Export ─────────────────────────────────────────────────── */

const CookieConsent = () => {
  const {
    consent,
    hasConsented,
    showBanner,
    showSettings,
    acceptAll,
    rejectAll,
    saveCustom,
    openSettings,
    closeSettings,
  } = useCookieConsent();

  return (
    <>
      {showBanner && (
        <CookieBanner
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onSettings={openSettings}
        />
      )}

      {showSettings && (
        <CookieSettings
          current={consent}
          onSave={saveCustom}
          onAcceptAll={acceptAll}
          onClose={closeSettings}
        />
      )}

      {hasConsented && !showBanner && !showSettings && (
        <CookieWidget onClick={openSettings} />
      )}
    </>
  );
};

export default CookieConsent;
