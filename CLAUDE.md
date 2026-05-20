# CLAUDE.md — AI Agent Instructions
## DITIB-Ahlen Landing (`main/`)

> Цей файл читається автоматично кожним AI агентом при відкритті проекту.
> Тут — операційні правила, команди, середовище.

---

## Проект

React SPA — публічний лендінг для збору пожертвувань на будівництво
Bildungs- & Begegnungszentrum DiTiB Ahlen.

- **Сайт:** https://ditib-ahlen-projekte.de
- **Мови:** DE (за замовчуванням `/`) + TR (`/tr/`)
- **Пов'язаний портал:** `../portal/` → https://mitglied.ditib-ahlen-projekte.de

---

## Порти — фіксовані для всього проекту DITIB Ahlen

> ⛔ **ЗАБОРОНЕНО змінювати порти.** Лендінг працює через Docker на `8082`, портал працює окремо через Homebrew PHP на `8000`.
> Не переносити портал у Docker Desktop і не повертати старі порти `8083`, `5173` або `8383`.

| Порт | Проект | Контейнер | Роль |
|------|--------|-----------|------|
| **8082** | **DITIB Ahlen — Лендінг** | `ditib-ahlen-landing` | Vite dev server (React SPA) |
| **8000** | **DITIB Ahlen — Портал** | без Docker | `php artisan serve --port=8000` у `../portal` |

**Конфіг лендінгу:** `docker-compose.yml`, `vite.config.ts`

---

## Середовище

| | Local | Production |
|--|-------|------------|
| URL | http://localhost:8082 | https://ditib-ahlen-projekte.de |
| DE | http://localhost:8082/ | https://ditib-ahlen-projekte.de/ |
| TR | http://localhost:8082/tr/ | https://ditib-ahlen-projekte.de/tr/ |
| Impressum | http://localhost:8082/impressum | https://ditib-ahlen-projekte.de/impressum |
| Datenschutz | http://localhost:8082/datenschutz | https://ditib-ahlen-projekte.de/datenschutz |
| Kontakt | http://localhost:8082/kontakt | https://ditib-ahlen-projekte.de/kontakt |

---

## Запуск локально

```bash
cd ~/Project/DITIB-Ahlen/main

# Dev через Docker (рекомендовано)
docker compose up

# Dev напряму (Vite)
npm run dev
# → http://localhost:8082
```

---

## Збірка і деплой

```bash
# Build + prerender
npm run build

# Що робить build:
# 1. vite build — компілює React SPA
# 2. node scripts/prerender.mjs — генерує статичні HTML для всіх маршрутів

# Deploy: FTP на PixelX (провайдер)
# Копіювати вміст dist/ в httpdocs/
```

### Prerender — важливо для SEO

Скрипт `scripts/prerender.mjs` генерує статичні HTML-файли для кравлерів.
**При додаванні нових маршрутів** — обов'язково оновлювати prerender!

Поточні маршрути (dist/):
```
index.html              → /
tr/index.html           → /tr/
impressum/index.html    → /impressum
tr/impressum/index.html → /tr/impressum
datenschutz/index.html  → /datenschutz
tr/datenschutz/index.html → /tr/datenschutz
kontakt/index.html      → /kontakt
tr/kontakt/index.html   → /tr/kontakt
```

---

## Стек

| Шар | Технологія | Версія |
|-----|-----------|--------|
| UI | React | 18.3 |
| Мова | TypeScript | 5.8 |
| Routing | React Router | v6 |
| Стилі | Tailwind CSS | v3 |
| UI компоненти | shadcn/ui (Radix) | — |
| SEO | react-helmet-async | 3.0 |
| Build | Vite + SWC | 5.4 |
| i18n | Кастомний хук `useLang` | — |
| Schema.org | Кастомний `structuredData.ts` | — |

---

## Структура маршрутів

```
/             → pages/Index.tsx (DE)
/tr/          → pages/Index.tsx (TR)
/impressum    → pages/Impressum.tsx
/datenschutz  → pages/Datenschutz.tsx
/kontakt      → pages/Kontakt.tsx
/tr/impressum → pages/Impressum.tsx (lang=tr)
/tr/datenschutz → pages/Datenschutz.tsx (lang=tr)
/tr/kontakt   → pages/Kontakt.tsx (lang=tr)
*             → pages/NotFound.tsx
```

Мова визначається автоматично через `useLang()` — читає `pathname`.
Маршрути `/tr/*` повертають `lang="tr"`, всі інші — `lang="de"`.

---

## Архітектура SEO

### На сторінках (runtime)
- `react-helmet-async` (`<Helmet>`) в кожному page-компоненті
- `LangMeta.tsx` — для головної сторінки (Index.tsx)
- Кожна legal-сторінка (Impressum/Datenschutz/Kontakt) — власний `<Helmet>` блок

