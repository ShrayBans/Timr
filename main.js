$(document).ready(function(){

	$('#siteInput').keyup(function(e){
		if(e.keyCode == 13){
	        $(this).trigger("enterKey");
		}
	});

	
	idUrlPairs = {};
	var storeArr = [];
	//
	$('#siteInput').bind("enterKey",function(e){
		var webInput = $(this).val();
		// check if it is a url and 
		if(isURL(webInput)===true){
			webInput = webInput.replace(/^www+\./, "");
			storeArr.push(webInput);
			$('#timerButton').attr("disabled", false);
			//if it is, append to container
	   		$('#siteContainer').append("<div class='enteredSite' align='center'>"+webInput+"</div>");

	   		$('.enteredSite').append("<button class='xButton'>X</button>");
	   		$(this).val('');
   		}
   		else{
   			alert("Please enter valid url");
   		}
	});

	//when click xButton, it closes the 
	$('body').on('click', '.xButton', function(){
		$(this).closest('div').remove();
	});

	$('#timerButton').on('click', function(){
		closeTabs(storeArr);
	});
	
});

function isURL(str) {
  var pattern = /(wwww\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return pattern.test(str);
}

function parseSites(arr){
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].replace(/www./, "")
		arr[i] = arr[i].replace(/www./, "")
		console.log(arr[i])
	}
	return arr;
}

function closeTabs(storeArr){
	//query all tabs
	
	chrome.tabs.query({}, function(tab){
		//check through the tabs
		for (var i = 0; i < tab.length; i++) {
			//check for matches from url store
			for (var j = 0; j < storeArr.length; j++) {
				if(tab[i].url.includes(storeArr[j])) {
						idUrlPairs[tab[i].url] = tab[i].id;
						chrome.tabs.remove(tab[i].id);
						break;
					}
			}
			// if()
			//add to an object
			// idUrlPairs[tab[i].url] = tab[i].id;
		}
	});

	// if(idUrlPairs[])

	//if match, find tabID and put in an array
	var tabIDArray;
	//if match, find urls and put in an array
	var urlArray;
	//removes based on tabID array
	
}

function reopenTabs(urlArray){
	console.log(urlArray);
	//iterates through array and creates each
	for(var i =0; i<urlArray.length ; i++){
	console.log(urlArray[0]);

	chrome.tabs.create({url: urlArray[i] } , function(){console.log("added" + urlArray[i])});
	}

}

// function save(str){
// 	chrome.storage.local.set({"urls": })
// }

// function load() {
//     var channels = "";
//     var keywords = "";
//     chrome.storage.local.get('channels', function (result) {
//         channels = result.channels;
//         alert(result.channels);
//         $("#channels").val(channels);
//     });


//     chrome.storage.local.get('keywords', function (result) {
//         keywords = result.keywords;
//         alert(result.keywords);
//         $("#keywords").val(keywords);
//     });

// } 