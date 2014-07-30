$('document').ready(function(){
    attachEnterListener();
});

function attachEnterListener(){

    $('#input').bind("enterKey", function(e){
        var type = $('#textType').val();
        var textContent = $('#input').val();
        
        var handler = new JRAHandler();
        postingStarted();

        if (type == "Status"){

            handler.createStatusPost(postSuccessful
                                    , textContent);
        } else if (type == "Task"){
            var person = $('#person').val();
            handler.createTask(postSuccessful
                              , person
                              , getUserId(person)
                              , textContent);
        
        } else if (type == "Blog"){
            
        }
    });
    
    $('#input').keyup(function(e){
        if(e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
}

function postingStarted(){
    postCreated = false;
    $('#result').html('Creating post...');
    fadeInResultText();
}

function postSuccessful(){
    postCreated = true;
    $('#result').html('Post created!');
    $('#result').css('color', 'green');
    location.href=location.href
}

var postCreated = false;
function fadeInResultText(){
    $( "#result" ).animate({
        opacity: 0.5
    }, 1000, function() {
        fadeOutResultText();
    });
}

function fadeOutResultText(){
    $( "#result" ).animate({
        opacity: 1
    }, 1000, function() {
        if (!postCreated)
            fadeInResultText();
    });
}

function changeInputFields(type){
    $('#wrap').html("");
    
    if (type == "Blog"){
        $('#wrap').html('<input id="input" type="text" placeholder="What\'s on your mind?"></input>');
    } else if (type == "Task"){
        changeToTaskInput();
    } else if (type == "Status"){
        $('#wrap').html('<input id="input" type="text" placeholder="How are you feeling today?"></input>');
    }
    attachEnterListener();
}

function changeToTaskInput(){
    var json = JSON.parse(JSON.stringify(fwPluginUsers.users));
    var resultHTML = "Person <br /> <select id='person'>";
    for (var i = 0; i < json.length; i++){
        var user = json[i]['data']['user_nicename'];
        resultHTML += "<option value='" + user + "'>" + user + "</option>";
    }
    resultHTML += "</select><br />";

    resultHTML += "Task: <br /> <input id='input' type='text'></input>";

    $('#wrap').html(resultHTML);
}

function getUserId(username){
    var json = JSON.parse(JSON.stringify(fwPluginUsers.users));
    for (var i = 0; i < json.length; i++){
        if (json[i]['data']['user_nicename'] == username){
            return json[i]['data']['ID'];
        }
    }
    return null;
}
