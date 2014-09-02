<?php
    echo '
    <button id="PostsReloadButton" onclick="loadPosts()" style="width:95%;">Recent 			Posts</button>
    <button id="CommentsReloadButton" onclick="loadComments()" style="width:95%;">Recent Comments</button>
    <section id="activityWrapper"></section>';
          
    $activityHandlerPath = plugins_url( 'activityHandler.js', __FILE__ );

    wp_enqueue_script('activityHandlerScript', $activityHandlerPath);

    wp_localize_script(
        'activityHandlerScript'
		, 'fwPluginUrl'
    	, array('siteurl' => get_option('siteurl'))
    );
?>