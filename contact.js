let boxes = [];
let boxLifespan = 200;

let button;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create the "Take me somewhere else" button
  button = createButton('Take me somewhere else');
  button.position(width / 2 - button.width / 2, height / 2 - button.height / 2);
  button.mousePressed(goSomewhereElse);
  button.style('background-color', 'transparent'); // Set button background to transparent
  button.style('color', '#fff'); // Set button text color to white
  button.style('border', '2px solid #fff'); // Set button border style
  button.style('border-radius', '5px'); // Set button border radius
  button.style('padding', '8px 16px'); // Set button padding
  button.style('font-size', '16px'); // Set button font size
  button.style('cursor', 'pointer'); // Set button cursor style

  // Create initial random boxes
  for (let i = 0; i < 50; i++) {
    createRandomBox();
  }
}

function draw() {
  background(0, 10);

  // Draw and update random boxes
  for (let i = boxes.length - 1; i >= 0; i--) {
    let box = boxes[i];

    let direction = p5.Vector.sub(createVector(mouseX, mouseY), box.pos);
    direction.normalize();

    box.boxSpeed = direction.mult(random(1, 3));
    box.pos.add(box.boxSpeed);

    if (box.pos.x < 0 || box.pos.x > width || box.pos.y < 0 || box.pos.y > height) {
      createRandomBox();
      boxes.splice(i, 1);
    }

    fill(box.col);
    noStroke();
    rect(box.pos.x, box.pos.y, box.boxSize, box.boxSize);

    box.lifespan--;
    if (box.lifespan <= 0) {
      createRandomBox();
      boxes.splice(i, 1);
    }
  }
}

function createRandomBox() {
  let col = color(random(255), random(255), random(255));
  let pos;
  let boxSize = random(10, 30);
  let boxSpeed = p5.Vector.random2D().mult(random(1, 3));
  let lifespan = boxLifespan;

  if (random() < 0.25) {
    pos = createVector(random(width), 0);
  } else if (random() < 0.5) {
    pos = createVector(random(width), height);
  } else if (random() < 0.75) {
    pos = createVector(0, random(height));
  } else {
    pos = createVector(width, random(height));
  }

  boxes.push({ pos, boxSize, col, boxSpeed, lifespan });
}

function goSomewhereElse() {
  window.location.href = 'https://somewhere-else.com'; // Replace with the actual URL
}
