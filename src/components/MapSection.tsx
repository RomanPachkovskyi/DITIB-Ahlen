import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/useLang";
import { buildGoogleMapsUrl, getStyledMapOptions, loadGoogleMapsApi } from "@/lib/google-maps";

const SITE_COORDINATES_DECIMAL = {
  lat: 51.759361,
  lng: 7.906,
};
const GOOGLE_MAPS_URL = buildGoogleMapsUrl(SITE_COORDINATES_DECIMAL.lat, SITE_COORDINATES_DECIMAL.lng);
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

const SITE_POLYGON_PATH = [
  { lat: 51.75907866481751, lng: 7.90587609407315 },
  { lat: 51.75954529463544, lng: 7.9057430554382275 },
  { lat: 51.75960149902202, lng: 7.906201299625186 },
  { lat: 51.75911395631686, lng: 7.906328003087017 },
] as const;

const roadPattern = {
  backgroundImage: `
    linear-gradient(115deg, rgba(37,62,84,0.08) 0%, rgba(37,62,84,0.02) 48%, transparent 48.5%),
    linear-gradient(25deg, transparent 0%, transparent 52%, rgba(199,65,65,0.10) 52.5%, rgba(199,65,65,0.03) 100%),
    repeating-linear-gradient(90deg, rgba(37,62,84,0.10) 0 1px, transparent 1px 92px),
    repeating-linear-gradient(0deg, rgba(37,62,84,0.08) 0 1px, transparent 1px 92px)
  `,
};

const fallbackParcelShape = {
  clipPath: "polygon(13% 19%, 12% 62%, 39% 82%, 73% 61%, 67% 12%, 39% 5%)",
};

const MapSection = () => {
  const { t } = useLang();
  const headerRef = useScrollReveal();
  const mapRef = useScrollReveal({ threshold: 0.06 });
  const liveMapRef = useRef<HTMLDivElement>(null);
  const [mapStatus, setMapStatus] = useState<"idle" | "loading" | "ready" | "error">(
    GOOGLE_MAPS_API_KEY ? "loading" : "idle"
  );

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !liveMapRef.current) {
      return;
    }

    let cancelled = false;
    setMapStatus("loading");

    loadGoogleMapsApi(GOOGLE_MAPS_API_KEY)
      .then(() => {
        if (cancelled || !liveMapRef.current || !window.google?.maps) {
          return;
        }

        const map = new window.google.maps.Map(liveMapRef.current, {
          center: SITE_COORDINATES_DECIMAL,
          zoom: 18,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
          gestureHandling: "cooperative",
          clickableIcons: false,
          ...getStyledMapOptions(GOOGLE_MAPS_MAP_ID),
        });

        const polygon = new window.google.maps.Polygon({
          map,
          paths: SITE_POLYGON_PATH,
          strokeColor: "#c74141",
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: "#c74141",
          fillOpacity: 0.22,
        });

        const bounds = new window.google.maps.LatLngBounds();
        polygon.getPath().forEach((point: google.maps.LatLng) => bounds.extend(point));
        map.fitBounds(bounds, 56);

        if (!cancelled) {
          setMapStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMapStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const hasLiveMap = mapStatus === "ready";

  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div
          ref={headerRef}
          className="reveal mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="section-label mb-4">{t.mapSection.label}</p>
            <h2 className="heading-md text-foreground">{t.mapSection.heading}</h2>
          </div>

          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-0 font-body text-sm font-medium text-primary-foreground shadow-[0_10px_24px_rgba(199,65,65,0.16)] transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_18px_36px_rgba(199,65,65,0.22)] motion-reduce:transform-none md:w-auto md:shrink-0"
          >
            {t.mapSection.primaryCta}
            <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
        </div>
      </div>

      <div className="px-4 md:px-6">
        <div
          ref={mapRef}
          className="reveal reveal-delay-2 mx-auto max-w-[1440px] overflow-hidden rounded-xl border border-[#d8d0bf] bg-[#f5efe5] shadow-[0_30px_80px_rgba(37,62,84,0.12)]"
        >
          <div className="relative min-h-[420px] overflow-hidden md:min-h-[560px]">
            <div
              ref={liveMapRef}
              className={`absolute inset-0 transition-opacity duration-500 ${hasLiveMap ? "opacity-100" : "opacity-0"}`}
            />

            {hasLiveMap ? (
              <>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_rgba(255,255,255,0.05)_32%,_rgba(37,62,84,0.14)_100%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/32 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1d2e3d]/14 to-transparent" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.92),_rgba(255,255,255,0.28)_38%,_rgba(37,62,84,0.10)_100%)]" />
                <div className="absolute inset-0 opacity-90" style={roadPattern} />
                <div className="absolute inset-x-[9%] top-[11%] h-[12%] rounded-full bg-white/35 blur-3xl" />
                <div className="absolute left-[8%] top-[16%] h-[34%] w-[26%] rounded-[40px] border border-white/50 bg-white/16 backdrop-blur-[2px]" />
                <div className="absolute right-[10%] top-[12%] h-[18%] w-[28%] rounded-[32px] border border-[#253e54]/10 bg-[#253e54]/[0.06]" />
                <div className="absolute bottom-[12%] right-[14%] h-[16%] w-[22%] rounded-[28px] border border-[#253e54]/10 bg-white/30" />

                <div className="absolute left-[50%] top-[54%] h-[50%] w-[43%] -translate-x-1/2 -translate-y-1/2 rounded-[40px] bg-[#c74141]/12 p-3 shadow-[0_20px_45px_rgba(199,65,65,0.16)]">
                  <div
                    className="h-full w-full border-[3px] border-[#c74141]/85 bg-[linear-gradient(145deg,rgba(199,65,65,0.20),rgba(199,65,65,0.05))]"
                    style={fallbackParcelShape}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
