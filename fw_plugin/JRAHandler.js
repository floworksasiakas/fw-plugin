/**
 * Default constructor, initializes the most commonly used urls.
 */
function JRAHandler(){
    this.rootUsersUrl = fwPluginUrl.siteurl + "/wp-json/users";
    this.rootPostsUrl = fwPluginUrl.siteurl + "/wp-json/posts";
	this.allPostsUrl = this.rootPostsUrl + "?filter[posts_per_page]=-1";
    this.rootPagesUrl = fwPluginUrl.siteurl + "/wp-json/pages";
    this.userProjectMetaUrl = fwPluginUrl.siteurl + "/wp-content/plugins/fw_plugin/fwUpdateUserProjectMeta.php";
}

/**
 * Creates a new page with metadata indicating it's a project page.
 * @param {Function} callback used for result handling.
 * @param {String} the page title.
 * @param {Integer} the page's parent page ID, 0 if it has no parent.
 */
JRAHandler.prototype.createNewProjectPage = function(callback, pageTitle, parentPageID){
    var pageType = {
        "key" : "pageType",
        "value" : "projectPage"
    };

    var postMeta = [
        pageType
    ];

    var post = {
        "title" : pageTitle,
        "type" : "page",
        "status" : "publish",
        "parent" : parentPageID,
        "post_meta" : postMeta
    };

    $.ajax({
        type: "POST",
        url: this.rootPostsUrl,
        data: JSON.stringify(post),
        cache: false
    }).done(function(data, text) {
        callback(pageTitle);
    }).error(function(jqxhr, type, text){
        if (text == "Forbidden"){
            alert("You don't have the rights to do that :(");
        }
    });
};

/**
 * Finds the page ID of the given page.
 * @param {Function} callback used for result handling.
 * @param {String} the page title.
 */
JRAHandler.prototype.getPageID = function(callback, pageName){
    $.ajax({
        url: this.rootPagesUrl
    }, 'json').done(function(data) {
        var responseJSON = JSON.parse(JSON.stringify(data));

        for (var i = 0; i < responseJSON.length; i++){
            if (responseJSON[i]['title'] == pageName){
                callback(responseJSON[i]['ID']);
            }
        }
    });
}

/**
 * Updates the given user's metadata with the given project page name and ID.
 * NOTE: This is the only function in the JRAHandler class that doesn't use
 * JSON REST API. This is because user metadata handling is not yet implemented
 * in the JRA. Instead this function uses a self made end point.
 * @param {Function} callback used for result handling.
 * @param {String} the page title.
 * @param {Integer} the user ID.
 * @param {Integer} the page ID.
 */
JRAHandler.prototype.updateUserProjectMeta = function(callback, pageTitle, userID, pageID){
    $.ajax({
        type: "GET",
        url: this.userProjectMetaUrl + "?pageTitle=" 
                                     + pageTitle 
                                     + "&userID=" 
                                     + userID
                                     + "&pageID="
                                     + pageID,
        cache: false
    }).done(function(data, text) {
        callback(data);
    }).error(function(jqxhr, type, text){
        if (text == "Forbidden"){
            alert("You don't have the rights to do that :(");
        }
    });
};

/**
 * Finds the user ID of the given user.
 * @param {Function} callback used for result handling.
 * @param {String} the username.
 */
JRAHandler.prototype.getUserID = function(callback, userName){
    $.ajax({
        type: "GET",
        url: this.rootUsersUrl,
        cache: false
    }).done(function(data, text) {
        var responseJSON = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < responseJSON.length; i++){
            if (responseJSON[i]['username'] == userName){
                callback(responseJSON[i]['ID']);
            }
        }
    }).error(function(jqxhr, type, text){
        if (text == "Forbidden"){
            alert("You don't have the rights to do that :(");
        }
    });
};

/**
 * Finds the pageID of the given page. This function is different
 * from the getPageID function in that the parentPage parameter can be
 * either a String or an Integer. But the only integer it can be is 0,
 * which indicates that the page doesn't have a parent page. Therefore,
 * callback gets called with 0.
 * @param {Function} callback for result handling.
 * @param {Integer} the ID of the parent page.
 */
JRAHandler.prototype.getParentPageID = function(callback, parentPage){
    var pagesJSON;

    if (parentPage === 0){
        callback(0);
    } else {
        $.ajax({
            url: this.rootPagesUrl
        }, 'json').done(function(data) {
            pagesJSON = JSON.parse(JSON.stringify(data));
            
            for (var i = 0; i < pagesJSON.length; i++){
                if (pagesJSON[i]['title'] === parentPage){
                    callback(pagesJSON[i]['ID']);
                }
            }
        });
    }
};

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
 * @param {Integer} the ID of the person.
 * @param {String} the task.
 * @param {String} the project page name.
 * @param {Integer} the project page ID.
 */
JRAHandler.prototype.createTask = function(callback, person, personID, task, project, projectID) {
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
        "value" : personID
    }

    var projectName = {
        "key" : "projectName",
        "value" : project
    }

    var projectIDMeta = {
        "key" : "projectID",
        "value" : projectID
    }

    var postMetaData = [
        taskStatus,
        postType,
        taskPerson,
        projectName,
        projectIDMeta
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
 * Creates a blog post as a custom post with the given text.
 * @param {Function} a callback function for result handling, 
 * called when the posting is done.
 * @param {String} the blog text.
 */
JRAHandler.prototype.createBlogPost = function(callback, blog){
    var title = "Blog post";

    post = {
        "title" : title,
        "content_raw" : blog,
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
};

/**
 * Reads the JSON REST API endpoint of the given user ID.
 * @param {Function} the callback function for result handling.
 * @param {Integer} the user ID.
 */
JRAHandler.prototype.readUsersUrl = function(callback, userID){
    $.ajax({
        type: "GET",
        url: this.rootUsersUrl + "/" + userID,
        cache: false
    }).done(function(response){
        callback(response);
    });
};