import { lazy, Suspense, useEffect, useState } from "react";
import screenRotateRightAnimation from "@/assets/screen-rotate-right.json";

const Lottie = lazy(() => import("lottie-react"));
const LANDSCAPE_GUARD_QUERY = "(orientation: landscape) and (max-width: 960px) and (max-height: 520px) and (pointer: coarse)";

const MobileLandscapeGuard = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const guardQuery = window.matchMedia(LANDSCAPE_GUARD_QUERY);
    const updateGuard = () => setIsActive(guardQuery.matches);
    const addQueryListener = (query: MediaQueryList, listener: () => void) => {
      if ("addEventListener" in query) {
        query.addEventListener("change", listener);
        return () => query.removeEventListener("change", listener);
      }

      query.addListener(listener);
      return () => query.removeListener(listener);
    };

    updateGuard();
    const removeGuardListener = addQueryListener(guardQuery, updateGuard);

    return () => {
      removeGuardListener();
    };
  }, []);

  if (!isActive) return null;

  return (
    <div
      className="mobile-landscape-guard"
      role="status"
      aria-live="polite"
      aria-label="Bitte Smartphone drehen"
    >
      <Suspense fallback={<div className="mobile-landscape-guard__animation" aria-hidden="true" />}>
        <Lottie
          animationData={screenRotateRightAnimation}
          autoplay
          className="mobile-landscape-guard__animation"
          loop
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        />
      </Suspense>
      <p>Bitte Smartphone drehen</p>
    </div>
  );
};

export default MobileLandscapeGuard;
