<?php

class VI_WOO_PRODUCT_TABS_Frontend_Frontend {
	protected $settings;
	protected $characters_array;

	public function __construct() {
		$this->settings = new VI_WOO_PRODUCT_TABS_DATA();
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

    add_filter( 'script_loader_tag', array( $this, 'mind_defer_scripts'), 10, 3 );
	}

  public function enqueue_scripts() {
    if ( is_admin() || is_customize_preview() ) {
			return;
		}
  }

  function mind_defer_scripts( $tag, $handle, $src ) {
    $defer = array( 
    );
    if ( in_array( $handle, $defer ) ) {
      return '<script src="' . $src . '" defer></script>' . "\n";
    }
      
    return $tag;
  } 
}