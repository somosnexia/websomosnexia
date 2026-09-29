<?php

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Repeater;

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

        $this->add_control('logo', [
            'label' => __('Logo', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::MEDIA,
            'default' => [
                'url' => NEXIA_WIDGETS_URL . 'assets/images/nexia-logo-color.png',
            ],
        ]);

        $repeater = new Repeater();
        $repeater->add_control('label', [
            'label' => __('Texto', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Enlace',
        ]);
        $repeater->add_control('link', [
            'label' => __('Enlace', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::URL,
            'default' => ['url' => '#'],
            'show_external' => false,
        ]);

        $this->add_control('nav_items', [
            'label' => __('Navegación', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::REPEATER,
            'fields' => $repeater->get_controls(),
            'default' => [
                ['label' => 'Inicio', 'link' => ['url' => '#']],
                ['label' => 'Método', 'link' => ['url' => '#metodo']],
                ['label' => 'Equipo', 'link' => ['url' => '#equipo']],
                ['label' => 'Contacto', 'link' => ['url' => '#contacto']],
            ],
            'title_field' => '{{{ label }}}',
        ]);

        $this->add_control('eyebrow', [
            'label' => __('Antetítulo', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Marketing sin humo, ejecución sin rodeos',
        ]);

        $this->add_control('wordmark', [
            'label' => __('Wordmark', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Somos Nexia',
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
            'default' => ['size' => 100, 'unit' => 'px'],
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

        $points = $this->node_points();
        $svg_points = implode(' ', array_map(function ($p) {
            return round($p[0] * 14.4, 1) . ',' . round($p[1] * 6, 1);
        }, $points));

        $words = preg_split('/\s+/', trim($s['wordmark']));
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

            <div class="nexia-hero-radar__topbar">
                <a href="#" class="nexia-hero-radar__logo-link">
                    <img src="<?php echo esc_url($s['logo']['url']); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>" class="nexia-hero-radar__logo">
                </a>
                <nav class="nexia-hero-radar__nav">
                    <?php foreach ($s['nav_items'] as $item):
                        $url = !empty($item['link']['url']) ? $item['link']['url'] : '#';
                        ?>
                        <a href="<?php echo esc_url($url); ?>"><?php echo esc_html($item['label']); ?></a>
                    <?php endforeach; ?>
                </nav>
            </div>

            <div class="nexia-hero-radar__wordmark-block">
                <?php if (!empty($s['eyebrow'])) : ?>
                    <span class="nexia-hero-radar__eyebrow"><?php echo esc_html($s['eyebrow']); ?></span>
                <?php endif; ?>
                <div class="nexia-hero-radar__wordmark">
                    <?php foreach ($words as $i => $word): ?>
                        <span class="nexia-hero-radar__word-mask"><span class="nexia-hero-radar__word" style="animation-delay:<?php echo esc_attr(0.15 + $i * 0.2); ?>s;"><?php echo esc_html($word); ?></span></span><?php echo $i < count($words) - 1 ? ' ' : ''; ?>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <?php
    }
}
