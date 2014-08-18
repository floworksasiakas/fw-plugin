var $ = jQuery;

/**
 * Changes input fields based on the given type.
 */
function changeInputFields(type){
	$('#metaWrapper').html("");

    if (type == "Blog"){
        //$('#metaWrapper').append('<input id="metaTextContent" name="metaTextContent" type="text" placeholder="What\'s on your mind?"></input>');
    } else if (type == "Task"){
    	changeToTaskType("#metaWrapper");
    } else if (type == "Status"){
        //$('#metaWrapper').append('<input id="metaTextContent" name="metaTextContent" type="text" placeholder="How are you feeling today?"></input>');
    }
}

/**
 * Changes the input fields to match task -type custom post.
 * The fields will be appended to the given html element ID.
 */
function changeToTaskType(id){
	var html = "Person <br /> <select name='taskPerson'>";
	var hidden = "";
	for (var i = 0; i < fwPluginUsers.users.length; i++){
		var userName = fwPluginUsers.users[i]['data']['user_nicename'];
		html += "<option value='" 
			 + userName 
			 + "'>" 
			 + userName 
			 + "</option>";
		hidden += "<input type='hidden' name='userID' value='" 
		       + fwPluginUsers.users[i]['data']['ID'] 
		       + "'></input>";
	}
	html += "</select>";
	html += hidden;
	$(id).append(html);
}