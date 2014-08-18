<?php
    echo '<button id="taskListReloadButton">Reload</button>
          <section id="tableWrapper"></section>';

    $tableStylePath = plugins_url( 'tableStyle.css', __FILE__ );
    $JRAHandlerPath = plugins_url( '../JRAHandler.js', __FILE__ );
    $tasklistHandlerPath = plugins_url( 'tasklistHandler.js', __FILE__ );

    wp_enqueue_style('tableStyleCss', $tableStylePath);
    wp_enqueue_script('JRAHandlerScript', $JRAHandlerPath);
    wp_enqueue_script('tasklistHandlerScript', $tasklistHandlerPath);

    $currentUserID = get_current_user_id();
    $projectIDs = get_user_meta($currentUserID, 'projectIDs');

    wp_localize_script(
    	'JRAHandlerScript'
    	, 'fwPluginUrl'
    	, array('siteurl' => get_option('siteurl')
                , 'currentUserProjectIDs' => $projectIDs
                , 'currentPageID' => get_the_ID()
                , 'isHomePage' => is_home())
    );
?>