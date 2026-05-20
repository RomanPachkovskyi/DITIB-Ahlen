# DITIB Ahlen — Культурний центр: Журнал проекту

> Цей файл — хронологічна документація всієї роботи над проектом.
> Оновлюється після кожної значущої зміни.

---

## Що це за проект

**Мета:** React SPA лендінг для збору пожертвувань на будівництво ісламського культурного та громадського центру у м. Ален (Ahlen), Вестфалія, Німеччина.

**Замовник:** DITIB Ahlen — Türkisch Islamische Kultur Verein e.V.  
**Бюджет будівництва:** 5 000 000 €  

**Репозиторій:** `git@github.com:RomanPachkovskyi/DITIB-Ahlen.git`  
**Локальний шлях:** `/Users/roman/Project/DITIB-Ahlen/main/`  
**Порт dev-серверу:** 8082
**Пов'язаний портал:** `../portal/` локально працює тільки на `http://localhost:8000` через `php artisan serve --port=8000`, без Docker Desktop.

> Поточна істина по локальних портах: лендінг `http://localhost:8082`, портал `http://localhost:8000`. Старі згадки `8080`, `8083`, `5173` або `8383` у хронології нижче є історичними і не є актуальними правилами.

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

## Responsive System

- Breakpoint-и використовуємо стандартні Tailwind:
  - `sm` = `640px`
  - `md` = `768px`
  - `lg` = `1024px`
  - `xl` = `1280px`
  - `2xl` = `1536px`
- Основна робоча логіка для цього сайту:
  - mobile: `<768px`
  - tablet: `>=768px`
  - desktop: `>=1024px`
  - `xl` використовуємо лише для wide-секцій, а не як обов'язковий окремий layout-step.
- Стандарт контейнерів по сайту:
  - default section container: `max-w-5xl` = `1024px`
  - text-focused container: `max-w-4xl` = `896px`
  - wide showcase container: `max-w-[1440px]` = `1440px`
  - окрема текстова колонка: `32rem–34rem` = `512–544px`
- Практичне правило:
  - звичайні текстові та контентні секції тримаємо в `1024px`
  - довгі текстові блоки не розтягуємо ширше без окремої причини
  - Hero, gallery та інші wide-секції можуть бути ширшими, але не безкінечними: максимум `1440px` для внутрішнього контенту/сітки

---

## Структура секцій (в порядку на сторінці)

```
1.  NavBar              — фіксований, з'являється після scroll 60% vh
2.  HeroSection         — головне фото, лого DITIB, CTA "Ich möchte spenden"
3.  ProjectIntro        — опис проекту, 8M EUR
4.  VisionSection       — 3 блоки: Bildung / Begegnung / Gebet
5.  ImageGallery        — 6 архітектурних фото (grid)
6.  ProjectPartners     — 2 Hauptbeteiligte (DITIB, Theismann) + Partner (Munas-Print, 8media, ASK Ahlen)
7.  PDFDownloadSection  — 10 архітектурних PDF для завантаження
8.  DonationProgress    — прогрес збору, анімовані лічильники, CTA + desktop QR+IBAN картка
9.  CompanySupportSection — підтримка для Unternehmen / Sachleistungen / Dienstleistungen
10. MapSection         — Google Maps карта ділянки з точним polygon-контуром забудови
11. SocialSection      — Instagram + Facebook CTA
12. FinalCTA           — фінальна кнопка пожертвування
13. Footer             — посилання на /impressum, /datenschutz, /kontakt (React Router Link)
14. StickyDonateBar    — фіксована панель знизу (primary bg, біла кнопка)
15. CookieConsent      — банер / налаштування / floating widget
```

---

## Хронологія змін

Правило ведення цього журналу:
- нові записи додаються строго в кінець секції `Хронологія змін`
- порядок читання завжди зверху вниз: від старіших записів до новіших
- службові секції `Поточний стан`, `Ключові файли`, `Команди`, `Контакти` мають бути тільки після завершення всієї хронології

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
  - Datenschutzerklärung оновлено: §25 TDDDG, self-hosting fonts, 16 розділів

- `e6d172c` **UI refinements:**
  - StickyDonateBar: primary bg, біла кнопка по центру, без тексту "29%"
  - Всі кнопки: `rounded-xl` (більше закруглення)
  - Smooth scroll: `scroll-behavior: smooth` + `scroll-padding-top: 72px`

- **Footer — Impressum і Datenschutz** наповнено реальними даними:
  - Повний Impressum (§5 TMG) з плейсхолдерами для Vorstand/Registernummer
  - Datenschutzerklärung 16 розділів (DSGVO + TDDDG)
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

**Підпис:** Codex  
**Дата/час:** 2026-04-13 15:00 CEST

---

### 2026-04-13 — Оптимізація шрифтів + Фінансова ціль 5M

**Сесія 11 — Font optimization, ціль, llms.txt, og-image**

- Фінансова ціль змінена з 8 000 000 € → **5 000 000 €** у `DonationProgress.tsx`, `index.html` (structured data, FAQ), `llms.txt`.
- Шрифти: замінено `@fontsource/inter/[weight].css` на `latin` + `latin-ext` варіанти — прибрано cyrillic/greek/vietnamese підмножини. CSS зменшено з 96 kB → 79 kB gzip.
- **og-image.jpg** та **og-image.png** оновлено з `workspace/img/`. `og:image` → `.jpg`, `twitter:image` → `.png`.
- `index.html`: усі посилання на неіснуючий файл `ditib-ahlen-kulturzentrum-visualisierung.jpg` → `og-image.jpg`; Gebetsraum → Kulturelle Veranstaltungsräume в structured data.
- **llms.txt** — повністю переписано (EN/DE/TR): ціль 5M, прогрес збору, акцент що це культурний центр (НЕ мечеть), новий текст проекту з розділами "Warum dieses Projekt wichtig ist".
- Правило для майбутньої роботи: **Build без команди користувача не робити.**

**Підпис:** Codex  
**Дата/час:** 2026-04-13 15:30 CEST

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

### 2026-04-15 — ProjectPartners redesign + partner logos

**Сесія 13 — Новий дизайн і логіка блоку `Projektbeteiligte`**

- Блок `ProjectPartners` перероблено з карток у легкий data-driven layout без обводок і різних фонів.
- Структура даних:
  - `mainParticipants` — головні учасники:
    - Bauherr: `DITIB - Ahlen (Westf.)`, `Türkisch Islamische Gemeinde zu Ahlen e.V.`
    - Entwurfsverfasser / Tragwerksplanung: `Ingenieurbüro Theismann & Partner`, `Dipl.-Ing. Bernd Theismann`
  - `projectPartners` — партнери:
    - Medienpartner: `Munas-Print`, `Werbeagentur`
    - Medienpartner: `8media`, `Videoproduktion`
    - Projektpartner: `ASK Ahlen`
- Описові тексти біля учасників прибрано: залишаються тільки логотип/fallback, роль, назва і короткий підзаголовок.
- Логотипи головних учасників збільшено приблизно на 40% (`max-h-[90px]`, `max-w-[238px]`).
- Логотипи трьох партнерів збільшено приблизно на 30% (`max-h-[83px]`, `max-w-[221px]`).
- Відступ між логотипом і текстом на `sm+` — `30px`, причому колонка логотипу `max-content`, щоб відступ рахувався від фактичного краю лого, а не від резервної ширини.
- На mobile логотипи центруються (`justify-self-center`), на `sm+` повертаються в ліве вирівнювання біля тексту.
- Для реальних `<img>` залишено `style={{ mixBlendMode: "multiply" }}`; зона логотипу має `bg-background`, щоб blend працював як у старій реалізації.
- Логотип Theismann залишено оригінальним JPG: `/img/ingenieurbuero-theismann-partner-logo.jpg`. PNG-версію не використовувати.
- Нові логотипи партнерів підключено через `src/assets`, а не через `public/img`, бо dev server на `8080` для нових public-файлів повертав HTML fallback:
  - `src/assets/Munas-Print_Logo-2.png`
  - `src/assets/8media-logo.png`
  - `src/assets/ASK-logo.png`
- Перевірка: `npm run build` проходить успішно.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 08:49 CEST

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

### 2026-04-13 — PayPal CTA icon cleanup

**Сесія 12j — CTA у стилі social buttons**

- У кнопці `Jetzt PayPal spenden` прибрано окрему PayPal-іконку.
- Після тексту додано стрілку в тому ж стилі, що в кнопках `Instagram` і `Facebook`.
- Для стрілки застосовано той самий hover-ефект з opacity та легким зсувом по діагоналі.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:18 CEST

---

### 2026-04-13 — PayPal CTA copy update

**Сесія 12k — Уточнення назви кнопки PayPal**

- Назву кнопки змінено з `Jetzt PayPal spenden` на `Spenden mit PayPal`.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:22 CEST

---

### 2026-04-13 — QR asset refresh

**Сесія 12l — Оновлення зображення PayPal QR**

- Поточний QR для пожертв замінено на новий файл `qr-spende-3.png`.
- Заміна виконана через оновлення `public/img/qr-spende-paypal.png`, без зміни шляху в компоненті.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:26 CEST

---

### 2026-04-13 — Technical SEO social entity signals

**Сесія 12m — Instagram і Facebook у технічному SEO**

- У `index.html` додано `rel="me"` посилання на Instagram і Facebook.
- У structured data `ReligiousOrganization.sameAs` тепер включає обидва соцпрофілі.
- У FAQ schema оновлено відповідь про відстеження прогресу, щоб згадувати і Instagram, і Facebook з прямими посиланнями.
- У `llms.txt` додано Facebook у контактний блок і підсилено social/entity keyword signals.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:31 CEST

---

### 2026-04-13 — Technical SEO overhaul

**Сесія 12n — Schema, meta, donation markup і image SEO**

- Оновлено `title`, `meta description`, `og:title`, `og:description`, `twitter:title`, `twitter:description` під актуальний snippet/social intent.
- У `index.html` прибрано застарілий `meta keywords`, додано `max-image-preview:large` та посилено `Organization`, `WebPage`, `DonateAction`, `ImageObject` structured data.
- У schema синхронізовано офіційну назву `DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.`, додано `legalName`, `identifier`, `contactPoint`, актуалізовано FAQ-відповіді та donation semantics.
- Усі основні runtime-зображення перейменовано в SEO-релевантні німецькі назви файлів; оновлено шляхи в hero, gallery, logos, social preview та PayPal QR.
- Для всіх використаних зображень оновлено `alt` німецькою мовою до більш описових і пошуково-релевантних формулювань.
- У `llms.txt` приведено entity-дані до офіційної назви та прибрано застарілу згадку про кількість донорів.
- У `sitemap.xml` оновлено `lastmod` до `2026-04-13`.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:49 CEST

---

### 2026-04-13 — Hosting plan reconciliation

**Сесія 12o — Актуалізація HOSTING_PLAN**

- `HOSTING_PLAN.md` звірено з фактичним станом проєкту і очищено від застарілих пунктів.
- Позначено як виконані: build, Docker multi-stage, nginx SPA fallback, gzip, cache headers, PDF, Cookie banner, Impressum/Datenschutz, PayPal + IBAN, базове технічне SEO.
- Окремо залишено тільки реальні відкриті питання: домен, SSL, production hosting, Search Console / Bing Webmaster Tools, аналітика, фінальне підтвердження контенту.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 16:58 CEST

---

### 2026-04-13 — Hosting plan уточнення від користувача

**Сесія 12p — Домен, PixelX і Search Console**

- У `HOSTING_PLAN.md` зафіксовано активний домен `https://ditib-ahlen-projekte.de/`.
- Додано, що production-хостинг уже є: `PixelX`.
- Позначено `Google Search Console` як уже підключений.
- Аналітику винесено як відкладений етап з окремим нагадуванням оновити cookie consent і Datenschutzerklärung під час підключення.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 17:03 CEST

---

### 2026-04-13 — Local hosting build

**Сесія 12q — Свіжий production build для хостингу**

- Виконано локальний `npm run build` у папці `main/`.
- Оновлено production-артефакти в `dist/` для завантаження на хостинг.
- Актуальний bundle після збірки: `index-CNUol0ZS.js` та `index-BGyuR2d4.css`.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 17:04 CEST

---

### 2026-04-13 — FTP deployment workflow confirmed

**Сесія 12r — PixelX деплой через FTP**

- Підтверджено, що production deploy на `PixelX` виконується вручну через FTP.
- У `HOSTING_PLAN.md` зафіксовано, що на хостинг завантажується готова папка `dist/`.

**Підпис:** Codex  
**Дата/час:** 2026-04-13 17:06 CEST

---

### 2026-04-14 — Analytics, Consent і image SEO finalized

**Сесія 13 — GA4 + Clarity + GDPR/EEA + image sitemap**

- Підключено `Google Analytics 4` (`G-BM587Q3MEJ`) і `Microsoft Clarity` (`wbfipf9pd3`) у production-коді.
- `Google Search Console` окремо зафіксовано як уже підключений сервіс вебмайстра; він не є browser-side tracking script і не потребує окремої cookie-категорії.
- Для ЄС/ЄЕЗ свідомо обрано підхід **basic consent**:
  - скрипти `GA4` і `Clarity` не завантажуються до згоди користувача;
  - після згоди вони інжектяться динамічно через `AnalyticsManager.tsx`;
  - при відмові або відкликанні згоди `GA4` блокується, а відомі `GA` cookies очищаються.
