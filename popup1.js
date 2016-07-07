function closeTabs() {

}

function loadUrls() {
 
    // fetch urls from textarea and split it
    var urls = document.getElementById('urls')
        .value.split('\n');
 
    // run a loop on the fetched urls
    for (var i = 0; i < urls.length; i++) {
 
        // remove the white space from the url
        cleanUrl = urls[i].replace(/\s/g, '');
 
        // if user input valid urls then open pages
        if (cleanUrl != '') {
            chrome.tabs.create({
                "url": cleanUrl,
                "selected": false
            });
        }
 
        // if user input no url
        else {
            document.getElementById('urls')
                .innerHTML = "No value specified";
        }
    }
}

function storeUrls() {
	var urls = document.getElementById('urls').value.split('\n');
	var urlsTotal = "";
	for (var i = 0; i<urls.length; i++) {
		if (urls[i] != '') {
			urlsTotal = urlsTotal + urls[i] + "\n";
			localStorage['urls'] = urlsContainer;
		}
	}
}


function reopenUrls() {

}



function startTimer(, "timer") {

}

function secondAdd() {
{
	var currentTime = new Date();
	var m = currentTime.getMinutes();
	var s = currentTime.getSeconds();
	if (m<10) {
		m = "0"+m;
	}
	if (s<10) {
		s = "0"+s;
	}


	var myClock = document.getElementById('timer');
	myClock.innerText = m + ":" + s;
}
	setInterval('secondAdd()', 1000);
}

document.addEventListener('DOMContentLoaded', function() {
 
 
 
    // add an event listener to load url when button is clicked
    document.getElementById('sitebutton')
        .addEventListener('click', loadUrls);
 
    // add an event listener to save url when button is clicked
    document.getElementById('sitebutton')
        .addEventListener('click', storeUrls);
 
    // reload the urls in the browser
    var urls = localStorage['urls'];
    if (!urls) {
        return;
    }
    document.getElementById('urls')
        .value = urls;
 
 
});