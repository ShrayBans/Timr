// sets functionality of timer

// html id = 'timerbutton'

var timeout;
var countdown;
var breaktime;
var endTime;
var endBreak;
var pauseTime;
var currentTime;
var working;

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
  setBreak(breaktime);
}

// sets work timer from given millisecond time, and when run it setTimeouts two functions
function setTimer(tMillis) {
  working = true;
  clearTimeout(timeout);
  pauseTime = null;

  var tSecs = parseInt(tMillis / 1000);   // breaking up time
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
  timeout = setTimeout(console.log('openPageFunction'), endTime.getTime() - currentTime.getTime()); // runs main function after set time has passed
  toBreak = setTimeout(setBreak, endTime.getTime() - currentTime.getTime());  // immediately after, starts break timer

  setInterval(function() {
        chrome.browserAction.setBadgeText({
            text: getTimeLeftString()
        });
    }, 1000);
}

// sets break timer from given millisecond time, and when run it setTimeouts two functions
function setBreak(bMillis) {
  working = false;
  clearTimeout(timeout);
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
  timeout = setTimeout(console.log('closePageFunction'), endBreak.getTime() - currentTime.getTime()); // runs main function after set time has passed
  toWork = setTimeout(setTimer, endBreak.getTime() - currentTime.getTime());  // immediately after, starts work timer
}

function pause() {
  pauseTime = new Date();
  clearTimeout(timeout);
}

function resume() {
  var timeRemaining = (endTime.getTime() - pauseTime.getTime());
  setTimer(timeRemaining);
}

function restart() {
  setTimer(countdown);
}

function turnOff() {
    clearTimeout(timeout);
    countdown = 0;
    breaktime = 0;
    endTime = null;
    endBreak = null;
    pauseTime = null;
    currentTime = null;
    chrome.browserAction.setBadgeText({
        text: ""
    });
}

function getTimeLeft() {
    if (pauseTime)
        return (endTime.getTime() - pauseTime.getTime());

    var now = new Date();
        return (endTime.getTime() - now.getTime());
}

function getTimeLeftPercent() {
    return parseInt(getTimeLeft() / countdown * 100);
}

function getTimeLeftString() {
    var until = getTimeLeft();
    var tSecs = parseInt(until / 1000);
    var tMins = parseInt(tSecs / 60);
    var secs = tSecs % 60;
    var tHrs = parseInt(tMins / 60);
    var mins = tMins % 60;
    if (secs < 10) secs = "0" + secs;
    if (mins < 10) mins = "0" + mins;
    if (tHrs < 10) tHrs = "0" + tHrs;
    return ((tHrs > 0 ? tHrs + ":" : "") + mins + ":" + secs);
}