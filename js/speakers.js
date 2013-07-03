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

function startTimer() {
    var timer = document.getElementById("time");
    var content = timer.innerHTML;
    var seconds = toSecs(content)
    do
    {
        setTimeout(decrement(seconds),1000);
        seconds--;
    }
    while(seconds != -1)
    window.alert("Done!");
}

function decrement(secs){
    var timer = document.getElementById("time");
    timer.innerHTML = fromSecs(secs);
}

function toSecs(big){
    var arr=big.split(":");
    var hours = arr[0];
    var mins = arr[1];
    var secs = arr[2];
    return (hours*60*60)+(mins*60)+secs;
}

function fromSecs(bigger){
    var minsecs = bigger%3600;
    var hours = (bigger-minsecs)/3600;
    var secs = minsecs%60;
    var mins = (minsecs-secs)/60
    return hours+":"+mins+":"+secs;
}

//JQuery Stuff
$(document).ready(function () {
	    $('input').typeahead({
	        name: 'countries',
	        local: ['United States of America', 'Democratic Peoples Republic of Korea', 'Mali']
	    });
	});
