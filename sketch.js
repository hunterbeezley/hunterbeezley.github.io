let boxes = [];
let boxSize = 100;
let trailAlpha = 0.5;
let bgColor;
let isBoxMoving = true;
let focusedBoxIndex = 0; // Track which box has keyboard focus

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(0);

  // Create a box for the "My Resume" hyperlink
  // NOTE: You need to export your resume as a PDF and place it in the root directory
  // File: Hunter_Beezley_Resume.pdf
  createBox("My Resume", "Hunter_Beezley_Resume.pdf");

  // Create a box for the "GitHub" hyperlink
  createBox("GitHub", "https://github.com/hunterbeezley");

  // Create a box for the "Instagram" hyperlink
  createBox("Instagram", "https://www.instagram.com/h__nt3r_/");

  // Create a box for the "Visuals" hyperlink
  createBox("Visuals", "visuals_1/index.html");

  // Create a box for the "tiktok" hyperlink
  createBox("TikTok", "https://www.tiktok.com/@h_nt3r_");

  // Create a box for the "linkedIn" hyperlink
  createBox("LinkedIn", "https://www.linkedin.com/in/hunterbeezley/");

  // Add event listener for the "scramble" button
  let scrambleButton = select("#scrambleButton");
  scrambleButton.mousePressed(scrambleBoxes);
}

function draw() {
  background(bgColor.levels[0], bgColor.levels[1], bgColor.levels[2], trailAlpha);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display(i === focusedBoxIndex);
    boxes[i].move();
  }
}

function createBox(label, link) {
  let newBox = {
    x: random(width - boxSize),
    y: random(height - boxSize),
    xSpeed: random(1, 3),
    ySpeed: random(1, 3),
    rotationAngle: 0,
    rotationSpeed: 0.1,
    color: color(random(255), random(255), random(255), 255),
    label: label,
    link: link,
    display: function (isFocused) {
      push();
      translate(this.x + boxSize / 2, this.y + boxSize / 2);
      rotate(this.rotationAngle);

      // Draw focus indicator if this box is focused
      if (isFocused) {
        strokeWeight(4);
        stroke(255, 255, 0); // Yellow focus indicator
        fill(this.color);
        rect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);
        noStroke();
      } else {
        fill(this.color);
        noStroke();
        rect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);
      }

      fill(0);
      textSize(16);
      textAlign(CENTER, CENTER);

      rotate(-this.rotationAngle);
      text(this.label, 0, 0);

      pop();
    },
    move: function () {
      if (isBoxMoving) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x < 0 || this.x > width - boxSize) {
          this.xSpeed *= -1;
          this.color = color(random(255), random(255), random(255), 255);
        }
        if (this.y < 0 || this.y > height - boxSize) {
          this.ySpeed *= -1;
          this.color = color(random(255), random(255), random(255), 255);
        }
      } else {
        this.rotationAngle += this.rotationSpeed;
        if (this.rotationAngle > PI * 2) {
          this.rotationAngle = 0;
        }
      }
    }
  };

  boxes.push(newBox);
}

function scrambleBoxes() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].xSpeed *= 5;
    boxes[i].ySpeed *= 5;
  }

  setTimeout(() => {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].xSpeed /= 5;
      boxes[i].ySpeed /= 5;
    }
  }, 3000);
}

function mousePressed() {
  for (let i = 0; i < boxes.length; i++) {
    let currentBox = boxes[i];
    if (
      mouseX > currentBox.x &&
      mouseX < currentBox.x + boxSize &&
      mouseY > currentBox.y &&
      mouseY < currentBox.y + boxSize
    ) {
      isBoxMoving = false;
      setTimeout(() => {
        openHyperlink(currentBox.link);
        setTimeout(() => {
          isBoxMoving = true;
        }, 5000);
      }, 1000);
    }
  }
}

function openHyperlink(link) {
  window.location.href = link;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Keyboard navigation support
function keyPressed() {
  // Tab key (keyCode 9) - cycle through boxes
  if (keyCode === 9) {
    focusedBoxIndex = (focusedBoxIndex + 1) % boxes.length;
    return false; // Prevent default tab behavior
  }

  // Enter key (keyCode 13) - activate focused box
  if (keyCode === 13 || keyCode === 32) { // Enter or Space
    if (boxes.length > 0) {
      isBoxMoving = false;
      let focusedBox = boxes[focusedBoxIndex];
      setTimeout(() => {
        openHyperlink(focusedBox.link);
        setTimeout(() => {
          isBoxMoving = true;
        }, 5000);
      }, 1000);
    }
    return false; // Prevent default behavior
  }

  // Arrow keys for navigation
  if (keyCode === LEFT_ARROW || keyCode === UP_ARROW) {
    focusedBoxIndex = (focusedBoxIndex - 1 + boxes.length) % boxes.length;
    return false;
  }
  if (keyCode === RIGHT_ARROW || keyCode === DOWN_ARROW) {
    focusedBoxIndex = (focusedBoxIndex + 1) % boxes.length;
    return false;
  }
}
