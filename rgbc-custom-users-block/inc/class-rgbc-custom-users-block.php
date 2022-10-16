<?php
if ( ! class_exists( 'RGBC_CUB' ) ) {
	class RGBC_CUB {
		function register() {
			add_action( 'admin_enqueue_scripts', [
				$this,
				'enqueue_admin',
			] );

			add_action( 'wp_enqueue_scripts', [
				$this,
				'enqueue_front',
			] );
		}

		public function enqueue_admin() {
			wp_enqueue_style( 'rgbc_style_admin', RGBC_CUB_URL . 'assets/css/admin/admin.css', RGBC__VERSION );
		}

		public function enqueue_front() {
			wp_enqueue_style( 'rgbc_style', RGBC_CUB_URL . 'assets/css/front/front.css', RGBC_CUB_VERSION );
		}
	}
	/**
	 * Helper function to get allowed users list for block settings
	 */
	function rgbc_get_allowed_users() {
		$users = get_users( array(
			'search'         => '*@rgbc.dev',
			'search_columns' => array( 'user_email' ),
		) );

		if ( empty( $users ) ) {
			return array();
		}

		$result = array(
			array(
				'value' => '',
				'label' => esc_html__( 'Select user...' ),
			),
		);

		foreach ( $users as $user ) {
			$result[] = array(
				'value' => $user->ID,
				'label' => sprintf( '%1$s (%2$s)', $user->user_login, $user->user_email ),
			);
		}
		return $result;
	}
	/**
	 * Add new endpoint to REST
	 */
	add_action( 'rest_api_init', function () {
		$namespace   = 'rgbc-users/v1';
		$rout        = '/user-list';
		$rout_params = [
			'methods'             => 'GET',
			'callback'            => 'get_rgbc_user_list',
			'permission_callback' => function ( $request ) {
				return is_user_logged_in();
			},
		];

		register_rest_route(
			$namespace,
			$rout,
			$rout_params
		);
	} );
	/**
	 * Route callback
	 */
	function get_rgbc_user_list( WP_REST_Request $request ) {
		$users = get_users( array(
			'search'         => '*@rgbc.dev',
			'search_columns' => array( 'user_email' ),
		) );

		if ( empty( $users ) ) {
			return array();
		}

		$result = array(
			array(
				'value' => '',
				'label' => esc_html__( 'Select user...' ),
			),
		);

		foreach ( $users as $user ) {
			$result[] = array(
				'value' => $user->ID,
				'label' => sprintf( '%1$s (%2$s)', $user->user_login, $user->user_email ),
			);
		}
		return $result;
	}
}
