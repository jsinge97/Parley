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
    while(timer.textContent != 0:00:00)
    {
        setTimeout(1000);
        var arr = timer.textContent.split(":");
        window.alert(timer.textContent);
        timer.textContent = "0:00:00";
    }
}
//JQuery Stuff
$(document).ready(function () {
	    $('input').typeahead({
	        name: 'countries',
	        local: ['United States of America', 'Democratic Peoples Republic of Korea', 'Mali']
	    });
	});
