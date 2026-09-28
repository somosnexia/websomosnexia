import SectionShell from "../SectionShell";
import Reveal from "../Reveal";
import CtaButton from "../CtaButton";
import { howWeHelp } from "@/lib/content";

export default function HowWeHelpSection() {
  return (
    <SectionShell id="servicios">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {howWeHelp.h2}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 text-lg text-muted">{howWeHelp.body}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-muted">{howWeHelp.body2}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <CtaButton href="#servicios" variant="ghost">
            {howWeHelp.cta}
          </CtaButton>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 space-y-1 font-display text-xl font-semibold">
            {howWeHelp.closing.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
