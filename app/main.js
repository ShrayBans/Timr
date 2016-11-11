var $;
var chrome;
var storeArr = [];
var bg = chrome.extension.getBackgroundPage();

$(document).ready(function() {

	// finds last checked and makes it current
	chrome.storage.local.get('checked', function(data) {
		$('#checkbox').prop('checked', data.checked);
	});

	// on checkbox click, it will store it as true/false
	$('body').on('click', '#checkbox', function() {
		if($('#checkbox').prop('checked') === true) {
			chrome.storage.local.set({ checked: true });
		} else {
			chrome.storage.local.set({ checked: false });
		}
	});

	$('#siteInput').keyup(function(e) {
		if(e.keyCode == 13) $(this).trigger('enterKey');
	});

	chrome.storage.local.get('storage', function(data) {
		for (var i = 0; i < data.storage.length; i++) {
			storeArr.push(data.storage[i]);
			siteEnter(data.storage[i]);
		}
	});

	// adds a site if url is true (on enter)
	$('#siteInput').bind('enterKey', function(e) {

		var webInput = $(this).val();
		// check if it is a url and
		if(isURL(webInput) === true) {
			webInput = webInput.replace(/^www+\./, '');
			storeArr.push(webInput);
			chrome.storage.local.set({ storage: storeArr });
			siteEnter(webInput);
		}
		else alert('Please enter valid url.');
	});

	// when click xButton, it removes the entire div
	$('body').on('click', '.xButton', function(){
		var webURL = $(this).closest('.enteredSite').find('.site').data('website');
		$(this).closest('.enteredSite').remove();

		// removes the site from the array and stores it to local storage
		removeSite(storeArr, webURL);
		chrome.storage.local.set({ storage: storeArr });

		// disables site if there are no urls, but people could just use this as timer
		// if($('.enteredSite').length === 0) $('#timerButton').attr('disabled', true);
	});

	$('#timerButton').on('click', function(){
		closeTabs(storeArr);
	});

});




function siteEnter(webInput) {
	$('#timerButton').attr('disabled', false);
	//if it is, append to container
	$('#siteContainer').append("<div class='enteredSite' align='center'><div class ='site' data-website="+webInput+">"+webInput+"</div></div>");
	$('.enteredSite').append("<button class='xButton'><span class=' xBut'>X</span></button>");
	$('#siteInput').val('');
}

function removeSite(array, input){
	var index = array.indexOf(input);
	if (index > -1) {
		array.splice(index, 1);
	}
}

function isURL(str) {
	var pattern = /(wwww\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
	return pattern.test(str);
}

function closeTabs(storeArr){
	//query all tabs
	chrome.tabs.query({}, function(tab) {
		//check through the tabs
		for (var i = 0; i < tab.length; i++) {
			//check for matches from url store
			for (var j = 0; j < storeArr.length; j++) {
				if(tab[i].url.includes(storeArr[j])) {
					bg.idUrlPairs[tab[i].url] = tab[i].id;
					chrome.tabs.remove(tab[i].id);
					break;
				}
			}
		}
	});
}

function reopenTabs(urlArray){
	//iterates through array and creates each
	for (var i = 0; i < urlArray.length; i++) {
		if (urlArray[i] === "https://www.makersquare.com/") urlArray[i] = "https://www.codesmith.io/";
		chrome.tabs.create({ url: urlArray[i] }, function(){ console.log("Added" + urlArray[i]) });
	}
}
