// Éléments
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const alarmTimeInput = document.getElementById('alarmTime');
const alarmStatus = document.getElementById('alarm-status');
const alarmSound = document.getElementById('alarm-sound');
// Variables alarme
let alarmTime = null;
let alarmActive = false;

// Horloge qui tourne
function updateClock() {
    const now = new Date( new Date().getTime() - 15*60*1000);


    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Rotation aiguilles (degrés)
    /* *6 explication : 60 secondes ou minutes = 360° -> 1 seconde ou minute = 6° (360/60)
    +90 explication: cest du css rotate en sachant que rotate(0) = horizontal sur la droite donc 3h 
    il faut donc tourner de 90° dans le sens inverse pour arriver a 12h qui est en haut
    0 secondes = 12h rotate(90°) 15 secondes = 3h rotate(180°) etc 
    */
    secondHand.style.transform = `rotate(${(seconds * 6) + 90}deg)`;
    minuteHand.style.transform = `rotate(${(minutes * 6) + (seconds * 0.1) + 90}deg)`;
    hourHand.style.transform = `rotate(${((hours % 12) * 30) + (minutes * 0.5) + 90}deg)`;

    // Vérif alarme
    if (alarmActive && now.toTimeString().slice(0, 5) === alarmTime) {
        alert(`🔔 C'est l'heure ! Il est ${alarmTime}`);
        alarmSound.play();
        alarmActive = false;
    }
}

// Régler alarme
function setAlarm() {
    alarmTime = alarmTimeInput.value;
    if (alarmTime) {
        alarmActive = true;
        alarmStatus.textContent = `Alarme: ${alarmTime}`;
        alarmStatus.style.color = 'green';
    }
}
//horloge digital 
// Démarrage
setInterval(updateClock, 1000);
updateClock();

// DIGITALE - après updateClock()
function updateDigitalClock() {
    const now = new Date(new Date().getTime() - 15 * 60 * 1000); // Bordeaux

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}


function updateClock() {
    updateDigitalClock(); 
}