- Поточний стан згоди зберігається у `localStorage`:
  - ключ: `ditib_cookie_consent`
  - структура: `version`, `timestamp`, `consent`
  - категорії: `necessary`, `analytics`, `external`
- `use-cookie-consent.ts` доповнено подією синхронізації `ditib:consent-changed`, щоб банер, модалка налаштувань і runtime-аналітика працювали узгоджено.
- На самому cookie-банері та в налаштуваннях прямо вказано, що категорія `Analyse & Statistik` охоплює:
  - `Google Analytics 4`
  - `Microsoft Clarity`
- `Datenschutzerklärung` оновлено під фактичний стан:
  - описано `GA4` і `Clarity` як optional analytics tools;
  - зазначено, що обидва сервіси активуються лише після згоди;
  - додано пояснення про `Google Search Console` як інструмент вебмайстра, а не фронтенд-трекер;
  - додано зовнішні посилання на privacy/consent-документацію провайдерів.
- Технічний підхід перевірено після збірки:
  - у `index.html` і `dist/index.html` більше немає раннього вбудованого підключення `googletagmanager` чи `clarity.ms`;
  - production build успішно проходить через `npm run build`.
- Для image SEO:
  - базовий `public/sitemap.xml` актуалізовано під односторінковий сайт;
  - додано окремий `public/sitemap-images.xml` з релевантними runtime-зображеннями;
  - `public/robots.txt` оновлено так, щоб пошуковики бачили обидва sitemap-файли.
- Висновок по compliance:
  - реалізація узгоджена з власним cookie-banner підходом;
  - для поточного сайту не використовується server-side журнал згод, вибір користувача зберігається локально в браузері;
  - advanced consent mode від Google окремо розглянуто, але свідомо не впроваджено на цьому етапі.

**Підпис:** Codex  
**Дата/час:** 2026-04-14 11:05 CEST

---

### 2026-04-14 — Тексти, responsive-система і редизайн секцій

**Сесія 14 — Content pass + layout system + carousel**

- Оновлено тексти в `HeroSection`:
  - eyebrow змінено на `DiTiB Ahlen · Ein Zukunftsprojekt`
  - H1 змінено на `Bildungs- & Begegnungszentrum` + курсивний другий рядок `für Ahlen`
  - subtitle змінено на `Zusammenhalt stärken. Ahlen gestalten.` з акцентним виділенням слова `stärken`
- Збільшено дві preview-фотографії в Hero приблизно на 50%.
- Переглянуто width strategy для сайту і зафіксовано responsive-систему:
  - стандартні Tailwind breakpoint-и: `640 / 768 / 1024 / 1280 / 1536`
  - основний layout-підхід: mobile-first, з ключовими переходами на `md` і `lg`
  - стандартний контейнер секцій: `1024px`
  - text-focused container: `896px`
  - wide showcase container для Hero/Gallery: `1440px`
- `HeroSection` і `ImageGallery` обмежено по максимальній ширині, щоб wide-секції не розтягувались безкінечно на великих моніторах:
  - внутрішній контент Hero тепер capped на `1440px`
  - grid у галереї також capped на `1440px`
- `ProjectIntro` (`Über das Projekt`) повністю перебудовано під новий approved-контент з документа `workspace/Text/Approved texts - ditib-ahlen-projekte.md`:
  - оновлено H2 на `Mehr als ein Gebäude — ein Versprechen an Ahlen.`
  - секцію перетворено на чистий текстовий двоколонковий блок без карткового стилю
  - додано жирні мініпідзаголовки для кожного текстового фрагмента
  - повернуто `—` перед eyebrow
  - прибрано декоративний background
  - прибрано роздільну лінію між заголовком і текстом
  - колонки вирівняно по верхньому краю
  - зменшено відстань між мініпідзаголовками та абзацами
  - ширину секції приведено до загальної сітки сайту (`1024px`)
- `VisionSection` повністю перероблено під нову структуру і новий текст із approved-документа:
  - замість 3 карток тепер 6 карток
  - секцію переведено в carousel на базі `Embla`
  - підтримується drag мишкою і swipe на touch-пристроях
  - додано стрілки керування у верхній правій частині блоку
  - увімкнено безкінечну карусель (`loop`)
  - для UX додано `peek` наступної картки, fade-натяк по краю і індикатор `01 / 06`
  - вимкнено виділення тексту під час drag, щоб карусель було зручно гортати мишкою
  - повернуто легший стиль карток без рамок, лише з візуальними розділювачами між елементами
  - прибрано лінію між хедером блоку і самою каруселлю
- Виконано фінальний production build:
  - `npm run build` успішно завершився
  - актуальні production-артефакти оновлено в `dist/`
  - поточний bundle після збірки: `index-CNdrw8ZQ.js` та `index-B_-Qn-Jj.css`

**Підпис:** Codex  
**Дата/час:** 2026-04-14 17:18 CEST

---

### 2026-04-15 — Пункти 6/7, mobile footer і structured data note

**Сесія 15 — Company support, donation hint, footer UX і fresh build**

- Реалізовано пункт 6 з робочого документа:
  - додано новий компонент `CompanySupportSection`
  - блок вставлено після `DonationProgress` і перед `SocialSection`
  - блок пояснює можливість підтримки проєкту для компаній не лише грошима, а також через `Sachleistungen`, `Dienstleistungen` або індивідуальну пропозицію
  - додано CTA `Vorschlag per E-Mail senden` з `mailto:info@ditib-ahlen-projekte.de`
- Реалізовано пункт 7:
  - у `DonationProgress` під PayPal CTA додано дрібний інформаційний текст:
  - `Spenden können auf Wunsch anonym erfolgen. Wenn Sie nicht anonym spenden möchten, kann Ihr Name auf unserer Webseite veröffentlicht werden.`
- Тексти для нових блоків зафіксовано в `workspace/Text/Approved texts - ditib-ahlen-projekte.md`:
  - `Blok - Unterstützung für Unternehmen`
  - `Blok - Spendenhinweis`
- Оновлено mobile footer UX/UI:
  - на mobile порядок елементів: меню `Impressum / Datenschutz / Kontakt` → `Digitales Handwerk mit ♥ bei Munas-Print` → copyright
  - mobile footer вирівняно по центру
  - legal-кнопки на mobile збільшено для зручнішої touch-взаємодії
  - додано більше вертикального простору між елементами на mobile
  - desktop footer збережено у компактному 3-колонковому layout через `md:*` класи
- Зафіксовано SEO/structured data work з паралельного чату:
  - підсилено structured data в `index.html`
  - уточнено schema/entity-сигнали для організації, сторінки, donation-семантики та зображень
  - structured data залишається частиною production SEO-шару разом із meta, sitemap, image sitemap, robots і `llms.txt`
- Виконано свіжий production build для передачі на хостинг:
  - `npm run build` успішно завершився
  - актуальні production-артефакти оновлено в `dist/`
  - поточний bundle після збірки: `index-DZrTMi6m.js` та `index-xy7XW12N.css`

**Підпис:** Codex  
**Дата/час:** 2026-04-15 09:38 CEST

---

### 2026-04-15 — Prod technical fixes

**Сесія 16 — Модалки, lightbox, cookie widget, уніфікація кнопок**

- **Scroll lock для overlay:**
  - додано спільний hook `src/hooks/use-lock-body-scroll.ts`;
  - сторінка блокується при відкритій модалці або fullscreen-фото через `html/body overflow`, `body position: fixed` і збереження `scrollY`;
  - hook підтримує ref-count, щоб кілька overlay не конфліктували між собою;
  - внутрішній скрол довгих модалок збережено через `overflow-y-auto overscroll-contain`.
- **Scroll restore bugfix:**
  - виправлено поведінку, коли після закриття модалки/фото сторінка стрибала вгору і плавно прокручувалась назад;
  - причина: глобальний `html { scroll-behavior: smooth; }`;
  - рішення: hook тимчасово ставить `scrollBehavior = "auto"`, робить миттєвий `scrollTo`, потім повертає попередній стиль на наступному кадрі.
- **Z-index fix для cookie widget:**
  - overlay модалок та lightbox піднято до `z-[220]`;
  - cookie widget лишається `z-[180]`, тому на mobile він більше не лежить поверх відкритої модалки.
- **Підключені компоненти:**
  - `Modal.tsx` — footer legal/contact modals;
  - `CookieConsent.tsx` — settings modal;
  - `HeroSection.tsx` — thumbnail lightbox;
  - `ImageGallery.tsx` — gallery lightbox.
- **Уніфікація висоти action-кнопок:**
  - еталон — кнопки блоку `SocialSection` / `Folgen Sie uns`;
  - основні action-кнопки отримали явну висоту `h-[52px]`;
  - змінено: `SocialSection`, `DonationProgress`, `CompanySupportSection`, `FinalCTA`, `StickyDonateBar`, `NavBar`, action buttons у `CookieConsent`;
  - Hero не чіпали за вимогою;
  - службові icon-only кнопки (`X`, arrows, toggles, cookie floating widget) та footer legal links не уніфікувались, бо це не CTA.
- **Перевірка:**
  - `npm run build` — проходить;
  - `npm test` — проходить;
  - Playwright browser binary локально не встановлений, тому браузерну headless-перевірку не запускали.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 10:05 CEST

---

### 2026-04-15 — SEO release audit: Bildungs- & Begegnungszentrum

**Сесія 17 — SEO naming, meta/schema, llms.txt і фінальна синхронізація**

- Затверджено і виконано нову naming-стратегію для основних SEO-зображень:
  - hero/social preview перейменовано під `bildungs-begegnungszentrum`;
  - технічні зображення отримали коротші SEO-назви (`aussenansicht`, `fassadenansicht`, `grundriss`, `freiflaechenplan`, `gebaeudeschnitt`);
  - оновлено всі runtime-посилання в `HeroSection`, `ImageGallery`, `index.html` та `sitemap-images.xml`.
- Оновлено image SEO:
  - `sitemap-images.xml` отримав нові image URLs;
  - додано `image:title` і `image:caption`;
  - `lastmod` у `sitemap.xml` і `sitemap-images.xml` оновлено на `2026-04-15`.
- Переписано technical SEO в `index.html` під новий напрям:
  - primary meta, Open Graph і Twitter Card;
  - JSON-LD для `Organization`, `WebSite`, `WebPage`, `CivicStructure`, `ImageObject`, `DonateAction`, `FAQPage`, `BreadcrumbList`;
  - entity id проєкту змінено з `#kulturzentrum` на `#bildungs-begegnungszentrum`;
  - `ReligiousOrganization` прибрано зі schema, щоб не підсилювати небажаний фрейм.
- `FAQPage` schema повністю синхронізовано з новими акцентами:
  - майбутній Neubau;
  - Bildung, Begegnung, Barrierefreiheit, Nachhaltigkeit;
  - Bestattungsvorbereitung;
  - підтримка через PayPal, Sachleistungen, Dienstleistungen та індивідуальні пропозиції.
- `public/llms.txt` замінено на нову AI knowledge base:
  - primary language — Deutsch;
  - EN/TR summaries збережено;
  - старі формулювання `Kulturzentrum` і `für alle Menschen in Ahlen` залишені тільки як AI guardrails / застарілі формулювання, які не треба використовувати;
  - категоричні згадки `religiöse Institution` прибрано.
- Фінальна синхронізація accessibility/SEO copy:
  - QR alt-текст оновлено під `Bildungs- und Begegnungszentrum`;
  - `Verwendungszweck` змінено на `Spende DiTiB Ahlen Projekt`;
  - footer copyright змінено на `DiTiB Ahlen · Bildungs- & Begegnungszentrum`;
  - partner logo alt-тексти доповнено ролями (`Bauherr`, `Entwurfsverfasser / Tragwerksplanung`, `Medienpartner`, `Projektpartner`).
- Контрольний аудит:
  - JSON-LD валідний;
  - старі runtime image paths не знаходяться;
  - старий wording не знаходиться у видимому сайті та schema;
  - залишки старого wording у `llms.txt` є тільки навмисними guardrails.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 11:10 CEST

---

### 2026-04-15 — Clean anchor navigation

**Сесія 19 — Якірна навігація без hash-слідів у URL**

- Для лендингу основним публічним URL залишається чистий домен без `#spenden` / `#projekt`.
- Додано helper `src/lib/clean-anchor-navigation.ts`:
  - залишає `href="#spenden"` / `href="#projekt"` у розмітці як semantic/no-JS fallback;
  - при звичайному кліку перехоплює подію, скролить до потрібної секції через `scrollIntoView`;
  - чистить адресний рядок через `history.replaceState`, не додаючи hash у URL;
  - modifier-click (`cmd/ctrl/shift/alt`) не перехоплюється.
- Підключено до:
  - Hero CTA `#spenden`;
  - Hero CTA `#projekt`;
  - `NavBar` donate CTA;
  - `StickyDonateBar`;
  - `FinalCTA`.
- Додано `CleanInitialHash` в `App.tsx`, щоб прямий вхід на `/#spenden` або `/#projekt` скролив до секції, але після цього очищав URL.
- `AnalyticsManager` більше не включає `location.hash` у `page_path` і `page_location`, щоб не створювати окремі page_view для якірних переходів.
- SEO/функціональний висновок:
  - canonical/main URL не розмивається hash-варіантами;
  - anchor fallback збережено;
  - no-JS поведінка не ламається.
- **Перевірка:**
  - `npm run build` — проходить;
  - `npm test` — проходить.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 11:25 CEST

---

### 2026-04-15 — PageSpeed optimization and fresh build

