<?php
/**
 * Plugin Name: Hung for WooCommerce
 * Plugin URI: https://villatheme.com/extensions/woo-coupon-box/
 * Description: The easiest way to share your coupon code and grow your social followers at the same time. With Coupon Box for WooCommerce, your customers will see a popup that motivates them to follow your social profiles to get coupon code.
 * Version: 2.0.7
 * Author: VillaTheme
 * Author URI: http://villatheme.com
 * Text Domain: woo-coupon-box
 * Domain Path: /languages
 * Copyright 2017-2022 VillaTheme.com. All rights reserved.
 * Requires at least: 5.0
 * Tested up to: 6.1
 * WC requires at least: 4.8
 * WC tested up to: 7.1
 * Requires PHP: 7.0
 */

define( 'VI_WOO_PRODUCT_TABS_VERSION', '0.1.0' );

$init_file = WP_PLUGIN_DIR . DIRECTORY_SEPARATOR . "woo-product-tabs" . DIRECTORY_SEPARATOR . "includes" . DIRECTORY_SEPARATOR . "define.php";
// var_dump($init_file);
require_once $init_file;