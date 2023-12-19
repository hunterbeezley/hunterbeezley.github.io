let boxes = [];
let boxLifespan = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 50; i++) {
    createRandomBox();
  }
}

function draw() {
  background(0, 10);

  let mousePos = createVector(mouseX, mouseY);

  for (let i = boxes.length - 1; i >= 0; i--) {
    let box = boxes[i];

    let direction = p5.Vector.sub(mousePos, box.pos);
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
