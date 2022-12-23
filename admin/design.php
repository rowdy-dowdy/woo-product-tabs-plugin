<?php

require_once VI_WOO_PRODUCT_TABS_INCLUDES. 'customize/section-heading.php';
require_once VI_WOO_PRODUCT_TABS_INCLUDES. 'customize/sub-section-heading.php';
require_once VI_WOO_PRODUCT_TABS_INCLUDES. 'customize/range-field.php';
// require_once VI_WOO_PRODUCT_TABS_INCLUDES. 'customize/color-field.php';
require_once VI_WOO_PRODUCT_TABS_INCLUDES. 'customize/tabs-field.php';

include_once ABSPATH . 'wp-includes/customize/class-wp-customize-color-control.php';

class VI_WOO_PRODUCT_TABS_Admin_Design {
	protected $settings;

  public function __construct() {

		$this->settings = new VI_WOO_PRODUCT_TABS_DATA();

    add_action( 'customize_register', array($this, 'design_option_customize') );
    add_action( 'customize_controls_print_scripts', array($this, 'customize_controls_print_scripts') );
    add_action( 'customize_preview_init', array($this, 'customize_live_preview') );
    add_filter( 'script_loader_tag', array( $this, 'mind_defer_scripts'), 10, 3 );
	}

  public function design_option_customize($wp_customize) {
    $wp_customize->add_panel( 'wpt_product_tabs_customize', array(
			'priority'       => 200,
			// 'capability'     => 'manage_options',
			// 'theme_supports' => '',
			'title'          => __( 'Product Tabs for WooCommerce', 'woo-product-tabs' ),
		) );

    $this->add_section_design( $wp_customize );
    $this->add_section_tabs( $wp_customize );
  }

  protected function add_section_design( $wp_customize ) {

    $wp_customize->add_section( 'wpt_product_tabs_design', array(
			'priority'       => 20,
			// 'capability'     => 'manage_options',
			// 'theme_supports' => '',
			'title'          => __( 'Design', 'woo-product-tabs' ),
			'panel'          => 'wpt_product_tabs_customize',
		) );

    // tab layout
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_tab_layout]', array(
			'default'           => $this->settings->get_default( 'wpt_tab_layout' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( 'wpt_product_tabs_params[wpt_tab_layout]', array(
			'type'        => 'select',
			'priority'    => 10,
			'section'     => 'wpt_product_tabs_design',
			'label'       => __( 'Tab layout', 'woo-product-tabs' ),
			'choices'     => array(
				'default' => __( 'Default', 'woo-product-tabs' ),
				'flat'    => __( 'Flat'   , 'woo-product-tabs' ),
				'accordion' => __( 'Accordion', 'woo-product-tabs' ),
				'vertical' => __( 'Vertical', 'woo-product-tabs' ),
				'horizontal' => __( 'Horizontal', 'woo-product-tabs' ),
			)
		) );

    // ! tab title
    $wp_customize->add_setting('wpt_heading_tab_title', array()); // dummy

    $wp_customize->add_control( new Section_Heading_Custom_Control( 
      $wp_customize, 'wpt_heading_tab_title',
      array(
        'label'   => __( 'Tab title', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
      )
    ) );

    // TODO: normal
    $wp_customize->add_setting('wpt_heading_tab_title_normal', array()); // dummy

    $wp_customize->add_control( new Sub_Section_Heading_Custom_Control( 
      $wp_customize, 'wpt_heading_tab_title_normal',
      array(
        'label'   => __( 'Normal', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
      )
    ) );

    // font size normal
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_normal_font_size]', array(
			'default'           => $this->settings->get_default( 'wpt_title_normal_font_size' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		) );
		$wp_customize->add_control( new Range_Field_Custom_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_normal_font_size]',
      array(
        'label'   => __( 'Font size', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
      )
    ) );

