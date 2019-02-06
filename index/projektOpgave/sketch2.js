// let canvas;
// let video;
//
// function setup() {
// 	canvas = createCanvas(480, 480);
// 	video = createCapture(VIDEO);
// 	video.size(480, 480);
// 	video.hide();
// }

// import * as faceapi from './face-api.js';
// const faceapi = require("face-api.js");

$(document).ready(function() {
	// console.log(faceapi.loadMtcnnModel());
	run();
})

async function run() {
	// load the models
	// console.log(faceapi);
	faceapi.loadSsdMobilenetv1Model('./models');
	faceapi.loadFaceLandmarkModel('./models');
	faceapi.loadMtcnnModel("./models");
	faceapi.loadFaceRecognitionModel('./models');
	// console.log(mobileNetModelVar);
	// console.log(faceLandmarkModelVar);
	// console.log(mtcnnModelVar);
	// console.log(faceRecognitionModelVar);

	// try to access users webcam and stream the images
	// to the video element
	const videoEl = document.getElementById('inputVideo');
	navigator.getUserMedia({
			video: {}
		},
		stream => videoEl.srcObject = stream,
		err => console.error(err)
	);

	const mtcnnForwardParams = {
		// limiting the search space to larger faces for webcam detection
		minFaceSize: 200
	};
	// const options = new faceapi.MtcnnOptions(mtcnnParams);
	// const input = document.getElementById('inputVideo');
	// let fullFaceDescriptions = faceapi.detectAllFaces(videoEl).withFaceLandmarks().withFaceDescriptors();
	// fullFaceDescriptions = Array.from(fullFaceDescriptions);
	// console.log(fullFaceDescriptions);
	let mtcnnResults = faceapi.mtcnn(videoEl, mtcnnForwardParams);
	mtcnnResults = Array.from(mtcnnResults);

	// const detectionsArray = fullFaceDescriptions.map(fd => fd.detection);
	// console.log(detectionsArray);
	// faceapi.drawDetection('overlay', detectionsArray, {
	// 	withScore: true
	// });

	//
	//
	faceapi.drawDetection('overlay', mtcnnResults.map(res => res.faceDetection), {
		withScore: false
	});
	// faceapi.drawLandmarks('overlay', mtcnnResults.map(res => res.faceLandmarks), {
	// 	lineWidth: 4,
	// 	color: 'red'
	// });

}

const input = document.getElementById('inputVideo');
input.onplay = async function player() {
	// console.log("playing...");
	run();
	setTimeout(() => player());
}
