// src/components/LangSwitcher.tsx
// Language switcher — real <a href> links, no JS navigation, no cookies.
// Styling and positioning are finalized in Etap 3 when integrated into HeroSection.

import { useLang } from "@/i18n/useLang";
import { cn } from "@/lib/utils";

export function LangSwitcher({ className }: { className?: string }) {
  const { lang, langUrl, t } = useLang();

  return (
    <nav
      aria-label={t.nav.langSwitchLabel}
      className={cn("flex items-center gap-1 text-[15px] md:text-base font-medium", className)}
    >
      <a
        href={langUrl("de")}
        aria-current={lang === "de" ? "page" : undefined}
        className={cn("px-1 transition-opacity", 
          lang === "de" ? "opacity-100 font-semibold" : "opacity-50 hover:opacity-80"
        )}
      >
        DE
      </a>
      <span aria-hidden="true" className="opacity-30">
        |
      </span>
      <a
        href={langUrl("tr")}
        aria-current={lang === "tr" ? "page" : undefined}
        className={cn("px-1 transition-opacity",
          lang === "tr" ? "opacity-100 font-semibold" : "opacity-50 hover:opacity-80"
        )}
      >
        TR
      </a>
    </nav>
  );
}
