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
			function () {
				// Remove 'active' class from all other cards
				$('.companies-card-wrapper').not(this).addClass('active');
				// Add 'inactive' class to the currently hovered card
				$(this).addClass('inactive');
			},
			function () {
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

		function setUpVideoProgressBar($video, $activeIndex) {
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
						setUpVideoProgressBar($activeVideo, $activeIndex);
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
				setUpVideoProgressBar($selectedVideo, 0);
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
					onUpdate: function (self) {
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
			.to(".primary-title", {
				opacity: 0,
				duration: 0.5
			})
			.to(".banner-video-mask", {
				"mask-size": "1800vh",
				"-webkit-mask-size": "1800vh",
				duration: 0.5,
				ease: "power3.in",
				onComplete: function () {
					// Add the class when the mask-size animation is complete
					$(".banner-video-mask").addClass("active");
				}
			}, "-=0.5")
			.fromTo(".secondary-title", {
				opacity: 0,
				y: 100
			}, {
				opacity: 1,
				y: 0,
				duration: 0.5
			}, "-=0.5");
		//   banner animation 

		// lenis
		const lenis = new Lenis()

		lenis.on('scroll', (e) => {
			// console.log(e)
		})

		lenis.on('scroll', ScrollTrigger.update)

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000)
		})
		gsap.ticker.lagSmoothing(0)
		// scroll top 
		$('.back-top-btn').on('click', function () {
			lenis.scrollTo('.banner-area');
		})

		// full background animation 
		gsap.registerPlugin(ScrollTrigger, SplitText);
		gsap.to(".img-container", {
			scrollTrigger: {
				trigger: ".full-img-pin-div",
				start: "top 5%",
				end: "+=100%", // This determines when the image animation ends
				scrub: true,
				pin: true,
			},
			width: "100vw",
			height: "100vh",
			ease: "power2.in",
			duration: 1,
		});


		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".background-content-wrapper",
				start: "top top",
				pin: true,
				scrub: true,
				end: "+=100%",
			}
		});

		// Animation for captions based on scroll position
		tl.to(".caption-1", {
				opacity: 1,
				duration: 1
			}) // Fade in caption 1
			.to(".caption-1", {
				opacity: 0,
				duration: 1
			}) // Fade out caption 1
			.to(".caption-2", {
				opacity: 1,
				duration: 1
			}) // Fade in caption 2
			.to(".caption-2", {
				opacity: 0,
				duration: 1
			}) // Fade out caption 2
			.to(".caption-3", {
				opacity: 1,
				duration: 1
			});

		// Reset captions at the start of the timeline
		gsap.set([".caption-1", ".caption-2", ".caption-3"], {
			opacity: 0
		});

		// Reverse the timeline when scrolling back
		ScrollTrigger.create({
			trigger: ".background-content-wrapper",
			start: "top 5%",
			end: "+=100%",
			onEnterBack: () => tl.reverse(), // Reverse the timeline on scrolling back
		});

		// card animation 
		gsap.to(".pin-title", {
			y: -100,
			ease: "power1.out",
			scrollTrigger: {
				trigger: ".scoll-card-wrapper",
				start: "top 80%",
				end: "bottom 30%",
				pin: ".pin-title",
				pinSpacing: false,
				scrub: true,
			}
		});
		const scrollCards = gsap.utils.toArray('.scoll-card-info');

		// Loop through each card and create a ScrollTrigger animation
		scrollCards.forEach((card) => {
			gsap.from(card, {
				opacity: 0, // Start with opacity 0
				scale: 0.6, // Start scaled down
				y: 50, // Move down 50px
				duration: 1, // Animation duration
				ease: "power1.out", // Easing function
				scrollTrigger: {
					trigger: card, // Trigger animation on this card
					start: "top 80%", // Start when the card is 80% down the viewport
					toggleActions: "play none none reverse", // Play on enter, reverse on leave
				}
			});
		});

		//   slide down animation 
		$(window).on('scroll', function () {
			if (isInViewport($('.unconventional-card-wrapper'))) {
				$(".slide-down-card").slideDown(1000);
			}
		});

		// Function to check if an element is in the viewport
		function isInViewport(element) {
			var elementTop = element.offset().top;
			var elementBottom = elementTop + element.outerHeight();
			var viewportTop = $(window).scrollTop();
			var viewportBottom = viewportTop + $(window).height();
			return elementBottom > viewportTop && elementTop < viewportBottom;
		}

		gsap.to(".map-pin-wrapper", {
			scrollTrigger: {
			  trigger: ".map-pin-wrapper",  // The element that triggers the pinning
			  start: "top top",              // Start pinning when the top of the element hits the top of the viewport
			  end: "+=500%",          // Adjust the end based on when you want it to unpin
			  pin: true,                     // Pin the element
			  pinSpacing: true,              // Keep space after the pinned element (if false, it collapses)
			  scrub: true,                   // Smooth scroll effect when pinning/unpinning
			  markers: false                 // Set to true to debug the ScrollTrigger markers
			}
		  });
		  gsap.to(".map-pin-title", {
			  opacity: 0,                          // Change opacity to 0
			  scrollTrigger: {
				trigger: ".map-pin-title",        // Element that triggers the animation
				start: "top 20%",               // Start the animation when the top of the element hits the center of the viewport
				end: "bottom top",                  // End when the bottom of the element hits the top of the viewport
				scrub: true,                       // Smooth animation while scrolling
				markers: false                      // Enable markers for debugging (remove in production)
			  }
			});
  
			function createMapContentTimeline(wrapper) {
			  const mapContent = $(wrapper).find('.map-content'); // Select the map content inside the wrapper
			  const caption = new SplitText(mapContent.find(".map-inner-caption"), { type: "chars" });
			  const chars = caption.chars; // This is an array of character elements
		  
			  // Create the main timeline for the current wrapper
			  const tl3 = gsap.timeline({
				  scrollTrigger: {
					  trigger: wrapper, // Trigger based on the specific wrapper
					  start: "top 35%", // Start pinning when the top of the wrapper hits 35% of the viewport
					  end: "+=250%", // End pinning after scrolling 250% of the viewport height
					  pin: true, // Pin the wrapper
					  scrub: true, // Smoothly scrub the animation
					  markers: false, // Show markers for debugging
					  onLeave: () => {
						  // When the section unpins, set opacity of the map-content to 0
						  gsap.to(mapContent, { opacity: 0 });
					  },
					  onEnterBack: () => {
						  // When scrolling back up and pinning again, reset opacity to 1
						  gsap.to(mapContent, { opacity: 1 });
					  }
				  }
			  });
		  
			  // Animate the .map-content from y: 400 to y: 0
			  tl3.to(mapContent, {
				  y: 0, // Move to y: 0
				  duration: 1 // Adjust duration as needed
			  });
		  
			  // Create a timeline for scrolling text animations
			  const tl2 = gsap.timeline({
				  scrollTrigger: {
					  trigger: mapContent, // The element that triggers the scroll
					  start: "+=120% top", // Trigger when the top of the element reaches the top of the viewport
					  end: "+=50%", 
					  scrub: 1, 
					  markers: false,
				  }
			  });
		  
			  // Add color change animations to the timeline
			  chars.forEach((char, index) => {
				  tl2.to(char, {
					  color: "#226DFE", // Change color to blue
					  duration: 0.5, // Duration for the color change
					  ease: "power1.inOut"
				  }, index); // Stagger based on character index
			  });
		  
			  // After all characters have changed color, fade out the .map-content
			  tl2.to(mapContent, {
				  opacity: 1,
				  duration: 0.5,
			  },"+=0.1");
		  }
		  
		  // Create timelines for each map-content-wrapper
		  $('.map-content-wrapper').each(function() {
			  createMapContentTimeline(this);
		  });


		//   map img
		const mapImage = $('.map-img');

	gsap.to(mapImage, {
		scale: 0.4,
		opacity: 0, // Start opacity
		scrollTrigger: {
			trigger: mapImage,
			start: "bottom -=100%", // Start when the top of the map hits the top of the viewport
			end: "+=120%", // End when the bottom of the map hits the top of the viewport
			scrub: true, // Smooth scrubbing
			// onUpdate: (self) => {
			// 	const progress = self.progress();
			// 	if (progress >= 1) {
			// 		gsap.to(mapImage, { opacity: 0 }); // Set opacity to 0 when scale reaches 0.3
			// 	}
			// },
			markers: true // Enable markers for debugging (remove in production)
		}
	});
  



		//  tesing  






	//  tesing  

	});
})(jQuery);