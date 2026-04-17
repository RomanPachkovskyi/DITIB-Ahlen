import { describe, expect, it } from "vitest";
import {
  detectBrowserLang,
  pickSupportedLang,
  readLangPreference,
} from "@/i18n/langPreference";

describe("langPreference", () => {
  it("reads a saved cookie preference when present", () => {
    expect(readLangPreference("foo=bar; preferred_lang=tr; theme=dark")).toBe("tr");
    expect(readLangPreference("preferred_lang=de")).toBe("de");
  });

  it("ignores invalid cookie values", () => {
    expect(readLangPreference("preferred_lang=en")).toBeNull();
    expect(readLangPreference("theme=dark")).toBeNull();
  });

  it("chooses the first supported browser language in order", () => {
    expect(pickSupportedLang(["en-US", "tr-TR", "de-DE"])).toBe("tr");
    expect(pickSupportedLang(["fr", "de-DE", "tr-TR"])).toBe("de");
  });

  it("defaults to German when no supported language is available", () => {
    expect(pickSupportedLang(["en-US", "fr-FR"])).toBeNull();
    expect(detectBrowserLang(["en-US", "fr-FR"])).toBe("de");
  });

  it("falls back to navigator.language when navigator.languages is unavailable", () => {
    expect(detectBrowserLang(undefined, "tr-TR")).toBe("tr");
    expect(detectBrowserLang([], "de-DE")).toBe("de");
  });
});
