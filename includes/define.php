<?php

define( 'VI_WOO_PRODUCT_TABS_DIR', WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . "woo-product-tabs" . DIRECTORY_SEPARATOR );
define( 'VI_WOO_PRODUCT_TABS_ADMIN', VI_WOO_PRODUCT_TABS_DIR . "admin" . DIRECTORY_SEPARATOR );
define( 'VI_WOO_PRODUCT_TABS_FRONTEND', VI_WOO_PRODUCT_TABS_DIR . "frontend" . DIRECTORY_SEPARATOR );
define( 'VI_WOO_PRODUCT_TABS_LANGUAGES', VI_WOO_PRODUCT_TABS_DIR . "languages" . DIRECTORY_SEPARATOR );
define( 'VI_WOO_PRODUCT_TABS_INCLUDES', VI_WOO_PRODUCT_TABS_DIR . "includes" . DIRECTORY_SEPARATOR );
define( 'VI_WOO_PRODUCT_TABS_TEMPLATES', VI_WOO_PRODUCT_TABS_DIR . "templates" . DIRECTORY_SEPARATOR );
$plugin_url = plugins_url( '', __FILE__ );
$plugin_url = str_replace( '/includes', '', $plugin_url );
define( 'VI_WOO_PRODUCT_TABS_DIST', $plugin_url . "/dist/" );
define( 'VI_WOO_PRODUCT_TABS_BUILD', $plugin_url . "/build/" );
define( 'VI_WOO_PRODUCT_TABS_ASSETS', $plugin_url . "/assets/" );
define( 'VI_WOO_PRODUCT_TABS_ASSETS_DIR', VI_WOO_PRODUCT_TABS_DIR . "assets" . DIRECTORY_SEPARATOR  );
define( 'VI_WOO_PRODUCT_TABS_CSS', $plugin_url . "/assets/css/" );
define( 'VI_WOO_PRODUCT_TABS_CSS_DIR', VI_WOO_PRODUCT_TABS_DIR . "css" . DIRECTORY_SEPARATOR );
define( 'VI_WOO_PRODUCT_TABS_JS', $plugin_url . "/assets/js/" );
define( 'VI_WOO_PRODUCT_TABS_JS_DIR', VI_WOO_PRODUCT_TABS_DIR . "js" . DIRECTORY_SEPARATOR );
define( 'VI_WOO_PRODUCT_TABS_IMAGES', $plugin_url . "/assets/images/" );

/*Include functions file*/
if ( is_file( VI_WOO_PRODUCT_TABS_INCLUDES . "functions.php" ) ) {
	require_once VI_WOO_PRODUCT_TABS_INCLUDES . "functions.php";
}
if ( is_file( VI_WOO_PRODUCT_TABS_INCLUDES . "data.php" ) ) {
	require_once VI_WOO_PRODUCT_TABS_INCLUDES . "data.php";
}
// if ( is_file( VI_WOO_PRODUCT_TABS_INCLUDES . "support.php" ) ) {
// 	require_once VI_WOO_PRODUCT_TABS_INCLUDES . "support.php";
// }

vi_include_folder( VI_WOO_PRODUCT_TABS_ADMIN, 'VI_WOO_PRODUCT_TABS_Admin_' );
vi_include_folder( VI_WOO_PRODUCT_TABS_FRONTEND, 'VI_WOO_PRODUCT_TABS_Frontend_' );