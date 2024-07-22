// ... (keep the existing ASCII art and star animation code) ...

// YouTube video control
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    const videoContainer = document.querySelector('.video-container');
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

// Show video on scroll
const videoContainer = document.querySelector('.video-container');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollPosition > windowHeight * 0.5) {
        videoContainer.classList.add('visible');
    } else {
        videoContainer.classList.remove('visible');
    }
});
