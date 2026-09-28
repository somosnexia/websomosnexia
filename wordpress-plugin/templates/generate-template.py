#!/usr/bin/env python3
"""
Genera home-elementor-template.json: una plantilla importable de Elementor
para la Home de Somos Nexia, usando los widgets del plugin
nexia-elementor-widgets (Hero 3D, Reveal Heading, Method Steps) combinados
con el widget nativo "html" de Elementor para el resto del copy.

Todo el texto viene del documento oficial de landings de la marca
(el mismo usado en prototype-nextjs/src/lib/content.ts). Todos los
botones/CTA apuntan al enlace de reserva de demo/diagnóstico para leads
nuevos.

Uso: python3 generate-template.py
Salida: ./home-elementor-template.json
"""

import json
import uuid

DEMO_URL = "https://app.somosnexia.com/demo"

BG = "#05070d"
BG_ALT = "#090d1c"
SURFACE = "#0c1226"
BORDER = "#1e2a4d"
FG = "#f2f5fb"
MUTED = "#96a3c4"
ACCENT = "#5b73ff"
SIGNAL = "#2e4be2"

FONT_DISPLAY = "'Poppins', ui-sans-serif, system-ui, sans-serif"
FONT_BODY = "'Poppins', ui-sans-serif, system-ui, sans-serif"
FONT_MONO = "'Poppins', ui-sans-serif, system-ui, sans-serif"


def eid():
    return uuid.uuid4().hex[:7]


def cta_html(label, url=DEMO_URL, align="left"):
    justify = {"left": "flex-start", "center": "center"}.get(align, "flex-start")
    return f"""
    <div style="display:flex; justify-content:{justify}; margin-top:8px;">
      <a href="{url}" style="display:inline-flex; align-items:center; gap:10px;
        border-radius:4px; padding:15px 28px; font-weight:500; font-size:14px;
        letter-spacing:0.04em; text-transform:uppercase; background:{SIGNAL};
        color:{FG}; text-decoration:none; font-family:{FONT_MONO};">
        {label} <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
    """


def wrap(inner, bg=BG, pad="0 24px 96px"):
    return f"""
    <div style="background:{bg}; padding:{pad}; font-family:{FONT_BODY};
      color:{FG}; max-width:1120px; margin:0 auto;">
      {inner}
    </div>
    """


def p(text, color=MUTED, size="18px", extra=""):
    return f'<p style="color:{color}; font-size:{size}; line-height:1.65; max-width:720px; {extra}">{text}</p>'


def ul(items, color=FG):
    lis = "".join(
        f'<li style="margin-bottom:10px;">{i}</li>' for i in items
    )
    return f'<ul style="color:{color}; font-size:17px; line-height:1.6; padding-left:22px; max-width:720px;">{lis}</ul>'


def html_widget(html):
    return {
        "id": eid(),
        "elType": "widget",
        "widgetType": "html",
        "settings": {"html": html},
        "elements": [],
    }


def reveal_heading_widget(kicker, title, text="", align="left"):
    return {
        "id": eid(),
        "elType": "widget",
        "widgetType": "nexia_reveal_heading",
        "settings": {
            "kicker": kicker,
            "title": title,
            "text": text,
            "align": align,
        },
        "elements": [],
    }


def hero_3d_widget():
    return {
        "id": eid(),
        "elType": "widget",
        "widgetType": "nexia_hero_3d",
        "settings": {
            "kicker": "Liberación operativa para negocios digitales",
            "heading": "Tu negocio no necesita más horas tuyas. Necesita dejar de depender de ti.",
            "body": (
                "Somos Nexia, el equipo técnico de Liberación Operativa para negocios "
                "digitales. Ordenamos procesos, implementamos sistemas y utilizamos "
                "automatización e Inteligencia Artificial cuando ayudan a reducir "
                "todo ese trabajo que sigue dependiendo innecesariamente de ti o de "
                "tu equipo, para que tengas menos tareas y más tiempo para crecer."
            ),
            "cta_text": "Quiero liberar mi operativa",
            "cta_link": {"url": DEMO_URL, "is_external": "", "nofollow": ""},
            "color_accent": ACCENT,
            "color_signal": SIGNAL,
            "color_core": "#c8d2ff",
            "min_height": {"unit": "vh", "size": 92, "sizes": []},
        },
        "elements": [],
    }


