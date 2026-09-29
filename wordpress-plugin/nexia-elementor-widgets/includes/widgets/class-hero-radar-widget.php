<?php

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Nexia_Hero_Radar_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'nexia_hero_radar';
    }

    public function get_title()
    {
        return __('Nexia — Hero Radar', 'nexia-elementor-widgets');
    }

    public function get_icon()
    {
        return 'eicon-slider-3d';
    }

    public function get_categories()
    {
        return ['nexia'];
    }

    public function get_style_depends()
    {
        return ['nexia-widgets'];
    }

    protected function register_controls()
    {
        $this->start_controls_section('content_section', [
            'label' => __('Contenido', 'nexia-elementor-widgets'),
            'tab' => Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control('kicker', [
            'label' => __('Antetítulo', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Liberación operativa para negocios digitales',
        ]);

        $this->add_control('heading', [
            'label' => __('Título (H1)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 3,
            'default' => 'Tu negocio no necesita más horas tuyas. Necesita dejar de depender de ti.',
        ]);

        $this->add_control('body', [
            'label' => __('Texto', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 4,
            'default' => 'Somos Nexia, el equipo técnico de Liberación Operativa para negocios digitales. Ordenamos procesos, implementamos sistemas y utilizamos automatización e Inteligencia Artificial cuando ayudan a reducir todo ese trabajo que sigue dependiendo innecesariamente de ti o de tu equipo, para que tengas menos tareas y más tiempo para crecer.',
        ]);

        $this->add_control('lines', [
            'label' => __('Líneas destacadas (opcional, una por línea)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 3,
            'default' => "Tú marcas el rumbo.\nNosotras hacemos que la sala de máquinas funcione sin que tengas que bajar a tocar cada palanca.",
        ]);

        $this->add_control('cta_text', [
            'label' => __('Texto del botón', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Quiero liberar mi operativa',
        ]);

        $this->add_control('cta_link', [
            'label' => __('Enlace del botón', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::URL,
            'default' => ['url' => '#contacto'],
            'show_external' => false,
        ]);

        $this->add_control('note', [
            'label' => __('Nota bajo el botón (opcional)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Empieza con un diagnóstico de tu negocio con nuestro RADAR NEXIA.',
        ]);

        $this->end_controls_section();

        $this->start_controls_section('style_section', [
            'label' => __('Colores del fondo', 'nexia-elementor-widgets'),
            'tab' => Controls_Manager::TAB_STYLE,
        ]);

        $this->add_control('gradient_1', [
            'label' => __('Degradado — centro', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#1f45e0',
        ]);

        $this->add_control('gradient_2', [
            'label' => __('Degradado — medio', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#0f2fae',
        ]);

        $this->add_control('gradient_3', [
            'label' => __('Degradado — borde', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#071b6e',
        ]);

        $this->add_control('min_height', [
            'label' => __('Altura mínima (vh)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::SLIDER,
            'range' => ['px' => ['min' => 40, 'max' => 100]],
            'default' => ['size' => 90, 'unit' => 'px'],
            'size_units' => ['vh'],
            'selectors' => [
                '{{WRAPPER}} .nexia-hero-radar' => 'min-height: {{SIZE}}{{UNIT}};',
            ],
        ]);

        $this->end_controls_section();
    }

    // Red de nodos: 9 puntos (x%, y%) unidos por una polilínea, con pulso escalonado.
    private function node_points()
    {
        return [
            [8, 30], [18, 62], [27, 24], [36, 70], [64, 22],
            [73, 64], [83, 28], [92, 58], [52, 14],
        ];
    }

    // Blips del radar: posición (x%, y%) relativa al círculo del radar y retardo de animación.
    private function radar_blips()
    {
        return [
            [62, 28, 0], [35, 40, 1.7], [70, 62, 3.4], [44, 72, 5.2],
        ];
    }

    protected function render()
    {
        $s = $this->get_settings_for_display();
        $cta_url = !empty($s['cta_link']['url']) ? $s['cta_link']['url'] : '#contacto';
        $target = !empty($s['cta_link']['is_external']) ? ' target="_blank"' : '';
        $nofollow = !empty($s['cta_link']['nofollow']) ? ' rel="nofollow"' : '';

        $points = $this->node_points();
        $svg_points = implode(' ', array_map(function ($p) {
            return round($p[0] * 14.4, 1) . ',' . round($p[1] * 6, 1);
        }, $points));
        ?>
        <div
            class="nexia-widgets-scope nexia-hero-radar"
            style="--nexia-hero-g1:<?php echo esc_attr($s['gradient_1']); ?>; --nexia-hero-g2:<?php echo esc_attr($s['gradient_2']); ?>; --nexia-hero-g3:<?php echo esc_attr($s['gradient_3']); ?>;"
        >
            <div class="nexia-hero-radar__bg">
                <svg class="nexia-hero-radar__nodes" viewBox="0 0 1440 600" preserveAspectRatio="none">
                    <polyline points="<?php echo esc_attr($svg_points); ?>" fill="none" stroke="#fff" stroke-width="1"></polyline>
                </svg>
                <div class="nexia-hero-radar__pulses">
                    <?php foreach ($points as $i => $p): ?>
                        <span
                            class="nexia-hero-radar__pulse"
                            style="left:<?php echo esc_attr($p[0]); ?>%; top:<?php echo esc_attr($p[1]); ?>%; animation-delay:<?php echo esc_attr(round($i * 0.45, 2)); ?>s;"
                        ></span>
                    <?php endforeach; ?>
                </div>
                <div class="nexia-hero-radar__radar" aria-hidden="true">
                    <div class="nexia-hero-radar__ring nexia-hero-radar__ring--outer"></div>
                    <div class="nexia-hero-radar__ring" style="inset:12.5%;"></div>
                    <div class="nexia-hero-radar__ring" style="inset:25%;"></div>
                    <div class="nexia-hero-radar__ring" style="inset:37.5%;"></div>
                    <div class="nexia-hero-radar__axis nexia-hero-radar__axis--v"></div>
                    <div class="nexia-hero-radar__axis nexia-hero-radar__axis--h"></div>
                    <div class="nexia-hero-radar__sweep"></div>
                    <?php foreach ($this->radar_blips() as $b): ?>
                        <span
                            class="nexia-hero-radar__blip"
                            style="left:<?php echo esc_attr($b[0]); ?>%; top:<?php echo esc_attr($b[1]); ?>%; animation-delay:<?php echo esc_attr($b[2]); ?>s;"
                        ></span>
                    <?php endforeach; ?>
                </div>
                <svg class="nexia-hero-radar__wave nexia-hero-radar__wave--1" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="M0 60 C240 10 480 10 720 60 C960 110 1200 110 1440 60 C1680 10 1920 10 2160 60 C2400 110 2640 110 2880 60 L2880 120 L0 120 Z" fill="rgba(255,255,255,.14)"></path></svg>
                <svg class="nexia-hero-radar__wave nexia-hero-radar__wave--2" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="M0 60 C240 10 480 10 720 60 C960 110 1200 110 1440 60 C1680 10 1920 10 2160 60 C2400 110 2640 110 2880 60 L2880 120 L0 120 Z" fill="rgba(255,255,255,.28)"></path></svg>
                <svg class="nexia-hero-radar__wave nexia-hero-radar__wave--3" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="M0 60 C240 10 480 10 720 60 C960 110 1200 110 1440 60 C1680 10 1920 10 2160 60 C2400 110 2640 110 2880 60 L2880 120 L0 120 Z" fill="var(--nexia-bg)"></path></svg>
            </div>
            <div class="nexia-hero-3d__content">
                <?php if (!empty($s['kicker'])) : ?>
                    <p class="nexia-hero-3d__kicker"><?php echo esc_html($s['kicker']); ?></p>
                <?php endif; ?>
                <h1 class="nexia-hero-3d__heading"><?php echo esc_html($s['heading']); ?></h1>
                <?php if (!empty($s['body'])) : ?>
                    <p class="nexia-hero-3d__body"><?php echo esc_html($s['body']); ?></p>
                <?php endif; ?>
                <?php if (!empty($s['lines'])) : ?>
                    <div class="nexia-hero-radar__lines">
                        <?php foreach (preg_split('/\r\n|\r|\n/', trim($s['lines'])) as $line) : ?>
                            <p><?php echo esc_html($line); ?></p>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
                <?php if (!empty($s['cta_text'])) : ?>
                    <a
                        class="nexia-hero-3d__cta"
                        href="<?php echo esc_url($cta_url); ?>"
                        <?php echo $target . $nofollow; ?>
                    >
                        <?php echo esc_html($s['cta_text']); ?>
                        <span aria-hidden="true">→</span>
                    </a>
                <?php endif; ?>
                <?php if (!empty($s['note'])) : ?>
                    <p class="nexia-hero-radar__note"><?php echo esc_html($s['note']); ?></p>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
