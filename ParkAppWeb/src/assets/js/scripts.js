(function($) {
    "use strict"; 
	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    // $(window).on('scroll load', function() {
	// 	if ($(".navbar").offset().top > 20) {
	// 		$(".fixed-top").addClass("top-nav-collapse");
	// 	} else {
	// 		$(".fixed-top").removeClass("top-nav-collapse");
	// 	}
    // });

	// // jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});



    /* Rotating Text - Morphtext */
	$("#js-rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "slideInDown",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 2000
    });
    

    // /* Card Slider - Swiper */
	// var cardSlider = new Swiper('.card-slider', {
	// 	autoplay: {
    //         delay: 4000,
    //         disableOnInteraction: false
	// 	},
    //     loop: true,
    //     navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev'
	// 	},
	// 	slidesPerView: 3,
	// 	spaceBetween: 20,
    //     breakpoints: {
    //         // when window is <= 992px
    //         992: {
    //             slidesPerView: 2
    //         },
    //         // when window is <= 768px
    //         768: {
    //             slidesPerView: 1
    //         } 
    //     }
    // });

    
    // /* Image Slider - Swiper */
    // var imageSlider = new Swiper('.image-slider', {
    //     autoplay: {
    //         delay: 2000,
    //         disableOnInteraction: false
	// 	},
    //     loop: false,
    //     navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},
    //     spaceBetween: 30,
    //     slidesPerView: 5,
	// 	breakpoints: {
    //         // when window is <= 380px
    //         380: {
    //             slidesPerView: 1,
    //             spaceBetween: 10
    //         },
    //         // when window is <= 516px
    //         516: {
    //             slidesPerView: 2,
    //             spaceBetween: 10
    //         },
    //         // when window is <= 768px
    //         768: {
    //             slidesPerView: 3,
    //             spaceBetween: 20
    //         },
    //         // when window is <= 992px
    //         992: {
    //             slidesPerView: 4,
    //             spaceBetween: 30
    //         },
    //         // when window is <= 1200px
    //         1200: {
    //             slidesPerView: 5,
    //             spaceBetween: 30
    //         },
    //     }
    // });

    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });

})(jQuery);