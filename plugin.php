<?php
/**
 * Plugin Name: slider-block — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/strarsis/slider-block/
 * Description: slider-block — is a Gutenberg plugin created via create-guten-block.
 * Author: strarsis
 * Author URI: https://github.com/strarsis
 * Version: 0.0.1
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
