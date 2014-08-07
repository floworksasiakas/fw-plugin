<?php
/**
 * Class used for reading the 'magic' command words into associative array.
 */
class fwMagicWordReader {

	/**
	 * Gets the data from magicWords.txt and returns an
	 * associative array with data to the left of ":" as keys
	 * and data to the right of ":" as values.
	 */
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
}
?>