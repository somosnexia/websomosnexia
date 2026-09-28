"use client";

import { useState, type FormEvent } from "react";
import SectionShell, { Kicker } from "../SectionShell";
import Reveal from "../Reveal";
import { newsletter } from "@/lib/content";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <SectionShell id="newsletter" className="bg-surface/40 border-t border-surface-border/60">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Kicker>{newsletter.kicker}</Kicker>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {newsletter.h2}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-muted">{newsletter.body}</p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          {submitted ? (
            <p className="font-display text-lg font-medium text-accent">
              Ya estás a bordo. Revisa tu email para confirmar la suscripción.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletter.placeholder}
                className="w-full rounded-full border border-surface-border bg-background px-5 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-signal px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-[#180d02] transition-colors hover:bg-signal-soft"
              >
                {newsletter.cta}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </SectionShell>
  );
}
