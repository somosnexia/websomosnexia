import SectionShell, { Kicker } from "../SectionShell";
import Reveal from "../Reveal";
import { about } from "@/lib/content";

export default function AboutSection() {
  return (
    <SectionShell id="nosotras" className="bg-surface/40 border-y border-surface-border/60">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <Kicker>{about.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {about.h2}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-muted">{about.body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-muted">{about.body2}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 space-y-1 font-display text-xl font-semibold">
              {about.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="rounded-3xl border border-surface-border bg-background/50 p-8">
          <Reveal>
            <h3 className="font-display text-2xl font-semibold text-accent">
              {about.oceanH2}
            </h3>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-5 text-muted">{about.oceanBody}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 font-display text-lg font-medium text-signal">
              {about.oceanPunch}
            </p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
