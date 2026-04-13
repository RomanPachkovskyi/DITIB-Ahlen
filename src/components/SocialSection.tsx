import { Instagram, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const SocialSection = () => {
  const textRef = useScrollReveal();
  const btnsRef = useScrollReveal();

  return (
    <section className="px-5 md:px-10 py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div ref={textRef} className="reveal">
          <p className="section-label mb-3">— Folgen Sie uns</p>
          <h2 className="font-body text-2xl md:text-3xl font-black text-foreground mb-2">
            Baufortschritt live
          </h2>
          <p className="body-md max-w-sm">
            Aktuelle Updates, Einblicke und Neuigkeiten direkt auf Instagram und Facebook.
          </p>
        </div>
        <div ref={btnsRef} className="reveal reveal-delay-2 self-center md:self-auto shrink-0 flex flex-col items-center sm:flex-row gap-3">
          <a
            href="https://www.instagram.com/ditib_ahlen_projekte"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-[#253e54] hover:bg-[#1e3345] text-white font-body text-sm font-medium px-9 py-4 rounded-full transition-all duration-300 hover:scale-[1.04]"
          >
            <Instagram className="w-4 h-4" />
            Instagram
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>
          <a
            href="https://www.facebook.com/people/Ditib-Ahlen-Projekte/61573315285318"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 bg-[#253e54] hover:bg-[#1e3345] text-white font-body text-sm font-medium px-9 py-4 rounded-full transition-all duration-300 hover:scale-[1.04]"
          >
            <FacebookIcon />
            Facebook
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
