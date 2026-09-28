import SectionShell, { Kicker } from "../SectionShell";
import Reveal from "../Reveal";
import { scale } from "@/lib/content";

export default function ScaleSection() {
  return (
    <SectionShell className="bg-surface/40 border-y border-surface-border/60">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Kicker>{scale.kicker}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {scale.h2}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-muted">{scale.body}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-4 font-display text-lg text-accent">
            {scale.progression.join(" · ")}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-foreground/90">{scale.twist}</p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-4 font-display text-2xl font-semibold text-signal">
            {scale.punch}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-6 text-lg text-muted">{scale.closing}</p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
