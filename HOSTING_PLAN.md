# DITIB Ahlen — План технічної підготовки до хостингу

## Поточний стан проекту
- Статичний React SPA (Vite + TypeScript)
- Немає бекенду, БД або API
- Локальний preview/site через Docker на порту 8080
- Мова: German (de)

---

## ✅ Вже готово
- [x] React компоненти (всі 10 секцій лендінгу)
- [x] Дизайн-система (Tailwind + shadcn/ui)
- [x] Адаптивна верстка (mobile-first)
- [x] Локальний dev-сервер (localhost:8080)
- [x] Docker multi-stage build + nginx для локального production-preview
- [x] `npm run build` проходить успішно, `dist/` генерується
- [x] SPA fallback в nginx налаштований
- [x] gzip-компресія в nginx увімкнена
- [x] Cache-Control для статичних asset-ів налаштований
- [x] `robots.txt`, `sitemap.xml`, `sitemap-images.xml`, `llms.txt` підключені
- [x] Cookie banner реалізований
- [x] Impressum / Datenschutz заповнені
- [x] PDF-файли підключені і відкриваються в браузері
- [x] Функціонал пожертв працює через PayPal link + IBAN
- [x] Базове технічне SEO налаштоване (`meta`, Open Graph, Twitter, Schema.org, image SEO)
- [x] `www` автоматично редіректить на основний домен без `www`
- [x] `http` автоматично редіректить на `https`
- [x] SSL-сертифікат активний і автооновлюється
- [x] `Google Search Console`, `Bing Webmaster Tools`, `GA4` і `Microsoft Clarity` підключені

---

## ❌ Що потрібно зробити для повноцінного хостингу

### 1. 🌐 Домен та DNS
- [x] Домен підключено: `https://ditib-ahlen-projekte.de/`
- [x] DNS налаштовано під поточний хостинг
- [x] `www` → apex redirect працює

### 2. 🔒 SSL/HTTPS
- [x] SSL/HTTPS активний для `https://ditib-ahlen-projekte.de/`
- [x] Автооновлення сертифіката на стороні хостингу активне
- [x] HTTP → HTTPS redirect примусово увімкнений на проді

### 3. 🏗️ Production Build
- [x] Запустити `npm run build` — генерує `dist/` папку
- [x] Перевірити що build проходить без помилок
- [ ] Перевірити bundle size (оптимізація за потреби)

### 4. 🐳 Docker Production Setup
- [x] Dockerfile з multi-stage build (Node.js build → nginx serve)
- [x] nginx.conf для SPA (fallback всіх роутів на index.html)
- [x] docker-compose.yml для локального production-preview
- [x] Production-хостинг визначено: PixelX
- [x] Схема деплою уточнена: ручне завантаження `dist/` через FTP

### 5. 📁 Контент (Реальні дані)
- [x] Замінити placeholder зображення на наявні фото/рендери
- [x] Оновити суму зборів (зараз 2.34M / 5M EUR)
- [x] Прибрати публічний лічильник донорів із UI
- [x] Додати реальні PDF файли для завантаження (PDFDownloadSection.tsx)
- [x] Оновити контактну інформацію
- [x] Заповнити сторінки: Impressum, Datenschutz
- [ ] Фінально підтвердити весь текстовий контент перед запуском

### 6. 📧 Функціонал пожертвувань
- [x] Вибрати платіжний провайдер: PayPal
- [x] Підключити зовнішнє посилання на PayPal
- [x] Додати банківський переказ (IBAN)
- [x] Кнопки пожертвування функціональні
- [ ] За потреби додати окреме conversion tracking для кліків на donate CTA

### 7. 🔍 SEO та мета-дані
- [x] Перевірити/оновити Open Graph теги (index.html)
- [x] Додати Schema.org розмітку для організації
- [x] Оновити sitemap.xml
- [x] Додати окремий sitemap для зображень
- [x] Google Search Console вже підключено
- [x] Bing Webmaster Tools підключено

### 8. 📊 Аналітика
- [x] Підключено `Google Analytics 4`
- [x] Підключено `Microsoft Clarity`
- [x] Cookie consent і Datenschutzerklärung оновлено під фактичний analytics stack
- [x] Analytics scripts завантажуються лише після згоди користувача
- [ ] Налаштувати відстеження конверсій (кліки на "Spenden")
- [x] Cookie banner (обов'язково по GDPR!)

### 9. 📱 PWA (опціонально)
- [ ] manifest.json
- [ ] Service Worker для кешування
- [ ] Іконки для різних платформ

### 10. ⚡ Performance
- [ ] Перевірити Lighthouse score (target: 90+)
- [ ] Дотиснути оптимізацію зображень (частково вже є WebP, але не всюди)
- [ ] За потреби додати brotli компресію в production
- [x] Налаштувати gzip компресію в nginx
- [x] Кешування статичних активів (Cache-Control headers)

---

## Поточна схема продакшн-хостингу

- Хостинг: `PixelX`
- Домен: `https://ditib-ahlen-projekte.de/`
- Деплой: ручне завантаження готової папки `dist/` через FTP
- `www` → основний домен без `www`
- `http` → `https`
- SSL-сертифікат оновлюється автоматично

---

## 📋 Обов'язково по закону Німеччини (Impressum/DSGVO)

- [x] **Impressum** — повна юридична інформація про організацію (§5 DDG)
  - Назва організації: DITIB - Türkisch Islamische Gemeinde zu Ahlen e.V.
  - Адреса, телефон, email
  - Реєстраційний номер (Vereinsregister)
  - Відповідальна особа

- [x] **Datenschutzerklärung** (Політика конфіденційності GDPR/DSGVO)
  - Які дані збираються
  - Cookie policy
  - Google Analytics 4 / Microsoft Clarity тільки після згоди

---

## 📅 Пріоритети (по порядку виконання)

1. **До запуску:** Фінальні тексти
2. **Після запуску:** Conversion tracking для donate CTA
3. **Після запуску:** Lighthouse / performance optimization
