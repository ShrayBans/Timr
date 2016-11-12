var chrome;
var sound;
var urlArr;
var idUrlPairs = {};
var notificationOpt = {
  type: 'basic',
  iconUrl: 'assets/icon.png',
  title: 'Warning! Distracting website!',
  message: 'Are you sure you want this open?'
};

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
    checkTabAndNotify(changeInfo.url, tab.id);
  }
});

function checkTabAndNotify(url, id) {
  chrome.storage.local.get('storage', function(urls) {
    if (urls.storage.length > 0) {
      urlArr = urls.storage;
      for (var i = 0; i < urlArr.length; i++) {
        if (url.includes(urlArr[i])) {
          chrome.notifications.create('distraction', notificationOpt, function(id) {
            // this is firing, but no notificaton is showing up
            console.log(id, chrome.runtime.lastError);
          });
        }
      }
    }
  });
}
