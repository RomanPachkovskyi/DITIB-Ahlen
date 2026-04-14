import { useState, useEffect, useCallback } from "react";

export interface ConsentState {
  necessary: true; // always on
  analytics: boolean;
  external: boolean;
}

interface StoredConsent {
  version: number;
  timestamp: string;
  consent: ConsentState;
}

const STORAGE_KEY = "ditib_cookie_consent";
const CONSENT_VERSION = 1;
const CONSENT_EVENT = "ditib:consent-changed";

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  external: false,
};

function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredConsent = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(consent: ConsentState) {
  const stored: StoredConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    consent,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: stored }));
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored.consent);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    const syncConsent = () => {
      const stored = readConsent();
      setConsent(stored?.consent ?? null);
      setShowBanner(!stored);
    };

    window.addEventListener("storage", syncConsent);
    window.addEventListener(CONSENT_EVENT, syncConsent as EventListener);

    return () => {
      window.removeEventListener("storage", syncConsent);
      window.removeEventListener(CONSENT_EVENT, syncConsent as EventListener);
    };
  }, []);

  const acceptAll = useCallback(() => {
    const all: ConsentState = { necessary: true, analytics: true, external: true };
    writeConsent(all);
    setConsent(all);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const rejectAll = useCallback(() => {
    const minimal: ConsentState = { necessary: true, analytics: false, external: false };
    writeConsent(minimal);
    setConsent(minimal);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const saveCustom = useCallback((custom: ConsentState) => {
    const final: ConsentState = { ...custom, necessary: true };
    writeConsent(final);
    setConsent(final);
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowBanner(false);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  return {
    consent,
    hasConsented: consent !== null,
    showBanner,
    showSettings,
    acceptAll,
    rejectAll,
    saveCustom,
    openSettings,
    closeSettings,
  };
}
