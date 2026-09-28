"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { nav } from "@/lib/content";
import CtaButton from "./CtaButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-surface-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          Somos<span className="text-accent">Nexia</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <a
            href="#contacto"
            className="rounded-full border border-surface-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Quiero liberar mi operativa
          </a>
        </div>
        <div className="md:hidden">
          <CtaButton href="#contacto">Empezar</CtaButton>
        </div>
      </nav>
    </motion.header>
  );
}
