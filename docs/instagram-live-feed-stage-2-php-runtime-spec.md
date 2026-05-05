# Детальне ТЗ для Claude Code: Етап 2 `Runtime PHP layer`

> **Статус:** ✅ виконано локально (Сесія 25, 2026-05-04). Цей документ
> залишається як історичне ТЗ. Поточний фактичний стан, перевірки і
> відомі обмеження — у [instagram-live-feed-plan.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-plan.md)
> (секція "Етап 2. Runtime PHP layer" + "Чеклист готовності") і в
> `PROJECT.md` (запис від 2026-05-04, Сесія 25).

## Контекст

Цей документ є **детальним робочим ТЗ** для реалізації server-side частини Instagram live feed у проєкті `main`.

Загальна архітектура, мета, уже завершена Meta-підготовка і повний roadmap описані в базовому документі:

- [instagram-live-feed-plan.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-plan.md)

Цей файл не дублює всю загальну картину, а уточнює **тільки Етап 2**, щоб реалізація вийшла якісною, узгодженою і одразу вела до єдиної цілі:

- **працюючий Instagram-блок на сторінці `main`**

## Мета етапу

На цьому етапі потрібно реалізувати **runtime PHP layer**, який:

1. живе у `public/api/`
2. читає секрети з локального конфігу
3. вміє віддавати нормалізований feed для frontend
4. кешує останній успішний результат
5. безпечно деградує при помилках Meta API
6. готує базу для наступного етапу `token maintenance`

Результатом цього етапу ще не є повністю готовий UI-блок, але саме він створює **єдиний бекенд-контур**, без якого live feed на сторінці не запрацює.

## Джерела правди

### Архітектурний документ

- [instagram-live-feed-plan.md](/Users/roman/Project/DITIB-Ahlen/main/docs/instagram-live-feed-plan.md)

### Локальні секрети і токени

- [main/.env.instagram.local](/Users/roman/Project/DITIB-Ahlen/main/.env.instagram.local)

### Підтверджені API-артефакти

- [workspace/API/me-accounts.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/me-accounts.md)
- [workspace/API/picture_url.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/picture_url.md)
- [workspace/API/media.md](/Users/roman/Project/DITIB-Ahlen/workspace/API/media.md)

## Важливі вхідні дані

На момент старту цього етапу вже підтверджено:

- `INSTAGRAM_APP_ID=1623528855432943`
- `INSTAGRAM_PAGE_ID=1083007281566669`
- `INSTAGRAM_IG_USER_ID=17841433989345669`
- існує робочий `long-lived user token`
- існує робочий `page access token`

Claude Code не повинен заново проходити Meta setup. Потрібно використати вже підготовлений контур.

## Уточнені технічні рішення перед реалізацією

### Який токен використовує runtime feed

Для `instagram-feed.php` використовуємо саме:

- `INSTAGRAM_PAGE_ACCESS_TOKEN`

Інші токени:

- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_LONG_LIVED_USER_TOKEN`

не використовуються для runtime-читання feed напряму.

Вони потрібні лише як службові токени для підтримки і перевипуску `page access token`.

### Який refresh flow реалізуємо

На Етапі 2 потрібно реалізувати **реальний двокроковий refresh flow**, а не заглушку:

1. оновити `long-lived user token` через:

```text
GET /oauth/access_token?grant_type=fb_exchange_token
```

2. отримати новий `page access token` через:

```text
GET /me/accounts
```

Після цього потрібно оновити локальний token-state.

Тобто `instagram-refresh-token.php` має бути вже функціональним, а не лише формальним контрактом.

### Що вважаємо локальною перевіркою

Під "локально" для цього етапу мається на увазі:

- запуск PHP endpoint через локальний PHP server, наприклад:

```bash
php -S localhost:8000 -t main/public
```

Vite dev server (`npm run dev` на `:8080`) не вважається достатнім для перевірки PHP runtime, бо сам PHP не виконує.

Перевірка на PixelX буде окремим наступним кроком після локальної валідації.

### HTTP timeout для Meta API

Для запитів до Graph API закладаємо:

- `connect_timeout = 3s`
- `timeout = 5s`

Це потрібно, щоб frontend не чекав занадто довго, якщо Meta відповідає повільно.

### Логування помилок

Потрібно додати коротке технічне логування помилок у:

```text
public/api/cache/instagram-feed.error.log
```

Вимоги до логів:

- без токенів
- без сирих секретів
- короткі рядки з timestamp і типом помилки
- логування не повинно ламати основний runtime flow

### Захист реального конфігу від git

Потрібно явно захистити реальний конфіг від випадкового коміту.

Очікування:

- реальний `main/public/api/instagram-config.php` не комітиться
- для цього має бути явне правило ігнорування у відповідному `.gitignore`

### Версія Graph API

Версію Graph API потрібно винести в конфіг як окрему константу.

Поточне зафіксоване значення:

- `v25.0`

Це дасть змогу пізніше оновити версію без переписування runtime-коду.

## Що потрібно реалізувати

### 1. Файлова структура

Необхідно додати в репозиторій:

```text
main/public/api/
├── .htaccess
├── instagram-feed.php
├── instagram-refresh-token.php
├── instagram-config.example.php
└── cache/
    └── .gitignore
