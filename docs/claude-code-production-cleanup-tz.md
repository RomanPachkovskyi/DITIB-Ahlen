# ТЗ для Claude Code: Production Cleanup DITIB Ahlen

Проєкт: `/Users/roman/Project/DITIB-Ahlen/main`

Дата: 2026-05-18

Мета: привести сайт `ditib-ahlen-projekte.de` до максимально чистого production-стану по SEO/indexing, redirect policy, GDPR compliance, security, performance і build hygiene.

## Вихідний Контекст

За результатами діагностики:

- `npm run lint` проходить.
- `npm test` проходить.
- `npm run build` проходить.
- `npm run seo:check` проходить.
- GDPR consent технічно працює: GA, Clarity, Google Maps і Instagram feed не вантажаться до згоди.
- Є критичні проблеми з build artifact, redirect/indexing і dependency security.

Google Search Console показує проблему:

- Статус: `Сторінка з переспрямуванням`.
- Непроіндексовані URL:
  - `http://www.ditib-ahlen-projekte.de/`
  - `https://www.ditib-ahlen-projekte.de/`
  - `http://ditib-ahlen-projekte.de/`
  - `https://ditib-ahlen-projekte.de/tr`
- Для `http://www.ditib-ahlen-projekte.de/` Google бачить canonical:
  - `https://ditib-ahlen-projekte.de/`
- Сканування дозволено, сторінка завантажується успішно, індексування дозволено.
- Висновок: це не robots/noindex проблема. Потрібно зробити redirect, canonical, sitemap і hreflang максимально чистими, щоб Google отримував тільки фінальні canonical URL.

## Загальні Правила Для Виконання

- Не виводити у консоль і не відкривати реальні secret/token файли.
- Не комітити `public/api/instagram-config.php`.
- Не змінювати unrelated файли.
- Після кожного блоку перевіряти build/test там, де це доречно.
- Якщо змінюється `.htaccess`, перевірити реальну redirect behavior через `curl -I`.
- Якщо змінюється GDPR/analytics код, перевірити runtime поведінку до і після consent.

## Критичність

Критичність використовується так:

- `Critical`: може блокувати індексацію, розкрити секрети або ламати production artifact.
- `High`: security/GDPR/performance issue з реальним ризиком.
- `Medium`: важливо для якості, стабільності й clean build.
- `Low`: polish/documentation.

---

## Блок 1. Google Indexing, Canonical І Hreflang

Критичність: `Critical`

### Проблема

Google Search Console бачить кілька redirect URL і класифікує їх як `Сторінка з переспрямуванням`. Саме по собі це нормально для `http` і `www`, але sitemap, canonical і hreflang мають посилатися тільки на фінальні URL без redirect.

Окремо URL `https://ditib-ahlen-projekte.de/tr` має бути нормалізований у `https://ditib-ahlen-projekte.de/tr/`.

### Завдання

1. Перевірити canonical URL policy у:
   - `scripts/seo-config.mjs`
   - `scripts/prerender.mjs`
   - `src/components/LangMeta.tsx`
   - `src/pages/Datenschutz.tsx`
   - `src/pages/Impressum.tsx`
   - `src/pages/Kontakt.tsx`
   - `public/sitemap.xml`

2. Зафіксувати canonical URL:

   | Сторінка | Canonical |
   | --- | --- |
   | DE home | `https://ditib-ahlen-projekte.de/` |
   | TR home | `https://ditib-ahlen-projekte.de/tr/` |
   | DE Kontakt | `https://ditib-ahlen-projekte.de/kontakt` |
   | TR Kontakt | `https://ditib-ahlen-projekte.de/tr/kontakt` |
   | DE Impressum | `https://ditib-ahlen-projekte.de/impressum` |
   | TR Impressum | `https://ditib-ahlen-projekte.de/tr/impressum` |
   | DE Datenschutz | `https://ditib-ahlen-projekte.de/datenschutz` |
   | TR Datenschutz | `https://ditib-ahlen-projekte.de/tr/datenschutz` |

3. У sitemap мають бути тільки фінальні canonical URL:
   - без `http://`;
   - без `www`;
   - без `/tr` без trailing slash;
   - без URL, які дають redirect.

