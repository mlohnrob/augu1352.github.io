'use strict';

// ------------------
// Namespaces
// ------------------
window.Tuborg = {
    Helpers: {}
};

// ------------------
// Global helper functions
// ------------------
// Gets the root path of the site
Tuborg.Helpers.getRootPath = function getRootPath() {
    if(location.href.indexOf('/dk/da/') > -1) {
        return '/dk/da';
    }
    
    return '';
}

// ------------------
// Init libraries
// ------------------
// Foundation
$(document).foundation();

// SkrollR
var s = skrollr.init({
  mobileCheck: function() {
    // Forces mobile version to be off
    return false;
  }
});

if (s.isMobile()) {
    s.destroy();
}

// ------------------
// Configure libraries
// ------------------
// Scroll reveal
window.sr = ScrollReveal({ reset: false });

// Teaser
sr.reveal('.-left .teaser__content, .-right .teaser__image .main__image-container, .-right .teaser__image .teaser__video-container', { origin: 'right', duration: 600, delay: 100, scale: 1,});
sr.reveal('.-right .teaser__content, .-left .teaser__image .main__image-container, .-left .teaser__image .teaser__video-container', {  origin: 'left', duration: 650, delay: 200, scale: 1,});
sr.reveal('.teaser__category', {  origin: 'bottom', duration: 650, viewFactor: 0.4, delay: 200, scale: 1,});
sr.reveal('.teaser.-expanded .cell .teaser__content ', {  origin: 'top', duration: 650, viewFactor: 0.4, delay: 200, scale: 1,});

// Beer page
sr.reveal('.beerpage__serving-image', {  origin: 'left', duration: 650, viewFactor: 0.8, delay: 200, scale: 1, reset: false,});
sr.reveal('.beerpage__serving, table, .beerpage__serving span, .stories__content ', {  origin: 'bottom', duration: 650, viewFactor: 0.4, delay: 200, scale: 1, reset: false,});
sr.reveal('.beerpage__heading img', { origin: 'bottom', duration: 1000, delay: 500, scale: 1, distance: '250px',});

// Hero
sr.reveal('.hero__content h1 span', { origin: 'bottom', duration: 600, delay: 500, scale: 1, reset: false,});

// Stories
sr.reveal('.stories__image img', { origin: 'right', duration: 600, delay: 100, scale: .1,});
sr.reveal('.stories__content', { origin: 'bottom', duration: 1000, delay: 500, scale: 1, distance: '250px',});

// ------------------
// Navigation
// ------------------
$(".navigation__dropdown li, .footer__main li").hover( function() {
    $(this).siblings().stop().fadeTo("fast", 0.4);
}, function() {
    $(this).siblings().stop().fadeTo("fast", 1.0);
});

// ------------------
// Beer gallery
// ------------------
$('.beerGallery__beers a').hover( function() {
    $(this).siblings().stop().fadeTo('fast', 0.8);
}, function() {
    $(this).siblings().stop().fadeTo('fast', 1.0);
});

// Slick slider
if (Foundation.MediaQuery.is('small only')) {
    $('body > section .beerGallery__beers').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '90px',
        dots: true,
        arrows: false,
        waitForAnimate: false,
        useTransform: false,
        useCSS: false
    });
}

// ------------------
// Menu
// ------------------
// Dropdown items
$("li.navigation__item.has-dropdown").on('click', function(){
    $(this).toggleClass('checked').siblings().removeClass('checked');

    if($('.navigation__root li').hasClass('checked') == true) {
        $('nav').addClass('active-main');
    }else{
        $('nav').removeClass('active-main');
    }

})

// Dropdown item (active)
if ($('li.navigation__item.has-dropdown').hasClass('checked')) {
    $(this).parent().parent().addClass('active-sub');
}

// Mobile menu
$(".mobile-menu-toggle").on('click', function(){
    $(this).toggleClass('active');
    $('.navigation__root').toggleClass('active');
    $('html, body').toggleClass('overflow-hidden');
})

// ------------------
// Frontpage hero
// ------------------
$(".-full .hero__content h1").fitText(1, { minFontSize: '80px', maxFontSize: '250px' });

// ------------------
// Teaser headings
// ------------------
$(".teaser.-expanded h2").fitText(.8); // Turn the compressor down (resizes less aggressively)
$(".teaser.-expanded h3").fitText(1.1); // Turn the compressor down (resizes less aggressively)
$(".teaser.-left h2, .teaser.-right h2").fitText(.8); // Turn the compressor down (resizes less aggressively)
$(".teaser.-left h3, .teaser.-right h3").fitText(1.2); // Turn the compressor down (resizes less aggressively)

// ------------------
// Stories
// ------------------
$(document).ready(function() {
    Tuborg.Stories.init();
});

// ------------------
// Scroll behaviour
// ------------------
var didScroll;
var lastScrollTop = 0;
var delta = 10;
var navbarHeight = $('.sticky-container').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 100);

function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
        $('body').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
            $('body').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}

/*
Reference: http://jsfiddle.net/BB3JK/47/
*/

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            class: $this.children('option').eq(i)[0].disabled ? 'disabled' : '',
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });
  

});

if ($('#MemberForm').length > 0 ) {
    $('body').addClass('memberform');
}

// Mobile Menu on Scroll
var position = $(window).scrollTop();
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var nav = document.querySelector('.navigation')
    // var navcolor = nav.dataset.backgroundColor;
    var offset = 20;

    /*
    if (scroll >= 50) {
        nav.style.backgroundColor = navcolor.replace(/[^,]+(?=\))/, '1');
    } else {
        nav.style.backgroundColor = navcolor.replace(/[^,]+(?=\))/, '0');
    }
    */

    if (scroll > position + offset) {
        $('.navigation').addClass("-scroll-down");
    } else if (scroll < position - offset) {
        $('.navigation').removeClass("-scroll-down");
    }
    position = scroll;
});

// Christmas Calendar
if ($('.christmas-calendar__featured').length) {
    var featured = document.querySelector('.christmas-calendar__featured');
    var youtubeId = featured.dataset.youtubeId;

    featured.addEventListener('click', function () {
        var html = document.createElement('iframe', {
            width: 560,
            height: 315,
            src: 'https://www.youtube-nocookie.com/embed/' + youtubeId,
            frameborder: 0,
            allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
            allowfullscreen: true
        });
        html.width = 560;
        html.height = 315;
        html.src = 'https://www.youtube-nocookie.com/embed/' + youtubeId + '?autoplay=true&rel=0&showinfo=0';
        html.setAttribute('frameborder', 0);
        html.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        html.setAttribute('allowfullscreen', true);
        featured.parentNode.classList.add('-active');
        featured.parentNode.replaceChild(html, featured);
    });
}

if ($('.christmas-calendar__more').length) {
    $('.christmas-calendar__more a').click(function (e) {
        e.preventDefault();
        var target = $($(this).attr('href'));

        $('html,body').animate({
            scrollTop: target.offset().top
        }, 300);
    });
}

$(document).on('closed.zf.reveal', '[data-reveal]', function () {
    var modal = $('iframe', this);
    modal[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');    
});