### При збірці (prerender)
- `scripts/seo-config.mjs` — конфіги SEO для всіх сторінок
  - `SEO.de`, `SEO.tr` — головні сторінки
  - `LEGAL_PAGES.impressum`, `.datenschutz`, `.kontakt` — legal сторінки
- `scripts/prerender.mjs` — генерує static HTML з вже вставленими meta тегами
- `buildHeadHtml()` — для головних сторінок
- `buildLegalHeadHtml()` — для legal сторінок

### JSON-LD schemas
- Головна: Organization, WebSite, WebPage, CivicStructure, ImageObject, DonateAction, FAQPage
- Impressum: WebPage + Organization
- Datenschutz: WebPage + Organization
- Kontakt: ContactPage + Organization (з повними контактними даними)

---

## Legal-сторінки — важливо

**До 2026-05-18:** Impressum, Datenschutz, Kontakt були модальними вікнами у `Footer.tsx`.

**Після 2026-05-18:** Це окремі сторінки з повноцінним SEO.

### Чому зроблено так:
- Потрібні прямі URL-посилання (для юридичних цілей і зовнішніх посилань)
- Модалі не індексуються Google
- Потрібні окремі canonical URLs і hreflang

### Поточна реалізація:
- `src/components/LegalLayout.tsx` — спільний layout для legal сторінок
- `src/pages/Impressum.tsx` — Impressum (діє також для `mitglied.ditib-ahlen-projekte.de`)
- `src/pages/Datenschutz.tsx` — Datenschutz (18 розділів; охоплює лендінг **і** портал)
- `src/pages/Kontakt.tsx` — контакти Bauherr + Entwurfsverfasser

### Datenschutz.tsx — структура розділів (актуальна):
| № | Тема |
|---|------|
| 1 | Verantwortlicher |
| 2 | Hosting und Server-Logdateien |
| 3 | Cookie-Einwilligung und Local Storage (тільки лендінг) |
| 4 | Selbst gehostete Schriftarten |
| 5 | Kontaktaufnahme per E-Mail und Telefon |
| 6 | Spenden über externe Zahlungsdienste |
| 7 | Google Maps |
| 8 | Instagram-Beiträge |
| 9 | Externe Links |
| 10 | SSL-/TLS-Verschlüsselung |
| 11 | Analyse- und Tracking-Dienste (GA4, Clarity) |
| 12 | Mitgliederportal — Registrierung und Mitgliedschaft (Art. 9 DSGVO, IBAN/BIC, SEPA) |
| 13 | *(резерв: Profilbild — додати після liveschaltung фото-функції в порталі)* |
| 14–18 | Ihre Rechte, Beschwerde, LDI NRW, kein Profiling, Aktualisierung |

> ⚠️ Розділ «Profilbild» **не додавати** до liveschaltung фото-функції в порталі. Авторитетний текст — `docs/legal-texts.md`.

### Авторитетний юридичний текст:
**`docs/legal-texts.md`** — master-документ для всіх правових текстів обох сервісів.
- Містить повний текст Datenschutz і Impressum (DE), аналіз gap'ів, строки зберігання, рішення щодо фото-checkbox.
- **При будь-яких змінах** у `Datenschutz.tsx` або `Impressum.tsx` — спочатку оновити `docs/legal-texts.md`.
- Турецький переклад в `Datenschutz.tsx` має відповідати цьому документу.

### LegalLayout — структура (актуальна):
- **Хедер:** `position: absolute`, прозорий фон, не залипає при скролі
  - логотип — ліворуч, вирівняний по лівому краю контенту
  - `LangSwitcher` — праворуч, вирівняний по правому краю контенту
  - ширина хедера: `max-w-3xl` (= ширина контенту)
- **Кнопка «Zur Startseite»** — знаходиться в зоні контенту, над `h1` сторінки, НЕ в хедері
- **`StickyDonateBar`** — присутній на всіх legal-сторінках; кнопка веде на `/#spenden` або `/tr/#spenden`; ховається при видимості `<footer>`
- **Контент:** `max-w-3xl`, `pt-28` (відступ під абсолютний хедер)
- **Анімація входу:** клас `.legal-page-enter` на контентному `div` (НЕ на `<main>`)

> ⚠️ **Важливо:** `.legal-page-enter` використовує `transform` → не застосовувати до елементів, що містять `position: fixed` дочірні елементи (ламає stacking context).

### Footer-посилання:
Footer.tsx тепер використовує React Router `<Link>` з автоматичним мовним prefix:
- DE: `/impressum`, `/datenschutz`, `/kontakt`
- TR: `/tr/impressum`, `/tr/datenschutz`, `/tr/kontakt`

### Modal.tsx:
Залишений у проекті для майбутніх оголошень/повідомлень. Не видаляти.

