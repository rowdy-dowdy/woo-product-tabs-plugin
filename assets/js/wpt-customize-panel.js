let wptCustomizePanel = () => {
  let preview_body = null

  wp.customize.previewer.bind( 'ready', function( message ) {
    let iframe = document.querySelector('#customize-preview iframe')
    preview_body = iframe.contentWindow.document.body
    console.log('haha')
  } )

  let changeTabList = async (val) => {
    let wc_tabs = preview_body.querySelector('.wc-tabs')
    let tab_custom_tab = preview_body.querySelector('#tab-custom_tab')

    return new Promise((res) => {
      if (!wc_tabs || !tab_custom_tab) return
      
      let list_tab = JSON.parse(val || '[]') || []

      wc_tabs.innerHtml = ''
      // tab_custom_tab.innerHtml = ''
      list_tab.forEach(v => {
        
      })

      setTimeout(() => {
        res(true)
      }, 1000);
    })    
  }

  wp.customize( 'wpt_product_tabs_params[wpt_product_tabs]', function( value ) {
    value.bind( async ( val ) => {
      console.log('hihi')
      // if (!preview_body) return

      // preview_body.classList.add('wp-customizer-unloading')
      
      // await changeTabList(val)

      // preview_body.classList.remove('wp-customizer-unloading')
    } );
  } );
}

jQuery(document).ready(function ($) {
  wptCustomizePanel()
})