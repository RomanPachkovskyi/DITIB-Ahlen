# DITIB Ahlen — Культурний центр: Журнал проекту

> Цей файл — хронологічна документація всієї роботи над проектом.
> Оновлюється після кожної значущої зміни.

---

## Що це за проект

**Мета:** React SPA лендінг для збору пожертвувань на будівництво ісламського культурного та громадського центру у м. Ален (Ahlen), Вестфалія, Німеччина.

**Замовник:** DITIB Ahlen — Türkisch Islamische Kultur Verein e.V.  
**Бюджет будівництва:** 8 000 000 €  
**Зібрано:** 2 340 000 € (29%) / 1 847 донорів  

**Репозиторій:** `git@github.com:RomanPachkovskyi/DITIB-Ahlen.git`  
**Локальний шлях:** `/Users/roman/Project/DITIB-Ahlen/main/`  
**Порт dev-серверу:** 8080

---

## Tech Stack

| Шар | Технологія |
|-----|-----------|
| Frontend | React 18.3.1 + TypeScript 5.8.3 |
| Build | Vite 5.4.19 |
| Стилі | Tailwind CSS 3.4.17 + shadcn/ui + Radix UI |
| Шрифти | @fontsource/inter + @fontsource/playfair-display (self-hosted) |
| Роутинг | React Router DOM 6.30.1 |
| Сервер | Docker multi-stage → nginx:alpine |
| Хостинг | Apache (shared hosting) / або будь-який nginx |

---

## Структура секцій (в порядку на сторінці)

```
1.  NavBar              — фіксований, з'являється після scroll 60% vh
2.  HeroSection         — головне фото, лого DITIB, CTA "Ich möchte spenden"
3.  ProjectIntro        — опис проекту, 8M EUR
4.  VisionSection       — 3 блоки: Bildung / Begegnung / Gebet
5.  ImageGallery        — 6 архітектурних фото (grid)
6.  ProjectPartners     — Bauherr (DITIB) + Entwurfsverfasser (Theismann)
7.  PDFDownloadSection  — 10 архітектурних PDF для завантаження
8.  DonationProgress    — прогрес бар 29%, анімовані лічильники, CTA
9.  SocialSection       — посилання на Instagram @ditibahlen
10. FinalCTA            — фінальна кнопка пожертвування
11. Footer              — модальні вікна: Impressum / Datenschutz / Kontakt
12. StickyDonateBar     — фіксована панель знизу (primary bg, біла кнопка)
13. CookieConsent       — банер / налаштування / floating widget
```

---

## Хронологія змін

### 2025-01-01 — Ініціалізація

- Базовий шаблон: `vite_react_shadcn_ts` (commit `95d05da`)

---

### 2026-04-05 — Початок активної розробки

**Сесія 1 — Запуск проекту**

- `9a56e41` Перший повноцінний лендінг: HeroSection, DonationProgress, VisionSection, ProjectIntro, Footer
- `3d80e29` Premium-стиль: Playfair Display + Inter, терракотова палітра
- `1a417a2` Закруглення кутів
- `ba5e530` Refinements секцій
- `549edca` Додано блок `ProjectPartners`
- `0a6216e` Merge локальної та remote-версії
- `49ee484` Docker multi-stage build + nginx.conf (порт 8080)
- `4a266e4` Анімації, sticky nav, картки, lightbox
- `5d1d775` StickyDonateBar (залипаюча нижня панель з кнопкою)
- `4e7ddad` VisionSection: hover → сірий фон `#f0f0f0`
- `1a1c110` StickyDonateBar ховається коли FinalCTA у viewport
- `4ef7157` Footer: модальні вікна Impressum / Datenschutz / Kontakt (shadcn Modal)
- `ebb2fb9` PDFDownloadSection: grid layout як у референсі
- `d115c04` / `ceedf3e` Білий фон для PDF секції та FinalCTA

---

### 2026-04-06 — Реальний контент

**Сесія 2 — Наповнення реальними даними**

- `49673e8` **Реальні фото та PDF:**
  - Головне фото: `ditib-ahlen-kulturzentrum-visualisierung.jpg`
  - 6 фото галереї з SEO-іменами (`ditib-ahlen-*.jpg`)
  - 10 реальних архітектурних PDF з папки `workspace/pdf/`
  - Email партнерів: `info@ditib-ahlen-projekte.de` / `info@theismannundpartner.de`
  - SocialSection фон змінено з кремового на білий
- `199f203` **HeroSection покращення:**
  - Лого DITIB у верхньому лівому куті (`h-20`)
  - Затемнення overlay: `from-black/65 via-black/40 to-black/10` (чорний)
  - Підзаголовок: `text-white`

