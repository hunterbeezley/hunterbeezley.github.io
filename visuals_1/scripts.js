// Video Data Array
const videoData = [
    {
        id: 0,
        title: "aTOBIN",
        description: "Audio-reactive visualization exploring algorithmic motion and color transformations. Generative patterns synchronized with sound create hypnotic, evolving forms.",
        meta: "2024 | TouchDesigner, Audio Reactive",
        videoSrc: "videos/atobin.mp4",
        previewSrc: "videos/atobin-preview.mp4",
        res: "1280x720",
        fps: "60",
        codec: "H.264"
    },
    {
        id: 1,
        title: "Liquid Chrome",
        description: "Metallic fluid simulation with reflective surface dynamics. Real-time procedural rendering creates organic, liquid metal forms with chrome-like properties.",
        meta: "2024 | TouchDesigner",
        videoSrc: "videos/liquidchrome.mp4",
        previewSrc: "videos/liquidchrome-preview.mp4",
        res: "1280x720",
        fps: "60",
        codec: "H.264"
    },
    {
        id: 2,
        title: "Sharp Edges",
        description: "Geometric abstraction featuring angular forms and crystalline structures. Hard-edged shapes intersect and transform through space with precise mathematical motion.",
        meta: "2024 | TouchDesigner, Procedural Generation",
        videoSrc: "videos/sharpedges.mp4",
        previewSrc: "videos/sharpedges-preview.mp4",
        res: "1280x720",
        fps: "60",
        codec: "H.264"
    }
];

// Global Variables
let currentVideoIndex = 0;
const asciiArt = document.getElementById('asciiArt');
const scrollArrow = document.getElementById('scroll-arrow');
const cinematicPlayer = document.getElementById('cinematicPlayer');
const mainVideo = document.getElementById('mainVideo');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const infoToggle = document.getElementById('infoToggle');
const infoContent = document.getElementById('infoContent');

// Initialize on page load
function setup() {
    noCanvas();
    initStarfield();
    initGallery();
    initEventListeners();
    pulseColor();
    animateStars();
    handleResize();
}

// Initialize Starfield
function initStarfield() {
    const starfield = document.createElement('div');
    starfield.id = 'starfield';
    document.body.appendChild(starfield);

    for (let i = 0; i < 100; i++) {
        createStar(starfield);
    }
}

function createStar(starfield) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    starfield.appendChild(star);
}

function animateStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const y = parseFloat(star.style.top);
        star.style.top = y > 100 ? '0%' : `${y + 0.1}%`;
    });
    requestAnimationFrame(animateStars);
}

// Initialize Gallery
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const videoId = parseInt(item.getAttribute('data-video-id'));
        const thumbnailVideo = item.querySelector('.thumbnail-video');

        if (thumbnailVideo) {
            // Hover to play preview
            item.addEventListener('mouseenter', () => {
                // If we're using media fragments (#t=...), we want to play from there or from start
                thumbnailVideo.play().catch(e => console.log('Preview play attempt:', e));
            });

            item.addEventListener('mouseleave', () => {
                thumbnailVideo.pause();
                // When we pause, the browser should naturally show the frame it's on
            });
        }

        // Click to open cinematic player
        item.addEventListener('click', () => {
            openCinematicPlayer(videoId);
        });
    });
}

// Initialize Event Listeners
function initEventListeners() {
    // Scroll arrow
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Scroll detection
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cinematic player controls
    if (closeBtn) closeBtn.addEventListener('click', closeCinematicPlayer);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateVideo(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateVideo(1));
    if (infoToggle) infoToggle.addEventListener('click', toggleInfo);

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Click outside video to close
    if (cinematicPlayer) {
        cinematicPlayer.addEventListener('click', (e) => {
            if (e.target === cinematicPlayer) {
                closeCinematicPlayer();
            }
        });
    }
}

