import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CookieConsent from "./components/CookieConsent.tsx";
import AnalyticsManager from "./components/AnalyticsManager.tsx";
import MobileLandscapeGuard from "./components/MobileLandscapeGuard.tsx";
import { scrollToCleanAnchor } from "./lib/clean-anchor-navigation.ts";

const CleanInitialHash = () => {
  useEffect(() => {
    if (!window.location.hash) return;

    requestAnimationFrame(() => {
      scrollToCleanAnchor(window.location.hash, "auto");
    });
  }, []);

  return null;
};

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <CleanInitialHash />
      <AnalyticsManager />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tr/*" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent />
      <MobileLandscapeGuard />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
