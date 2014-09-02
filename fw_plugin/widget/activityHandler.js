$('document').ready(function(){

	/** 
     * Function to handle click on the posts reload button,
     * loads the recent posts and sets the button disabled
     * until the request is done.
     */
    $('#PostsReloadButton').on('click', function() {
        $(this).prop("disabled", true)
               .css("background-color", "red");
    });
    
    /** 
     * Function to handle click on the comments reload button,
     * loads the recent comments and sets the button disabled
     * until the request is done.
     */
    $('#CommentsReloadButton').on('click', function() {
        $(this).prop("disabled", true)
               .css("background-color", "red");
    });
    
    /**
     * Loads recent posts to show first. 
     */
    loadPosts();
});

/**
 * Get posts from json.
 */
function loadPosts() {
	httpGetPosts("/wp-json/posts");
}

/**
 * Get comments from json.
 */
function loadComments() {
    httpGetComments("/wp-json/posts/0/comments");
}

/**
 * Loads posts.
 */
function httpGetPosts(theUrl) {
    postsFetched = false;
    $('#activityWrapper').html('Reloading Activity...');
    fadeInResultText();
    
    var jqxhr = $.ajax({
        url: theUrl
    }, 'json').done(function(data, text) {
        postsFetched = true;
        resumeText();
        var json = JSON.parse(JSON.stringify(data));
        transformToTable(json);
        $('#PostsReloadButton').prop("disabled", false)
                                  .css("background-color", "green");
    });
}

/**
 * Loads comments.
 */
function httpGetComments(theUrl) {
    postsFetched = false;
    $('#activityWrapper').html('Reloading Activity...');
    fadeInResultText();
    
    var jqxhr = $.ajax({
        url: theUrl
    }, 'json').done(function(data, text) {
        postsFetched = true;
        resumeText();
        var json = JSON.parse(JSON.stringify(data));
        transformComsToTable(json);
        $('#CommentsReloadButton').prop("disabled", false)
                                  .css("background-color", "green");
    });
}

/**
 * Transforms json-data from posts to table and prints the relevant info.
 */
function transformToTable(json) {
    var elem = document.getElementById("activityWrapper");
    elem.innerHTML = "<dl>";
    
    for (var i = 0; i < 5; i++){
            elem.innerHTML += "<dt>"
                           +  json[i]['title']
						   +  "</dt>"
						   +  "<dd>"
                           +  json[i]['content']
                           +  "</dd>";
    }
    elem.innerHTML += "</dl>";
}

/**
 * Transforms json-data from comments to table and prints the relevant info.
 */
function transformComsToTable(json) {
    var elem = document.getElementById("activityWrapper");
    elem.innerHTML = "<dl>";
    
    for (var i = 0; i < 5; i++){
            elem.innerHTML += "<dt>"
            			   + "Comment on post "
            			   +  json[i]['post']
            			   + "<br>"
						   +  "</dt>"
						   +  "<dd>"
                           +  json[i]['content']
                           +  "</dd>";
    }
    elem.innerHTML += "</dl>";
}

function resumeText(){
    $('#activityWrapper').css('opacity', '1');
}

var postsFetched = false;

/**
 * Fades in and out the text indicating the state of activity-request.
 */
function fadeInResultText(){
    $( "#activityWrapper" ).animate({
        opacity: 0.5
    }, 1000, function() {
            fadeOutResultText();
    });
}

function fadeOutResultText(){
    
    $( "#activityWrapper" ).animate({
        opacity: 1
    }, 1000, function() {
        if (!postsFetched)
            fadeInResultText();
    });
}
