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

// setup click handlers on page load
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

// general function for displaying a div
function show($idString) {
  $($idString).css('display', 'block');
}

// general function for hiding a div
function hide($idString) {
  $($idString).css('display', 'none');
}

// runs once every time popup is opened
// depending on app state, different divs are loaded
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

// grabs selected options from DOM
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

// starts timer from chosen time options, hides BREAK and TIMER, shows GIVEUP
function startWorking() {
  hide($breakButton);
  hide($timerButton);
  show($modify);
  hideSettings();

  var num = getChoices()[0];

  // set timer and begin countdown
  // 60000 for production, 10000 for dev
  bg.startTimer(num * 60000);
  bg.playMusic(getChoices()[1]);
  refreshDisplay();

  // temp fix for bug
  hide($breakButton);
}

// starts break, hides BREAK, shows TIMER, shows GIVEUP
function startBreaking() {
  hide($breakButton);
  show($timerButton);
  hideSettings();
  show($modify);

  // reopens selected tabs for breaktime!
  reopenTabs(Object.keys(bg.idUrlPairs));

  // set break and begin countdown
  // currently set to 5 min
  var num = 5;
  bg.startBreak(num * 60000);
  refreshDisplay();
}

// runs for timer display, and for DOM changes w/o a click event
function refreshDisplay() {
  var percent = bg.getTimeLeftPercent();
  var timeLeft = bg.getTimeLeftString();

  // if time is almost up, change display text from white to black
  if (percent < 15) {
    $($timeBar).css('color', 'black');
  } else {
    $($timeBar).css('color', 'white')
  }

  // shows/hides buttons when time is up
  if (bg.timeDone === true && bg.working === true) {
    show($breakButton);
    bg.timeDone = false;
  } else if (bg.timeDone === true && bg.working === false) {
    bg.timeDone = false;
  }

  // this sets the display text
  $($timeBar).text(timeLeft);
  document.getElementById('bar').style.width = percent + '%';

  // runs function at an interval for continuous updating
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

// runs on GIVEUP, resets app to original load
function reset() {
  hide($modify);
  hide($breakButton);
  show($timerButton);

  if (bg.working === true) reopenTabs(Object.keys(bg.idUrlPairs));

  // resets timeBar and stops timer
  clearTimeout(refreshDisplayTimeout);
  $($timeBar).text('');
  document.getElementById('bar').style.width = 100 + '%';
  bg.stopMusic();
  bg.turnOff();
}
