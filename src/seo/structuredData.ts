import type { Translations } from "@/i18n/types";

export type StructuredDataLang = "de" | "tr";

const BASE_URL = "https://ditib-ahlen-projekte.de";
const PRIMARY_IMAGE_WEBP =
  `${BASE_URL}/img/ditib-ahlen-bildungs-begegnungszentrum.webp`;
const PRIMARY_IMAGE_PREVIEW =
  `${BASE_URL}/img/ditib-ahlen-bildungs-begegnungszentrum-preview.jpg`;
const DATE_MODIFIED = "2026-04-17";

const PROJECT_NAME: Record<StructuredDataLang, string> = {
  de: "Bildungs- & Begegnungszentrum DiTiB Ahlen",
  tr: "DiTiB Ahlen Eğitim ve Buluşma Merkezi",
};

const FAQ_DE = [
  {
    question: "Was ist das Bildungs- & Begegnungszentrum von DiTiB Ahlen?",
    answer:
      "Das Bildungs- & Begegnungszentrum ist ein Zukunftsprojekt der DITIB - Türkisch Islamischen Gemeinde zu Ahlen e.V. — ein moderner, vollständig barrierefreier Ort für Bildung, Begegnung und gemeinschaftliches Miteinander in Ahlen (Westf.).",
  },
  {
    question: "Was wird im Zentrum angeboten?",
    answer:
      "Geplant sind Seminar- und Schulungsräume für Sprachkurse und Workshops, großzügige Veranstaltungsräume, eine professionelle Küche sowie speziell ausgestattete Räumlichkeiten für die würdevolle Bestattungsvorbereitung. Rund um das Gebäude entsteht außerdem eine weitläufige Grünfläche.",
  },
  {
    question: "Ist der Neubau barrierefrei zugänglich?",
    answer:
      "Ja. Das Gebäude wird von Anfang an vollständig barrierefrei geplant, sodass alle Räumlichkeiten auch für Menschen mit Mobilitätseinschränkungen problemlos zugänglich sind.",
  },
  {
    question: "Ist das Projekt eine Moschee oder ein Gebetshaus?",
    answer:
      "Nein. Das Bildungs- & Begegnungszentrum ist kein Gebetshaus und kein Ort für religiöse Gottesdienste. Es ist ein modernes Gemeinschaftsgebäude mit dem Schwerpunkt auf Bildung, Begegnung und sozialem Miteinander.",
  },
  {
    question: "Wer ist Bauherr des Projekts?",
    answer:
      "Bauherr ist die DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V. Die Entwurfs- und Tragwerksplanung liegt beim Ingenieurbüro Theismann & Partner (Dipl.-Ing. Bernd Theismann).",
  },
  {
    question: "Wie kann ich das Projekt finanziell unterstützen?",
    answer:
      "Spenden sind über PayPal möglich. Spenden können auf Wunsch anonym erfolgen. Wenn Sie nicht anonym spenden möchten, kann Ihr Name auf der Webseite veröffentlicht werden.",
  },
  {
    question:
      "Kann ich das Projekt auch ohne Geldspende unterstützen?",
    answer:
      "Ja. Unternehmen und Einzelpersonen können das Projekt durch Sachleistungen, Dienstleistungen, fachliche oder handwerkliche Beiträge unterstützen. Konkrete Vorschläge können per E-Mail an info@ditib-ahlen-projekte.de eingereicht werden.",
  },
  {
    question: "Wie nachhaltig ist das Gebäude?",
    answer:
      "Das Gebäude wird mit einer Photovoltaikanlage auf dem Dach und einer modernen Wärmepumpe ausgestattet — für einen energieeffizienten und verantwortungsvollen Betrieb.",
  },
  {
    question: "Wo kann ich den aktuellen Stand des Projekts verfolgen?",
    answer:
      "Den aktuellen Spendenstand und Neuigkeiten zum Baufortschritt finden Sie auf der Projektwebseite ditib-ahlen-projekte.de sowie auf den Social-Media-Kanälen von DiTiB Ahlen.",
  },
];

