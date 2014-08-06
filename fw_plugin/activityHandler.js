$('document').ready(function(){
    $('#activityReloadButton').on('click', function() {
        $(this).prop("disabled", true)
               .css("background-color", "red");
        
    });
});


function loadPosts() {
	httpGet("?json_route=/posts/0/comments")
	httpGet("?json_route=/posts");
}

function loadComments() {
    httpGet("?json_route=/posts/0/comments");
}

function httpGet(theUrl) {
    postsFetched = false;
    $('#tableWrapper').html('Reloading Activity...');
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
    $('#tableWrapper').css('opacity', '1');
}

var postsFetched = false;
function fadeInResultText(){
    
    $( "#tableWrapper" ).animate({
        opacity: 0.5
    }, 1000, function() {
        if (!postsFetched)
            fadeOutResultText();
    });
}

function fadeOutResultText(){
    
    $( "#tableWrapper" ).animate({
        opacity: 1
    }, 1000, function() {
        if (!postsFetched)
            fadeInResultText();
    });
}

function transformToTable(json) {
    var elem = document.getElementById("tableWrapper");
    elem.innerHTML = "<dl>";
    
    for (var i = 0; i < 5; i++){
        if (json[i]['type'], "post"){
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

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
/*
function transformToTable(json) {
    var elem = document.getElementById("tableWrapper");
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