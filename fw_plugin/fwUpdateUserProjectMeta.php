<?php
	require_once('../../../wp-config.php');

	if (isset($_GET['userID'])){

		$userID = $_GET['userID'];
		$pageTitle = $_GET['pageTitle'];
		$projectsKey = 'projects';

		//update_user_meta($userID, $projectsKey, $pageTitle);
		add_user_meta($userID, $projectsKey, $pageTitle);
		$currentProjects = get_user_meta($userID);

		//echo $currentProjects['projects'];
		for($i = 0; $i < count($currentProjects['projects']); $i++){
			echo $currentProjects['projects'][$i] . "\n";
		}
	}
?>