def engine_room_widget():
    return {
        "id": eid(),
        "elType": "widget",
        "widgetType": "nexia_engine_room",
        "settings": {
            "kicker": "Por dentro",
            "title": "Así es la sala de máquinas de tu negocio cuando alguien la ordena.",
            "text": (
                "Radares que vigilan lo que importa, paneles que dejan de depender de tu "
                "memoria y sistemas que siguen funcionando aunque tú no estés mirando. "
                "Eso es lo que implementamos: la infraestructura invisible que sostiene "
                "tu operativa."
            ),
            "cta_text": "",
            "cta_link": {"url": "", "is_external": "", "nofollow": ""},
            "visual_position": "right",
            "color_accent": ACCENT,
            "color_signal": SIGNAL,
            "color_core": "#c8d2ff",
        },
        "elements": [],
    }


def method_steps_widget():
    steps = [
        {
            "_id": eid(),
            "number": "01",
            "title": "Detectamos",
            "body": "Localizamos tareas duplicadas, procesos manuales y puntos donde tu negocio sigue necesitando tu intervención.",
            "sub": "Para descubrir dónde sigues siendo imprescindible sin necesitar serlo.",
        },
        {
            "_id": eid(),
            "number": "02",
            "title": "Ordenamos",
            "body": "Ponemos estructura en procesos, herramientas, responsabilidades, documentación y flujos de trabajo.",
            "sub": "Para que tu negocio deje de vivir exclusivamente dentro de tu cabeza.",
        },
        {
            "_id": eid(),
            "number": "03",
            "title": "Implementamos",
            "body": "Creamos automatizaciones y sistemas operativos que funcionan en el día a día. Incorporamos Inteligencia Artificial cuando aporta valor.",
            "sub": "Olvidarte de estar pendiente 24/7, eso es Liberación Operativa.",
        },
    ]
    return {
        "id": eid(),
        "elType": "widget",
        "widgetType": "nexia_method_steps",
        "settings": {"steps": steps},
        "elements": [],
    }


def accordion_widget():
    faqs = [
        (
            "¿Qué significa Liberación Operativa?",
            "Es reducir la dependencia diaria que tiene un negocio de su dueña mediante procesos claros, sistemas, documentación, automatización y una mejor distribución de responsabilidades. El objetivo no es que desaparezcas de tu negocio. Es que el negocio no necesite una intervención tuya para cada tarea.",
        ),
        (
            "¿Somos Nexia trabaja como un equipo de IA?",
            "Sí, pero la Inteligencia Artificial es una de nuestras capacidades, no toda nuestra identidad. Somos el equipo técnico de Liberación Operativa. Nuestra línea especializada en automatización avanzada y agentes de IA es Submarino NexIA™.",
        ),
        (
            "¿Qué procesos de un negocio digital se pueden automatizar?",
            "Depende de cada operativa. Solemos trabajar sobre tareas repetitivas relacionadas con seguimiento, CRM, formularios, reservas, emails, atención, clasificación de leads, gestión de información, actualización de datos e integraciones entre herramientas. Primero revisamos el proceso. Después decidimos qué merece ser automatizado.",
        ),
        (
            "¿Tengo que cambiar las herramientas que ya utilizo?",
            "No necesariamente. Antes de añadir tecnología revisamos qué tienes, qué funciona, qué sobra y qué debería estar mejor conectado. No queremos una sala de máquinas más grande. Queremos una que funcione mejor.",
        ),
        (
            "¿Somos Nexia hace estrategia o implementación?",
            "Nuestro foco está en la implementación y la operativa. Tú marcas la dirección estratégica de tu negocio. Nosotras convertimos esa dirección en procesos, sistemas, automatizaciones e implementaciones que funcionen en el día a día.",
        ),
        (
            "¿Qué servicios ofrece Somos Nexia?",
            "Trabajamos mediante tres líneas: Delegación Técnica Puntual, para ejecutar necesidades concretas. Llave en Mano, para construir y conectar infraestructura digital. Submarino NexIA™, para reducir intervención manual mediante automatización e Inteligencia Artificial.",
        ),
    ]
    tabs = [
        {"_id": eid(), "tab_title": q, "tab_content": a}
        for q, a in faqs
    ]
    return {
        "id": eid(),
        "elType": "widget",
        "widgetType": "accordion",
        "settings": {"tabs": tabs},
        "elements": [],
    }