**Сесія 20 — Mobile performance, responsive hero images, manual image refresh**

- Проведено оптимізацію за результатами Google PageSpeed / Lighthouse:
  - основний фокус: mobile FCP/LCP та розмір стартового JS;
  - desktop score вже був близький до цільового, тому зміни робились точково без редизайну.
- `HeroSection` оптимізовано для LCP:
  - hero background переведено на responsive `<picture>` / `srcSet`;
  - використовується `fetchPriority="high"`, `decoding="async"`, явні `width` / `height`;
  - додано preload hero-зображення в `index.html`;
  - прибрано React scroll listener/parallax state, який викликав зайві rerender-и під час скролу;
  - hero background animation скорочено і прибрано opacity-анімацію з фонового LCP-зображення.
- Для hero image додано responsive WebP-файли в `public/img/`:
  - `ditib-ahlen-bildungs-begegnungszentrum-1280.webp` — 1280×720;
  - `ditib-ahlen-bildungs-begegnungszentrum-1920.webp` — 1920×1080;
  - оригінал `ditib-ahlen-bildungs-begegnungszentrum.webp` лишається 2400×1350 як fallback/high-density варіант;
  - файл `ditib-ahlen-bildungs-begegnungszentrum-960.webp` створено, але прибрано з активного `srcSet`, бо на mobile Retina він виглядав недостатньо чітко.
- Користувач вручну оновив hero WebP-файли в `public/img/`, щоб зберегти кращу чіткість після ресайзу.
- Виправлено локальну проблему з mobile hero image на `http://localhost:8080/`:
  - Docker/Vite dev-server був запущений до появи нових файлів і віддавав для них SPA fallback HTML;
  - виконано `docker compose restart web`;
  - після restart `localhost:8080` коректно віддає `1280.webp` і `1920.webp` як `image/webp`.
- Зменшено стартове навантаження застосунку:
  - прибрано `@fontsource/inter` imports зі стартового `main.tsx`;
  - шрифт переведено на системний Inter-like stack без зовнішніх Google Fonts requests;
  - прибрано невикористані на старті `QueryClientProvider`, toast і tooltip providers;
  - секції нижче першого екрана переведено на `React.lazy` + `Suspense`, щоб hero і основний above-the-fold код завантажувались першими.
- Production build після оптимізації:
  - стартовий JS зменшено приблизно з `406.80 kB` до `185.51 kB`;
  - gzip стартового JS зменшено приблизно з `127.69 kB` до `60.14 kB`;
  - поточний build chunk: `index-D1HIPAdL.js`;
  - поточний CSS chunk: `index-DdeZun8X.css`.
- **Перевірка:**
  - `npm run build` — проходить;
  - `npm test` — проходив після оптимізацій;
  - `npm run lint` все ще має попередні shadcn/tailwind lint-помилки, не пов'язані з цією оптимізацією;
  - Playwright screenshot-перевірку не запускали, бо Chromium binary локально не встановлений і download не був дозволений.

**Доповнення після production PageSpeed/header-аудиту:**

- Перевірено live-заголовки `https://ditib-ahlen-projekte.de`:
  - hero WebP файли кешуються коректно на 1 рік;
  - CSS віддається gzip і з long cache;
  - JS asset віддавався як `text/javascript`, тому попередні правила `.htaccess` для `application/javascript` не застосовували до нього gzip/cache повністю.
- Оновлено `public/.htaccess`:
  - додано MIME `application/javascript` для `.js`;
  - додано deflate для `text/javascript`;
  - додано expires для `text/javascript`;
  - додано явний `Cache-Control: public, max-age=31536000, immutable` для fingerprinted static assets;
  - HTML лишається `no-cache, max-age=0, must-revalidate`.
- Після зміни виконано новий `npm run build`, оновлено `dist/.htaccess`.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 12:02 CEST

---

### 2026-04-15 — Sticky donate bar and LCP follow-up

**Сесія 21 — Sticky behavior restored, hero LCP candidate stabilized**

- Виправлено регресію sticky donate bar після `React.lazy`:
  - `StickyDonateBar` тепер не завершує роботу, якщо `#final-cta` ще не існує під час першого рендера;
  - додано очікування появи `#final-cta` через `MutationObserver`, після чого підключається `IntersectionObserver`;
  - користувач підтвердив, що sticky-панель знову працює правильно.
- Проаналізовано `workspace/PageSpeed Insights.md`:
  - mobile FCP: `1.4 s`;
  - LCP/TBT: `Error / NO_LCP`;
  - CLS: `0`;
  - Speed Index: `1.8 s`;
  - головний висновок: Lighthouse не бачить LCP-кандидат, а не просто показує повільний LCP.
- Для стабілізації hero LCP без зміни користувацьких зображень:
  - повернуто активне використання `ditib-ahlen-bildungs-begegnungszentrum-960.webp` у responsive `srcSet`;
  - preload hero image оновлено так, щоб mobile міг обрати легший `960.webp`;
  - hero `<img>` зроблено `loading="eager"` з `fetchPriority="high"`;
  - прибрано transform-анімацію `animate-hero-zoom` саме з LCP-зображення;
  - текстові hero-анімації залишено.
- Локальна перевірка:
  - `npm run build` — проходить;
  - build створив нові assets `index-BnndH9uc.js` і `index-BYen1p1i.css`;
  - локальний headless Chrome підтвердив, що hero image завантажується як `960.webp`, але LCP entries у headless-замірі все ще не повернулись, тому потрібна повторна перевірка через PageSpeed після deploy.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 13:37 CEST

---

### 2026-04-15 — Active global technical issues

**Поточний список відкритих проблем після останньої перевірки**

1. **PageSpeed / Lighthouse: `NO_LCP`**
   - Поточні помилки:
     - `Largest Contentful Paint — Error! / NO_LCP`;
     - `Total Blocking Time — Error! / NO_LCP`.
   - Важливо: це не звичайний повільний LCP, а ситуація, де Lighthouse не може визначити LCP-кандидат. Через це TBT також показує помилку.
   - Останній виконаний крок:
     - hero image зроблено стабільнішим для LCP;
     - додано `960.webp` у preload/srcSet;
     - прибрано transform-анімацію з LCP-зображення.
   - Наступний технічний напрям:
     - перевірити, чи `NO_LCP` спричинений повноекранним absolute/fixed hero layout, overlay, delayed/opacity-анімованим H1 або особливістю Lighthouse для першого viewport;
     - рухатися маленькими контрольованими змінами з повторним PageSpeed-тестом після кожного deploy.

2. **GA4 не надсилає сигнали**
   - Користувач підтвердив: сайт точно не відправляє сигнали в GA4.
   - Поточна реалізація:
     - GA4 Measurement ID: `G-BM587Q3MEJ`;
     - код підключення: `src/components/AnalyticsManager.tsx`;
     - аналітика вмикається через cookie consent категорію `analytics`;
     - використовується basic consent підхід, без завантаження GA4 до згоди.
   - Наступний технічний напрям:
     - перевірити, чи `AnalyticsManager` реально монтується у production;
     - перевірити, чи consent state доходить до менеджера після натискання `Alle akzeptieren`;
     - перевірити, чи `gtag/js` завантажується і чи викликаються `gtag("config")` та `gtag("event", "page_view")`;
     - перевірити, чи не блокує відправку consent-mode логіка, adblock, CSP/server headers або доменна конфігурація GA4.

**Порядок вирішення:** спочатку GA4 як критичний production tracking, потім `NO_LCP`, якщо користувач не задасть інший пріоритет.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 13:43 CEST

---

### 2026-04-15 — GA4 gtag repair

**Сесія 22 — GA4 runtime chain fixed after consent**

- Вирішено не переходити на Google Tag Manager head/body snippet:
  - поточний ID `G-BM587Q3MEJ` є GA4 Measurement ID, не GTM container ID;
  - для GA4 достатньо `gtag.js`;
  - body/noscript snippet потрібен для GTM container, а не для чистого GA4 gtag.
- Оновлено `src/components/AnalyticsManager.tsx`:
  - `dataLayer` / `gtag` створюються перед consent/config викликами;
  - `gtag("js")` і `gtag("config", "G-BM587Q3MEJ")` ставляться в правильному порядку лише коли analytics дозволено;
  - ручний `page_view` відправляється тільки після завантаження `gtag.js`;
  - до ручного `page_view` додано `send_to: "G-BM587Q3MEJ"`.
- Локальна runtime-перевірка через Chrome після натискання `Alle akzeptieren`:
  - `window["ga-disable-G-BM587Q3MEJ"] === false`;
  - створюється script `https://www.googletagmanager.com/gtag/js?id=G-BM587Q3MEJ`;
  - у `dataLayer` є `analytics_storage: "granted"`;
  - у `dataLayer` є `config` для `G-BM587Q3MEJ`;
  - у `dataLayer` є ручний `event: "page_view"` з `send_to: "G-BM587Q3MEJ"`.
- **Перевірка:**
  - `npm run build` — проходить;
  - локальний Vite dev-server для тесту запускався на `127.0.0.1:8081` і після перевірки був зупинений.

**Статус GA4:** кодовий ланцюг після consent виправлено локально; після deploy потрібно перевірити GA4 Realtime / DebugView без adblock і з очищеним consent/localStorage.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 13:49 CEST

---

### 2026-04-15 — Cookie modal mobile button height fix

**Сесія 23 — Mobile cookie settings buttons restored to CTA style**

- На mobile в модалці cookie consent кнопки `Auswahl speichern` / `Alle akzeptieren` виглядали як дуже тонкі смужки.
- Причина:
  - footer модалки має `flex flex-col` на mobile;
  - кнопки мали `flex-1`;
  - у column-layout `flex-1` задає `flex-basis: 0%` і перебиває очікувану `h-[52px]`.
- Рішення в `src/components/CookieConsent.tsx`:
  - для mobile кнопки отримали `w-full h-[52px]`;
  - `flex-1` залишено тільки як `sm:flex-1` для горизонтального layout на ширших екранах;
  - форма кнопок приведена до загального CTA-стилю через `rounded-full`.
- Це застосовано до:
  - кнопок у settings modal;
  - кнопок у cookie banner.
- **Перевірка:**
  - `npm run build` — проходить;
  - `npm test` — проходить.

**Підпис:** Codex  
**Дата/час:** 2026-04-15 15:23 CEST

---

### 2026-04-15 — GA4 діагностика і спрощення AnalyticsManager

**Сесія 24 — GA4 debugging + AnalyticsManager rewrite**

- Діагностовано причину відсутності GA4 даних: браузерні розширення (AdBlock + `gaoptout_signal.js`) блокували всі запити до `google-analytics.com`. Для реальних відвідувачів без розширень GA4 працював коректно.
- Підтверджено роботу GA4 в Guest Window Chrome (без розширень): `collect?v=2&tid=G-BM587Q3MEJ` запити відправляються з `localhost:8080`.
- `src/components/AnalyticsManager.tsx` переписано:
  - Видалено Consent Mode (`consent default/update`) — не потрібен коли скрипт вантажиться лише після явної згоди.
  - Виправлено `window.gtag` stub: `function gtag()` (не arrow function) — `arguments` object коректно потрапляє в `dataLayer`.
  - Стандартна ініціалізація: `gtag('js', new Date())` → `gtag('config', ...)` → завантаження скрипту → `page_view`.
  - Clarity залишається без змін.
- Production build: `index-DXwbPO2l.js` (184.97 kB / gzip 60.03 kB), `index-2UL_c-yZ.css` (79.32 kB).

**Підпис:** Codex
**Дата/час:** 2026-04-15 15:30 CEST

---

### 2026-04-15 — Mobile landscape guard з Lottie-іконкою

**Сесія 25 — Portrait-only mobile UX**

- Реалізовано заглушку для **мобільних телефонів у landscape-режимі**:
  - у вертикальному mobile-режимі сайт працює як звичайно;
  - на desktop/tablet заглушка не має з'являтися;
  - при mobile landscape показується повноекранний overlay з фоном футера `#253e54`, білою анімованою іконкою та німецьким текстом `Bitte Smartphone drehen`.
- Додано глобальний компонент `src/components/MobileLandscapeGuard.tsx`:
  - підключений у `src/App.tsx` після `CookieConsent`;
  - використовує `matchMedia` з умовою:
    - `orientation: landscape`;
    - `max-width: 960px`;
    - `max-height: 520px`;
    - `pointer: coarse`;
  - має fallback на старий `MediaQueryList.addListener/removeListener`, щоб уникнути runtime-помилок у старіших mobile Safari/WebView.
- Стилі додано в `src/index.css`:
  - `.mobile-landscape-guard` за замовчуванням прихований;
  - у mobile landscape стає `fixed inset-0 z-[9999]`;
  - використовує `min-height: 100svh` і `env(safe-area-inset-*)` для телефонів з notch/safe area;
  - Lottie-контейнер має розмір `8.5rem × 6.25rem`, бо оригінальний asset має горизонтальні пропорції.
- Для анімації використано **окремо завантажений користувачем файл**:
  - source: `workspace/Screen Rotate Right.json`;
  - робоча копія в проєкті: `src/assets/screen-rotate-right.json`;
  - файл є shape-only Lottie без solid/background layer, тому фон залишається прозорим і видно синій overlay.
- Додано залежність `lottie-react`:
  - потрібна тільки як Lottie-плеєр для `screen-rotate-right.json`;
  - компонент підключає плеєр через `React.lazy`, тому runtime Lottie вантажиться тільки коли guard реально активний.