    // icon font size normal
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_normal_icon_font_size]', array(
			'default'           => $this->settings->get_default( 'wpt_title_normal_icon_font_size' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new Range_Field_Custom_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_normal_icon_font_size]',
      array(
        'label'   => __( 'Font size', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
      )
    ) );

    // Color
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_normal_color]', array(
			'default'           => $this->settings->get_default( 'wpt_title_normal_color' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_normal_color]',
      array(
        'label'   => __( 'Color', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
        'settings' => 'wpt_product_tabs_params[wpt_title_normal_color]',
      )
    ) );

    // Background Color
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_normal_background_color]', array(
			'default'           => $this->settings->get_default( 'wpt_title_normal_background_color' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_normal_background_color]',
      array(
        'label'   => __( 'Background color', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
        'settings' => 'wpt_product_tabs_params[wpt_title_normal_background_color]',
      )
    ) );

    // Icon Color
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_normal_icon_color]', array(
			'default'           => $this->settings->get_default( 'wpt_title_normal_icon_color' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_normal_icon_color]',
      array(
        'label'   => __( 'Icon color', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
        'settings' => 'wpt_product_tabs_params[wpt_title_normal_icon_color]',
      )
    ) );
    
    // TODO: active
    $wp_customize->add_setting('wpt_heading_tab_title_active', array()); // dummy

    $wp_customize->add_control( new Sub_Section_Heading_Custom_Control( 
      $wp_customize, 'wpt_heading_tab_title_active',
      array(
        'label'   => __( 'Active', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
      )
    ) );

    // font size active
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_active_font_size]', array(
			'default'           => $this->settings->get_default( 'wpt_title_active_font_size' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new Range_Field_Custom_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_active_font_size]',
      array(
        'label'   => __( 'Font size', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
      )
    ) );

    // icon font size active
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_active_icon_font_size]', array(
			'default'           => $this->settings->get_default( 'wpt_title_active_icon_font_size' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new Range_Field_Custom_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_active_icon_font_size]',
      array(
        'label'   => __( 'Font size', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
      )
    ) );

    // Color active
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_active_color]', array(
			'default'           => $this->settings->get_default( 'wpt_title_active_color' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_active_color]',
      array(
        'label'   => __( 'Color', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
        'settings' => 'wpt_product_tabs_params[wpt_title_active_color]',
      )
    ) );

    // Background color active
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_active_background_color]', array(
			'default'           => $this->settings->get_default( 'wpt_title_active_background_color' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_active_background_color]',
      array(
        'label'   => __( 'Background color', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
        'settings' => 'wpt_product_tabs_params[wpt_title_active_background_color]',
      )
    ) );

    // Icon color active
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_title_active_icon_color]', array(
			'default'           => $this->settings->get_default( 'wpt_title_active_icon_color' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_title_active_icon_color]',
      array(
        'label'   => __( 'Icon color', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
        'settings' => 'wpt_product_tabs_params[wpt_title_active_icon_color]',
      )
    ) );

    // ! tab content
    $wp_customize->add_setting('wpt_heading_tab_content', array()); // dummy

    $wp_customize->add_control( new Section_Heading_Custom_Control( 
      $wp_customize, 'wpt_heading_tab_content',
      array(
        'label'   => __( 'Tab title', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
      )
    ) );

    // Color tab content
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_content_color]', array(
			'default'           => $this->settings->get_default( 'wpt_content_color' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_content_color]',
      array(
        'label'   => __( 'Color', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
        'settings' => 'wpt_product_tabs_params[wpt_content_color]',
      )
    ) );

    // Background color tab content
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_content_background_color]', array(
			'default'           => $this->settings->get_default( 'wpt_content_background_color' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control(
      $wp_customize, 'wpt_product_tabs_params[wpt_content_background_color]',
      array(
        'label'   => __( 'Background color', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_design',
        'settings' => 'wpt_product_tabs_params[wpt_content_background_color]',
      )
    ) );

    // with
		$wp_customize->add_setting( 'wpt_product_tabs_params[wpt_content_width]', array(
			'default'           => $this->settings->get_default( 'wpt_content_width' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( 'wpt_product_tabs_params[wpt_content_width]', array(
			'type'        => 'select',
			'priority'    => 10,
			'section'     => 'wpt_product_tabs_design',
			'label'       => __( 'Width', 'woo-product-tabs' ),
			'choices'     => array(
				'boxed' => __( 'Boxed', 'woo-product-tabs' ),
				'full_width'    => __( 'Full width'   , 'woo-product-tabs' ),
			)
		) );
	}

  protected function add_section_tabs( $wp_customize ) {
    $wp_customize->add_section( 'wpt_product_tabs_tabs', array(
			'priority'       => 20,
			// 'capability'     => 'manage_options',
			// 'theme_supports' => '',
			'title'          => __( 'Tabs', 'woo-product-tabs' ),
			'panel'          => 'wpt_product_tabs_customize',
		) );

		$wp_customize->add_setting('wpt_product_tabs_params[wpt_product_tabs]', array(
			'default'           => $this->settings->get_default( 'wpt_product_tabs' ),
			// 'type'              => 'option',
			// 'capability'        => 'manage_options',
			// 'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		) ); // dummy

    $wp_customize->add_control( new Tabs_Field_Custom_Control( 
      $wp_customize, 'wpt_product_tabs_params[wpt_product_tabs]',
      array(
        // 'label'   => __( 'Tab title', 'woo-product-tabs' ),
        'section' => 'wpt_product_tabs_tabs',
        'default_value' => $this->settings->get_core_tabs()
      )
    ) );
	}

  public function customize_live_preview() {
    wp_enqueue_script( 
		  'wpt-customize',
		  VI_WOO_PRODUCT_TABS_JS.'wpt-customize.js',
      array( 'jquery','customize-preview' ),
		  VI_WOO_PRODUCT_TABS_VERSION,
		  true		
	  );
  }

  public function customize_controls_print_scripts() {
    if ( ! is_customize_preview() ) {
			return;
		}

    // echo '<script id="wpt-customize-preview-js-core" src="'. includes_url('js/customize-preview.min.js',).'"></script>';
    echo '<script async id="wpt-alpinejs" src="'. VI_WOO_PRODUCT_TABS_JS.'alpinejs.3.10.5.min.js' .'"></script>';
    // echo '<script id="wpt-jquery-core" src="'. includes_url('js/jquery/jquery.min.js',).'"></script>';
    // echo '<script id="wpt-customize-base-js-core" src="'. includes_url('js/customize-base.min.js',).'"></script>';
    // echo '<script id="wpt-lodash-core" src="'. includes_url('js/dist/vendor/lodash.min.js',).'"></script>';
    // echo '<script id="wpt-customize-controls-js-core" src="'. admin_url('js/customize-controls.js',).'"></script>';
    // echo '<script id="wpt-customize-panel" src="'. VI_WOO_PRODUCT_TABS_JS.'wpt-customize-panel.js' .'"></script>';
    wp_enqueue_script( 
      'wpt-customize-panel',
      VI_WOO_PRODUCT_TABS_JS.'wpt-customize-panel.js',
      array( 'jquery','customize-preview' ),
      VI_WOO_PRODUCT_TABS_VERSION,
      true		
    );

    ?>
      <!-- <script type="text/javascript">
        jQuery(document).ready(function ($) {
          wp.customize.panel('wpt_product_tabs_customize', function (panel) {
            console.log(panel)
          })
        })
      </script> -->
    <?php
  }

  public function mind_defer_scripts( $tag, $handle, $src ) {
    $defer = array(
      'wpt-alpinejs'
    );
    if ( in_array( $handle, $defer ) ) {
      return '<script defer id="'.$handle.'" src="' . $src . '"></script>' . "\n";
    }
    return $tag;
  } 
}