4. Hreflang має бути симетричним:
   - DE сторінка посилається на DE/TR/x-default.
   - TR сторінка посилається на DE/TR/x-default.
   - Для home TR завжди використовувати `/tr/`, не `/tr`.

5. Перевірити structured data:
   - `WebPage.url` має збігатися з canonical.
   - `inLanguage` має відповідати сторінці.
   - `Organization.url` має бути canonical root.

### Acceptance Criteria

- `npm run seo:check` проходить.
- `dist/index.html` має canonical `https://ditib-ahlen-projekte.de/`.
- `dist/tr/index.html` має canonical `https://ditib-ahlen-projekte.de/tr/`.
- `dist/sitemap.xml` не містить `http://`, `www.ditib-ahlen-projekte.de`, або `https://ditib-ahlen-projekte.de/tr` як `<loc>`.
- Google Search Console після повторного запиту на індексацію має бачити тільки фінальні canonical URL як індексовані кандидати.

---

## Блок 2. Redirect Policy І Server Routing

Критичність: `Critical`

### Проблема

Google Search Console бачить redirect URL. Треба зробити редиректи очікуваними, короткими і без ланцюгів.

Також під час діагностики production показав ризик: missing hashed asset може повертати `200 text/html` через SPA fallback. Це погано для SEO, debug, кешування і crawler behavior.

### Завдання

1. Перевірити і виправити `public/.htaccess`.

2. Очікувана redirect behavior:

   | Вхідний URL | Очікування |
   | --- | --- |
   | `http://www.ditib-ahlen-projekte.de/` | `301 -> https://ditib-ahlen-projekte.de/` |
   | `https://www.ditib-ahlen-projekte.de/` | `301 -> https://ditib-ahlen-projekte.de/` |
   | `http://ditib-ahlen-projekte.de/` | `301 -> https://ditib-ahlen-projekte.de/` |
   | `https://ditib-ahlen-projekte.de/tr` | `301 -> https://ditib-ahlen-projekte.de/tr/` |
   | `https://ditib-ahlen-projekte.de/tr/` | `200` |

3. Не допускати redirect chains:
   - бажано 1 hop;
   - максимум 2 hops тільки якщо hosting обмежує правила, але це треба явно пояснити.

4. Виправити SPA fallback:
   - App routes можуть fallback-итись на `index.html`.
   - Missing static files мають повертати `404`.

5. Missing static 404 має працювати для:
   - `/assets/not-found.js`
   - `/img/not-found.webp`
   - `/video/not-found.mp4`
   - `/pdf/not-found.pdf`
   - `/api/not-found.php`, якщо такого endpoint немає.

### Acceptance Criteria

Виконати:

```bash
curl -I http://www.ditib-ahlen-projekte.de/
curl -I https://www.ditib-ahlen-projekte.de/
curl -I http://ditib-ahlen-projekte.de/
curl -I https://ditib-ahlen-projekte.de/tr
curl -I https://ditib-ahlen-projekte.de/tr/
curl -I https://ditib-ahlen-projekte.de/assets/not-found.js
```

Очікування:

- `http` і `www` ведуть до HTTPS non-www canonical.
- `/tr` веде до `/tr/`.
- missing asset повертає `404`, не `200 text/html`.

---

## Блок 3. Build Artifact І Secrets Hygiene

Критичність: `Critical`

### Проблема

Після `npm run build` Vite копіює весь `public/` у `dist`. Через це в build artifact можуть потрапити runtime/secret файли:

- `dist/api/instagram-config.php`
- `dist/api/cache/instagram-token.json`
- `dist/api/cache/instagram-feed.json`
- `dist/api/cache/*.log`

Ці файли не мають бути в production artifact, особливо real config/token/log.

### Завдання

1. Не відкривати і не друкувати вміст secret файлів.

2. Реалізувати clean artifact strategy:

   Варіант A, бажаний:
   - винести real `instagram-config.php` і writable cache поза web root;
   - PHP endpoint читає config/cache з path поза `public`.

   Варіант B, допустимий:
   - додати build cleanup script після `vite build`;
   - гарантовано видаляти з `dist`:
     - `dist/api/instagram-config.php`
     - `dist/api/cache/instagram-token.json`
     - `dist/api/cache/*.log`
     - будь-які runtime cache JSON, якщо вони містять живі дані або токени.

