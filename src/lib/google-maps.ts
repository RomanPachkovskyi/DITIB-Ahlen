const GOOGLE_MAPS_SCRIPT_ID = "ditib-ahlen-google-maps";
const GOOGLE_MAPS_CALLBACK = "__ditibAhlenInitGoogleMaps";

const customMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f0e8db" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#384c5b" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fffaf2" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#d5c9b8" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#e4d7c4" }] },
  { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#d5dfcf" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#d9cfbf" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#fbf7f1" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f3d8cf" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#d89a8a" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#dbe3ea" }] },
  { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#bfd5de" }] },
];

declare global {
  interface Window {
    [GOOGLE_MAPS_CALLBACK]?: () => void;
    __googleMapsScriptPromise?: Promise<unknown>;
    google?: { maps?: unknown };
  }
}

export const buildGoogleMapsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export function loadGoogleMapsApi(apiKey: string) {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser."));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (window.__googleMapsScriptPromise) {
    return window.__googleMapsScriptPromise;
  }

  window.__googleMapsScriptPromise = new Promise((resolve, reject) => {
    window[GOOGLE_MAPS_CALLBACK] = () => {
      resolve(window.google?.maps);
      delete window[GOOGLE_MAPS_CALLBACK];
    };

    const existingScript = document.getElementById(GOOGLE_MAPS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("error", () => reject(new Error("Google Maps failed to load.")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      reject(new Error("Google Maps failed to load."));
      delete window[GOOGLE_MAPS_CALLBACK];
      window.__googleMapsScriptPromise = undefined;
    };
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&libraries=places&callback=${GOOGLE_MAPS_CALLBACK}`;

    document.head.append(script);
  });

  return window.__googleMapsScriptPromise;
}

export function getStyledMapOptions(mapId?: string) {
  return mapId ? { mapId } : { styles: customMapStyles };
}