- Прибрано невдалі проміжні варіанти:
  - саморобний `rotate-phone-lottie.json` видалено;
  - старі CSS/SVG animation класи для `mobile-guard-phone`, `mobile-guard-arrow`, `mobile-landscape-guard__icon` не залишились;
  - виконано `npm prune` локально і в Docker-контейнері.
- Важливий dev-нюанс:
  - локальний сайт на `localhost:8080` працює через Docker (`/app/node_modules`);
  - після додавання `lottie-react` потрібно було виконати `docker compose exec web npm install`, бо host `node_modules` і container `/app/node_modules` розділені volume.
- **Перевірка:**
  - `npm run build` — проходить;
  - Docker dev server віддає `src/components/MobileLandscapeGuard.tsx` з `200 OK`;
  - свіжий production build створено о `2026-04-15 17:08:57 CEST`;
  - актуальні build assets: `dist/assets/index-C8iXYWvT.js` і `dist/assets/index-Dou8-wmR.css`.
- **Примітка:**
  - під час build `lottie-web` показує стандартне попередження про `eval` у самому пакеті; збірку це не ламає.

**Підпис:** Codex
**Дата/час:** 2026-04-15 17:14 CEST

---

### 2026-04-16 — Hero video background, adaptive quality, cyclic playback

**Сесія 26 — Hero video rollout for local review and production build**

- У `HeroSection` реалізовано фонове відео з адаптивним вибором якості:
  - `720p` для mobile / слабшої мережі;
  - `1080p` як основний desktop-варіант;
  - `2160p` як `vip`-режим для великих екранів і доброго з'єднання.
- Базова логіка Hero змінена з image-only на цикл `photo → video → photo`:
  - стартовий LCP-кадр лишається фото;
  - фото тримається `7 сек`, поки відео готове у фоні;
  - після паузи фото плавно зникає, а відео стартує саме з `0:00`, без прихованого програвання під фото;
  - відео програється один раз без нескінченного `loop`;
  - перед фіналом ролика фото починає повертатись завчасно, щоб не було видно застиглий останній кадр;
  - після завершення ролика фото знову лишається на `7 сек`, і цикл повторюється.
- Відео відтворюється як чистий hero background:
  - без `controls`;
  - `muted`;
  - `playsInline`;
  - preload у фоні для м'якого старту.
- Для самого відео додано окреме додаткове затемнення:
  - поверх відео, але під фото та контентом;
  - `20%` чорний overlay;
  - базовий градієнт Hero при цьому збережено окремим шаром без змін.
- Переходи Hero відполіровано під м'якіший cinematic rhythm:
  - `photo → video` fade сповільнено;
  - `video → photo` fade зроблено ще повільнішим;
  - повернення фото починається приблизно за `2.2 сек` до кінця відео.
- У проєкт додано нові runtime-відео для Hero:
  - `public/video/hero-720.mp4`;
  - `public/video/hero-1080.mp4`;
  - `public/video/hero-2160.mp4`.
- Старі коротші Hero-відео з `public/video` видалено й замінено на нові `30sec` версії, підготовлені користувачем у `workspace/video/30sec/`.
- Локальна перевірка:
  - тимчасово піднімався окремий Vite dev-server на `127.0.0.1:8081`, щоб перевірити віддачу нових mp4;
  - підтверджено, що `hero-720.mp4`, `hero-1080.mp4` і `hero-2160.mp4` коректно віддаються як `video/mp4`;
  - поточний локальний `:8080` потребував рестарту, щоб підхопити нову папку `public/video`.
- Продакшн-збірка:
  - `npm run build` — проходить;
  - build успішний;
  - лишається стандартне non-blocking попередження від `lottie-web` про `eval` у сторонньому пакеті, без впливу на результат.
- Додатковий playback-fix після першого релізу Hero video:
  - виявлено, що на Android Hero-відео стартувало після `7 сек`, а на iPhone лишалось тільки фото;
  - причина була не у якості mp4, а в занадто жорсткій логіці запуску: Hero чекав готовність відео через background-ready сценарій і занадто рано здавався при невдалому autoplay/play;
  - логіку перероблено в більш безпечний cross-device flow:
    - прибрано жорстку залежність від `onCanPlay`;
    - після `7 сек` Hero пробує запускати відео напряму;
    - fade на відео вмикається лише після реального `onPlaying`;
    - якщо перший `play()` не вдається, Hero не відключає відео назавжди, а робить retry через короткий інтервал;
    - цикл `photo → video → photo` при цьому збережено.
  - Підтверджений результат:
    - на iPhone Hero-відео після цієї правки вже працює;
    - на Android Hero-відео також підтверджено як робоче;
    - поточний cross-device playback сценарій підтверджено як стабільний на iPhone та Android.
- Фінальна збірка після playback-fix:
  - `npm run build` — проходить;
  - актуальні build assets після цієї правки: `dist/assets/index-BEfavak1.js` і `dist/assets/index-DqaXfpJt.css`.
- Окремо зафіксовано deploy-нотатки для FTP:
  - cookies не ламаються від повного перезаливу файлів самі по собі;
  - ризик стосується не cookie, а cache consistency;
  - безпечніше спершу заливати нові assets, а `index.html` оновлювати останнім, замість схеми `видалити все → залити заново`.

**Підпис:** Codex
**Дата/час:** 2026-04-16 11:30 CEST

---

### 2026-04-16 — Impressionen video overlay + mobile polish

**Сесія 27 — Відео на стику секцій, mobile cleanup**

- У секцію `ImageGallery` додано відеоблок під фотосіткою:
  - відео центроване, `1080p`, з `controls`, poster і light shadow
  - блок сидить на стику між `Impressionen` і `ProjectPartners`
  - розмір відео вирівняно під великий візуальний акцент галереї
- Для desktop додано великий центрований `play/pause` overlay у стилі YouTube:
  - кнопка з'являється на hover
  - під час програвання ховається, якщо немає hover
- Для mobile кастомний overlay `play/pause` прибрано:
  - залишено нативні телефонні контролі, щоб уникнути накладання з iPhone/Android UI
  - це прийнято як основне рішення для мобільного UX
- У нативного відеоплеєра вимкнено зайві функції:
  - `download`
  - зміна швидкості програвання
  - `picture-in-picture`
- Відео приведено до стилю фотокарток:
  - однакове заокруглення з photo-grid
  - прибрано окрему обводку
- Мобільну композицію кілька разів підганяли по реальному скріну з `iPhone 14 Pro Max`:
  - останнє фото у `ImageGallery` приховано на mobile
  - відео піднято на mobile на `30px`
  - мобільні відстані над і під відео зменшено вдвічі від попереднього oversized-стану
  - після цього ще додано сумарно `+50px` між фото і відео на mobile, щоб ролик не налазив на grid
  - контент `ProjectPartners` додатково опущено для чистішого стику з відео
- Кілька разів виконано production build після коригувань; фінальний стан збирається успішно.

**Підпис:** Codex
**Дата/час:** 2026-04-16 11:56 CEST

---

### 2026-04-17 — Багатомовність DE/TR + multilingual SEO

**Сесія 28 — Повна реалізація багатомовності**

- Реалізовано повну двомовність сайту: `de` як основна мова на `/` і `tr` на `/tr/`.
- Додано i18n-інфраструктуру:
  - `src/i18n/types.ts` — типізована структура `Translations`
  - `src/i18n/de.ts` / `src/i18n/tr.ts` — повні словники перекладів
  - `src/i18n/useLang.ts` — визначення мови по URL без flash
  - `src/components/LangMeta.tsx` — мовозалежні `<title>`, `description`, `canonical`, `hreflang`, Open Graph, Twitter і JSON-LD
  - `src/components/LangSwitcher.tsx` — перемикач DE / TR
- Оновлено роутинг:
  - `src/App.tsx` підтримує `/` і `/tr/*`
  - `src/pages/Index.tsx` працює як спільна сторінка для обох мов
  - `src/pages/NotFound.tsx` локалізовано через `useLang`
- На переклади переведено всі ключові секції сайту:
  - `HeroSection`, `ProjectIntro`, `VisionSection`, `ImageGallery`, `ProjectPartners`
  - `PDFDownloadSection`, `DonationProgress`, `SocialSection`, `FinalCTA`
  - `StickyDonateBar`, `MobileLandscapeGuard`, `CookieConsent`, `Footer`
  - окремо виправлено захардкоджену CTA-кнопку в `NavBar`: `Jetzt spenden` → `t.nav.donate`
- Перемикач мови інтегровано в нижню частину `HeroSection`:
  - по центру під hero-контентом
  - з окремими mobile/desktop відступами
  - збільшено typography до `15px` mobile / `16px` desktop
- Реалізовано multilingual SEO та build-flow:
  - `src/seo/structuredData.ts` — runtime JSON-LD генератор з мовозалежними текстами
  - `scripts/seo-config.mjs` — build-time SEO-конфіг для DE/TR
  - `scripts/prerender.mjs` — генерація `dist/index.html` і `dist/tr/index.html`
  - `scripts/seo-smoke-check.mjs` — автоматична перевірка canonical, hreflang, meta і structured data
  - `index.html` очищено від старих статичних DE meta-тегів
- `FAQPage` у structured data залишено тільки для німецької версії, TR-сторінка його не містить.
- Оновлено `public/sitemap.xml`:
  - дві сторінки: `/` і `/tr/`
  - `xhtml:link` для `de`, `tr`, `x-default`
- Після технічної перевірки canonical-структуру уніфіковано:
  - усі TR URL приведено до формату `/tr/`
  - це синхронізовано в runtime, prerender, sitemap, hreflang, Open Graph і JSON-LD
- Перевірки:
  - `npm run build` — успішно
  - `npm test` — успішно
  - `npm run seo:check` — успішно
  - ручний перегляд `dist` підтвердив окремі DE/TR HTML, мовні head-теги й коректну індексаційну розмітку

**Підпис:** Codex
**Дата/час:** 2026-04-17 13:05 CEST

---

### 2026-04-17 — SEO fix: статичний H1 у prerender

**Проблема:** Bing URL Inspection (Live URL) повертав помилку "H1 tag missing" для `/tr/`. React-рендерений `<h1>` в `HeroSection` має CSS-клас `animate-hero-slide-up delay-600`, який стартує з `opacity:0`. Bing знімає DOM-знімок раніше, ніж анімація завершується, і не бачить тег.

**Рішення:** у `scripts/prerender.mjs` додано функцію `injectBodyH1()`, яка під час build вшиває `<h1>` безпосередньо у статичний HTML — перед `<div id="root">` — через стандартний clip-rect патерн (visually hidden, але читається crawlerами).

**Змінені файли:**
- `scripts/seo-config.mjs` — додано поле `h1` до конфігів DE та TR
- `scripts/prerender.mjs` — додано `injectBodyH1()` + імпорт `escapeHtml`

**Результат у dist:**
- `dist/index.html` → `<h1 …>Bildungs- &amp; Begegnungszentrum für Ahlen</h1>`
- `dist/tr/index.html` → `<h1 …>Eğitim ve Buluşma Merkezi Ahlen için</h1>`

**Також виправлено під час перевірки:**
- `NavBar.tsx` — кнопка `"Jetzt spenden"` була захардкоджена, виправлено на `{t.nav.donate}`

**Підпис:** Claude
**Дата/час:** 2026-04-17 CEST

---

### 2026-04-17 — SEO fix: усунення дублікатів тегів (Bing 3 помилки → 0)

**Передумова:** Попередній фікс (статичний `<h1>` у prerender) породив нові Bing-помилки:
- *"More than one Meta Description tag"* — prerender вшивав `<meta name="description">`, react-helmet-async додавав ще один поверх
- *"More than one canonical tag"* — аналогічно
- *"More than one h1 tag"* — прихований статичний `<h1>` з prerender + видимий `<h1>` від React = 2 теги

**Першопричина:** Bing виконує JS (це підтвердили самі дублікати). react-helmet-async розпізнає власні теги за атрибутом `data-rh="true"`. Статичні теги prerender цього атрибута не мали → Helmet ігнорував їх і додавав дублікати зверху.

**Рішення — три точкові зміни:**

1. **`scripts/seo-config.mjs` — `buildHeadHtml()`** — додано `data-rh="true"` до кожного тега (title, meta description, language, canonical, 3×alternate, 11×og:*, 5×twitter:*, script JSON-LD). Тепер Helmet розпізнає їх як "свої", видаляє при гідрації та замінює актуальними → жодних дублікатів.

2. **`scripts/seo-config.mjs` + `scripts/prerender.mjs`** — скасовано статичний `<h1>` у body. Видалено поля `h1` з конфігів DE/TR та функцію `injectBodyH1()`. Імпорт `escapeHtml` у prerender.mjs прибрано.

3. **`src/components/HeroSection.tsx`** — видалено `animate-hero-slide-up delay-600` з елемента `<h1>`. Без цього класу h1 рендериться з повною непрозорістю одразу — Bing знаходить тег під час JS-рендеру.

4. **`scripts/seo-smoke-check.mjs`** — оновлено всі `assert` під новий формат тегів з `data-rh="true"`; regex `extractStructuredData` узагальнено для роботи з атрибутами на `<script>`.

**Результат у dist (перевірено):**
- `<meta data-rh="true" name="description">` — 1 екземпляр (DE і TR)
- `<link data-rh="true" rel="canonical">` — 1 екземпляр (DE і TR)
- `<h1>` — 0 у статичному HTML; React рендерить 1 видимий `<h1>` після завантаження JS
- Загалом 26 тегів з `data-rh="true"` у кожному файлі

