import { footer, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-background-alt py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg font-semibold">
            Somos<span className="text-accent">Nexia</span>
          </p>
          <p className="mt-3 text-sm text-muted">{footer.tagline}</p>
          <p className="mt-1 text-sm text-signal">{footer.slogan}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted">
              Servicios
            </p>
            <ul className="mt-4 space-y-2">
              {footer.services.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-sm text-foreground/80 hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted">
              Navegación
            </p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-foreground/80 hover:text-accent">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-muted">
              Contacto
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:info@somosnexia.com" className="text-sm text-foreground/80 hover:text-accent">
                  info@somosnexia.com
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-sm text-foreground/80 hover:text-accent">
                  Quiero liberar mi operativa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Somos Nexia. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
