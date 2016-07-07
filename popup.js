/*

Open Multiple Websites, a Google Chrome extension that lets you open 
your frequently visted website(s) with a single click

And not just that, it also remember your last opened links 
by storing your urls in chrome storage

Date Created: 27th June, 2015

*/

// open pages in new tabs
function loadUrls() {
  
  // fetch urls from textarea and split it
  var urls = document.getElementById('urls').value.split('\n');
 
    // run a loop on the fetched urls
    for(var i=0; i<urls.length; i++){

      // remove the white space from the url
      cleanUrl = urls[i].replace(/\s/g, '');

      // if user input valid urls then open pages
      if(cleanUrl != '') {
         chrome.tabs.create({"url": cleanUrl, "selected": false}); 
      }
     
      // if user input no url
      else {
         document.getElementById('urls').innerHTML = "No value specified";
      }
    }
}

// Save url in chrome storage
function saveUrls() {
    
    // Fetch urls from textarea and split it
    var urls = document.getElementById('urls').value.split('\n');
    
    var urlsContainer = "";
    
    // run a loop on the fetched urls
    for (i=0; i<urls.length; i++) {


      // if the user input valid urls, save it in local chrome storage
      if(urls[i] != ' ') {
         
         urlsContainer += urls[i] + '\n';
         localStorage['urls'] = urlsContainer;

      }
    }
 }
  

document.addEventListener('DOMContentLoaded', function () {


  
  // add an event listener to load url when button is clicked
  document.getElementById('button').addEventListener('click', loadUrls);
  
  // add an event listener to save url when button is clicked
  document.getElementById('button').addEventListener('click', saveUrls);
    
    // reload the urls in the browser
    var urls = localStorage['urls'];
    if (!urls) {
      return;
    }
    document.getElementById('urls').value = urls;


});
