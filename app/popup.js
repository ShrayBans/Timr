// purpose: buttons on popup responds to clicks and changes dynamically according to timer functions
var $;
var chrome;
var bg = chrome.extension.getBackgroundPage();
var settingsShown = false;
var refreshDisplayTimeout;

var $settings = '#settings';
var $display = '#display';
var $timerButton = '#timerButton';
var $breakButton = '#breakButton';
var $cancel = '#cancel';
var $modify = '#modify';
var $wrench = '#wrench';
var $timeBar = '#bar';

$(document).ready(function() {
  load();
  $($timerButton).on('click', startWorking);
  $($cancel).on('click', reset);
  $($breakButton).on('click', startBreaking);
  $($wrench).on('click', function() {
    if (settingsShown === false) showSettings();
    else hideSettings();
  });
});

function show($idString) {
  $($idString).css('display', 'block');
}

function hide($idString) {
  $($idString).css('display', 'none');
}

function load() {
  hideSettings();
  show($display);
  hide($timerButton);
  hide($breakButton);

  if (bg.timing === false && bg.working === null) {
    show($timerButton);
    hide($breakButton);
  } else if (bg.timing === true && bg.working === true) {
    hide($timerButton);
    refreshDisplay();
  } else if (bg.timing === false && bg.working === true) {
    show($breakButton);
  } else if (bg.timing === true && bg.working === false) {
    show($timerButton);
    hide($breakButton);
    refreshDisplay();
  } else if (bg.timing === false && bg.working === false) {
    show($timerButton);
  }
}

function getChoices() {
  // find selected time, return selected value
  var num;
  var studyTune;
  var breakTune;

  num = parseInt($('[name="time"]:checked').val());
  studyTune = $('[name="study"]:checked').val();
  breakTune = $('[name="break"]:checked').val();

  return [num, studyTune, breakTune];
}

function startWorking() {
  // SET background timer for selected number
  // HIDE settings, DISPLAY countdown
  hide($breakButton);
  hide($timerButton);
  show($modify);
  hideSettings();

  var num = getChoices()[0];

  // set timer and begin countdown
  // change to 60000 for correct timing
  bg.startTimer(num * 60000);
  bg.playMusic(getChoices()[1]);
  refreshDisplay();

  // temp fix for bug
  hide($breakButton);
}

function startBreaking() {
  hide($breakButton);
  show($timerButton);
  hideSettings();
  show($modify);

  reopenTabs(Object.keys(idUrlPairs));

  // set break and begin countdown
  // should be set to 5-15 min depending on work time?
  var num = 5;
  bg.startBreak(num * 60000);
  refreshDisplay();
}

function refreshDisplay() {
  var percent = bg.getTimeLeftPercent();
  var timeLeft = bg.getTimeLeftString();

  if (percent < 15) {
    $($timeBar).css('color', 'black');
  } else {
    $($timeBar).css('color', 'white')
  }

  if (bg.timeDone === true && bg.working === true) {
    show($breakButton);
    bg.timeDone = false;
  } else if (bg.timeDone === true && bg.working === false) {
    bg.timeDone = false;
  }

  $($timeBar).text(timeLeft);
  document.getElementById('bar').style.width = percent + '%';
  refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
}

function showSettings() {
  show($settings);
  settingsShown = true;
}

function hideSettings() {
  hide($settings);
  settingsShown = false;
}

function reset() {
  hide($modify);
  hide($breakButton);
  show($timerButton);

  if (bg.working === true) reopenTabs(Object.keys(idUrlPairs));

  // resets timeBar and stops timer
  clearTimeout(refreshDisplayTimeout);
  $($timeBar).text('');
  document.getElementById('bar').style.width = 100 + '%';
  bg.stopMusic();
  bg.turnOff();
}
