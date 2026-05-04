<?php
/**
 * Instagram token maintenance script.
 *
 * Three-step refresh flow:
 *   1) fb_exchange_token: refresh the long-lived user token.
 *   2) /me/accounts: obtain a fresh page access token for the linked Page.
 *   3) /debug_token: read real expiration timestamps for both tokens.
 *
 * Writes the resulting state to public/api/cache/instagram-token.json.
 *
 * Access modes:
 *   - CLI (php /path/.../instagram-refresh-token.php) — always allowed.
 *     Recommended cron mode: "Run a PHP script" or "php <path>".
 *   - HTTP (GET /api/instagram-refresh-token.php?key=SECRET) — allowed
 *     only if INSTAGRAM_REFRESH_SECRET is non-empty in config AND the
 *     query "key" parameter matches it (constant-time compare).
 *     If the secret is empty, HTTP access is rejected with 403.
 */

declare(strict_types=1);

@ini_set('display_errors', '0');
error_reporting(E_ERROR | E_PARSE);

const REFRESH_CONNECT_TIMEOUT = 3;
const REFRESH_TIMEOUT         = 5;

$isCli = php_sapi_name() === 'cli';

if (!$isCli) {
    header('Content-Type: application/json; charset=utf-8');
}

$cacheDir   = __DIR__ . '/cache';
$tokenFile  = $cacheDir . '/instagram-token.json';
$errorLog   = $cacheDir . '/instagram-feed.error.log';
$refreshLog = $cacheDir . '/instagram-refresh.log';
$configFile = __DIR__ . '/instagram-config.php';

if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0775, true);
}

if (!is_file($configFile)) {
    fail('config_missing', $errorLog, $isCli);
}

$config = require $configFile;

$version       = $config['INSTAGRAM_GRAPH_API_VERSION'] ?? 'v25.0';
$appId         = $config['INSTAGRAM_APP_ID'] ?? '';
$appSecret     = $config['INSTAGRAM_APP_SECRET'] ?? '';
$pageId        = $config['INSTAGRAM_PAGE_ID'] ?? '';
$existingUser  = $config['INSTAGRAM_LONG_LIVED_USER_TOKEN'] ?? '';
$refreshSecret = (string) ($config['INSTAGRAM_REFRESH_SECRET'] ?? '');

// Guard: HTTP requires a configured secret + matching query param.
if (!$isCli) {
    if ($refreshSecret === '') {
        fail('http_disabled_no_secret', $errorLog, false, 403);
    }
    $providedKey = (string) ($_GET['key'] ?? '');
    if ($providedKey === '' || !hash_equals($refreshSecret, $providedKey)) {
        fail('http_forbidden', $errorLog, false, 403);
    }
}

if ($appId === '' || $appSecret === '' || $existingUser === '' || $pageId === '') {
    fail('config_incomplete', $errorLog, $isCli);
}

// Step 1: refresh long-lived user token.
$exchangeUrl = sprintf(
    'https://graph.facebook.com/%s/oauth/access_token?grant_type=fb_exchange_token&client_id=%s&client_secret=%s&fb_exchange_token=%s',
    rawurlencode($version),
    rawurlencode($appId),
    rawurlencode($appSecret),
    rawurlencode($existingUser)
);

$exchange = http_get_json($exchangeUrl);
if ($exchange === null || empty($exchange['access_token'])) {
    fail('user_token_exchange_failed', $errorLog, $isCli);
}

$newUserToken = (string) $exchange['access_token'];
$tokenType    = (string) ($exchange['token_type'] ?? 'bearer');
$expiresIn    = isset($exchange['expires_in']) ? (int) $exchange['expires_in'] : null;
$userExpiresAt = $expiresIn ? date('c', time() + $expiresIn) : null;

// Step 2: fetch fresh page access token via /me/accounts.
$accountsUrl = sprintf(
    'https://graph.facebook.com/%s/me/accounts?access_token=%s',
    rawurlencode($version),
    rawurlencode($newUserToken)
);

$accounts = http_get_json($accountsUrl);
if ($accounts === null || empty($accounts['data']) || !is_array($accounts['data'])) {
    fail('me_accounts_failed', $errorLog, $isCli);
}

