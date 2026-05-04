# Instagram refresh-token cron — інструкція з налаштування на PixelX

Цей документ описує, як налаштувати щоденний cron, що оновлює Instagram
page access token через `instagram-refresh-token.php`.

## Передумови

- Етап 2 виконано і файл `public/api/instagram-refresh-token.php` уже на хостингу.
- На хостингу присутній файл `public/api/instagram-config.php` з реальними секретами (його НЕ можна тримати в git).
- Папка `public/api/cache/` існує і доступна на запис вебсервером.

## Рекомендований режим: CLI ("Run a PHP script")

Це основний варіант. Він не потребує жодних shared-секретів і HTTP-доступ до
refresh-endpoint може бути повністю заблокований.

### Налаштування у Plesk → Domains → ditib-ahlen-projekte.de → Scheduled Tasks → Add Task

| Поле       | Значення |
|------------|---------|
| Active     | ✓ |
| Task type  | **Run a PHP script** |
| Script path| `httpdocs/api/instagram-refresh-token.php` *(шлях відносно docroot домену; точна форма залежить від інсталяції — див. примітку нижче)* |
| Use the PHP version | той самий, що у домена (PHP 8.x) |
| Run        | **Daily at 03:00** *(низьке навантаження, поза піком користувачів)* |
| Description| `Instagram token refresh` |
| Notify     | **Errors only** *(stdout-успіх ігноруємо, stderr приходить як email)* |

**Примітка про шлях:** Plesk у режимі "Run a PHP script" зазвичай очікує
шлях відносно docroot, але деякі версії дозволяють абсолютний шлях. Якщо
виникне помилка `File not found`, спробуйте альтернативи:

- `/api/instagram-refresh-token.php`
- `httpdocs/api/instagram-refresh-token.php`
- `/var/www/vhosts/ditib-ahlen-projekte.de/httpdocs/api/instagram-refresh-token.php`

### Перевірка перед увімкненням Active

1. Відкрити форму Scheduled Task, натиснути **Run Now**.
2. Очікуваний результат: вікно показує `ok: true` JSON або порожній output (якщо Notify=Errors only).
3. Перевірити, що оновився `httpdocs/api/cache/instagram-token.json` (новий `refreshed_at`).
4. Перевірити рядок у `httpdocs/api/cache/instagram-refresh.log` з `mode=cli`.

### Якщо все працює

`INSTAGRAM_REFRESH_SECRET` у `instagram-config.php` лишається порожнім — HTTP-доступ
до refresh-endpoint буде відхилений з `403 http_disabled_no_secret`.

---

## Fallback-режим: HTTP + shared secret

Використовуємо лише якщо "Run a PHP script" недоступний або працює нестабільно.

### 1. Згенерувати секрет

На локальній машині або на сервері:

```bash
openssl rand -hex 32
```

### 2. Додати секрет у `httpdocs/api/instagram-config.php`

```php
'INSTAGRAM_REFRESH_SECRET' => 'PASTE_64_HEX_CHARS_HERE',
```

### 3. Налаштувати Scheduled Task у Plesk

| Поле       | Значення |
|------------|---------|
| Task type  | **Fetch a URL** *(або "Run a command" з curl)* |
| URL        | `https://ditib-ahlen-projekte.de/api/instagram-refresh-token.php?key=<SECRET>` |
| Run        | Daily at 03:00 |
| Notify     | Errors only |

Альтернатива через "Run a command":

```bash
curl -fsS "https://ditib-ahlen-projekte.de/api/instagram-refresh-token.php?key=<SECRET>" >/dev/null
```

`-f` забезпечить ненульовий exit code на 4xx/5xx, тож Plesk пришле email лише за помилки.

### Перевірка fallback-режиму

```bash
# 403 без secret
curl -i https://ditib-ahlen-projekte.de/api/instagram-refresh-token.php
# 200 з secret
curl -i "https://ditib-ahlen-projekte.de/api/instagram-refresh-token.php?key=<SECRET>"
```

---

## Перевірка "без ручного втручання"

Через 24+ години після налаштування cron:

1. SSH/FTP → `httpdocs/api/cache/instagram-refresh.log` — має містити нові рядки за останню добу.
2. `httpdocs/api/cache/instagram-token.json` — поле `refreshed_at` має бути недавнім.
3. `httpdocs/api/cache/instagram-feed.error.log` — не має містити нових рядків `refresh:*`.

Якщо хоч один з цих пунктів не виконано — переглянути Plesk → Scheduled Tasks → останній run, і відповідні нотифікації email.

---

## Усунення проблем

| Симптом | Причина | Що робити |
|---------|---------|-----------|
| `403 http_disabled_no_secret` | HTTP-mode викликаний, але `INSTAGRAM_REFRESH_SECRET` порожній | Або переключитись на CLI mode, або задати secret і викликати з `?key=` |
| `403 http_forbidden` | secret заданий, але query `key` не співпадає | Перевірити URL у Scheduled Task |
| `500 user_token_exchange_failed` | прострочився `INSTAGRAM_LONG_LIVED_USER_TOKEN` | Згенерувати новий long-lived user token у Graph API Explorer і вписати в `instagram-config.php` |
| `500 me_accounts_failed` | новий user token не має потрібних дозволів | Перевірити в Meta App Dashboard, що дозволи `pages_show_list`, `pages_read_engagement`, `instagram_basic` активні |
| `500 page_token_not_found` | `INSTAGRAM_PAGE_ID` у конфігу не той, що в `/me/accounts` | Перевірити `INSTAGRAM_PAGE_ID` у `instagram-config.php` |
| `500 token_state_write_failed` | немає прав на запис у `cache/` | `chmod 0775 httpdocs/api/cache/` |

---

## Зафіксований prod-варіант

- [x] Обраний режим: **CLI** (`Run a PHP script`)
- [x] Точне значення поля Script path у Plesk: `httpdocs/api/instagram-refresh-token.php`
- [x] Час запуску: `Daily at 03:00 Europe/Berlin`
- [x] Перший успішний `Run Now` на хостингу: **2026-05-04 11:45:39 +02:00**
  - відповідь: `ok=true`, `expires_at=2026-08-02T09:52:29+02:00` (`page_data_access_expires_at`, ≈90 днів)
  - `INSTAGRAM_REFRESH_SECRET` на хостингу залишено порожнім → HTTP-доступ до endpoint повністю заблокований (`403 http_disabled_no_secret`)
- [ ] Перший автоматичний запуск (підтвердження "без ручного втручання") — очікується наступної доби о 03:00 Europe/Berlin; перевіряти за свіжим рядком у `httpdocs/api/cache/instagram-refresh.log` і свіжим `refreshed_at` в `instagram-token.json`
