
//TODO kill this
var options = {
    item: '<li><hr class="separator" /><h4 class="name"></h4><p class="id"></p></li>'
};

var values = [{id:0,name:'Oh God how did this get here'},
              {id:1,name:'I am not good with Internet'}];

var speakersList = new List('speakers-list', options, values);
var currentID = 1;
var defaultTime=30;

$(document).ready(function () {
	    $('input').typeahead({
	        name: 'countries',
	        local: ['United States of America', 'Democratic Peoples Republic of Korea', 'Mali']
	    });
	});

function addSpeaker() {
    var sent = $('namebox').value;
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
}

function toggleTimer() {
    
}

function startTimer() {
}

function stopTimer() {
}

//Event Listener
$(document).getElementById("namebox").addEventListener(
        "keydown",
        function(e) {
    if (!e) { var e = window.event; }
    // Enter is pressed
    if (e.keyCode == 13) { addSpeaker(); }
}, false);