**Перевірки:**
```
npm run build     # ✓ 1633 modules, 0 errors, 1.48s
npm run seo:check # ✓ SEO smoke check passed
```

**Bing результат:** 0 SEO-помилок.

**Підпис:** Claude
**Дата/час:** 2026-04-17 CEST

---

### 2026-04-17 — Автовизначення мови + cleanup старих lint-помилок

**Сесія 14 — Безпечний locale redirect і стабілізація перевірок**

- Додано безпечне автодетект-визначення мови на корені `/`:
  - пріоритет: **ручний вибір користувача → мова браузера → DE**
  - якщо перша підтримувана мова `tr`, користувач перенаправляється на `/tr/`
  - якщо `de` або мову не визначено, залишається `/`
- Реалізацію зроблено через ранній inline-script у `index.html`, до старту React:
  - це прибирає flash неправильного контенту
  - зберігає `#hash` і query-параметри під час redirect
  - не додає серверних SEO-ризиків від жорсткого locale-redirect
- Додано `src/i18n/langPreference.ts`:
  - нормалізація `de/tr`
  - читання збереженого cookie `preferred_lang`
  - визначення першої підтримуваної мови з `navigator.languages`
  - helper для збереження ручного вибору користувача
- `LangSwitcher.tsx` оновлено: ручне перемикання `DE/TR` тепер зберігає вибір у cookie, щоб сайт не перевизначав мову на наступних заходах.
- Додано автоматичні тести для мовної логіки в `src/test/example.test.ts`.
- Локально в headless Chrome перевірено 3 сценарії:
  - `tr-TR` → `http://127.0.0.1:4174/tr/`, `html lang="tr"`
  - `de-DE` → `http://127.0.0.1:4174/`, `html lang="de"`
  - fallback `en-US/fr-FR` → `http://127.0.0.1:4174/`, `html lang="de"`
- Паралельно прибрано старі `eslint`-проблеми:
  - `src/components/ui/command.tsx` — заміна порожнього `interface` на `type`
  - `src/components/ui/textarea.tsx` — заміна порожнього `interface` на `type`
  - `tailwind.config.ts` — прибрано `require()`, переведено на ESM import для `tailwindcss-animate`
  - `ImageGallery.tsx` — стабілізовано callback-и й залежності `useEffect`
  - `use-scroll-reveal.ts` — нормалізовано залежності observer options
  - `eslint.config.js` — вимкнено шумне `react-refresh/only-export-components` тільки для `src/components/ui/**/*`, де це шаблонний shadcn/ui-патерн, а не реальна помилка
- Перевірки після змін:
  - `npm run lint` — успішно
  - `npm test` — успішно
  - `npm run build` — успішно

**Підпис:** Codex
**Дата/час:** 2026-04-17 17:17 CEST

---

### 2026-04-20 — Інтеграція Google Maps для ділянки забудови

**Сесія 15 — Жива карта, polygon ділянки та cleanup UI**

- Підтверджено поточний runtime-стек для цього завдання:
  - бойовий сайт працює з `/Users/roman/Project/DITIB-Ahlen/main`
  - стек: `React + Vite + TypeScript`
  - локальний preview/dev використовує `http://localhost:8080`
- Додано нову секцію `MapSection` і вставлено її на головній сторінці між:
  - `CompanySupportSection`
  - `SocialSection`
- Для секції карти реалізовано 2-рівневу інтеграцію:
  1. **graceful fallback** — стилізований preview-блок без API
  2. **live Google Map** — якщо в оточенні присутній `VITE_GOOGLE_MAPS_API_KEY`
- Додано новий helper `src/lib/google-maps.ts`:
  - динамічне завантаження `Maps JavaScript API`
  - `buildGoogleMapsUrl()`
  - `getStyledMapOptions()`
  - fallback на локальний JSON-style, якщо `mapId` не заданий
- Розширено env-типізацію в `src/vite-env.d.ts`:
  - `VITE_GOOGLE_MAPS_API_KEY`
  - `VITE_GOOGLE_MAPS_MAP_ID`
- Через `i18n` додано тексти для нової карти:
  - оновлено `src/i18n/types.ts`
  - додано блок `mapSection` у `src/i18n/de.ts` і `src/i18n/tr.ts`
- Після підключення `Map ID` перевірено, що сайт реально передає cloud-style в runtime:
  - карта створюється з `mapId`, якщо присутній `VITE_GOOGLE_MAPS_MAP_ID`
  - fallback `styles: [...]` використовується лише коли `mapId` відсутній
- Виправлено критичну логічну помилку першої версії:
  - контейнер live-карти спочатку монтувався тільки після стану `ready`
  - через це Google Maps не мала куди ініціалізуватись
  - виправлено: контейнер існує завжди, а видимість контролюється через `opacity`
- На вимогу UX/UI спрощено блок карти:
  - прибрано всі службові плашки поверх самої карти
  - прибрано маркер і тимчасове коло
  - кнопку `In Google Maps öffnen` перенесено в header-рядок секції, праворуч від заголовка
  - текст під заголовком прибрано
  - праву інформаційну колонку прибрано повністю
  - карта розтягнута на всю ширину wide-контейнера
  - заокруглення контейнера приведено до стилю фото-блоків (`rounded-xl`)
- Зафіксовано робочий layout секції:
  - текстовий header у `max-w-5xl`
  - сама карта у `max-w-[1440px]`, аналогічно wide-grid у `ImageGallery`
- На основі PDF-планів з `workspace/pdf/` проведено відбір джерела для точного контуру:
  - `Genehmigungsplanung_Ditib_Ahlen_GE04_EG.pdf` визнано найкращим для зняття меж ділянки
  - `Freiflächenplan...` / `Poster_Freiflächenplan...` залишено як допоміжні masterplan-референси
- Тимчасовий апроксимований контур ділянки замінено на точний polygon з 4 вершин:
  - `51.75907866481751, 7.90587609407315`
  - `51.75954529463544, 7.9057430554382275`
  - `51.75960149902202, 7.906201299625186`
  - `51.75911395631686, 7.906328003087017`
  - порядок: за годинниковою стрілкою
- Карта автоматично масштабується по bounds polygon-а через `fitBounds(...)`
- В процесі налаштування `Map ID` виявлено, що зміни стилю Google Maps не відображались одразу:
  - локально підтверджено, що `mapId` реально потрапляє в bundle
  - після `Save + Publish` cloud-style почав застосовуватись коректно
  - додатково користувачу пояснено відмінність між `Draft`, `Published`, кешем tiles і прив'язкою style ↔ map ID
- Практичний результат:
  - на сторінці є чистий live-блок Google Maps
  - зайві інформаційні overlay-елементи прибрані
  - ділянка забудови виділена точним polygon-контуром
  - карта візуально узгоджена з широкими фото-блоками сайту

**Змінені файли:**
- `src/pages/Index.tsx`
- `src/components/MapSection.tsx`
- `src/lib/google-maps.ts`
- `src/i18n/types.ts`
- `src/i18n/de.ts`
- `src/i18n/tr.ts`
- `src/vite-env.d.ts`

**Перевірки:**
- `npm run build` — успішно на кожному етапі інтеграції
- локально підтверджено роботу live Google Map після перезапуску dev server

**Статус релізу:**
- зміни перевірено локально
- окремий релізний build для цієї версії перед публікацією ще не зафіксовано
- деплой цієї версії на хостинг ще не виконувався; заплановано разом з наступним пакетом правок

**Підпис:** Codex
**Дата/час:** 2026-04-20 15:25 CEST

---

### 2026-05-04 — Meta / Instagram API підготовка для live feed

**Сесія 24 — Завершення Stage 1 для Instagram Live Feed**

- Для Instagram live feed виконано підготовку Meta-контуру:
  - акаунт `ditib_ahlen_projekte` переведено в `Professional`
  - створено Facebook Page `DITIB Bildungs- & Begegnungszentrum`
  - сторінку прив’язано до Instagram акаунта
  - створено окремий Meta App `DITIB Ahlen Feed`
- Підтверджено робочі ідентифікатори:
  - `INSTAGRAM_APP_ID=1623528855432943`
  - `INSTAGRAM_PAGE_ID=1083007281566669`
  - `INSTAGRAM_IG_USER_ID=17841433989345669`
- Отримано і локально зафіксовано токени для наступного етапу runtime-інтеграції:
  - short-lived user token
  - long-lived user token
  - page access token
- Виконано живу перевірку Graph API:
  - підтверджено `me/accounts`
  - підтверджено запит профілю Instagram business account
  - підтверджено роботу media endpoint для останніх постів
- Документацію по цьому етапу оновлено:
  - `docs/instagram-live-feed-plan.md` доповнено фактичним статусом, ідентифікаторами та чек-листом розробки
  - робочі API-артефакти збережено в `workspace/API/`
  - локальний конфіг із секретами збережено в `main/.env.instagram.local`

**Статус:**
- Stage 1 (`Meta preparation`) завершено
- Stage 2 (`Runtime PHP layer`) ще не починався

**Підпис:** Codex
**Дата/час:** 2026-05-04 10:35 CEST

---

### 2026-05-04 — Instagram live feed: Stage 2 `Runtime PHP layer`

**Сесія 25 — Реалізація PHP runtime**

ТЗ для цього етапу: `docs/instagram-live-feed-stage-2-php-runtime-spec.md`.
Перед стартом ТЗ проревʼювано і розширено за 7 уточнюючими питаннями
(токен runtime feed, refresh flow, локальна перевірка, HTTP timeout,
логування, захист реального конфігу, версія Graph API).

**Створені файли:**
- `main/public/api/instagram-feed.php` — runtime endpoint
- `main/public/api/instagram-refresh-token.php` — двокроковий refresh `fb_exchange_token` → `/me/accounts`
- `main/public/api/instagram-config.example.php` — шаблон без секретів
- `main/public/api/instagram-config.php` — реальні секрети, **локально, не в git**
- `main/public/api/.htaccess` — захист config, dot-файлів, `cache/`
- `main/public/api/cache/.gitignore` — `*` + `!.gitignore`

**Змінені файли:**
- `main/.gitignore` — додано `public/api/instagram-config.php`

**Як працює runtime flow:**
1. `GET /api/instagram-feed.php` → читає `instagram-config.php`.
2. Якщо `cache/instagram-feed.json` молодший за 15 хв → `source=cache`.
3. Інакше `curl` до `graph.facebook.com/{vNN}/{IG_USER_ID}/media?fields=...&limit=6` з `connect_timeout=3s, timeout=5s`.
4. Нормалізує `IMAGE/VIDEO/CAROUSEL_ALBUM` → `{id,type,imageUrl,permalink,caption,timestamp}`, пише кеш, віддає `source=live`.
5. Будь-яка помилка → fallback на last-good-cache (`source=cache,error=true`) або `{items:[],source:"empty",error:true}`. Лог у `cache/instagram-feed.error.log` без секретів.
6. `instagram-refresh-token.php` оновлює user token, дістає новий page token через `/me/accounts`, пише `cache/instagram-token.json`.

**Перевірки (локально, `php -S 127.0.0.1:8765 -t public`):**
- холодний виклик → `source=live`, нормалізовані пости, `Content-Type: application/json; charset=utf-8` ✓
- теплий виклик у TTL → `source=cache` ✓
- зламаний токен зі stale-кешем → `source=cache, error=true` ✓
- зламаний токен без кешу → `source=empty, error=true, items=[]` ✓
- error log пише `meta_fetch_failed` ✓
- refresh створив свіжий `instagram-token.json` (новий user + page token, `expires_at=null`)

**Code review (тестувальник):**
- значущих багів немає
- P3: refresh timeouts вирівняно зі специфікацією (3s/5s замість 5s/10s)
- P3: failure-сценарії перевірив тільки Claude локально — потребують незалежного підтвердження на pre-prod
- P3: довжини токенів змінні від рефреша до рефреша, не валідувати по `len`

**Відомі обмеження / питання до Етапу 3:**
- `expires_at=null` після refresh — потрібен додатковий виклик `/debug_token`
- `instagram-refresh-token.php` публічний — додати guard (секрет у query або `Require ip`)
- cron на PixelX ще не налаштований
- Vite dev `:8080` PHP не виконує — для Етапу 4 окремий PHP-server + `server.proxy['/api']`

**Документація:**
- `docs/instagram-live-feed-plan.md` — Stage 2 чек-лист позначено виконаним, додано підтверджені перевірки і відомі обмеження
- `docs/instagram-live-feed-stage-2-php-runtime-spec.md` — додано Status block + тимчасовий розділ "Implementation notes" (видалити після закриття Stages 3–4)

**Статус:**
- Stage 2 (`Runtime PHP layer`) реалізовано локально
- Stage 3 (`Token maintenance`) — частково (refresh-script готовий, cron і guard ще ні)
- Stage 4 (`Frontend integration`) ще не починався

**Підпис:** Claude (Opus 4.7)
**Дата/час:** 2026-05-04 10:55 CEST

---

### 2026-05-04 — Instagram live feed: Stage 3 `Token maintenance` (код-частина)

**Сесія 26 — CLI/HTTP guard, `/debug_token`, success log, cron-інструкція**

З Stage 2 лишалися 2 ризики (publicly callable refresh endpoint;
`expires_at=null` після refresh) і 1 невиконаний пункт (cron на хостингу).
У цій сесії закрита code-частина Stage 3; конфігурація cron на PixelX —
наступний крок користувача за готовою інструкцією.

