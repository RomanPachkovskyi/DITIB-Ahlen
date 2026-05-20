import { Helmet } from "react-helmet-async";
import { useLang } from "@/i18n/useLang";
import LegalLayout from "@/components/LegalLayout";

const BASE_URL = "https://ditib-ahlen-projekte.de";

const PAGE_SEO = {
  de: {
    title: "Impressum | DiTiB Ahlen",
    description:
      "Pflichtangaben gemäß § 5 DDG — DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V., Rottmannstr. 62, 59229 Ahlen.",
    canonical: `${BASE_URL}/impressum`,
  },
  tr: {
    title: "Impressum | DiTiB Ahlen",
    description:
      "§ 5 DDG uyarınca zorunlu bilgiler — DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V., Rottmannstr. 62, 59229 Ahlen.",
    canonical: `${BASE_URL}/tr/impressum`,
  },
};

const Impressum = () => {
  const { lang } = useLang();
  const seo = PAGE_SEO[lang];

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${seo.canonical}#webpage`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: lang === "de" ? "de-DE" : "tr-TR",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        about: { "@id": `${BASE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.",
        url: `${BASE_URL}/`,
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
            name: "Impressum",
            item: seo.canonical,
          },
        ],
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
        <link rel="alternate" hreflang="de" href={`${BASE_URL}/impressum`} />
        <link rel="alternate" hreflang="tr" href={`${BASE_URL}/tr/impressum`} />
        <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/impressum`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DiTiB Ahlen" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <script type="application/ld+json">{structuredData}</script>
      </Helmet>

      <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
        Impressum
      </h1>

      <div className="space-y-6 font-body text-sm text-muted-foreground leading-relaxed">

        <p className="text-sm">
          Dieses Impressum gilt für alle Webangebote der DITIB – Türkisch Islamische Gemeinde zu
          Ahlen e. V., einschließlich der Projektwebseite{" "}
          <strong className="text-foreground">ditib-ahlen-projekte.de</strong> und des
          Mitgliederportals{" "}
          <strong className="text-foreground">mitglied.ditib-ahlen-projekte.de</strong>.
        </p>

        <div>
          <h2 className="font-semibold text-foreground mb-2">Angaben gemäß § 5 DDG</h2>
          <p>
            <strong className="text-foreground">DITIB – Türkisch Islamische Gemeinde zu Ahlen e. V.</strong><br />
            Rottmannstr. 62<br />
            59229 Ahlen<br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">Vertretungsberechtigte Personen</h2>
          <p>Ali Koca — 1. Vorsitzender</p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">Kontakt</h2>
          <p>
            Telefon: 02382 / 61599<br />
            Fax: 02382 / 702397<br />
            E-Mail:{" "}
            <a href="mailto:info@ditib-ahlen-projekte.de" className="text-primary hover:underline">
              info@ditib-ahlen-projekte.de
            </a><br />
            Website: www.ditib-ahlen-projekte.de
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">Registereintrag</h2>
          <p>
            Eingetragen im Vereinsregister.<br />
            Registergericht: Amtsgericht Münster<br />
            Registernummer: VR 50380
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">Steuernummer</h2>
          <p>304/5861/0097</p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">
            Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV
          </h2>
          <p>
            Ali Koca<br />
            Rottmannstr. 62, 59229 Ahlen
          </p>
        </div>

        <div className="h-px bg-border" />

        <div>
          <h2 className="font-semibold text-foreground mb-2">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
            Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
            konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
            keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
            übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt
            der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
            Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
            verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
            zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
            umgehend entfernen.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
            und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien
            dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit
            die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
            Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
            aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </div>

      </div>
    </LegalLayout>
  );
};

export default Impressum;
