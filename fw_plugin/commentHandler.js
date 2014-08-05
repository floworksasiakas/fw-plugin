var $ = jQuery;
$('document').ready(function(){
	var userArray = fwPlugin.users;
	
	$('#comment').keyup(function(event){
		word = $('#comment').val();

		for (var i = 0; i < userArray.length; i++){
			if (userArray[i]['data']['user_nicename'] == word){
				$('#comment').css("color", "red");
				break;
			} else {
				$('#comment').css("color", "black");
			}
		}
	});
});
