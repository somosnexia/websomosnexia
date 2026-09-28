<?php

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Nexia_Hero_3D_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'nexia_hero_3d';
    }

    public function get_title()
    {
        return __('Nexia — Hero 3D', 'nexia-elementor-widgets');
    }

    public function get_icon()
    {
        return 'eicon-slider-3d';
    }

    public function get_categories()
    {
        return ['nexia'];
    }

    public function get_script_depends()
    {
        return ['nexia-hero-scene'];
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
            'default' => 'Somos Nexia, el equipo técnico de Liberación Operativa para negocios digitales. Ordenamos procesos, implementamos sistemas y utilizamos automatización e Inteligencia Artificial cuando ayudan a reducir todo ese trabajo que sigue dependiendo innecesariamente de ti o de tu equipo.',
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

        $this->end_controls_section();

        $this->start_controls_section('style_section', [
            'label' => __('Colores de la escena 3D', 'nexia-elementor-widgets'),
            'tab' => Controls_Manager::TAB_STYLE,
        ]);

        $this->add_control('color_accent', [
            'label' => __('Acento (casco, partículas, sónar)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#5b73ff',
        ]);

        $this->add_control('color_signal', [
            'label' => __('Señal (torreta, periscopio, CTA)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#2e4be2',
        ]);

        $this->add_control('color_core', [
            'label' => __('Núcleo (nodos del sistema/IA sobre el casco)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#c8d2ff',
        ]);

        $this->add_control('min_height', [
            'label' => __('Altura mínima (vh)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::SLIDER,
            'range' => ['px' => ['min' => 40, 'max' => 100]],
            'default' => ['size' => 90, 'unit' => 'px'],
            'size_units' => ['vh'],
            'selectors' => [
                '{{WRAPPER}} .nexia-hero-3d' => 'min-height: {{SIZE}}{{UNIT}};',
            ],
        ]);

        $this->end_controls_section();
    }

    protected function render()
    {
        $s = $this->get_settings_for_display();
        $cta_url = !empty($s['cta_link']['url']) ? $s['cta_link']['url'] : '#contacto';
        $target = !empty($s['cta_link']['is_external']) ? ' target="_blank"' : '';
        $nofollow = !empty($s['cta_link']['nofollow']) ? ' rel="nofollow"' : '';
        ?>
        <div class="nexia-widgets-scope nexia-hero-3d">
            <div
                class="nexia-hero-3d__canvas"
                data-accent="<?php echo esc_attr($s['color_accent']); ?>"
                data-signal="<?php echo esc_attr($s['color_signal']); ?>"
                data-core="<?php echo esc_attr($s['color_core']); ?>"
            ></div>
            <div class="nexia-hero-3d__content">
                <?php if (!empty($s['kicker'])) : ?>
                    <p class="nexia-hero-3d__kicker"><?php echo esc_html($s['kicker']); ?></p>
                <?php endif; ?>
                <h1 class="nexia-hero-3d__heading"><?php echo esc_html($s['heading']); ?></h1>
                <?php if (!empty($s['body'])) : ?>
                    <p class="nexia-hero-3d__body"><?php echo esc_html($s['body']); ?></p>
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
            </div>
        </div>
        <?php
    }
}
