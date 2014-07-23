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

            handler.createTask(postSuccessful
                              , $('#person').val()
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
        $('#wrap').html('<input id="person" type="text" placeholder="Person"></input><br /><input id="input" type="text" placeholder="Task name"></input>');
    } else if (type == "Status"){
        $('#wrap').html('<input id="input" type="text" placeholder="How are you feeling today?"></input>');
    }
    attachEnterListener();
}
