$('document').ready(function(){
    $('#activityReloadButton').on('click', function() {
        $(this).prop("disabled", false)
               .css("background-color", "red");
        
    });
});


function loadPosts() {
	httpGetPosts("/wp-json/posts");
}

function loadComments() {
    httpGetComments("/wp-json/posts/0/comments");
}

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
        transformToTable(json);
        $('#activityReloadButton').prop("disabled", false)
                                  .css("background-color", "green");
    });
}

function resumeText(){
    $('#activityWrapper').css('opacity', '1');
}

var postsFetched = false;

function fadeInResultText(){
    $( "#activityWrapper" ).animate({
        opacity: 0.5
    }, 1000, function() {
        if (!postsFetched)
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

function transformToTable(json) {
    var elem = document.getElementById("activityWrapper");
    elem.innerHTML = "<dl>";
    
    for (var i = 0; i < 5; i++){
        if (json[i]['type'], "comment"){
            elem.innerHTML += "<dt>"
                           +  json[i]['title']
						   +  "</dt>"
						   +  "<dd>"
                           +  json[i]['content']
                           +  "</dd>";
        }
    }
    elem.innerHTML += "</dt>";
}
/*
function transformToTable(json) {
    var elem = document.getElementById("activityWrapper");
    elem.innerHTML = "<dl>";
    
    for (var i = 0; i < 5; i++){
        if (json[i]['type'], "comment"){
            elem.innerHTML += "<dt>"
                           +  json[i]['content']
						   +  "</dt>";
        }
    }
    elem.innerHTML += "</dl>";
}
*/