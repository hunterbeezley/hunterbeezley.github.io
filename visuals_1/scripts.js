const asciiArt = document.getElementById('asciiArt');
const artFrames = [
    `▒█░▒█ ▒█░▒█ ▒█▄░▒█ ▀▀█▀▀ ▒█▀▀▀ ▒█▀▀█ 
▒█▀▀█ ▒█░▒█ ▒█▒█▒█ ░▒█░░ ▒█▀▀▀ ▒█▄▄▀ 
▒█░▒█ ░▀▄▄▀ ▒█░░▀█ ░▒█░░ ▒█▄▄▄ ▒█░▒█`
];

let currentFrame = 0;

function displayFrame() {
    asciiArt.textContent = artFrames[currentFrame];
    currentFrame = (currentFrame + 1) % artFrames.length;
}

setInterval(displayFrame, 2000);

// Pulsing text color
function pulseColor() {
    const r = Math.sin(Date.now() * 0.01) * 127 + 128;
    const g = Math.sin(Date.now() * 0.01 + 2) * 127 + 128;
    const b = Math.sin(Date.now() * 0.01 + 4) * 127 + 128;
    asciiArt.style.color = `rgb(${r}, ${g}, ${b})`;
    requestAnimationFrame(pulseColor);
}

pulseColor();

// Background stars
const starfield = document.createElement('div');
starfield.id = 'starfield';
document.body.appendChild(starfield);

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    starfield.appendChild(star);
}

for (let i = 0; i < 100; i++) {
    createStar();
}

function animateStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const y = parseFloat(star.style.top);
        star.style.top = y > 100 ? '0%' : `${y + 0.1}%`;
    });
    requestAnimationFrame(animateStars);
}

animateStars();
