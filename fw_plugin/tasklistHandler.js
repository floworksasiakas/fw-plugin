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
        transformToTable(json);
        $('#taskListReloadButton').prop("disabled", false)
                                  .css("background-color", "green");
    });
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

function transformToTable(json) {
    var elem = document.getElementById("tableWrapper");
    var resultTable = "<table>";
    
    for (var i = -1; i < json.length; i++){
        if (i == -1){
            resultTable += "<th>Task</th>"
                         + "<th>Person</th>"
                         + "<th>Waiting</th>"
                         + "<th>In Progress</th>"
                         + "<th>Completed</th>";
        } else {
            if (endsWith(json[i]['title'], "task")){
                var quoteRegEx = "&#8217;";
                var data = json[i]['title'].split(quoteRegEx);
                var person = data[0];

                resultTable    += "<tr>"
                               +  "<td>" + json[i]['content'] + "</td>"
                               +  "<td>" + person + "</td>"
                               +  "<td class='secondCol'>X</td>"
                               +  "<td class='thirdCol'></td>"
                               +  "<td class='fourthCol'></td>"
                               +  "</tr>";
            }
        }
    }
    resultTable += "</table>";
    elem.innerHTML = resultTable;
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

//loadTaskList();