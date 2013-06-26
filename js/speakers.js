	$(document).ready(function () {
	    $('input').typeahead({
	        name: 'countries',
	        local: ['United States of America', 'Democratic Peoples Republic of Korea', 'Mali']
	    });
	});
	var options = {
	    item: '<li><hr class="separator" /><h4 class="name"></h4></li>'
	};

	var values = [{name:'Woowoowoo'}];

	var speakersList = new List('speakers-list', options, values);

	function sendName() {
	    var textbox = document.getElementById("namebox");
	    var sent = textbox.value;
	    speakersList.add({name: sent});
		textbox.value='';
	}