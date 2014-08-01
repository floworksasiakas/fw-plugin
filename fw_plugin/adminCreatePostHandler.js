var $ = jQuery;
$('document').ready(function(){
	//alert(fwPluginUsers.users[1]['data']['user_nicename']);
});

function changeInputFields(type){
    
    if (type == "Blog"){
        $('#wrap').html('<input id="input" type="text" placeholder="What\'s on your mind?"></input>');
    } else if (type == "Task"){

    } else if (type == "Status"){
        $('#wrap').html('<input id="input" type="text" placeholder="How are you feeling today?"></input>');
    }
}