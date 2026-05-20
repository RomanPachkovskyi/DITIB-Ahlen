# Rechtliche Texte — DiTiB Ahlen

**Dieses Dokument** ist die autoritative Quelle für alle juristischen Texte beider Dienste:
- **Lendíng** → `ditib-ahlen-projekte.de` (`main/`)
- **Mitgliederportal** → `mitglied.ditib-ahlen-projekte.de` (`portal/`)

Beide Dienste nennen dieselben Verantwortlichen und teilen eine Datenschutzerklärung.

---

## ANALYSE: GAP-AUSWERTUNG UND OFFENE ENTSCHEIDUNGEN

### Was fehlt in der aktuellen Datenschutzerklärung

1. **Das Mitgliederportal fehlt vollständig.** Die aktuelle `Datenschutz.tsx` beschreibt nur die Landing-Website. Das Portal auf `mitglied.ditib-ahlen-projekte.de` verarbeitet aber erheblich sensiblere Daten (IBAN/BIC, Geburtsdatum, Staatsangehörigkeit, religiöse Gemeinderegistrierung). Beide Seiten verlinken auf dieselbe Datenschutzseite — das ist rechtlich unvollständig.

2. **Art. 9 DSGVO nicht adressiert.** Die Felder `gemeinderegister` (Eintrag im Gemeinderegister der Moschee) und `cenaze_fonu` (Islamischer Bestattungsfonds) legen die Religionszugehörigkeit offen. Das sind besondere Kategorien personenbezogener Daten nach Art. 9 Abs. 1 DSGVO. Rechtsgrundlage: Art. 9 Abs. 2 lit. d DSGVO (Verarbeitung durch religiöse/weltanschauliche Organisationen für deren eigene Mitglieder).

3. **IBAN/BIC ohne eigenen Abschnitt.** Kontodaten im Rahmen eines SEPA-Lastschriftmandats sind nicht ausdrücklich beschrieben.

4. **Digitale Unterschrift (SEPA) nicht erwähnt.** Das Formular erhebt eine auf einem Canvas gezeichnete Unterschrift.

5. **E-Mail-Benachrichtigungen des Portals nicht beschrieben.** Transaktionale E-Mails (Registrierungsbestätigung, Aufnahmebestätigung, Löschbestätigung) an Mitglied und Admin sind nicht dokumentiert.

6. **Mitgliedskonto (/konto) nicht beschrieben.**

7. **Profilbild (nach FOTO_UPLOAD_TZ.md geplant) noch nicht vorhanden.**

8. **Speicherdauer fehlt** für Mitgliedschaftsdaten.

9. **Impressum** nennt nur die Landing-Website, nicht das Portal — das sollte ergänzt werden.

### Entscheidung: Separates Foto-Einwilligungs-Checkbox erforderlich

**Ja, eine eigene Checkbox ist rechtlich notwendig.** Begründung:

- **Art. 7 Abs. 2 DSGVO** verlangt, dass die Einwilligung klar unterscheidbar von anderen Erklärungen eingeholt wird, wenn sie Teil einer mehrteiligen schriftlichen Erklärung ist.
- Die Pflichtmitgliedsdaten (Name, Adresse, IBAN für SEPA) beruhen auf **Art. 6 Abs. 1 lit. b DSGVO** (Vertragserfüllung/Mitgliedschaft) — dafür braucht es keine separate Einwilligung, die bestehende `dsgvo_zustimmung`-Checkbox ist eine Informationsbestätigung.
- Das Profilbild ist optional und dient keinem Zweck, der für die Mitgliedschaft notwendig ist. Es kann sich daher **ausschließlich** auf **Art. 6 Abs. 1 lit. a DSGVO** (Einwilligung) stützen.
- Das Bundeln dieser optionalen Einwilligung in die allgemeine DSGVO-Zustimmung wäre nach Erwägungsgrund 43 DSGVO und Art. 7 problematisch.
- **Implementierung:** Eigene Checkbox auf Step 4 (Foto) mit Text sinngemäß: „Ich willige ein, dass mein freiwillig hochgeladenes Profilbild gespeichert und vom Vereinsvorstand eingesehen werden kann. Diese Einwilligung kann ich jederzeit widerrufen."

### Speicherdauer Mitgliedschaftsdaten (Orientierung)

