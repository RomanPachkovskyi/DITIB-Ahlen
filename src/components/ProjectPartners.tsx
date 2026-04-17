import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/useLang";
import askLogo from "@/assets/ASK-logo.png";
import eightMediaLogo from "@/assets/8media-logo.png";
import munasPrintLogo from "@/assets/Munas-Print_Logo-2.png";

type ProjectParticipant = {
  role: string;
  name: string;
  subtitle?: string;
  logo?: string;
  logoAlt?: string;
};

const LogoMark = ({
  participant,
  featured = false,
}: {
  participant: ProjectParticipant;
  featured?: boolean;
}) => {
  if (participant.logo) {
    return (
      <img
        src={participant.logo}
        alt={participant.logoAlt ?? `${participant.name} Logo`}
        className={
          featured
            ? "max-h-[90px] max-w-[238px] object-contain"
            : "max-h-[83px] max-w-[221px] object-contain"
        }
        style={{ mixBlendMode: "multiply" }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-foreground/55"
    >
      {participant.name}
    </div>
  );
};

const ParticipantItem = ({
  participant,
  featured = false,
}: {
  participant: ProjectParticipant;
  featured?: boolean;
}) => (
  <article className="flex flex-col items-center text-center gap-5">
    <div
      className={
        featured
          ? "flex min-h-20 w-fit items-center justify-center bg-background"
          : "flex min-h-14 w-fit items-center justify-center bg-background"
      }
    >
      <LogoMark participant={participant} featured={featured} />
    </div>

    <div>
      <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-[#253e54]">
        {participant.role}
      </p>
      <h3
        className={
          featured
            ? "mt-2 font-body text-xl font-bold leading-tight text-foreground md:text-2xl"
            : "mt-2 font-body text-base font-bold leading-tight text-foreground md:text-lg"
        }
      >
        {participant.name}
      </h3>
      {participant.subtitle && (
        <p className="mt-1 font-body text-sm text-muted-foreground">
          {participant.subtitle}
        </p>
      )}
    </div>
  </article>
);

const ProjectPartners = () => {
  const { t } = useLang();
  const headerRef = useScrollReveal();
  const mainRef = useScrollReveal({ threshold: 0.08 });
  const partnersRef = useScrollReveal({ threshold: 0.08 });

  const mainParticipants: ProjectParticipant[] = [
    {
      role: t.partners.mainRole1,
      name: "DITIB - Ahlen (Westf.)",
      subtitle: "Türkisch Islamische Gemeinde zu Ahlen e.V.",
      logo: "/img/ditib-ahlen-logo.png",
      logoAlt: "Logo der DITIB - Türkisch Islamischen Gemeinde zu Ahlen e.V.",
    },
    {
      role: t.partners.mainRole2,
      name: "Ingenieurbüro Theismann & Partner",
      subtitle: "Dipl.-Ing. Bernd Theismann",
      logo: "/img/ingenieurbuero-theismann-partner-logo.jpg",
      logoAlt: "Logo des Ingenieurbüros Theismann und Partner, Entwurfsverfasser und Tragwerksplanung",
    },
  ];

  const projectPartners: ProjectParticipant[] = [
    {
      role: t.partners.partnerRole,
      name: "Munas-Print",
      subtitle: "Werbeagentur",
      logo: munasPrintLogo,
      logoAlt: "Logo von Munas-Print Ahlen, Medienpartner des Projekts",
    },
    {
      role: t.partners.partnerRole,
      name: "8media",
      subtitle: "Videoproduktion",
      logo: eightMediaLogo,
      logoAlt: "Logo von 8media, Medienpartner des Projekts",
    },
    {
      role: t.partners.projectPartnerRole,
      name: "ASK Ahlen",
      logo: askLogo,
      logoAlt: "Logo von ASK Ahlen, Projektpartner",
    },
  ];

  return (
    <section className="relative z-0 px-5 pt-[8.5rem] pb-16 md:px-10 md:pt-[22rem] md:pb-24">
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="reveal mb-12">
          <p className="section-label mb-4">{t.partners.label}</p>
          <h2 className="heading-md text-foreground max-w-xl">
            {t.partners.heading}
          </h2>
        </div>

        <div
          ref={mainRef}
          className="reveal-stagger grid gap-12 md:grid-cols-2 md:gap-16"
        >
          {mainParticipants.map((participant) => (
            <ParticipantItem
              key={participant.name}
              participant={participant}
              featured
            />
          ))}
        </div>

        <div className="my-14 h-px w-full bg-foreground/10 md:my-16" />

        <div
          ref={partnersRef}
          className="reveal-stagger grid gap-10 md:grid-cols-3 md:gap-12"
        >
          {projectPartners.map((participant) => (
            <ParticipantItem
              key={`${participant.role}-${participant.name}`}
              participant={participant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectPartners;
