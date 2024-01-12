let boxes = [];
let boxSize = 100;
let trailAlpha = 0.5;
let bgColor;
let isBoxMoving = true;
let boxSpeedSlider;
let colorIntensitySlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(0);

  boxSpeedSlider = createSlider(1, 10, 5, 0.1);
  boxSpeedSlider.position(20, height + 10);

  colorIntensitySlider = createSlider(0, 1, 0.5, 0.01);
  colorIntensitySlider.position(20, height + 40);

  // Your existing createBox calls...
}

function draw() {
  background(bgColor.levels[0], bgColor.levels[1], bgColor.levels[2], trailAlpha);

  // Update boxSpeed and colorIntensity based on sliders
  let boxSpeed = boxSpeedSlider.value();
  let colorIntensity = colorIntensitySlider.value();

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].updateSpeed(boxSpeed);
    boxes[i].updateColorIntensity(colorIntensity);
    boxes[i].display();
    boxes[i].move();
  }
}

// Add the following methods to your createBox object definition:

// Add these two properties to the createBox object:
// speedMultiplier: 1,
// colorIntensity: 0.5,

updateSpeed: function (speedMultiplier) {
  this.xSpeed = random(1, 3) * speedMultiplier;
  this.ySpeed = random(1, 3) * speedMultiplier;
},

updateColorIntensity: function (intensity) {
  this.color.levels[3] = 255 * intensity;
},

// The rest of your existing createBox object definition...
