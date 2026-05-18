import { Helmet } from "react-helmet-async";
import { useLang } from "@/i18n/useLang";
import LegalLayout from "@/components/LegalLayout";

const BASE_URL = "https://ditib-ahlen-projekte.de";

const PAGE_SEO = {
  de: {
    title: "Kontakt | DiTiB Ahlen",
    description:
      "Kontaktdaten der DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V. sowie des Ingenieurbüros Theismann & Partner.",
    canonical: `${BASE_URL}/kontakt`,
    heading: "Kontakt",
  },
  tr: {
    title: "İletişim | DiTiB Ahlen",
    description:
      "DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V. ve Ingenieurbüro Theismann & Partner iletişim bilgileri.",
    canonical: `${BASE_URL}/tr/kontakt`,
    heading: "İletişim",
  },
};

const Kontakt = () => {
  const { lang } = useLang();
  const seo = PAGE_SEO[lang];

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: lang === "de" ? "de-DE" : "tr-TR",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${seo.canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "DiTiB Ahlen",
            item: lang === "tr" ? `${BASE_URL}/tr/` : `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: lang === "tr" ? "İletişim" : "Kontakt",
            item: seo.canonical,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.",
        url: `${BASE_URL}/`,
        email: "info@ditib-ahlen-projekte.de",
        telephone: "+492382615990",
        faxNumber: "+492382702397",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rottmannstr. 62",
          addressLocality: "Ahlen",
          postalCode: "59229",
          addressRegion: "Nordrhein-Westfalen",
          addressCountry: "DE",
        },
      },
    ],
  });

  return (
    <LegalLayout>
      <Helmet>
        <html lang={lang} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={seo.canonical} />
        <link rel="alternate" hreflang="de" href={`${BASE_URL}/kontakt`} />
        <link rel="alternate" hreflang="tr" href={`${BASE_URL}/tr/kontakt`} />
        <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/kontakt`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DiTiB Ahlen" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <script type="application/ld+json">{structuredData}</script>
      </Helmet>

      <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
        {seo.heading}
      </h1>

      <div className="space-y-8 font-body">

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Bauherr
          </p>
          <p className="text-base font-semibold text-foreground leading-snug">
            DITIB - Ahlen (Westf.)
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Türkisch Islamische Gemeinde zu Ahlen e.V.
          </p>
          <p className="text-sm text-muted-foreground mt-1">Rottmannstr. 62, 59229 Ahlen</p>
          <p className="text-sm text-muted-foreground mt-1">
            Fon 02382/61599 &nbsp;·&nbsp; Fax 02382/702397
          </p>
          <a
            href="mailto:info@ditib-ahlen-projekte.de"
            className="text-sm text-foreground hover:text-primary transition-colors mt-1 inline-block"
          >
            info@ditib-ahlen-projekte.de
          </a>
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
            Entwurfsverfasser / Tragwerksplanung
          </p>
          <p className="text-base font-semibold text-foreground leading-snug">
            Ingenieurbüro Theismann & Partner
          </p>
          <p className="text-sm text-muted-foreground mt-1">Dipl.-Ing. Bernd Theismann</p>
          <p className="text-sm text-muted-foreground mt-1">Nordstraße 29, 59227 Ahlen</p>
          <p className="text-sm text-muted-foreground mt-1">
            Fon 02382/85050 &nbsp;·&nbsp; Fax 02382/85051
          </p>
          <a
            href="mailto:info@theismannundpartner.de"
            className="text-sm text-foreground hover:text-primary transition-colors mt-1 inline-block"
          >
            info@theismannundpartner.de
          </a>
        </div>

      </div>
    </LegalLayout>
  );
};

export default Kontakt;
