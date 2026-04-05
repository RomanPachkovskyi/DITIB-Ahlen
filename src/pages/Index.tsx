import StickyDonateBar from "@/components/StickyDonateBar";
import HeroSection from "@/components/HeroSection";
import ProjectIntro from "@/components/ProjectIntro";
import ProjectPartners from "@/components/ProjectPartners";
import VisionSection from "@/components/VisionSection";
import ImageGallery from "@/components/ImageGallery";
import PDFDownloadSection from "@/components/PDFDownloadSection";
import DonationProgress from "@/components/DonationProgress";
import SocialSection from "@/components/SocialSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <StickyDonateBar />
      <HeroSection />
      <ProjectIntro />
      <VisionSection />
      <ImageGallery />
      <ProjectPartners />
      <PDFDownloadSection />
      <DonationProgress />
      <SocialSection />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
