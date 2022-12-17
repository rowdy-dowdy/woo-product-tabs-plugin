<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include_once ABSPATH . 'wp-includes/class-wp-customize-control.php';

class Color_Field_Custom_Control extends WP_Customize_Control {

  //The type of control being rendered
  public $type = 'color_field';
  public $parent;
  public $default_value;
  public $uniqid ;

  public function generate_uniqid() {
    $this->uniqid = uniqid('color_field_');
  }

  public function enqueue() {
    wp_enqueue_script( 'wpt-iro', VI_WOO_PRODUCT_TABS_JS.'iro@5.js');
	}

  // public function __construct( $manager, $id, $args = array() )
  // {
  //   parent::__construct( $manager, $id, $args = array() );
  //   // add_action( 'wp_head', array($this,'customize_css') );
  // }

  public function render_content() {
    $this->generate_uniqid();
    $input_id         = '_customize-input-' . $this->id;

    $this->customize_css();

    ?>
      <?php if( !empty( $this->label ) ) { ?>
        <label class="custom-control-title"><?php echo esc_html( $this->label ); ?></label>
      <?php } ?>
      <div class="custom-control-color" id="<?php echo esc_html($this->uniqid) ?>">
        <input type="hidden" name="<?php echo esc_attr( $input_id ); ?>" value="<?php echo esc_attr( $this->value() ); ?>">
        <div class="bg-color"></div>
        <div class="btn-color">Select color</div>
        <div class="box-picker" class="hide"></div>
      </div>
    <?php

    $this->customize_js();
  }

  public function customize_css() {
    ?>
      <style>
        .custom-control-title {
          color: #191e23;
          font-size: 14px;
          line-height: 1.75;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .custom-control-color {
          display: flex;
        }
        
        .custom-control-color .bg-color{
          width: 30px;
          height: 30px;
          background-color: #fff;
          border: 1px solid #ccc;
        }
        .custom-control-color .btn-color{
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 5px 10px;
          border-left: 0;
        }

        .custom-control-color .box-picker {
          position: fixed;
          top: 10px;
          left: 10px;
          background: #fff;
          padding: 1rem;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          border-radius: 5px;
          opacity: 1;
          visibility: visible;
          pointer-events: all;
          z-index: 999;
          transition: all .3s ease-in-out;
        }
        .custom-control-color .box-picker.hide {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
      </style>
    <?php
  }

  public function customize_js() {
    $input_id = '_customize-input-' . $this->id;
    ?>
      <script type="module">
        let wptColorParent = document.querySelector('#<?php echo esc_html($this->uniqid) ?>')
        let wptBtnHidden = wptColorParent.querySelector("input[name='<?php echo esc_attr( $input_id ); ?>']");
        let wptBgColor = wptColorParent.querySelector('.bg-color')
        let wptBtnColor = wptColorParent.querySelector('.btn-color')
        let wptBoxPicker = wptColorParent.querySelector('.box-picker')

        let wptPicker = new iro.ColorPicker("#<?php echo esc_html($this->uniqid) ?> .box-picker", {
          width: 250,
          color: "<?php echo $this->value() ? esc_attr( $this->value() ) : ($this->default_value ? $this->default_value : "rgb(255, 0, 0)") ?>",
          borderWidth: 1,
          borderColor: "#fff",
          layout: [
            {
              component: iro.ui.Box,
            },
            {
              component: iro.ui.Slider,
              options: {
                id: 'hue-slider',
                sliderType: 'hue'
              }
            }
          ]
        })

        wptPicker.on(['color:init', 'color:change'], function(color) {
          if (wptBgColor && wptBtnHidden) {
            wptBgColor.style.backgroundColor = color.hexString
            wptBtnHidden.value = color.hexString
          }
        })

        wptBtnColor.addEventListener('click', e => {
          e.stopPropagation()
          if (wptBoxPicker.classList.contains('hide') ) {
            let {y} = e.target.getBoundingClientRect();
            let heightBoxPicker = wptBoxPicker.offsetHeight

            if (y > heightBoxPicker) {
              wptBoxPicker.style.top = y - heightBoxPicker + 'px';
            }
            wptBoxPicker.classList.remove('hide')

            let wpt_parent_scroll = document.querySelector('.wp-full-overlay-sidebar-content')
            if (wpt_parent_scroll) {
              wpt_parent_scroll.style.overflow = 'hidden'
            }
          }
        })

        document.addEventListener('click', (event) => {
          const withinBoundaries = event.composedPath().includes(wptBoxPicker)

          if (!withinBoundaries) {
            wptBoxPicker.classList.add('hide')

            let wpt_parent_scroll = document.querySelector('.wp-full-overlay-sidebar-content')
            if (wpt_parent_scroll) {
              wpt_parent_scroll.style.overflow = null
            }
          } 
        })
      </script>
    <?php
  }
}