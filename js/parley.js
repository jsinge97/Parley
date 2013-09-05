/*global List:true */
/*jshint devel:true*/

//TODO kill this
var options = {
    item: '<li><hr class="separator" /><h4 class="name"></h4><p class="id"></p></li>'
};

var values = [{id:0,name:'Oh God how did this get here'},
              {id:1,name:'I am not good with Internet'}];

var speakersList = new List('speakers-list', options, values);
var currentID = 1;
var timerPosition=0; //number of seconds the timer should display
var timeLeft=0; //number of seconds the timer should run, resets to this value after timeout
var timereg=/^(([0-5])?\d:)?\d\d\s*$/; //i had a problem, so I used a regex. now it's the next guy's problem

$(document).ready(function () {
    $('#namebox').typeahead({
        name: 'countries',
        local: ['United States of America', 'Democratic Peoples Republic of Korea', 'Mali']
    });
});

function nextId() {
    currentID = currentID + 1;
    return currentID;
}

function addSpeaker() {
    var sent = $("#namebox").val();
    //I needed an array, so I hacked one in
    speakersList.add({id: nextId(), name: sent});
    $("#namebox").val('');
}

function removeNextSpeaker() {
    //list shouldn't get big enough that this becomes a problem
    //TODO make this into final MAX_COUNTRIES for readability / NK's expulsion
    //from U.N.
    var lowest=200;
    var items=speakersList.visibleItems;
    for(var x in items) {
       if(x<lowest) {lowest=x;}
    }
    speakersList.remove("id", lowest);
}

function checkTime(i)
{
    if (i<10) {i="0" + i;}
    return i;
}

//format is hh:mm:ss
function textToSeconds(textString){
    var arr=textString.split(":");
    var hours = arr[0];
    var mins = arr[1];
    var secs = arr[2];
    return parseInt((hours*60*60)+(mins*60)+secs,10);
}

//TODO refactor this into something sane
function formatSeconds(bigger){
    var minsecs = bigger%3600;
    var hours = checkTime((bigger-minsecs)/3600);
    var secs = checkTime(minsecs%60);
    var mins = checkTime((minsecs-secs)/60);
    return hours+":"+mins+":"+secs;
}

var start = new Date().getTime();
var elapsed = '0.0';
var ticking = false;
var ticker;

function endTimer() {
    clearInterval(ticker);
    //flash the button
    //set the button to zero
    removeNextSpeaker();
    $("#time").html("00:00:00");
}

function startTimer() {
    if(timeLeft === 0) {return;}
    timerPosition = timeLeft;
    ticker = window.setInterval(function () {
        if(timerPosition > 0) {
            timerPosition = timerPosition - 1;
            console.log(timerPosition);
            //decrement the visual timer
            $("#time").html(formatSeconds(timerPosition));
        }
        else {
            endTimer();
        }
    },1000);
}

function stopTimer() {
}

function toggleTimer() {
   if(ticking) {
       stopTimer();
   }
   else {
       startTimer();
   }
}

//Has to be able to accept "30" as 30 seconds and "1:30" as 90 seconds
function setTimer() {
    stopTimer();
    var input = $("#timebox").val();
    if(timereg.test(input)) {
        timeLeft = input;
    }
    else {
        alert("stahp"); //add a visual bell
    }
    $("#timebox").val('');
    console.log("timeLeft: " + timeLeft);
    //change timer text here
    $("#time").html(formatSeconds(timeLeft));
}

//Event Listener
$("#namebox").on("keydown", function(event) {
    // Enter is pressed
    if (event.keyCode === 13) { addSpeaker(); }
});

$("#timebox").on("keydown", function(e) {
    // Enter is pressed
    if (e.keyCode === 13) { setTimer(); }
});

