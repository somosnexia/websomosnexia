# Somos Nexia — Web

Rediseño de somosnexia.com: landing de Home con dirección visual 3D/motion (Next.js, React Three Fiber, Framer Motion) sobre el territorio de marca "Liberación Operativa" / Submarino Nexia.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://github.com/pmndrs/drei) — escena 3D del hero (núcleo tipo radar/sónar + campo de partículas)
- [Framer Motion](https://www.framer.com/motion/) — animaciones de aparición en scroll
- [Lenis](https://github.com/darkroomengineering/lenis) — scroll suave

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

- `src/lib/content.ts` — todo el copy de la Home (extraído del documento oficial de landings de la marca).
- `src/components/three/HeroScene.tsx` — escena 3D del hero (client-only, importada con `next/dynamic`).
- `src/components/sections/*` — cada bloque de la landing, en el orden del copy original.
- `src/app/globals.css` — tokens de diseño (paleta oceánica oscura, tipografías).

## Alcance actual

Esta primera versión cubre la **Home** completa. Las landings de Servicios, Delegación Técnica, Llave en Mano, Submarino NexIA™ y Sobre Nosotras quedan pendientes para una siguiente fase (el copy ya está localizado y listo para reutilizar).