**Узгоджені рішення (Q1–Q4):**
- guard: CLI завжди дозволено, HTTP — лише при заданому `INSTAGRAM_REFRESH_SECRET` + collisional-safe `hash_equals` на `?key=`
- основний cron-режим: Plesk **Run a PHP script** (CLI), HTTP+secret — fallback
- додаємо `/debug_token` для реального `expires_at`
- додаємо `cache/instagram-refresh.log` для аудиту автоматичних запусків
- інструкція з налаштування cron — окремий документ із 2 варіантами

**Створені файли:**
- `main/docs/instagram-cron-setup.md` — інструкція для Plesk Scheduled Task (CLI + HTTP-fallback варіанти, перевірки, troubleshooting, prod-плейсхолдер для фіксації обраного варіанту)

**Змінені файли:**
- `main/public/api/instagram-refresh-token.php` — CLI/HTTP guard, виклик `/debug_token`, окремий success-лог, розширений state JSON
- `main/public/api/instagram-config.example.php` — додано `INSTAGRAM_REFRESH_SECRET` з коментарем (порожній за замовчуванням = CLI-only)
- `main/public/api/instagram-config.php` — додано `INSTAGRAM_REFRESH_SECRET` (локально для тестів)
- `main/docs/instagram-live-feed-plan.md` — Stage 3 чек-лист оновлено, додано посилання на cron-setup

**Розширення `instagram-token.json`:**
- `expires_at` (primary, fallback chain: page_token_expires_at → page_data_access_expires_at → user_token_expires_at)
- `user_token_expires_at`, `page_token_expires_at`, `page_data_access_expires_at` — окремо
- `scopes` — список з debug_token

**Перевірки локально (`php -S 127.0.0.1:8765 -t public`):**
- CLI mode: `php instagram-refresh-token.php` → exit 0, JSON у stdout, success-лог `mode=cli` ✓
- HTTP без `?key=` → 403 `http_forbidden` ✓
- HTTP з невірним `?key=` → 403 `http_forbidden` ✓
- HTTP з вірним `?key=` → 200, success-лог `mode=http` ✓
- `instagram-token.json` після refresh: `expires_at=2026-08-02T07:52:29+00:00` (≈90 днів від `data_access_expires_at`) ✓
- `cache/instagram-refresh.log` пише структуровані рядки без секретів ✓
- `cache/instagram-feed.error.log` пише `refresh:http_forbidden` для відхилених спроб ✓

**Відомі обмеження після Сесії 26:**
- `page_token_expires_at` = `null` — Meta для page tokens, що походять від long-lived user token, повертає `expires_at=0` ("never expires"). Це нормально; як індикатор "коли треба перерефрешити" використовуємо `page_data_access_expires_at` (≈90 днів). Cron щодня подовжує цей термін.
- Точна форма поля Script path у Plesk не відома до першого налаштування — інструкція містить три варіанти.

**Відкриті задачі для самого користувача (поза code base):**
1. Зайти в Plesk → Scheduled Tasks за документацією, додати щоденний task на 03:00 Europe/Berlin.
2. Натиснути **Run Now**, переконатись, що `instagram-token.json` оновився і `instagram-refresh.log` має `mode=cli`.
3. Через 24+ години — повторно перевірити лог.
4. Повідомити, який саме рядок Script path / URL спрацював, щоб зафіксувати в `docs/instagram-cron-setup.md` (секція "Зафіксований prod-варіант") і в цьому журналі.

**Статус:**
- Stage 2 (`Runtime PHP layer`) — виконано локально
- Stage 3 (`Token maintenance`) — code-частина виконана; cron-конфігурація на хостингу очікує дій користувача
- Stage 4 (`Frontend integration`) — не починався

**Підпис:** Claude (Opus 4.7)
**Дата/час:** 2026-05-04 11:35 CEST

---

### 2026-05-04 — Instagram live feed: Stage 3 cron на проді підтверджено

**Сесія 27 — Plesk Scheduled Task запрацював**

Файли з Сесій 25–26 залиті на PixelX, Plesk Scheduled Task створений
у CLI-режимі.

**Зафіксований prod-варіант:**
- режим: **Run a PHP script** (CLI), `INSTAGRAM_REFRESH_SECRET` на хостингу порожній → HTTP-вхід заблокований 403
- Script path: `httpdocs/api/instagram-refresh-token.php`
- розклад: `Daily at 03:00 Europe/Berlin`
- перший `Run Now` пройшов успішно **2026-05-04 11:45:39 +02:00** (`ok=true`, `expires_at=2026-08-02T09:52:29+02:00`)
- хост-файли оновились: `cache/instagram-token.json` має свіжий `refreshed_at`, `cache/instagram-refresh.log` має рядок `mode=cli`

**Документація:**
- `docs/instagram-cron-setup.md` — заповнений блок "Зафіксований prod-варіант"
- `docs/instagram-live-feed-plan.md` — Stage 3 чек-лист і "Чеклист готовності" оновлено

**Залишилось у Stage 3:**
- підтвердження "без ручного втручання" — після першого автоматичного запуску о 03:00 (некритично, формальна перевірка наступної доби)

**Статус:**
- Stage 2 (`Runtime PHP layer`) — виконано локально
- Stage 3 (`Token maintenance`) — **виконано на проді**, очікує добового self-test
- Stage 4 (`Frontend integration`) — наступний

**Підпис:** Claude (Opus 4.7)
**Дата/час:** 2026-05-04 11:50 CEST

---

### 2026-05-04 — Instagram live feed: Stage 4 `Frontend integration` (перша версія)

**Сесія 28 — Feed-grid у `SocialSection`**

**Архітектурне рішення:** замість окремого `InstagramFeedSection.tsx` вставили
feed безпосередньо в існуючий `SocialSection`. Логіка: feed і CTA на профіль
живуть у одному блоці "Folgen Sie uns / Baufortschritt live" і не повинні
розриватися окремими секціями.

**Створені файли:**
- `main/src/lib/instagram-feed.ts` — типи `InstagramItem`, `InstagramFeed`, fetcher `fetchInstagramFeed(signal)`

**Змінені файли:**
- `main/src/components/SocialSection.tsx` — повністю переписано: feed-grid (3 квадрати) під CTA-кнопками, `useEffect` з AbortController, окремі стани skeleton/grid/empty/error
- `main/src/i18n/types.ts`, `de.ts`, `tr.ts` — додано `feedHint`, `feedEmpty`, `feedError`, `feedViewOnInstagram`
- `main/vite.config.ts` — `server.proxy['/api']` → прод-домен (PHP виконується тільки на хостингу; локальний dev через Docker отримує feed з прода)
- `main/public/api/instagram-feed.php` — у Graph API fields додано `like_count, comments_count`; у нормалізованому payload — `likeCount`, `commentsCount` (з типом `number | null` для post-types, які не мають реакцій)

**Дизайн картки (перша версія):**
- square image (`aspect-square`, `rounded-lg`)
- БЕЗ номерів 01/02/03 (явно відкинуто за рефом)
- hover-overlay: `bg-black/45` затемнення + Instagram icon + текст "Auf Instagram ansehen" / "Instagram'da görüntüle" з плавною transform+opacity анімацією (350–400ms, soft easing)
- caption — реальний з Meta API, `line-clamp-2`, `font-light text-muted-foreground`
- лічильники — реальні Heart (likes) + MessageCircle (comments) із бекенду; `formatCount()` згортає 10000+ → "12.3k"
- skeleton — 3 анімовані квадрати поки feed грузиться
- empty/error — центровий рядок "Aktuell keine Beiträge verfügbar" / "Beiträge konnten gerade nicht geladen werden"
- адаптив: `grid-cols-1` на mobile, `grid-cols-3` на desktop, `gap-6/gap-8`

**Розташування на сторінці:**
- секція `SocialSection` між `MapSection` і `FinalCTA`
- усередині: header (label + heading + CTA-кнопки Instagram/Facebook) → feed-grid знизу

**Локальний dev (узгоджено в окремій memory):**
- Docker `localhost:8080` у користувача завжди запущений з vite dev + HMR
- vite proxy `/api/*` → `https://ditib-ahlen-projekte.de/api/*` — feed читається з прод-PHP
- `preview_start` у цьому проєкті більше не використовуємо

**Перевірки:**
- HMR підтягнув зміни на користувацькому `localhost:8080`, користувач підтвердив "зміни вже видно"
- лічильники likes/comments тягнуться з реального Graph API (`like_count`, `comments_count` доступні для Business акаунта)
- caption тягнеться з реального Graph API
- Stage 5 (consent gate) у цій сесії ще не торкався — за чек-листом це окремий етап

**Залишилось у Stage 4:**
- остаточна звірка адаптивності desktop/mobile після візуального ревʼю
- можливі правки за фідбеком: розташування feed-блоку, розмір карток, додаткові деталі (дата поста, бейдж типу контенту, divider зверху, "показати більше")

**Статус:**
- Stage 4 (`Frontend integration`) — перша версія в проді dev (через user Docker), очікує дизайн-фідбек
- Stage 5 (`Privacy / consent gate`) — на момент цієї сесії ще не починався

**Підпис:** Claude (Opus 4.7)
**Дата/час:** 2026-05-04 13:20 CEST

---

### 2026-05-04 — Instagram live feed: Stage 4 carousel + PHP limit=6 + dev-mock

**Сесія 29 — Карусель 6 постів, PHP upgrade, dev-mock**

Фідбек після першої версії feed-grid:
- Хочемо 6 постів замість 3
- Карусель по логіці VisionSection (drag/swipe, стрілки, лічильник, fade-peek)
- API повертала пости 1, 2, 4 (пост 3 пропускався через фільтр)
- Лічильники likes/comments показували `—` (стара кеш без цих полів)

**Змінені файли:**

`main/public/api/instagram-feed.php`:
- `FEED_LIMIT` 3 → **6**
- `normalize_items()` — debug-лог в `instagram-feed.error.log` при відфільтруванні поста (id, media_type, наявність thumbnail_url/media_url)
- `CAROUSEL_ALBUM` normalization — доданий fallback на `media_url`/`thumbnail_url` батька, якщо children не мають зображення (вирішує пропущений пост 3)

`main/src/components/SocialSection.tsx` — **повністю переписано**:
- Замість статичного `grid-cols-3` — Embla/shadcn `Carousel` + `CarouselContent` + `CarouselItem`
- `basis-[82%]` mobile / `basis-[48%]` sm / `basis-[31%]` xl → 3 видно + 4-й підглядає
- Лічильник `01 / 06`, стрілки Prev/Next зі станами `disabled`
- Right-fade градієнт (`from-white to-transparent`) як peek-натяк
- Drag/swipe підтримка через Embla (`cursor-grab`, `loop: false`)
- `FeedSkeleton`, empty, error стани збережено

`main/vite.config.ts`:
- Доданий `instagramMockPlugin()` — Vite `configureServer` middleware
- В dev-режимі перехоплює `/api/instagram-feed.php` **до** proxy
- Повертає 6 постів з реальними imageUrl (з продакшн-кешу) + тестові `likeCount`/`commentsCount`
- Дозволяє бачити карусель з 6 постів локально без деплою PHP
- У production build не потрапляє (`apply: "serve"`)

**Залишилось для Stage 4 production:**
- Задеплоїти `instagram-feed.php` на прод (limit=6, like_count, CAROUSEL_ALBUM fallback)
- Видалити `cache/instagram-feed.json` на проді → перший запит підтягне 6 постів з Meta API
- Після цього `instagramMockPlugin` у `vite.config.ts` можна прибрати або залишити для dev

**Залишилось для design review:**
- Фінальна мобільна адаптивність після живого перегляду
- Можливі дизайн-правки карток

**Підпис:** Claude (Opus 4.7)
**Дата/час:** 2026-05-04 CEST

---

### 2026-05-04 — Instagram live feed: production verification + cached media fix

**Сесія 30 — Прод-верифікація, purge кешу, виправлення 404 для cached media**

Що з'ясували під час smoke-check на проді:
- frontend спочатку ховав весь фід, якщо `/api/instagram-feed.php` повертав `error: true`, навіть коли `items` у fallback-кеші були присутні
- локальний dev-сервер завжди підміняв `/api/instagram-feed.php` dev-mock'ом, хоча мав робити це лише при `VITE_INSTAGRAM_MOCK=true`
- продовий API після деплою `instagram-feed.php` усе ще віддавав лише 3 пости, бо читав старий `api/cache/instagram-feed.json`
- після очищення продового `instagram-feed.json` endpoint почав повертати 6 постів і локальні шляхи `/api/cache/instagram-media/*.jpg`
- картинки все одно не вантажилися, бо `api/.htaccess` блокував увесь `/api/cache`, включно з `instagram-media/`

**Змінені файли:**

`main/src/components/SocialSection.tsx`:
- фід більше не ховається при `feed.error === true`, якщо в payload є `items`
- це дозволяє показувати last-good-cache під час тимчасового збою Meta API

`main/vite.config.ts`:
- `instagramMockPlugin()` тепер вмикається лише при `VITE_INSTAGRAM_MOCK=true`
- стандартний dev-режим знову ходить у реальний `/api` через proxy, а не в жорстко вбудований mock

`main/public/api/instagram-feed.php`:
- додано локальне кешування картинок у `api/cache/instagram-media/`
- fallback-кеш також намагається догрузити й закешувати image assets, якщо live fetch недоступний

