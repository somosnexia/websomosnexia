import SectionShell from "../SectionShell";
import Reveal, { RevealGroup } from "../Reveal";
import { notForEveryone } from "@/lib/content";

export default function NotForEveryoneSection() {
  return (
    <SectionShell>
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {notForEveryone.h2}
          </h2>
        </Reveal>
        <RevealGroup className="mt-8 space-y-3">
          {notForEveryone.bullets.map((b) => (
            <Reveal key={b} className="text-muted">
              {b}
            </Reveal>
          ))}
        </RevealGroup>
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg text-foreground/90">
            {notForEveryone.closing}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 font-display text-2xl font-semibold text-signal">
            {notForEveryone.punch}
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
