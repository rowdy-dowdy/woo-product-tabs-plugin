<?php

class VI_WOO_PRODUCT_TABS_Admin_Admin {
	protected $settings;

	function __construct() {

		register_activation_hook( __FILE__, array( $this, 'install' ) );

		$this->settings = new VI_WOO_PRODUCT_TABS_DATA();

		add_action( 'init', array( $this, 'init' ) );
		add_action( 'admin_init', array( $this, 'admin_init' ) );

    add_filter( 'woocommerce_product_tabs', array( $this,'woocommerce_product_tabs' ), 98 );

    add_action('wp_head', array($this, 'woocommerce_product_tab_style'));

    // $this->woocommerce_product_tab_style();
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
    global $product;

    // var_dump($product);
    // die();

    $wpt_tabs = json_decode(get_theme_mod('wpt_product_tabs_params')['wpt_product_tabs'] ?? '[]') ?? [];
    if ( !is_array($wpt_tabs)) return $tabs;

    foreach($wpt_tabs as $key => $tab) {
      if (!$tab->active) {
        unset( $tabs[$tab->id] );
      } 
      else {
        if ($tab->id == 'reviews') {
          $review_count = $product->get_rating_count();
          $tab->title = str_replace("%d", $review_count, $tab->title);
        }

        $tabs[$tab->id]['title'] =  $tab->icon . $tab->title;
        $tabs[$tab->id]['priority'] =  $tab->position;

        if ($tab->id == 'description') {
          $tabs[$tab->id]['callback'] = array($this, 'woo_product_tab_description_render');
        }
      }
    }

    return $tabs;
  }

  public function woocommerce_product_tab_style() {
    if ( is_admin() ) {
			return;
		}

    $wpt_tabs = json_decode(get_theme_mod('wpt_product_tabs_params')['wpt_product_tabs'] ?? '[]') ?? [];
    if ( !is_array($wpt_tabs)) return;

    // icon style
    $is_icon = false;
    foreach($wpt_tabs as $key => $tab) {
      if ($tab->icon != "") {
        $is_icon = true;
        break;
      }
    }

    if ($is_icon) {
      ?>
        <link rel="stylesheet" href="<?php echo VI_WOO_PRODUCT_TABS_CSS.'boxicons.min.css' ?>">
        <style>
          .wc-tabs i.bx {
            padding-right: .25em;
            font-size: 1.5em;
            vertical-align: middle;
          }
        </style>
      <?php
    }

    // mobile style
    ?>
      <style>
        @media only screen and (max-width: 640px) {
          <?php
            foreach($wpt_tabs as $key => $tab) { 
              if (!$tab->mobile_active) {
                echo "#tab-title-". $tab->id . ",#tab-" . $tab->id . "{ display: none !important; }";
              }
            }
          ?>
        }
      </style>
    <?php
  }

  public function woo_product_tab_description_render( ) {
    $wpt_tabs = json_decode(get_theme_mod('wpt_product_tabs_params')['wpt_product_tabs'] ?? '[]') ?? [];
    if ( !is_array($wpt_tabs)) return wc_get_template( 'single-product/tabs/description.php' );

    $children = $wpt_tabs[array_search('description', array_column($wpt_tabs, 'id'))]->children;

    if ( !is_array($children)) {
      return wc_get_template( 'single-product/tabs/description.php' );
    }

    usort($children, function ($a, $b) {
      return $a->position - $b->position;
    });

    foreach($children as $key => $value) {
      if (!$value->active) continue;
      if ($value->id == 'product_description') {
        wc_get_template( 'single-product/tabs/description.php' );
      }
      else {
        echo $value->content;
      }
    }
  }
}