<?php
    require_once("../../../wp-config.php");

    $msg = $_GET['msg'];
    $type = $_GET['type'];
    $person = $_GET['person'];
    
    if ($type == "Status"){
        handleStatus($msg);
    } else if ($type == "Task"){
        handleTask($msg, $person);
    } else if ($type == "Blog"){
        
    }
    
    function handleStatus($msg){
        $arr = get_all_category_ids();
        
        foreach ($arr as $item){
            echo $item;
        }
        /*
        global $user_ID;
    
        $new_post = array(
            'post_title' => 'Status',
            'post_content' => $msg,
            'post_status' => 'publish',
            'post_date' => date('Y-m-d H:i:s'),
            'post_author' => $user_ID,
            'post_type' => 'post',
            'post_category' => array(6)
        );
        
        $post_id = wp_insert_post($new_post, true);
        if ($post_id != 0){
            echo 'Post was successful!';
        }*/
    }
    
    function handleTask($msg, $person){
        
        $json = file_get_contents("tasks.json");
        $data = json_decode($json, true);
        
        $data[] = array('taskName' => $msg, 'person' => $person, 'status' => 1);
        $result=json_encode($data);
        
        file_put_contents("tasks.json", $result);
        
        if (startsWith($msg, "@@")){
            echo $msg;
        } else {
            echo 'New task created successfully!';
        }
    }
    
    function startsWith($haystack, $needle) {
        return $needle === "" || strpos($haystack, $needle) === 0;
    }
?>