### useLang — langUrl() (актуальна поведінка):
`langUrl(target)` зберігає поточний шлях при переключенні мови:
- `/impressum` → TR: `/tr/impressum`
- `/tr/datenschutz` → DE: `/datenschutz`
- `/` → TR: `/tr/`

> ⚠️ Для посилань на **головну** сторінку (лого, «Zur Startseite» в LegalLayout) використовувати напряму `lang === "tr" ? "/tr/" : "/"`, а не `langUrl(lang)` — інакше посилання вестиме на поточну сторінку тією ж мовою.

### BreadcrumbList structured data:
Всі три legal-сторінки містять `BreadcrumbList` у `@graph`:
- `Impressum`: `DiTiB Ahlen → Impressum`
- `Datenschutz`: `DiTiB Ahlen → Datenschutzerklärung / Gizlilik Politikası`
- `Kontakt`: `DiTiB Ahlen → Kontakt / İletişim`
Кожен item використовує URL поточної мови.

---

## Структура проекту

```
src/
├── pages/
│   ├── Index.tsx              ← головна (DE + TR)
│   ├── Impressum.tsx          ← /impressum, /tr/impressum — діє для обох доменів
│   ├── Datenschutz.tsx        ← /datenschutz, /tr/datenschutz — 18 розділів, лендінг + портал
│   ├── Kontakt.tsx            ← /kontakt, /tr/kontakt
│   └── NotFound.tsx
├── components/
│   ├── LegalLayout.tsx        ← layout для legal сторінок
│   ├── Footer.tsx             ← посилання на legal сторінки (не модалі)
│   ├── Modal.tsx              ← зберігається для майбутнього
│   ├── LangMeta.tsx           ← SEO для головної
│   └── CookieConsent.tsx
├── seo/
│   └── structuredData.ts      ← JSON-LD schemas (runtime)
├── i18n/
│   ├── de.ts                  ← German translations
│   ├── tr.ts                  ← Turkish translations
│   ├── useLang.ts             ← хук визначення мови з URL
│   └── types.ts
scripts/
├── seo-config.mjs             ← SEO конфіги для prerender
└── prerender.mjs              ← генератор статичних HTML
public/
├── sitemap.xml                ← всі 8 URL з hreflang
├── robots.txt
└── .htaccess                  ← SPA fallback + cache headers
docs/
├── legal-texts.md             ← ⚖️ MASTER: авторитетний текст Datenschutz + Impressum (DE)
├── instagram-live-feed-plan.md
├── instagram-live-feed-stage-2-php-runtime-spec.md
├── instagram-cron-setup.md
└── claude-code-production-cleanup-tz.md
```

---

## Ключові команди

```bash
npm run dev        # dev-сервер (порт 8082)
npm run build      # vite build + prerender
npm run lint       # ESLint
npx tsc --noEmit   # перевірка типів без збірки
```

---

## Sitemap

`public/sitemap.xml` містить 8 URLs:

| URL | Priority | Changefreq |
|-----|----------|------------|
| `/` | 1.0 | monthly |
| `/tr/` | 0.9 | monthly |
| `/kontakt` | 0.5 | monthly |
| `/tr/kontakt` | 0.4 | monthly |
| `/impressum` | 0.3 | yearly |
| `/tr/impressum` | 0.3 | yearly |
| `/datenschutz` | 0.3 | yearly |
| `/tr/datenschutz` | 0.3 | yearly |

При додаванні нових маршрутів — оновити sitemap.xml і prerender.mjs.

---

## Обов'язкові правила

1. ⛔ **Порт 8082** — не змінювати. Лендінг завжди на `localhost:8082`; портал завжди окремо на `localhost:8000`, без Docker Desktop
2. **Prerender** — при нових маршрутах оновлювати `scripts/prerender.mjs` і `scripts/seo-config.mjs`
3. **Sitemap** — синхронізувати з реальними маршрутами
4. **Мови** — завжди обидві (DE + TR): маршрути, hreflang, переклади
5. **Legal-сторінки** — не повертати в модалі
6. **Modal.tsx** — не видаляти (зарезервований для оголошень)
7. **`.htaccess`** — не чіпати SPA fallback правило
8. **`npm run build`** — запускати тільки за командою користувача
9. **`docs/legal-texts.md`** — авторитетний юридичний текст. При змінах у `Datenschutz.tsx` / `Impressum.tsx` — спочатку оновити master-документ, потім TSX. Розділ «Profilbild» в `Datenschutz.tsx` не додавати до liveschaltung фото-функції в порталі.

---

## Хостинг

| Параметр | Значення |
|----------|----------|
| Провайдер | PixelX |
| Deploy | FTP (вміст `dist/`) |
| Document Root | `httpdocs/` |
| Домен | ditib-ahlen-projekte.de |
| Subdomain-портал | mitglied.ditib-ahlen-projekte.de |
