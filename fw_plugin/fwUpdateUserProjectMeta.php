<?php
	require_once('../../../wp-config.php');
	
	if (isset($_GET['userID'])){

		$userID = $_GET['userID'];
		$pageTitle = $_GET['pageTitle'];
		$pageID = $_GET['pageID'];
		$projectsKey = 'projects';
		$projectsIDKey = 'projectIDs';

		//update_user_meta($userID, $projectsKey, $pageTitle);
		add_user_meta($userID, $projectsKey, $pageTitle);
		add_user_meta($userID, $projectsIDKey, $pageID);

	}
?>