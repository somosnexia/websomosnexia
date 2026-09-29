# Plantilla de Home — Elementor

`home-elementor-template.json` es una plantilla importable de Elementor con toda la Home montada: usa los widgets de `nexia-elementor-widgets` (Hero Radar, Reveal Heading, Method Steps) combinados con los widgets nativos de Elementor (`html`, `accordion`) para el resto del copy real de la marca.

El logo se referencia desde `/wp-content/plugins/nexia-elementor-widgets/assets/images/nexia-logo-color.png`. Si vuestro plugin queda instalado con otro nombre de carpeta, hay que corregir esa ruta en el widget del logo (pestaña *Contenido* del Hero Radar) tras importar.

**Todos los botones y CTAs abren `https://app.somosnexia.com/demo`** (agenda de demo/diagnóstico para leads nuevos), excepto el bloque de newsletter, que es una captura de email (no un enlace de agenda) y queda marcado como pendiente de conectar a vuestro proveedor (Mailerlite/ActiveCampaign).

## Cómo importarla

1. Instalad y activad primero el plugin `nexia-elementor-widgets` (ver `../README.md`) — la plantilla depende de sus 3 widgets.
2. En wp-admin: **Plantillas → Todas las plantillas → Importar plantillas** → sube `home-elementor-template.json`.
3. Abre la plantilla importada con Elementor y usa **Insertar plantilla** en la página donde quieras usarla (o duplica vuestra Home actual como borrador y pega ahí el contenido).
4. El header/footer de vuestro sitio no están incluidos — siguen siendo los que ya tenéis en el Theme Builder de Elementor.

## Regenerar la plantilla

El JSON se genera con `generate-template.py` a partir del copy oficial (mismo contenido que `prototype-nextjs/src/lib/content.ts`). Si cambia algún texto:

```bash
python3 generate-template.py
```

Vuelve a generar `home-elementor-template.json` en esta misma carpeta.
