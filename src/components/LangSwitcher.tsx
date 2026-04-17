// src/components/LangSwitcher.tsx
// Language switcher — real <a href> links, no JS navigation, no cookies.
// Styling and positioning are finalized in Etap 3 when integrated into HeroSection.

import { useLang } from "@/i18n/useLang";

export function LangSwitcher() {
  const { lang, langUrl, t } = useLang();

  return (
    <nav
      aria-label={t.nav.langSwitchLabel}
      className="flex items-center gap-1 text-[15px] md:text-base font-medium"
    >
      <a
        href={langUrl("de")}
        aria-current={lang === "de" ? "page" : undefined}
        className={`px-1 transition-opacity ${
          lang === "de" ? "opacity-100 font-semibold" : "opacity-50 hover:opacity-80"
        }`}
      >
        DE
      </a>
      <span aria-hidden="true" className="opacity-30">
        |
      </span>
      <a
        href={langUrl("tr")}
        aria-current={lang === "tr" ? "page" : undefined}
        className={`px-1 transition-opacity ${
          lang === "tr" ? "opacity-100 font-semibold" : "opacity-50 hover:opacity-80"
        }`}
      >
        TR
      </a>
    </nav>
  );
}
