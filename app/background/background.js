// TODO: compare with extension Concentration
// get notifications working

var chrome;
var sound;
var urlArr;
var idUrlPairs = {};
var notificationOpt = {
  type: 'basic',
  iconUrl: 'assets/icon.png',
  title: 'Warning!',
  message: "You've marked this as a distracting website. Are you sure you want it open?",
  priority: 1
};

// plays selected song from options
// run in background script so it doesn't stop upon closing popup
function playMusic(song) {
  if (song === 'none') return;
  var url = './../assets/' + song + '.mp3';
  sound = new Howl({
    urls: [url],
    loop: true
  });
  sound.play();
}

function stopMusic() {
  if (sound === undefined) return;
  sound.stop();
}

// notification on timeDone
function ding() {
  var alert = new Howl({
    urls: ['./assets/notify.mp3']
  });
  alert.play();
}

// listens for new tabs, and if tab url is valid, runs checkTabAndNotify
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url !== undefined && working === true) {
    checkTabAndNotify(changeInfo.url, tab.id);
  }
});

// checks if url is a distraction site, and if so sends a notification
function checkTabAndNotify(url, id) {
  chrome.storage.local.get('storage', function(urls) {
    if (urls.storage.length > 0) {
      urlArr = urls.storage;
      for (var i = 0; i < urlArr.length; i++) {
        if (url.includes(urlArr[i])) {
          chrome.notifications.create('distraction', notificationOpt, function(id) {
            console.log('Notification sent, with an id of', "'" + id + ".'");
            console.log('If error:', chrome.runtime.lastError);
          });
        }
      }
    }
  });
}
