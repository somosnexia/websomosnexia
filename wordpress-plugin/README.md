# Nexia — Widgets 3D & Motion para Elementor

Este plugin añade a **Elementor** (el constructor que ya usa somosnexia.com) tres widgets nuevos con la dirección visual del rediseño: fondo oceánico oscuro, una escena 3D tipo radar/sónar (Three.js) y animaciones de aparición en scroll. Todo el texto se sigue editando desde el propio editor de Elementor — no hace falta tocar código para cambiar copy, ni mover la web de WordPress.

## Instalación

1. Comprime la carpeta `nexia-elementor-widgets/` en un `.zip` (el zip debe contener esa carpeta en la raíz, no sus archivos sueltos).
2. En wp-admin: **Plugins → Añadir nuevo → Subir plugin** → selecciona el `.zip` → **Instalar ahora** → **Activar**.
3. Asegúrate de que **Elementor** (gratuito o Pro) está activo — el plugin no hace nada sin él.
4. Edita cualquier página con Elementor. En el panel de widgets, busca la categoría **"Nexia — 3D & Motion"**. Ahí aparecen:
   - **Nexia — Hero 3D**: sección de portada con la escena 3D de fondo. Controles de contenido (antetítulo, título, texto, botón) en la pestaña *Contenido*; colores de la escena 3D en la pestaña *Estilo*.
   - **Nexia — Reveal Heading**: bloque de título/texto que aparece con motion al hacer scroll. Úsalo para dar vida a cualquier sección existente.
   - **Nexia — Method Steps**: tarjetas numeradas (tipo "Detectamos / Ordenamos / Implementamos") con hover y aparición en cascada. El número de tarjetas es libre (repeater): puedes añadir, quitar o reordenar desde el propio editor.

## Actualizar la escena 3D (solo si tocáis el código)

La escena 3D vive compilada en `nexia-elementor-widgets/assets/js/nexia-hero-scene.bundle.js`. Si algún día queréis cambiar su comportamiento (partículas, geometría, velocidad):

```bash
cd wordpress-plugin/build-tools
npm install
npm run build
```

Esto recompila el bundle a partir de `build-tools/src/hero-scene.js` usando Three.js + esbuild, sin dependencias externas en el servidor de WordPress (el bundle final es un único archivo JS autocontenido).

## Notas

- El plugin respeta `prefers-reduced-motion`: si el visitante tiene desactivadas las animaciones en su sistema, la escena 3D deja de rotar/pulsar y las animaciones de scroll se muestran directamente sin transición.
- Los estilos van con el prefijo `.nexia-widgets-scope` para no chocar con el CSS del tema o de Elementor.
- Compatible con cualquier tema de WordPress que ya use Elementor; no sustituye el tema ni ninguna otra página.
