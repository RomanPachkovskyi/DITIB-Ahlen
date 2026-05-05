# Instagram Live Feed for `main`

## Мета

Реалізувати на лендінгу `main` блок з **останніми 6 постами Instagram** у вигляді каруселі, які **оновлюються live без нового build**.

Цей документ фіксує **єдиний робочий варіант** для поточного проєкту і поточного хостингу.

Для детальної реалізації server-side частини дивись окреме ТЗ:

- [instagram-live-feed-stage-2-php-runtime-spec.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-stage-2-php-runtime-spec.md)

## Вихідні умови проєкту

- Проєкт: `main`
- Стек: `React + Vite + TypeScript`
- Прод-хостинг: `PixelX`
- Прод-сервер: `Apache shared hosting`
- Деплой: **ручне завантаження `dist/` через FTP**
- Поточний сайт: **статичний SPA**, без власного бекенду
- Build робиться рідко, тому `build-time fetch` не підходить

## Поточний статус підготовки Meta

### Що вже зроблено

- [x] Instagram акаунт `ditib_ahlen_projekte` переведено в **Professional**
- [x] Створено Facebook Page `DITIB Bildungs- & Begegnungszentrum`
- [x] Facebook Page прив’язано до Instagram акаунта `ditib_ahlen_projekte`
- [x] Створено окремий Meta App `DITIB Ahlen Feed`
- [x] Підтверджено `IG_USER_ID`
- [x] Отримано `long-lived user token`
- [x] Отримано `page access token`
- [x] Перевірено runtime-запити до Graph API з реальними відповідями

### Підтверджені ідентифікатори

- `INSTAGRAM_APP_ID = 1623528855432943`
- `INSTAGRAM_PAGE_ID = 1083007281566669`
- `INSTAGRAM_IG_USER_ID = 17841433989345669`

### Де лежать важливі документи і дані

- Робочі секрети і токени: [main/.env.instagram.local](/Users/roman/Project/DITIB-Ahlen/main/.env.instagram.local)
- Підтвердження зв’язки `Page -> Instagram account`: [workspace/API/me-accounts.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/me-accounts.md)
- Підтвердження `IG_USER_ID` і `profile_picture_url`: [workspace/API/picture_url.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/picture_url.md)
- Підтвердження робочого media endpoint: [workspace/API/media.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/media.md)

### Що зберігаємо як джерело правди

- Для розробки і деплою джерелом правди для секретів є `main/.env.instagram.local`
- Документи у `workspace/API` є довідковими артефактами перевірки і можуть бути видалені після завершення інтеграції, якщо не потрібен технічний слід

## Обраний варіант

### Один правильний шлях

Для `main` використовуємо:

1. **Офіційний Meta Instagram API**
2. **PHP runtime endpoint прямо на PixelX**
3. **React frontend, який читає локальний same-origin endpoint**
4. **Файловий кеш на хостингу**
5. **Автооновлення access token через окремий PHP refresh-script + cron**

Це означає:

- React **не ходить напряму** в Instagram API
- access token **не потрапляє в браузер**
- нові пости з’являються **без rebuild**
- рішення сумісне з `PixelX + FTP + Apache`

## Чому саме цей варіант

Тому що він одночасно:

- працює з вашим реальним хостингом;
- не потребує окремого Laravel/Node-сервера;
- не залежить від Vercel/Netlify/serverless;
- не ламає поточний статичний workflow;
- дає live-оновлення;
- дозволяє тримати секрети поза React bundle.

## Архітектура

```text
Instagram Professional Account
        ↓
Meta Instagram API
        ↓
PixelX / Apache / PHP endpoint
        ↓
JSON response from same domain
        ↓
React component in main
```

### Потік даних

1. Користувач відкриває сайт.
2. React-компонент робить `fetch('/api/instagram-feed.php')`.
3. PHP endpoint на PixelX перевіряє локальний кеш.
4. Якщо кеш свіжий, віддає кешований JSON.
5. Якщо кеш прострочений, endpoint звертається до Meta API, оновлює кеш і віддає свіжі дані.
6. React рендерить 3 останні пости.

