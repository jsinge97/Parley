document.getElementById("namebox").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) { addSpeaker(); }
}, false);

var options = {
    item: '<li><hr class="separator" /><h4 class="name"></h4><p class="id"></p></li>'
};

var values = [{id:0,name:'Oh God how did this get here'},
              {id:1,name:'I am not good with Internet'}];

var speakersList = new List('speakers-list', options, values);

var timerStarted = false;

var id = 1;

function addSpeaker() {
    var textbox = document.getElementById("namebox");
    var sent = textbox.value;
    //I needed an array, so I hacked one in
    speakersList.add({id: nextId(),name: sent});
    textbox.value='';
}

function removeNextSpeaker() {
    //list shouldn't get big enough that this becomes a problem
    var lowest=200;
    var items=speakersList.visibleItems;
    for(x in items)
       if(x<lowest)
           lowest=x;
    speakersList.remove("id", lowest);
}

function nextId() {
    id = id + 1;
    return id;
}

function startTimer() {
    window.timer = document.getElementById("time");
    window.content = timer.innerHTML;
    window.seconds = toSecs(content);

    console.log(toSecs(content));
    console.log(toSecs(content)+1);
    console.log('starting timeout');

    if(!timerStarted){
        var why=setTimeout(recurseTime(),1000);
        timerStarted=true;
    }
}

function recurseTime() {
    window.seconds=window.seconds-1;
    window.timer.innerHTML=fromSecs(window.seconds);
    if(seconds===0)
        removeNextSpeaker();
    else
        var why =setTimeout(function(){recurseTime()},1000);
}


function toSecs(big){
    var arr=big.split(":");
    var hours = arr[0];
    var mins = arr[1];
    var secs = arr[2];
    return parseInt((hours*60*60)+(mins*60)+secs);
}

function fromSecs(bigger){
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