| Daten | Orientierung Speicherdauer |
|---|---|
| Mitgliedsdaten allgemein | Während Mitgliedschaft + 10 Jahre nach Beendigung (§ 147 AO, Buchführungspflicht für Vereine mit steuerlichen Aufzeichnungspflichten) |
| IBAN, BIC, SEPA-Mandat | SEPA-Rulebook: mind. 14 Monate nach letztem Einzug; Praxis: mit allgemeinen Mitgliedschaftsdaten, mind. bis zur vollständigen Klärung offener Forderungen |
| SEPA-Unterschrift | Zusammen mit SEPA-Mandatsdaten |
| E-Mail-Kommunikation | Solange für Nachweis der Rechtsbeziehung erforderlich |
| Profilbild | Bis Widerruf der Einwilligung oder Beendigung der Mitgliedschaft, je nachdem was früher eintritt |
| Admin-Notizen | Zusammen mit Mitgliedsdaten |

**Wichtig:** Für einen eingetragenen Verein, der gemeinnützig ist und Aufzeichnungspflichten nach § 63 AO erfüllt, gelten die Aufbewahrungsfristen des § 147 AO (Buchführungsunterlagen: 10 Jahre, sonstige Unterlagen: 6 Jahre). Die konkrete Anwendung sollte der steuerliche Berater des Vereins bestätigen.

---

## DATENSCHUTZERKLÄRUNG — Autoritativer Text (Deutsch)

> **Hinweis zur Türkischen Übersetzung:** Der nachfolgende Text ist der rechtlich maßgebliche deutsche Text. Für die türkische Übersetzung in `Datenschutz.tsx` genügt eine inhaltlich genaue Übertragung; türkischsprachige Nutzer in Deutschland unterliegen deutschem Datenschutzrecht.

> **Stand:** Mai 2026. Bei Änderungen am Portal (z. B. Liveschaltung Foto-Funktion) Stand aktualisieren.

---

### Datenschutzerklärung

Diese Datenschutzerklärung gilt für alle digitalen Angebote der DITIB – Türkisch Islamische Gemeinde zu Ahlen e. V., insbesondere für:
- die Projektwebseite **ditib-ahlen-projekte.de** und
- das Mitgliederportal **mitglied.ditib-ahlen-projekte.de**.

---

#### 1. Verantwortlicher

Verantwortlich für die Datenverarbeitung auf dieser Website und im Mitgliederportal ist:

**DITIB – Türkisch Islamische Gemeinde zu Ahlen e. V.**
Rottmannstr. 62
59229 Ahlen

Vertreten durch: Ali Koca (1. Vorsitzender)
Telefon: 02382 / 61599
E-Mail: info@ditib-ahlen-projekte.de
Website: www.ditib-ahlen-projekte.de
Vereinsregister: Amtsgericht Münster, VR 50380
Steuernummer: 304/5861/0097

---

#### 2. Hosting und Server-Logdateien

Beide Webangebote werden bei externen technischen Hosting-Dienstleistern betrieben. Beim Hosting werden die für den technischen Betrieb erforderlichen Daten verarbeitet. Soweit Hosting-Anbieter personenbezogene Daten in unserem Auftrag verarbeiten, erfolgt dies auf Grundlage einer Auftragsverarbeitungsvereinbarung gemäß Art. 28 DSGVO.

Beim Aufruf der Website verarbeitet der Webserver automatisch technisch erforderliche Zugriffsdaten, insbesondere: IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Datei, Referrer, Browsertyp, Browserversion, Betriebssystem und Hostname des zugreifenden Rechners.

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO.
**Speicherdauer:** Nur so lange, wie dies für den sicheren Betrieb und die Fehleranalyse erforderlich ist.

---

#### 3. Cookie-Einwilligung und Local Storage (nur Projektwebseite)

Beim ersten Aufruf der Projektwebseite ditib-ahlen-projekte.de wird ein Hinweis zur Datenschutzeinwilligung (Consent-Banner) angezeigt. Dort können Sie entscheiden, welche Kategorien der Datenverarbeitung Sie zulassen:

- **Technisch notwendig** (immer aktiv): Speichert Ihren Einwilligungsstatus im Local Storage des Browsers (Schlüssel: `ditib_cookie_consent`) mit Versionsnummer, Zeitstempel und Ihren Einstellungen — keine personenbezogenen Daten.
- **Analyse & Statistik** (optional): Bei Einwilligung aktivieren wir Google Analytics 4 und Microsoft Clarity.
- **Externe Inhalte** (optional): Betrifft die interaktive Google-Maps-Karte, aktuelle Instagram-Beiträge und ähnliche externe Medien, die erst nach Einwilligung geladen werden.

