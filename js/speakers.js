document.getElementById("namebox").addEventListener("keydown", function(e) {
    if (!e) { var e = window.event; }
        // Enter is pressed
        if (e.keyCode == 13) { sendName(); }
    }, false);

	var options = {
        item: '<li><hr class="separator" /><h4 class="name"></h4></li>'
	};

	var values = [{name:'Clear this'}];

	var speakersList = new List('speakers-list', options, values);

	function sendName() {
	    var textbox = document.getElementById("namebox");
	    var sent = textbox.value;
	    speakersList.add({name: sent});
		textbox.value='';
	}

var timerStarted = false;

function startTimer() {
    window.timer = document.getElementById("time");
    window.content = timer.innerHTML;
    window.seconds = toSecs(content)+1;

    console.log(toSecs(content));
    console.log(toSecs(content)+1);
    console.log('starting timout');

    if(!timerStarted){
        var why=setTimeout(recurseTime(),1000);
        timerStarted=true;
    }

    window.alert("Done!");
}

function recurseTime() {
    window.seconds=seconds-1;
    window.timer.innerHTML=fromSecs(seconds);
    console.log(seconds);
    console.log(fromSecs(seconds));
    if(seconds!=0)
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
