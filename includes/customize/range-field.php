<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include_once ABSPATH . 'wp-includes/class-wp-customize-control.php';

class Range_Field_Custom_Control extends WP_Customize_Control {

  //The type of control being rendered
  public $type = 'range_field';
  public $parent;
  public $default_value;
  // public $uniqid ;

  // public function generate_uniqid() {
  //   $this->uniqid = uniqid('range_field_');
  // }

  public function enqueue() {
    wp_enqueue_style('wpt-range-customize', VI_WOO_PRODUCT_TABS_ASSETS. "css/wpt-range-customize.css");
    wp_enqueue_script('wpt-range-customize', VI_WOO_PRODUCT_TABS_ASSETS. "js/wpt-range-customize.js");
	}

  // public function __construct( $manager, $id, $args = array() )
  // {
  //   parent::__construct( $manager, $id, $args = array() );
  //   // add_action( 'wp_head', array($this,'customize_css') );
  // }

  public function render_content() {
    // $this->generate_uniqid();
    $input_id         = '_customize-input-' . $this->id;
    ?>
      <?php if( !empty( $this->label ) ) { ?>
        <label class="wpt-custom-control-title"><?php echo esc_html( $this->label ); ?></label>
      <?php } ?>
      <div class="wpt-custom-control-range">
        <input type="range" class="custom-input-range" name="<?php echo esc_attr( $input_id ); ?>"
          id="<?php echo esc_attr( $input_id ); ?>" min="8" max="40"
          value="<?php echo esc_attr( $this->value() ); ?>"
          <?php $this->link(); ?>
          data-default="<?php echo $this->value() ? esc_attr( $this->value() ) : ($this->default_value ? $this->default_value : 16) ?>"
        >
        <input type="text" class="custom-input-text" value="<?php echo esc_attr( $this->value() ); ?>">
        <span class="icon reset">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor"><path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path><path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path></svg>
        </span>
      </div>
    <?php
  }

  public function customize_css() {
  }

  public function customize_js() {
  }
}