def section(widgets, bg=None):
    column = {
        "id": eid(),
        "elType": "column",
        "settings": {"_column_size": 100},
        "elements": widgets,
    }
    settings = {}
    if bg:
        settings["background_background"] = "classic"
        settings["background_color"] = bg
    return {
        "id": eid(),
        "elType": "section",
        "settings": settings,
        "elements": [column],
    }


def two_col_section(left_widgets, right_widgets, bg=None):
    col_l = {
        "id": eid(),
        "elType": "column",
        "settings": {"_column_size": 50},
        "elements": left_widgets,
    }
    col_r = {
        "id": eid(),
        "elType": "column",
        "settings": {"_column_size": 50},
        "elements": right_widgets,
    }
    settings = {}
    if bg:
        settings["background_background"] = "classic"
        settings["background_color"] = bg
    return {
        "id": eid(),
        "elType": "section",
        "settings": settings,
        "elements": [col_l, col_r],
    }


sections = []

# 1. Hero
sections.append(section([hero_3d_widget()]))

# 2. Problem
problem_html = wrap(
    "".join(
        [
            p("Facturas.<br>Tienes clientes.<br>Desde fuera, todo parece ir bien.", color=FG, size="19px"),
            p("Pero cada decisión, cada incidencia, cada tarea técnica y cada pregunta de tu equipo termina en el mismo sitio: en ti."),
            f'<div style="border-left:2px solid {SIGNAL}; padding-left:20px; margin:24px 0;">'
            + "".join(
                f'<p style="font-family:{FONT_DISPLAY}; font-size:19px; font-weight:600; color:{FG}; margin:0 0 6px;">{t}</p>'
                for t in ["Si tú no respondes, se retrasa.", "Si tú no revisas, no sale.", "Si tú no recuerdas, se olvida."]
            )
            + "</div>",
            p("Y cuando aumentan las ventas también aumenta tu carga de trabajo."),
            p("No tiene que ver con tu capacidad. El sistema con el que llegaste hasta aquí se ha quedado pequeño."),
            p(
                "Si tu negocio ha crecido, ahora necesita una estructura que también crezca con él. "
                "Porque estar en todo puede haberte traído hasta este punto. Pero no debería ser lo "
                "que te obligue a quedarte en él."
            ),
        ]
    )
)
sections.append(
    section(
        [
            reveal_heading_widget(
                "El diagnóstico",
                "Tu negocio funciona. El problema es que tú sigues siendo el sistema.",
            ),
            html_widget(problem_html),
        ],
        bg=BG,
    )
)

# 3. Scale
scale_html = wrap(
    "".join(
        [
            p("Escala cuando puede sostener más clientes, más ventas y más movimiento sin necesitar de tu tiempo y de tu supervisión constante.", color=FG, size="19px"),
            p(
                "Cuando dejas de depender de la operativa diaria · Cuando puedes organizarte mejor · "
                "Trabajar más rápido · Contratar a alguien.",
                color=ACCENT,
                extra=f"font-family:{FONT_DISPLAY};",
            ),
            p(
                "Pero si los procesos siguen viviendo en tu cabeza, tu equipo necesita tu aprobación "
                "para avanzar y cada tarea depende de una acción tuya... sigues siendo imprescindible "
                "para la operativa."
            ),
            f'<p style="font-family:{FONT_DISPLAY}; font-size:26px; font-weight:600; color:{ACCENT}; margin:20px 0;">Y ser imprescindible está guay hasta que quieres apagar el portátil.</p>',
            p(
                "Entonces la cosa se complica y empiezas a sentir que el negocio te ahoga. "
                "Necesitas que el negocio avance sin depender de ti para toooodo."
            ),
        ]
    ),
    bg=SURFACE,
)
sections.append(
    section(
        [
            reveal_heading_widget("La creencia", "Un negocio no escala porque dependa de su dueña", align="center"),
            html_widget(scale_html),
        ],
        bg=SURFACE,
    )
)

