import SectionShell from "../SectionShell";
import Reveal from "../Reveal";
import CtaButton from "../CtaButton";
import { finalCta } from "@/lib/content";

export default function FinalCtaSection() {
  return (
    <SectionShell id="contacto" className="overflow-hidden">
      <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-surface-border bg-gradient-to-b from-surface to-background/60 px-8 py-16 text-center sm:px-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

        <Reveal>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {finalCta.h2}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 text-lg text-muted">{finalCta.body}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-muted">{finalCta.body2}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 space-y-1 font-display text-xl font-semibold">
            {finalCta.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex flex-col items-center gap-3">
          <CtaButton href="#newsletter">{finalCta.cta}</CtaButton>
          <p className="text-sm text-muted">{finalCta.ctaSub}</p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
