var $ = jQuery;
$('document').ready(function(){
	var userArray = fwPlugin.users;
	var nameArray = [];

	$('#comment').keyup(function(event){
		word = $('#comment').val();
		
		if (startsWith(word, "!assign")){
			for (var i = 0; i < userArray.length; i++){
				nameArray[i] = "!assign " + userArray[i]['data']['user_nicename'];
			}
			$('#comment').autocomplete({
				source: nameArray
			});
		}
		checkWord(word);
	});

	
});

function checkWord(word){
	if (startsWith(word, "!assign")){
		
	}
}

function startsWith(data, str){
	return data.lastIndexOf(str, 0) === 0;
}