# 4. Method
method_intro_html = wrap(
    p(
        "Esto puede parecer complejo, pero lo que hacemos es sumergirnos y descubrir qué sobra en tu "
        "sistema, qué falla y qué sigue dependiendo innecesariamente de ti. Para eso trabajamos con "
        "nuestro Método NEXIA™.",
        color=FG,
        size="19px",
        extra="max-width:760px; margin:0 auto;",
    ),
    pad="0 24px 32px",
)
method_cta_html = wrap(
    cta_html("Quiero saber qué está frenando mi negocio", align="center"), pad="32px 24px 96px"
)
sections.append(
    section(
        [
            reveal_heading_widget("Método NEXIA™", "Liberamos la operativa de tu negocio digital", align="center"),
            html_widget(method_intro_html),
            method_steps_widget(),
            html_widget(method_cta_html),
        ],
        bg=BG,
    )
)

# 4b. Sala de máquinas (visual)
sections.append(section([engine_room_widget()], bg=BG_ALT))

# 5. Delegable
delegable_html = wrap(
    "".join(
        [
            p("Quizá ya lo intentaste. Contrataste una asistente. Un freelance. Una consultora."),
            p("Explicaste una tarea. La entregaron. Y terminaste repasándola, corrigiéndola o directamente haciéndola tú otra vez."),
            f'<p style="font-family:{FONT_DISPLAY}; font-style:italic; font-size:22px; color:{ACCENT}; margin:24px 0;">«Delegar me da más trabajo que hacerlo yo».</p>',
            p(
                "Pero hay otro diagnóstico posible. Tal vez intentaste delegar un proceso que nunca "
                "estuvo realmente construido. Porque si el criterio está en tu cabeza, la información "
                "está repartida entre WhatsApp y audios y nadie sabe exactamente qué significa «bien "
                "hecho»... no estás delegando. Estás cruzando los dedos."
            ),
            ul(
                [
                    "Documentamos",
                    "Simplificamos",
                    "Definimos responsabilidades",
                    "Creamos criterios",
                    "Automatizamos lo repetitivo",
                    "Ponemos la información donde debe estar",
                ]
            ),
            f'<p style="font-family:{FONT_DISPLAY}; font-size:24px; font-weight:600; color:{FG}; margin-top:20px;">Entonces delegar deja de ser un acto de fe. Se convierte en un sistema.</p>',
        ]
    )
)
sections.append(
    section(
        [
            reveal_heading_widget("Antes de delegar", "Antes de delegar, hacemos que tu negocio sea delegable"),
            html_widget(delegable_html),
        ],
        bg=SURFACE,
    )
)

# 6. How we help
how_html = wrap(
    "".join(
        [
            p(
                "Liberar la operativa significa distinguir entre dónde tu presencia aporta valor y dónde "
                "se ha convertido en costumbre. Lo que no significa desaparecer de tu empresa. Queremos "
                "que estés donde realmente haces falta.",
                extra="max-width:760px; margin:0 auto 16px;",
            ),
            p(
                "Según lo que esté frenando tu negocio, podemos entrar a ejecutar, construir o automatizar. "
                "Desde una implementación técnica puntual hasta una infraestructura completa o procesos "
                "con automatización e Inteligencia Artificial.",
                extra="max-width:760px; margin:0 auto 32px;",
            ),
            cta_html("Ver servicios", align="center"),
            f'<div style="text-align:center; margin-top:32px; font-family:{FONT_DISPLAY}; font-size:22px; font-weight:600; color:{FG};">'
            "Tu negocio no tiene que funcionar sin ti.<br>Tiene que poder funcionar sin necesitarte para todo."
            "</div>",
        ]
    ),
    pad="0 24px 96px",
)
sections.append(
    section(
        [
            reveal_heading_widget("", "¿Cómo podemos ayudarte a delegar?", align="center"),
            html_widget(how_html),
        ],
        bg=BG,
    )
)

