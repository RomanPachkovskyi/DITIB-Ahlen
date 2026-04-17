import { lazy, Suspense } from "react";
import StickyDonateBar from "@/components/StickyDonateBar";
import HeroSection from "@/components/HeroSection";
import { LangMeta } from "@/components/LangMeta";

const ProjectIntro = lazy(() => import("@/components/ProjectIntro"));
const VisionSection = lazy(() => import("@/components/VisionSection"));
const ImageGallery = lazy(() => import("@/components/ImageGallery"));
const ProjectPartners = lazy(() => import("@/components/ProjectPartners"));
const PDFDownloadSection = lazy(() => import("@/components/PDFDownloadSection"));
const DonationProgress = lazy(() => import("@/components/DonationProgress"));
const CompanySupportSection = lazy(() => import("@/components/CompanySupportSection"));
const SocialSection = lazy(() => import("@/components/SocialSection"));
const FinalCTA = lazy(() => import("@/components/FinalCTA"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  return (
    <main className="min-h-screen">
      <LangMeta />
      <StickyDonateBar />
      <HeroSection />
      <Suspense fallback={null}>
        <ProjectIntro />
        <VisionSection />
        <ImageGallery />
        <ProjectPartners />
        <PDFDownloadSection />
        <DonationProgress />
        <CompanySupportSection />
        <SocialSection />
        <FinalCTA />
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
