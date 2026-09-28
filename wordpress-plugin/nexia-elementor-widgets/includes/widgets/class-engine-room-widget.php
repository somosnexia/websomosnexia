<?php

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Nexia_Engine_Room_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'nexia_engine_room';
    }

    public function get_title()
    {
        return __('Nexia — Sala de Máquinas 3D', 'nexia-elementor-widgets');
    }

    public function get_icon()
    {
        return 'eicon-gears';
    }

    public function get_categories()
    {
        return ['nexia'];
    }

    public function get_script_depends()
    {
        return ['nexia-engine-room-scene', 'nexia-scroll-reveal'];
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
            'default' => 'Por dentro',
        ]);

        $this->add_control('title', [
            'label' => __('Título', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 2,
            'default' => 'Así es la sala de máquinas de tu negocio cuando alguien la ordena.',
        ]);

        $this->add_control('text', [
            'label' => __('Texto', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXTAREA,
            'rows' => 5,
            'default' => 'Radares que vigilan lo que importa, paneles que dejan de depender de tu memoria y sistemas que siguen funcionando aunque tú no estés mirando. Eso es lo que implementamos: la infraestructura invisible que sostiene tu operativa.',
        ]);

        $this->add_control('cta_text', [
            'label' => __('Texto del botón (opcional)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::TEXT,
            'default' => '',
        ]);

        $this->add_control('cta_link', [
            'label' => __('Enlace del botón', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::URL,
            'default' => ['url' => ''],
            'show_external' => false,
        ]);

        $this->add_control('visual_position', [
            'label' => __('Posición de la escena 3D', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::CHOOSE,
            'options' => [
                'right' => ['title' => __('Derecha', 'nexia-elementor-widgets'), 'icon' => 'eicon-h-align-right'],
                'left' => ['title' => __('Izquierda', 'nexia-elementor-widgets'), 'icon' => 'eicon-h-align-left'],
            ],
            'default' => 'right',
        ]);

        $this->end_controls_section();

        $this->start_controls_section('style_section', [
            'label' => __('Colores de la escena 3D', 'nexia-elementor-widgets'),
            'tab' => Controls_Manager::TAB_STYLE,
        ]);

        $this->add_control('color_accent', [
            'label' => __('Acento (radar, tuberías, polvo)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#5b73ff',
        ]);

        $this->add_control('color_signal', [
            'label' => __('Señal (consola, pantallas)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#2e4be2',
        ]);

        $this->add_control('color_core', [
            'label' => __('Núcleo (botones, blips del radar)', 'nexia-elementor-widgets'),
            'type' => Controls_Manager::COLOR,
            'default' => '#c8d2ff',
        ]);

        $this->end_controls_section();
    }

    protected function render()
    {
        $s = $this->get_settings_for_display();
        $cta_url = !empty($s['cta_link']['url']) ? $s['cta_link']['url'] : '';
        $target = !empty($s['cta_link']['is_external']) ? ' target="_blank"' : '';
        $nofollow = !empty($s['cta_link']['nofollow']) ? ' rel="nofollow"' : '';
        $reverse = $s['visual_position'] === 'left' ? ' nexia-engine-room--reverse' : '';
        ?>
        <div class="nexia-widgets-scope nexia-engine-room<?php echo esc_attr($reverse); ?>">
            <div class="nexia-engine-room__inner">
                <div class="nexia-engine-room__content nexia-reveal">
                    <?php if (!empty($s['kicker'])) : ?>
                        <p class="nexia-engine-room__kicker"><?php echo esc_html($s['kicker']); ?></p>
                    <?php endif; ?>
                    <h2 class="nexia-engine-room__title"><?php echo esc_html($s['title']); ?></h2>
                    <?php if (!empty($s['text'])) : ?>
                        <p class="nexia-engine-room__body"><?php echo nl2br(esc_html($s['text'])); ?></p>
                    <?php endif; ?>
                    <?php if (!empty($s['cta_text']) && !empty($cta_url)) : ?>
                        <a
                            class="nexia-engine-room__cta"
                            href="<?php echo esc_url($cta_url); ?>"
                            <?php echo $target . $nofollow; ?>
                        >
                            <?php echo esc_html($s['cta_text']); ?>
                            <span aria-hidden="true">→</span>
                        </a>
                    <?php endif; ?>
                </div>
                <div class="nexia-engine-room__visual nexia-reveal">
                    <div
                        class="nexia-engine-room__canvas"
                        data-accent="<?php echo esc_attr($s['color_accent']); ?>"
                        data-signal="<?php echo esc_attr($s['color_signal']); ?>"
                        data-core="<?php echo esc_attr($s['color_core']); ?>"
                    ></div>
                </div>
            </div>
        </div>
        <?php
    }
}
