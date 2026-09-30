# Plantilla de Home — Elementor

`home-elementor-template.json` es una plantilla importable de Elementor con toda la Home montada: usa los widgets de `nexia-elementor-widgets` (Hero Radar, Reveal Heading, Method Steps) combinados con los widgets nativos de Elementor (`html`, `accordion`) para el resto del copy real de la marca.

El logo se referencia desde `/wp-content/plugins/nexia-elementor-widgets/assets/images/nexia-logo-color.png`. Si vuestro plugin queda instalado con otro nombre de carpeta, hay que corregir esa ruta en el widget del logo (pestaña *Contenido* del Hero Radar) tras importar.

**Todos los botones y CTAs abren `https://app.somosnexia.com/demo`** (agenda de demo/diagnóstico para leads nuevos), excepto el bloque de newsletter, que es una captura de email (no un enlace de agenda) y queda marcado como pendiente de conectar a vuestro proveedor (Mailerlite/ActiveCampaign).

## Cómo importarla

1. Instalad y activad primero el plugin `nexia-elementor-widgets` (ver `../README.md`) — la plantilla depende de sus 3 widgets.
2. En wp-admin: **Plantillas → Todas las plantillas → Importar plantillas** → sube `home-elementor-template.json`.
3. Abre la plantilla importada con Elementor y usa **Insertar plantilla** en la página donde quieras usarla (o duplica vuestra Home actual como borrador y pega ahí el contenido).
4. El header/footer de vuestro sitio no están incluidos — siguen siendo los que ya tenéis en el Theme Builder de Elementor.

## Alternativa: hero como bloque HTML suelto

Si al importar la plantilla completa los márgenes/paddings salen mal (choques con el tema o
con el sistema de columnas de Elementor), `hero-standalone.html` trae el mismo hero (radar,
red de nodos, olas, wordmark; sin logo ni menú) como un único bloque HTML autónomo, con su
propio `<style>` y clases con prefijo `nx-standalone-` para no chocar con nada. Instrucciones
de uso dentro del propio archivo (cabecera en comentario). Pégalo en un widget nativo **HTML**
de Elementor, dentro de una sección a ancho completo con padding 0.

## Sección "Antes de delegar" con motion

`delegable-steps.html` es otro bloque HTML autónomo (mismo patrón que el hero): el relato de
la sección "Antes de delegar" aparece línea a línea al hacer scroll, y la lista "Primero:
documentamos, simplificamos..." se anima sola en bucle como un paso a paso automático (cada
punto se enciende, se marca como hecho y pasa al siguiente). Instrucciones de uso dentro del
propio archivo. Pégalo en un widget **HTML** de Elementor sustituyendo el texto plano de esa
sección — no necesita una sección a ancho completo, trae su propio max-width interno.

## Regenerar la plantilla

El JSON se genera con `generate-template.py` a partir del copy oficial (mismo contenido que `prototype-nextjs/src/lib/content.ts`). Si cambia algún texto:

```bash
python3 generate-template.py
```

Vuelve a generar `home-elementor-template.json` en esta misma carpeta.
