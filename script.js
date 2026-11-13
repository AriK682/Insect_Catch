// Insect Catch Game Script
const screens = document.querySelectorAll('.screen');
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selectedInsect = {};

// Event Listeners
startBtn.addEventListener('click', () => screens[0].classList.add('up'));

// this event listener is added to each insect selection button. When a button is clicked, it retrieves the image source and alt text of the selected insect, updates the selectedInsect object, transitions to the next screen, and starts the game after a short delay.
chooseInsectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selectedInsect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

// this function starts the game timer and updates the time display every second
function startGame() {
    setInterval(increaseTime, 1000);
}

// this function calculates the elapsed time in minutes and seconds, formats it, and updates the time display on the screen
function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

// this function creates a new insect element, positions it randomly on the screen, and adds an event listener for catching the insect
function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener('click', catchInsect);

    gameContainer.appendChild(insect);
}

// this function generates a random position within the viewport, ensuring that the insect is not too close to the edges
function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

// this function handles the logic when an insect is caught: it increases the score, adds a 'caught' class for visual feedback, removes the insect after a delay, and adds more insects to the game
function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addInsects();
}


// this function adds more insects to the game after a short delay, creating a continuous challenge for the player
function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}


// this function increases the player's score, updates the score display, and shows a message when the score exceeds 19
function increaseScore() {
    score++;
    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}