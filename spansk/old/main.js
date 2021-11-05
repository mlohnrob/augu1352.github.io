var count = 1;
setInterval(function() {
  count = ($(".slideshow :nth-child("+count+")").fadeOut().next().length == 0) ? 1 : count+1;
  $(".slideshow :nth-child("+count+")").fadeIn();
}, 2000);



for (let i = 0; i < 30; i++) {
  $('.slideshow').append(`<img src="./assets/image${i}.jpg" />`);
  console.log(`done: ${i}`);
}
