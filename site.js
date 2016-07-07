
//when enter is pressed, take input value and append a div below, and add x(button) on the right ----- maybe an edit button?

//when x is clicked, x is removed and the associated div is removed

//when start is pressed, ALL THE BELLOW

//take all  and put into a variable urls
var urls = [];

//close tabs of all urls

//block all the urls
 chrome.webRequest.onBeforeRequest.addListener(
        function(details) { return {cancel: true}; },
        {urls: urls},
        ["blocking"]);