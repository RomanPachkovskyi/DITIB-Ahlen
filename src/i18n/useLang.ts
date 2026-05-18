// src/i18n/useLang.ts
// Determines the active language from the URL — synchronously, no flash.
// Both translation files are imported statically (intentional for 2-language site).

import { useLocation } from "react-router-dom";
import { de } from "./de";
import { tr } from "./tr";
import type { Translations } from "./types";
import type { Lang } from "./langPreference";

const translations: Record<Lang, Translations> = { de, tr };

export function useLang() {
  const { pathname } = useLocation();
  const lang: Lang =
    pathname === "/tr" || pathname.startsWith("/tr/") ? "tr" : "de";

  /** Returns the equivalent URL for the given target language, preserving the current page path. */
  function langUrl(target: Lang): string {
    const stripped = pathname.startsWith("/tr/")
      ? pathname.slice(3)
      : pathname === "/tr"
      ? "/"
      : pathname;
    const base = stripped === "" ? "/" : stripped;
    return target === "de" ? base : `/tr${base === "/" ? "/" : base}`;
  }

  return {
    lang,
    t: translations[lang],
    langUrl,
    isDE: lang === "de",
    isTR: lang === "tr",
  };
}
