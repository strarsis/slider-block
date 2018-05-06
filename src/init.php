<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function slider_block_cgb_block_assets() {
	// Styles.
	wp_enqueue_style(
		'slider_block-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-blocks', 'slider_block-swiper-css' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: filemtime — Gets file modification time.
	);

	wp_enqueue_style(
		'slider_block-swiper-css',
		plugins_url( 'lib/swiper/swiper.css', dirname( __FILE__ ) ),
		array()
		// filemtime( plugin_dir_path( __DIR__ ) . 'lib/swiper/min/swiper.min.css' ) // Version: filemtime — Gets file modification time.
	);

	// Scripts.
	wp_enqueue_script(
		'slider_block-swiper-js',
		plugins_url( '/lib/swiper/swiper.js', dirname( __FILE__ ) ),
		array(),
		// filemtime( plugin_dir_path( __DIR__ ) . 'lib/swiper/min/swiper.min.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	wp_enqueue_script(
		'slider_block-front-js',
		plugins_url( 'src/slider/front.js', dirname( __FILE__ ) ),
		array( 'slider_block-swiper-js' ),
		// filemtime( plugin_dir_path( __DIR__ ) . 'src/slider/front.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);
} // End function slider_block_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'slider_block_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function slider_block_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'slider_block-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'slider_block-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: filemtime — Gets file modification time.
	);
} // End function slider_block_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'slider_block_cgb_editor_assets' );