Sie können Ihre Einstellungen jederzeit über das Datenschutz-Symbol (unten rechts) ändern oder widerrufen.

**Rechtsgrundlage:** § 25 Abs. 2 Nr. 2 TDDDG (technisch notwendig) bzw. § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO (optionale Kategorien).
**Speicherdauer:** Bis zur Löschung durch Ihren Browser oder bis zur Zurücksetzung der Einstellungen.

---

#### 4. Selbst gehostete Schriftarten

Die Projektwebseite verwendet die Schriftarten „Inter" und „Playfair Display", die lokal auf unserem Server gehostet werden. Beim Laden dieser Schriftarten wird keine Verbindung zu externen Servern hergestellt. Es werden keine personenbezogenen Daten an Dritte übermittelt.

---

#### 5. Kontaktaufnahme per E-Mail und Telefon

Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten zur Bearbeitung Ihrer Anfrage.

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf den Abschluss oder die Durchführung eines Vertrages (einschließlich einer Vereinsmitgliedschaft) gerichtet ist, andernfalls Art. 6 Abs. 1 lit. f DSGVO.
**Speicherdauer:** Nur so lange, wie dies für die Bearbeitung erforderlich ist, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.

---

#### 6. Spenden über externe Zahlungsdienste

Wenn Sie auf einen Spendenlink klicken, werden Sie auf die Website des jeweiligen Zahlungsdienstleisters weitergeleitet. Dort können Ihre IP-Adresse, technische Verbindungsdaten sowie weitere von Ihnen eingegebene Zahlungs- und Kontaktdaten durch den jeweiligen Anbieter verarbeitet werden. Auf dieser Website selbst werden keine Zahlungsdaten erhoben oder gespeichert. Für die Datenverarbeitung auf der Zahlungsseite ist ausschließlich der jeweilige Zahlungsdienstleister verantwortlich.

---

#### 7. Google Maps

Auf der Projektwebseite ist eine interaktive Karte von Google Maps eingebunden. Die Karte wird nicht automatisch geladen, sondern erst, wenn Sie in die Kategorie „Externe Inhalte" einwilligen oder im Kartenbereich ausdrücklich auf „Karte laden" klicken.

**Anbieter:** Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.