`main/public/api/.htaccess`:
- правило `RedirectMatch 404 ^/api/cache(/.*)?$` замінено на
  `RedirectMatch 404 ^/api/cache/(?!instagram-media/)(.*)?$`
- у результаті `instagram-feed.json`, `*.log`, token/cache-файли лишаються закритими, але `instagram-media/*.jpg` віддаються публічно

**Фактична перевірка production (2026-05-04):**
- `https://ditib-ahlen-projekte.de/api/instagram-feed.php` → `HTTP 200`
- після purge кешу endpoint повертає **6 постів**
- `source: "cache"` і `updatedAt: "2026-05-04T17:11:11+02:00"`
- `imageUrl` тепер мають вигляд `/api/cache/instagram-media/<post-id>.jpg`
- перевірені image URL віддають `HTTP 200` і `content-type: image/jpeg`

**Підсумок:**
- Stage 4 для production закрито повністю: 6 live posts, carousel, cached media, робочі картинки на проді
- наступний етап для Instagram feed — лише Stage 5 (`Privacy / consent gate`)

**Підпис:** Codex
**Дата/час:** 2026-05-04 CEST

---

### 2026-05-05 — Instagram live feed: Stage 5 `Privacy / consent gate`

**Сесія 31 — Єдина картина для Instagram + DSGVO**

Після Stage 4 Instagram feed технічно працював, але юридична частина ще була
відкладена окремим пунктом. У цій сесії закрито consent/privacy-шар і
прибрано застарілі формулювання в документації.

**Змінені файли:**
- `main/src/components/SocialSection.tsx` — додано `useCookieConsent`; feed не робить `fetch('/api/instagram-feed.php')`, доки `consent.external !== true`; додано consent-placeholder з кнопкою `Instagram-Beiträge laden`
- `main/src/i18n/types.ts`, `de.ts`, `tr.ts` — додано тексти для Instagram consent gate; Cookie-тексти DE/TR явно згадують Google Maps + Instagram у категорії `Externe Inhalte`
- `main/src/components/Footer.tsx` — Datenschutzerklärung отримала окремий розділ `Instagram-Beiträge`; розділи перенумеровано до 16; Stand оновлено на Mai 2026
- `main/docs/instagram-live-feed-plan.md` — оновлено актуальний runtime flow: 6 постів, `SocialSection`, локальний media cache, Stage 5 відмічено як виконаний на рівні коду
- `main/docs/instagram-live-feed-stage-2-php-runtime-spec.md` — прибрано застарілі нотатки про старий ліміт і прямі CDN-медіа, додано актуальні Stage 3–5 нотатки
- `main/HOSTING_PLAN.md`, `main/PROJECT.md` — юридичний чек-лист і поточний статус синхронізовано

**Поточний статус:**
- Stage 5 (`Privacy / consent gate`) — виконано на рівні коду і документації
- Browser QA підтверджено користувачем: accept/revoke flow і mobile carousel працюють

**Підпис:** Codex
**Дата/час:** 2026-05-05 CEST

---

## Поточний стан (2026-05-05)

### ✅ Готово
- [x] 15 React компонентів — повністю реалізовано
- [x] Реальні фото (6) та PDF (10)
- [x] Scroll-анімації по всіх секціях (Hero-крива easing)
- [x] Docker (multi-stage build + nginx)
- [x] Apache `.htaccess`
- [x] SEO: JSON-LD × 7, OG (jpg+png), favicons, robots, sitemap, llms.txt
- [x] Impressum + Datenschutz (реальні дані: Ali Koca, VR 50380)
- [x] Cookie Consent + DSGVO (self-hosted fonts, localStorage, §25 TDDDG)
- [x] Git clean history (без Claude attribution)
- [x] Дизайн-система: Inter Black, rounded-full кнопки, #253e54 бренд-колір
- [x] ProjectPartners: 2 головні учасники + 3 партнери (DITIB, Theismann, Munas-Print, 8media, ASK Ahlen)
- [x] Desktop donation card: QR-код PayPal + IBAN
- [x] llms.txt оновлено: ціль 5M, культурний центр (не мечеть)
- [x] Prod fixes: scroll lock для модалок/lightbox, cookie widget під overlay, action-кнопки `h-[52px]`
- [x] `ImageGallery`: відео на стику секцій + desktop overlay play/pause + mobile-native controls без кастомної кнопки
- [x] Повна багатомовність `DE/TR`: URL-модель `/` + `/tr/`, перемикач мови, типізовані переклади, локалізовані всі секції
- [x] Multilingual SEO: canonical + hreflang + Open Graph + Twitter + JSON-LD для обох мов
- [x] Build-процес генерує окремі `dist/index.html` і `dist/tr/index.html`
- [x] `FAQPage` schema залишається тільки на DE-версії
- [x] `sitemap.xml` оновлено під 2 URL з `xhtml:link` hreflang
- [x] `MapSection`: live Google Maps блок між `CompanySupportSection` і `SocialSection`
- [x] Google Maps `Map ID` + cloud styling підключено через `VITE_GOOGLE_MAPS_MAP_ID`
- [x] Точний polygon ділянки забудови нанесено по 4 координатах замовника
- [x] Поточна Google Maps версія задеплоєна на хостинг
- [x] Instagram live feed Stage 1 (`Meta preparation`) — токени, IDs, перевірка Graph API
- [x] Instagram live feed Stage 2 (`Runtime PHP layer`) — `public/api/` готовий локально (feed + refresh + кеш + fallback + .htaccess)
- [x] Instagram live feed Stage 3 (`Token maintenance`) — повністю: CLI/HTTP guard, `/debug_token`, success-лог, Plesk cron `Run a PHP script` daily 03:00, перший `Run Now` 2026-05-04 успішний, автоматичний запуск без ручного втручання підтверджено
- [x] Instagram live feed Stage 4 (`Frontend integration`) — карусель 6 постів у `SocialSection` (VisionSection-style, Embla, стрілки, fade-peek, лічильник). PHP limit=6 + CAROUSEL_ALBUM fallback. Prod API оновлено, кеш очищено, media thumbnails віддаються через `/api/cache/instagram-media/*.jpg`; mobile/design review підтверджено
- [x] Instagram live feed Stage 5 (`Privacy / consent gate`) — `SocialSection` блокує feed до `consent.external`, Cookie-тексти DE/TR згадують Instagram, Datenschutz має окремий розділ `Instagram-Beiträge` (Stand: Mai 2026), browser accept/revoke flow підтверджено

### 🚀 Хостинг / Deploy
- [x] Домен + DNS (A-record)
- [x] SSL/HTTPS на проді
- [x] Фінальний build і деплой версії з Google Maps + Instagram consent/privacy правками виконано
- [x] Build → `dist/` (командою `npm run build`)
- [x] SEO smoke-check → `npm run seo:check`

---

## Ключові файли

```text
src/
├── pages/
│   ├── Index.tsx                — головна сторінка (DE + TR)
│   ├── Impressum.tsx            — /impressum, /tr/impressum — діє для ditib-ahlen-projekte.de і mitglied.*
│   ├── Datenschutz.tsx          — /datenschutz, /tr/datenschutz — 18 розділів, охоплює лендінг і портал
│   ├── Kontakt.tsx              — /kontakt, /tr/kontakt
│   └── NotFound.tsx
├── components/
│   ├── LegalLayout.tsx          — layout для legal-сторінок (абс. хедер, LangSwitcher, StickyDonateBar)
│   ├── HeroSection.tsx          — головне фото + лого + CTA
│   ├── ProjectIntro.tsx         — текстовий опис проекту
│   ├── VisionSection.tsx        — 3 картки (Bildung/Begegnung/Gebet)
│   ├── ImageGallery.tsx         — фото-grid + відео на стику секцій, lightbox, mobile/video behavior
│   ├── ProjectPartners.tsx      — Projektbeteiligte: 2 головні учасники + 3 партнери, data-driven layout, відіграє роль нижнього стику з відео
│   ├── PDFDownloadSection.tsx   — 10 PDF для завантаження
│   ├── DonationProgress.tsx     — прогрес бар + CountUp + CTA
│   ├── CompanySupportSection.tsx — підтримка для Unternehmen / Sachleistungen / Dienstleistungen
│   ├── MapSection.tsx           — Google Maps блок з live map, polygon ділянки та CTA у header
│   ├── SocialSection.tsx        — Instagram + Facebook CTA
│   ├── FinalCTA.tsx             — фінальна кнопка
│   ├── Footer.tsx               — посилання на /impressum /datenschutz /kontakt (Router Link, не modal)
│   ├── NavBar.tsx               — sticky header (з'являється після 60% vh)
│   ├── StickyDonateBar.tsx      — primary bg, біла кнопка, зникає біля FinalCTA
│   ├── CookieConsent.tsx        — Banner + Settings + Widget (Shield icon, зліва)
│   ├── LangMeta.tsx             — мовозалежні SEO/head теги через react-helmet-async
│   ├── LangSwitcher.tsx         — DE/TR перемикач мови
│   └── Modal.tsx                — базовий modal (scroll lock, ESC, focus trap)
├── lib/
│   ├── google-maps.ts           — lazy loader Maps JS API + mapId/fallback style helpers
│   ├── asset-url.ts             — абсолютні asset URL для img/video/pdf
│   ├── clean-anchor-navigation.ts — плавний scroll до секцій з чистим hash
│   └── utils.ts                 — `cn()` helper
├── i18n/
│   ├── types.ts                 — тип `Translations`
│   ├── useLang.ts               — визначення мови з URL + langUrl()
│   ├── de.ts                    — німецькі переклади
│   └── tr.ts                    — турецькі переклади
├── hooks/
│   ├── use-scroll-reveal.ts     — IntersectionObserver для анімацій
│   ├── use-count-up.ts          — анімований лічильник чисел
│   ├── use-cookie-consent.ts    — стан consent (localStorage)
│   └── use-lock-body-scroll.ts  — scroll lock для modal/lightbox overlay з миттєвим restore позиції
├── seo/
│   └── structuredData.ts        — JSON-LD для DE/TR, FAQ тільки для DE
├── index.css                    — токени + .reveal + .reveal-stagger
└── main.tsx                     — @fontsource imports (self-hosted)

public/
├── img/                         — фото + лого (ditib, theismann, og-image)
├── pdf/                         — 10 архітектурних PDF
├── api/                         — Instagram runtime PHP layer (Stage 2)
│   ├── instagram-feed.php       — runtime endpoint (GET /api/instagram-feed.php)
│   ├── instagram-refresh-token.php — двокроковий refresh user→page token
│   ├── instagram-config.example.php — шаблон без секретів
│   ├── instagram-config.php     — реальні секрети, локально, не в git
│   ├── .htaccess                — захист config / dot-файлів / cache
│   └── cache/                   — runtime кеш + token-state (вміст в .gitignore)
├── robots.txt                   — SEO + AI crawlers config
├── sitemap.xml                  — 2 URL (`/` + `/tr/`) + hreflang
├── llms.txt                     — AI knowledge base (EN/DE/TR)
├── favicon.svg / favicon.png    — фавіконки
└── .htaccess                    — Apache production config

scripts/
├── prerender.mjs                — build-time генерація multilingual HTML
├── seo-config.mjs               — DE/TR SEO-конфіг для prerender
└── seo-smoke-check.mjs          — перевірка SEO/head після build

docs/
├── legal-texts.md               ⚖️ MASTER: авторитетний текст Datenschutz + Impressum (DE), аналіз gap'ів, строки зберігання, рішення щодо фото-checkbox
├── instagram-live-feed-plan.md
├── instagram-live-feed-stage-2-php-runtime-spec.md
├── instagram-cron-setup.md
└── claude-code-production-cleanup-tz.md

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
npm run seo:check        # smoke-check multilingual SEO/head
npm test                 # базова перевірка проекту

# Docker (локальний preview)
docker compose up --build   # http://localhost:8082

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
| Medienpartner | 8media — Videoproduktion |
| Projektpartner | ASK Ahlen |

---

---

### 2026-05-18 — Legal pages UX, navigation polish, SEO breadcrumbs

**Сесія — Редизайн LegalLayout, мовна навігація, BreadcrumbList, виправлення помилок**

#### LegalLayout.tsx — повний редизайн хедера

- Хедер legal-сторінок переведено з `sticky` + білий фон → `absolute` + прозорий (не залипає при скролі).
- Логотип: перенесено з центра на ліву сторону, вирівняний по лівому краю контенту (`max-w-3xl`); розмір збільшено `h-9 → h-12`.
- Додано `LangSwitcher` у правий кут хедера (вирівняний по правому краю контенту).
- Кнопка «Zur Startseite» / «Ana sayfaya dön» перенесена з хедера в зону контенту — розміщується над заголовком сторінки (`h1`).
- Ширина хедера вирівняна по ширині контенту: `max-w-5xl → max-w-3xl`, `justify-between`.
- Домашній URL (`homeUrl`) обчислюється безпосередньо: `lang === "tr" ? "/tr/" : "/"` — без `langUrl()`, щоб уникнути рекурсивного редиректу.

#### StickyDonateBar — розширення на legal-сторінки

- `StickyDonateBar` додано до `LegalLayout.tsx` — плашка тепер присутня на Impressum / Datenschutz / Kontakt.
- Посилання кнопки адаптується до поточної сторінки:
  - на головній: `#spenden` (плавний scroll з чистим hash);
  - на legal-сторінках: `/#spenden` або `/tr/#spenden` (навігація на головну + scroll).
