for (let i = 0; i < 76; i++) {
    $('.slideshow-container').append(`<div class="mySlides fade"><img src="./assets/image${i}.jpg" /></div>`);
    console.log(`done: ${i}`);
  }
  


var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    

  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 4500); // Change image every 4.5 seconds
}
