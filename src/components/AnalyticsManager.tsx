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
let googleAnalyticsInitialized = false;
let googleAnalyticsJsInitialized = false;

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
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

function clearGoogleAnalyticsCookies() {
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter(Boolean)
    .filter((name) => name === "_gid" || name === "_gat" || name.startsWith("_ga"))
    .forEach(deleteCookie);
}

function setGoogleDisabled(disabled: boolean) {
  (window as Window & Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
}

function applyGoogleConsent(analyticsEnabled: boolean) {
  ensureDataLayer();

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });

  window.gtag("set", "ads_data_redaction", true);
  window.gtag("set", "url_passthrough", true);

  if (analyticsEnabled && !googleAnalyticsJsInitialized) {
    window.gtag("js", new Date());
    googleAnalyticsJsInitialized = true;
  }

  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: analyticsEnabled ? "granted" : "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  });

  if (analyticsEnabled && !googleAnalyticsInitialized) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });
    googleAnalyticsInitialized = true;
  }
}

function loadGoogleAnalytics(onReady?: () => void) {
  const existing = document.getElementById(GA_SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    onReady?.();
    return;
  }

  ensureDataLayer();

  const script = document.createElement("script");
  script.id = GA_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.onload = () => onReady?.();
  document.head.appendChild(script);
}

function ensureClarityStub() {
  if (window.clarity) return;

  const clarity = (...args: unknown[]) => {
    (clarity.q = clarity.q || []).push(args);
  };

  window.clarity = clarity;
}

function ensureClarityLoaded() {
  if (document.getElementById(CLARITY_SCRIPT_ID)) return;

  ensureClarityStub();

  const script = document.createElement("script");
  script.id = CLARITY_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}?ref=bwt`;
  document.head.appendChild(script);
}

function updateClarityConsent(analyticsEnabled: boolean) {
  if (!window.clarity) return;

  window.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: analyticsEnabled ? "granted" : "denied",
  });

  if (!analyticsEnabled) {
    window.clarity("consent", false);
  }
}

const AnalyticsManager = () => {
  const { consent } = useCookieConsent();
  const location = useLocation();
  const [googleAnalyticsReady, setGoogleAnalyticsReady] = useState(false);
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const analyticsEnabled = consent?.analytics ?? false;

    if (analyticsEnabled) {
      setGoogleDisabled(false);
      applyGoogleConsent(true);
      loadGoogleAnalytics(() => setGoogleAnalyticsReady(true));
      ensureClarityLoaded();
      updateClarityConsent(true);
      return;
    }

    setGoogleAnalyticsReady(false);
    setGoogleDisabled(true);
    applyGoogleConsent(false);
    clearGoogleAnalyticsCookies();
    updateClarityConsent(false);
  }, [consent]);

  useEffect(() => {
    const analyticsEnabled = consent?.analytics ?? false;
    if (!analyticsEnabled || !googleAnalyticsReady || !window.gtag) return;

    const pagePath = `${location.pathname}${location.search}`;
    if (lastTrackedPath.current === pagePath) return;

    window.gtag("event", "page_view", {
      send_to: GA_MEASUREMENT_ID,
      page_title: document.title,
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
    });

    lastTrackedPath.current = pagePath;
  }, [consent, googleAnalyticsReady, location.pathname, location.search]);

  return null;
};

export default AnalyticsManager;
