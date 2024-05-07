let outerParticles = [];
let innerParticles = [];
let numOuterParticles = 8000;
let numInnerParticles = 2000;
let galaxyRadius = 200;
let innerRadius = 50; // Reduced inner radius
let rotationSpeed = 0.02; // Adjust rotation speed

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100);
  
  // Set initial camera position
  camera(0, 0, 2000); // Move back along the z-axis
  
  // Create outer particles (blue)
  for (let i = 0; i < numOuterParticles; i++) {
    let phi = random(TWO_PI);
    let theta = random(TWO_PI);
    let x = galaxyRadius * sin(phi) * cos(theta);
    let y = galaxyRadius * sin(phi) * sin(theta);
    let z = galaxyRadius * cos(phi);
    let speed = random(0.005, 0.03); // Adjusted swirling speed
    let hue = map(i, 0, numOuterParticles, 180, 240); // Blue hues
    let saturation = 100;
    let brightness = 100;
    outerParticles.push(new Particle(x, y, z, speed, color(hue, saturation, brightness)));
  }
  
  // Create inner particles (purple)
  for (let i = 0; i < numInnerParticles; i++) {
    let phi = random(TWO_PI);
    let theta = random(TWO_PI);
    let x = innerRadius * sin(phi) * cos(theta);
    let y = innerRadius * sin(phi) * sin(theta);
    let z = innerRadius * cos(phi);
    let speed = random(0.005, 0.03); // Adjusted swirling speed
    let hue = map(i, 0, numInnerParticles, 270, 330); // Purple hues
    let saturation = 100;
    let brightness = 100;
    innerParticles.push(new Particle(x, y, z, speed, color(hue, saturation, brightness)));
  }
}

function draw() {
  background(0);
  orbitControl();
  
  // Rotate the entire scene
  rotateX(frameCount * rotationSpeed);
  rotateY(frameCount * rotationSpeed);
  
  // Render outer particles
  for (let i = 0; i < outerParticles.length; i++) {
    outerParticles[i].update();
    outerParticles[i].display();
  }
  
  // Render inner particles
  for (let i = 0; i < innerParticles.length; i++) {
    innerParticles[i].update();
    innerParticles[i].display();
  }
}

class Particle {
  constructor(x, y, z, speed, color) {
    this.position = createVector(x, y, z);
    this.velocity = p5.Vector.random3D().mult(speed);
    this.color = color;
    this.radius = 0.5; // Smaller particles
  }
  
  update() {
    // Add swirling motion within the confines of the galaxy radius
    let angle = atan2(this.position.y, this.position.x);
    let distanceFromCenter = this.position.mag();
    let swirlingSpeed = map(distanceFromCenter, 0, galaxyRadius, 0.01, 0.1); // Adjusted swirling speed
    angle += swirlingSpeed;
    this.velocity.x = cos(angle) * this.velocity.mag();
    this.velocity.y = sin(angle) * this.velocity.mag();
    
    // Update position
    this.position.add(this.velocity);
    
    // Limit position within galaxy radius
    let distance = this.position.mag();
    if (distance > galaxyRadius) {
      this.position.normalize().mult(galaxyRadius);
    }
  }
  
  display() {
    noStroke();
    fill(this.color);
    push();
    translate(this.position.x, this.position.y, this.position.z);
    sphere(this.radius);
    pop();
  }
}
