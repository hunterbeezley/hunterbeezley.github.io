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

// Pulsing text color for ASCII art and arrow
function pulseColor() {
    const r = Math.sin(Date.now() * 0.01) * 127 + 128;
    const g = Math.sin(Date.now() * 0.01 + 2) * 127 + 128;
    const b = Math.sin(Date.now() * 0.01 + 4) * 127 + 128;
    const color = `rgb(${r}, ${g}, ${b})`;
    asciiArt.style.color = color;
    scrollArrow.style.color = color;
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

// Show video on scroll
const videoContainers = document.querySelectorAll('.video-container');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    videoContainers.forEach(container => {
        if (scrollPosition > container.offsetTop - windowHeight * 0.5) {
            container.classList.add('visible');
        } else {
            container.classList.remove('visible');
        }
    });

    if (scrollPosition + windowHeight >= documentHeight - 50) {
        scrollArrow.style.display = 'none';
    } else {
        scrollArrow.style.display = 'block';
    }
});

// YouTube video control
let players = [];
function onYouTubeIframeAPIReady() {
    players = [
        new YT.Player('youtube-player-1', { events: { 'onReady': onPlayerReady } }),
        new YT.Player('youtube-player-2', { events: { 'onReady': onPlayerReady } }),
        new YT.Player('youtube-player-3', { events: { 'onReady': onPlayerReady } })
    ];
}

function onPlayerReady(event) {
    const player = event.target;
    const videoContainer = player.getIframe().parentElement;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(videoContainer);

    // Add click event listener to play/pause the video
    videoContainer.addEventListener('click', () => {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    // Add keyboard controls for mute/unmute
    document.addEventListener('keydown', (e) => {
        if (e.key === 'm' || e.key === 'M') {
            if (player.isMuted()) {
                player.unMute();
            } else {
                player.mute();
            }
        }
    });
}
