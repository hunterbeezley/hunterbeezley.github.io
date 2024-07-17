let boxes = [];
let boxSize = 100;
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
  createBox("Instagram", "https://www.instagram.com/h__nt3r_/");

  // Create a box for the "Visuals" hyperlink
  createBox("Visuals", "visuals_1/index.html");

  // Create a box for the "Spotify" hyperlink
  createBox("Spotify", "https://open.spotify.com/playlist/5EuZIHbO7mhNekVu1VXVFu?si=384c7d8aa2324026");

  // Add event listener for the "scramble" button
  let scrambleButton = select("#scrambleButton");
  scrambleButton.mousePressed(scrambleBoxes);
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
    rotationAngle: 0,
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
        }
        if (this.y < 0 || this.y > height - boxSize) {
          this.ySpeed *= -1;
        }
      }
      this.rotationAngle += this.rotationSpeed;
    }
  };
  boxes.push(newBox);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