3. Оновити `.gitignore`, якщо потрібно.

4. Оновити docs для deployment:
   - де має лежати real config;
   - які права доступу потрібні cache;
   - що не має потрапляти в artifact.

### Acceptance Criteria

Після `npm run build`:

```bash
find dist/api -type f | sort
```

Не має показувати:

- real `instagram-config.php`;
- token JSON;
- runtime logs;
- secret-bearing cache files.

Дозволено:

- `instagram-feed.php`;
- `instagram-refresh-token.php`, якщо HTTP-захист коректний;
- `.htaccess`;
- `instagram-config.example.php`, якщо там немає секретів.

---

## Блок 4. Dependency Security

Критичність: `High`

### Проблема

`npm audit --omit=dev` показав production vulnerabilities:

- `@remix-run/router <=1.23.1`: high, React Router XSS via open redirects.
- `react-router` / `react-router-dom`: залежать від vulnerable router.
- Інші high/moderate vulnerabilities: `lodash`, `glob`, `minimatch`, `picomatch`, `postcss`, `yaml`, `brace-expansion`.

### Завдання

1. Запустити:

```bash
npm audit --omit=dev
```

2. Оновити production dependencies без ламання app:
   - пріоритет: `react-router-dom`, `react-router`, `@remix-run/router`;
   - далі інші audit findings.

3. Виконати безпечний update:
   - `npm audit fix`, якщо не робить major breaking change;
   - або manual package bump.

4. Перевірити routes:
   - `/`
   - `/tr/`
   - `/kontakt`
   - `/tr/kontakt`
   - `/impressum`
   - `/datenschutz`
   - unknown route.

### Acceptance Criteria

```bash
npm run lint
npm test
npm run build
npm run seo:check
npm audit --omit=dev
```

Очікування:

- немає high vulnerabilities у production dependencies;
- app routes працюють;
- build не зламаний.

---

## Блок 5. Security Headers

Критичність: `High`

### Поточний Стан

На production вже є:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Потрібно покращити:

- HSTS;
- CSP або CSP Report-Only.

### Завдання

1. Додати HSTS, якщо HTTPS стабільний:

