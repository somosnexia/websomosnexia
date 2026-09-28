import type { ReactNode } from "react";

export default function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.28em] text-accent">
      {children}
    </p>
  );
}
