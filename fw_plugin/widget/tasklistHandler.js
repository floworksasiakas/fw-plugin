var $ = jQuery;
$('document').ready(function(){
    
    /** 
     * Function to handle click on the reload button,
     * loads the task list and sets the button disabled
     * until the request is done.
     */
    $('#taskListReloadButton').on('click', function() {
        if (currentUserCanViewProject()){
            loadTaskList();
            $(this).prop("disabled", true)
                   .css("background-color", "red");
        } else {
            alert("User not authorized to view project");
        }
    });

    if (currentUserCanViewProject()){
        loadTaskList();
    }
});

/**
 * Returns true if the current user can view the project
 * page's tasklist, or if the current page is the site's
 * home page. Otherwise returns false.
 */
function currentUserCanViewProject(){
    if (fwPluginUrl.isHomePage){
        return true;
    }

    var userProjects = fwPluginUrl.currentUserProjectIDs;

    for (var i = 0; i < userProjects.length; i++){
        if (userProjects[i] == fwPluginUrl.currentPageID){
            return true;
        }
    }
    return false;
}

/**
 * Loads the task list
 */
function loadTaskList() {

    tasksFetched = false;
    $('#tableWrapper').html('Fetching tasks...');
    tasklistFadeInResultText();
    
    var handler = new JRAHandler();

    handler.readAllPosts(function handleResponse(data){

        tasksFetched = true;
        var json = JSON.parse(data);
        traversePostIDs(json);

        $('#taskListReloadButton').prop("disabled", false)
                                  .css("background-color", "green");
    });
}

/**
 * Maps the post IDs and contents from the json
 * response to arrays.
 */
function traversePostIDs(json){
    var postIDs = [];
    var postContents = [];

    for(var i = 0; i < json.length; i++){
        postIDs[i] = json[i]['ID'];
        postContents[i] = json[i]['content'];
    }

    readMetaDatas(postIDs, postContents);
}

/**
 * Reads the meta datas from the posts with the given
 * ID. Post contents are also needed to preserve the data
 * through ajax calls.
 */
function readMetaDatas(postIDs, postContents){
    createTasklistTable();
    var handler = new JRAHandler();

    for(var i = 0; i < postIDs.length; i++){

        handler.readMeta(function handleResponse(response, index){
            var responseJSON = JSON.parse(JSON.stringify(response));
            var taskStatus;
            var personID;
            var taskProjectID = getValue(responseJSON, "projectID");

            if (getValue(responseJSON, "postType") == "task"){
                if (fwPluginUrl.isHomePage && isUserTask(taskProjectID, fwPluginUrl.currentUserProjectIDs)){
                    taskStatus = getValue(responseJSON, "taskStatus");
                    personID = getValue(responseJSON, "taskPerson");
                    addToTaskList(postContents[index], taskStatus, personID);
                } else if (taskProjectID == fwPluginUrl.currentPageID){
                    taskStatus = getValue(responseJSON, "taskStatus");
                    personID = getValue(responseJSON, "taskPerson");
                    addToTaskList(postContents[index], taskStatus, personID);
                }
            }
        }, postIDs[i] + "/meta"
         , i);
    }
}

/**
 * Returns true if the given task belongs to a project
 * the current user belongs to. False otherwise.
 */
function isUserTask(taskProjectID, userProjectArray){
    for (var i = 0; i < userProjectArray.length; i++){
        if (taskProjectID == userProjectArray[i]){
            return true;
        }
    }
    return false;
}

/**
 * Gets the value from the given json, that matches the given key.
 */
function getValue(json, key){
    for(var i = 0; i < json.length; i++){
        if (json[i]['key'] == key){
            return json[i]['value'];
        }
    }
    return null;
}

/**
 * Creates the tasklist table and its headers.
 */
function createTasklistTable(){
    $('#tableWrapper').html("<table id='taskTable'></table>");
    $('#taskTable').append("<th>Task</th>"
                         + "<th>Person</th>"
                         + "<th>Waiting</th>"
                         + "<th>In Progress</th>"
                         + "<th>Completed</th>");
}

/**
 * Adds a task, task's status and the person (from the given personID) 
 * to the tasklist table.
 */
function addToTaskList(task, taskStatus, personID){
    
    var handler = new JRAHandler();
    handler.readUsersUrl(function handleResponse(response){
        var responseJSON = JSON.parse(JSON.stringify(response));
        var person = responseJSON["username"];

        if(taskStatus == 1){
            $('#taskTable').append('<tr><td>' + task + '</td>'
                                     + '<td>' + person + '</td>'
                                     + '<td class="secondCol">X</td>' 
                                     + '<td class="thirdCol"></td>'
                                     + '<td class="fourthCol"></td></tr>');
        } else if (taskStatus == 2){
            $('#taskTable').append('<tr><td>' + task + '</td>'
                                     + '<td>' + person + '</td>'
                                     + '<td class="secondCol"></td>' 
                                     + '<td class="thirdCol">X</td>'
                                     + '<td class="fourthCol"></td></tr>');
        } else if (taskStatus == 3){
            $('#taskTable').append('<tr><td>' + task + '</td>'
                                     + '<td>' + person + '</td>'
                                     + '<td class="secondCol"></td>' 
                                     + '<td class="thirdCol"></td>'
                                     + '<td class="fourthCol">X</td></tr>');
        }    
    }, personID);
    
}

/**
 * Variable used to indicate the state of tasklist request.
 * True if tasks are fetched, false otherwise.
 */
var tasksFetched = false;

/**
 * Fades in the text indicating the state of tasklist request.
 */
function tasklistFadeInResultText(){
    
    $( "#tableWrapper" ).animate({
        opacity: 0.5
    }, 1000, function() {
        tasklistFadeOutResultText();
    });
}

/**
 * Fades out the text indicating the state of tasklist request.
 */
function tasklistFadeOutResultText(){
    
    $( "#tableWrapper" ).animate({
        opacity: 1
    }, 1000, function() {
        if (!tasksFetched)
            tasklistFadeInResultText();
    });
}