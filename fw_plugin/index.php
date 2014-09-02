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

/**
 * Includes and registers the custom widgets.
 */
function fw_load_widget() {
    require_once('widget/class-fwInputWidget.php');
    require_once('widget/class-fwTasklistWidget.php');
    require_once('widget/class-fwAlClientWidget.php');
    register_widget('fw_InputWidget');
    register_widget('fw_TasklistWidget');
    register_widget('fw_AlClientWidget');
}

/**
 * Enqueues the scripts and localizes the data needed for that script
 * in the corresponding admin side page.
 */
function postPageEnqueue($hook) {

    if('post-new.php' == $hook){
        wp_enqueue_script(
            'adminCreatePostScript'
            , plugin_dir_url( __FILE__ ) . 'admin/adminCreatePostHandler.js'
        );

        wp_localize_script(
            'adminCreatePostScript'
            , 'fwPluginUsers'
            , array( 'users' => get_users()
                   , 'plugin_url' => plugins_url()
                   , 'projectPages' => getProjectPages())
        );
    } else if ('toplevel_page_create-project-page' == $hook){
        wp_enqueue_script(
            'adminCreateProjectPageScript'
            , plugin_dir_url( __FILE__ ) . 'admin/adminCreateProjectPageHandler.js'
        );

        wp_enqueue_script(
            'JRAHandlerScript'
            , plugin_dir_url( __FILE__ ) . 'JRAHandler.js'
        );

        wp_localize_script(
            'JRAHandlerScript'
            , 'fwPluginUrl'
            , array('siteurl' => get_option('siteurl'))
        );

        wp_localize_script(
            'adminCreateProjectPageScript'
            , 'fwPlugin'
            , array('users' => get_users())
        );
    }
}

/**
 * Returns an array of pages that are project pages.
 */
function getProjectPages(){
    $pages = get_pages();
    $projectPageArray = array();

    for($i = 0; $i < count($pages); $i++){
        if ($pages[$i]->pageType === 'projectPage'){
            array_push($projectPageArray, $pages[$i]);
        }
    }

    return $projectPageArray;
}

/**
 * Includes all the files needed for using JQuery UI features.
 */
function includeJQueryUI(){
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
}

/**
 * Enqueues scripts and localizes data for them in the
 * non-admin side (used only for post commenting logic).
 */
function enqueueNonAdminScripts() {
    if (!is_admin()) {
        wp_enqueue_script(
            'commentFieldHandler'
            , plugin_dir_url( __FILE__ ) . 'comment/commentHandler.js'
            , array( 'jquery' )   
        );

        includeJQueryUI();
        
        $magicWordReader = new fwMagicWordReader();
        $magicWords = $magicWordReader->getMagicWords();
        wp_localize_script(
            'commentFieldHandler'
            , 'fwPlugin'
            , array('users' => get_users(),
                    'magicWords' => $magicWords)
        );
    }
}

/**
 * Callback function to create the menu for project page creation site.
 */
function fwPluginMenu() {
    add_menu_page( 'FW-Project-Page'
                   , 'Create a new project page'
                   , 'manage_options'
                   , 'create-project-page'
                   , 'createProjectPage'
                   , 'dashicons-hammer' );
}

/**
 * Checks if the current user has enough permissions and includes the
 * project page creation file.
 */
function createProjectPage() {
    if ( !current_user_can( 'manage_options' ) )  {
        wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
    }
    require_once('admin/adminCreateProjectPage.php');
}

require_once('admin/adminCustomPostMetaBoxLogic.php');
require_once('comment/fwCustomPostCommentParser.php');
require_once('comment/class-fwMagicWordReader.php');

add_action('admin_menu', 'fwPluginMenu');
add_action('admin_enqueue_scripts', 'postPageEnqueue');
add_action('widgets_init', 'fw_load_widget');
add_action('add_meta_boxes', 'myplugin_add_meta_box');
add_action('save_post', 'myplugin_save_meta_box_data');
add_action('wp_enqueue_scripts', 'enqueueNonAdminScripts');
?>