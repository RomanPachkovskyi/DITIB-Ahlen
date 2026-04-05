import { TrendingUp } from "lucide-react";

const GOAL = 8_000_000;
const CURRENT = 2_340_000;
const PERCENTAGE = Math.round((CURRENT / GOAL) * 100);
const DONORS = 1_847;

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const DonationProgress = () => {
  return (
    <section id="spenden" className="px-5 md:px-10 py-20 md:py-28">
      <div className="max-w-3xl mx-auto">
        <p className="section-label mb-4">— Spendenfortschritt</p>
        <h2 className="heading-md text-foreground mb-3">
          Transparenz & Vertrauen
        </h2>
        <p className="body-md mb-12 max-w-lg">
          Jeder Beitrag zählt. Verfolgen Sie den aktuellen Stand der Spendensammlung 
          in Echtzeit.
        </p>

        {/* Progress card */}
        <div className="bg-card border border-border rounded-sm p-6 md:p-10">
          {/* Amount display */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-8">
            <div>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Gesammelt
              </p>
              <p className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                {formatCurrency(CURRENT)}
              </p>
            </div>
            <div className="md:text-right">
              <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">
                Ziel
              </p>
              <p className="font-display text-xl md:text-2xl font-medium text-muted-foreground">
                {formatCurrency(GOAL)}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-6">
            <div
              className="absolute inset-y-0 left-0 bg-primary rounded-full animate-progress-fill"
              style={{ "--progress-width": `${PERCENTAGE}%` } as React.CSSProperties}
            />
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-body text-sm font-medium text-foreground">
                {PERCENTAGE}% erreicht
              </span>
            </div>
            <span className="font-body text-sm text-muted-foreground">
              {DONORS.toLocaleString("de-DE")} Spender:innen
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#spenden"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-body text-sm font-medium px-8 py-3.5 rounded-sm transition-all duration-200"
          >
            Jetzt spenden
          </a>
        </div>
      </div>
    </section>
  );
};

export default DonationProgress;
