<?php

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Nexia_Newsletter_Signal_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'nexia_newsletter_signal';
    }

    public function get_title()
    {
        return __('Nexia — Señales (newsletter)', 'nexia-elementor-widgets');
    }

    public function get_icon()
    {
        return 'eicon-mail';
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

        $this->add_control('title', [
            'label' => __('Título', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 2,
            'default' => '¿Quieres recibir señales desde la sala de máquinas?',
        ]);

        $this->add_control('subtitle', [
            'label' => __('Subtítulo', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Activa el buzón de la comunidad Nexian.',
        ]);

        $this->add_control('body', [
            'label' => __('Texto', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 4,
            'default' => 'Recibirás ideas sólo para jefazas de negocios digitales sobre: sistemas, automatización, IA, delegación, operativa y verdades incómodas sobre cómo construir un negocio que dependa cada vez menos de ti.',
        ]);

        $this->add_control('cta_text', [
            'label' => __('Texto del botón', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Quiero recibir las señales',
        ]);

        $this->add_control('cta_link', [
            'label' => __('Enlace del botón', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::URL,
            'default' => ['url' => '#'],
            'placeholder' => 'https://...',
            'show_external' => false,
        ]);

        $this->end_controls_section();
    }

    protected function render()
    {
        $s = $this->get_settings_for_display();
        $url = !empty($s['cta_link']['url']) ? $s['cta_link']['url'] : '#';
        $target = !empty($s['cta_link']['is_external']) ? ' target="_blank"' : '';
        $nofollow = !empty($s['cta_link']['nofollow']) ? ' rel="nofollow"' : '';
        ?>
        <div class="nexia-widgets-scope nexia-newsletter-signal">
            <div class="nexia-newsletter-signal__mark" aria-hidden="true">
                <span class="nexia-newsletter-signal__ring nexia-newsletter-signal__ring--1"></span>
                <span class="nexia-newsletter-signal__ring nexia-newsletter-signal__ring--2"></span>
                <span class="nexia-newsletter-signal__ring nexia-newsletter-signal__ring--3"></span>
                <span class="nexia-newsletter-signal__x">
                    <span class="nexia-newsletter-signal__bar nexia-newsletter-signal__bar--a"></span>
                    <span class="nexia-newsletter-signal__bar nexia-newsletter-signal__bar--b"></span>
                </span>
            </div>
            <div class="nexia-newsletter-signal__copy">
                <?php if (!empty($s['title'])) : ?>
                    <h2 class="nexia-newsletter-signal__title"><?php echo esc_html($s['title']); ?></h2>
                <?php endif; ?>
                <?php if (!empty($s['subtitle'])) : ?>
                    <p class="nexia-newsletter-signal__subtitle"><?php echo esc_html($s['subtitle']); ?></p>
                <?php endif; ?>
                <?php if (!empty($s['body'])) : ?>
                    <p class="nexia-newsletter-signal__body"><?php echo esc_html($s['body']); ?></p>
                <?php endif; ?>
                <?php if (!empty($s['cta_text'])) : ?>
                    <a class="nexia-newsletter-signal__cta" href="<?php echo esc_url($url); ?>"<?php echo $target . $nofollow; ?>>
                        <?php echo esc_html($s['cta_text']); ?>
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
