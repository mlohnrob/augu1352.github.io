let video;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
}

function modelReady() {
  console.log("Model Ready");
}

function draw() {
  image(video, 0, 0, width, width * video.height / video.width);
}
