let timeElapse = 0;
let myInterval;

function incrementTime() {
    timeElapse = timeElapse + 1;
    document.getElementById("timer").innerHTML = timeElapse;
}

function startTimer() {
    timeElapse = 0;
    document.getElementById("timer").innerHTML = timeElapse;
    clearInterval(myInterval);
    myInterval = setInterval('incrementTime()', 1000);
}

function stopTimer() {
    clearInterval(myInterval);
}

function restart() {
    timeElapse = 0;
    document.getElementById("timer").innerHTML = timeElapse;
}