# 7. Fit
fit_bullets = [
    "ya tienes clientes y facturación",
    "rondas los 7.000 € mensuales o más y cada aumento de ventas supone más trabajo para ti",
    "tienes equipo, pero demasiadas decisiones siguen pasando por tus manos",
    "estás utilizando varias herramientas que no terminan de trabajar juntas",
    "sigues haciendo manualmente tareas que se repiten cada semana",
    "has intentado delegar y acabas supervisándolo todo",
    "el día se te va manteniendo el negocio y nunca llegas a los proyectos que podrían hacerlo crecer",
    "o te da miedo aumentar las ventas porque sabes lo que significaría para tu operativa actual",
]
fit_html = wrap(
    "".join(
        [
            p(
                "Trabajamos con emprendedoras y empresarias digitales que ya tienen un negocio "
                "funcionando, pero cuya estructura operativa se ha quedado atrás. Especialmente si:",
                color=FG,
            ),
            ul(fit_bullets),
            p(
                "Si has construido un negocio que funciona pero empiezas a sentir que te está "
                "tragando, tenemos una conversación pendiente.",
                color=FG,
                extra="margin-top:20px;",
            ),
            cta_html("Quiero contaros mi caso"),
        ]
    )
)
sections.append(
    section(
        [
            reveal_heading_widget("¿Es para ti?", "¿Somos Nexia es para tu negocio?"),
            html_widget(fit_html),
        ],
        bg=SURFACE,
    )
)

# 8. Not for everyone
notfor_html = wrap(
    "".join(
        [
            ul(
                [
                    "No somos una formación para aprender a emprender.",
                    "No instalamos herramientas simplemente porque estén de moda.",
                    "No llenamos tu negocio de automatizaciones que después nadie sabe mantener.",
                    "Y no creemos que contratar más personas sea automáticamente la solución.",
                ]
            ),
            p(
                "Trabajamos sobre un negocio que ya existe. Miramos qué está pasando bajo la "
                "superficie. Y si no necesitas a Nexia, mejor saberlo antes de que saques la tarjeta.",
                extra="margin-top:16px;",
            ),
            f'<p style="font-family:{FONT_DISPLAY}; font-size:26px; font-weight:600; color:{ACCENT}; text-align:center; margin-top:20px;">Quitamos dependencia.</p>',
        ]
    ),
    pad="0 24px 96px",
)
sections.append(
    section(
        [
            reveal_heading_widget("", "Esto no es para todo el mundo", align="center"),
            html_widget(notfor_html),
        ],
        bg=BG,
    )
)

# 9. About (two columns)
about_left = wrap(
    "".join(
        [
            p(
                "Somos Pilar y Laura. Creamos Somos Nexia porque vimos crecer demasiados negocios: "
                "en clientes, herramientas, equipo y facturación, mientras sus dueñas tenían cada vez "
                "menos tiempo para dirigir."
            ),
            p(
                "Nosotras entramos justo ahí: en la operativa que no se ve, ordenando procesos, "
                "sistemas, automatizaciones, documentación, integraciones e Inteligencia Artificial "
                "cuando aporta valor, para que el negocio avance sin depender de ti para todo."
            ),
            f'<p style="font-family:{FONT_DISPLAY}; font-size:20px; font-weight:600; color:{FG}; margin-top:12px;">Tú marcas el rumbo.<br>Nosotras ejecutamos.</p>',
        ]
    ),
    pad="0 24px",
)
about_right = wrap(
    f"""
    <div style="background:{BG}; border:1px solid {BORDER}; border-radius:24px; padding:32px;">
      <h3 style="font-family:{FONT_DISPLAY}; font-size:24px; font-weight:700; color:{ACCENT}; margin:0 0 16px;">
        Crecer también implica decidir qué huella dejamos
      </h3>
      <p style="color:{MUTED}; font-size:16px; line-height:1.65;">
        El océano forma parte del universo de Somos Nexia, pero no queremos que se quede solo en una
        metáfora. Por eso destinamos parte de nuestro compromiso como empresa a iniciativas vinculadas
        con la regeneración y conservación de los ecosistemas marinos. Porque crecer mejor también
        significa construir negocios más sostenibles y devolver parte de lo que generamos.
      </p>
      <p style="font-family:{FONT_DISPLAY}; font-size:18px; font-weight:600; color:{ACCENT}; margin-top:16px;">
        Crecer sí. Pero no a cualquier precio.
      </p>
    </div>
    """,
    pad="0 24px",
)
sections.append(
    two_col_section(
        [
            reveal_heading_widget("Sala de máquinas", "Somos Nexia: el equipo que entra en la sala de máquinas"),
            html_widget(about_left),
        ],
        [html_widget(about_right)],
        bg=SURFACE,
    )
)