```text
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

Якщо `includeSubDomains` або `preload` ризикові, додати більш консервативний варіант і описати причину.

2. Підготувати CSP strategy.

Обмеження:

- у `index.html` є inline scripts;
- використовуються Google Analytics;
- використовується Microsoft Clarity;
- використовується Google Maps;
- `lottie-web` дає warning про `eval`.

3. Мінімальний крок:
   - додати `Content-Security-Policy-Report-Only`;
   - або створити documented CSP draft у `docs`.

4. Перевірити, що CSP не блокує:
   - app JS/CSS;
   - hero images/video;
   - GA після analytics consent;
   - Clarity після analytics consent;
   - Maps після external consent.

### Acceptance Criteria

- HSTS доданий або є чітке пояснення, чому відкладений.
- CSP strategy є в коді або docs.
- Сайт не ламається.
- Consent-gated third-party scripts працюють тільки після consent.

---

## Блок 6. GDPR Compliance

Критичність: `High`

### Поточний Стан

Позитивно:

- Cookie banner має `Nur Notwendige`, `Einstellungen`, `Alle akzeptieren`.
- Reject зберігає:

```json
{
  "necessary": true,
  "analytics": false,
  "external": false
}
```

- Accept all зберігає:

```json
{
  "necessary": true,
  "analytics": true,
  "external": true
}
```

- GA/Clarity не вантажаться до analytics consent.
- Google Maps і Instagram feed не вантажаться до external consent.

### Завдання

1. Перевірити runtime сценарії:
   - first visit no consent;
   - reject all;
   - accept all;
   - analytics only;
   - external only;
   - revoke/change consent через floating privacy icon.

2. До consent не мають вантажитися:
   - `googletagmanager.com`;
   - `google-analytics.com`;
   - `clarity.ms`;
   - `maps.googleapis.com`;
   - Instagram/Meta browser-side resources.

3. Після reject:
   - не має бути `_ga`, `_gid`, `_gat`, Clarity cookies;
   - external content лишається placeholder/gate.

4. Після accept analytics:
   - GA і Clarity можуть завантажитись.

5. Після accept external:
   - Google Maps API може завантажитись;
   - Instagram feed endpoint може викликатись.

6. Узгодити `Datenschutz.tsx` із фактичною реалізацією:
   - якщо згадується Clarity ConsentV2, але код його не викликає, або реалізувати ConsentV2, або змінити формулювання.

7. Розглянути expiry для `ditib_cookie_consent`:
   - поточна версійність є (`CONSENT_VERSION`);
   - можна додати re-consent після 6 або 12 місяців.

### Acceptance Criteria

- No third-party analytics/external requests before consent.
- Reject all не створює analytics cookies.
- Consent можна змінити/відкликати.
- Privacy text відповідає коду.

---


## Блок 8. Local Preview І Vite Base

Критичність: `Medium`

### Проблема

У `vite.config.ts` production `base` зараз абсолютний:

```ts
base: mode === "production" ? `${SITE_ORIGIN}/` : "/"
```

Через це `vite preview` локально може тягнути JS/CSS/assets із production origin, а не з локального `dist`. Це ускладнює діагностику.

### Завдання

1. Переглянути `vite.config.ts`.

2. Запропонувати чисту схему:
   - або `base: "/"` для production build;
   - або окремий env/mode для absolute production asset URLs;
   - або окрема команда для clean local preview.

3. Не ламати absolute SEO URLs:
   - canonical;
   - OG image;
   - sitemap;
   - structured data.

### Acceptance Criteria

- `npm run preview` перевіряє локальний `dist`.
- SEO absolute URLs лишаються правильними.
- Production deploy не ламається.

---

## Блок 9. API Runtime Hardening

Критичність: `Medium/High`

### Завдання

1. Перевірити `public/api/instagram-feed.php`:
   - JSON output не має leak warnings/errors;
   - external media cache має безпечні filenames;
   - curl timeout нормальний;
   - fallback не виводить секрети.

2. Перевірити `public/api/instagram-refresh-token.php`:
   - HTTP mode захищений secret key;
   - CLI mode працює;
   - response не містить access token;
   - logs не містять access token/app secret.

3. Перевірити `.htaccess` у `public/api`:
   - блокує `instagram-config.php`;
   - блокує non-public cache;
   - дозволяє тільки cached public thumbnails, якщо вони потрібні.

### Acceptance Criteria

- `/api/instagram-feed.php` повертає валідний JSON.
- `/api/instagram-refresh-token.php` без key повертає 403 у HTTP mode.
- Secret/config/cache файли не доступні напряму.

---

## Фінальна Перевірка

Виконати:

```bash
npm run lint
npm test
npm run build
npm run seo:check
npm audit --omit=dev
```

Перевірити artifact:

```bash
find dist/api -type f | sort
```

Перевірити redirects:

```bash
curl -I http://www.ditib-ahlen-projekte.de/
curl -I https://www.ditib-ahlen-projekte.de/
curl -I http://ditib-ahlen-projekte.de/
curl -I https://ditib-ahlen-projekte.de/tr
curl -I https://ditib-ahlen-projekte.de/tr/
curl -I https://ditib-ahlen-projekte.de/assets/not-found.js
```

Перевірити sitemap:

```bash
curl -sSL https://ditib-ahlen-projekte.de/sitemap.xml
```

Фінальний результат має бути:

- sitemap містить тільки фінальні canonical HTTPS non-www URL;
- `/tr` редиректить на `/tr/`;
- `http` і `www` редиректять на canonical domain;
- missing static assets повертають 404;
- секрети не потрапляють у `dist`;
- production dependencies без high vulnerabilities;
- GDPR consent не вантажить third-party scripts до згоди;
- build/test/SEO checks проходять.

## Очікуваний Звіт Після Виконання

Claude Code має повернути короткий звіт:

1. Що змінено.
2. Які файли змінено.
3. Які перевірки виконано.
4. Які ризики лишились.
5. Що треба зробити в Google Search Console:
   - повторно submit sitemap;
   - натиснути `Validate fix` для `Сторінка з переспрямуванням`;
   - request indexing для canonical pages:
     - `https://ditib-ahlen-projekte.de/`
     - `https://ditib-ahlen-projekte.de/tr/`

