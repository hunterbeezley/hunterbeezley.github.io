// Feedback Button and Modal System
// This script creates a floating feedback button with p5.js animation and handles feedback submission

// p5.js sketch for particle orbit button
let feedbackSketch = function(p) {
    let particles = [];
    let angle = 0;

    p.setup = function() {
        let canvas = p.createCanvas(120, 120);
        canvas.parent('feedback-button-container');
        canvas.style('cursor', 'pointer');

        // Create particles with different orbits
        for (let i = 0; i < 8; i++) {
            particles.push({
                angle: (p.TWO_PI / 8) * i,
                radius: 40,
                size: 6,
                speed: 0.02 + i * 0.001
            });
        }

        // Add click handler
        canvas.mousePressed(() => {
            openFeedbackModal();
        });
    };

    p.draw = function() {
        p.clear();

        // Draw center circle
        p.fill(0, 217, 255, 200);
        p.noStroke();
        p.circle(60, 60, 30);

        // Draw "?" symbol
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(20);
        p.text('?', 60, 60);

        // Draw orbiting particles
        angle += 0.01;

        particles.forEach((particle, i) => {
            let x = 60 + p.cos(angle + particle.angle) * particle.radius;
            let y = 60 + p.sin(angle + particle.angle) * particle.radius;

            // Gradient effect
            let hue = p.map(i, 0, particles.length, 0, 255);
            p.fill(0, 217, 255, 180);
            p.circle(x, y, particle.size);

            // Trail effect
            p.fill(112, 0, 255, 100);
            p.circle(x, y, particle.size * 1.5);
        });
    };
};

// Feedback modal functions
function openFeedbackModal() {
    document.getElementById('feedback-modal').classList.add('active');
}

function closeFeedbackModal() {
    document.getElementById('feedback-modal').classList.remove('active');
}

function collectContextData() {
    const context = {
        page: window.location.href,
        browser: navigator.userAgent.split(' ').slice(-2).join(' '),
        platform: navigator.platform,
        screenSize: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };

    // Collect console errors if any
    const errors = [];
    const originalError = console.error;
    console.error = function(...args) {
        errors.push(args.join(' '));
        originalError.apply(console, args);
    };

    context.consoleErrors = errors.length > 0 ? errors.join('\n') : 'None';

    return context;
}

function generateIssueBody(message, contact) {
    const context = collectContextData();

    return `**Feedback:**
${message}

**Contact Info:**
${contact || 'Not provided'}

---

**Technical Context:**
- **Page:** ${context.page}
- **Browser:** ${context.browser}
- **Platform:** ${context.platform}
- **Screen Size:** ${context.screenSize}
- **Viewport:** ${context.viewport}
- **Timestamp:** ${context.timestamp}
- **Console Errors:** ${context.consoleErrors}

<details>
<summary>Full User Agent</summary>

\`\`\`
${context.userAgent}
\`\`\`
</details>`;
}

function submitFeedback(message, contact) {
    const issueBody = generateIssueBody(message, contact);

    // Create mailto link
    const subject = encodeURIComponent('Website Feedback');
    const body = encodeURIComponent(issueBody);
    const mailtoLink = `mailto:contact@hunterbeezley.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Also copy to clipboard for convenience
    navigator.clipboard.writeText(issueBody).then(() => {
        const successMsg = document.getElementById('feedback-success');
        successMsg.textContent = '✓ Opening email client and copied to clipboard!';
        successMsg.classList.add('show');

        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 4000);
    }).catch(() => {
        // If clipboard fails, just show email opening message
        const successMsg = document.getElementById('feedback-success');
        successMsg.textContent = '✓ Opening email client...';
        successMsg.classList.add('show');

        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 3000);
    });

    // Reset form and close after a delay
    setTimeout(() => {
        document.getElementById('feedback-form-element').reset();
        closeFeedbackModal();
    }, 1500);
}

function copyFeedbackToClipboard(message, contact) {
    const issueBody = generateIssueBody(message, contact);

    navigator.clipboard.writeText(issueBody).then(() => {
        // Show success message
        const successMsg = document.getElementById('feedback-success');
        successMsg.classList.add('show');

        // Hide after 3 seconds
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy feedback:', err);
        alert('Failed to copy to clipboard. Please try again.');
    });
}

// Initialize feedback system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create feedback HTML if it doesn't exist
    if (!document.getElementById('feedback-button-container')) {
        const feedbackHTML = `
            <!-- Floating Feedback Button Container -->
            <div id="feedback-button-container" aria-label="Submit feedback" role="button" tabindex="0"></div>

            <!-- Feedback Modal -->
            <div class="feedback-modal" id="feedback-modal">
                <div class="feedback-form">
                    <h2>Send Feedback</h2>
                    <form id="feedback-form-element">
                        <label for="feedback-message">Your feedback *</label>
                        <textarea id="feedback-message" required placeholder="Share your thoughts, report an issue, or suggest an improvement..."></textarea>

                        <label for="feedback-contact">Contact info (optional)</label>
                        <input type="text" id="feedback-contact" placeholder="Email or preferred contact method">

                        <div class="feedback-form-actions">
                            <button type="button" class="btn-cancel" id="feedback-cancel">Cancel</button>
                            <button type="button" class="btn-copy" id="feedback-copy">Copy</button>
                            <button type="submit" class="btn-submit" id="feedback-submit">Send Feedback</button>
                        </div>

                        <div class="feedback-info">
                            Clicking "Send Feedback" will open your email client with pre-filled content. Or click "Copy" to copy the feedback text to your clipboard.
                            <br><br>
                            We automatically include technical details (browser, device, page, console errors) to help understand your feedback.
                        </div>

                        <div class="feedback-success" id="feedback-success">
                            ✓ Feedback copied to clipboard!
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', feedbackHTML);
    }

    // Button keyboard support
    const container = document.getElementById('feedback-button-container');
    if (container) {
        container.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFeedbackModal();
            }
        });
    }

    // Cancel button
    document.getElementById('feedback-cancel').addEventListener('click', closeFeedbackModal);

    // Close on background click
    document.getElementById('feedback-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeFeedbackModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFeedbackModal();
        }
    });

    // Copy button
    document.getElementById('feedback-copy').addEventListener('click', function() {
        const message = document.getElementById('feedback-message').value;
        const contact = document.getElementById('feedback-contact').value;

        if (message.trim()) {
            copyFeedbackToClipboard(message, contact);
        } else {
            alert('Please enter your feedback first.');
        }
    });

    // Form submission
    document.getElementById('feedback-form-element').addEventListener('submit', function(e) {
        e.preventDefault();
        const message = document.getElementById('feedback-message').value;
        const contact = document.getElementById('feedback-contact').value;

        if (message.trim()) {
            submitFeedback(message, contact);
        } else {
            alert('Please enter your feedback first.');
        }
    });

    // Initialize p5 feedback button after page loads
    if (typeof p5 !== 'undefined') {
        new p5(feedbackSketch);
    } else {
        console.warn('p5.js not loaded - feedback button animation disabled');
    }
});
