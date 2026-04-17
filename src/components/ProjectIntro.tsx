import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLang } from "@/i18n/useLang";

const ProjectIntro = () => {
  const { t } = useLang();
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section
      id="projekt"
      className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28 lg:px-12 lg:py-32 -mt-[3px]"
    >
      <div className="mx-auto max-w-5xl">
        <div ref={headerRef} className="reveal mx-auto mb-14 max-w-4xl text-center md:mb-16">
          <p className="section-label mb-5">{t.projectIntro.label}</p>
          <h2 className="heading-lg text-foreground">
            {t.projectIntro.heading}
          </h2>
        </div>

        <div
          ref={gridRef}
          className="reveal reveal-delay-2 grid gap-x-14 gap-y-10 pt-10 lg:grid-cols-2 lg:gap-x-20 lg:pt-12"
        >
          <div className="space-y-10">
            {t.projectIntro.leftColumn.map((item) => (
              <article key={item.title} className="max-w-[34rem]">
                <p className="mb-2 text-base font-semibold tracking-[-0.01em] text-foreground md:text-lg">
                  {item.title}
                </p>
                <p className="body-lg">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="space-y-10">
            {t.projectIntro.rightColumn.map((item) => (
              <article key={item.title} className="max-w-[34rem]">
                <p className="mb-2 text-base font-semibold tracking-[-0.01em] text-foreground md:text-lg">
                  {item.title}
                </p>
                <p className="body-lg">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;
