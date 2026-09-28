"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionShell from "../SectionShell";
import Reveal from "../Reveal";
import { faqs } from "@/lib/content";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionShell id="faq">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-balance text-center font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Si tienes dudas sobre Liberación Operativa, aquí te las respondemos
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-surface-border border-y border-surface-border">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-medium">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-2xl text-accent"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-muted">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
