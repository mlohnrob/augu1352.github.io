//     $(document).ready(function () {
//       serveImages();
//     });
//
//     // function setImageOne() {
//     //   $('#imageSwap').fadeIn(500).html('<img src="./assets/test1.jpg" />').delay(2000).fadeOut(500, function () { setImageTwo(); });
//     // }
//     //
//     // function setImageTwo() {
//     //   $('#imageSwap').fadeIn(500).html('<img src="./assets/test2.jpg" />').delay(2000).fadeOut(500, function () { setImageOne(); });
//     // }
//
//
// // function fadeInImage(n) {
// //   $('#imageSwap').fadeIn(1500, fadeOutImage(n)).html(`<img src="./assets/image${n}.jpg" />`);
// // }
// //
// // function fadeOutImage(m) {
// //   $('#imageSwap').fadeOut(1500, fadeInImage(m+1));
// // }
// //
//
// function serveImages() {
//   // $('#imageSwap').fadeIn(1500).html(`<img src="./assets/image0.jpg" />`).delay(2000).fadeOut(1500);
//   // fadeInImage(0);
//
//   // while (true) {
//   let done;
//     for (let i = 0; i<3;) {
//       done = false;
//       console.log(i);
//       $('#imageSwap').fadeIn(1500).html(`<img src="./assets/image${i}.jpg" />`).delay(2000).fadeOut(1500, function() {done=true;});
//       i++;
//       if (done){
//
//       }
//       // console.log(`<img src="./assets/image${i}.jpg" />`);
//       // fadeInImage(i);
//       // fadeOutImage();
//
//     }
//   // }
// }

// console.log($('.slideshow'));
// $('.slideshow').append(`<img src="./assets/image0.jpg" />`);
// console.log($('.slideshow'));
for (let i = 0; i < 4; i++) {
  $('.slideshow').append(`<img src="./assets/image${i}.jpg" />`);
}


var count = 1;
setInterval(function() {
    count = ($(".slideshow :nth-child("+count+")").fadeOut().next().length == 0) ? 1 : count+1;
    $(".slideshow :nth-child("+count+")").fadeIn();
}, 2000);
