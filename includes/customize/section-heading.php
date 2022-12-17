<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include_once ABSPATH . 'wp-includes/class-wp-customize-control.php';

class Section_Heading_Custom_Control extends WP_Customize_Control {

  //The type of control being rendered
  public $type = 'section_heading';
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
        <h4 class="custom-heading-control">
          <?php echo esc_html( $this->label ); ?>
        </h4>
      <?php } ?>
    <?php
  }

  public function customize_css() {
    ?>
      <style>
        .custom-heading-control { 
          color: white;
          background-color: #00a6db;
          padding: 10px 14px;
          font-weight: bold;
          margin: 0 -12px;
        }
      </style>
    <?php
  }
}