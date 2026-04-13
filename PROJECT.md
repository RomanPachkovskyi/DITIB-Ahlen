# DITIB Ahlen — Культурний центр: Журнал проекту

> Цей файл — хронологічна документація всієї роботи над проектом.
> Оновлюється після кожної значущої зміни.

---

## Що це за проект

**Мета:** React SPA лендінг для збору пожертвувань на будівництво ісламського культурного та громадського центру у м. Ален (Ahlen), Вестфалія, Німеччина.

**Замовник:** DITIB Ahlen — Türkisch Islamische Kultur Verein e.V.  
**Бюджет будівництва:** 5 000 000 €  
**Зібрано:** 2 340 000 € (47%) / 1 847 донорів  

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
| Шрифти | @fontsource/inter latin+latin-ext only (self-hosted, DSGVO) |
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
6.  ProjectPartners     — Bauherr (DITIB) + Entwurfsverfasser (Theismann) + Medienpartner (Munas-Print)
7.  PDFDownloadSection  — 10 архітектурних PDF для завантаження
8.  DonationProgress    — прогрес бар 47%, анімовані лічильники, CTA + desktop QR+IBAN картка
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

### 2026-04-13 — Огляд проекту (спільна робота з Claude)

**Сесія 6 — Onboarding Codex / Технічна карта**

- Виконано первинний технічний аудит структури проекту для спільної роботи агентів.
- Підтверджено, що бойовий застосунок знаходиться в `main/`:
  - React + TypeScript SPA (Vite), головний маршрут `/`, сторінка збирається з секцій у `src/pages/Index.tsx`.
  - Продакшн-інфра: `Dockerfile` (multi-stage), `nginx.conf`, `public/.htaccess`, SEO/Schema у `index.html`.
  - Контент: `public/img`, `public/pdf`, `public/llms.txt`, юридичні модалки в `Footer.tsx`, cookie-consent через `use-cookie-consent.ts`.
- Зафіксовано, що `workspace/` використовується як робоча зона з шаблонами/референсами та підготовчими матеріалами (не основний runtime-код продакшн-сайту).
- Прийнято правило ведення журналу від Codex:
  - Кожен запис містить дату і час.
  - Кожен запис підписується як `Codex`.
  - Нові записи додаються строго в хронологічному порядку.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 13:55 CEST

---

### 2026-04-13 — Юридичні реквізити та Datenschutz

**Сесія 7 — Оновлення Impressum / Datenschutz**

- Оновлено юридичні дані у модальних вікнах `Impressum` і `Datenschutzerklärung`.
- Замінено плейсхолдери на фінальні реквізити:
  - Офіційна назва: `DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.`
  - `Ali Koca` як `1. Vorsitzender`
  - `Amtsgericht Münster`, `VR 50380`
  - `Steuernummer 304/5861/0097`
- Прибрано блок про `USt-IdNr.` як неактуальний для поточного набору підтверджених даних.
- У `Datenschutz` додано окремий блок про перехід на зовнішній платіжний сервіс для пожертв і те, що платіжні дані не обробляються безпосередньо цим сайтом.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 14:20 CEST

---

### 2026-04-13 — Оновлення Instagram

**Сесія 8 — Нове посилання на Instagram**

- Оновлено публічне Instagram-посилання на `https://www.instagram.com/ditib_ahlen_projekte`.
- Синхронізовано відображуваний handle в інтерфейсі, SEO/structured data та `llms.txt`, щоб старий акаунт не залишився в різних джерелах.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 14:31 CEST

---

### 2026-04-13 — Donation UI на десктопі

**Сесія 9 — QR + IBAN у Spendenfortschritt**

- У секцію `Spendenfortschritt` додано desktop-only donation card.
- `QR` використовується як окремий вхід у `PayPal`, без прив'язки до банківського переказу.
- `IBAN DE34 4005 0150 0001 0040 76` показується як окремий спосіб пожертви.
- Для дизайну обрано варіант `qr-spende-2.png`, оскільки він краще інтегрується у світлий QR-блок всередині темної картки.
- Мобільну версію не змінено навмисно, щоб не перевантажувати секцію.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 14:54 CEST

---

### 2026-04-13 — Donation UI refinement

**Сесія 9b — Менше синього, чистіший layout**

- Desktop donation-block у `Spendenfortschritt` перероблено після перегляду.
- Прибрано велику синю картку.
- `IBAN` перенесено в окремий світлий блок під кнопкою `Jetzt spenden`.
- `QR` залишено окремою правою колонкою, вирівняною по висоті від блоку статистики до зони кнопки.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 15:06 CEST

---

