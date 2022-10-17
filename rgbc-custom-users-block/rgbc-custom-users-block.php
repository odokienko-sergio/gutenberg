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
 * Server-side block render callback
 */

function rgbc_custom_users_block_render( $attributes ) {
	$users = ! empty( $attributes['users'] ) ? $attributes['users'] : array();
	if ( empty( $users ) ) {
		return '<div class="rgbc-users rgbc-users__title">
					<p>Please select at least 1 user in the block settings</p>
				</div>';
	}
	$users_data = get_users( array( 'include' => $users ) );
	if ( empty( $users_data ) ) {
		return '<div class="rgbc-users rgbc-users__text">
					<p>Can`t find selected users data</p>
				</div>';
	}
	$result = '<div class="rgbc-users">';
	foreach ( $users_data as $user ) {
		$result .= '<div class="rgbc-users__row">';
		
		$result .= '<div class="rgbc-users__avatar">';
		$result .= get_avatar( $user->id, 96 );
		$result .= '</div>';

		$result .= '<div class="rgbc-users__name">';
		$result .= $user->display_name;
		$result .= '</div>';

		$result .= '<div class="rgbc-users__email">';
		$result .= $user->user_email;
		$result .= '</div>';
		
		$result .= '<div class="rgbc-users__biography">';
		$result .= $user->user_description;
		$result .= '</div>';

		$result .= '</div>';
	}
	$result .= '</div>';
	return $result;
}

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


