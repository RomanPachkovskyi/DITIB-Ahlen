import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CookieConsent from "./components/CookieConsent.tsx";
import AnalyticsManager from "./components/AnalyticsManager.tsx";
import MobileLandscapeGuard from "./components/MobileLandscapeGuard.tsx";
import { scrollToCleanAnchor } from "./lib/clean-anchor-navigation.ts";

const Impressum = lazy(() => import("./pages/Impressum.tsx"));
const Datenschutz = lazy(() => import("./pages/Datenschutz.tsx"));
const Kontakt = lazy(() => import("./pages/Kontakt.tsx"));

const CleanInitialHash = () => {
  useEffect(() => {
    if (!window.location.hash) return;

    requestAnimationFrame(() => {
      scrollToCleanAnchor(window.location.hash, "auto");
    });
  }, []);

  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <CleanInitialHash />
      <ScrollToTop />
      <AnalyticsManager />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/tr/impressum" element={<Impressum />} />
          <Route path="/tr/datenschutz" element={<Datenschutz />} />
          <Route path="/tr/kontakt" element={<Kontakt />} />
          <Route path="/tr/*" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieConsent />
      <MobileLandscapeGuard />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
