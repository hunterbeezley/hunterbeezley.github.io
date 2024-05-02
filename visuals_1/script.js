document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("background-video");

    // Ensure the video loops seamlessly
    video.addEventListener("ended", function() {
        video.play();
    });

    // Optional: If you want to handle resizing of the window
    window.addEventListener("resize", function() {
        adjustVideoSize();
    });

    function adjustVideoSize() {
        const container = document.getElementById("video-container");
        video.style.width = container.offsetWidth + "px";
        video.style.height = container.offsetHeight + "px";
    }

    // Initial adjustment of video size
    adjustVideoSize();
});
