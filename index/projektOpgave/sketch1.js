let canvas;
let video;
let features;
let knn;
let labelP;
let ready = false;
let fullFaceDescriptions;

// import * as faceapi from 'face-api.js';


function setup() {
	canvas = createCanvas(480, 480);
	video = createCapture(VIDEO);
	video.size(480, 480);
	video.hide();
	features = ml5.featureExtractor('MobileNet', modelReady);
	knn = ml5.KNNClassifier();
	labelP = createP("Need Training Data");
	labelP.style("font-size", "32pt");
}




function modelReady() {
	console.log("Model Ready");
}

function getResult() {
	const logits = features.infer(video);
	knn.classify(logits, function(error, result) {
		if (error) {
			console.error(error);
		} else {
			const confidences = result.confidencesByLabel;
			labelP.html("The Result Is: " + result.label + " with a confidence of " + (confidences[result.label] * 100) + "%");
			getResult();
		}
	});
}

function trainFirst() {
	const logits = features.infer(video);
	labelP.html("Training First...");
	(function theLoop(i) {
		setTimeout(function() {
			knn.addExample(logits, "one");
			console.log("Nummer 1");
			if (--i) {
				theLoop(i);
			}
		}, 100);
	})(75);
	labelP.html("Done Training First!");
}

function trainSecond() {
	const logits = features.infer(video);
	labelP.html("Training Second...");
	(function theLoop(i) {
		setTimeout(function() {
			knn.addExample(logits, "two");
			console.log("Nummer 2");
			if (--i) {
				theLoop(i);
			}
		}, 100);
	})(75);
	labelP.html("Done Training Second!");
}

function trainThird() {
	const logits = features.infer(video);
	labelP.html("Training Third...");
	(function theLoop(i) {
		setTimeout(function() {
			knn.addExample(logits, "three");
			console.log("Nummer 3");
			if (--i) {
				theLoop(i);
			}
		}, 100);
	})(75);
	labelP.html("Done Training Third!");
}


function trainFourth() {
	const logits = features.infer(video);
	labelP.html("Training Fourth...");
	(function theLoop(i) {
		setTimeout(function() {
			knn.addExample(logits, "four");
			console.log("Nummer 4");
			if (--i) {
				theLoop(i);
			}
		}, 100);
	})(75);
	labelP.html("Done Training Fourth!");
}

function changeLabels(text) {
	console.error(text)
}

function draw() {
	image(video, 0, 0);
	console.log(video);
	if (!ready && knn.getNumLabels() > 0) {
		getResult();
		ready = true;
	}

	fullFaceDescriptions = faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
	const detectionsArray = fullFaceDescriptions.map(fd => fd.detection);
	faceapi.drawDetection(canvas, detectionsArray, { withScore: true });

}
