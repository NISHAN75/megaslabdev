(function ($) {
	$(document).ready(function () {
		// offcanvas humbarger
		let offcanvasElement = $('.header-offcanvas');
		offcanvasElement.on('show.bs.offcanvas', function () {
			$('.humbarger-btn').addClass('open');
			$('.btn-close span:nth-child(1)').css({
				transform: 'rotate(45deg)',
				marginBottom: '0'
			});
			$('.btn-close span:nth-child(2)').css({
				transform: 'rotate(-45deg)',
				marginTop: '-2px'
			});
		});
		offcanvasElement.on('hide.bs.offcanvas', function () {
			$('.humbarger-btn').removeClass('open');
			$('.btn-close span:nth-child(1)').css({
				transform: '',
				marginBottom: ''
			});
			$('.btn-close span:nth-child(2)').css({
				transform: '',
				marginTop: ''
			});
		});

		$('.mobile-menu-list-wrapper ul > li > a').click(function (e) {
			$('.mobile-menu-list-wrapper ul > li > a').not(this).removeClass('active');
			$(this).toggleClass('active');
			$('.sub-menu').not($(this).next()).slideUp();
			if ($(this).attr('id') === 'menu-list') {
				e.preventDefault();
				$(this).next('.sub-menu').slideToggle();
			}
		});

    $('.companies-card-wrapper').hover(
      function() {
          // Remove 'active' class from all other cards
          $('.companies-card-wrapper').not(this).addClass('active');
            // Add 'inactive' class to the currently hovered card
            $(this).addClass('inactive');
        },
        function() {
            // Remove 'active' class from all cards
            $('.companies-card-wrapper').removeClass('active');
            // Remove 'inactive' class from the hovered card
            $(this).removeClass('inactive');
        }
    );
		// testimonial slider


		// Function to update the progress bar based on video time
		function updateProgressBar($video, $circle) {
			let videoDuration = $video[0].duration;
			let currentTime = $video[0].currentTime;

			// Calculate the progress as a percentage
			let progressPercentage = currentTime / videoDuration;

			let radius = $circle[0].r.baseVal.value; 
			let circleLength = 2 * Math.PI * radius;
			let dashoffset = circleLength - (progressPercentage * circleLength);
			$circle.css('stroke-dashoffset', dashoffset);
		}

		function setUpVideoProgressBar($video , $activeIndex) {
      let allCircles = $('.icon-progress-bar');
			let $circle = $(allCircles[$activeIndex]).find('.progress-ring__circle');
      let iconProgressBar = $()
			if ($circle.length) {
				let radius = $circle[0].r.baseVal.value;
				let circleLength = 2 * Math.PI * radius;

				// Set stroke-dasharray and initial stroke-dashoffset
				$circle.css({
					strokeDasharray: circleLength,
					strokeDashoffset: circleLength
				});
				$video.on('timeupdate', function () {
					updateProgressBar($video, $circle);
				});
				$video.on('ended', function () {
					$circle.css('stroke-dashoffset', circleLength);
				});
			} else {
				console.error("Circle element not found for progress bar.");
			}
		}

		let testimonial1 = new Swiper(".testimonial-slider", {
			spaceBetween: 10,
			slidesPerView: 3,
			freeMode: true,
			watchSlidesProgress: true,
		});

		let testimonial2 = new Swiper(".testimonial-slider-2", {
			spaceBetween: 0,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			thumbs: {
				swiper: testimonial1,
			},
			on: {
				init: function () {
					gsap.set(".slide-bg", {
						opacity: 0
					});
					let $videos = $('.testimonial-video-item');

					$videos.each(function (index, video) {
						if (index !== 0) {
							$(video).prop('muted', true).get(0).pause();
						}
					});
					let $firstSlideVideo = $(this.slides[0]).find('.testimonial-video-item');
					if ($firstSlideVideo.length) {
						$firstSlideVideo.prop('muted', false).get(0).play();
					}
				},
				slideChange: function () {
					let $activeSlide = $(this.slides[this.activeIndex]);
					let $videos = $('.testimonial-video-item');
					$videos.each(function () {
						$(this).prop('muted', true).get(0).pause();
					});
					let $activeVideo = $activeSlide.find('.testimonial-video-item');
          let $activeIndex = testimonial2.activeIndex;
          
					if ($activeVideo.length) {
						$activeVideo.prop('muted', false).get(0).play();
						setUpVideoProgressBar($activeVideo , $activeIndex);
					}
					gsap.to(".slide-bg", {
						opacity: 1,
						duration: 0.4,
						onComplete: function () {
							gsap.to(".slide-bg", {
								opacity: 0,
								duration: 0.4
							});
						},
					});
				},
			},
		});

    function playAndMuteVideo(index) {
      let $videos = $('.testimonial-video-item');
      if (index >= 0 && index < $videos.length) {
          let $selectedVideo = $videos.eq(index);
          $selectedVideo.prop('muted', true);
          $selectedVideo.get(0).play();
          setUpVideoProgressBar($selectedVideo , 0); 
      } else {
          console.error('Invalid index: No video found at this index');
      }
  }
  playAndMuteVideo(0);

//   banner animation 
gsap.timeline({
	scrollTrigger: {
		trigger: ".video-banner",
		start: "top 10%",
		end: "+=100%",
		pin: true,
		scrub: true,
		onUpdate: function(self) {
			// Get the current mask size using jQuery
			const maskSize = parseFloat($(".banner-video-mask").css("mask-size"));
			
			if (maskSize < 15000) {
				$(".banner-video-mask").removeClass("active");
			} else {
				$(".banner-video-mask").addClass("active");
			}
		}
	}
})
.to(".primary-title", { opacity: 0, duration: 0.5 }) 
.to(".banner-video-mask", { 
	"mask-size": "1800vh",
	"-webkit-mask-size": "1800vh", 
	duration: 0.5,
	ease: "power3.in",
	onComplete: function() {
		// Add the class when the mask-size animation is complete
		$(".banner-video-mask").addClass("active");
	}
}, "-=0.5") 
.fromTo(".secondary-title", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");
//   banner animation 

  // testing 




  

  // testing 

  
  // Example setup for video progress bar function
		// testing


		// testing


		// Define the scroll-triggered animation function
		// let videoBannerAnimation = function() {
		//     let $bannerArea = $('.banner-area.video-banner');

		//     if ($bannerArea.length) {
		//         let $mainTitle = $bannerArea.find('.primary-title');
		//         let $bannerVideoMask = $bannerArea.find('.banner-video-mask');
		//         let $secondaryTitle = $bannerArea.find('.secondary-title');
		//         let $videoOverlay = $bannerArea.find('.banner-video-overlay');

		//         // Pin the entire video banner section on scroll
		//         ScrollTrigger.create({
		//             trigger: $bannerArea[0], // Trigger based on the banner area
		//             pin: true,               // Pin the section
		//             start: 'top top',        // Start pinning when the section hits the top
		//             end: '+=50%',           // Unpin at the end of the section scroll
		//             pinSpacing: false        // No extra spacing after pinning
		//         });

		//         // Animate the main title out of view (upwards) on scroll
		//         gsap.to($mainTitle[0], {
		//             scrollTrigger: {
		//                 trigger: $mainTitle[0],
		//                 scrub: 1,              // Smooth scrub effect
		//                 start: 'top top',      // Start when the title hits the top
		//                 end: '+=50%'           // End the animation halfway through the scroll
		//             },
		//             y: -100,                  // Move title up
		//             opacity: 0                // Fade out the title
		//         });

		//         // Animate the video mask size increase on scroll
		//         gsap.to($bannerVideoMask[0], {
		//             scrollTrigger: {
		//                 trigger: $mainTitle[0], // Trigger based on main title scroll
		//                 scrub: 1,               // Smooth scrub effect
		//                 start: 'top top',       // Start when the title hits the top
		//                 end: '+=100%'           // Continue expanding the mask throughout the scroll
		//             },
		//             maskSize: '800vh'          // Increase the mask size to simulate expansion
		//         });

		//         // Animate the secondary title (fade in and move up)
		//         gsap.to($secondaryTitle[0], {
		//             scrollTrigger: {
		//                 trigger: $mainTitle[0], // Trigger after the main title scrolls up
		//                 scrub: 1,               // Smooth scrub effect
		//                 start: 'top top+=50%',  // Start slightly after the main title
		//                 end: '+=100%'           // End after the scroll progresses further
		//             },
		//             opacity: 1,                // Fade in the secondary title
		//             y: 0                       // Move up to its original position
		//         });

		//         // Animate the video overlay fade-in
		//         gsap.to($videoOverlay[0], {
		//             scrollTrigger: {
		//                 trigger: $mainTitle[0], // Trigger after the main title scrolls up
		//                 scrub: 1,               // Smooth scrub effect
		//                 start: 'top top+=50%',  // Start slightly after the main title
		//                 end: '+=100%'           // End after the scroll progresses
		//             },
		//             opacity: 0.5               // Fade in the overlay to half opacity
		//         });
		//     }
		// };

		// // Call the animation function on page load
		// videoBannerAnimation();

		// gsap.registerPlugin(ScrollTrigger);

		// gsap.set(".img-container", { scale: 0.5 });

		// gsap.to(".img-container", {
		//   scale: 1,
		//   ease: "none",
		//   scrollTrigger: {
		//     trigger: ".full-background",
		//     start: "top top",
		//     end: "+=200%",
		//     scrub: true,
		//     pin: true,
		//     markers: true
		//   }
		// });

		//  tesing  

	});
})(jQuery);