import { useScrollReveal } from "@/hooks/use-scroll-reveal";
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

const mainParticipants: ProjectParticipant[] = [
  {
    role: "Bauherr",
    name: "DITIB - Ahlen (Westf.)",
    subtitle: "Türkisch Islamische Gemeinde zu Ahlen e.V.",
    logo: "/img/ditib-ahlen-logo.png",
    logoAlt: "Logo der DITIB Ahlen",
  },
  {
    role: "Entwurfsverfasser / Tragwerksplanung",
    name: "Ingenieurbüro Theismann & Partner",
    subtitle: "Dipl.-Ing. Bernd Theismann",
    logo: "/img/ingenieurbuero-theismann-partner-logo.jpg",
    logoAlt: "Logo des Ingenieurbüros Theismann und Partner",
  },
];

const projectPartners: ProjectParticipant[] = [
  {
    role: "Medienpartner",
    name: "Munas-Print",
    subtitle: "Werbeagentur",
    logo: munasPrintLogo,
    logoAlt: "Logo von Munas-Print Ahlen",
  },
  {
    role: "Medienpartner",
    name: "8media",
    subtitle: "Videoproduktion",
    logo: eightMediaLogo,
    logoAlt: "Logo von 8media",
  },
  {
    role: "Projektpartner",
    name: "ASK Ahlen",
    logo: askLogo,
    logoAlt: "Logo von ASK Ahlen",
  },
];

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
  <article
    className={
      featured
        ? "grid gap-y-5 sm:grid-cols-[max-content_1fr] sm:items-start sm:gap-x-[30px]"
        : "grid gap-y-4 sm:grid-cols-[max-content_1fr] sm:items-start sm:gap-x-[30px]"
    }
  >
    <div
      className={
        featured
          ? "flex min-h-20 w-fit justify-self-center items-center justify-center bg-background sm:justify-self-start sm:justify-start"
          : "flex min-h-14 w-fit justify-self-center items-center justify-center bg-background sm:justify-self-start sm:justify-start"
      }
    >
      <LogoMark participant={participant} featured={featured} />
    </div>

    <div className="text-center sm:text-left">
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
  const headerRef = useScrollReveal();
  const mainRef = useScrollReveal({ threshold: 0.08 });
  const partnersRef = useScrollReveal({ threshold: 0.08 });

  return (
    <section className="px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div ref={headerRef} className="reveal mb-12">
          <p className="section-label mb-4">— Projektbeteiligte</p>
          <h2 className="heading-md text-foreground max-w-xl">
            Wer baut und wer plant
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