## Технічна структура

### Файли в репозиторії

```text
main/
├── public/
│   └── api/
│       ├── .htaccess
│       ├── instagram-feed.php
│       ├── instagram-refresh-token.php
│       ├── instagram-config.example.php
│       └── cache/
│           └── .gitignore
├── src/
│   ├── components/
│   │   └── InstagramFeedSection.tsx
│   ├── lib/
│   │   └── instagram-feed.ts
│   └── i18n/
│       ├── de.ts
│       └── tr.ts
└── docs/
    └── instagram-live-feed-plan.md
```

### Файли, які не комітимо

На `PixelX` вручну додаються:

```text
/api/instagram-config.php
/api/cache/instagram-feed.json
/api/cache/instagram-token.json
```

`instagram-config.php` містить секрети і не входить до git.

## Server-side шар на PixelX

### 1. `instagram-feed.php`

Основний endpoint для React.

Його задача:

- читати конфіг;
- читати токен;
- звертатись до Meta API;
- кешувати результат;
- віддавати тільки очищений JSON для UI.

### 2. `instagram-refresh-token.php`

Окремий endpoint або CLI/PHP script для підтримки long-lived token.

Його задача:

- брати `long-lived user token`;
- оновлювати його через `fb_exchange_token`;
- отримувати новий `page access token` через `me/accounts`;
- зберігати оновлені токени локально;
- писати `refreshed_at` і `expires_at`.

### 3. `api/.htaccess`

Потрібен для:

- заборони прямого доступу до `instagram-config.php`;
- заборони листингу папки `cache/`;
- правильного `Content-Type: application/json` для JSON відповіді при потребі;
- захисту допоміжних файлів.

## Meta API: що саме використовуємо

### Endpoint для постів

Офіційний runtime запит:

```text
GET https://graph.facebook.com/v25.0/{IG_USER_ID}/media
```

### Поля

Запитуємо тільки те, що реально потрібно для карток:

```text
id,
caption,
media_type,
media_url,
permalink,
thumbnail_url,
timestamp,
username,
children{media_type,media_url,thumbnail_url,permalink}
```

### Limit

```text
limit=6
```

### Правила нормалізації

- `IMAGE` → використовуємо `media_url`
- `VIDEO` → використовуємо `thumbnail_url`, якщо є; інакше `media_url`
- `CAROUSEL_ALBUM` → беремо перший `IMAGE`-child або перший `VIDEO`-child (thumbnail_url/media_url); якщо дітей нема або вони порожні — fallback на `media_url`/`thumbnail_url` батька

### Що повертаємо у frontend

Frontend не повинен знати сирий Meta response. Endpoint повертає нормалізований масив:

```json
{
  "items": [
    {
      "id": "1789...",
      "type": "image",
      "imageUrl": "https://...",
      "permalink": "https://www.instagram.com/p/...",
      "caption": "....",
      "timestamp": "2026-05-04T10:12:00+0000",
      "likeCount": 47,
      "commentsCount": 5
    }
  ],
  "updatedAt": "2026-05-04T12:30:00+02:00",
  "source": "cache"
}
```

`likeCount` / `commentsCount` можуть бути `null` для деяких типів постів (Reels без публічних реакцій). Frontend відображає `—` у такому разі.

## Авторизація і токени

### Обов’язкові умови

- Instagram account має бути **Professional**
- акаунт має бути прив’язаний до Facebook Page
- Meta App має бути налаштований під Instagram API

### Доступи

Для читання останніх постів закладаємо:

- `instagram_business_basic` або сумісний доступ для читання профілю/медіа у вибраному login flow
- доступ до пов’язаного професійного акаунта

Фактичний перелік дозволів треба перевірити у Meta App Dashboard під ту схему логіну, яку буде затверджено в App Setup.

### Зберігання токена

