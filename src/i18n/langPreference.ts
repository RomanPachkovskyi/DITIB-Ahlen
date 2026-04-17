export type Lang = "de" | "tr";

export const LANG_COOKIE_NAME = "preferred_lang";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function normalizeLang(value?: string | null): Lang | null {
  const normalized = value?.trim().toLowerCase();

  if (normalized === "de" || normalized === "tr") {
    return normalized;
  }

  return null;
}

export function readLangPreference(cookieSource: string): Lang | null {
  const match = cookieSource.match(
    new RegExp(`(?:^|;\\s*)${LANG_COOKIE_NAME}=(de|tr)(?:;|$)`, "i")
  );

  return normalizeLang(match?.[1] ?? null);
}

export function pickSupportedLang(candidates: readonly string[]): Lang | null {
  for (const candidate of candidates) {
    const baseLang = candidate.trim().toLowerCase().split(/[-_]/, 1)[0];
    const normalized = normalizeLang(baseLang);

    if (normalized) {
      return normalized;
    }
  }

  return null;
}

export function detectBrowserLang(
  languages?: readonly string[] | null,
  language?: string | null
): Lang {
  const candidates =
    languages && languages.length > 0
      ? languages
      : language
        ? [language]
        : [];

  return pickSupportedLang(candidates) ?? "de";
}

export function persistLangPreference(lang: Lang) {
  if (typeof document === "undefined") {
    return;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = [
    `${LANG_COOKIE_NAME}=${lang}`,
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
    "Path=/",
    "SameSite=Lax",
    secure,
  ]
    .filter(Boolean)
    .join("; ");
}
