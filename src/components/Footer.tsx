import { useState } from "react";
import Modal from "./Modal";

type ModalType = "impressum" | "datenschutz" | "kontakt" | null;

const Footer = () => {
  const [open, setOpen] = useState<ModalType>(null);
  const close = () => setOpen(null);

  return (
    <>
      <footer className="px-5 py-10 md:px-10 md:py-8 bg-[#253e54]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-4 text-center md:text-left">
          <div className="order-3 font-body text-xs text-white/50 md:order-1">
            © 2026 DITIB Ahlen · Kulturzentrum Ahlen e.V.
          </div>
          <div className="order-1 flex flex-wrap items-center justify-center gap-2 md:order-2 md:gap-6">
            <button
              onClick={() => setOpen("impressum")}
              className="rounded-full px-4 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white md:px-0 md:py-0 md:text-xs md:hover:bg-transparent"
            >
              Impressum
            </button>
            <button
              onClick={() => setOpen("datenschutz")}
              className="rounded-full px-4 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white md:px-0 md:py-0 md:text-xs md:hover:bg-transparent"
            >
              Datenschutz
            </button>
            <button
              onClick={() => setOpen("kontakt")}
              className="rounded-full px-4 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white md:px-0 md:py-0 md:text-xs md:hover:bg-transparent"
            >
              Kontakt
            </button>
          </div>
          <a
            href="https://munas-print.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="order-2 font-body text-xs text-white/60 hover:text-white transition-colors md:order-3 md:text-right"
          >
            Digitales Handwerk mit ♥ bei Munas-Print
          </a>
        </div>
      </footer>

      {open === "impressum" && (
        <Modal title="Impressum" onClose={close}>
          <div className="space-y-6">

            <div>
              <p className="font-semibold text-foreground mb-2">Angaben gemäß § 5 DDG</p>
              <p>
                <strong className="text-foreground">DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.</strong><br />
                Rottmannstr. 62<br />
                59229 Ahlen<br />
                Deutschland
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Vertretungsberechtigte Personen</p>
              <p>Ali Koca — 1. Vorsitzender</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Kontakt</p>
              <p>
                Telefon: 02382 / 61599<br />
                Fax: 02382 / 702397<br />
                E-Mail: <a href="mailto:info@ditib-ahlen-projekte.de" className="text-primary hover:underline">info@ditib-ahlen-projekte.de</a><br />
                Website: www.ditib-ahlen-projekte.de
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Registereintrag</p>
              <p>
                Eingetragen im Vereinsregister.<br />
                Registergericht: Amtsgericht Münster<br />
                Registernummer: VR 50380
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Steuernummer</p>
              <p>304/5861/0097</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</p>
              <p>
                Ali Koca<br />
                Rottmannstr. 62, 59229 Ahlen
              </p>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="font-semibold text-foreground mb-2">Haftung für Inhalte</p>
              <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Haftung für Links</p>
              <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Urheberrecht</p>
              <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
            </div>

          </div>
        </Modal>
      )}

      {open === "datenschutz" && (
        <Modal title="Datenschutzerklärung" onClose={close}>
          <div className="space-y-6">

            <div>
              <p className="font-semibold text-foreground mb-2">1. Verantwortlicher</p>
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
              <p className="mt-2">
                <strong className="text-foreground">DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.</strong><br />
                Rottmannstr. 62<br />
                59229 Ahlen<br />
                Vertreten durch: Ali Koca (1. Vorsitzender)<br />
                Telefon: 02382 / 61599<br />
                E-Mail: <a href="mailto:info@ditib-ahlen-projekte.de" className="text-primary hover:underline">info@ditib-ahlen-projekte.de</a><br />
                Website: www.ditib-ahlen-projekte.de<br />
                Vereinsregister: Amtsgericht Münster, VR 50380<br />
                Steuernummer: 304/5861/0097
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">2. Hosting</p>
              <p>Diese Website wird bei einem externen technischen Hosting-Dienstleister betrieben. Beim Hosting werden die für den technischen Betrieb und die Auslieferung der Website erforderlichen Daten verarbeitet. Soweit der Hosting-Anbieter personenbezogene Daten in unserem Auftrag verarbeitet, erfolgt dies im Rahmen einer Auftragsverarbeitung gemäß Art. 28 DSGVO.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">3. Server-Log-Dateien</p>
              <p>Beim Aufruf der Website verarbeitet der Webserver automatisch technisch erforderliche Zugriffsdaten. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Datei, Referrer, Browsertyp, Browserversion, Betriebssystem und Hostname des zugreifenden Rechners gehören.</p>
              <p className="mt-2">Die Verarbeitung erfolgt, um die Website technisch bereitzustellen, die Stabilität und Sicherheit des Betriebs zu gewährleisten und Missbrauch nachzuvollziehen.</p>
              <p className="mt-2"><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.</p>
              <p className="mt-2"><strong className="text-foreground">Speicherdauer:</strong> Server-Log-Daten werden nur so lange gespeichert, wie dies für den sicheren Betrieb und die Fehleranalyse erforderlich ist.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">4. Cookie-Einwilligung und Local Storage</p>
              <p>Beim ersten Aufruf dieser Website wird Ihnen ein Cookie-Hinweis (Consent-Banner) angezeigt. Dort können Sie entscheiden, welche Kategorien von Datenverarbeitungen Sie zulassen möchten:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong className="text-foreground">Technisch notwendig</strong> (immer aktiv): Speichert Ihren Einwilligungsstatus im Local Storage des Browsers (Schlüssel: <code className="text-xs bg-secondary px-1 py-0.5 rounded">ditib_cookie_consent</code>). Es werden dabei eine Versionsnummer, ein Zeitstempel und Ihre gewählten Einstellungen gespeichert — keine personenbezogenen Daten.</li>
                <li><strong className="text-foreground">Analyse & Statistik</strong> (optional): Bei Ihrer Einwilligung aktivieren wir Google Analytics 4 und Microsoft Clarity zur Reichweitenmessung, Nutzungsanalyse und Verbesserung der Website.</li>
                <li><strong className="text-foreground">Externe Inhalte</strong> (optional): Derzeit nicht im Einsatz. Kategorie für eine mögliche zukünftige Einbindung externer Medien.</li>
              </ul>
              <p className="mt-2">Sie können Ihre Einstellungen jederzeit über das Datenschutz-Symbol (unten rechts) ändern oder widerrufen.</p>
              <p className="mt-2"><strong className="text-foreground">Rechtsgrundlage:</strong> § 25 Abs. 2 Nr. 2 TDDDG (technisch notwendig) bzw. § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO (optionale Kategorien, nur nach Einwilligung).</p>
              <p className="mt-2"><strong className="text-foreground">Speicherdauer:</strong> Bis zur Löschung durch Ihren Browser oder bis zur Zurücksetzung der Cookie-Einstellungen.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">5. Schriftarten (Self-Hosting)</p>
              <p>Diese Website verwendet die Schriftarten „Inter" und „Playfair Display". Die Schriftdateien werden lokal auf unserem Server gehostet. Beim Laden der Schriftarten wird keine Verbindung zu externen Servern (z. B. Google) hergestellt. Es werden keine personenbezogenen Daten an Dritte übermittelt.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">6. Kontaktaufnahme per E-Mail und Telefon</p>
              <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten zur Bearbeitung Ihrer Anfrage.</p>
              <p className="mt-2"><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den Abschluss oder die Durchführung eines Vertrages gerichtet ist, andernfalls Art. 6 Abs. 1 lit. f DSGVO.</p>
              <p className="mt-2"><strong className="text-foreground">Speicherdauer:</strong> Nur so lange, wie dies zur Bearbeitung Ihrer Anfrage erforderlich ist, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">7. Externe Links</p>
              <p>Diese Website enthält Links zu externen Websites (z. B. Instagram). Erst wenn Sie einen solchen Link aktiv anklicken, wird eine Verbindung zum jeweiligen Drittanbieter hergestellt. Für die Datenverarbeitung auf den verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">8. Spenden über externe Zahlungsdienste</p>
              <p>Wenn Sie auf einen Spendenlink klicken, werden Sie auf die Website des jeweiligen Zahlungsdienstleisters weitergeleitet. Dabei können insbesondere Ihre IP-Adresse, technische Verbindungsdaten sowie weitere von Ihnen dort eingegebene Zahlungs- oder Kontaktdaten durch den jeweiligen Anbieter verarbeitet werden.</p>
              <p className="mt-2">Auf dieser Website selbst werden keine Zahlungsdaten erhoben oder gespeichert. Für die Datenverarbeitung auf der Zahlungsseite ist ausschließlich der jeweilige Zahlungsdienstleister verantwortlich. Bitte beachten Sie die dort geltenden Datenschutzinformationen, insbesondere bei PayPal.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">9. SSL-/TLS-Verschlüsselung</p>
              <p>Diese Website nutzt eine SSL-/TLS-Verschlüsselung, um die Übertragung vertraulicher Inhalte zu schützen.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">10. Analyse- und Tracking-Dienste</p>
              <p>Sofern Sie im Consent-Banner in die Kategorie „Analyse & Statistik" einwilligen, verwenden wir Google Analytics 4 und Microsoft Clarity. Diese Dienste helfen uns zu verstehen, wie Besucherinnen und Besucher unsere Website nutzen, welche Inhalte relevant sind und an welchen Stellen wir die Nutzererfahrung verbessern können.</p>
              <p className="mt-2">Google Analytics 4 wird erst nach Ihrer Einwilligung geladen und im Basic Consent Mode betrieben. Microsoft Clarity wird ebenfalls erst nach Ihrer Einwilligung geladen. Ohne Ihre Zustimmung werden diese Dienste auf dieser Website nicht aktiviert.</p>
              <p className="mt-2"><strong className="text-foreground">Google Analytics 4:</strong> Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Weitere Informationen finden Sie in der <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-primary hover:underline">Datenschutzerklärung von Google</a> und in den Informationen zu <a href="https://support.google.com/analytics/answer/12017362" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google Analytics 4</a>.</p>
              <p className="mt-2"><strong className="text-foreground">Microsoft Clarity:</strong> Anbieter ist Microsoft Corporation, One Microsoft Way, Redmond, WA 98052-6399, USA. Weitere Informationen finden Sie in der <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noreferrer" className="text-primary hover:underline">Datenschutzerklärung von Microsoft</a> sowie in den Informationen zu <a href="https://learn.microsoft.com/en-us/clarity/clarity-consent-api-v2" target="_blank" rel="noreferrer" className="text-primary hover:underline">Clarity ConsentV2</a>.</p>
              <p className="mt-2"><strong className="text-foreground">Hinweis zu Google Search Console:</strong> Die Google Search Console ist ein reines Webmaster-/Indexierungswerkzeug und wird nicht als Tracking-Skript im Browser Ihrer Besucherinnen und Besucher geladen.</p>
              <p className="mt-2"><strong className="text-foreground">Rechtsgrundlage:</strong> § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.</p>
              <p className="mt-2"><strong className="text-foreground">Widerruf:</strong> Sie können Ihre Einwilligung jederzeit über das Datenschutz-Symbol unten rechts mit Wirkung für die Zukunft ändern oder widerrufen.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">11. Ihre Rechte</p>
              <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
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
              <p className="font-semibold text-foreground mb-2">12. Beschwerderecht bei einer Aufsichtsbehörde</p>
              <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde in Nordrhein-Westfalen ist der Landesbeauftragte für Datenschutz und Informationsfreiheit (LDI NRW), Postfach 20 04 44, 40102 Düsseldorf.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">13. Keine automatisierte Entscheidungsfindung</p>
              <p>Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet im Rahmen dieser Website nicht statt.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">14. Aktualisierung dieser Datenschutzerklärung</p>
              <p>Wir passen diese Datenschutzerklärung an, wenn dies aufgrund rechtlicher, technischer oder organisatorischer Änderungen erforderlich wird. Stand: April 2026.</p>
            </div>

          </div>
        </Modal>
      )}

      {open === "kontakt" && (
        <Modal title="Kontakt" onClose={close}>
          <div className="space-y-8">

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Bauherr</p>
              <p className="font-body text-base font-semibold text-foreground leading-snug">DITIB - Ahlen (Westf.)</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Türkisch Islamische Gemeinde zu Ahlen e.V.</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Rottmannstr. 62, 59229 Ahlen</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Fon 02382/61599 &nbsp;·&nbsp; Fax 02382/702397</p>
              <a href="mailto:info@ditib-ahlen-projekte.de" className="font-body text-sm text-foreground hover:text-primary transition-colors mt-1 inline-block">
                info@ditib-ahlen-projekte.de
              </a>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Entwurfsverfasser / Tragwerksplanung</p>
              <p className="font-body text-base font-semibold text-foreground leading-snug">Ingenieurbüro Theismann & Partner</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Dipl.-Ing. Bernd Theismann</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Nordstraße 29, 59227 Ahlen</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Fon 02382/85050 &nbsp;·&nbsp; Fax 02382/85051</p>
              <a href="mailto:info@theismannundpartner.de" className="font-body text-sm text-foreground hover:text-primary transition-colors mt-1 inline-block">
                info@theismannundpartner.de
              </a>
            </div>

          </div>
        </Modal>
      )}
    </>
  );
};

export default Footer;
