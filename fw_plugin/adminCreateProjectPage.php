<?php
	createInterface();

	function createInterface(){
		$pages = get_pages();
		
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
				or
				<input type="text" id="parentPageField"></input>
			<h2>Collaborators</h2>
			<section id="collaboratorArea">
			<input type="button" name="addNewCollaborator" id="addNewCollaborator" value="Add new"></input><br />
			<section id="collaboratorFields">
			<input type="text" class="collaboratorField" id="collaborator1"></input>
			</section>
			</section>
			<input type="button" id="createProjectPage" value="Create the page!"></input>';
	}
?>