Токен зберігається **тільки на хостингу** в PHP/JSON-файлі.

Для runtime endpoint, який читає feed, використовуємо саме:

- `INSTAGRAM_PAGE_ACCESS_TOKEN`

Службові токени:

- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_LONG_LIVED_USER_TOKEN`

не використовуються напряму для читання feed, а потрібні лише для підтримки token flow.

Не можна:

- зберігати token у `VITE_*`
- зберігати token у React коді
- викликати Meta API з браузера

### Refresh токена

Long-lived token оновлюємо автоматично через cron:

- частота: **1 раз на добу**
- механіка: `instagram-refresh-token.php`

Refresh flow фіксуємо як двокроковий:

1. оновлення `long-lived user token`
2. отримання нового `page access token`

Це частина основного рішення, а не опція.

## Кешування

### Кеш feed

Файловий кеш:

```text
/api/cache/instagram-feed.json
```

### TTL

Робоче значення:

- **15 хвилин**

Це дає:

- feed оновлюється достатньо часто;
- хостинг не смикає Meta API при кожному заході;
- зменшується ризик rate-limit.

### Поведінка при помилці

Якщо Meta API тимчасово недоступний:

- endpoint повертає **останній успішний кеш**;
- якщо кешу ще не було, повертає порожній масив + error flag;
- frontend не падає.

## Frontend у `main`

### Новий компонент

Створюємо:

```text
src/components/InstagramFeedSection.tsx
```

### Поведінка компонента

- робить `fetch('/api/instagram-feed.php')`
- показує 3 картки
- кожна картка веде на `permalink`
- під картками лишається CTA на Instagram профіль
- секція стилістично підпорядковується існуючому дизайну `main`

### Де вставляємо

Новий блок логічно ставиться на місце або в розвиток поточного `SocialSection`.

Рекомендований шлях:

- замінити поточний чистий CTA-блок на feed-секцію з CTA внизу

## Privacy / DSGVO

Оскільки на фронтенді будуть завантажуватись `media_url` / `thumbnail_url` з Instagram CDN, це треба трактувати як **зовнішній контент Meta**.

Отже, під час реалізації потрібно:

1. додати Instagram feed до логіки `External Content`
2. не вантажити feed до згоди користувача, якщо цей режим обрано для зовнішнього контенту
3. оновити текст у Datenschutz, якщо це потрібно після фінальної реалізації

Цей пункт не змінює архітектуру. Це частина тієї ж самої реалізації.

## FTP / Build / Deploy

### Як це стикується з поточним workflow

Поточний деплой не змінюється:

1. `npm run build`
2. завантаження `dist/` на `PixelX` через FTP

Але тепер у `dist/` повинні потрапляти також:

- `api/instagram-feed.php`
- `api/instagram-refresh-token.php`
- `api/.htaccess`

Після першого деплою на хостингу окремо додаються:

- `api/instagram-config.php`
- `api/cache/`
- cron job для refresh токена

## Етапи розробки

### Етап 1. Підготовка Meta

- [x] перевести Instagram акаунт у Professional
- [x] перевірити прив’язку до Facebook Page
- [x] створити/перевірити Meta App
- [x] отримати `IG_USER_ID`
- [x] отримати `long-lived user token`
- [x] отримати `page access token`
- [x] зберегти робочі значення в локальний конфіг

### Етап 2. Runtime PHP layer

Детальне робоче ТЗ для цього етапу:

- [instagram-live-feed-stage-2-php-runtime-spec.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-stage-2-php-runtime-spec.md)

- [x] додати `public/api/instagram-feed.php`
- [x] додати `public/api/instagram-refresh-token.php`
- [x] додати `public/api/.htaccess`
- [x] реалізувати читання конфігу (`instagram-config.php` + `instagram-config.example.php`)
- [x] реалізувати HTTP-запит до Meta API (`connect_timeout=3s`, `timeout=5s`)
- [x] реалізувати файловий кеш (`cache/instagram-feed.json`, TTL 15 хв)
- [x] реалізувати safe fallback на last-good-cache (+ `source=empty,error=true` коли кешу немає)
- [x] двокроковий refresh flow `fb_exchange_token` → `me/accounts` → `cache/instagram-token.json`
- [x] логування помилок без секретів у `cache/instagram-feed.error.log`
- [x] `.gitignore` правило для `public/api/instagram-config.php`

**Підтверджено локально (Сесія 25, 2026-05-04):**

- холодний виклик повертає `source=live` з 3 нормалізованими постами
- теплий виклик у межах TTL читає кеш (`source=cache`)
- `Content-Type: application/json; charset=utf-8`
- `instagram-refresh-token.php` створює валідний `instagram-token.json` (новий long-lived user token + новий page access token)

**Перевірено локально Claude, але потребує незалежного підтвердження на pre-prod:**

- зламаний токен зі stale-кешем → `source=cache, error=true`
- зламаний токен без кешу → `source=empty, error=true`
- запис у `cache/instagram-feed.error.log` (`meta_fetch_failed`)

**Відомі обмеження / нотатки до Етапів 3 і 4:**

- `expires_at` після refresh наразі `null` — Meta для page access tokens, отриманих з long-lived user token, не повертає `expires_in` в `/me/accounts`. На Етапі 3 додати окремий виклик `/debug_token` після рефреша, щоб писати реальний `data_access_expires_at` у `instagram-token.json`.
- `instagram-refresh-token.php` зараз публічний. На Етапі 3 додати простий guard (секрет у query або `Require ip` у `.htaccess`), щоб ззовні його не могли смикати.
- довжини токенів змінні від рефреша до рефреша — як критерій валідації не використовувати.
- Vite dev (`:8080`) PHP не виконує. Для Етапу 4 або підняти PHP-server збоку (`php -S 127.0.0.1:8765 -t public`) і налаштувати `server.proxy['/api']` у `vite.config.ts`, або тестувати фронт лише на хості після першого деплою.
- `imageUrl` веде на `*.cdninstagram.com` — на Етапі 5 обов'язково під External Content gate.

### Етап 3. Token maintenance

- [x] зробити формат `instagram-token.json` (заготовка створена в Етапі 2)
- [x] реалізувати refresh-script (двокроковий flow реалізовано в Етапі 2)
- [x] додати `/debug_token` крок для реального `expires_at` (фіксує `page_data_access_expires_at` ≈ 90 днів)
- [x] додати CLI/HTTP guard у refresh-script (CLI завжди дозволено, HTTP — тільки з `INSTAGRAM_REFRESH_SECRET`)
- [x] додати окремий success-лог `cache/instagram-refresh.log`
- [x] підготувати інструкцію для Plesk: [instagram-cron-setup.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-cron-setup.md)
- [x] налаштувати cron на PixelX (Plesk Scheduled Task, `Run a PHP script`, `httpdocs/api/instagram-refresh-token.php`, daily 03:00 Europe/Berlin) — перший `Run Now` 2026-05-04 11:45:39+02:00 успішний
- [ ] перевірити, що token refresh працює без ручного втручання (підтверджується після першого автоматичного запуску о 03:00)

### Етап 4. Frontend integration

- [x] створити helper для fetch / typing (`src/lib/instagram-feed.ts` — `InstagramItem`, `InstagramFeed`, `fetchInstagramFeed`)
- [x] додати локалізовані тексти в `de.ts` і `tr.ts` (`feedHint`, `feedEmpty`, `feedError`, `feedViewOnInstagram`)
- [x] вставити feed-секцію у сторінку — інтегровано прямо в `SocialSection.tsx` (без окремого `InstagramFeedSection.tsx`, бо feed логічно живе в межах того ж блоку, де Instagram/Facebook CTA)
- [x] розширити PHP feed: додано `like_count`, `comments_count` у Graph API запит і `likeCount`, `commentsCount` у нормалізованому payload
- [x] vite proxy `/api → https://ditib-ahlen-projekte.de` для локального dev (PHP не запускається в Docker-контейнері, який тримає тільки vite)
- [x] перша версія дизайну картки: square image, hover-overlay (затемнення + Instagram icon + "Auf Instagram ansehen"), реальний caption (line-clamp-2), реальні лічильники likes + comments
- [x] skeleton/empty/error стани
- [x] переробка на VisionSection-style carousel: 6 постів, Embla/shadcn `Carousel`, логіка `1.5 / 2.5 / 3.5` видимих карток, лічильник `01/06`, стрілки, right-fade peek
- [x] PHP `FEED_LIMIT` 3 → 6; CAROUSEL_ALBUM fallback на батьківський `media_url`; debug-лог для відфільтрованих постів
- [x] dev-mock middleware у `vite.config.ts` (`instagramMockPlugin`) — перехоплює `/api/instagram-feed.php` лише при `VITE_INSTAGRAM_MOCK=true`, повертає 6 постів з реальними imageUrl та тестовими likeCount/commentsCount
- [x] fallback-feed у React більше не ховається при `error: true`, якщо `items` присутні
- [x] media cache: `instagram-feed.php` зберігає image assets у `api/cache/instagram-media/`, а `api/.htaccess` дозволяє доступ лише до цієї підпапки
- [ ] фінальні правки дизайну за фідбеком (мобільна адаптивність, деталі карток)
- [x] задеплоїти оновлений `instagram-feed.php` на прод (limit=6 + like_count + fallback) і очистити `cache/instagram-feed.json` для свіжих даних
- [x] оновити `api/.htaccess` на проді, щоб `/api/cache/instagram-media/*.jpg` віддавалися без 404

