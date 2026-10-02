<?php
/**
 * Plugin Name: Nexia — Widgets 3D & Motion para Elementor
 * Description: Añade a Elementor tres widgets con la dirección visual del rediseño de Somos Nexia: Hero 3D (Three.js), Reveal Heading (motion en scroll) y Method Steps (tarjetas animadas). Todo el texto sigue siendo editable desde el propio editor de Elementor.
 * Version: 1.2.1
 * Author: Somos Nexia
 * Text Domain: nexia-elementor-widgets
 * Requires Plugins: elementor
 */

if (!defined('ABSPATH')) {
    exit;
}

define('NEXIA_WIDGETS_VERSION', '1.2.1');
define('NEXIA_WIDGETS_FILE', __FILE__);
define('NEXIA_WIDGETS_PATH', plugin_dir_path(__FILE__));
define('NEXIA_WIDGETS_URL', plugin_dir_url(__FILE__));

require_once NEXIA_WIDGETS_PATH . 'includes/class-nexia-plugin.php';

Nexia_Plugin::instance();