Beim Laden der Karte können insbesondere Ihre IP-Adresse, Browser- und Gerätedaten sowie Referrer-Informationen an Google übermittelt werden. Auf diese Datenverarbeitung durch Google haben wir nach dem Laden der Karte keinen vollständigen Einfluss. Weitere Informationen: [Datenschutzerklärung von Google](https://policies.google.com/privacy).

**Rechtsgrundlage:** § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.
**Widerruf:** Jederzeit über das Datenschutz-Symbol unten rechts auf der Projektwebseite.

---

#### 8. Instagram-Beiträge

Auf der Projektwebseite können aktuelle Beiträge unseres Instagram-Profils angezeigt werden. Die Beiträge werden über einen serverseitigen Abruf vorverarbeitet und erst nach Einwilligung in „Externe Inhalte" oder nach ausdrücklichem Klick im Instagram-Bereich geladen. Beim Anklicken eines Beitrags werden Sie zu Instagram weitergeleitet; dort gelten die Datenschutzinformationen von Instagram/Meta.

**Anbieter:** Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland.

Weitere Informationen: [Datenschutzerklärung von Instagram](https://privacycenter.instagram.com/policy/) und [Datenschutzerklärung von Meta](https://www.facebook.com/privacy/policy/).

**Rechtsgrundlage:** § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.

---

#### 9. Analyse- und Tracking-Dienste

Sofern Sie im Consent-Banner in die Kategorie „Analyse & Statistik" einwilligen, werden Google Analytics 4 und Microsoft Clarity aktiviert. Diese Dienste helfen uns zu verstehen, wie Besucher die Projektwebseite nutzen.

**Google Analytics 4:** Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Weitere Informationen: [Datenschutzerklärung von Google](https://policies.google.com/privacy).

**Microsoft Clarity:** Anbieter ist Microsoft Corporation, One Microsoft Way, Redmond, WA 98052-6399, USA. Weitere Informationen: [Datenschutzerklärung von Microsoft](https://privacy.microsoft.com/privacystatement).

Ohne Ihre Zustimmung werden diese Dienste auf dieser Website nicht aktiviert und es werden keine entsprechenden Cookies gesetzt.

**Hinweis zu Google Search Console:** Die Google Search Console ist ein reines Webmaster-Werkzeug und wird nicht als Tracking-Skript im Browser der Besucher geladen.

**Rechtsgrundlage:** § 25 Abs. 1 TDDDG i. V. m. Art. 6 Abs. 1 lit. a DSGVO.
**Widerruf:** Jederzeit über das Datenschutz-Symbol unten rechts.

---

#### 10. SSL-/TLS-Verschlüsselung

Beide Webangebote nutzen eine SSL-/TLS-Verschlüsselung für die Übertragung aller Daten.

---

#### 11. Mitgliederportal — Registrierung und Mitgliedschaft

Das Mitgliederportal unter **mitglied.ditib-ahlen-projekte.de** ermöglicht die digitale Beantragung einer Vereinsmitgliedschaft bei der DITIB – Türkisch Islamische Gemeinde zu Ahlen e. V.

##### 11.1 Erhobene Daten

Im Rahmen der Mitgliederregistrierung werden folgende Daten erhoben:

**Pflichtangaben:**
- Anrede, vollständiger Name
- Anschrift (Straße, Stadt, Bundesland, Postleitzahl)
- Geburtsdatum und Geburtsort
- Staatsangehörigkeit
- E-Mail-Adresse und Telefonnummer

**Vereinsspezifische Angaben:**
- Angabe, ob Sie im Gemeinderegister eingetragen werden möchten
- Angabe, ob Sie am islamischen Bestattungsfonds (Cenaze Fonu) teilnehmen möchten, ggf. Cenaze-Fonu-Nummer
- Angaben zu Familienangehörigen (im Zusammenhang mit der Cenaze-Fonu-Teilnahme)
- Heimatstadt (freiwillig)
- Beruf (freiwillig)
- Instagram-Profil (freiwillig)

**Zahlungsdaten (SEPA-Lastschriftmandat):**
- Zahlungsart, monatlicher Beitrag
- Kontoinhaber, IBAN, BIC, Kreditinstitut
- Digitale Unterschrift für das SEPA-Mandat

##### 11.2 Zweck und Rechtsgrundlage

Die Verarbeitung der Pflichtangaben und Zahlungsdaten erfolgt zur Begründung und Durchführung der Vereinsmitgliedschaft sowie zur Erfüllung der sich daraus ergebenden vertraglichen Pflichten (insbesondere Beitragseinzug).

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO.

Für freiwillig angegebene Daten (Beruf, Heimatstadt, Instagram): **Art. 6 Abs. 1 lit. f DSGVO** (berechtigtes Interesse des Vereins an einer vollständigen Mitgliederverwaltung) oder **Art. 6 Abs. 1 lit. a DSGVO** (Einwilligung durch freiwillige Angabe).

##### 11.3 Besondere Kategorien personenbezogener Daten (Art. 9 DSGVO)

Die Angabe, ob Sie im Gemeinderegister der Moschee eingetragen werden möchten sowie die Teilnahme am islamischen Bestattungsfonds (Cenaze Fonu), stellen nach Art. 9 Abs. 1 DSGVO besondere Kategorien personenbezogener Daten dar, da sie Rückschlüsse auf die Religionszugehörigkeit ermöglichen.

**Rechtsgrundlage:** Art. 9 Abs. 2 lit. d DSGVO. Diese Vorschrift erlaubt Vereinigungen mit religiöser Zielsetzung die Verarbeitung solcher Daten im Rahmen ihrer satzungsgemäßen Tätigkeiten und in Bezug auf ihre Mitglieder, sofern geeignete Garantien vorhanden sind und die Daten nicht ohne Einwilligung der betroffenen Person nach außen weitergegeben werden.

Die erhobenen Daten werden ausschließlich für interne Vereinszwecke verwendet und nicht an Dritte weitergegeben, die nicht unmittelbar mit der Erbringung der Vereinsleistungen befasst sind.

##### 11.4 SEPA-Lastschriftmandat und Kontoverbindungsdaten

IBAN und BIC werden verschlüsselt in der Datenbank gespeichert (AES-256-Verschlüsselung über den Laravel-Anwendungsschlüssel). Die digitale Unterschrift für das SEPA-Mandat wird als technisch notwendige Bestätigung gespeichert und ist nur für autorisierte Vereinsvertreter einsehbar.

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des SEPA-Mandats und der Mitgliedschaftsverpflichtung).

##### 11.5 E-Mail-Kommunikation des Portals

Bei Nutzung des Mitgliederportals versenden wir folgende transaktionale E-Mails:

| Auslöser | Empfänger |
|---|---|
| Neue Registrierung eingegangen | Mitglied (Bestätigung) + Vorstand (Hinweis) |
| Mitgliedschaft bestätigt (Status: aktiv) | Mitglied |
| Mitgliedsdatensatz gelöscht | Mitglied + Vorstand |

Die E-Mails enthalten keine Zahlungsdaten, keine IBAN/BIC und kein Profilbild.

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO.

##### 11.6 Mitgliedskonto

Bestätigte Mitglieder können sich unter `/konto` auf dem Mitgliederportal anmelden und ihre hinterlegten Daten einsehen. Jedes Mitglied hat ausschließlich Zugriff auf die eigenen Daten.

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. b DSGVO.

##### 11.7 Administrativer Zugriff

Berechtigte Mitarbeiter des Vereinsvorstands haben über das geschützte Admin-Panel Zugriff auf die Mitgliedsdaten zum Zweck der Mitgliederverwaltung. Der Zugriff ist auf Personen beschränkt, die diese Aufgabe für den Verein wahrnehmen.

##### 11.8 Speicherdauer

Mitgliedschaftsdaten werden für die Dauer der Mitgliedschaft gespeichert. Nach Beendigung der Mitgliedschaft werden die Daten entsprechend den gesetzlichen Aufbewahrungspflichten (insbesondere § 147 AO) aufbewahrt und anschließend gelöscht. In der Regel beträgt diese Frist zehn Jahre für buchführungsrelevante Unterlagen (z. B. Zahlungsdaten, SEPA-Mandate) und sechs Jahre für sonstige Unterlagen.

Sofern keine gesetzliche Aufbewahrungspflicht besteht, werden die Daten unverzüglich nach Wegfall des Verarbeitungszwecks gelöscht.

---

#### 12. Profilbild (freiwillig, Mitgliederportal)

Im Rahmen der Mitgliederregistrierung können Sie freiwillig ein Profilbild hochladen.

**Zweck:** Das Foto dient ausschließlich der internen Identifizierung im Rahmen der Mitgliederverwaltung und wird im Admin-Bereich sowie im persönlichen Mitgliedskonto angezeigt.

**Was mit dem Foto nicht geschieht:**
- Das Foto wird nicht veröffentlicht.
- Das Foto wird nicht in E-Mails übermittelt.
- Das Foto wird nicht in exportierte Dateien (z. B. Excel) aufgenommen.
- Das Foto ist nicht über einen öffentlichen URL abrufbar.

**Technische Verarbeitung:** Das hochgeladene Bild wird auf 800 × 800 Pixel zugeschnitten und als JPEG gespeichert. Metadaten (z. B. EXIF-Standortinformationen) werden dabei entfernt. Das Bild wird ausschließlich auf dem privaten Server-Speicher des Vereins abgelegt und ist nicht öffentlich zugänglich.

**Zugriff:** Nur autorisierte Administratoren des Vereins sowie Sie selbst über Ihr Mitgliedskonto haben Zugriff auf Ihr Profilbild.

**Rechtsgrundlage:** Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Einwilligung erfolgt durch eine gesonderte Checkbox im Registrierungsformular. Die Angabe ist freiwillig; das Nichtbereitstellen eines Fotos hat keinen Einfluss auf Ihre Mitgliedschaft.

**Widerruf:** Sie können die Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie per E-Mail an info@ditib-ahlen-projekte.de die Löschung Ihres Profilbildes beantragen. Nach dem Widerruf wird das Foto umgehend gelöscht; Ihr Mitgliedsdatensatz bleibt davon unberührt.

**Speicherdauer:** Bis zum Widerruf der Einwilligung oder bis zur Beendigung der Mitgliedschaft, je nachdem was früher eintritt.

---

#### 13. Externe Links

Diese Website enthält Links zu externen Websites (z. B. Instagram, Facebook oder Google Maps als externe Vollansicht). Erst wenn Sie einen solchen Link aktiv anklicken, wird eine Verbindung zum jeweiligen Drittanbieter hergestellt. Für die Datenverarbeitung auf den verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.

---

#### 14. Ihre Rechte

Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:

- **Recht auf Auskunft** (Art. 15 DSGVO)
- **Recht auf Berichtigung** (Art. 16 DSGVO)
- **Recht auf Löschung** (Art. 17 DSGVO)
- **Recht auf Einschränkung der Verarbeitung** (Art. 18 DSGVO)
- **Recht auf Datenübertragbarkeit** (Art. 20 DSGVO)
- **Recht auf Widerspruch** (Art. 21 DSGVO)
- **Recht auf Widerruf erteilter Einwilligungen** (Art. 7 Abs. 3 DSGVO)

Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an: info@ditib-ahlen-projekte.de

---

#### 15. Beschwerderecht bei einer Aufsichtsbehörde

Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde in Nordrhein-Westfalen ist:

Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)
Postfach 20 04 44
40102 Düsseldorf
www.ldi.nrw.de

---

#### 16. Keine automatisierte Entscheidungsfindung

Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO findet nicht statt.

---

#### 17. Aktualisierung dieser Datenschutzerklärung

Wir passen diese Datenschutzerklärung an, wenn dies aufgrund rechtlicher, technischer oder organisatorischer Änderungen erforderlich wird.

**Stand: Mai 2026.**

---

## IMPRESSUM — Autoritativer Text

> Das Impressum gilt für alle Webangebote der DITIB – Türkisch Islamische Gemeinde zu Ahlen e. V., einschließlich der Projektwebseite `ditib-ahlen-projekte.de` und des Mitgliederportals `mitglied.ditib-ahlen-projekte.de`.

---

### Impressum

#### Angaben gemäß § 5 DDG

**DITIB – Türkisch Islamische Gemeinde zu Ahlen e. V.**
Rottmannstr. 62
59229 Ahlen
Deutschland

#### Vertretungsberechtigte Personen

Ali Koca — 1. Vorsitzender

#### Kontakt

Telefon: 02382 / 61599
Fax: 02382 / 702397
E-Mail: info@ditib-ahlen-projekte.de
Website: www.ditib-ahlen-projekte.de

#### Registereintrag

Eingetragen im Vereinsregister.
Registergericht: Amtsgericht Münster
Registernummer: VR 50380

#### Steuernummer

304/5861/0097

#### Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV

Ali Koca
Rottmannstr. 62, 59229 Ahlen

---

#### Haftung für Inhalte

Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.

#### Haftung für Links

Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.

#### Urheberrecht

Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.

---

## CHECKLISTE FÜR IMPLEMENTIERUNG

### In `main/src/pages/Datenschutz.tsx` zu aktualisieren

- [x] Einleitungssatz hinzufügen (gilt für ditib-ahlen-projekte.de **und** mitglied.ditib-ahlen-projekte.de)
- [x] Abschnitt 11: Mitgliederportal einfügen (komplett neu)
- [x] Abschnitt 12: Profilbild einfügen (2026-05-20 — Foto-Funktion Etap 1–6 implementiert, Deploy geplant)
- [x] Stand aktualisieren wenn Foto-Funktion live geht

### In `main/src/pages/Impressum.tsx` zu ergänzen

- [ ] Klarstellender Hinweis, dass das Impressum auch für `mitglied.ditib-ahlen-projekte.de` gilt

### Im Portal (`portal/`) zu implementieren

- [ ] Separate Checkbox für Profilbild-Einwilligung auf Step 4 (Foto)
- [ ] Formularfeld `foto_einwilligung` in DB + Model
- [ ] `foto_einwilligung_at` Timestamp

### Datenschutz-Abschnitt 12 (Profilbild) NICHT einfügen, solange

- Die Foto-Funktion noch nicht live ist
- Die separate Einwilligungs-Checkbox noch nicht implementiert ist
- (Stand Mai 2026: Foto-Funktion ist noch in Planung — FOTO_UPLOAD_TZ.md)

---

## TÜRKISCHE ÜBERSETZUNG — Hinweise

Die türkische Version in `Datenschutz.tsx` muss inhaltlich alle Abschnitte der deutschen Version widerspiegeln. Priorität bei der Übersetzung:

1. Alle Abschnitte aus dem deutschen Text vollständig übertragen
2. Rechtsbegriffe können im deutschen Original in Klammern bleiben, z. B. „Art. 6 Abs. 1 lit. b DSGVO"
3. Die Behördenbezeichnung LDI NRW kann unübersetzt bleiben mit dem Hinweis, dass sie für NRW zuständig ist
4. Links zu Google, Meta etc. bleiben unverändert

---

*Letzte Aktualisierung dieses Dokuments: 2026-05-19*
*Erstellt für DITIB – Türkisch Islamische Gemeinde zu Ahlen e. V.*
