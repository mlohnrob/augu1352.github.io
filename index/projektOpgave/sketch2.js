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
	await faceapi.loadSsdMobilenetv1Model('./models');
	await faceapi.loadFaceLandmarkModel('./models');
	await faceapi.loadMtcnnModel('./models');
	await faceapi.loadFaceRecognitionModel('./models');

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
	const input = document.getElementById('inputVideo');
	const fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors();
	const mtcnnResults = await faceapi.mtcnn(document.getElementById('inputVideo'), mtcnnForwardParams);

	const detectionsArray = fullFaceDescriptions.map(fd => fd.detection);
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
	run();
	setTimeout(() => player());
}
