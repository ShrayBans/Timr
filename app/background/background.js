
var sound;

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
