<?php

if (!defined('ABSPATH')) {
    exit;
}

final class Nexia_Plugin
{
    private static $instance = null;

    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct()
    {
        add_action('plugins_loaded', [$this, 'on_plugins_loaded']);
    }

    public function on_plugins_loaded()
    {
        if (!did_action('elementor/loaded')) {
            add_action('admin_notices', [$this, 'admin_notice_missing_elementor']);
            return;
        }

        add_action('elementor/elements/categories_registered', [$this, 'register_category']);
        add_action('elementor/widgets/register', [$this, 'register_widgets']);
        add_action('elementor/frontend/after_enqueue_styles', [$this, 'enqueue_frontend_assets']);
    }

    public function admin_notice_missing_elementor()
    {
        echo '<div class="notice notice-warning"><p>';
        echo esc_html__('Los widgets de Nexia necesitan Elementor activo para funcionar.', 'nexia-elementor-widgets');
        echo '</p></div>';
    }

    public function register_category($elements_manager)
    {
        $elements_manager->add_category('nexia', [
            'title' => __('Nexia — 3D & Motion', 'nexia-elementor-widgets'),
            'icon' => 'fa fa-plug',
        ]);
    }

    public function enqueue_frontend_assets()
    {
        wp_enqueue_style(
            'nexia-fonts',
            'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap',
            [],
            null
        );

        wp_enqueue_style(
            'nexia-widgets',
            NEXIA_WIDGETS_URL . 'assets/css/nexia-widgets.css',
            [],
            NEXIA_WIDGETS_VERSION
        );

        wp_register_script(
            'nexia-hero-scene',
            NEXIA_WIDGETS_URL . 'assets/js/nexia-hero-scene.bundle.js',
            [],
            NEXIA_WIDGETS_VERSION,
            true
        );

        wp_register_script(
            'nexia-engine-room-scene',
            NEXIA_WIDGETS_URL . 'assets/js/nexia-engine-room.bundle.js',
            [],
            NEXIA_WIDGETS_VERSION,
            true
        );

        wp_register_script(
            'nexia-scroll-reveal',
            NEXIA_WIDGETS_URL . 'assets/js/nexia-scroll-reveal.js',
            [],
            NEXIA_WIDGETS_VERSION,
            true
        );
    }

    public function register_widgets($widgets_manager)
    {
        require_once NEXIA_WIDGETS_PATH . 'includes/widgets/class-hero-3d-widget.php';
        require_once NEXIA_WIDGETS_PATH . 'includes/widgets/class-hero-radar-widget.php';
        require_once NEXIA_WIDGETS_PATH . 'includes/widgets/class-reveal-heading-widget.php';
        require_once NEXIA_WIDGETS_PATH . 'includes/widgets/class-method-steps-widget.php';
        require_once NEXIA_WIDGETS_PATH . 'includes/widgets/class-engine-room-widget.php';

        $widgets_manager->register(new \Nexia_Hero_3D_Widget());
        $widgets_manager->register(new \Nexia_Hero_Radar_Widget());
        $widgets_manager->register(new \Nexia_Reveal_Heading_Widget());
        $widgets_manager->register(new \Nexia_Method_Steps_Widget());
        $widgets_manager->register(new \Nexia_Engine_Room_Widget());
    }
}
