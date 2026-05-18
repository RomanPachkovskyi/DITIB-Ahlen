import { rm, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

const REMOVE = [
  "api/instagram-config.php",
  "api/cache",
];

for (const rel of REMOVE) {
  const target = path.join(distDir, rel);
  try {
    await access(target);
    await rm(target, { recursive: true, force: true });
    console.log(`removed: dist/${rel}`);
  } catch {
    // file/dir not present — nothing to do
  }
}
