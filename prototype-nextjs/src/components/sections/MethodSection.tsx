import SectionShell, { Kicker } from "../SectionShell";
import Reveal, { RevealGroup } from "../Reveal";
import CtaButton from "../CtaButton";
import { method } from "@/lib/content";

export default function MethodSection() {
  return (
    <SectionShell id="metodo">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Kicker>{method.kicker}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {method.h2}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-muted">{method.intro}</p>
        </Reveal>
      </div>

      <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
        {method.steps.map((step) => (
          <Reveal
            key={step.n}
            className="group relative overflow-hidden rounded-3xl border border-surface-border bg-surface/60 p-8 transition-colors hover:border-accent/60"
          >
            <span className="font-display text-sm font-semibold text-signal">
              {step.n}
            </span>
            <h3 className="mt-3 font-display text-2xl font-semibold">
              {step.h3}
            </h3>
            <p className="mt-4 text-muted">{step.body}</p>
            <p className="mt-4 text-sm text-accent/90">{step.sub}</p>
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />
          </Reveal>
        ))}
      </RevealGroup>

      <Reveal delay={0.2} className="mt-14 flex justify-center">
        <CtaButton href="#contacto">{method.cta}</CtaButton>
      </Reveal>
    </SectionShell>
  );
}
