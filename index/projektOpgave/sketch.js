let capture;

function setup() {
  createCanvas(320, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  // capture.hide();
}

function modelReady() {
  console.log("Model Ready");
}

function draw() {
  image(capture, 0, 0, 320, 240);
  }