**Dockerfile fix:** `chmod -R 755` — вирішив 403 на зображеннях після Docker rebuild

---

### 2026-04-07 — SEO, анімації, юридика

**Сесія 3 — Scroll-анімації**

- `ee59b14` **Повна система scroll-reveal:**
  - `.reveal` / `.is-visible` (IntersectionObserver, threshold 0.08)
  - `.reveal-stagger` з nth-child затримками (0 / 90 / 180 / 270 / 340 / 400 / 440ms)
  - `spring cubic-bezier(0.16, 1, 0.3, 1)` для плавності
  - `will-change: opacity, transform`
  - Анімація в кожному компоненті (HeroSection, ProjectIntro, VisionSection, DonationProgress, FinalCTA, SocialSection, ProjectPartners)

**Сесія 4 — Vercel + Git**

- `0b59954` / `6ba0bbb` **Повне технічне SEO:**
  - `index.html`: canonical, keywords, OG (1200×630), Twitter Card, favicons, theme-color `#7B3521`
  - JSON-LD: `ReligiousOrganization`, `WebSite`, `WebPage`, `CivicStructure`, `DonateAction`, `FAQPage` (9 FAQ), `BreadcrumbList`
  - `public/robots.txt` — Googlebot, Bing, Yandex, GPTBot, Claude-Web, PerplexityBot; блокує Ahrefs/Semrush
  - `public/sitemap.xml` — priority 1.0, lastmod 2026-04-07
  - `public/llms.txt` — ~500 рядків трилінгвальна (EN/DE/TR) база знань для AI
  - Нові фавікони: `favicon.svg` + `favicon.png` (замість .ico)
  - OG image: `og-image.jpg` 1200×630

- `32fa3a0` FAQPage structured data (9 питань і відповідей)

- `054fe2b` **`.htaccess` для Apache:**
  - Force HTTPS + non-www redirect
  - SPA fallback (всі шляхи → index.html)
  - gzip компресія
  - Cache-Control для статичних активів
  - PDF: `Content-Disposition: attachment`
  - Security headers (X-Frame-Options, CSP, HSTS)
  - Захист `.env` / `.git`
  - Блокування шкідливих ботів

- `5c70b6b` **Лого партнерів:**
  - DITIB: `/img/ditib-ahlen-logo.png`
  - Theismann: `/img/theismann-partner-logo.jpg`
  - Розмір `w-20 h-20 object-contain`

- **Виправлення git/Vercel:**
  - `git filter-branch` для видалення Co-Authored-By Claude з усієї історії
  - Виправлено email `git config user.email "rpachkovskyi@gmail.com"`
  - Очищено `refs/original/` після filter-branch
  - Vercel: репозиторій переведено в публічний

- `a087827` / `aec7ac6` **Kontakt modal** — реальні контактні дані:
  - Bauherr: DITIB Ahlen, Rottmannstr. 62, Fon 02382/61599
  - Theismann: Nordstraße 29, Fon 02382/85050

- **DonationProgress:** прогрес бар уповільнено до `3600ms`

- `83afd5c` **Cookie Consent (DSGVO-compliant):**
  - Self-hosted шрифти: `@fontsource/inter` + `@fontsource/playfair-display` (Google Fonts видалено — DSGVO!)
  - `use-cookie-consent.ts` хук (localStorage `ditib_cookie_consent`, version 1)
  - `CookieConsent.tsx`: Banner + Settings modal + floating Widget
  - 3 категорії: Technisch notwendig (завжди) / Analyse (опц.) / Externe Inhalte (опц.)
  - Floating Shield-кнопка — ліворуч, динамічно уникає Footer та StickyDonateBar
  - Datenschutzerklärung оновлено: §25 TDDDG, self-hosting fonts, 13 розділів

- `e6d172c` **UI refinements:**
  - StickyDonateBar: primary bg, біла кнопка по центру, без тексту "29%"
  - Всі кнопки: `rounded-xl` (більше закруглення)
  - Smooth scroll: `scroll-behavior: smooth` + `scroll-padding-top: 72px`

- **Footer — Impressum і Datenschutz** наповнено реальними даними:
  - Повний Impressum (§5 TMG) з плейсхолдерами для Vorstand/Registernummer
  - Datenschutzerklärung 13 розділів (DSGVO + TDDDG)
  - Footer layout: 3 колонки — copyright | кнопки по центру | Munas-Print посилання

**Сесія 5 — Partner logos**

