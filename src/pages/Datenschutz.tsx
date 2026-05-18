import { Helmet } from "react-helmet-async";
import { useLang } from "@/i18n/useLang";
import LegalLayout from "@/components/LegalLayout";

const BASE_URL = "https://ditib-ahlen-projekte.de";

const PAGE_SEO = {
  de: {
    title: "Datenschutzerklärung | DiTiB Ahlen",
    description:
      "Informationen zum Datenschutz gemäß DSGVO auf der Projektwebseite von DiTiB Ahlen — Hosting, Cookies, Google Maps, Instagram, Analytics.",
    canonical: `${BASE_URL}/datenschutz`,
  },
  tr: {
    title: "Gizlilik Politikası | DiTiB Ahlen",
    description:
      "DiTiB Ahlen proje web sitesinde GDPR kapsamında kişisel verilerin korunmasına ilişkin bilgiler.",
    canonical: `${BASE_URL}/tr/datenschutz`,
  },
};

const Datenschutz = () => {
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
            name: lang === "tr" ? "Gizlilik Politikası" : "Datenschutzerklärung",
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
        <link rel="alternate" hreflang="de" href={`${BASE_URL}/datenschutz`} />
        <link rel="alternate" hreflang="tr" href={`${BASE_URL}/tr/datenschutz`} />
        <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/datenschutz`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DiTiB Ahlen" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <script type="application/ld+json">{structuredData}</script>
      </Helmet>

      <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
        {lang === "tr" ? "Gizlilik Politikası" : "Datenschutzerklärung"}
      </h1>

      <div className="space-y-6 font-body text-sm text-muted-foreground leading-relaxed">

        <div>
          <h2 className="font-semibold text-foreground mb-2">1. Verantwortlicher</h2>
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
          <p className="mt-2">
            <strong className="text-foreground">DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.</strong><br />
            Rottmannstr. 62<br />
            59229 Ahlen<br />
            Vertreten durch: Ali Koca (1. Vorsitzender)<br />
            Telefon: 02382 / 61599<br />
            E-Mail:{" "}
            <a href="mailto:info@ditib-ahlen-projekte.de" className="text-primary hover:underline">
              info@ditib-ahlen-projekte.de
            </a><br />
            Website: www.ditib-ahlen-projekte.de<br />
            Vereinsregister: Amtsgericht Münster, VR 50380<br />
            Steuernummer: 304/5861/0097
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">2. Hosting</h2>
          <p>
            Diese Website wird bei einem externen technischen Hosting-Dienstleister betrieben.
            Beim Hosting werden die für den technischen Betrieb und die Auslieferung der Website
            erforderlichen Daten verarbeitet. Soweit der Hosting-Anbieter personenbezogene Daten
            in unserem Auftrag verarbeitet, erfolgt dies im Rahmen einer Auftragsverarbeitung
            gemäß Art. 28 DSGVO.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">3. Server-Log-Dateien</h2>
          <p>
            Beim Aufruf der Website verarbeitet der Webserver automatisch technisch erforderliche
            Zugriffsdaten. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
            aufgerufene Datei, Referrer, Browsertyp, Browserversion, Betriebssystem und Hostname
            des zugreifenden Rechners gehören.
          </p>
          <p className="mt-2">
            Die Verarbeitung erfolgt, um die Website technisch bereitzustellen, die Stabilität und
            Sicherheit des Betriebs zu gewährleisten und Missbrauch nachzuvollziehen.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Speicherdauer:</strong> Server-Log-Daten werden nur
            so lange gespeichert, wie dies für den sicheren Betrieb und die Fehleranalyse
            erforderlich ist.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">4. Cookie-Einwilligung und Local Storage</h2>
          <p>
            Beim ersten Aufruf dieser Website wird Ihnen ein Cookie-Hinweis (Consent-Banner)
            angezeigt. Dort können Sie entscheiden, welche Kategorien von Datenverarbeitungen Sie
            zulassen möchten:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong className="text-foreground">Technisch notwendig</strong> (immer aktiv):
              Speichert Ihren Einwilligungsstatus im Local Storage des Browsers (Schlüssel:{" "}
              <code className="text-xs bg-secondary px-1 py-0.5 rounded">ditib_cookie_consent</code>).
              Es werden dabei eine Versionsnummer, ein Zeitstempel und Ihre gewählten Einstellungen
              gespeichert — keine personenbezogenen Daten.
            </li>
            <li>
              <strong className="text-foreground">Analyse & Statistik</strong> (optional): Bei
              Ihrer Einwilligung aktivieren wir Google Analytics 4 und Microsoft Clarity zur
              Reichweitenmessung, Nutzungsanalyse und Verbesserung der Website.
            </li>
            <li>
              <strong className="text-foreground">Externe Inhalte</strong> (optional): Betrifft
              insbesondere die interaktive Google-Maps-Karte, aktuelle Instagram-Beiträge sowie
              weitere mögliche externe Medien. Diese Inhalte werden erst nach Ihrer Einwilligung
              geladen.
            </li>
          </ul>
          <p className="mt-2">
            Sie können Ihre Einstellungen jederzeit über das Datenschutz-Symbol (unten rechts)
            ändern oder widerrufen.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG
            (technisch notwendig) bzw. § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO
            (optionale Kategorien, nur nach Einwilligung).
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Speicherdauer:</strong> Bis zur Löschung durch
            Ihren Browser oder bis zur Zurücksetzung der Cookie-Einstellungen.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">5. Schriftarten (Self-Hosting)</h2>
          <p>
            Diese Website verwendet die Schriftarten „Inter" und „Playfair Display". Die
            Schriftdateien werden lokal auf unserem Server gehostet. Beim Laden der Schriftarten
            wird keine Verbindung zu externen Servern (z. B. Google) hergestellt. Es werden keine
            personenbezogenen Daten an Dritte übermittelt.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">6. Kontaktaufnahme per E-Mail und Telefon</h2>
          <p>
            Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen
            mitgeteilten Daten zur Bearbeitung Ihrer Anfrage.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b
            DSGVO, soweit Ihre Anfrage auf den Abschluss oder die Durchführung eines Vertrages
            gerichtet ist, andernfalls Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Speicherdauer:</strong> Nur so lange, wie dies zur
            Bearbeitung Ihrer Anfrage erforderlich ist, sofern keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">7. Google Maps</h2>
          <p>
            Auf dieser Website ist eine interaktive Karte von Google Maps eingebunden. Die Karte
            wird nicht automatisch geladen, sondern erst, wenn Sie in die Kategorie „Externe
            Inhalte" einwilligen oder im Kartenbereich ausdrücklich auf „Karte laden" klicken.
            Erst danach wird eine Verbindung zu Servern von Google hergestellt.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Anbieter:</strong> Google Ireland Limited, Gordon
            House, Barrow Street, Dublin 4, Irland.
          </p>
          <p className="mt-2">
            Beim Laden der Karte können insbesondere Ihre IP-Adresse, Browser- und Gerätedaten,
            Referrer-Informationen sowie je nach Konfiguration und Google-Dienst auch Angaben zu
            Ihrer ungefähren Standortregion an Google übermittelt werden. Auf diese
            Datenverarbeitung durch Google haben wir nach dem Laden der Karte keinen vollständigen
            Einfluss.
          </p>
          <p className="mt-2">
            Weitere Informationen finden Sie in der{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Datenschutzerklärung von Google
            </a>
            , in den Informationen dazu,{" "}
            <a
              href="https://policies.google.com/technologies/location-data"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              wie Google Standortinformationen verwendet
            </a>
            , sowie in der{" "}
            <a
              href="https://developers.google.com/maps/documentation/javascript"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Dokumentation zur Maps JavaScript API
            </a>
            .
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Rechtsgrundlage:</strong> § 25 Abs. 1 TDDDG
            i. V. m. Art. 6 Abs. 1 lit. a DSGVO.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Widerruf:</strong> Sie können eine erteilte
            Einwilligung jederzeit mit Wirkung für die Zukunft über das Datenschutz-Symbol unten
            rechts widerrufen. Bereits aufgebaute Verbindungen zu Google können dadurch für die
            Vergangenheit jedoch nicht rückgängig gemacht werden.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">8. Instagram-Beiträge</h2>
          <p>
            Auf dieser Website können aktuelle Beiträge unseres Instagram-Profils angezeigt
            werden. Die Beiträge werden über einen serverseitigen Feed unseres Webservers
            vorbereitet und als Vorschaubilder, Bild- oder Videovorschauen, Bildunterschriften,
            Zeitangaben, Permalinks sowie gegebenenfalls Reaktionszahlen dargestellt.
          </p>
          <p className="mt-2">
            Der Instagram-Feed wird nicht automatisch geladen, sondern erst, wenn Sie in die
            Kategorie „Externe Inhalte" einwilligen oder im Instagram-Bereich ausdrücklich auf
            „Instagram-Beiträge laden" klicken. Erst danach ruft Ihr Browser die für die
            Darstellung erforderlichen Feed- und Mediendateien von unserem Server ab. Beim
            Anklicken eines Beitrags werden Sie zu Instagram weitergeleitet; dort gelten die
            Datenschutzinformationen von Instagram/Meta.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Anbieter des Instagram-Dienstes:</strong> Meta
            Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.
          </p>
          <p className="mt-2">
            Weitere Informationen finden Sie in der{" "}
            <a
              href="https://privacycenter.instagram.com/policy/"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Datenschutzerklärung von Instagram
            </a>{" "}
            und in den{" "}
            <a
              href="https://www.facebook.com/privacy/policy/"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Datenschutzinformationen von Meta
            </a>
            .
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Rechtsgrundlage:</strong> § 25 Abs. 1 TDDDG
            i. V. m. Art. 6 Abs. 1 lit. a DSGVO.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Widerruf:</strong> Sie können eine erteilte
            Einwilligung jederzeit mit Wirkung für die Zukunft über das Datenschutz-Symbol unten
            rechts widerrufen.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">9. Externe Links</h2>
          <p>
            Diese Website enthält Links zu externen Websites (z. B. Instagram, Facebook oder
            Google Maps als externe Vollansicht). Erst wenn Sie einen solchen Link aktiv anklicken,
            wird eine Verbindung zum jeweiligen Drittanbieter hergestellt. Für die
            Datenverarbeitung auf den verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">10. Spenden über externe Zahlungsdienste</h2>
          <p>
            Wenn Sie auf einen Spendenlink klicken, werden Sie auf die Website des jeweiligen
            Zahlungsdienstleisters weitergeleitet. Dabei können insbesondere Ihre IP-Adresse,
            technische Verbindungsdaten sowie weitere von Ihnen dort eingegebene Zahlungs- oder
            Kontaktdaten durch den jeweiligen Anbieter verarbeitet werden.
          </p>
          <p className="mt-2">
            Auf dieser Website selbst werden keine Zahlungsdaten erhoben oder gespeichert. Für die
            Datenverarbeitung auf der Zahlungsseite ist ausschließlich der jeweilige
            Zahlungsdienstleister verantwortlich.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">11. SSL-/TLS-Verschlüsselung</h2>
          <p>
            Diese Website nutzt eine SSL-/TLS-Verschlüsselung, um die Übertragung vertraulicher
            Inhalte zu schützen.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">12. Analyse- und Tracking-Dienste</h2>
          <p>
            Sofern Sie im Consent-Banner in die Kategorie „Analyse & Statistik" einwilligen,
            verwenden wir Google Analytics 4 und Microsoft Clarity. Diese Dienste helfen uns zu
            verstehen, wie Besucherinnen und Besucher unsere Website nutzen, welche Inhalte
            relevant sind und an welchen Stellen wir die Nutzererfahrung verbessern können.
          </p>
          <p className="mt-2">
            Google Analytics 4 wird erst nach Ihrer Einwilligung geladen und im Basic Consent Mode
            betrieben. Microsoft Clarity wird ebenfalls erst nach Ihrer Einwilligung geladen. Ohne
            Ihre Zustimmung werden diese Dienste auf dieser Website nicht aktiviert.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Google Analytics 4:</strong> Anbieter ist Google
            Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Weitere Informationen
            finden Sie in der{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Datenschutzerklärung von Google
            </a>{" "}
            und in den Informationen zu{" "}
            <a
              href="https://support.google.com/analytics/answer/12017362"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Google Analytics 4
            </a>
            .
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Microsoft Clarity:</strong> Anbieter ist Microsoft
            Corporation, One Microsoft Way, Redmond, WA 98052-6399, USA. Weitere Informationen
            finden Sie in der{" "}
            <a
              href="https://privacy.microsoft.com/privacystatement"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Datenschutzerklärung von Microsoft
            </a>{" "}
            sowie in den Informationen zu{" "}
            <a
              href="https://learn.microsoft.com/en-us/clarity/clarity-consent-api-v2"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Clarity ConsentV2
            </a>
            .
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Hinweis zu Google Search Console:</strong> Die
            Google Search Console ist ein reines Webmaster-/Indexierungswerkzeug und wird nicht
            als Tracking-Skript im Browser Ihrer Besucherinnen und Besucher geladen.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Rechtsgrundlage:</strong> § 25 Abs. 1 TDDDG
            i. V. m. Art. 6 Abs. 1 lit. a DSGVO.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Widerruf:</strong> Sie können Ihre Einwilligung
            jederzeit über das Datenschutz-Symbol unten rechts mit Wirkung für die Zukunft ändern
            oder widerrufen.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">13. Ihre Rechte</h2>
          <p>
            Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
            personenbezogenen Daten:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
            <li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">14. Beschwerderecht bei einer Aufsichtsbehörde</h2>
          <p>
            Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung
            Ihrer personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde in
            Nordrhein-Westfalen ist der Landesbeauftragte für Datenschutz und
            Informationsfreiheit (LDI NRW), Postfach 20 04 44, 40102 Düsseldorf.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">15. Keine automatisierte Entscheidungsfindung</h2>
          <p>
            Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von
            Art. 22 DSGVO findet im Rahmen dieser Website nicht statt.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-foreground mb-2">16. Aktualisierung dieser Datenschutzerklärung</h2>
          <p>
            Wir passen diese Datenschutzerklärung an, wenn dies aufgrund rechtlicher, technischer
            oder organisatorischer Änderungen erforderlich wird. Stand: Mai 2026.
          </p>
        </div>

      </div>
    </LegalLayout>
  );
};

export default Datenschutz;
