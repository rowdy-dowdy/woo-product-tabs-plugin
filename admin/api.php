<?php

class VI_WOO_PRODUCT_TABS_Admin_Api {
	protected $settings;

	function __construct() {
		add_action( 'rest_api_init', array( $this, 'rest_api_init' ) );
	}

	public function rest_api_init() {
    register_rest_route('wpt/v1', '/settings', [
      'methods' => 'GET',
      'callback' => [$this, 'get_settings'],
      // 'permission_callback' => [$this, 'get_settings_permission']
    ]);

    register_rest_route('wpt/v1', '/settings', [
      'methods' => 'POST',
      'callback' => [$this, 'save_settings'],
      // 'permission_callback' => [$this, 'save_settings_permission']
    ]);

    register_rest_route('wpt/v1', '/products', [
      'methods' => 'GET',
      'callback' => [$this, 'get_products'],
      // 'permission_callback' => [$this, 'save_settings_permission']
    ]);

    register_rest_route('wpt/v1', '/product_tabs', [
      'methods' => 'GET',
      'callback' => [$this, 'product_tabs'],
      // 'permission_callback' => [$this, 'save_settings_permission']
    ]);

    register_rest_route('wpt/v1', '/product/types', [
      'methods' => 'GET',
      'callback' => [$this, 'product_types'],
      // 'permission_callback' => [$this, 'save_settings_permission']
    ]);

    register_rest_route('wpt/v1', '/product/stocks', [
      'methods' => 'GET',
      'callback' => [$this, 'product_stocks'],
      // 'permission_callback' => [$this, 'save_settings_permission']
    ]);
	}

  public function get_settings() {
    $consumer_key    = get_option('wpt_settings_consumer_key');
    $consumer_secret = get_option('wpt_settings_consumer_secret');

    $response = [
      'data' => [
        'consumer_key' => $consumer_key,
        'consumer_secret' => $consumer_secret
      ]
    ];

    return rest_ensure_response($response);
  }

  public function save_settings($req) {
    try {
      $consumer_key    = sanitize_text_field($req['consumer_key']);
      $consumer_secret = sanitize_text_field($req['consumer_secret']);

      if ($consumer_key == "" || $consumer_key == "") {
        throw new Exception("consumer_key or consumer_key is required");
      }

      update_option('wpt_settings_consumer_key', $consumer_key);
      update_option('wpt_settings_consumer_secret', $consumer_secret);

      $response = [
        'message' => 'success',
        'status' => 200
      ];
    }
    catch (Throwable $e) {
      $response = [
        'text' => $e->getMessage(),
        'status' => 500
      ];
    }

    return rest_ensure_response($response);
  }

  public function get_products() {
    $args = array(
      // 'category' => array( 'hoodies' ),
      // 'orderby'  => 'name',
    );
    $products = wc_get_products( $args );

    $response = [
      'data' => $products
    ];

    return rest_ensure_response($response);
  }

  public function product_tabs() {
    try {
      $tabs = get_theme_mod('wpt_product_tabs_params');

      return rest_ensure_response([
        "tab" => $tabs,
        "tab2" => [
          [ "id" => 1, "name" => "fsdf" ],
          [ "id" => 2, "name" => "fsdf" ]
        ]
      ]);

    } catch (\Throwable $th) {
      return new WP_Error( 'error', __('Can\'t Not Found'), array( 'status' => 404 ) );
    }
  }

  public function product_types() {
    $response = array(
      array(
        "id" => "simple",
        "name" => "Simple product"
      ),
      array(
        "id" => "grouped",
        "name" => "Grouped product"
      ),
      array(
        "id" => "external",
        "name" => "External/Affiliate product"
      ),
      array(
        "id" => "variable",
        "name" => "Variable product"
      ),
    );

    return rest_ensure_response($response);
  }

  public function product_stocks() {
    $response = array(
      array(
        "id" => "instock",
        "name" => "In stock"
      ),
      array(
        "id" => "outofstock",
        "name" => "Out of stock"
      ),
      array(
        "id" => "onbackorder",
        "name" => "On backorder"
      )
    );

    return rest_ensure_response($response);
  }
}