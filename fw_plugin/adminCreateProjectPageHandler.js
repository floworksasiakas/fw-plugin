var $ = jQuery;
$('document').ready(function(){
	$('#addNewCollaborator').click(function(event){
		var collaboratorCount = $('.collaboratorField').length;
		$('#collaboratorFields').append("<br /><input type='text' class='collaboratorField' value='" 
										+ collaboratorCount
										+ "'></input>");

		if ($('#deleteCollaborator').length === 0){
			$('#collaboratorArea').append("<input type='button' value='Delete collaborator' id='deleteCollaborator'></input>");
			$('#deleteCollaborator').click(deleteCollaborator);
		}
	});

	$('#createProjectPage').click(function(){
		var handler = new JRAHandler();
		handler.createNewPage(pageCreationSuccessfull, $('#projectName').val());
	});
});

function pageCreationSuccessfull(){

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