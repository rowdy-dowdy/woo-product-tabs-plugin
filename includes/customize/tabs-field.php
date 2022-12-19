<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include_once ABSPATH . 'wp-includes/class-wp-customize-control.php';

class Tabs_Field_Custom_Control extends WP_Customize_Control {

  //The type of control being rendered
  public $type = 'tabs_field';
  public $parent;
  public $default_value;
  // public $uniqid ;

  // public function generate_uniqid() {
  //   $this->uniqid = uniqid('tabs_field_');
  // }

  public function enqueue() {
    wp_enqueue_style( 'wpt-box-icon', VI_WOO_PRODUCT_TABS_CSS.'boxicons.min.css');
    wp_enqueue_style( 'wpt-tabs-field', VI_WOO_PRODUCT_TABS_CSS.'tabs_field.css');
    wp_enqueue_script( 'wpt-sortable', VI_WOO_PRODUCT_TABS_JS.'Sortable.min.js');
    // wp_enqueue_script( 'wpt-alpinejs', VI_WOO_PRODUCT_TABS_JS.'alpinejs.3.10.5.min.js');
    // wp_enqueue_script( 'wpt-immerjs', VI_WOO_PRODUCT_TABS_JS.'immer.min.js');

    wp_enqueue_script( 'wpt-tabs-customize', VI_WOO_PRODUCT_TABS_JS.'wpt-tabs-customize.js', array('wpt-sortable'));
    wp_localize_script('wpt-tabs-customize', 'wpt_tabs_customize', [
      'data' => $this->value(),
      'localize' => [
        'custom_tab' => __('Custom tab', 'woo-product-tab'),
        'add_new' => __( 'Add new', 'woo-product-tabs' ),
        'nonce' => wp_create_nonce('wp_rest'),
        'customizeURL' => wp_customize_url(),
      ]
    ]);
	}

  // public function __construct( $manager, $id, $args = array() )
  // {
  //   parent::__construct( $manager, $id, $args = array() );
  //   // add_action( 'wp_head', array($this,'customize_css') );
  // }

  public function render_content() {
    // $this->generate_uniqid();
    $input_id         = '_customize-input-' . $this->id;

    $product_tabs = $this->value();

    if ( !is_array( $product_tabs) ) {
      $product_tabs = $this->default_value ?? [];
    }

    ?>
      <div class="wpt-customize-control-tabs">
        <input type="hidden" 
          class="product-tabs-value" 
          <?php $this->link(); ?> 
          id="<?php echo esc_attr( $input_id ); ?>" 
          name="<?php echo esc_attr( $input_id ); ?>"
          value='<?php echo esc_attr( $this->value() ); ?>'
        >
        <ul class="wpt-list"></ul>
        <div class="wpt-btn-add btn btn-custom"><?php echo __( 'Add tab', 'woo-product-tabs' ) ?></div>

        <!-- modal edit -->
        <div class="wpt-modal-edit modal-edit hide">
          <div class="content">
            <input type="hidden" class="wpt-modal-tab-id" name="wpt_modal_tab_id">
            <table>
              <tr>
                <td><?php echo __( 'Active', 'woo-product-tabs' ) ?></td>
                <td>
                  <div class="check">
                    <input class="wpt-modal-checkbox-active sr-only" id="wpt_modal_checkbox_active<?php echo $this->id ?>" type="checkbox">
                    <label for="wpt_modal_checkbox_active<?php echo $this->id ?>" class="icon icon-show">
                      <i class='bx bx-checkbox-square' ></i>
                    </label>
                    <label for="wpt_modal_checkbox_active<?php echo $this->id ?>" class="icon icon-vision">
                      <i class='bx bx-checkbox' ></i>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td><?php echo __( 'Active on mobile', 'woo-product-tabs' ) ?></td>
                <td>
                  <div class="check">
                    <input class="wpt-modal-checkbox-active-mobile sr-only" id="wpt_modal_checkbox_active_mobile<?php echo $this->id ?>" type="checkbox">
                    <label for="wpt_modal_checkbox_active_mobile<?php echo $this->id ?>" class="icon icon-show">
                      <i class='bx bx-checkbox-square' ></i>
                    </label>
                    <label for="wpt_modal_checkbox_active_mobile<?php echo $this->id ?>" class="icon icon-vision">
                      <i class='bx bx-checkbox' ></i>
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td><?php echo __( 'ID', 'woo-product-tabs' ) ?></td>
                <td>
                  <input type="text" name="wpt_modal_id" class="wpt-modal-id custom" disabled>
                </td>
              </tr>
              <tr>
                <td><?php echo __( 'Title', 'woo-product-tabs' ) ?></td>
                <td>
                  <input type="text" name="wpt_modal_title" class="wpt-modal-title custom">
                </td>
              </tr>
              <tr>
                <td><?php echo __( 'Icon', 'woo-product-tabs' ) ?></td>
                <td>
                  <div class="list-icon">
                    <span class="item-icon"><span class="icon"><i class='bx bxs-copy-alt' ></i></span></span>
                    <span class="item-icon"><span class="icon"><i class='bx bxs-copy-alt' ></i></span></span>
                    <span class="item-icon"><span class="icon"><i class='bx bxs-copy-alt' ></i></span></span>
                    <span class="item-icon"><span class="icon"><i class='bx bxs-copy-alt' ></i></span></span>
                    <span class="item-icon"><span class="icon"><i class='bx bxs-copy-alt' ></i></span></span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><?php echo __( 'Display conditions', 'woo-product-tabs' ) ?></td>
                <td>
                  <select name="wpt_modal_display" class="wpt-modal-display custom">
                    <option value="inherit" selected><?php echo __( 'Inherit', 'woo-product-tabs' ) ?></option>
                    <option value="always_show"><?php echo __( 'Always show', 'woo-product-tabs' ) ?></option>
                    <option value="rules"><?php echo __( 'Rules', 'woo-product-tabs' ) ?></option>
                  </select>
                </td>
              </tr>
            </table>

            <div class="btn btn-del"><i class='bx bx-x' ></i></div>
          </div>
        </div>

        <!-- modal edit -->
        <div class="wpt-modal-edit-child modal-edit hide">
          <div class="content">
            <input type="hidden" class="wpt-modal-tab-child-id" name="wpt_modal_tab_child_id">
            <div class="editor">
              <textarea name="wpt_modal_tab_child_content" class="wpt-modal-tab-child-content"></textarea>
            </div>
            <div class="btn btn-del"><i class='bx bx-x' ></i></div>
          </div>
        </div>
      </div>
    <?php

    // $this->customize_js();
  }

  public function customize_css() {
  }

  public function customize_js() {
  }
}