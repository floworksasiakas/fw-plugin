<?php

echo '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>';

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
      </section>
      ';

      wp_localize_script('inputHandlerScript', 'fwPluginUsers', array( 'users' => get_users() ));
?>