### 2026-04-13 — QR cleanup

**Сесія 9c — Мінімальний QR без wrapper**

- QR у `Spendenfortschritt` ще раз спрощено на прохання користувача.
- Прибрано фон, контейнер, підписи й додатковий текст.
- Зменшено розмір QR та зміщено його так, щоб він не заходив на зону кнопки.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 15:11 CEST

---

### 2026-04-13 — Дизайн-система: Hero-стиль по всьому сайту

**Сесія 10 — Редизайн усіх секцій під стиль Hero**

- Повністю видалено Playfair Display — `src/main.tsx` (4 імпорти), `tailwind.config.ts` (fontFamily.display), усі компоненти.
- Inter стає єдиним шрифтом: ваги 300/300i/400/500/600/600i/700/800/900 через @fontsource self-hosted.
- `.heading-xl/lg/md` → `font-weight: 900` (Inter Black).
- Усі кнопки на сайті → `rounded-full` + `hover:scale-[1.04]` (pill-shape).
- Scroll-reveal easing → `cubic-bezier(0.22, 1, 0.36, 1)` (Hero-крива), `translateY(36px)` для `.reveal`, `translateY(28px)` для `.reveal-stagger > *`.
- Другий брендовий колір `#253e54` (dark navy): Footer bg, Cookie widget, section-label, Instagram-кнопка.
- **HeroSection** — повний перероблення: паралакс фон, `animate-hero-zoom` вхід, `animate-hero-slide-up` текст, `animate-hero-fade-scale` CTA, thumbnail-стрічка (прихована на мобільному), SVG divider, lightbox без підписів і градієнту.
- **ImageGallery** — темний фон `#253e54`, 6 нових фото (09/10/11/02/05/07), hover: border+scale (без градієнту і підписів), lightbox `fade-in`.
- **DonationProgress** — кнопка `rounded-full`, PayPal URL.
- **ProjectPartners** → третій партнер Munas-Print (лого/адреса/email), сітка `grid-cols-3`, фіксована висота зони лого 80px + `items-end` для вирівнювання.
- **SocialSection** — кнопка `bg-[#253e54] rounded-full`.
- **Footer** → `bg-[#253e54]`.
- **NavBar / StickyDonateBar** → `rounded-full`.

**Підпис:** Claude  
**Дата/час:** 2026-04-13 15:00 CEST

---

### 2026-04-13 — Оптимізація шрифтів + Фінансова ціль 5M

**Сесія 11 — Font optimization, ціль, llms.txt, og-image**

- Фінансова ціль змінена з 8 000 000 € → **5 000 000 €** у `DonationProgress.tsx`, `index.html` (structured data, FAQ), `llms.txt`.
- Шрифти: замінено `@fontsource/inter/[weight].css` на `latin` + `latin-ext` варіанти — прибрано cyrillic/greek/vietnamese підмножини. CSS зменшено з 96 kB → 79 kB gzip.
- **og-image.jpg** та **og-image.png** оновлено з `workspace/img/`. `og:image` → `.jpg`, `twitter:image` → `.png`.
- `index.html`: усі посилання на неіснуючий файл `ditib-ahlen-kulturzentrum-visualisierung.jpg` → `og-image.jpg`; Gebetsraum → Kulturelle Veranstaltungsräume в structured data.
- **llms.txt** — повністю переписано (EN/DE/TR): ціль 5M, відсоток 47%, акцент що це культурний центр (НЕ мечеть), новий текст проекту з розділами "Warum dieses Projekt wichtig ist".
- Правило для майбутньої роботи: **Build без команди користувача не робити.**

**Підпис:** Claude  
**Дата/час:** 2026-04-13 15:30 CEST

---

## Поточний стан (2026-04-13)

### ✅ Готово
- [x] 13 React компонентів — повністю реалізовано
- [x] Реальні фото (6) та PDF (10)
- [x] Scroll-анімації по всіх секціях (Hero-крива easing)
- [x] Docker (multi-stage build + nginx)
- [x] Apache `.htaccess`
- [x] SEO: JSON-LD × 7, OG (jpg+png), favicons, robots, sitemap, llms.txt
- [x] Impressum + Datenschutz (реальні дані: Ali Koca, VR 50380)
- [x] Cookie Consent + DSGVO (self-hosted fonts, localStorage, §25 TDDDG)
- [x] Git clean history (без Claude attribution)
- [x] Дизайн-система: Inter Black, rounded-full кнопки, #253e54 бренд-колір
- [x] 3 партнери в ProjectPartners (DITIB, Theismann, Munas-Print)
- [x] Desktop donation card: QR-код PayPal + IBAN
- [x] llms.txt оновлено: ціль 5M, культурний центр (не мечеть)