# 10. FAQ
faq_heading_html = wrap(
    f'<h2 style="font-family:{FONT_DISPLAY}; font-size:32px; font-weight:700; color:{FG}; text-align:center; margin:0;">Si tienes dudas sobre Liberación Operativa, aquí te las respondemos</h2>',
    pad="0 24px 40px",
)
sections.append(
    section(
        [
            html_widget(faq_heading_html),
            accordion_widget(),
        ],
        bg=BG,
    )
)

# 11. Final CTA
final_html = wrap(
    f"""
    <div style="background:linear-gradient(to bottom, {SURFACE}, {BG_ALT}); border:1px solid {BORDER};
      border-radius:32px; padding:64px 48px; text-align:center; max-width:760px; margin:0 auto;">
      <h2 style="font-family:{FONT_DISPLAY}; font-size:34px; font-weight:700; color:{FG}; margin:0 0 20px;">
        Haz crecer tu negocio digital con menos dependencia operativa
      </h2>
      <p style="color:{MUTED}; font-size:18px; line-height:1.65; margin:0 0 12px;">
        Ahora toca construir una operativa capaz de sostener ese crecimiento. Sin más horas. Sin más
        supervisión. Sin más interrupciones. Y sin que todo siga dependiendo de ti.
      </p>
      <p style="color:{MUTED}; font-size:18px; line-height:1.65; margin:0 0 24px;">
        Nos sumergimos en tu operativa, detectamos qué está frenando el negocio, ordenamos,
        implementamos y automatizamos cuando tiene sentido.
      </p>
      <p style="font-family:{FONT_DISPLAY}; font-size:20px; font-weight:600; color:{FG}; margin:0 0 32px;">
        Tu empresa necesita tu visión.<br>No debería necesitarte para cada puta tarea.<br>Deja de hacerlo todo sola.
      </p>
      {cta_html("Quiero liberar mi operativa", align="center")}
      <p style="color:{MUTED}; font-size:14px; margin-top:16px;">
        Cuéntanos qué está pasando. Nosotras te diremos cuál es el siguiente paso.
      </p>
    </div>
    """
)
sections.append(section([html_widget(final_html)], bg=BG))

# 12. Newsletter (email capture note — not a call-booking CTA)
newsletter_html = wrap(
    "".join(
        [
            p(
                "Activa el buzón de la comunidad Nexian. Recibirás ideas sólo para jefazas de negocios "
                "digitales sobre sistemas, automatización, IA, delegación, operativa y verdades incómodas "
                "sobre cómo construir un negocio que dependa cada vez menos de ti.",
                extra="max-width:640px; margin:0 auto 24px; text-align:center;",
            ),
            f'<p style="text-align:center; color:{MUTED}; font-size:14px; font-style:italic;">'
            "[Aquí va el formulario de email de vuestro proveedor — Mailerlite/ActiveCampaign. "
            "No es un enlace de agenda, así que no lo he conectado al calendario.]"
            "</p>",
        ]
    ),
    pad="0 24px 96px",
)
sections.append(
    section(
        [
            reveal_heading_widget("Comunidad Nexians", "¿Quieres recibir señales desde la sala de máquinas?", align="center"),
            html_widget(newsletter_html),
        ],
        bg=SURFACE,
    )
)

template = {
    "content": sections,
    "page_settings": {
        "background_background": "classic",
        "background_color": BG,
    },
    "version": "0.4",
    "title": "Home — Somos Nexia (Nexia 3D)",
    "type": "page",
}

with open("home-elementor-template.json", "w", encoding="utf-8") as f:
    json.dump(template, f, ensure_ascii=False, indent=2)

print("Generado home-elementor-template.json con", len(sections), "secciones.")
