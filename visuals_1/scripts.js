// Select elements
const asciiArt = document.getElementById('asciiArt');
const scrollArrow = document.getElementById('scroll-arrow');
const videoContainers = document.querySelectorAll('.video-container');

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
    if (scrollArrow) {
        scrollArrow.style.color = color;
    }
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

    if (scrollArrow) {
        if (scrollPosition + windowHeight >= documentHeight - 50) {
            scrollArrow.style.display = 'none';
        } else {
            scrollArrow.style.display = 'block';
        }
    }
});

// Video control
let youtubePlayers = [];
let vimeoPlayer;

function onYouTubeIframeAPIReady() {
    youtubePlayers = [
        new YT.Player('youtube-player-2', { events: { 'onReady': onYouTubePlayerReady } }),
        new YT.Player('youtube-player-3', { events: { 'onReady': onYouTubePlayerReady } })
    ];
}

function onYouTubePlayerReady(event) {
    const player = event.target;
    const videoContainer = player.getIframe().parentElement;
    setupVideoObserver(videoContainer, player, 'youtube');
}

// Initialize Vimeo player
const vimeoIframe = document.querySelector('#video-container-1 iframe');
vimeoPlayer = new Vimeo.Player(vimeoIframe);
setupVideoObserver(vimeoIframe.parentElement, vimeoPlayer, 'vimeo');

function setupVideoObserver(videoContainer, player, type) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (type === 'youtube') {
                    player.playVideo();
                } else if (type === 'vimeo') {
                    player.play();
                }
            } else {
                if (type === 'youtube') {
                    player.pauseVideo();
                } else if (type === 'vimeo') {
                    player.pause();
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(videoContainer);

    // Add click event listener to play/pause the video
    videoContainer.addEventListener('click', () => {
        if (type === 'youtube') {
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        } else if (type === 'vimeo') {
            player.getPaused().then(paused => {
                if (paused) {
                    player.play();
                } else {
                    player.pause();
                }
            });
        }
    });
}

// Add keyboard controls for mute/unmute
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        youtubePlayers.forEach(player => {
            if (player.isMuted && player.isMuted()) {
                player.unMute();
            } else if (player.mute) {
                player.mute();
            }
        });
        vimeoPlayer.getVolume().then(volume => {
            if (volume === 0) {
                vimeoPlayer.setVolume(1);
            } else {
                vimeoPlayer.setVolume(0);
            }
        });
    }
});
