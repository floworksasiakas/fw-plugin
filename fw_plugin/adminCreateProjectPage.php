<?php
	createInterface();

	function createInterface(){
		echo '<h1>Create a new project page</h1><br />
				<h2>Project name</h2>
				<input type="text" id="projectName"></input>
				<h2>Collaborators</h2>
				<section id="collaboratorArea">
				<input type="button" name="addNewCollaborator" id="addNewCollaborator" value="Add new"></input><br />
				<section id="collaboratorFields">
				<input type="text" class="collaboratorField" name="collaborator1"></input>
				</section>
				</section>
				<input type="button" id="createProjectPage" value="Create the page!"></input>';
	}
?>