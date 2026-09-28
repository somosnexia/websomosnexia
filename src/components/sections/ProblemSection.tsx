import SectionShell, { Kicker } from "../SectionShell";
import Reveal, { RevealGroup } from "../Reveal";
import { problem } from "@/lib/content";

export default function ProblemSection() {
  return (
    <SectionShell className="border-t border-surface-border/60">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <Kicker>{problem.kicker}</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {problem.h2}
            </h2>
          </Reveal>
          <RevealGroup className="mt-6 space-y-1 text-lg text-muted">
            {problem.lines.map((line) => (
              <Reveal as="span" key={line} className="block">
                {line}
              </Reveal>
            ))}
          </RevealGroup>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <p className="text-lg text-foreground/90">{problem.body}</p>
          </Reveal>
          <RevealGroup className="space-y-3 border-l-2 border-signal/60 pl-5">
            {problem.bullets.map((b) => (
              <Reveal as="span" key={b} className="block font-display text-lg font-medium">
                {b}
              </Reveal>
            ))}
          </RevealGroup>
          <div className="space-y-4 text-muted">
            {problem.closing.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
