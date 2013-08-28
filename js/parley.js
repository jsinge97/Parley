
//TODO kill this
var options = {
    item: '<li><hr class="separator" /><h4 class="name"></h4><p class="id"></p></li>'
};

var values = [{id:0,name:'Oh God how did this get here'},
              {id:1,name:'I am not good with Internet'}];

var speakersList = new List('speakers-list', options, values);
var currentID = 1;
var defaultTime=30;
var timerPosition=0; //number of seconds the timer should display
var timeLeft=0; //number of seconds the timer should run, resets to this value after timeout
var timereg=^(([0-5])?\d:)?\d\d\s*$ //i had a problem, so I used a regex. now it's the next guy's problem

function init() {
	$('input').typeahead({name: 'countries', local: ['United States of America', 'Democratic Peoples Republic of Korea', 'Mali']});
    alert("we made it!");
}

function addSpeaker() {
    var input = document.getElementById("namebox");
    var sent = input.value;
    //I needed an array, so I hacked one in
    speakersList.add({id: nextId(), name: sent});
    input.value='';
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

var start = new Date().getTime(), elapsed = '0.0' ticking = false;

window.setInterval(function()
        {
            var time = new Date().getTime() - start;
            elapsed = Math.floor(time / 100) / 10;
            if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
        }, 100);

//Has to be able to accept "30" as 30 seconds and "1:30" as 90 seconds
function setTimer() {
    stopTimer();
    var input = $("#timebox").val();
    if(timereg.test(input))
        timeLeft = input;
    else
        alert("stahp"); //add a visual bell
}

function toggleTimer() {
   if(ticking)
       stopTimer();
   else
       startTimer();
}

function startTimer() {
    ticking = true;
    var begin = elapsed;
    console.log(begin);
    while(begin != (begin+timeLeft))
    {
       $( 
    }
}

function stopTimer() {
    ticking = false;
}

//Event Listener
document.getElementById("namebox").addEventListener(
        "keydown",
        function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) { addSpeaker(); }
}, false);

document.getElementById("timebox").addEventListener(
        "keydown",
        function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) { setTimer(); }
}, false);
