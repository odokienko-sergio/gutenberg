<?php
/**
 * Plugin Name: RGBC Custom Users block
 * Description: Gutenberg Custom Block
 * Author:      Serhii Odokiienko
 * Version:     1.0
 * License:     GPLv2 or later
 * Domain Path: /lang
 * Text Domain: rgbc-users
 */
?>
<?php
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

const RGBC_CUB_VERSION = '1.0';
define( 'RGBC_CUB_PATH', plugin_dir_path( __FILE__ ) . '/' );
define( 'RGBC_CUB_URL', plugin_dir_url( __FILE__ ) . '/' );

require RGBC_CUB_PATH . 'inc/class-rgbc-custom-users-block.php';

if ( class_exists( 'RGBC_CUB' ) ) {
	$RGBC_CUB = new RGBC_CUB();
	$RGBC_CUB->register();
}

/**
 * Register block
 */
function rgbc_custom_users_block_init() {
	register_block_type( __DIR__, array(
		'render_callback' => 'rgbc_custom_users_block_render',
	) );
}

add_action( 'init', 'rgbc_custom_users_block_init' );
/**
 * Register block editor script
 */
function rgbc_custom_users_block_script_register() {
	wp_enqueue_script(
		'rgbc-users-block-edit',
		plugin_dir_url( __FILE__ ) . 'rgbc-custom-users-block.js',
		array(
			'wp-blocks',
			'wp-components',
			'wp-element',
			'wp-block-editor',
			'wp-i18n',
			'wp-polyfill',
		),
		filemtime( plugin_dir_path( __FILE__ ) . 'rgbc-custom-users-block.js' ),
		true
	);
}

add_action( 'enqueue_block_editor_assets', 'rgbc_custom_users_block_script_register' );