```

### 2. `instagram-config.example.php`

Потрібен приклад конфігу без секретів.

У ньому мають бути описані ключі на кшталт:

- `INSTAGRAM_GRAPH_API_VERSION`
- `INSTAGRAM_APP_ID`
- `INSTAGRAM_APP_SECRET`
- `INSTAGRAM_PAGE_ID`
- `INSTAGRAM_IG_USER_ID`
- `INSTAGRAM_LONG_LIVED_USER_TOKEN`
- `INSTAGRAM_PAGE_ACCESS_TOKEN`

Важливо:

- реальні секрети не комітити
- `example` має відображати реальну форму очікуваного прод-конфігу

### 3. `instagram-feed.php`

Це головний runtime endpoint для frontend.

Вимоги:

- повертає JSON
- працює по `GET`
- читає конфіг
- читає кеш
- при потребі звертається до Graph API
- нормалізує Meta response до стабільної форми для frontend
- кешує успішну відповідь
- при помилці повертає `last-good-cache`, якщо він є

Для запитів у Meta API цей endpoint використовує:

- `INSTAGRAM_PAGE_ACCESS_TOKEN`

#### Graph API endpoint

```text
GET https://graph.facebook.com/v25.0/{IG_USER_ID}/media
```

#### Обов’язкові поля запиту

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

#### Обмеження

- `limit=6`

#### Нормалізація

Потрібно привести відповідь до формату:

```json
{
  "items": [
    {
      "id": "179...",
      "type": "image",
      "imageUrl": "https://...",
      "permalink": "https://www.instagram.com/p/...",
      "caption": "text",
      "timestamp": "2026-05-04T10:12:00+0000"
    }
  ],
  "updatedAt": "2026-05-04T12:30:00+02:00",
  "source": "live"
}
```

#### Правила для `type` і `imageUrl`

- `IMAGE` -> `type=image`, `imageUrl=media_url`
- `VIDEO` -> `type=video`, `imageUrl=thumbnail_url`, а якщо `thumbnail_url` відсутній, тоді `media_url`
- `CAROUSEL_ALBUM` -> `type=carousel`, брати перший валідний елемент з `children`

#### Кеш

Потрібен файловий кеш:

```text
public/api/cache/instagram-feed.json
```

Вимоги до кешу:

- TTL: `15 хвилин`
- зберігати тільки вже нормалізований payload
- зберігати `updatedAt`
- зберігати джерело `source`

#### Fallback-поведінка

Якщо Meta API повернув помилку або таймаут:

- якщо є валідний останній кеш, віддати його зі `source=cache`
- якщо кешу немає, віддати:

```json
{
  "items": [],
  "updatedAt": null,
  "source": "empty",
  "error": true
}
```

#### Технічні вимоги до endpoint

- ставити `Content-Type: application/json; charset=utf-8`
- не світити сирі токени у відповіді
- не прокидувати у frontend весь сирий response Meta
- мати зрозумілі невеликі внутрішні helper-функції
- не робити надмірно складну архітектуру
- використовувати `connect_timeout=3s`
- використовувати `timeout=5s`
- писати безпечні помилки в `cache/instagram-feed.error.log`

### 4. `instagram-refresh-token.php`

На Етапі 2 потрібно зробити **реально робочий refresh-script**, навіть якщо cron налаштовуватиметься пізніше.

Вимоги:

- читає конфіг
- читає поточний токен-стан
- оновлює `long-lived user token` через `fb_exchange_token`
- після цього отримує новий `page access token` через `me/accounts`
- записує результат у JSON-файл стану токена

На цьому етапі допустимо реалізувати базову версію під наступний формат:

```text
public/api/cache/instagram-token.json
```

Очікувані поля стану:

- `graph_api_version`
- `access_token`
- `page_access_token`
- `token_type`
- `expires_at`
- `refreshed_at`
- `source`

### 5. `api/.htaccess`

Потрібно додати захист для runtime-шару.

Мінімально:

- заборонити прямий доступ до `instagram-config.php`
- заборонити прямий доступ до `.env*`
- заборонити list directory для `cache/`
- захистити службові файли
- не зламати виконання `.php`

### 6. `cache/.gitignore`

Потрібно, щоб папка кешу була в репозиторії, але її вміст не комітився.

### 7. `.gitignore`

Потрібно явно додати правило, яке захищає:

```text
main/public/api/instagram-config.php
```

від випадкового коміту в git.

## Що не потрібно робити на цьому етапі

- не робити React-компонент
- не чіпати `SocialSection` або `Index.tsx`
- не реалізовувати consent/UI-логіку
- не робити build-time fetch
- не переносити секрети в `VITE_*`
- не викликати Meta API з браузера
- не вводити зайві сторонні залежності без потреби

## Якість реалізації

Claude Code має реалізувати це як production-oriented код для shared hosting, а не як тимчасовий proof of concept.

Очікування по якості:

- простий і читабельний PHP
- мінімум магії
- прогнозована обробка помилок
- акуратні JSON-відповіді
- зрозумілі назви функцій
- без витоку секретів
- без прив’язки до локального shell під час runtime

## Перевірка після реалізації

Після завершення Claude Code має перевірити:

1. що `instagram-feed.php` віддає валідний JSON локально
2. що при успішному зверненні до Meta формується кеш
3. що при повторному зверненні без прострочення TTL читається кеш
4. що при штучній помилці Meta endpoint не падає фатально
5. що `instagram-refresh-token.php` створює або оновлює token-state файл
6. що `.htaccess` і структура папок готові до FTP-деплою

## Формат звіту від Claude Code

Після виконання Claude Code має повернути:

- які файли створено
- які файли змінено
- як саме працює runtime flow
- як перевірити endpoint локально
- які ризики або відкриті питання залишилися до Етапу 3 і Етапу 4

## Критерій приймання етапу

Етап вважається виконаним, якщо:

- у `public/api/` існує повний PHP runtime-шар
- `instagram-feed.php` реально вміє повернути до 6 останніх постів через Meta API
- є файловий кеш і fallback
- є стартова token-maintenance заготовка
- структура сумісна з подальшим FTP-деплоєм на `PixelX`

Це має безпосередньо наблизити проєкт до фінальної цілі:

- **працюючий Instagram-блок на сторінці без rebuild**

---

## Implementation notes

> Цей розділ — фіксований звіт після виконання ТЗ у Сесії 25 (2026-05-04).
> Цей розділ фіксує історичне виконання Stage 2. Актуальні зміни Stage 3–5
> додані в основний план `instagram-live-feed-plan.md` і `PROJECT.md`.

### Створені файли

- `main/public/api/instagram-feed.php`
- `main/public/api/instagram-refresh-token.php`
- `main/public/api/instagram-config.example.php`
- `main/public/api/instagram-config.php` *(локально, не в git)*
- `main/public/api/.htaccess`
- `main/public/api/cache/.gitignore`
- `main/.gitignore` — додано `public/api/instagram-config.php`

### Як працює runtime flow

1. `GET /api/instagram-feed.php` → читає `instagram-config.php`.
2. Якщо `cache/instagram-feed.json` молодший за 15 хв → віддає його з `source=cache`.
3. Інакше — `curl` до `https://graph.facebook.com/{INSTAGRAM_GRAPH_API_VERSION}/{IG_USER_ID}/media?fields=...&limit=6&access_token={PAGE_ACCESS_TOKEN}` з `connect_timeout=3s, timeout=5s`.
4. Нормалізує `IMAGE/VIDEO/CAROUSEL_ALBUM` у `{id,type,imageUrl,permalink,caption,timestamp}`, пише кеш, віддає з `source=live`.
5. Будь-яка помилка (config відсутній, бракує полів, HTTP ≠ 2xx, throwable) → `serve_fallback`: останній кеш з `source=cache, error=true`, або `{items:[], updatedAt:null, source:"empty", error:true}`. Помилка пишеться в `cache/instagram-feed.error.log` коротким рядком без секретів.
6. `instagram-refresh-token.php` робить `fb_exchange_token` → новий long-lived user token → `/me/accounts` → новий page access token → пише `cache/instagram-token.json` з `graph_api_version, access_token, page_access_token, token_type, expires_at, refreshed_at, source`. У відповідь клієнту секрети не світяться, тільки `ok, expires_at, refreshed_at, page_id`.

