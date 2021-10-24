var timerStatus = 'not-started'
var minutes;
var seconds = 5;
var sessionBreak = 'session';

function onClickDecrement(buttonName) {
    var time = Number(document.getElementById(`${buttonName}-length`).innerHTML);
    if (time > 0){
        var newtime = time - 1
        document.getElementById(`${buttonName}-length`).innerHTML = newtime
    }
} 

function onClickIncrement(buttonName) {
    var time = Number(document.getElementById(`${buttonName}-length`).innerHTML);
    if (time < 60){
        var newtime = time + 1
        document.getElementById(`${buttonName}-length`).innerHTML = newtime
    }
} 

function onClickReset(){
    document.getElementById('break-length').innerHTML = 5;
    document.getElementById('session-length').innerHTML = 25;
    timerStatus = 'not-started';
    minutes = 25;
    seconds = 0;
    sessionBreak = 'session';
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    displayTimer(minutes, seconds);
}

function toggleTimer() {
    timerStatus = timerStatus == "start" ? "stop" : "start";
}

function toggleSessionBreak() {
    sessionBreak = sessionBreak == "session" ? "break" : "session";
}

function toggleStartStop(){
    if (timerStatus == 'not-started'){
        setCountdown();
        displayTimer();
        toggleTimer()
        console.log('not-started fired')
        startCountdown(minutes, seconds);
    } else if (timerStatus == 'start') {
        toggleTimer();
        displayTimer();
    } else {
        toggleTimer();
        startCountdown();
    }
    console.log(timerStatus)
 }


function startCountdown() {
    console.log('startCountdown fired')   
    if (timerStatus == "stop" || timerStatus == "not-started") {
            return 
        }
    if((minutes === 0 & seconds === 0)){
        playSound()
        toggleSessionBreak();    
        document.getElementById('timer-label').innerHTML = sessionBreak;
        setCountdown();
        }
    else {
        if(minutes !== 0 & seconds === 0){
            minutes--;
            seconds = 59;
            }
        else {
            seconds--
            }     
        }
    displayTimer();
    setTimeout(() => {startCountdown()
        }, 1000);
        
    }
function setCountdown (){
    console.log("setCountdown fired")
    minutes = Number(document.getElementById(`${sessionBreak}-length`).innerHTML);
}

function displayTimer(){
    if(minutes < 10){
        if(seconds < 10){
            document.getElementById('time-left').innerHTML = `0${minutes}:0${seconds}`;
        } else {
            document.getElementById('time-left').innerHTML = `0${minutes}:${seconds}`;
        }
    } else {
        if(seconds < 10){
            document.getElementById('time-left').innerHTML = `${minutes}:0${seconds}`;
        } else {
            document.getElementById('time-left').innerHTML = `${minutes}:${seconds}`;
        }    
        }
    }

function playSound() {
    document.getElementById('beep').play()
}