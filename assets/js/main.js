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
		let unconventionalCard = new Swiper(".unconventional-card-slider", {
			spaceBetween: 16,
			slidesPerView: 3,
			breakpoints: {
				300: {
					slidesPerView: 1,
					spaceBetween: 7,
				},
				575: {
					slidesPerView: 2
				},
				768: {
					slidesPerView: 3
				}
			},
		});
		let testimonial1 = new Swiper(".testimonial-slider", {
			spaceBetween: 10,
			slidesPerView: 3,
			freeMode: true,
			watchSlidesProgress: true,
			breakpoints: {
				300: {
					slidesPerView: 1,
				},
				575: {
					slidesPerView: 2
				},
				768: {
					slidesPerView: 3
				}
			},
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

		if (window.innerWidth >= 576) {
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
					duration: 0.5,
					delay: 0.5
				}, "-=0.5");
			//   banner animation 

			// img container
			gsap.to(".img-container", {
				scrollTrigger: {
					trigger: ".full-img-pin-div",
					start: "top 5%",
					end: "+=120%",
					scrub: true,
					pin: true,
					markers: false,
				},
				width: "100vw",
				height: "100vh",
				duration: 1,
			});
		}
		if (window.innerWidth <= 576) {
			$(".banner-video-mask").css({
				"mask-size": "380px",
				"-webkit-mask-size": "380px"
			});
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

							if (maskSize < 4000) {
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
					"mask-size": "1000vh",
					"-webkit-mask-size": "1000vh",
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
					duration: 0.5,
					delay: 0.5
				}, "-=0.5");
			//   banner animation 
			// img container
			gsap.to(".img-container", {

				scrollTrigger: {
					trigger: ".full-img-pin-div",
					start: "top 30%",
					end: "+=150%",
					scrub: true,
					pin: true,
					markers: false,
				},
				width: "100vw",
				height: "100vh",
				duration: 1,


			});
		}

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
			onEnterBack: () => tl.reverse(),
		});


		if (window.innerWidth >= 992) {
			gsap.to(".pin-title", {
				y: -100,
				ease: "power1.out",
				scrollTrigger: {
					trigger: ".scoll-card-wrapper",
					start: "top 80%",
					end: "+=250%",
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
					scale: 0.8, // Start scaled down
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
		}


		// card animation
		$('.slide-down-card').each(function () {
			const card = this;
			gsap.fromTo(card, {
				height: '0'
			}, {
				height: '100%',
				duration: 1.2,
				ease: 'power1.out',
				scrollTrigger: {
					trigger: card,
					start: 'top 80%',
					end: "+=100%",
					toggleActions: 'play none none reverse',
				}
			});
		});


		gsap.to(".map-pin-wrapper", {
			scrollTrigger: {
				trigger: ".map-pin-wrapper", // The element that triggers the pinning
				start: "top top", // Start pinning when the top of the element hits the top of the viewport
				end: "+=360%", // Adjust the end based on when you want it to unpin
				pin: true, // Pin the element
				pinSpacing: true, // Keep space after the pinned element (if false, it collapses)
				scrub: true, // Smooth scroll effect when pinning/unpinning
				markers: false // Set to true to debug the ScrollTrigger markers
			}
		});
		gsap.to(".map-pin-title", {
			opacity: 0, // Change opacity to 0
			scrollTrigger: {
				trigger: ".map-pin-title", // Element that triggers the animation
				start: "top 20%", // Start the animation when the top of the element hits the center of the viewport
				end: "bottom top", // End when the bottom of the element hits the top of the viewport
				scrub: true, // Smooth animation while scrolling
				markers: false // Enable markers for debugging (remove in production)
			}
		});
		// content slide up
		function createMapContentTimeline(wrapper, index) {
			const mapContent = $(wrapper).find('.map-content');
			const caption = new SplitText(mapContent.find(".map-inner-caption"), {
				type: "chars",
				tag: "span"
			});
			const chars = caption.chars;


			const tl3 = gsap.timeline({
				scrollTrigger: {
					trigger: wrapper,
					start: "top 35%",
					end: "+=155%",
					pin: true,
					scrub: true,
					markers: false,
					onEnter: () => {
						if (index === 1) {
							let mapButton = $(wrapper).find('.map-content').find('.map-bottom-btn');
							if (mapButton.length) {
								gsap.to(".map-bottom-btn", {
									opacity: 1,
									duration: 0.5,
									delay: 0.1
								});
							}
						}
					},
					onLeave: () => {
						gsap.to(mapContent, {
							opacity: 0
						});
						if (index === 1) {
							let mapButton = $(wrapper).find('.map-content').find('.map-bottom-btn');
							if (mapButton.length) {
								gsap.to(".map-bottom-btn", {
									opacity: 0,
									duration: 0.5,
									delay: 0.1
								});
							}
						}


					},
					onEnterBack: () => {
						gsap.to(mapContent, {
							opacity: 1
						});
						if (index === 1) {
							let mapButton = $(wrapper).find('.map-content').find('.map-bottom-btn');
							if (mapButton.length) {
								gsap.to(".map-bottom-btn", {
									opacity: 1,
									duration: 0.5,
									delay: 0.1
								});
							}
						}
					}
				}
			});
			tl3.to(mapContent, {
				y: 0,
				duration: 0.5
			});
			const tl2 = gsap.timeline({
				scrollTrigger: {
					trigger: mapContent,
					start: "+=60% top",
					end: "+=35%",
					scrub: 1,
					markers: false,
				}
			});
			chars.forEach((char, index) => {
				tl2.to(char, {
					color: "#226DFE",
					duration: 0.5,
					ease: "power1.inOut"
				}, index);
			});
			tl2.to(mapContent, {
				opacity: 1,
				duration: 0.5,
			}, "+=0.1");
		}
		$('.map-content-wrapper').each(function (index) {
			createMapContentTimeline(this, index);
		});
		//   map img
		const mapImage = $('.map-img');
		gsap.to(mapImage, {
			scale: 0.4,
			opacity: 0, // Start opacity
			scrollTrigger: {
				trigger: mapImage,
				start: "bottom -=50%",
				end: "+=100%",
				scrub: true,
				markers: false
			}
		});
		// m logo icon
		gsap.to(".m-logo-div", {
			y: 0, // Final position
			scrollTrigger: {
				trigger: ".m-logo-div",
				start: "top -=100%",
				end: "+=200%",
				scrub: true,
				markers: false
			},
		});
		// Function to handle adding the 'active' class
		function addActiveClass(element) {
			$('.title-line').removeClass('active');
			$(element).addClass('active');
		}

		function removeActiveClass(element) {
			$(element).removeClass('active');
		}
		$('.banner-area .title-line').addClass('active');
		gsap.utils.toArray(".title-line").forEach(function (element) {
			gsap.to(element, {
				scrollTrigger: {
					trigger: element,
					start: "top 70%",
					end: "+=100%",
					markers: false,
					onEnter: function () {
						addActiveClass(element);
					},
					onLeave: function () {
						removeActiveClass(element);
					},
					onEnterBack: function () {
						addActiveClass(element);
					},
					onLeaveBack: function () {
						removeActiveClass(element);
					}
				}
			});
		});


	});
})(jQuery);