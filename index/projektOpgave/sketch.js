let video;
let features;
let knn;
let output;

function setup() {
	createCanvas(480, 480);
	video = createCapture(VIDEO);
	video.size(480, 480);
	video.hide();
	features = ml5.featureExtractor('MobileNet', modelReady);
	knn = ml5.KNNClassifier();
}

function gotResult(error, result) {
	if (error) {
		console.error(error);
	} else {
		const confidences = result.confidencesByLabel;
		console.log(result);
		output = document.getElementById("output");
		output.innerHTML = "The Result Is: " + result.label + " with a confidence of " + (confidences[result.label] * 100) + "%";
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

function trainFirst() {
	const logits = features.infer(video);
	for (i = 0; i < 150; i++) {
		knn.addExample(logits, "one");
		console.log("Nummer 1");
	}
}

function trainSecond() {
	const logits = features.infer(video);
	for (i = 0; i < 150; i++) {
		knn.addExample(logits, "two");
		console.log("Nummer 2");
	}
}

function trainThird() {
	const logits = features.infer(video);
	for (i = 0; i < 150; i++) {
		knn.addExample(logits, "three");
		console.log("Nummer 3");
	}
}

function trainFourth() {
	const logits = features.infer(video);
	for (i = 0; i < 150; i++) {
		knn.addExample(logits, "four");
		console.log("Nummer 4");
	}
}

function changeLabels(text) {
	console.error(text)
}

function draw() {
	image(video, 0, 0);
}
