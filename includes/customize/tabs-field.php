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

  public function enqueue() {
    wp_enqueue_style( 'wpt-box-icon', VI_WOO_PRODUCT_TABS_CSS.'boxicons.min.css');
    wp_enqueue_style( 'wpt-tabs-field', VI_WOO_PRODUCT_TABS_CSS.'tabs_field.css');
    wp_enqueue_script( 'wpt-sortable', VI_WOO_PRODUCT_TABS_JS.'Sortable.min.js');
    // wp_enqueue_script( 'wpt-alpinejs', VI_WOO_PRODUCT_TABS_JS.'alpinejs.3.10.5.min.js');
    // wp_enqueue_script( 'wpt-immerjs', VI_WOO_PRODUCT_TABS_JS.'immer.min.js');

    wp_enqueue_script( 'wpt-tabs-customize', VI_WOO_PRODUCT_TABS_JS.'wpt-tabs-customize.js', array('wpt-sortable','wp-i18n'));
    wp_localize_script('wpt-tabs-customize', 'wpt_tabs_customize', [
      'data' => $this->value(),
      'localize' => [
        'custom_tab' => __('Custom tab', 'woo-product-tab'),
        'add_new' => __( 'Add new', 'woo-product-tabs' ),
        'nonce' => wp_create_nonce('wp_rest'),
        'customizeURL' => wp_customize_url(),
      ],
      'consumer_key'    => get_option('wpt_settings_consumer_key'),
      'consumer_secret' => get_option('wpt_settings_consumer_secret')
    ]);
	}

  // public function __construct( $manager, $id, $args = array() )
  // {
  //   parent::__construct( $manager, $id, $args = array() );
  //   // add_action( 'wp_head', array($this,'customize_css') );
  // }

  public function render_content() {
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
              <tbody>
                <tr>
                  <td><?php echo __( 'Active', 'woo-product-tabs' ) ?></td>
                  <td style="width: 232px;">
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
                      <span class="item-icon"><span class="icon">
                        <i class='bx bx-block' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bx-detail'></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bxs-detail' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bx-message-square-dots' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bxs-message-square-dots' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bx-info-circle' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bxs-info-circle' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bx-purchase-tag' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bxs-purchase-tag' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bx-map'></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bxs-map' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bx-share-alt' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bxs-share-alt' ></i>
                      </span></span>
                      <span class="item-icon"><span class="icon">
                        <i class='bx bxs-shapes' ></i>
                      </span></span>
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
                <tr style="height: 1rem;"></tr>
              </tbody>

              <tbody class="wpt-modal-rules hide">
                <tr><td colspan="2"><b><?php echo __('Rules') ?></b></td></tr>
                <tr>
                  <td><?php echo __( 'Product description', 'woo-product-tabs' ) ?></td>
                  <td>
                    <select name="wpt_modal_product_description" class="wpt-modal-product-description custom">
                      <option value="none" selected><?php echo __( 'None', 'woo-product-tabs' ) ?></option>
                      <option value="empty"><?php echo __( 'Empty', 'woo-product-tabs' ) ?></option>
                      <option value="not_empty"><?php echo __( 'Not empty', 'woo-product-tabs' ) ?></option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Product short description', 'woo-product-tabs' ) ?></td>
                  <td>
                    <select name="wpt_modal_product_short_description" class="wpt-modal-product-short-description custom">
                      <option value="none" selected><?php echo __( 'None', 'woo-product-tabs' ) ?></option>
                      <option value="empty"><?php echo __( 'Empty', 'woo-product-tabs' ) ?></option>
                      <option value="not_empty"><?php echo __( 'Not empty', 'woo-product-tabs' ) ?></option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Product type in (empty is all)', 'woo-product-tabs' ) ?></td>
                  <td>
                    <div 
                      class="wpt-input-api" 
                      data-url="<?php echo home_url('/wp-json/wpt/v1/product/types')?>"
                      data-title_key="name"
                      data-rule_key="product_type_in"
                    >
                      <input type="text" class="input-value sr-only">
                      <div class="input-quick-add">
                        <div class="list-add"></div>
                        <!-- <span class="icon-toggle"><i class='bx bx-chevron-down' ></i></span> -->
                      </div>
                      <div class="input-modal hide">
                        <!-- <input type="text" class="input-seach"> -->
                        <div class="search-list"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Is virtual', 'woo-product-tabs' ) ?></td>
                  <td>
                    <select name="wpt_modal_virtual" class="wpt-modal-virtual custom">
                      <option value="none" selected><?php echo __( 'None', 'woo-product-tabs' ) ?></option>
                      <option value="yes"><?php echo __( 'Yes', 'woo-product-tabs' ) ?></option>
                      <option value="no"><?php echo __( 'No', 'woo-product-tabs' ) ?></option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Is on sale', 'woo-product-tabs' ) ?></td>
                  <td>
                    <select name="wpt_modal_sale" class="wpt-modal-sale custom">
                      <option value="none" selected><?php echo __( 'None', 'woo-product-tabs' ) ?></option>
                      <option value="yes"><?php echo __( 'Yes', 'woo-product-tabs' ) ?></option>
                      <option value="no"><?php echo __( 'No', 'woo-product-tabs' ) ?></option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Stock in status', 'woo-product-tabs' ) ?></td>
                  <td>
                    <div 
                      class="wpt-input-api" 
                      data-url="<?php echo home_url('/wp-json/wpt/v1/product/stocks')?>"
                      data-title_key="name"
                      data-rule_key="stock_in_status"
                    >
                      <input type="text" class="input-value sr-only">
                      <div class="input-quick-add">
                        <div class="list-add"></div>
                        <!-- <span class="icon-toggle"><i class='bx bx-chevron-down' ></i></span> -->
                      </div>
                      <div class="input-modal hide">
                        <!-- <input type="text" class="input-seach"> -->
                        <div class="search-list"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Product in', 'woo-product-tabs' ) ?></td>
                  <td>
                    <div 
                      class="wpt-input-api" 
                      data-url="<?php echo home_url('/wp-json/wc/v3/products')?>"
                      data-title_key="name"
                      data-rule_key="product_in"
                    >
                      <input type="text" class="input-value sr-only">
                      <div class="input-quick-add">
                        <div class="list-add"></div>
                        <!-- <span class="icon-toggle"><i class='bx bx-chevron-down' ></i></span> -->
                      </div>
                      <div class="input-modal hide">
                        <!-- <input type="text" class="input-seach"> -->
                        <div class="search-list"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Product not in', 'woo-product-tabs' ) ?></td>
                  <td>
                    <div 
                      class="wpt-input-api" 
                      data-url="<?php echo home_url('/wp-json/wc/v3/products')?>"
                      data-title_key="name"
                      data-rule_key="product_not_in"
                    >
                      <input type="text" class="input-value sr-only">
                      <div class="input-quick-add">
                        <div class="list-add"></div>
                        <!-- <span class="icon-toggle"><i class='bx bx-chevron-down' ></i></span> -->
                      </div>
                      <div class="input-modal hide">
                        <!-- <input type="text" class="input-seach"> -->
                        <div class="search-list"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Category in', 'woo-product-tabs' ) ?></td>
                  <td>
                    <div 
                      class="wpt-input-api" 
                      data-url="<?php echo home_url('/wp-json/wc/v3/products/categories')?>"
                      data-title_key="name"
                      data-rule_key="category_in"
                    >
                      <input type="text" class="input-value sr-only">
                      <div class="input-quick-add">
                        <div class="list-add"></div>
                        <!-- <span class="icon-toggle"><i class='bx bx-chevron-down' ></i></span> -->
                      </div>
                      <div class="input-modal hide">
                        <!-- <input type="text" class="input-seach"> -->
                        <div class="search-list"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Category not in', 'woo-product-tabs' ) ?></td>
                  <td>
                    <div 
                      class="wpt-input-api" 
                      data-url="<?php echo home_url('/wp-json/wc/v3/products/categories')?>"
                      data-title_key="name"
                      data-rule_key="category_not_in"
                    >
                      <input type="text" class="input-value sr-only">
                      <div class="input-quick-add">
                        <div class="list-add"></div>
                        <!-- <span class="icon-toggle"><i class='bx bx-chevron-down' ></i></span> -->
                      </div>
                      <div class="input-modal hide">
                        <!-- <input type="text" class="input-seach"> -->
                        <div class="search-list"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Tag in', 'woo-product-tabs' ) ?></td>
                  <td>
                    <div 
                      class="wpt-input-api" 
                      data-url="<?php echo home_url('/wp-json/wc/v3/products/tags')?>"
                      data-title_key="name"
                      data-rule_key="tag_in"
                    >
                      <input type="text" class="input-value sr-only">
                      <div class="input-quick-add">
                        <div class="list-add"></div>
                        <!-- <span class="icon-toggle"><i class='bx bx-chevron-down' ></i></span> -->
                      </div>
                      <div class="input-modal hide">
                        <!-- <input type="text" class="input-seach"> -->
                        <div class="search-list"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><?php echo __( 'Tag not in', 'woo-product-tabs' ) ?></td>
                  <td>
                    <div 
                      class="wpt-input-api" 
                      data-url="<?php echo home_url('/wp-json/wc/v3/products/tags')?>"
                      data-title_key="name"
                      data-rule_key="tag_not_in"
                    >
                      <input type="text" class="input-value sr-only">
                      <div class="input-quick-add">
                        <div class="list-add"></div>
                        <!-- <span class="icon-toggle"><i class='bx bx-chevron-down' ></i></span> -->
                      </div>
                      <div class="input-modal hide">
                        <!-- <input type="text" class="input-seach"> -->
                        <div class="search-list"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="btn btn-del"><i class='bx bx-x' ></i></div>
          </div>
        </div>

        <!-- modal edit -->
        <div class="wpt-modal-edit-child modal-edit hide">
          <div class="content">
            <input type="hidden" class="wpt-modal-tab-child-id" name="wpt_modal_tab_child_id">
            <div class="editor">
              <textarea id="wpt_modal_tab_child_content" name="wpt_modal_tab_child_content" class="wpt-modal-tab-child-content"></textarea>
              <div class="wpt-btn-save-child-content btn btn-custom">Save</div>
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