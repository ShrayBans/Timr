// purpose: buttons on popup responds to clicks and changes dynamically according to timer functions
var settingsShown = false;
var refreshDisplayTimeout;

document.addEventListener('DOMContentLoaded', function() {
    load();
    document.querySelector('#timerButton')
        .addEventListener('click', startWorking);
    document.querySelector('#cancel')
        .addEventListener('click', reset);
    document.querySelector('#pause')
        .addEventListener('click', pauseTimer);
    document.querySelector('#resume')
        .addEventListener('click', resumeTimer);
    document.querySelector('#startBreak')
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
    hide("settings");
    hide("modify");
    hide("startBreak");

    if (endTime) refreshDisplay();
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
    hide("timerButton");
    show("display");
    show("modify");
    hide("resume");
    hide("settings");
    var num = getChoice();

    // set timer, hide settings, display reset button
    startTimer(num * 60000);
    refreshDisplay();
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

function startBreaking() {
  hide("startBreak");
  var num = getChoice();

  startBreak(num * 6000);
  hide("settings");
  show("modify");
  show("display");
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
    hide("pause");
    showInline("resume");
    pause();
    clearTimeout(refreshDisplayTimeout);
}

function resumeTimer() {
    hide("resume");
    showInline("pause");
    refreshDisplay();
    resume();
}

function reset() {
    clearTimeout(refreshDisplayTimeout);
    turnOff();
    hide("modify");
    show("timerButton");
}
