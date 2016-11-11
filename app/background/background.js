var chrome;
var sound;
var urlArr;
var idUrlPairs = {};

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

function ding() {
  var alert = new Howl({
    urls: ['./assets/notify.mp3']
  });
  alert.play();
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url !== undefined && working === true) {
    checkAndRemoveTab(changeInfo.url, tab.id);
  }
});

// works, but
// BUG: if checkAndRemove fires, idUrlPairs empties(?),
// and desired tabs are not brought back up from startBreak or reset methods
function checkAndRemoveTab(url, id) {
  chrome.storage.local.get('storage', function(urls) {
    if (urls.storage.length > 0) {
      urlArr = urls.storage;
      for (var i = 0; i < urlArr.length; i++) {
        if (url.includes(urlArr[i])) {
          chrome.tabs.remove(id);
        }
      }
    }
  });
}
