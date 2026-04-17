import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SEO, buildHeadHtml, escapeHtml } from "./seo-config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");
const distIndexPath = path.join(distDir, "index.html");

function setHtmlLang(html, lang) {
  return html.replace(/<html\b([^>]*)>/i, (_match, attrs) => {
    const cleanedAttrs = attrs.replace(/\s+lang="[^"]*"/i, "");
    return `<html${cleanedAttrs} lang="${lang}">`;
  });
}

function stripSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/gi, "")
    .replace(/<meta\s+name="language"[\s\S]*?\/>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?\/>\s*/gi, "")
    .replace(/<link\s+rel="alternate"[\s\S]*?\/>\s*/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[\s\S]*?\/>\s*/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[\s\S]*?\/>\s*/gi, "")
    .replace(
      /<script\s+id="structured-data"\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
      ""
    )
    .replace(
      /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
      ""
    );
}

function injectHead(html, headHtml) {
  return html.replace("</head>", `  ${headHtml}\n</head>`);
}

/**
 * Injects a visually-hidden <h1> directly into the static HTML body,
 * before <div id="root">. This ensures crawlers (Bing, Google) that
 * parse the static HTML find the h1 immediately, without waiting for
 * React to render or for CSS animations to complete.
 * The element is hidden via the standard clip-rect pattern — invisible
 * to users, fully readable by bots.
 */
function injectBodyH1(html, h1Text) {
  const tag = `<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0">${escapeHtml(h1Text)}</h1>`;
  return html.replace(/<div id="root">/, `${tag}<div id="root">`);
}

function renderPage(template, config) {
  const withoutSeo = stripSeo(template);
  const withLang = setHtmlLang(withoutSeo, config.lang);
  const withHead = injectHead(withLang, buildHeadHtml(config));
  return config.h1 ? injectBodyH1(withHead, config.h1) : withHead;
}

async function main() {
  const template = await readFile(distIndexPath, "utf8");
  const deHtml = renderPage(template, SEO.de);
  const trHtml = renderPage(template, SEO.tr);

  await writeFile(distIndexPath, deHtml, "utf8");
  await mkdir(path.join(distDir, "tr"), { recursive: true });
  await writeFile(path.join(distDir, "tr/index.html"), trHtml, "utf8");
}

await main();
