
let dayCount = new Date('Dec 31, 2025 00:00:00').getTime();
let isCountdownOver = false;

let count = setInterval(function() {
    let now = new Date().getTime();
    let time = dayCount - now;

    let days = Math.floor(time / (1000 * 60 * 60 * 24));
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);

    document.getElementById("timeLeft").innerHTML = days + ": " + hours + ": " + minutes + ": " + seconds + " ";

    if (time < 0) {
        clearInterval(count);
        document.getElementById("timeLeft").innerHTML = "HAPPY NEW YEAR!";
        isCountdownOver = true;
        stopSquares();
        showConfetti();
    }
}, 1000);


let colors = ['red', 'blue', 'purple'];
let container2 = document.getElementById('container2');
let squareIntervals = [];

function createSquare() {
    if (isCountdownOver) return;

    let square = document.createElement('div');
    square.classList.add('square', colors[Math.floor(Math.random() * colors.length)]);

    let randomX = Math.random() * (window.innerWidth - 50);
    square.style.left = randomX + 'px';
    square.style.top = '0px';

    container2.appendChild(square);

    let position = 0;
    let interval = setInterval(() => {
        if (position >= window.innerHeight) {
            clearInterval(interval);
            square.remove();
        } else {
            position += 2;
            square.style.top = position + 'px';
        }
    }, 20);

    squareIntervals.push(interval);

    square.addEventListener('click', () => {
        clearInterval(interval);
        square.remove();
    });
}


function stopSquares() {
    squareIntervals.forEach(interval => clearInterval(interval));
    squareIntervals = [];
}


function showConfetti() {
    let confettiOverlay = document.createElement('div');
    confettiOverlay.style.position = 'fixed';
    confettiOverlay.style.top = '0';
    confettiOverlay.style.left = '0';
    confettiOverlay.style.width = '100%';
    confettiOverlay.style.height = '100%';
    confettiOverlay.style.background = 'url(giphy.gif) center center';
    confettiOverlay.style.backgroundSize = 'cover';
    confettiOverlay.style.zIndex = '1000';
    confettiOverlay.style.pointerEvents = 'none';
    document.body.appendChild(confettiOverlay);
}


setInterval(createSquare, 2000);
