let outerParticles = [];
let innerParticles = [];
let numOuterParticles = 8000;
let numInnerParticles = 2000;
let galaxyRadius = 200;
let innerRadius = 50;
let rotationSpeed = 0.02;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100);
  // Your setup code here
}

function draw() {
  background(0);
  orbitControl();
  // Your draw code here
}

class Particle {
  constructor(x, y, z, speed, color) {
    this.position = createVector(x, y, z);
    this.velocity = p5.Vector.random3D().mult(speed);
    this.color = color;
    this.radius = 0.5;
  }

  update() {
    // Your update code here
  }

  display() {
    // Your display code here
  }
}
