import { useState } from "react";
import Modal from "./Modal";

type ModalType = "impressum" | "datenschutz" | "kontakt" | null;

const Footer = () => {
  const [open, setOpen] = useState<ModalType>(null);
  const close = () => setOpen(null);

  return (
    <>
      <footer className="px-5 md:px-10 py-8 border-t border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="font-body text-xs text-muted-foreground">
            © 2026 DITIB Ahlen · Kulturzentrum Ahlen e.V.
          </div>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setOpen("impressum")}
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Impressum
            </button>
            <button
              onClick={() => setOpen("datenschutz")}
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Datenschutz
            </button>
            <button
              onClick={() => setOpen("kontakt")}
              className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Kontakt
            </button>
          </div>
          <a
            href="https://munas-print.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors md:text-right"
          >
            Digitales Handwerk mit ♥ bei Munas-Print
          </a>
        </div>
      </footer>

      {open === "impressum" && (
        <Modal title="Impressum" onClose={close}>
          <div className="space-y-6">

            <div>
              <p className="font-semibold text-foreground mb-2">Angaben gemäß § 5 TMG</p>
              <p>
                <strong className="text-foreground">DITIB Ahlen — Türkisch Islamische Kultur Verein e.V.</strong><br />
                Rottmannstr. 62<br />
                59229 Ahlen<br />
                Deutschland
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Vertretungsberechtigte Personen</p>
              <p>[VORSTAND_NAME] — 1. Vorsitzender</p>
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
                Registergericht: Amtsgericht [AMTSGERICHT]<br />
                Registernummer: VR [REGISTERNUMMER]
              </p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Umsatzsteuer-Identifikationsnummer (USt-IdNr.)</p>
              <p>Als gemeinnütziger Verein ist der Verein von der Umsatzsteuer befreit; eine USt-IdNr. liegt nicht vor.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</p>
              <p>
                [VORSTAND_NAME]<br />
                Rottmannstr. 62, 59229 Ahlen
              </p>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="font-semibold text-foreground mb-2">Haftung für Inhalte</p>
              <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
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
                <strong className="text-foreground">DITIB Ahlen — Türkisch Islamische Kultur Verein e.V.</strong><br />
                Rottmannstr. 62<br />
                59229 Ahlen<br />
                Telefon: 02382 / 61599<br />
                E-Mail: <a href="mailto:info@ditib-ahlen-projekte.de" className="text-primary hover:underline">info@ditib-ahlen-projekte.de</a><br />
                Website: www.ditib-ahlen-projekte.de
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
              <p className="font-semibold text-foreground mb-2">4. Kontaktaufnahme per E-Mail und Telefon</p>
              <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten zur Bearbeitung Ihrer Anfrage.</p>
              <p className="mt-2"><strong className="text-foreground">Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf den Abschluss oder die Durchführung eines Vertrages gerichtet ist, andernfalls Art. 6 Abs. 1 lit. f DSGVO.</p>
              <p className="mt-2"><strong className="text-foreground">Speicherdauer:</strong> Nur so lange, wie dies zur Bearbeitung Ihrer Anfrage erforderlich ist, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">5. Externe Links</p>
              <p>Diese Website enthält Links zu externen Websites (z. B. Instagram). Erst wenn Sie einen solchen Link aktiv anklicken, wird eine Verbindung zum jeweiligen Drittanbieter hergestellt. Für die Datenverarbeitung auf den verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">6. SSL-/TLS-Verschlüsselung</p>
              <p>Diese Website nutzt eine SSL-/TLS-Verschlüsselung, um die Übertragung vertraulicher Inhalte zu schützen.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">7. Keine Tracking- oder Analyse-Tools</p>
              <p>Diese Website verwendet keine Analyse-, Marketing- oder Tracking-Dienste (z. B. Google Analytics). Es werden keine Cookies für Werbezwecke oder zur Nutzungsanalyse gesetzt.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">8. Ihre Rechte</p>
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
              <p className="font-semibold text-foreground mb-2">9. Beschwerderecht bei einer Aufsichtsbehörde</p>
              <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde in Nordrhein-Westfalen ist der Landesbeauftragte für Datenschutz und Informationsfreiheit (LDI NRW), Postfach 20 04 44, 40102 Düsseldorf.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">10. Keine automatisierte Entscheidungsfindung</p>
              <p>Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet im Rahmen dieser Website nicht statt.</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">11. Aktualisierung dieser Datenschutzerklärung</p>
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
              <p className="font-display text-base font-semibold text-foreground leading-snug">DITIB - Ahlen (Westf.)</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Türkisch Islamische Kultur Verein e.V.</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Rottmannstr. 62, 59229 Ahlen</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Fon 02382/61599 &nbsp;·&nbsp; Fax 02382/702397</p>
              <a href="mailto:info@ditib-ahlen-projekte.de" className="font-body text-sm text-foreground hover:text-primary transition-colors mt-1 inline-block">
                info@ditib-ahlen-projekte.de
              </a>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">Entwurfsverfasser / Tragwerksplanung</p>
              <p className="font-display text-base font-semibold text-foreground leading-snug">Ingenieurbüro Theismann & Partner</p>
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
