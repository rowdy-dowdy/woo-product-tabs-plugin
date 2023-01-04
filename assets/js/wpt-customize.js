jQuery(document).ready(function ($) {
  //! normal
  wp.customize( 'wpt_product_tabs_params[wpt_title_normal_font_size]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let links = tab.querySelectorAll('li:not(.active) a')
      links.forEach(link => {
        link.style.fontSize = val + 'px'
      })
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_title_normal_icon_font_size]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let icons = tab.querySelectorAll('li:not(.active) a i')
      icons.forEach(icon => {
        icon.style.fontSize = val + 'px'
      })
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_title_normal_color]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let links = tab.querySelectorAll('li:not(.active) a')
      links.forEach(link => {
        link.style.color = val
      })
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_title_normal_background_color]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let links = tab.querySelectorAll('li:not(.active) a')
      links.forEach(link => {
        link.style.backgroundColor = val
      })
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_title_normal_icon_color]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let icons = tab.querySelectorAll('li:not(.active) a i')
      icons.forEach(icon => {
        icon.style.color = val
      })
    } );
  } );

  //! active
  wp.customize( 'wpt_product_tabs_params[wpt_title_active_font_size]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let links = tab.querySelectorAll('li.active a')
      links.forEach(link => {
        link.style.fontSize = val + 'px'
      })
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_title_active_icon_font_size]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let icons = tab.querySelectorAll('li.active a i')
      icons.forEach(icon => {
        icon.style.fontSize = val + 'px'
      })
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_title_active_color]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let links = tab.querySelectorAll('li.active a')
      links.forEach(link => {
        link.style.color = val
      })
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_title_active_background_color]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let links = tab.querySelectorAll('li.active a')
      links.forEach(link => {
        link.style.backgroundColor = val
      })
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_title_active_icon_color]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab = wc_tabs_wrapper?.querySelector('.tabs')
      if (!tab) return

      let icons = tab.querySelectorAll('li.active a i')
      icons.forEach(icon => {
        icon.style.color = val
      })
    } );
  } );

  //! content
  wp.customize( 'wpt_product_tabs_params[wpt_content_color]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab_panels = wc_tabs_wrapper?.querySelector('.tab-panels')
      if (tab_panels)
        tab_panels.style.color = val
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_content_background_color]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let tab_panels = wc_tabs_wrapper?.querySelector('.tab-panels')
      if (tab_panels)
        tab_description.style.backgroundColor = val
    } );
  } );

  wp.customize( 'wpt_product_tabs_params[wpt_content_width]', function( value ) {
    value.bind( async ( val ) => {
      let wc_tabs_wrapper = document.querySelector('.wc-tabs-wrapper')
      let container = wc_tabs_wrapper?.closest('.container')
      if (!container) return

      if (val == "boxed") {

      }
      else if (val == "full_width") {

      }
      else {

      }
    } );
  } );
})