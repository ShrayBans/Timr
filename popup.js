// purpose: buttons on popup responds to clicks and changes dynamically according to timer functions

var b = chrome.extension.getBackgroundPage();
var settingsShown = false;
var refreshDisplayTimeout;

$(document).ready(function() {
    load();
    document.querySelector('#timerButton')
        .addEventListener('click', startWorking);
    document.querySelector('#cancel')
        .addEventListener('click', reset);
    // document.querySelector('#pause')
    //     .addEventListener('click', pauseTimer);
    // document.querySelector('#resume')
    //     .addEventListener('click', resumeTimer);
    document.querySelector('#breakButton')
        .addEventListener('click', startBreaking);
    document.querySelector('#wrench')
        .addEventListener('click', function() {
          if (settingsShown === false) showSettings();
          else hideSettings();
        });
});

function show(section) {
    document.getElementById(section)
        .style.display = "block";
}

function showInline(section) {
    document.getElementById(section)
        .style.display = "inline";
}

function hide(section) {
    document.getElementById(section)
        .style.display = "none";
}

function load() {
    refreshDisplay();
    hide("settings");
    show("display");
    hide("breakButton");

    // if (b.endTime) {
    //   console.log('true');
    //   hide("breakButton");
    //   hide("timerButton");
    //   show("modify");
    //   show("display");
    //   refreshDisplay();
    // }
    // else if (b.endBreak) {
    //   console.log('false');
    //   hide("timerButton");
    //   show("breakButton");
    //   show("modify");
    //   show("display");
    //   refreshDisplay();
    // }
    // else if (b.working === null) {
    //   console.log('null');
    //   hide("cancel");
    //   hide("breakButton");
    //   show("timerButton");
    // }
}

function getChoice() {
    // find selected time, return selected value
    var num;
    for (var i = 0; i < document.choices.radio.length; i++) {
        if (document.choices.radio[i].checked == true)
            num = parseInt(document.getElementById("s" + i)
                .textContent);
    }
    return num;
}

function startWorking() {
    // SET background timer for selected number
    // HIDE settings, DISPLAY countdown
    // disable("timerButton");
    hide("timerButton");
    show("display");
    show("modify");
    hide("settings");

    var num = getChoice();

    // set timer, hide settings, display reset button
    startTimer(num * 10000);
    refreshDisplay();
}

function startBreaking() {
  // disable("breakButton");
  reopenTabs(Object.keys(idUrlPairs));
  hide("breakButton");
  show("timerButton");
  var num = 10;

  startBreak(num * 6000);
  refreshDisplay();
  hide("settings");
  show("modify");
  show("display");
}

function refreshDisplay() {
    percent = getTimeLeftPercent();

    if (percent < 15)
        document.getElementById("bar")
        .style.color = "grey";
    document.getElementById("bar")
        .textContent = getTimeLeftString();
    document.getElementById("bar")
        .style.width = percent + "%";

    refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
}

function showSettings() {
  show("settings");
  settingsShown = true;
}

function hideSettings() {
  hide("settings");
  settingsShown = false;
}

function pauseTimer() {
    // hide("pause");
    // showInline("resume");
    pause();
    clearTimeout(refreshDisplayTimeout);
}

function resumeTimer() {
    // hide("resume");
    // showInline("pause");
    refreshDisplay();
    resume();
}

function reset() {
    clearTimeout(refreshDisplayTimeout);
    turnOff();
    hide("modify");
    show("timerButton");
}
