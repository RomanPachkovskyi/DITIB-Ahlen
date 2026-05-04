<?php
/**
 * Instagram token maintenance script.
 *
 * Two-step refresh flow:
 *   1) Exchange long-lived user token via fb_exchange_token to get a fresh
 *      long-lived user token.
 *   2) Call /me/accounts with that user token to obtain a fresh page access
 *      token for the linked Facebook Page.
 *
 * Writes the resulting state to public/api/cache/instagram-token.json.
 *
 * Designed for cron use later, but is also runnable on demand.
 */

declare(strict_types=1);

@ini_set('display_errors', '0');
error_reporting(E_ERROR | E_PARSE);

header('Content-Type: application/json; charset=utf-8');

const REFRESH_CONNECT_TIMEOUT = 3;
const REFRESH_TIMEOUT         = 5;

$cacheDir   = __DIR__ . '/cache';
$tokenFile  = $cacheDir . '/instagram-token.json';
$errorLog   = $cacheDir . '/instagram-feed.error.log';
$configFile = __DIR__ . '/instagram-config.php';

if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0775, true);
}

if (!is_file($configFile)) {
    fail('config_missing', $errorLog);
}

$config = require $configFile;

$version       = $config['INSTAGRAM_GRAPH_API_VERSION'] ?? 'v25.0';
$appId         = $config['INSTAGRAM_APP_ID'] ?? '';
$appSecret     = $config['INSTAGRAM_APP_SECRET'] ?? '';
$pageId        = $config['INSTAGRAM_PAGE_ID'] ?? '';
$existingUser  = $config['INSTAGRAM_LONG_LIVED_USER_TOKEN'] ?? '';

if ($appId === '' || $appSecret === '' || $existingUser === '' || $pageId === '') {
    fail('config_incomplete', $errorLog);
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
    fail('user_token_exchange_failed', $errorLog);
}

$newUserToken = (string) $exchange['access_token'];
$tokenType    = (string) ($exchange['token_type'] ?? 'bearer');
$expiresIn    = isset($exchange['expires_in']) ? (int) $exchange['expires_in'] : null;
$expiresAt    = $expiresIn ? date('c', time() + $expiresIn) : null;

// Step 2: fetch fresh page access token via /me/accounts.
$accountsUrl = sprintf(
    'https://graph.facebook.com/%s/me/accounts?access_token=%s',
    rawurlencode($version),
    rawurlencode($newUserToken)
);

$accounts = http_get_json($accountsUrl);
if ($accounts === null || empty($accounts['data']) || !is_array($accounts['data'])) {
    fail('me_accounts_failed', $errorLog);
}

$pageToken = null;
foreach ($accounts['data'] as $page) {
    if ((string) ($page['id'] ?? '') === (string) $pageId && !empty($page['access_token'])) {
        $pageToken = (string) $page['access_token'];
        break;
    }
}

if ($pageToken === null) {
    fail('page_token_not_found', $errorLog);
}

$state = [
    'graph_api_version' => $version,
    'access_token'      => $newUserToken,
    'page_access_token' => $pageToken,
    'token_type'        => $tokenType,
    'expires_at'        => $expiresAt,
    'refreshed_at'      => date('c'),
    'source'            => 'refresh',
];

$tmp = $tokenFile . '.tmp';
if (@file_put_contents($tmp, json_encode($state, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)) === false) {
    fail('token_state_write_failed', $errorLog);
}
@rename($tmp, $tokenFile);

// Public response — no raw secrets.
echo json_encode([
    'ok'                => true,
    'graph_api_version' => $version,
    'expires_at'        => $expiresAt,
    'refreshed_at'      => $state['refreshed_at'],
    'page_id'           => $pageId,
], JSON_UNESCAPED_SLASHES);

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

function fail(string $reason, string $logFile): void
{
    $line = sprintf("[%s] refresh:%s\n", date('c'), $reason);
    @file_put_contents($logFile, $line, FILE_APPEND);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $reason], JSON_UNESCAPED_SLASHES);
    exit;
}
