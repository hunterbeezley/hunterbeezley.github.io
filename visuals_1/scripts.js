let lastTypedTime = 0;
const typingSpeed = 50; // milliseconds per character

function setup() {
    noCanvas();
    pulseColor();
    animateStars();
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    videoContainers.forEach(container => {
        if (scrollPosition > container.offsetTop - windowHeight * 0.5) {
            container.classList.add('visible');
        } else {
            container.classList.remove('visible');
        }
    });

    if (scrollArrow) {
        if (scrollPosition + windowHeight >= document.documentElement.scrollHeight - 50) {
            scrollArrow.style.display = 'none';
        } else {
            scrollArrow.style.display = 'block';
        }
    }
}

const asciiArt = document.getElementById('asciiArt');
const scrollArrow = document.getElementById('scroll-arrow');
const videoContainers = document.querySelectorAll('.video-container');
const portalButton = document.getElementById('portal-button');
const homeButton = document.getElementById('home-button');
const collabButton = document.getElementById('collab-button');

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

function pulseColor() {
    const r = Math.sin(Date.now() * 0.01) * 127 + 128;
    const g = Math.sin(Date.now() * 0.01 + 2) * 127 + 128;
    const b = Math.sin(Date.now() * 0.01 + 4) * 127 + 128;
    const color = `rgb(${r}, ${g}, ${b})`;
    asciiArt.style.color = color;
    if (scrollArrow) {
        scrollArrow.style.color = color;
    }
    portalButton.style.color = color;
    portalButton.style.borderColor = color;
    homeButton.style.color = color;
    homeButton.style.borderColor = color;
    collabButton.style.color = color;
    collabButton.style.borderColor = color;

    requestAnimationFrame(pulseColor);
}

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

function handleResize() {
    if (window.innerWidth <= 480) {
        asciiArt.style.fontSize = '14px';
    } else if (window.innerWidth <= 768) {
        asciiArt.style.fontSize = '16px';
    } else {
        asciiArt.style.fontSize = '20px';
    }

    videoContainers.forEach(container => {
        container.style.height = `${window.innerHeight}px`;
    });
}

handleResize();


const releaseDate = new Date('2024-07-30T00:00:00'); // Set your desired release date here
const comingSoonOverlay = document.querySelector('.coming-soon-overlay');

function checkReleaseDate() {
    const now = new Date();
    if (now >= releaseDate) {
        comingSoonOverlay.style.display = 'none';
    }
}


checkReleaseDate();
setInterval(checkReleaseDate, 60000); // Check every minute

