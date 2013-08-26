var timer = document.getElementById("time");

//TODO kill this
var options = {
    item: '<li><hr class="separator" /><h4 class="name"></h4><p class="id"></p></li>'
};

var values = [{id:0,name:'Oh God how did this get here'},
              {id:1,name:'I am not good with Internet'}];

var speakersList = new List('speakers-list', options, values);
var timerStarted = false;
var currentID = 1;
var defaultTime=30;
var remainingSeconds;

function addSpeaker() {
    var textbox = document.getElementById("namebox");
    var sent = textbox.value;
    //I needed an array, so I hacked one in
    speakersList.add({id: nextId(),name: sent});
    textbox.value='';
}

function removeNextSpeaker() {
    //list shouldn't get big enough that this becomes a problem
    //TODO make this into final MAX_COUNTRIES for readability / NK's expulsion
    //from U.N.
    var lowest=200;
    var items=speakersList.visibleItems;
    for(x in items)
       if(x<lowest)
           lowest=x;
    speakersList.remove("id", lowest);
}

function nextId() {
    currentID = currentID + 1;
    return currentID;
}

//This entire timer is a hack, gonna fix it
function setTimer() {
    if(!timerStarted) {
        var textbox = document.getElementById("timebox");
        defaultTime=textbox.value;
        timer.innerHTML=formatSeconds(defaultTime);
    }
    else {
        stopTimer();
        var textbox = document.getElementById("timebox");
        defaultTime=textbox.value;
        timer.innerHTML=formatSeconds(defaultTime);
    }
}


function startTimer() {
    console.log('starting timeout');

    if(!timerStarted){
        remainingSeconds=defaultTime;
        var why=setTimeout(recurseTime(),1000);
        timerStarted=true;
    }
    else
        stopTimer();
}

function stopTimer() {
    remainingSeconds=1;
}

function recurseTime() {
    remainingSeconds=remainingSeconds-1;
    timer.innerHTML=formatSeconds(remainingSeconds);
    if(remainingSeconds===0) {
        timerStarted=false;
        removeNextSpeaker();
        setTimer(defaultTime);
    }
    else
        var foo = setTimeout(function(){recurseTime()},1000);
}

//Just want to say, please don't string me up for rolling my own time format.
//I know how bad it is
//format is hh:mm:ss
function textToSeconds(textString){
    var arr=textString.split(":");
    var hours = arr[0];
    var mins = arr[1];
    var secs = arr[2];
    return parseInt((hours*60*60)+(mins*60)+secs);
}

//TODO refactor this into something sane
function formatSeconds(bigger){
    var minsecs = bigger%3600;
    var hours = checkTime((bigger-minsecs)/3600);
    var secs = checkTime(minsecs%60);
    var mins = checkTime((minsecs-secs)/60);
    return hours+":"+mins+":"+secs;
}

function checkTime(i)
{
    if (i<10)
          {
                i="0" + i;
                  }
    return i;
}

//JQuery Stuff
$(document).ready(function () {
	    $('input').typeahead({
	        name: 'countries',
	        local: ['United States of America', 'Democratic Peoples Republic of Korea', 'Mali']
	    });
	});

//Event Listener
document.getElementById("namebox").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) { addSpeaker(); }
}, false);
