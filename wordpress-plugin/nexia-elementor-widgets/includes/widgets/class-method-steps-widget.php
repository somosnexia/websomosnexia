<?php

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Repeater;

class Nexia_Method_Steps_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'nexia_method_steps';
    }

    public function get_title()
    {
        return __('Nexia — Method Steps', 'nexia-elementor-widgets');
    }

    public function get_icon()
    {
        return 'eicon-numbered-list';
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
            'label' => __('Tarjetas', 'nexia-elementor-widgets'),
            'tab' => Controls_Manager::TAB_CONTENT,
        ]);

        $repeater = new Repeater();

        $repeater->add_control('number', [
            'label' => __('Número', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => '01',
        ]);

        $repeater->add_control('title', [
            'label' => __('Título', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Detectamos',
        ]);

        $repeater->add_control('body', [
            'label' => __('Texto', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 3,
            'default' => '',
        ]);

        $repeater->add_control('sub', [
            'label' => __('Línea destacada (opcional)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => '',
        ]);

        $this->add_control('steps', [
            'label' => __('Pasos', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::REPEATER,
            'fields' => $repeater->get_controls(),
            'default' => [
                [
                    'number' => '01',
                    'title' => 'Detectamos',
                    'body' => 'Localizamos tareas duplicadas, procesos manuales y puntos donde tu negocio sigue necesitando tu intervención.',
                    'sub' => 'Para descubrir dónde sigues siendo imprescindible sin necesitar serlo.',
                ],
                [
                    'number' => '02',
                    'title' => 'Ordenamos',
                    'body' => 'Ponemos estructura en procesos, herramientas, responsabilidades, documentación y flujos de trabajo.',
                    'sub' => 'Para que tu negocio deje de vivir exclusivamente dentro de tu cabeza.',
                ],
                [
                    'number' => '03',
                    'title' => 'Implementamos',
                    'body' => 'Creamos automatizaciones y sistemas operativos que funcionan en el día a día. Incorporamos IA cuando aporta valor.',
                    'sub' => 'Olvidarte de estar pendiente 24/7, eso es Liberación Operativa.',
                ],
            ],
            'title_field' => '{{{ title }}}',
        ]);

        $this->end_controls_section();
    }

    protected function render()
    {
        $s = $this->get_settings_for_display();
        ?>
        <div class="nexia-widgets-scope nexia-steps nexia-reveal nexia-stagger">
            <?php foreach ($s['steps'] as $step) : ?>
                <div class="nexia-step-card">
                    <?php if (!empty($step['number'])) : ?>
                        <span class="nexia-step-card__number"><?php echo esc_html($step['number']); ?></span>
                    <?php endif; ?>
                    <h3 class="nexia-step-card__title"><?php echo esc_html($step['title']); ?></h3>
                    <?php if (!empty($step['body'])) : ?>
                        <p class="nexia-step-card__body"><?php echo esc_html($step['body']); ?></p>
                    <?php endif; ?>
                    <?php if (!empty($step['sub'])) : ?>
                        <p class="nexia-step-card__sub"><?php echo esc_html($step['sub']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
    }
}
