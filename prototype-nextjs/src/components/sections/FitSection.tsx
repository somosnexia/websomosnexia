import SectionShell, { Kicker } from "../SectionShell";
import Reveal, { RevealGroup } from "../Reveal";
import CtaButton from "../CtaButton";
import { fit } from "@/lib/content";

export default function FitSection() {
  return (
    <SectionShell className="bg-surface/40 border-y border-surface-border/60">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <Kicker>{fit.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {fit.h2}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-muted">{fit.intro}</p>
          </Reveal>
        </div>

        <div>
          <RevealGroup className="grid gap-3 sm:grid-cols-2">
            {fit.bullets.map((b) => (
              <Reveal
                key={b}
                className="rounded-2xl border border-surface-border bg-background/40 p-4 text-sm text-foreground/90"
              >
                {b}
              </Reveal>
            ))}
          </RevealGroup>
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg text-foreground/90">{fit.closing}</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-6">
            <CtaButton href="#contacto">{fit.cta}</CtaButton>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
