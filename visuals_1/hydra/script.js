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

        // Randomly select and run an animation
        const animations = [initFirstAnimation, initSecondAnimation];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        randomAnimation();

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

function initFirstAnimation() {
    console.log("Initializing first Hydra animation");
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

        console.log("First animation code executed");
    } catch (error) {
        console.error("Error in first animation code:", error);
        document.body.innerHTML += `<p style='color: white; text-align: center;'>Animation error: ${error.message}</p>`;
    }
}

function initSecondAnimation() {
    console.log("Initializing second Hydra animation");
    try {
        s0.initCam();

        solid(() => Math.sin(time) + 1.393 * 11.573)
            .diff(noise(2)
                .add(src(o0))
                .color(1.223, 0.495, 0.281))
            .modulate(noise(8.12, 0.505, 0.446))
            .mask(s0).colorama(0, 0, 0).saturate(() => Math.sin(time) * 2)
            .out(o0);

        render(o0);

        console.log("Second animation code executed");
    } catch (error) {
        console.error("Error in second animation code:", error);
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
    const canvas = document.querySelector('canvas');
    const stream = canvas.captureStream(30); // 30 FPS

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(audioStream => {
            const combinedStream = new MediaStream([
                ...stream.getTracks(),
                ...audioStream.getTracks()
            ]);

            recorder = new RecordRTC(combinedStream, {
                type: 'video',
                mimeType: 'video/webm',
                bitsPerSecond: 128000
            });

            recorder.startRecording();
            isRecording = true;
        })
        .catch(error => {
            console.error("Error accessing audio:", error);
        });
}

function stopRecording() {
    recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'hydra-recording.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    });
    isRecording = false;
}

document.addEventListener('DOMContentLoaded', initializeHydra);
