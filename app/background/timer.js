// sets functionality of timer
var chrome;
var timeout;
var timeLeftInterval;
var countdown;
var breaktime;
var endTime;
var endBreak;
var pauseTime;
var currentTime;
var working = null;
var timing = false;
var timeDone = null;

var guiLagAdjustment = 500;

//  tMillis is time given in milliseconds
//  takes time given, runs timer function on it, and starts timer
function startTimer(tMillis) {
  countdown = tMillis;
  setTimer(tMillis + guiLagAdjustment);
}

//  takes break time given, run break timer function on it, and starts break timer
function startBreak(bMillis) {
  breaktime = bMillis;
  setBreak(bMillis + guiLagAdjustment);
}

// sets work timer from given millisecond time, and when run it setTimeouts two functions
function setTimer(tMillis) {
  clearTimeout(timeout);
  clearInterval(timeLeftInterval);
  timing = true;
  working = true;
  pauseTime = null;

  var tSecs = parseInt(tMillis / 1000);   // breaking up time (not the bad kind)
  var tMins = parseInt(tSecs / 60);
  var secs = tSecs % 60;
  var tHrs = parseInt(tMins / 60);
  var mins = tMins % 60;
  var millis = tMillis % 1000;

  endTime = new Date();
  endTime.setHours(endTime.getHours() + tHrs);     // determining work end time, or when timer stops
  endTime.setMinutes(endTime.getMinutes() + mins);
  endTime.setSeconds(endTime.getSeconds() + secs);
  endTime.setMilliseconds(endTime.getMilliseconds() + millis);

  currentTime = new Date();   // finds current time
  timeout = setTimeout(function() {
    ding();
    timing = false;
    timeDone = true;
    clearInterval(timeLeftInterval);
    chrome.browserAction.setBadgeText({
      text: 'Ding!'
    });
    clearTimeout(timeout);
  }, endTime.getTime() - currentTime.getTime()); // runs main function after set time has passed
  // immediately after, starts break timer

  timeLeftInterval = setInterval(function() {
    chrome.browserAction.setBadgeText({
      text: countdownDisplayString()
    });
  }, 1000);
}

// sets break timer from given millisecond time, and when run it setTimeouts two functions
function setBreak(bMillis) {
  clearTimeout(timeout);
  clearInterval(timeLeftInterval);
  timing = true;
  working = false;
  pauseTime = null;

  var bSecs = parseInt(bMillis / 1000);
  var bMins = parseInt(bSecs / 60);
  var secs = bSecs % 60;
  var bHrs = parseInt(bMins / 60);
  var mins = bMins % 60;
  var millis = bMillis % 1000;

  endBreak = new Date();
  endBreak.setHours(endBreak.getHours() + bHrs);
  endBreak.setMinutes(endBreak.getMinutes() + mins);
  endBreak.setSeconds(endBreak.getSeconds() + secs);
  endBreak.setMilliseconds(endBreak.getMilliseconds() + millis);

  currentTime = new Date();
  timeout = setTimeout(function() {
    ding();
    timing = false;
    timeDone = true;
    clearInterval(timeLeftInterval);
    chrome.browserAction.setBadgeText({
      text: 'Ding!'
    });
    clearTimeout(timeout);
  }, endBreak.getTime() - currentTime.getTime()); // runs main function after set time has passed
  // immediately after, starts work timer

  timeLeftInterval = setInterval(function() {
    chrome.browserAction.setBadgeText({
      text: countdownDisplayString()
    });
  }, 1000);

}

function turnOff() {
  clearTimeout(timeout);
  clearInterval(timeLeftInterval);
  timing = false;
  countdown = 0;
  breaktime = 0;
  endTime = null;
  endBreak = null;
  pauseTime = null;
  currentTime = null;
  working = null;
  chrome.browserAction.setBadgeText({
    text: ''
  });
}

function getTimeLeft() {
  if (pauseTime) return (endTime.getTime() - pauseTime.getTime());
  var now = new Date();
  if (working === true) return (endTime.getTime() - now.getTime());
  else if (working === false) return (endBreak.getTime() - now.getTime());
}

function getTimeLeftPercent() {
  if (working ===  true) return parseInt(getTimeLeft() / countdown * 100);
  else if (working === false) return parseInt(getTimeLeft() / breaktime * 100);
}

function getTimeLeftString() {
  if (getTimeLeft() === undefined || timing === false) return '';
  var until = getTimeLeft();
  var tSecs = parseInt(until / 1000);
  var tMins = parseInt(tSecs / 60);
  var secs = tSecs % 60;
  var tHrs = parseInt(tMins / 60);
  var mins = tMins % 60;
  if (secs < 10) secs = '0' + secs;
  if (mins < 10) mins = '0' + mins;
  if (tHrs < 10) tHrs = '0' + tHrs;
  return ((tHrs > 0 ? tHrs + ':' : '') + mins + ':' + secs);
}

function countdownDisplayString() {
  var secs;
  var mins;
  var timeLeftString;
  var timeLeft = getTimeLeft();
  if (timeLeft >= 600000) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: [0,0,0,0]
    });
    mins = parseInt(timeLeft / 60000);
    timeLeftString = mins + 'm';
  } else if (timeLeft >= 60000) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: [0,0,0,0]
    });
    secs = parseInt(timeLeft / 1000);
    mins = parseInt(secs / 60);
    secs = secs % 60;
    if (secs < 10) secs = '0' + secs;
    mins = mins % 60;
    timeLeftString = mins + ':' + secs;
  } else {
    chrome.browserAction.setBadgeBackgroundColor({
      color: [255,0,0,255]
    });
    secs = parseInt(timeLeft / 1000);
    timeLeftString = secs + 's';
  }
  return timeLeftString;
}

/* DEV ONLY */

function pause() {
  clearTimeout(timeout);
  clearInterval(timeLeftInterval);
  pauseTime = new Date();
}

function resume() {
  var timeRemaining = endTime.getTime() - pauseTime.getTime();
  setTimer(timeRemaining);
}

function restart() {
  setTimer(countdown);
}
