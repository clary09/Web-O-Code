var stopped = true;
var paused = true;
var finished = false;
var sessionLen = 30; // the session length in minutes
var startTime;
var endTime;
var delta;

// inspirational quotes
var api_url ="https://type.fit/api/quotes";
fetch(api_url)
  .then(response => response.json())
  .then(data => document.getElementById("quote").innerHTML = data[Math.floor(Math.random() * data.length)].text + " - " + data[Math.floor(Math.random() * data.length)].author);
 
setInterval(function(){
  if (!stopped && !paused) {
    if (delta <= 0) {
      finished = true;
    }
    updateTimer();
    delta -= 1000;
  }
}, 1000);

function checkStartButton() {
  finished = false;
  paused = !paused;

  if($('.session').val() > 0){
    sessionLen = $('.session').val();
  }

  if (stopped) {
    stopped = false;
    delta = sessionLen * 60000;
  }
  if (paused){
    document.getElementById("btn-start").innerHTML = "Start Studying";
    document.getElementById("timer-feedback").innerHTML = "Paused";
  } else {
    document.getElementById("btn-start").innerHTML = "Pause Studying";
    document.getElementById("timer-feedback").innerHTML = "Studying";
  }
}

function checkStopButton() {
  stopped = true;
  paused = true;
  finished = false;
  delta = sessionLen * 60000;
  document.getElementById("btn-start").innerHTML = "Start Studying";
  document.getElementById("timer-feedback").innerHTML = "Stopped";
  updateTimer();
}

function updateTimer() {
  hours = Math.floor(delta / (1000 * 60 * 60));
  mins = Math.floor((delta % 3600000) / (1000 * 60));
  secs = Math.floor((delta % 60000) / 1000);

  document.getElementById("time").innerHTML =
    '<div>' + hours + '<span>Hours</span></div>' +
    '<div>' + mins + '<span>Minutes</span></div>' +
    '<div>' + secs + '<span>Seconds</span></div>';

  if (finished) {
    finish();
  } else {
    document.getElementById("finish-img").src = "";
  }
}

function finish() {
  stopped = true;
  paused = true;
  document.getElementById("btn-start").innerHTML = "Start Studying";
  document.getElementById("timer-feedback").innerHTML = "Finished!";

  if (stopped) {
  fetch('https://api.gfycat.com/v1/gfycats/search?search_text=congrats')
  .then(response => response.json())
  .then(data => document.getElementById("finish-img").src = data.gfycats[Math.floor(Math.random() * data.gfycats.length)].max2mbGif);
  }
}