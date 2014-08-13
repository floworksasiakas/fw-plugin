var $ = jQuery;
$('document').ready(function(){
	var userArray = fwPlugin.users;
	var nameArray = [];

	for (var i = 0; i < userArray.length; i++){
		nameArray[i] = fwPlugin.users[i]['data']['user_nicename'];
	}

	$('.collaboratorField').autocomplete({
		source: nameArray
	});

	$('#addNewCollaborator').click(function(event){
		var collaboratorCount = $('.collaboratorField').length;
		$('#collaboratorFields').append("<br /><input type='text' class='collaboratorField'></input>");

		$('.collaboratorField').autocomplete({
			source: nameArray
		});

		if ($('#deleteCollaborator').length === 0){
			$('#collaboratorArea').append("<input type='button' value='Delete collaborator' id='deleteCollaborator'></input>");
			$('#deleteCollaborator').click(deleteCollaborator);
		}
	});

	$('#createProjectPage').click(function(){
		var handler = new JRAHandler();
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

		var collaborators = document.getElementsByClassName('collaboratorField');
		
		handler.getPageID(function(pageID){
			handler.createNewProjectPage(pageCreationSuccessfull
									  , $('#projectName').val()
									  , pageID
									  , collaborators);
		}, parentPage);
		
	});
});

function pageCreationSuccessfull(){
	alert('Page created!');
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