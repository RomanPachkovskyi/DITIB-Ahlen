const SITE_ORIGIN = "https://ditib-ahlen-projekte.de";

export function assetUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (import.meta.env.DEV) {
    return path;
  }

  return new URL(path, SITE_ORIGIN).toString();
}
