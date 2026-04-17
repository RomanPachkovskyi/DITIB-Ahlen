import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { SEO, buildHeadHtml } from "./seo-config.mjs";

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

function renderPage(template, config) {
  const withoutSeo = stripSeo(template);
  const withLang = setHtmlLang(withoutSeo, config.lang);
  return injectHead(withLang, buildHeadHtml(config));
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
