<?php

class VI_WOO_PRODUCT_TABS_Admin_Admin {
	protected $settings;

	function __construct() {

		register_activation_hook( __FILE__, array( $this, 'install' ) );

		$this->settings = new VI_WOO_PRODUCT_TABS_DATA();

		add_action( 'init', array( $this, 'init' ) );
		add_action( 'admin_init', array( $this, 'admin_init' ) );

    add_filter( 'woocommerce_product_tabs', array( $this,'woocommerce_product_tabs' ) );
	}

	public function install() {
		global $wp_version;
		If ( version_compare( $wp_version, "4.8", "<" ) ) {
			deactivate_plugins( basename( __FILE__ ) ); // Deactivate our plugin
			wp_die( "This plugin requires WordPress version 4.8 or higher." );
		}
	}

	function init() {
	
	}

  public function admin_init() {
    
	}

  public function woocommerce_product_tabs($tabs) {
    $wpt_tabs = json_decode(get_theme_mod('wpt_product_tabs_params')['wpt_product_tabs'] ?? '[]') ?? [];

    // if ( !is_array($wpt_tabs)) return $tabs;

    $tabs['specific_product_tab'] = array(
      'title' => __( 'Specific Product Tab', 'woocommerce' ), //change "Specific Product tab" to any text you want
      'priority' => 50,
      'callback' => array($this,'ql_specific_product_tab_content')
    );
    $tabs['reviews']['title'] = __( 'Ratings' ); // Rename the reviews tab
    $tabs['custom_tab']['title'] = __( 'Custom Tab Updated' ); // Rename the user created custom tab.

    return $tabs;
  }

  public function ql_specific_product_tab_content() {
    ?>
      fasdfdasfsd
    <?php
  }
}