import SectionShell, { Kicker } from "../SectionShell";
import Reveal from "../Reveal";
import { delegable } from "@/lib/content";

export default function DelegableSection() {
  return (
    <SectionShell className="bg-surface/40 border-y border-surface-border/60">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <Kicker>{delegable.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {delegable.h2}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4 text-muted">
            {delegable.story.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-6 font-display text-xl italic text-signal">
              {delegable.quote}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 text-muted">{delegable.reframe}</p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center">
          <Reveal>
            <ol className="space-y-4">
              {delegable.steps.map((step, i) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="font-display text-sm font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-surface-border" />
                  <span className="font-display text-lg capitalize text-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 font-display text-2xl font-semibold text-balance">
              {delegable.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
