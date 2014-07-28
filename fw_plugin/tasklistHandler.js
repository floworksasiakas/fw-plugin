$('document').ready(function(){
    $('#taskListReloadButton').on('click', function() {
        loadTaskList();
        $(this).prop("disabled", true)
               .css("background-color", "red");
    });
});


function loadTaskList() {

    tasksFetched = false;
    $('#tableWrapper').html('Fetching tasks...');
    fadeInResultText();
    
    var handler = new JRAHandler();
    handler.readAllPosts(function handleResponse(data){

        tasksFetched = true;
        var json = JSON.parse(data);
        traversePostIDs(json);

        $('#taskListReloadButton').prop("disabled", false)
                                  .css("background-color", "green");
    });
}

function traversePostIDs(json){
    var postIDs = [];
    var postContents = [];

    for(var i = 0; i < json.length; i++){
        postIDs[i] = json[i]['ID'];
        postContents[i] = json[i]['content'];
    }

    readMetaDatas(postIDs, postContents);
}

function readMetaDatas(postIDs, postContents){
    createTasklistTable();
    var handler = new JRAHandler();

    for(var i = 0; i < postIDs.length; i++){

        handler.readMeta(function handleResponse(response, index){
            var responseJSON = JSON.parse(JSON.stringify(response));
            
            var taskStatus;
            var taskPerson;
            if (getValue(responseJSON, "postType") == "task"){
                taskStatus = getValue(responseJSON, "taskStatus");
                taskPerson = getValue(responseJSON, "taskPerson");
            }

            addToTaskList(postContents[index], taskStatus, taskPerson);

        }, postIDs[i] + "/meta"
         , i);
    }
}

function getValue(json, key){
    for(var i = 0; i < json.length; i++){
        if (json[i]['key'] == key){
            return json[i]['value'];
        }
    }
    return null;
}

function createTasklistTable(){
    $('#tableWrapper').html("<table id='taskTable'></table>");
    $('#taskTable').append("<th>Task</th>"
                         + "<th>Person</th>"
                         + "<th>Waiting</th>"
                         + "<th>In Progress</th>"
                         + "<th>Completed</th>");
}

function addToTaskList(task, taskStatus, person){
    
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
}

var tasksFetched = false;
function fadeInResultText(){
    
    $( "#tableWrapper" ).animate({
        opacity: 0.5
    }, 1000, function() {
        fadeOutResultText();
    });
}

function fadeOutResultText(){
    
    $( "#tableWrapper" ).animate({
        opacity: 1
    }, 1000, function() {
        if (!tasksFetched)
            fadeInResultText();
    });
}