// Scroll Handling
function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Hide scroll arrow when at bottom or in gallery
    if (scrollArrow) {
        if (scrollPosition > windowHeight * 0.3) {
            scrollArrow.style.opacity = '0';
            scrollArrow.style.pointerEvents = 'none';
        } else {
            scrollArrow.style.opacity = '1';
            scrollArrow.style.pointerEvents = 'auto';
        }
    }
}

// Resize Handling
function handleResize() {
    // Adjust ASCII art size
    if (asciiArt) {
        if (window.innerWidth <= 480) {
            asciiArt.style.fontSize = '12px';
        } else if (window.innerWidth <= 768) {
            asciiArt.style.fontSize = '16px';
        } else {
            asciiArt.style.fontSize = '24px';
        }
    }
}

// Color Pulsing Animation
function pulseColor() {
    const r = Math.sin(Date.now() * 0.001) * 127 + 128;
    const g = Math.sin(Date.now() * 0.001 + 2) * 127 + 128;
    const b = Math.sin(Date.now() * 0.001 + 4) * 127 + 128;
    const color = `rgb(${r}, ${g}, ${b})`;

    if (asciiArt) asciiArt.style.color = color;
    if (scrollArrow) scrollArrow.style.color = color;

    requestAnimationFrame(pulseColor);
}

// Cinematic Player Functions
function openCinematicPlayer(videoId) {
    currentVideoIndex = videoId;
    const video = videoData[videoId];

    if (!video) return;

    // Set video source
    if (mainVideo) {
        const source = mainVideo.querySelector('source');
        if (source) {
            source.src = video.videoSrc;
            mainVideo.load();
        }
    }

    // Update project info
    const title = document.getElementById('projectTitle');
    const desc = document.getElementById('projectDescription');
    const meta = document.getElementById('projectMeta');
    const res = document.getElementById('hudRes');
    const fps = document.getElementById('hudFps');
    const codec = document.getElementById('hudCodec');

    if (title) title.textContent = video.title;
    if (desc) desc.textContent = video.description;
    if (meta) meta.textContent = video.meta;
    if (res) res.textContent = video.res;
    if (fps) fps.textContent = video.fps;
    if (codec) codec.textContent = video.codec;

    // Show player
    if (cinematicPlayer) cinematicPlayer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Play video
    setTimeout(() => {
        if (mainVideo) mainVideo.play().catch(e => console.log('Autoplay prevented:', e));
    }, 300);

    // Update navigation buttons
    updateNavButtons();
}

function closeCinematicPlayer() {
    if (cinematicPlayer) cinematicPlayer.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (mainVideo) {
        mainVideo.pause();
        mainVideo.currentTime = 0;
    }

    // Close info if open
    if (infoContent) infoContent.classList.remove('active');
}

function navigateVideo(direction) {
    const newIndex = currentVideoIndex + direction;

    if (newIndex >= 0 && newIndex < videoData.length) {
        if (mainVideo) mainVideo.pause();
        openCinematicPlayer(newIndex);
    }
}

function updateNavButtons() {
    if (prevBtn) prevBtn.disabled = currentVideoIndex === 0;
    if (nextBtn) nextBtn.disabled = currentVideoIndex === videoData.length - 1;
}

function toggleInfo() {
    if (infoContent) infoContent.classList.toggle('active');
}

// Keyboard Navigation
function handleKeyboard(e) {
    if (!cinematicPlayer || !cinematicPlayer.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            closeCinematicPlayer();
            break;
        case 'ArrowLeft':
            if (prevBtn && !prevBtn.disabled) navigateVideo(-1);
            break;
        case 'ArrowRight':
            if (nextBtn && !nextBtn.disabled) navigateVideo(1);
            break;
        case 'i':
        case 'I':
            toggleInfo();
            break;
        case ' ':
            e.preventDefault();
            if (mainVideo) {
                if (mainVideo.paused) {
                    mainVideo.play();
                } else {
                    mainVideo.pause();
                }
            }
            break;
    }
}

// Run setup when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
} else {
    setup();
}