### 🚀 До запуску на хостинг
- [ ] Домен + DNS (A-record)
- [ ] SSL (Let's Encrypt / Certbot)
- [ ] Замінити числа: 2 340 000 € / 1 847 донорів — на актуальні перед запуском
- [ ] Build → `dist/` (командою `npm run build`)

---

## Ключові файли

```
src/
├── components/
│   ├── HeroSection.tsx          — головне фото + лого + CTA
│   ├── ProjectIntro.tsx         — текстовий опис проекту
│   ├── VisionSection.tsx        — 3 картки (Bildung/Begegnung/Gebet)
│   ├── ImageGallery.tsx         — 6 фото grid
│   ├── ProjectPartners.tsx      — 3 партнери з лого (mix-blend-mode, grid-cols-3)
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

### 2026-04-13 — PayPal icon refinement

**Сесія 12b — Біла line-style іконка в CTA**

- Брендова синя PayPal-іконка в CTA замінена на просту білу line-style версію.
- Розмір і візуальна вага приведені ближче до кнопки Instagram та sticky donate button.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 15:16 CEST

---

### 2026-04-13 — PayPal CTA update

**Сесія 12 — Кнопка PayPal у Spendenfortschritt**

- CTA у блоці `Spendenfortschritt` змінено з `Jetzt spenden` на `Jetzt PayPal spenden`.
- Додано PayPal-іконку в саму кнопку для більш очевидного зв'язку з методом оплати.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 15:31 CEST

---

### 2026-04-13 — QR breakpoint fix

**Сесія 12c — QR доступний на менших desktop-екранах**

- Показ QR та desktop donation-елементів перенесено з breakpoint `xl` на `lg`.
- Це повертає QR на менші ноутбуки й звичайні desktop-екрани, де раніше він уже зникав.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 15:55 CEST

---

### 2026-04-13 — IBAN block under CTA

**Сесія 12d — Німецький формат банківських реквізитів**

- Банківський блок перенесено під кнопку `Jetzt PayPal spenden`.
- Оформлено в звичному для Німеччини форматі: `Bank`, `Empfaenger`, `IBAN`, `Verwendungszweck`.
- Рекомендований `Verwendungszweck`: `Spende Kulturzentrum Ahlen`.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 15:56 CEST

---

### 2026-04-13 — Reveal bug fix

**Сесія 12e — Банківський блок знову видимий**

- Знайдено причину, чому банківський блок не показувався: `reveal` був без прив'язаного `ref`.
- Додано окремий `useScrollReveal` ref для блоку банківських реквізитів у `Spendenfortschritt`.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:00 CEST

---

### 2026-04-13 — DonationProgress cleanup

**Сесія 12f — Видалення Spender:innen і фінальна поліровка**

- З блоку `Spendenfortschritt` повністю прибрано метрику `Spender:innen 1.847`.
- Верхній блок статистики перебудовано з 3 колонок у 2: `Gesammelt` і `Erreicht`.
- Збільшено відстань між кнопкою `Jetzt PayPal spenden` і блоком `Bankueberweisung`.
- У мобільній версії перероблено вертикальний ритм банківського блоку: пари `label → value` стали щільнішими між собою і краще відділеними від наступної пари.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:06 CEST

---

### 2026-04-13 — ProjectPartners mobile alignment

**Сесія 12g — Центрування партнерів на мобільній версії**

- У блоці `Projektbeteiligte` логотипи та інформацію про компанії вирівняно по центру для mobile.
- На `md+` залишено попереднє ліве вирівнювання, щоб не змінювати desktop-layout.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:10 CEST

---

### 2026-04-13 — PDF section mobile + browser open

**Сесія 12h — Dokumente на мобільному і відкриття PDF в браузері**

- У блоці `Dokumente` мобільну сітку змінено на 2 колонки.
- Іконки документів на мобільній версії збільшено вдвічі.
- PDF більше не форсуються до завантаження:
  - у фронтенді прибрано `download` і додано відкриття в новій вкладці;
  - у `nginx.conf` та `.htaccess` прибрано `Content-Disposition: attachment`.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:13 CEST

---

### 2026-04-13 — Social buttons mobile sizing

**Сесія 12i — Folgen Sie uns mobile CTA alignment**

- У блоці `Folgen Sie uns` mobile-кнопки збільшено до розміру `Ich moechte spenden`.
- На мобільній версії кнопки центровано і вирівняно по посадці та padding.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:15 CEST

---

*Документ оновлено: 2026-04-13 16:15 CEST (Codex)*
