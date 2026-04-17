import { useEffect, useId, useState } from "react";
import { X, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useCookieConsent, type ConsentState } from "@/hooks/use-cookie-consent";
import { useLang } from "@/i18n/useLang";
import type { Translations } from "@/i18n/types";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";

/* ─── Category data ──────────────────────────────────────────────── */

interface Category {
  key: keyof ConsentState;
  label: string;
  description: string;
  details: string;
  required: boolean;
}

function getCategories(cookie: Translations["cookie"]): Category[] {
  return [
    {
      key: "necessary",
      label: cookie.categories.necessary.label,
      description: cookie.categories.necessary.description,
      details: cookie.categories.necessary.details,
      required: true,
    },
    {
      key: "analytics",
      label: cookie.categories.analytics.label,
      description: cookie.categories.analytics.description,
      details: cookie.categories.analytics.details,
      required: false,
    },
    {
      key: "external",
      label: cookie.categories.external.label,
      description: cookie.categories.external.description,
      details: cookie.categories.external.details,
      required: false,
    },
  ];
}

/* ─── Toggle Switch ──────────────────────────────────────────────── */

const Toggle = ({
  checked,
  onChange,
  disabled,
  ariaLabel,
  ariaDescribedBy,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  ariaLabel: string;
  ariaDescribedBy: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
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
  alwaysActiveLabel,
}: {
  cat: Category;
  checked: boolean;
  onChange: (v: boolean) => void;
  alwaysActiveLabel: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const descriptionId = useId();
  const detailsId = useId();

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={detailsId}
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
                  ({alwaysActiveLabel})
                </span>
              )}
            </p>
            <p
              id={descriptionId}
              className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed"
            >
              {cat.description}
            </p>
          </div>
        </button>
        <Toggle
          checked={checked}
          onChange={onChange}
          disabled={cat.required}
          ariaLabel={cat.label}
          ariaDescribedBy={descriptionId}
        />
      </div>
      {expanded && (
        <div id={detailsId} className="px-4 pb-3 pt-0 border-t border-border">
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
  const { t } = useLang();
  const categories = getCategories(t.cookie);
  const [local, setLocal] = useState<ConsentState>(
    current ?? { necessary: true, analytics: false, external: false }
  );
  const titleId = useId();
  const descriptionId = useId();

  useLockBodyScroll();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[220] flex items-end md:items-center justify-center">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 w-full md:max-w-lg bg-background rounded-t-2xl md:rounded-xl max-h-[90svh] md:max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <h2 id={titleId} className="font-body text-lg font-semibold text-foreground">
              {t.cookie.modalTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label={t.cookie.closeSettings}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto overscroll-contain px-6 py-5 flex-1 space-y-3">
          <p
            id={descriptionId}
            className="font-body text-xs text-muted-foreground leading-relaxed mb-4"
          >
            {t.cookie.modalDescription}
          </p>
          {categories.map((cat) => (
            <CategoryRow
              key={cat.key}
              cat={cat}
              checked={local[cat.key]}
              onChange={(v) => setLocal((prev) => ({ ...prev, [cat.key]: v }))}
              alwaysActiveLabel={t.cookie.alwaysActive}
            />
          ))}
        </div>

        {/* Footer buttons */}
        <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onSave(local)}
            className="flex h-[52px] w-full items-center justify-center font-body text-sm font-medium px-5 py-0 border border-border rounded-full text-foreground hover:bg-secondary transition-colors sm:flex-1"
          >
            {t.cookie.saveSelection}
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="flex h-[52px] w-full items-center justify-center font-body text-sm font-medium px-5 py-0 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors sm:flex-1"
          >
            {t.cookie.acceptAll}
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
}) => {
  const { t } = useLang();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[190] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl mx-auto bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className="px-5 py-5 md:px-6 md:py-5">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-body text-base font-semibold text-foreground mb-1.5">
                {t.cookie.bannerTitle}
              </p>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                {t.cookie.bannerText}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={onRejectAll}
              className="flex h-[52px] w-full items-center justify-center font-body text-xs font-medium px-4 py-0 border border-border rounded-full text-foreground hover:bg-secondary transition-colors sm:flex-1"
            >
              {t.cookie.rejectAll}
            </button>
            <button
              type="button"
              onClick={onSettings}
              className="flex h-[52px] w-full items-center justify-center font-body text-xs font-medium px-4 py-0 border border-border rounded-full text-foreground hover:bg-secondary transition-colors sm:flex-1"
            >
              {t.cookie.settings}
            </button>
            <button
              type="button"
              onClick={onAcceptAll}
              className="flex h-[52px] w-full items-center justify-center font-body text-xs font-medium px-4 py-0 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors sm:flex-1"
            >
              {t.cookie.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Floating Widget ─────────────────────────────────────────────── */

const STICKY_BAR_H = 66;   // StickyDonateBar: h-16 (64px) + 2px progress line
const STICKY_THRESHOLD = 0.7; // matches StickyDonateBar scroll trigger

const CookieWidget = ({ onClick }: { onClick: () => void }) => {
  const { t } = useLang();
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
      type="button"
      onClick={onClick}
      style={{ bottom: `${bottomPx}px` }}
      className="fixed left-5 z-[180] w-10 h-10 rounded-full bg-[#253e54] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-[bottom,transform] duration-300"
      aria-label={t.cookie.openSettingsAriaLabel}
      title={t.cookie.openSettingsTitle}
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
