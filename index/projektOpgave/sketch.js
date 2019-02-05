let video;
let features;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  features = ml5.featureExtractor('MobileNet', modelReady);
}

function modelReady() {
  console.log("Model Ready");
}

function draw() {
  image(video, 0, 0);
  }
