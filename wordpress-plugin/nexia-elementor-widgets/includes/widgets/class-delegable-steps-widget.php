<?php

if (!defined('ABSPATH')) {
    exit;
}

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Nexia_Delegable_Steps_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'nexia_delegable_steps';
    }

    public function get_title()
    {
        return __('Nexia — Antes de Delegar (pasos)', 'nexia-elementor-widgets');
    }

    public function get_icon()
    {
        return 'eicon-bullet-list';
    }

    public function get_categories()
    {
        return ['nexia'];
    }

    public function get_script_depends()
    {
        return ['nexia-scroll-reveal', 'nexia-delegable-steps'];
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

        $this->add_control('note', [
            'type' => Controls_Manager::RAW_HTML,
            'raw' => __('Este widget trae el copy de "Antes de delegar" fijo (kicker, relato, cita, 6 pasos y cierre). Edítalo desde el código del plugin si cambia el texto.', 'nexia-elementor-widgets'),
            'content_classes' => 'elementor-descriptor',
        ]);

        $this->end_controls_section();
    }

    private function steps()
    {
        return [
            'Documentamos',
            'Simplificamos',
            'Definimos responsabilidades',
            'Creamos criterios',
            'Automatizamos lo repetitivo',
            'Ponemos la información donde debe estar',
        ];
    }

    protected function render()
    {
        ?>
        <div class="nexia-widgets-scope nexia-light nexia-delegable-steps">
            <div class="nexia-delegable-steps__wrap">
                <p class="nexia-delegable-steps__kicker">Antes de delegar</p>
                <h2 class="nexia-delegable-steps__title">Antes de delegar, hacemos que tu negocio sea delegable</h2>

                <div class="nexia-delegable-steps__narrative nexia-reveal nexia-stagger">
                    <p>Quizá ya lo intentaste.</p>
                    <p>Contrataste una asistente. Un freelance. Una agencia.</p>
                    <p>Explicaste una tarea. La entregaron.</p>
                    <p>Y terminaste repasándola, corrigiéndola o directamente haciéndola tú otra vez.</p>
                </div>

                <div class="nexia-delegable-steps__quote-block nexia-reveal">
                    <p class="nexia-delegable-steps__quote-label">Conclusión</p>
                    <p class="nexia-delegable-steps__quote">&ldquo;Delegar me da más trabajo que hacerlo yo&rdquo;.</p>
                </div>

                <p class="nexia-delegable-steps__p nexia-reveal">Pero hay otro diagnóstico posible. Tal vez intentaste delegar un proceso que nunca estuvo realmente construido. Porque si el criterio está en tu cabeza, la información está repartida entre WhatsApp y audios y nadie sabe exactamente qué significa &ldquo;bien hecho&rdquo;...</p>
                <p class="nexia-delegable-steps__punch nexia-reveal">no estás delegando. Estás cruzando los dedos.</p>
                <p class="nexia-delegable-steps__lead-in nexia-reveal">Por eso nuestro trabajo no empieza diciéndote &ldquo;delega más&rdquo;. Primero:</p>

                <ol class="nexia-delegable-steps__steps">
                    <?php foreach ($this->steps() as $i => $label): ?>
                        <li class="nexia-delegable-steps__step">
                            <span class="nexia-delegable-steps__step-dot">
                                <span class="nexia-delegable-steps__step-num"><?php echo esc_html($i + 1); ?></span>
                                <span class="nexia-delegable-steps__step-check">&#10003;</span>
                            </span>
                            <span class="nexia-delegable-steps__step-line"><span class="nexia-delegable-steps__step-line-fill"></span></span>
                            <span class="nexia-delegable-steps__step-label"><?php echo esc_html($label); ?></span>
                        </li>
                    <?php endforeach; ?>
                </ol>

                <div class="nexia-delegable-steps__final">
                    <span class="nexia-delegable-steps__final-badge">&#10003;</span>
                    <p class="nexia-delegable-steps__final-text">Entonces delegar deja de ser un acto de fe. <strong>Se convierte en un sistema.</strong></p>
                </div>
            </div>
        </div>
        <?php
    }
}
