var $ = jQuery;
$('document').ready(function(){
    attachEnterListener();
});

/**
 * Attaches enter listener to the input field to handle the given input.
 */
function attachEnterListener(){

    $('#input').bind("enterKey", function(e){
        postingStarted();
        checkPostType();
    });
    
    $('#input').keyup(function(e){
        if(e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });
}

/**
 * Checks the custom post's type and handles it accordingly.
 */
function checkPostType(){
    var type = $('#textType').val();
    var textContent = $('#input').val();
    var handler = new JRAHandler();

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
        handler.createBlogPost(postSuccessful
                                , textContent);
    }
}

/**
 * Called just before posting has started to indicate posting progress.
 */
function postingStarted(){
    postCreated = false;
    $('#result').html('Creating post...');
    inputHandlerFadeInResultText();
}

/**
 * Called after successfully inserting new post.
 * Refreshes the page immediately.
 */
function postSuccessful(){
    postCreated = true;
    $('#result').html('Post created!');
    $('#result').css('color', 'green');
    location.href = location.href;
}

/**
 * Variable used to indicate posting state.
 * True if post was created, false otherwise.
 */
var postCreated = false;

/**
 * Fades in the text indicating posting state.
 */
function inputHandlerFadeInResultText(){
    $( "#result" ).animate({
        opacity: 0.5
    }, 1000, function() {
        inputHandlerFadeOutResultText();
    });
}

/**
 * Fades out the text indicating posting state.
 */
function inputHandlerFadeOutResultText(){
    $( "#result" ).animate({
        opacity: 1
    }, 1000, function() {
        if (!postCreated)
            inputHandlerFadeInResultText();
    });
}

/**
 * Changes input fields based on the given type.
 */
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

/**
 * Changes the input fields to match task -type custom post.
 */
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

/**
 * Returns the user ID matching the given username.
 */
function getUserId(username){
    var json = JSON.parse(JSON.stringify(fwPluginUsers.users));
    for (var i = 0; i < json.length; i++){
        if (json[i]['data']['user_nicename'] == username){
            return json[i]['data']['ID'];
        }
    }
    return null;
}
