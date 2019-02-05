let video;
let features;
let knn;

function setup() {
	createCanvas(320, 240);
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();
	features = ml5.featureExtractor('MobileNet', modelReady);
	knn = ml5.KNNClassifier();
}

function gotResult(error, result) {
	if (error) {
		console.error(error);
	} else {
		console.log(result);
	}
}


function modelReady() {
	console.log("Model Ready");
}

function getResult() {
	if (knn.getNumLabels() > 0) {
		const logits = features.infer(video);
		knn.classify(logits, gotResult);
	}
}

function keyPressed() {
	const logits = features.infer(video);
	if (key == "1") {
		knn.addExample(logits, "one");
		console.log("Nummer 1");
	} else if (key == "2") {
		knn.addExample(logits, "two");
		console.log("Nummer 2");
	}
	if (key == " ") {

	}
}

function draw() {
	image(video, 0, 0);
}
