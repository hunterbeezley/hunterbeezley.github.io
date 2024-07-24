let hydra;
let recorder;
let isRecording = false;

function initializeHydra() {
    console.log("Initializing Hydra...");

    try {
        const canvas = document.getElementById('hydra-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            throw new Error("WebGL is not supported. Hydra requires WebGL to run.");
        }

        console.log("WebGL is supported. Creating Hydra instance...");

        hydra = new Hydra({
            canvas: canvas,
            detectAudio: true,
            enableStreamCapture: true
        });

        console.log("Hydra instance created successfully");

        initHydraAnimation();

        const recordButton = document.getElementById('record-button');
        recordButton.addEventListener('click', toggleRecording);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

    } catch (error) {
        console.error("Error initializing Hydra:", error);
        document.body.innerHTML += `<p style='color: white; text-align: center;'>An error occurred: ${error.message}</p>`;
    }
}

function initHydraAnimation() {
    console.log("Initializing Hydra animation");
    try {
        a.setBins(8);
        console.log("Bins set");

        s0.initCam();
        console.log("Camera initialized");

        osc(1, 0.1, 1.5).diff(src(s0).luma(.02))
            .diff(osc(200).pixelate(200).modulate(noise(3), () => {
                return a.fft[0];
            }))
            .out();

        console.log("Animation code executed");
    } catch (error) {
        console.error("Error in animation code:", error);
        document.body.innerHTML += `<p style='color: white; text-align: center;'>Animation error: ${error.message}</p>`;
    }
}

function toggleRecording() {
    const recordButton = document.getElementById('record-button');
    if (!isRecording) {
        startRecording();
        recordButton.textContent = 'Stop Recording';
        recordButton.classList.add('recording');
    } else {
        stopRecording();
        recordButton.textContent = 'Start Recording';
        recordButton.classList.remove('recording');
    }
}

function startRecording() {
    const canvas = document.querySelector
