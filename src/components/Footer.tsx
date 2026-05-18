import { Link } from "react-router-dom";
import { useLang } from "@/i18n/useLang";

const Footer = () => {
  const { t, lang } = useLang();
  const prefix = lang === "tr" ? "/tr" : "";

  return (
    <footer className="px-5 py-10 md:px-10 md:py-8 bg-[#253e54]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-4 text-center md:text-left">
        <div className="order-3 font-body text-xs text-white/50 md:order-1">
          {t.footer.copyright}
        </div>
        <div className="order-1 flex flex-wrap items-center justify-center gap-2 md:order-2 md:gap-6">
          <Link
            to={`${prefix}/impressum`}
            className="rounded-full px-4 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white md:px-0 md:py-0 md:text-xs md:hover:bg-transparent"
          >
            {t.footer.impressum}
          </Link>
          <Link
            to={`${prefix}/datenschutz`}
            className="rounded-full px-4 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white md:px-0 md:py-0 md:text-xs md:hover:bg-transparent"
          >
            {t.footer.datenschutz}
          </Link>
          <Link
            to={`${prefix}/kontakt`}
            className="rounded-full px-4 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white md:px-0 md:py-0 md:text-xs md:hover:bg-transparent"
          >
            {t.footer.kontakt}
          </Link>
        </div>
        <a
          href="https://munas-print.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="order-2 font-body text-xs text-white/60 hover:text-white transition-colors md:order-3 md:text-right"
        >
          {t.footer.madeBy}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
