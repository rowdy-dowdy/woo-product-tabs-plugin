let wptCustomizePanel = () => {
  let node = document.getElementById('customize-control-wpt_product_tabs_params-wpt_product_tabs')
  let child_node = node?.querySelector('.wpt-customize-control-tabs') || null

  wp.customize.previewer.bind( 'ready', function( message ) {
    if (node && child_node) {
      node.style.cursor = "initial"
      child_node.style.pointerEvents = "initial"
    }
  } )

  wp.customize( 'wpt_product_tabs_params[wpt_product_tabs]', function( value ) {
    value.bind( async ( val ) => {
      if (node && child_node) {
        node.style.cursor = "progress"
        child_node.style.pointerEvents = "none"
      }
    } );
  } );
}

jQuery(document).ready(function ($) {
  wptCustomizePanel()
})