var $ = jQuery;
$('document').ready(function(){
	attachAutocomplete();
});

/**
 * Attaches autocomplete feature to comment section.
 */
function attachAutocomplete(){
	var userArray = fwPlugin.users;
	var nameArray = [];

	for (var i = 0; i < userArray.length; i++){
		nameArray[i] = fwPlugin.magicWords['assignment'] 
						+ " " 
						+ userArray[i]['data']['user_nicename'];
	}
	nameArray[nameArray.length] = fwPlugin.magicWords['waiting'];
	nameArray[nameArray.length] = fwPlugin.magicWords['in_progress'];
	nameArray[nameArray.length] = fwPlugin.magicWords['done'];

	$('#comment').autocomplete({
		source: nameArray
	});
}

/**
 * Returns true if data starts with str, false otherwise.
 */
function startsWith(data, str){
	return data.lastIndexOf(str, 0) === 0;
}