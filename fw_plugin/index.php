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

function printContent(){
    echo '
        
        <h1> Create a new project page! </h1>
        <form id="dbConf" method="post" action="../wp-content/plugins/fw_plugin/createPage.php">
            <p> Page name 
            <br/>
            <input type="text" id="page">
            </input>
            <br />
            <input type="submit" name="sub" />
        </form>
        
        <div id="result"> </div>
        
        <h1>Create test post</h1>
        <textarea id="test_content"></textarea> 
        <br />
        <input type="button" onclick="createPost()" value="Create test post"></input>
        <section id="result"></section>
        
        ';
    
    foreach((get_the_category()) as $category) { 
        echo $category->cat_name . ' '; 
    }
}

function createSomething(){
    add_submenu_page(
          'options-general.php'
        , 'Create a new Project Page' 
        , 'Create a new Project Page'
        , 'manage_options'
        , 'project-creation-page'
        , 'printContent'
    );
}

// Register and load the widget
function fw_load_widget() {
    require_once('class-fwInputWidget.php');
    require_once('class-fwTasklistWidget.php');
    require_once('class-fwAlClientWidget.php');
<<<<<<< HEAD
    register_widget('fw_InputWidget');
    register_widget('fw_TasklistWidget');
    register_widget('fw_AlClientWidget');
}

function customPostInit(){
    $args = array(
        'label' => 'Create Custom Post',
        'public' => true,
        'show_ui' => true,
        'capability_type' => 'post',
        'hierarchical' => false,
        'rewrite' => array('slug' => 'custom-posts'),
        'query_var' => true,
        'menu_icon' => 'dashicons-welcome-write-blog',
        'supports' => array(
            'type',
            'author',
            'editor',
            'custom-fields',
            'comments',
            'revisions',
            'thumbnail')
        );
    register_post_type('custom-posts', $args);
=======
    register_widget( 'fw_InputWidget' );
    register_widget('fw_TasklistWidget');
    register_widget('fw_AlClientWidget');
>>>>>>> origin/master
}
    
add_action( 'widgets_init', 'fw_load_widget' );
add_action('admin_menu','createSomething');
add_action('init', 'customPostInit');
?>