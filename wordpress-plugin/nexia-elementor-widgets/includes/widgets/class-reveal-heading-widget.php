<?php

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Nexia_Reveal_Heading_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'nexia_reveal_heading';
    }

    public function get_title()
    {
        return __('Nexia — Reveal Heading', 'nexia-elementor-widgets');
    }

    public function get_icon()
    {
        return 'eicon-t-letter';
    }

    public function get_categories()
    {
        return ['nexia'];
    }

    public function get_script_depends()
    {
        return ['nexia-scroll-reveal'];
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
            'label' => __('Antetítulo (opcional)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => '',
        ]);

        $this->add_control('title', [
            'label' => __('Título', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 2,
            'default' => 'Tu negocio funciona. El problema es que tú sigues siendo el sistema.',
        ]);

        $this->add_control('text', [
            'label' => __('Texto', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 4,
            'default' => '',
        ]);

        $this->add_control('align', [
            'label' => __('Alineación', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::CHOOSE,
            'options' => [
                'left' => ['title' => __('Izquierda', 'nexia-elementor-widgets'), 'icon' => 'eicon-text-align-left'],
                'center' => ['title' => __('Centro', 'nexia-elementor-widgets'), 'icon' => 'eicon-text-align-center'],
            ],
            'default' => 'left',
            'selectors' => [
                '{{WRAPPER}} .nexia-reveal-heading' => 'text-align: {{VALUE}};',
                '{{WRAPPER}} .nexia-reveal-heading__text' => 'margin-left: {{VALUE, left, 0, center, auto}}; margin-right: {{VALUE, left, 0, center, auto}};',
            ],
        ]);

        $this->end_controls_section();
    }

    protected function render()
    {
        $s = $this->get_settings_for_display();
        ?>
        <div class="nexia-widgets-scope nexia-reveal-heading nexia-reveal">
            <?php if (!empty($s['kicker'])) : ?>
                <p class="nexia-reveal-heading__kicker"><?php echo esc_html($s['kicker']); ?></p>
            <?php endif; ?>
            <h2 class="nexia-reveal-heading__title"><?php echo esc_html($s['title']); ?></h2>
            <?php if (!empty($s['text'])) : ?>
                <p class="nexia-reveal-heading__text"><?php echo nl2br(esc_html($s['text'])); ?></p>
            <?php endif; ?>
        </div>
        <?php
    }
}
