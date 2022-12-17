<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include_once ABSPATH . 'wp-includes/class-wp-customize-control.php';

class Sub_Section_Heading_Custom_Control extends WP_Customize_Control {

  //The type of control being rendered
  public $type = 'sub_section_heading';
  public $parent;

  public function enqueue() {
	}

  // public function __construct( $manager, $id, $args = array() )
  // {
  //   parent::__construct( $manager, $id, $args = array() );
  //   // add_action( 'wp_head', array($this,'customize_css') );
  // }

  public function render_content() {
    $this->customize_css();
    
    ?>
      <?php if( !empty( $this->label ) ) { ?>
        <h4 class="custom-sub-section-heading-control">
          <?php echo esc_html( $this->label ); ?>
        </h4>
      <?php } ?>
    <?php
  }

  public function customize_css() {
    ?>
      <style>
        .custom-sub-section-heading-control { 
          color: #222;
          /* background-color: #00a6db; */
          padding: 10px 14px;
          font-weight: bold;
          margin: -6px -14px -4px;
          font-size: 18px;
        }
      </style>
    <?php
  }
}