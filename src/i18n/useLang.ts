// src/i18n/useLang.ts
// Determines the active language from the URL — synchronously, no flash.
// Both translation files are imported statically (intentional for 2-language site).

import { useLocation } from "react-router-dom";
import { de } from "./de";
import { tr } from "./tr";
import type { Translations } from "./types";

export type Lang = "de" | "tr";

const translations: Record<Lang, Translations> = { de, tr };

export function useLang() {
  const { pathname } = useLocation();
  const lang: Lang =
    pathname === "/tr" || pathname.startsWith("/tr/") ? "tr" : "de";

  /** Returns the canonical URL for the given target language. */
  function langUrl(target: Lang): string {
    return target === "de" ? "/" : "/tr";
  }

  return {
    lang,
    t: translations[lang],
    langUrl,
    isDE: lang === "de",
    isTR: lang === "tr",
  };
}
