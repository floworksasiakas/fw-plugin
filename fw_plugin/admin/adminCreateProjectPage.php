<?php
	createInterface();

	/** 
	 * Creates the interface used for project page creation.
	 */
	function createInterface(){
		$pages = get_pages();
		$users = get_users();
		
		echo '<h1>Create a new project page</h1><br />
				<h2>Project name</h2>
				<input type="text" id="projectName"></input>
				<h2>Parent page</h2>
					<select id="parentPageOption">';
		echo '<option value="none">none</option>';

		for($i = 0; $i < count($pages); $i++){
			echo '<option value="' . $pages[$i]->post_title . '">' . $pages[$i]->post_title . "</option>";
		}
		
		echo '</select>
			<h2>Collaborators</h2>
			<section id="collaboratorArea">
			<input type="button" name="addNewCollaborator" id="addNewCollaborator" value="Add new"></input><br />
			<section id="collaboratorFields">
			<select class="collaboratorField">';

		foreach($users as $user){
			echo '<option value"' . $user->data->user_nicename . '">' . $user->data->user_nicename . "</option>";
		}

		echo '</select>
			</section>
			</section>
			<input type="button" id="createProjectPage" value="Create the page!"></input>';
	}
?>