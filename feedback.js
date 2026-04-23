// LinkedIn Profile Button
// This script creates a floating button with p5.js animation that links to LinkedIn

// p5.js sketch for particle orbit button (LinkedIn Link)
let feedbackSketch = function(p) {
    let particles = [];
    let angle = 0;

    p.setup = function() {
        let canvas = p.createCanvas(120, 120);
        canvas.parent('feedback-button-container');
        canvas.style('cursor', 'pointer');

        // Create particles with different orbits
        let colors = [
            p.color(0, 217, 255),    // cyan
            p.color(255, 0, 110),    // pink
            p.color(255, 190, 11)    // yellow
        ];

        for (let i = 0; i < 8; i++) {
            particles.push({
                angle: p.random(p.TWO_PI),
                radius: p.random(45, 55),
                speed: p.random(0.01, 0.03),
                size: p.random(3, 6),
                color: colors[i % colors.length]
            });
        }
    };

    p.draw = function() {
        p.clear();
        p.push();
        p.translate(60, 60);

        // Draw main button circle with gradient
        let gradient = p.drawingContext.createRadialGradient(0, 0, 0, 0, 0, 30);
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 0, 110, 0.8)');
        p.drawingContext.fillStyle = gradient;
        p.noStroke();
        p.circle(0, 0, 60);

        // Draw orbiting particles
        particles.forEach(particle => {
            let x = p.cos(particle.angle) * particle.radius;
            let y = p.sin(particle.angle) * particle.radius;

            // Particle glow
            p.fill(particle.color.levels[0], particle.color.levels[1], particle.color.levels[2], 100);
            p.circle(x, y, particle.size + 4);

            // Particle core
            p.fill(particle.color);
            p.circle(x, y, particle.size);

            // Update angle
            particle.angle += particle.speed;
        });

        // Draw emoji (LinkedIn indicator)
        p.fill(10);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(24);
        p.text('💼', 0, 0);

        p.pop();
    };

    p.mousePressed = function() {
        let d = p.dist(p.mouseX, p.mouseY, 60, 60);
        if (d < 30) {
            window.open('https://www.linkedin.com/in/hunterbeezley/', '_blank');
        }
    };
};

// Initialize system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create button container if it doesn't exist
    if (!document.getElementById('feedback-button-container')) {
        const containerHTML = `<div id="feedback-button-container" aria-label="LinkedIn" role="button" tabindex="0"></div>`;
        document.body.insertAdjacentHTML('beforeend', containerHTML);
    }

    // Button keyboard support
    const container = document.getElementById('feedback-button-container');
    if (container) {
        container.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open('https://www.linkedin.com/in/hunterbeezley/', '_blank');
            }
        });
    }

    // Initialize p5 button after page loads
    if (typeof p5 !== 'undefined') {
        new p5(feedbackSketch);
    } else {
        console.warn('p5.js not loaded - button animation disabled');
    }
});
