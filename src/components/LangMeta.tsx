// src/components/LangMeta.tsx
// Manages all language-dependent <head> tags via react-helmet-async.
// Must be the first element inside <main> in Index.tsx.

import { Helmet } from "react-helmet-async";
import { useLang } from "@/i18n/useLang";
import { serializeStructuredData } from "@/seo/structuredData";

const BASE_URL = "https://ditib-ahlen-projekte.de";
const OG_IMAGE = `${BASE_URL}/img/ditib-ahlen-bildungs-begegnungszentrum-preview.jpg`;
const TWITTER_IMAGE = `${BASE_URL}/img/ditib-ahlen-bildungs-begegnungszentrum-preview.png`;

export function LangMeta() {
  const { t, lang } = useLang();
  const canonical = lang === "de" ? `${BASE_URL}/` : `${BASE_URL}/tr/`;
  const ogLocale = lang === "de" ? "de_DE" : "tr_TR";
  const ogLocaleAlt = lang === "de" ? "tr_TR" : "de_DE";
  const structuredData = serializeStructuredData(lang, t);

  return (
    <Helmet>
      {/* Language attribute on <html> */}
      <html lang={lang} />

      {/* Primary meta */}
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <meta name="language" content={lang} />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hreflang="de" href={`${BASE_URL}/`} />
      <link rel="alternate" hreflang="tr" href={`${BASE_URL}/tr/`} />
      <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="DiTiB Ahlen" />
      <meta property="og:title" content={t.meta.ogTitle} />
      <meta property="og:description" content={t.meta.ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:secure_url" content={OG_IMAGE} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={t.meta.ogImageAlt} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t.meta.twitterTitle} />
      <meta name="twitter:description" content={t.meta.twitterDescription} />
      <meta name="twitter:image" content={TWITTER_IMAGE} />
      <meta name="twitter:image:alt" content={t.meta.ogImageAlt} />

      {/* JSON-LD */}
      <script id="structured-data" type="application/ld+json">
        {structuredData}
      </script>
    </Helmet>
  );
}
