import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

declare global {
  interface Window {
    clarity?: {
      (...args: unknown[]): void;
      q?: unknown[][];
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-BM587Q3MEJ";
const CLARITY_PROJECT_ID = "wbfipf9pd3";
const CLARITY_SCRIPT_ID = "clarity-tag";
const GA_SCRIPT_ID = "google-gtag";

// ─── Google Analytics ────────────────────────────────────────────────────────

function initGtag() {
  window.dataLayer = window.dataLayer || [];
  // Regular function required — gtag.js expects Arguments objects in dataLayer,
  // not plain Arrays produced by arrow functions.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function gtag() { window.dataLayer!.push(arguments); } as typeof window.gtag;
}

function loadGAScript(onReady: () => void) {
  if (document.getElementById(GA_SCRIPT_ID)) {
    onReady();
    return;
  }
  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = onReady;
  document.head.appendChild(script);
}

function deleteCookie(name: string) {
  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const domains = [window.location.hostname, `.${window.location.hostname}`];
  const paths = ["/", ""];
  for (const domain of domains) {
    for (const path of paths) {
      document.cookie = `${name}=; expires=${expires}; path=${path}; domain=${domain}`;
    }
  }
  for (const path of paths) {
    document.cookie = `${name}=; expires=${expires}; path=${path}`;
  }
}

function clearGACookies() {
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0]?.trim())
    .filter(Boolean)
    .filter((n) => n === "_gid" || n === "_gat" || n.startsWith("_ga"))
    .forEach(deleteCookie);
}

// ─── Microsoft Clarity ───────────────────────────────────────────────────────

function loadClarity() {
  if (document.getElementById(CLARITY_SCRIPT_ID)) return;

  if (!window.clarity) {
    const stub = (...args: unknown[]) => { (stub.q = stub.q || []).push(args); };
    window.clarity = stub;
  }

  const script = document.createElement("script");
  script.id = CLARITY_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}?ref=bwt`;
  document.head.appendChild(script);
}

// ─── Component ───────────────────────────────────────────────────────────────

const AnalyticsManager = () => {
  const { consent } = useCookieConsent();
  const location = useLocation();
  const [gaReady, setGaReady] = useState(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const enabled = consent?.analytics ?? false;

    if (!enabled) {
      // Disable GA4 and clean up cookies
      (window as Window & Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
      clearGACookies();
      setGaReady(false);
      return;
    }

    // Analytics accepted — standard gtag init (no Consent Mode needed:
    // script only loads after explicit user consent).
    (window as Window & Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

    initGtag();
    window.gtag!("js", new Date());
    window.gtag!("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });

    loadGAScript(() => setGaReady(true));
    loadClarity();
  }, [consent]);

  // Send page_view after GA script is ready, and on route changes
  useEffect(() => {
    if (!gaReady || !window.gtag) return;

    const path = `${location.pathname}${location.search}`;
    if (lastPath.current === path) return;

    window.gtag("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_title: document.title,
      page_location: `${window.location.origin}${path}`,
      page_path: path,
    });

    lastPath.current = path;
  }, [gaReady, location.pathname, location.search]);

  return null;
};

export default AnalyticsManager;
