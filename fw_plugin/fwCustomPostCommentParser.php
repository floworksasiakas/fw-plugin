<?php
	add_action('wp_insert_comment', 'parseComment', 99, 2);

	/**
	 * Available data from $commentObject:
	 * comment_ID
	 * comment_post_ID
	 * comment_author
	 * comment_author_email
	 * comment_author_url
	 * comment_author_IP
	 * comment_date
	 * comment_date_gmt
	 * comment_content
	 * comment_karma
	 * comment_approved
	 * comment_agent
	 * comment_type
	 * comment_parent
	 * user_id
	 */
	function parseComment($commentID, $commentObject){
		$commandsArray = getMagicWords();
		
		$postID = $commentObject->comment_post_ID;
		$commentContent = $commentObject->comment_content;

		if (startsWith($commentContent, $commandsArray['done'])){
			update_post_meta($postID, 'taskStatus', 3);
		} else if (startsWith($commentContent, $commandsArray['in_progress'])){
			update_post_meta($postID, 'taskStatus', 2);
		} else if (startsWith($commentContent, $commandsArray['assignment'])){
			$person = getPerson($commentContent, $commandsArray['assignment']);
			update_post_meta($postID, 'taskPerson', $person);
		}
	}

	function getPerson($commentContent, $prefix){
		return trim(substr($commentContent
					       , strrpos($commentContent, $prefix) + strlen($prefix)));
	}

	function startsWith($haystack, $needle) {
	    return $needle === "" || strpos($haystack, $needle) === 0;
	}

	function getMagicWords(){
		$data = file_get_contents(plugin_dir_url( __FILE__ ) . 'magicWords.txt');
		$commandsArray = explode("\n", $data);
		$finalArray = array();

		foreach($commandsArray as $line){
			$subData = explode(":", $line);
			$finalArray[trim($subData[0])] = trim($subData[1]);
		}

		return $finalArray;
	}
?>