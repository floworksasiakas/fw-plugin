/**
 * Default constructor
 */
function JRAHandler(){
    this.rootPostsUrl = "wp-json/posts";
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
            
    post = {
        "title" : title,
    	"content_raw" : task,
    	"status" : "publish"
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
    }).done(function(data, text) {
        alert(text);
    	callback();
        
    }).error(function(jqxhr, type, text){
        if (text == "Forbidden"){
            alert("You don't have the rights to do that :(");
        }
    });
};