$pageToken = null;
foreach ($accounts['data'] as $page) {
    if ((string) ($page['id'] ?? '') === (string) $pageId && !empty($page['access_token'])) {
        $pageToken = (string) $page['access_token'];
        break;
    }
}

if ($pageToken === null) {
    fail('page_token_not_found', $errorLog, $isCli);
}

// Step 3: ask Meta for real expiration of the page token via debug_token.
$pageTokenExpiresAt   = null;
$pageDataAccessExpAt  = null;
$pageTokenScopes      = null;

$debugUrl = sprintf(
    'https://graph.facebook.com/%s/debug_token?input_token=%s&access_token=%s',
    rawurlencode($version),
    rawurlencode($pageToken),
    rawurlencode($appId . '|' . $appSecret)
);

$debug = http_get_json($debugUrl);
if (is_array($debug) && isset($debug['data']) && is_array($debug['data'])) {
    $d = $debug['data'];
    if (!empty($d['expires_at'])) {
        $expTs = (int) $d['expires_at'];
        $pageTokenExpiresAt = $expTs > 0 ? date('c', $expTs) : null;
    }
    if (!empty($d['data_access_expires_at'])) {
        $dTs = (int) $d['data_access_expires_at'];
        $pageDataAccessExpAt = $dTs > 0 ? date('c', $dTs) : null;
    }
    if (!empty($d['scopes']) && is_array($d['scopes'])) {
        $pageTokenScopes = $d['scopes'];
    }
}

$state = [
    'graph_api_version'           => $version,
    'access_token'                => $newUserToken,
    'page_access_token'           => $pageToken,
    'token_type'                  => $tokenType,
    'expires_at'                  => $pageTokenExpiresAt ?? $pageDataAccessExpAt ?? $userExpiresAt,
    'user_token_expires_at'       => $userExpiresAt,
    'page_token_expires_at'       => $pageTokenExpiresAt,
    'page_data_access_expires_at' => $pageDataAccessExpAt,
    'scopes'                      => $pageTokenScopes,
    'refreshed_at'                => date('c'),
    'source'                      => 'refresh',
];

$tmp = $tokenFile . '.tmp';
if (@file_put_contents($tmp, json_encode($state, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) === false) {
    fail('token_state_write_failed', $errorLog, $isCli);
}
@rename($tmp, $tokenFile);

// Success log line — no secrets, only timestamps and IDs.
$logLine = sprintf(
    "[%s] ok mode=%s page_id=%s user_expires_at=%s page_expires_at=%s page_data_access_expires_at=%s\n",
    date('c'),
    $isCli ? 'cli' : 'http',
    $pageId,
    $userExpiresAt ?? '-',
    $pageTokenExpiresAt ?? '-',
    $pageDataAccessExpAt ?? '-'
);
@file_put_contents($refreshLog, $logLine, FILE_APPEND);

// Response.
$response = [
    'ok'                          => true,
    'graph_api_version'           => $version,
    'page_id'                     => $pageId,
    'expires_at'                  => $state['expires_at'],
    'user_token_expires_at'       => $userExpiresAt,
    'page_token_expires_at'       => $pageTokenExpiresAt,
    'page_data_access_expires_at' => $pageDataAccessExpAt,
    'refreshed_at'                => $state['refreshed_at'],
];

if ($isCli) {
    fwrite(STDOUT, json_encode($response, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "\n");
} else {
    echo json_encode($response, JSON_UNESCAPED_SLASHES);
}

// ---------- helpers ----------

function http_get_json(string $url): ?array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => REFRESH_CONNECT_TIMEOUT,
        CURLOPT_TIMEOUT        => REFRESH_TIMEOUT,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    if ($body === false || $code < 200 || $code >= 300) {
        return null;
    }
    $data = json_decode($body, true);
    return is_array($data) ? $data : null;
}

function fail(string $reason, string $logFile, bool $isCli, int $httpStatus = 500): void
{
    $line = sprintf("[%s] refresh:%s\n", date('c'), $reason);
    @file_put_contents($logFile, $line, FILE_APPEND);
    $payload = ['ok' => false, 'error' => $reason];
    if ($isCli) {
        fwrite(STDERR, json_encode($payload, JSON_UNESCAPED_SLASHES) . "\n");
        exit(1);
    }
    http_response_code($httpStatus);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}