- `onClick` обробник підключається лише на головній сторінці; на legal — стандартна href-навігація.
- Логіка приховування плашки розширена: якщо `#final-cta` не знайдено (legal-сторінки) — спостерігає за `<footer>`. Плашка ховається при будь-якому варіанті.

#### useLang.ts — path-aware langUrl()

- Функція `langUrl(target)` переписана: тепер зберігає поточний шлях при переключенні мови.
- Попередня поведінка: завжди повертала `/` або `/tr/`.
- Нова поведінка:
  - `/impressum` → TR: `/tr/impressum`;
  - `/tr/datenschutz` → DE: `/datenschutz`;
  - `/kontakt` → TR: `/tr/kontakt`;
  - головна (`/`) → TR: `/tr/` (поведінка не змінилась).
- Логіка: стриппає `/tr` prefix для DE, додає `/tr` prefix для TR.

#### App.tsx — ScrollToTop

- Додано компонент `ScrollToTop` (всередині `BrowserRouter`): при зміні `pathname` викликає `window.scrollTo({ top: 0, behavior: "instant" })`.
- Нові сторінки тепер завжди відкриваються з самого верху (раніше браузер зберігав позицію скролу).

#### index.css — анімація входу для legal-сторінок

- Додано `@keyframes legalFadeIn` (opacity 0→1 + translateY 10px→0, 0.35s ease-out).
- Клас `.legal-page-enter` застосовується до контентної зони `LegalLayout` (`max-w-3xl`).
- **Увага:** клас `legal-page-enter` не можна застосовувати до елемента, що містить `position: fixed` дочірні елементи — `transform` в анімації ламає fixed positioning (створює новий stacking context). Тому клас застосований до внутрішнього `div`, а не до `<main>`.

#### BreadcrumbList structured data

- `BreadcrumbList` schema.org доданий до `@graph` у всіх трьох legal-сторінках:
  - `Impressum.tsx`: `DiTiB Ahlen → Impressum`
  - `Datenschutz.tsx`: `DiTiB Ahlen → Datenschutzerklärung / Gizlilik Politikası`
  - `Kontakt.tsx`: `DiTiB Ahlen → Kontakt / İletişim`
- Кожен елемент використовує правильний `item` URL для поточної мови (DE/TR).

#### index.html — умовний preload hero-зображення

- Статичний `<link rel="preload">` для hero-зображення замінено на inline-скрипт, що вставляє preload лише для homepage-маршрутів (`/`, `/tr/`, `/tr`).
- Причина: preload-тег в `<head>` застосовується до всіх сторінок SPA (включаючи legal), а hero-зображення використовується виключно на головній — це призводило до `preload but not used` попередження на `/impressum`, `/datenschutz`, `/kontakt`.

#### google-maps.ts — loading=async

- До URL Maps JS API додано параметр `loading=async`:
  `...&v=weekly&loading=async&libraries=places&callback=...`
- Усуває консольне попередження `loaded directly without loading=async`.

#### MapSection.tsx — захист від падіння при RefererNotAllowedMapError

- Ініціалізацію `new window.google.maps.Map(...)` і подальший setup (Polygon, fitBounds, listeners) обгорнуто у `try/catch`.
- Причина: при `RefererNotAllowedMapError` (обмеження API ключа — тільки локально) Maps API є «завантаженим», але об'єкт `Map` під час конструювання запускає внутрішній `IntersectionObserver` у зламаному стані → `Uncaught TypeError`. `try/catch` переводить компонент у стан `"error"` замість падіння.
- В продакшні (де ключ авторизований для домену) ця помилка не виникає.

#### .env.development — виправлення порту

- `VITE_SITE_ORIGIN=http://localhost:8080 → http://localhost:8082`.
- Причина: preload-URL і asset-URL будувались з портом 8080, хоча dev-сервер запущений на 8082 — браузерний preload cache не спрацьовував (cross-origin mismatch).

**Підпис:** Claude (claude-sonnet-4-6)
**Дата/час:** 2026-05-18 CEST

---

### 2026-05-18 — Production Cleanup: SEO, Redirects, Security, GDPR

**Сесія — Блоки 1–6 з ТЗ `docs/claude-code-production-cleanup-tz.md`**

#### Блок 1 — Canonical, Hreflang, Sitemap (перевірка)

Перевірено всі файли: `sitemap.xml`, `LangMeta.tsx`, `seo-config.mjs`, `prerender.mjs`, усі legal-сторінки. Все було коректно — змін не потребувало. `npm run seo:check` пройшов.

Проблема `https://ditib-ahlen-projekte.de/tr` у Google Search Console — серверний redirect (відсутність trailing slash), вирішено у Блоці 2.

#### Блок 2 — `.htaccess`: redirect policy і SPA 404

Три виправлення у `public/.htaccess`:

**1. HTTPS + non-www — один hop замість двох.**  
Два окремі правила (спочатку `http→https`, потім `www→non-www`) замінено одним із hardcoded canonical domain. Для `http://www.` скорочує ланцюжок з 2 до 1 hop:

```apache
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://ditib-ahlen-projekte.de%{REQUEST_URI} [R=301,L]
```

**2. Явний redirect `/tr` → `/tr/`.**  
Apache автоматично редиректить директорії, але тепер це зафіксовано явним правилом для прозорості:

```apache
RewriteRule ^tr$ /tr/ [R=301,L]
```

**3. SPA fallback — missing static files тепер повертають 404.**  
Раніше `/assets/not-found.js`, `/img/not-found.webp` тощо повертали `200 text/html`. Виправлено: fallback спрацьовує тільки для шляхів без файлового розширення (app routes):

```apache
RewriteCond %{REQUEST_URI} !\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|woff2?|ttf|ico|pdf|mp4|txt|xml|json|php|map)$ [NC]
RewriteRule ^ /index.html [L]
```

#### Блок 3 — Build artifact: секрети більше не потрапляють у dist

`vite build` копіює весь `public/` у `dist/`, включно з `instagram-config.php` і `cache/` (token, logs).

**Новий файл `scripts/clean-dist.mjs`** — запускається після `vite build` і `prerender`, видаляє з `dist`:
- `dist/api/instagram-config.php`
- `dist/api/cache/` (весь каталог — runtime-generated)

**`package.json` — scripts.build:**
```
"build": "vite build && node scripts/prerender.mjs && node scripts/clean-dist.mjs"
```

Після build у `dist/api/` залишаються тільки: `.htaccess`, `instagram-feed.php`, `instagram-refresh-token.php`, `instagram-config.example.php`.

#### Блок 4 — Dependency Security

`npm audit --omit=dev` показав 10 вразливостей. Аналіз показав:

- **Runtime (браузер):** `react-router-dom 6.30.1` — XSS via open redirects (HIGH). Потребував виправлення.
- **Build-time тільки:** `glob`, `minimatch`, `picomatch`, `postcss`, `yaml` — всі через `tailwindcss`. Не потрапляють у браузер.
- **lodash** (через recharts) — Prototype Pollution, але нереалістична для donation landing page.

Виконано `npm audit fix` (22 пакети оновлено, тільки semver-safe зміни). `npm audit fix --force` не запускався — встановив би Vite 8 (major breaking change).

Результат: `npm audit --omit=dev → 0 vulnerabilities`.

#### Блок 5 — Security Headers: HSTS + CSP draft

**`public/.htaccess`** — додано до секції Security Headers:

**HSTS:**
```apache
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
- `includeSubDomains` — безпечно: субдомен `mitglied.ditib-ahlen-projekte.de` підтверджено HTTPS.
- `preload` — навмисно пропущено: незворотній commit до browser preload lists; для community-сайту несвоєчасно.

**CSP** — задокументований draft у закоментованому блоці `.htaccess`. Не активований: GA + Clarity + Maps + lottie (`unsafe-eval`) потребують live-тестування всіх consent-сценаріїв. Для активації — розкоментувати, задеплоїти, перевірити в DevTools.

#### Блок 6 — GDPR Compliance: перевірка + виправлення Datenschutz

Перевірено runtime-поведінку: GA/Clarity завантажуються тільки після `analytics: true`; Maps/Instagram — після `external: true`; reject all очищає GA cookies; floating widget дозволяє змінити/відкликати consent. Всі сценарії коректні.

**Виправлено `src/pages/Datenschutz.tsx`** — текст не відповідав фактичній реалізації:

1. Видалено "im Basic Consent Mode betrieben" — код не використовує GA4 Consent Mode API. GA просто завантажується після згоди.
2. Видалено посилання на Clarity ConsentV2 API — код не викликає `clarity("consent", ...)`. Clarity теж просто завантажується після згоди.

**Підпис:** Claude (claude-sonnet-4-6)
**Дата/час:** 2026-05-18 CEST

---

### 2026-05-18 — Фіксація локальних портів DITIB Ahlen

- Остаточно зафіксовано поточну істину по локальних портах:
  - лендінг `main` працює через Docker на `http://localhost:8082`;
  - портал `portal` працює окремо через Homebrew PHP на `http://localhost:8000`.
- Оновлено `CLAUDE.md`, `PROJECT.md`, `HOSTING_PLAN.md` і `playwright.config.ts`, щоб не повертати старий `8080` як актуальний порт лендінгу.
- Явно заборонено переносити портал у Docker Desktop або повертати старі portal-порти `8083`, `5173` чи `8383`.
- Старі згадки `8080` у хронології вище залишаються історичними записами, не актуальними правилами.

**Підпис:** Codex
**Дата/час:** 2026-05-18 15:21 CEST

---

---

### 2026-05-19 — Юридичне посилення Datenschutz + master legal-документ

**Сесія — Розширення Datenschutz на портал, аналіз DSGVO-gap'ів, docs/legal-texts.md**

#### Аналіз: що бракувало

Перевірено всі поля моделі `Member` (портал), форму реєстрації, SEPA-мандат, e-mail нотифікації, FOTO_UPLOAD_TZ.md. Виявлено критичні gap'и:

- `Datenschutz.tsx` описував тільки лендінг, не портал — при тому що портал посилається на ту саму сторінку.
- Поля `gemeinderegister` і `cenaze_fonu` — особливі категорії за Art. 9 DSGVO (релігійна належність); правова підстава не була задокументована.
- IBAN/BIC (encrypted), digitale Unterschrift (SEPA), e-mail нотифікації порталу, строки зберігання — відсутні в тексті.
- Impressum не містив згадки про субдомен `mitglied.ditib-ahlen-projekte.de`.

#### docs/legal-texts.md — новий master-документ

Створено `docs/legal-texts.md` — єдина авторитетна точка для всіх правових текстів обох сервісів:

- **Аналіз gap'ів** з поясненням, що і чому бракувало.
- **Рішення щодо фото-checkbox:** окрема Einwilligungs-Checkbox для Profilbild є обов'язковою (Art. 7 Abs. 2 DSGVO + Erwägungsgrund 43). Фото — не необхідне для членства → тільки Art. 6 Abs. 1 lit. a DSGVO; бандлювати з загальною dsgvo_zustimmung не можна.
- **Таблиця строків зберігання** (§ 147 AO, SEPA Rulebook).
- **Повний текст Datenschutz і Impressum** (DE, авторитетний).
- **Чекліст впровадження** — що ще треба зробити в порталі (foto_einwilligung checkbox, поле в DB).
- **Примітки для турецького перекладу.**

Правило: при змінах у `Datenschutz.tsx` або `Impressum.tsx` — спочатку оновити `docs/legal-texts.md`.

#### Datenschutz.tsx — оновлення

- Доданий вступний абзац: документ охоплює `ditib-ahlen-projekte.de` **і** `mitglied.ditib-ahlen-projekte.de`.
- Розділ 1: «auf dieser Website und im Mitgliederportal ist».
- **Новий розділ 13 — Mitgliederportal** (7 підрозділів):
  - 13.1 Erhobene Daten (Pflichtangaben, vereinsspezifische Angaben, Zahlungsdaten)
  - 13.2 Zweck und Rechtsgrundlage — Art. 6 Abs. 1 lit. b DSGVO
  - 13.3 Besondere Kategorien — Art. 9 Abs. 2 lit. d DSGVO (gemeinderegister, cenaze fonu)
  - 13.4 SEPA-Lastschriftmandat — IBAN/BIC verschlüsselt, digitale Unterschrift
  - 13.5 E-Mail-Kommunikation (3 тригери; без фото і IBAN)
  - 13.6 Mitgliedskonto /konto
  - 13.7 Speicherdauer — § 147 AO, 10/6 років після виходу з клубу
- Контактний e-mail у розділі «Ihre Rechte».
- LDI NRW: виправлено рід («die Landesbeauftragte»), додано www.ldi.nrw.de.
- Загальна нумерація: 16 → 18 розділів.
- Розділ «Profilbild» — **не додається** до liveschaltung фото-функції в порталі.

#### Impressum.tsx — оновлення

- Доданий вступний рядок: Impressum діє для обох доменів.

#### CLAUDE.md — оновлення

- Таблиця розділів Datenschutz.tsx (1–18).
- Нові правила: `docs/legal-texts.md` як master, заборона на ранній розділ Profilbild.
- Оновлена структура проекту (папка `docs/`, `pages/` з новими сторінками).
- Правило 9 у «Обов'язкових правилах».

**Підпис:** Claude Code (claude-sonnet-4-6)
**Дата/час:** 2026-05-19 CEST

---

*Документ оновлено: 2026-05-19 CEST (Claude Code — Datenschutz 18 розділів, портал + Art. 9 DSGVO, docs/legal-texts.md)*
