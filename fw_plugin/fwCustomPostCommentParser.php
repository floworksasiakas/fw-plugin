<?php
	require_once('class-fwMagicWordReader.php');
	add_action('wp_insert_comment', 'parseComment', 99, 2);
	add_action('preprocess_comment', 'preprocessComment');

	/**
	 * Preprocesses the comment before saving it to the database:
	 * checks whether the comment has any 'magic words' and handles
	 * them accordingly.
	 */
	function preprocessComment($commentdata){
		$magicWordReader = new fwMagicWordReader();
		$commandsArray = $magicWordReader->getMagicWords();
		
		$content = $commentdata['comment_content'];
		$assignmentKeyword = $commandsArray['assignment'];
		$waitingKeyword = $commandsArray['waiting'];
		$doneKeyword = $commandsArray['done'];
		$inprogressKeyword = $commandsArray['in_progress'];
		
		$processedString = "";
		if (contains($content, $assignmentKeyword)){
			$processedString = processAssignmentContent($content, $assignmentKeyword);
		}

		if (contains($content, $doneKeyword)){
			$processedString = processTaskStatusContent($content, $doneKeyword, "green");
		} else if (contains($content, $inprogressKeyword)){
			$processedString = processTaskStatusContent($content, $inprogressKeyword, "yellow");
		} else if (contains($content, $waitingKeyword)){
			$processedString = processTaskStatusContent($content, $waitingKeyword, "red");
		}

		$commentdata['comment_content'] = $processedString;
		return $commentdata;
	}

	/**
	 * Formats the content text color with the given color
	 * and returns the formatted string containing style related HTML.
	 */
	function processTaskStatusContent($content, $keyWord, $color){
		$newstring = changeStyle($keyWord
							   , "color"
							   , $color);

		$finalstring = substr_replace($content
									  , $newstring
									  , strpos($content, $keyWord)
									  , strlen($keyWord));
		return $finalstring;
	}

	/**
	 * Formats the content properly if it contains 'assignment' magic word
	 * and returns the formatted string containing style related HTML.
	 */
	function processAssignmentContent($content, $assignmentKeyword){
		$wordsArray = explode(" ", $content);
		$personWord = "";

		for ($i = 0; $i < count($wordsArray); $i++){
			if ($wordsArray[$i] === $assignmentKeyword){
				if (count($wordsArray) > $i){
					$personWord = $wordsArray[$i+1];
				}
			}
		}

		$newstring = changeStyle($assignmentKeyword . " " . $personWord
								 , "color"
								 , "brown");

		$finalstring = substr_replace($content
									  , $newstring
									  , strpos($content, $assignmentKeyword)
									  , strlen($assignmentKeyword . " " . $personWord));
		return $finalstring;
	}

	/**
	 * Changes the given content's style attribute to the given value.
	 */
	function changeStyle($content, $attribute, $value){
		return "<b style='" . $attribute . ":" . $value . ";'> " . $content . " </b>";
	}

	/**
	 * Returns true if given string haystack contains given string needle,
	 * false otherwise.
	 */
	function contains($haystack, $needle){
		if (strpos($haystack, $needle) !== false) {
			return true;
		}
		return false;
	}

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

		if (contains($commentContent, $commandsArray['waiting'])){
			update_post_meta($postID, 'taskStatus', 1);
		} else if (contains($commentContent, $commandsArray['done'])){
			update_post_meta($postID, 'taskStatus', 3);
		} else if (contains($commentContent, $commandsArray['in_progress'])){
			update_post_meta($postID, 'taskStatus', 2);
		} else if (contains($commentContent, $commandsArray['assignment'])){
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
		$wordsArray = explode(" ", $commentContent);

		$person = "";
		for ($i = 0; $i < count($wordsArray); $i++){
			if ($wordsArray[$i] === $prefix){
				if (count($wordsArray) > $i){
					$person = $wordsArray[$i+1];
				}
			}
		}

		return $person;
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