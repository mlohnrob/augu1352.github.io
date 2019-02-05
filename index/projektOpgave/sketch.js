let video;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  // capture.hide();
}

function modelReady() {
  console.log("Model Ready");
}

function draw() {
  image(video, 0, 0);
  }
