export function run() {
	// load the models
	// console.log(faceapi);
	const mobileNetModelVar = faceapi.loadSsdMobilenetv1Model('./models');
	const faceLandmarkModelVar = faceapi.loadFaceLandmarkModel('./models');
	const mtcnnModelVar = faceapi.loadMtcnnModel("./models");
	const faceRecognitionModelVar = faceapi.loadFaceRecognitionModel('./models');
	// console.log(mobileNetModelVar);
	// console.log(faceLandmarkModelVar);
	// console.log(mtcnnModelVar);
	// console.log(faceRecognitionModelVar);

	// try to access users webcam and stream the images
	// to the video element
	// const videoEl = document.getElementById('inputVideo');
	// navigator.getUserMedia({
	// 		video: {}
	// 	},
	// 	stream => videoEl.srcObject = stream,
	// 	err => console.error(err)
	// );

	const mtcnnForwardParams = {
		// limiting the search space to larger faces for webcam detection
		minFaceSize: 200
	};
	// const options = new faceapi.MtcnnOptions(mtcnnParams);
	const input = document.getElementById('videoEl');
	const output = document.getElementById('canvasEl');
	// let fullFaceDescriptions = faceapi.detectAllFaces(videoEl).withFaceLandmarks().withFaceDescriptors();
	// fullFaceDescriptions = Array.from(fullFaceDescriptions);
	// console.log(fullFaceDescriptions);
	let mtcnnResults = faceapi.mtcnn(input, mtcnnForwardParams);
	mtcnnResults = Array.from(mtcnnResults);
	const mtcnnResults1 = mtcnnResults.map(res => res.faceDetection);
	const mtcnnResults2 = mtcnnResults.map(res => res.faceLandmarks);
	//
	console.log(mtcnnResults1, mtcnnResults2);

	// const detectionsArray = fullFaceDescriptions.map(fd => fd.detection);
	// console.log(detectionsArray);
	// faceapi.drawDetection('overlay', detectionsArray, {
	// 	withScore: true
	// });

	//
	//
	faceapi.drawDetection('canvasEl', mtcnnResults1, {
		withScore: false
	});

	faceapi.drawLandmarks('canvasEl', mtcnnResults2, {
		lineWidth: 4,
		color: 'red'
	});

	// faceapi.drawLandmarks('overlay', mtcnnResults.map(res => res.faceLandmarks), {
	// 	lineWidth: 4,
	// 	color: 'red'
	// });

}
