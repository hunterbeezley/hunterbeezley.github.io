document.addEventListener("DOMContentLoaded", function() {
    const videoContainer = document.getElementById("video-container");
    const loadingScreen = document.getElementById("loading");

    // Hide the video container initially
    videoContainer.style.display = "none";

    // Show the loading screen
    loadingScreen.style.display = "flex";

    // When the page is loaded
    window.onload = function() {
        // Hide the loading screen
        loadingScreen.style.display = "none";
        // Show the video container
        videoContainer.style.display = "block";
    };
});
