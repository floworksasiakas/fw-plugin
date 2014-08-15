var $ = jQuery;
$('document').ready(function(){
	var userArray = fwPlugin.users;
	var nameArray = [];

	for (var i = 0; i < userArray.length; i++){
		nameArray[i] = fwPlugin.users[i]['data']['user_nicename'];
	}

	$('#addNewCollaborator').click(function(event){
		var collaboratorCount = $('.collaboratorField').length;

		var appendHTML = "<br /><select class='collaboratorField'>";
		for (var i = 0; i < nameArray.length; i++){
			appendHTML += "<option value='" + nameArray[i] + "'>" + nameArray[i] + "</option>";
		}
		appendHTML += "</select>";
		$('#collaboratorFields').append(appendHTML);

		if ($('#deleteCollaborator').length === 0){
			$('#collaboratorArea').append("<input type='button' value='Delete collaborator' id='deleteCollaborator'></input>");
			$('#deleteCollaborator').click(deleteCollaborator);
		}
	});

	$('#createProjectPage').click(function(){
		var handler = new JRAHandler();
		var projectName = $('#projectName').val();
		var existingPage = $('#parentPageOption').val();
		var newlyCreatedPage = $('#parentPageField').val();
		var parentPage = 0;

		if (existingPage === 'none'){
			if (!(newlyCreatedPage === '')){
				parentPage = newlyCreatedPage;
			}
		} else {
			parentPage = existingPage;
		}

		createProjectPage(parentPage, projectName);
	});
});

function storeUserProjectMeta(pageID){
	var collaborators = document.getElementsByClassName('collaboratorField');
	var collaboratorNames = [];
	var projectName = $('#projectName').val();
	
	for (var i = 0; i < collaborators.length; i++){
		collaboratorNames[i] = collaborators[i].value;
	}

	var handler = new JRAHandler();
	// Get all user IDs that match the collaborator list.
	for (var i = 0; i < collaboratorNames.length; i++){
		handler.getUserID(function(userID){

			// When user IDs are found, update the user meta
			// with info about the newly created project page.
			handler.updateUserProjectMeta(userMetaUpdateSuccessfull
										  , projectName
										  , userID
										  , pageID);

		}, collaboratorNames[i]);
	}
}

function createProjectPage(parentPage, projectName){
	var handler = new JRAHandler();
	// Gets the page ID that matches the parentPage parameter.
	handler.getParentPageID(function(parentPageID){

		// When pageID has been found, create the project page.
		handler.createNewProjectPage(pageCreationSuccessfull
									, projectName
									, parentPageID);

	}, parentPage);
}

function userMetaUpdateSuccessfull(){
	alert('User metadata updated!');
}

function pageCreationSuccessfull(pageName){
	var handler = new JRAHandler();
	handler.getPageID(function(pageID){
		storeUserProjectMeta(pageID);
	}, pageName);
}

function deleteCollaborator(){
	var collaboratorCount = $('.collaboratorField').length;
	if (collaboratorCount > 1){
		if (collaboratorCount == 2){
			$('#deleteCollaborator').remove();
		}
		var lastCollField = $('.collaboratorField')[collaboratorCount-1];
		lastCollField.previousSibling.remove();
		lastCollField.remove();
	}
}