### Етап 5. Privacy integration

- [ ] вбудувати секцію в існуючу логіку consent / external content
- [ ] перевірити, що без згоди Instagram feed не підтягується
- [ ] перевірити, що після згоди секція працює

### Етап 6. Production hardening

- [ ] перевірити 200/304/caching headers
- [ ] перевірити роботу при порожньому кеші
- [ ] перевірити роботу при простроченому токені
- [ ] перевірити роботу при таймауті Meta API
- [ ] перевірити ручний FTP deploy

## Чеклист готовності

- [x] Meta App налаштований
- [x] Отримано `IG_USER_ID`
- [x] Отримано long-lived token
- [x] Отримано page access token
- [x] `instagram-feed.php` працює локально/на тесті
- [x] `instagram-refresh-token.php` оновлює token (CLI + HTTP+secret режими, `/debug_token` для `expires_at`)
- [x] cron на PixelX налаштований (Plesk → `Run a PHP script` → `httpdocs/api/instagram-refresh-token.php` → daily 03:00, перший Run Now успішний 2026-05-04)
- [x] `api/.htaccess` блокує доступ до конфігів і cache internals, але дозволяє `/api/cache/instagram-media/*.jpg`
- [x] React-компонент рендерить 6 постів у каруселі (через dev-mock локально; на проді після деплою PHP + очистки кешу)
- [x] без нового build новий пост з’являється через runtime endpoint
- [ ] поведінка коректна на mobile
- [ ] consent / privacy логіка не порушена
- [ ] FTP deploy повністю відтворює систему

## Критичні заборони

Не робимо:

- `build-time fetch`
- прямий виклик Meta API з React
- зберігання token у `VITE_*`
- `oEmbed` як джерело останніх постів
- сторонні Instagram widgets як основу архітектури
- неофіційний scraping Instagram HTML

## Результат

Після реалізації цього плану `main` матиме:

- live-блок з 6 останніми постами Instagram;
- оновлення без нового build;
- безпечне зберігання token поза frontend;
- локальний cache медіа у `api/cache/instagram-media/` без залежності від тимчасових CDN URL у браузері;
- архітектуру, сумісну з `PixelX + Apache + FTP`;
- рішення, яке можна підтримувати без переносу всього сайту на іншу платформу.