### Ризики / відкриті питання до Етапів 3–4

1. **Cron на PixelX** — налаштовано як Plesk `Run a PHP script`: `httpdocs/api/instagram-refresh-token.php`, daily 03:00 Europe/Berlin.
2. **Token expiry** — Stage 3 додає `/debug_token` і пише `page_data_access_expires_at`; це основний індикатор для підтримки токена.
3. **Версія API** — винесена як `INSTAGRAM_GRAPH_API_VERSION` у конфіг, оновлюється без зміни коду.
4. **Frontend (Етап 4)** — feed інтегрований у `SocialSection.tsx`; Vite dev ходить у prod `/api` через proxy, mock вмикається лише через `VITE_INSTAGRAM_MOCK=true`.
5. **DSGVO / Consent (Етап 5)** — feed заблокований до згоди на `External Content`; медіа кешуються локально в `/api/cache/instagram-media/*.jpg`.
6. **PHP 8.5 deprecations** — у обох скриптах виставлено `display_errors=off` + `error_reporting=E_ERROR|E_PARSE`, щоб попередження не ламали JSON. На production-PHP це поведінка-замовчуванням, але страхуємось явно.
7. **Довжини токенів** — змінні від рефреша до рефреша. Не використовувати як критерій валідації.

### Як перевірити endpoint локально

```bash
cd main
php -S 127.0.0.1:8765 -t public
# в іншому терміналі
curl http://127.0.0.1:8765/api/instagram-feed.php | jq
curl http://127.0.0.1:8765/api/instagram-refresh-token.php | jq
```