- `8160964` / `8548258` / `bc06203` **ProjectPartners редизайн:**
  - Лого над текстом (не збоку)
  - `mix-blend-mode: multiply` з `bg-background` wrapper → прибирає білий фон
  - Природний розмір: `max-w-[160px] max-h-[80px]`
  - `gap-2.5` між лого і текстом

---

## Поточний стан (2026-04-08)

### ✅ Готово
- [x] 13 React компонентів — повністю реалізовано
- [x] Реальні фото (6) та PDF (10)
- [x] Scroll-анімації по всіх секціях
- [x] Docker (multi-stage build + nginx)
- [x] Apache `.htaccess`
- [x] SEO: JSON-LD × 7, OG, favicons, robots, sitemap, llms.txt
- [x] Impressum + Datenschutz (потрібні: Vorstand + Registernummer)
- [x] Cookie Consent + DSGVO (self-hosted fonts, localStorage, §25 TDDDG)
- [x] Git clean history (без Claude attribution)
- [x] `dist/` build готовий для хостингу

### ⏳ Плейсхолдери — треба заповнити
- [ ] `[VORSTAND_NAME]` — ПІБ 1. Vorsitzender (Impressum + Datenschutz)
- [ ] `[AMTSGERICHT]` — реєстраційний суд (Amtsgericht Münster або Warendorf)
- [ ] `[REGISTERNUMMER]` — VR номер у Vereinsregister

### 🚀 До запуску на хостинг
- [ ] Домен + DNS (A-record)
- [ ] SSL (Let's Encrypt / Certbot)
- [ ] Замінити числа: 2 340 000 € / 1 847 donорів — на актуальні
- [ ] Платіжна інтеграція (кнопка "Spenden" зараз веде на `#spenden` anchor)

---

## Ключові файли

```
src/
├── components/
│   ├── HeroSection.tsx          — головне фото + лого + CTA
│   ├── ProjectIntro.tsx         — текстовий опис проекту
│   ├── VisionSection.tsx        — 3 картки (Bildung/Begegnung/Gebet)
│   ├── ImageGallery.tsx         — 6 фото grid
│   ├── ProjectPartners.tsx      — 2 партнери з лого (mix-blend-mode)
│   ├── PDFDownloadSection.tsx   — 10 PDF для завантаження
│   ├── DonationProgress.tsx     — прогрес бар + CountUp + CTA
│   ├── SocialSection.tsx        — Instagram CTA
│   ├── FinalCTA.tsx             — фінальна кнопка
│   ├── Footer.tsx               — Impressum / Datenschutz / Kontakt modal
│   ├── NavBar.tsx               — sticky header (з'являється після 60% vh)
│   ├── StickyDonateBar.tsx      — primary bg, біла кнопка, зникає біля FinalCTA
│   ├── CookieConsent.tsx        — Banner + Settings + Widget (Shield icon, зліва)
│   └── Modal.tsx                — базовий modal (scroll lock, ESC, focus trap)
├── hooks/
│   ├── use-scroll-reveal.ts     — IntersectionObserver для анімацій
│   ├── use-count-up.ts          — анімований лічильник чисел
│   └── use-cookie-consent.ts    — стан consent (localStorage)
├── index.css                    — токени + .reveal + .reveal-stagger
└── main.tsx                     — @fontsource imports (self-hosted)

public/
├── img/                         — фото + лого (ditib, theismann, og-image)
├── pdf/                         — 10 архітектурних PDF
├── robots.txt                   — SEO + AI crawlers config
├── sitemap.xml                  — 1 URL, priority 1.0
├── llms.txt                     — AI knowledge base (EN/DE/TR)
├── favicon.svg / favicon.png    — фавіконки
└── .htaccess                    — Apache production config

Dockerfile                       — node:20-alpine build → nginx:alpine serve
nginx.conf                       — gzip, cache, SPA fallback, PDF headers
```

---

## Команди

```bash
# Dev
npm run dev              # Vite dev server

# Build
npm run build            # → dist/ (для хостингу)

# Docker (локальний preview)
docker compose up --build   # http://localhost:8080

# Git
git log --oneline | head -20
```

---

## Контакти

| Роль | Контакт |
|------|---------|
| Bauherr | DITIB Ahlen, Rottmannstr. 62, 59229 Ahlen, +49 2382 61599, info@ditib-ahlen-projekte.de |
| Architektur | Ingenieurbüro Theismann & Partner, Nordstraße 29, 59227 Ahlen, +49 2382 85050, info@theismannundpartner.de |
| Web dev | Munas-Print, https://munas-print.de/ |

---

*Документ оновлено: 2026-04-08*
