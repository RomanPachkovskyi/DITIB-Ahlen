import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { BASE_URL, SEO, buildStructuredData, escapeHtml } from "./seo-config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getNodeByType(graph, type) {
  return graph.find((entry) => entry["@type"] === type);
}

function extractStructuredData(html, key) {
  const match = html.match(
    /<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/
  );

  assert(match, `${key}: structured data script missing`);
  return JSON.parse(match[1]);
}

async function checkPage(key) {
  const filePath =
    key === "de"
      ? path.join(distDir, "index.html")
      : path.join(distDir, "tr/index.html");
  const html = await readFile(filePath, "utf8");
  const config = SEO[key];

  assert(html.includes(`<html lang="${config.lang}">`), `${key}: html lang`);
  assert(
    html.includes(`<link rel="canonical" href="${config.canonical}" />`),
    `${key}: canonical`
  );
  assert(
    html.includes(`<meta name="description" content="${escapeHtml(config.description)}" />`),
    `${key}: description`
  );
  assert(
    html.includes(`<meta property="og:locale" content="${config.ogLocale}" />`),
    `${key}: og locale`
  );
  assert(
    html.includes(`<meta name="twitter:title" content="${escapeHtml(config.twitterTitle)}" />`),
    `${key}: twitter title`
  );
  assert(
    html.includes(`<link rel="alternate" hreflang="tr" href="${BASE_URL}/tr" />`),
    `${key}: hreflang tr`
  );

  const structuredData = extractStructuredData(html, key);
  const graph = structuredData["@graph"];
  const webPage = getNodeByType(graph, "WebPage");
  const organization = getNodeByType(graph, "Organization");
  const faq = getNodeByType(graph, "FAQPage");

  assert(webPage?.url === config.canonical, `${key}: WebPage url`);
  assert(webPage?.inLanguage === config.locale, `${key}: WebPage language`);
  assert(webPage?.name === config.webpageName, `${key}: WebPage name`);
  assert(
    organization?.description === config.organizationDescription,
    `${key}: Organization description`
  );

  if (key === "de") {
    assert(Boolean(faq), "de: FAQPage should exist");
  } else {
    assert(!faq, "tr: FAQPage should be omitted");
  }

  const expectedStructuredData = JSON.stringify(buildStructuredData(config));
  assert(
    JSON.stringify(structuredData) === expectedStructuredData,
    `${key}: structured data mismatch`
  );
}

async function checkSitemap() {
  const sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf8");

  assert(
    sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'),
    "sitemap: xhtml namespace missing"
  );
  assert(
    sitemap.includes("<loc>https://ditib-ahlen-projekte.de/</loc>"),
    "sitemap: de url missing"
  );
  assert(
    sitemap.includes("<loc>https://ditib-ahlen-projekte.de/tr</loc>"),
    "sitemap: tr url missing"
  );
  assert(
    sitemap.includes('hreflang="x-default" href="https://ditib-ahlen-projekte.de/"'),
    "sitemap: x-default missing"
  );
}

await checkPage("de");
await checkPage("tr");
await checkSitemap();

console.log("SEO smoke check passed.");
