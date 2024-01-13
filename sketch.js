let boxes = [];
let boxSize = 100;
let boxSpeed = 5;
let trailAlpha = 0.5;
let bgColor;
let isBoxMoving = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(0);

  // Create a box for the "My Resume" hyperlink
  createBox("My Resume", "https://hunterbeezley.github.io/Hunter%20C._Beezley_Resume.pdf");

  // Create a box for the "GitHub" hyperlink
  createBox("GitHub", "https://github.com/hunterbeezley");

  // Create a box for the "Instagram" hyperlink
  createBox("Instagram", "https://www.instagram.com/hbeezley/");

  // Create a box for the "Contact" hyperlink
  createBox("Contact", "contact.html");

  // Create a box for the "Spotify" hyperlink
  createBox("Spotify", "https://open.spotify.com/playlist/5EuZIHbO7mhNekVu1VXVFu?si=384c7d8aa2324026");
}

function draw() {
  background(bgColor.levels[0], bgColor.levels[1], bgColor.levels[2], trailAlpha);

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].display();
    boxes[i].move();
  }
}

function createBox(label, link) {
  let newBox = {
    x: random(width - boxSize),
    y: random(height - boxSize),
    xSpeed: random(1, 3),
    ySpeed: random(1, 3),
    rotationAngle: 0, // Set rotation angle to 0
    rotationSpeed: 0.1,
    color: color(random(255), random(255), random(255), 255),
    label: label,
    link: link,
    display: function () {
      push();
      translate(this.x + boxSize / 2, this.y + boxSize / 2);
      rotate(this.rotationAngle);
      fill(this.color);
      rect(-boxSize / 2, -boxSize / 2, boxSize, boxSize);
      
      fill(0);
      textSize(16);
      textAlign(CENTER, CENTER);
      
      // Rotate the text in the opposite direction of the box rotation
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
          // Once it completes one full rotation, reset the rotation angle
          this.rotationAngle = 0;
        }
      }
    }
  };

  boxes.push(newBox);
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
          isBoxMoving = true; // Reactivate box movement after 5 seconds
        }, 5000);
      }, 1000); // Adjust the delay as needed
    }
  }
}

function openHyperlink(link) {
  window.location.href = link;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