function localeForLang(lang: StructuredDataLang): string {
  return lang === "de" ? "de-DE" : "tr-TR";
}

function canonicalForLang(lang: StructuredDataLang): string {
  return lang === "de" ? `${BASE_URL}/` : `${BASE_URL}/tr/`;
}

export function buildStructuredData(
  lang: StructuredDataLang,
  t: Translations
) {
  const locale = localeForLang(lang);
  const canonical = canonicalForLang(lang);
  const projectUrl = `${canonical}#projekt`;
  const donateUrl = `${canonical}#spenden`;
  const projectName = PROJECT_NAME[lang];

  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.",
      legalName: "DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.",
      alternateName: [
        "DiTiB Ahlen",
        "DITIB Ahlen",
        "Türkisch Islamische Gemeinde zu Ahlen",
      ],
      url: `${BASE_URL}/`,
      description: t.seoText.organizationDescription,
      email: "info@ditib-ahlen-projekte.de",
      telephone: "+492382615990",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rottmannstr. 62",
        addressLocality: "Ahlen",
        postalCode: "59229",
        addressRegion: "Nordrhein-Westfalen",
        addressCountry: "DE",
      },
      sameAs: [
        "https://www.instagram.com/ditib_ahlen_projekte",
        "https://www.facebook.com/people/Ditib-Ahlen-Projekte/61573315285318",
      ],
      knowsLanguage: ["de", "tr"],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: t.meta.ogTitle,
      description: t.seoText.websiteDescription,
      inLanguage: locale,
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: t.seoText.webpageName,
      description: t.seoText.webpageDescription,
      inLanguage: locale,
      isPartOf: {
        "@id": `${BASE_URL}/#website`,
      },
      about: [
        {
          "@id": `${BASE_URL}/#organization`,
        },
        {
          "@id": `${canonical}#project`,
        },
      ],
      mainEntity: {
        "@id": `${canonical}#project`,
      },
      primaryImageOfPage: {
        "@id": `${canonical}#primary-image`,
      },
      potentialAction: {
        "@id": `${canonical}#donate-action`,
      },
      dateModified: DATE_MODIFIED,
    },
    {
      "@type": "CivicStructure",
      "@id": `${canonical}#project`,
      name: projectName,
      url: projectUrl,
      description: t.seoText.webpageDescription,
      image: {
        "@id": `${canonical}#primary-image`,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rottmannstraße",
        addressLocality: "Ahlen",
        postalCode: "59229",
        addressRegion: "Nordrhein-Westfalen",
        addressCountry: "DE",
      },
      amenityFeature: t.vision.cards.map((card) => ({
        "@type": "LocationFeatureSpecification",
        name: card.title,
        value: true,
      })),
      isAccessibleForFree: true,
      publicAccess: true,
      owner: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      "@type": "ImageObject",
      "@id": `${canonical}#primary-image`,
      contentUrl: PRIMARY_IMAGE_WEBP,
      url: PRIMARY_IMAGE_PREVIEW,
      thumbnailUrl: PRIMARY_IMAGE_PREVIEW,
      caption: t.meta.ogImageAlt,
      description: t.meta.description,
      inLanguage: locale,
      representativeOfPage: true,
      creator: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      "@type": "DonateAction",
      "@id": `${canonical}#donate-action`,
      name: t.hero.cta,
      description: t.companySupport.body,
      recipient: {
        "@id": `${BASE_URL}/#organization`,
      },
      object: {
        "@id": `${canonical}#project`,
      },
      target: {
        "@type": "EntryPoint",
        urlTemplate: donateUrl,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  ];

  if (lang === "de") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      url: `${canonical}#faq`,
      inLanguage: locale,
      isPartOf: {
        "@id": `${canonical}#webpage`,
      },
      about: {
        "@id": `${canonical}#project`,
      },
      mainEntity: FAQ_DE.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function serializeStructuredData(
  lang: StructuredDataLang,
  t: Translations
): string {
  return JSON.stringify(buildStructuredData(lang, t));
}
