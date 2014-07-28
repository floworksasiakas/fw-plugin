/**
 * Default constructor
 */
function JRAHandler(){
    this.rootPostsUrl = fwPluginUrl.siteurl + "/wp-json/posts";
	this.allPostsUrl = this.rootPostsUrl + "?filter[posts_per_page]=-1";
}

/**
 * Reads all posts of the WordPress page.
 * @param {Function} a callback function for result handling,
 * called when the request is done.
 */
JRAHandler.prototype.readAllPosts = function(callback){

	$.ajax({
        url: this.allPostsUrl
    }, 'json').done(function(data) {
    	callback(JSON.stringify(data));
    });

};

/**
 * Creates a task as a custom post with the given parameters.
 * @param {Function} a callback function for result handling,
 * called when the posting is done.
 * @param {String} the person assigned for the task.
 * @param {String} the task.
 */
JRAHandler.prototype.createTask = function(callback, person, task) {
	var title = person + "'s task";

    var taskStatus = {
        "key" : "taskStatus",
        "value" : 1
    }

    var postType = {
        "key" : "postType",
        "value" : "task"
    }

    var taskPerson = {
        "key" : "taskPerson",
        "value" : person
    }

    var postMetaData = [
        taskStatus,
        postType,
        taskPerson
    ]
            
    post = {
        "title" : title,
    	"content_raw" : task,
    	"status" : "publish",
        "post_meta" : postMetaData
    }

    this.ajaxPost(callback, post);
};

/**
 * Creates a status post as a custom post with the given text.
 * @param {Function} a callback function for result handling, 
 * called when the posting is done.
 * @param {String} the status text.
 */
JRAHandler.prototype.createStatusPost = function(callback, status){
	var title = "Status update";

	post = {
        "title" : title,
    	"content_raw" : status,
    	"status" : "publish"
    }

    this.ajaxPost(callback, post);
};

/**
 * Posts the given content to the JRA posts endpoint.
 * @param {Function} the callback function for result handling,
 * called when the request is done.
 * @param {Object} the content to be posted.
 */
JRAHandler.prototype.ajaxPost = function(callback, content){
	$.ajax({
        type: "POST",
        url: this.rootPostsUrl,
        data: JSON.stringify(content),
        cache: false
    }).done(function(data, text) {
    	callback();
    }).error(function(jqxhr, type, text){
        if (text == "Forbidden"){
            alert("You don't have the rights to do that :(");
        }
    });
};

/**
 * Reads the post's metadata from the given url.
 * @param {Function} the callback function for result handling.
 * @param {String} the url where the post's metadata will be read.
 * @param {Integer} the index of the post, used inside loops to remember
 * the index of the post, so it can be used later when callback gets called.
 */
JRAHandler.prototype.readMeta = function(callback, metaUrl, index){
    
    $.ajax({
        type: "GET",
        url: this.rootPostsUrl + "/" + metaUrl,
        cache: false
    }).done(function(response){
        callback(response, index);
    });
}