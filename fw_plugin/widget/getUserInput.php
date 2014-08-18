<?php
    $inputHandlerPath = plugins_url( 'inputHandler.js', __FILE__ );
    wp_enqueue_script('inputHandlerScript', $inputHandlerPath);

    echo '<select id="textType" onchange="changeInputFields(this.value)">
            <option value="Status">Status</option>
            <option value="Task">Task</option>
            <option value="Blog">Blog</option>
          </select>
          <br />

          <section id="wrap">
          <input id="input" type="text" placeholder="How are you feeling today?"></input>
          </section>

          <section id="result">
          </section>';

        wp_localize_script(
            'inputHandlerScript'
            , 'fwPluginUsers'
            , array('users' => get_users(),
                    'projectPages' => getProjectPages())
        );

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
?>