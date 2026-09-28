# websomosnexia

Rediseño de somosnexia.com con dirección visual 3D/motion sobre el territorio de marca "Liberación Operativa" / Submarino Nexia.

La web sigue viviendo en **WordPress + Elementor**, así que el entregable real es un plugin. Este repo tiene dos carpetas:

## `wordpress-plugin/` — el entregable

Un plugin de WordPress (`nexia-elementor-widgets`) que añade a Elementor tres widgets con la nueva dirección visual (fondo oceánico oscuro, escena 3D tipo radar/sónar con Three.js, animaciones de aparición en scroll). Todo el copy se sigue editando desde el editor de Elementor, sin tocar código. Instrucciones de instalación en [`wordpress-plugin/README.md`](wordpress-plugin/README.md).

## `prototype-nextjs/` — prototipo de diseño

La primera versión de este rediseño se construyó como app Next.js independiente, antes de saber que la web debía quedarse en WordPress/Elementor. Se conserva como referencia visual completa de la Home (mismo copy, mismos tokens de diseño, misma escena 3D) pero **no es lo que se despliega en producción**. Ver [`prototype-nextjs/README.md`](prototype-nextjs/README.md).
