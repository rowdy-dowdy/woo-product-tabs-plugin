<?php

class VI_WOO_PRODUCT_TABS_Admin_Settings {
	protected $settings;

	public function __construct() {

		$this->settings = new VI_WOO_PRODUCT_TABS_DATA();
		add_action( 'admin_init', array( $this, 'admin_init' ), 99 );
		add_action( 'admin_menu', array( $this, 'admin_menu' ), 998 );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_script' ) );
    add_filter( 'script_loader_tag', array( $this, 'mind_type_module_scripts'), 10, 3 );
	}

  public function admin_init() {
	}

	public function admin_menu() {
    add_menu_page(
			esc_html__( 'Woocommerce product tab', 'woo-product-tab' ),
			esc_html__( 'Woocommerce product tab', 'woo-product-tab' ),
			'manage_options',
			'wpt-settings',
		  array($this, 'setting_page_woo_product_tab'),
			'dashicons-cart',
			2 
    );

		// add_submenu_page(
		// 	'edit.php?post_type=wpt',
		// 	esc_html__( 'Settings', 'woo-product-tab' ),
		// 	esc_html__( 'Settings', 'woo-product-tab' ),
		// 	'manage_options',
		// 	'woo_product_tab',
		// 	array( $this, 'setting_page_woo_product_tab' )
		// );
	}

	public function admin_enqueue_script() {
    // die(is_admin());
    if ( !is_admin() || $_GET['page'] != "wpt-settings") {
			return;
		}

    // wp_deregister_script(
    //   'react',
    //   'react-dom'
    // );

    wp_enqueue_style('wpt-react-settings', VI_WOO_PRODUCT_TABS_BUILD. "index.css");
    wp_enqueue_script('wpt-react-settings', VI_WOO_PRODUCT_TABS_BUILD. "index.js", array('wp-element'), '1.0', true);

    // wp_enqueue_script('wpt-react-settings', VI_WOO_PRODUCT_TABS_DIST. "assets/bundle.js", array(), '1.0', false);
    wp_localize_script('wpt-react-settings', 'wptAppLocalizer', [
      'apiURL' => home_url('/wp-json'),
      'adminURL' => get_admin_url(),
      'nonce' => wp_create_nonce('wp_rest'),
      'customizeURL' => wp_customize_url()
    ]);
	}

  public function mind_type_module_scripts($tag, $handle, $src) {
    $defer = array(
      // 'wpt-react-settings'
    );
    if ( in_array( $handle, $defer ) ) {
      return '<script defer type="module" id="'.$handle.'" src="' . $src . '"></script>' . "\n";
    }
    return $tag;
  }

  public function setting_page_woo_product_tab() {
    ?> 
      <div id="wptReactSettings"></div>
    <?php
  }
}