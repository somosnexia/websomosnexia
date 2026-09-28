"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function CtaButton({
  children,
  href = "#contacto",
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-wide transition-colors";
  const styles =
    variant === "solid"
      ? "bg-signal text-foreground hover:bg-signal-soft"
      : "border border-surface-border text-foreground hover:border-accent hover:text-accent";

  return (
    <motion.a
      href={href}
      className={`${base} ${styles}`}
      whileHover={{ scale: 1.035, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
    >
      {children}
      <span aria-hidden>→</span>
    </motion.a>
  );
}
