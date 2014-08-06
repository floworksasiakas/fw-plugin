<?php
/**
 * @package FWPlugin
 * @version 1.0
 */
/*
Plugin Name: FloworksPlugin
Plugin URI: http://google.com
Description: This plugin allows users to create a project management environment.
Author: Code14 -team
Version: 1.0.0
Author URI: http://fw2.blogs.tamk.fi/projects/code14-project/
*/

// Register and load the widget
function fw_load_widget() {
    require_once('class-fwInputWidget.php');
    require_once('class-fwTasklistWidget.php');
    require_once('class-fwAlClientWidget.php');
    register_widget('fw_InputWidget');
    register_widget('fw_TasklistWidget');
    register_widget('fw_AlClientWidget');
}

function postPageEnqueue($hook) {
    if( 'post-new.php' != $hook )
        return;
    
    wp_enqueue_script('adminCreatePostScript', plugin_dir_url( __FILE__ ) . 'adminCreatePostHandler.js');
    wp_localize_script('adminCreatePostScript', 'fwPluginUsers', array( 'users' => get_users(), 'plugin_url' => plugins_url() ));
}

function enqueueNonAdminScripts() {
    if (!is_admin()) {
        wp_enqueue_script(
            'commentFieldHandler'
            , plugin_dir_url( __FILE__ ) . 'commentHandler.js'
            , array( 'jquery' )   
        );

        wp_enqueue_style(
            'jQueryUIStyle'
            , plugin_dir_url( __FILE__ ) . 'jquery-ui-1.11.0.custom/jquery-ui.min.css'
        );

        wp_enqueue_script(
            'jQuery'
            , plugin_dir_url( __FILE__ ) . 'jquery-ui-1.11.0.custom/external/jquery/jquery.js'
        );

        wp_enqueue_script(
            'jQueryUI'
            , plugin_dir_url( __FILE__ ) . 'jquery-ui-1.11.0.custom/jquery-ui.min.js'
        );

        wp_localize_script(
            'commentFieldHandler'
            , 'fwPlugin'
            , array( 'page' => basename(get_permalink())
                    , 'users' => get_users())
        );

        wp_enqueue_style( 
            'commentDropdownStyle'
            , plugin_dir_url( __FILE__ ) . 'commentDropDownStyle.css' 
        );

    }
}

require_once('adminCustomPostMetaBoxLogic.php');
require_once('fwCustomPostCommentParser.php');

add_action('admin_enqueue_scripts', 'postPageEnqueue');
add_action('widgets_init', 'fw_load_widget');
add_action('add_meta_boxes', 'myplugin_add_meta_box');
add_action('save_post', 'myplugin_save_meta_box_data');
add_action( 'wp_enqueue_scripts', 'enqueueNonAdminScripts' );

?>