// window.onload = (event) => {
//   jQuery(document).ready(function ($) {
//   })
// };

jQuery(document).ready(function ($) {
  // wp.customize.panel('wpt_product_tabs_customize', function (panel) {
  //   console.log(panel)
  // })

  // var sections = wp.customize.panel('wpt_product_tabs_customize').sections()
  // console.log(sections)

  // var sections = wp.customize.panel('wpt_product_tabs_customize').sections()
  // console.log(sections)

  wp.customize( 'wpt_product_tabs_params[wpt_title_normal_color]', function( value ) {
    value.bind( function( newval ) {
      //Do stuff (newval variable contains your "new" setting data)
      console.log(newval)
    } );
    console.log(value)
  } );
})