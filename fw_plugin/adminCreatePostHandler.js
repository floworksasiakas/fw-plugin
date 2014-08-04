var $ = jQuery;

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