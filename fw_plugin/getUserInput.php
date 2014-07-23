<?php

echo '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
      <script src="wp-content/plugins/fw_plugin/inputHandler.js"></script>
      ';
      
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
?>