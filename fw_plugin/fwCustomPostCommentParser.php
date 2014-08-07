<?php
	require_once('class-fwMagicWordReader.php');
	add_action('wp_insert_comment', 'parseComment', 99, 2);

	/**
	 * Parses the comment and handles it accordingly:
	 *   if comment starts with keyword for done action, updates
	 *   taskStatus field in the database with value 3 (done).
	 *
	 *   if comment starts with keyword for in_progress action,
	 *   updates taskStatus field in the database with value 2 (done).
	 *
	 *   if comment starts with keyword for assignment action,
	 *   first gets the ID from the given person and then updates the
	 *   taskPerson field in the database with that ID.
	 */
	function parseComment($commentID, $commentObject){
		$magicWordReader = new fwMagicWordReader();
		$commandsArray = $magicWordReader->getMagicWords();
		
		$postID = $commentObject->comment_post_ID;
		$commentContent = $commentObject->comment_content;

		if (startsWith($commentContent, $commandsArray['done'])){
			update_post_meta($postID, 'taskStatus', 3);
		} else if (startsWith($commentContent, $commandsArray['in_progress'])){
			update_post_meta($postID, 'taskStatus', 2);
		} else if (startsWith($commentContent, $commandsArray['assignment'])){
			$person = getPerson($commentContent, $commandsArray['assignment']);
			$id = getPersonId($person);
			update_post_meta($postID, 'taskPerson', $id);
		}
	}

	/**
	 * Gets the person string from the given string,
	 * stripping the given prefix away.
	 */
	function getPerson($commentContent, $prefix){
		return trim(substr($commentContent
					       , strrpos($commentContent, $prefix) + strlen($prefix)));
	}

	/**
	 * Returns the person ID with the given name from the database. 
	 */
	function getPersonId($person){
		$users = get_users();
		foreach ($users as $user){
			if ($user->user_nicename == $person){
				return $user->ID;
			}
		}
		return 0;
	}

	/**
	 * Returns true, if given string ($haystack) 
	 * starts with the given substring ($needle),
	 * false otherwise.
	 */
	function startsWith($haystack, $needle) {
	    return $needle === "" || strpos($haystack, $needle) === 0;
	}
?>