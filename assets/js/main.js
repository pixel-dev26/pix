(function ($) {
	'use strict';





	// +++++++++++++++++++ Button Animation Start ++++++++++++++++++++++++++++++

	$(function () {
		$('.btn--6')
			.on('mouseenter', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			})
			.on('mouseout', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			});
	});

	$(function () {
		$('.btn-----66')
			.on('mouseenter', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			})
			.on('mouseout', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			});
	});

	$(function () {
		$('.btn-----7777')
			.on('mouseenter', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			})
	})


	$(function () {
		$('.btn---7')
			.on('mouseenter', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			})
			.on('mouseout', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			});
	});
	$(function () {
		$('.btn----8')
			.on('mouseenter', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			})
			.on('mouseout', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			});
	});
	$(function () {
		$('.btn-----9')
			.on('mouseenter', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			})
			.on('mouseout', function (e) {
				var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
				$(this).find('span').css({ top: relY, left: relX })
			});
	});




	// +++++++++++++++++++ Button Animation End ++++++++++++++++++++++++++++++


	// +++++++++++++++++++ Feature Blog Slider Start++++++++++++++++++++++++++++++

	$(document).ready(function () {
		$('.featureBlogSLider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			speed: 300,
			fade: true,
			nextArrow: '<i class="ri-arrow-right-s-line nextArrow"></i>',
			prevArrow: '<i class="ri-arrow-left-s-line prevArrow"></i>',
			infinite: true,
			autoplaySpeed: 5000,
			autoplay: false,
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
						dots: true,
						arrows: false,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						dots: true,
						arrows: false,
					}
				}
			]
		});
	});


	// +++++++++++++++++++ Feature Blog Slider End ++++++++++++++++++++++++++++++





	// +++++++++++++++++++ Social Media Float Start ++++++++++++++++++++++++++++++


	// Get all menu from document
	document.querySelectorAll('.fabTrigger').forEach(OpenMenu);

	// Menu Open and Close function
	function OpenMenu(active) {
		if (active.classList.contains('fabTrigger') === true) {
			active.addEventListener('click', function (e) {
				e.preventDefault();

				if (this.parentElement.classList.contains('active') === true) {
					// Close the clicked dropdown
					this.parentElement.classList.remove('active');

				} else {
					// Close the opend dropdown
					closeMenu();
					// add the open and active class(Opening the DropDown)
					this.parentElement.classList.add('active');
				}
			});
		}
	};


	// Close the openend Menu
	function closeMenu() {
		// remove the open and active class from other opened Mneu (Closing the opend Menu)
		document.querySelectorAll('.fab').forEach(function (container) {
			container.classList.remove('active')
		});
	}


	function closeMenu() {
		document.querySelectorAll('.fab').forEach(function (container) {
			container.classList.remove('acive')
		})
	}


	// +++++++++++++++++++ Social Media Float End ++++++++++++++++++++++++++++++


	// +++++++++++++++++++ Case Study Slider Start ++++++++++++++++++++++++++++++

	var swiper = new Swiper(".ourProject", {
		slidesPerView: 3,
		centeredSlides: false,
		spaceBetween: 30,
		grabCursor: true,
		keyboard: {
			enabled: true,
		},
		breakpoints: {
			// Breakpoints for different screen widths
			320: {
				slidesPerView: 1.1,
				spaceBetween: 10,
			},
			480: {
				slidesPerView: 1.12,
				spaceBetween: 15,
			},
			768: {
				slidesPerView: 1.9,
				spaceBetween: 20,
			},
			1024: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			1199: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			1200: {
				slidesPerView: 2.5,
				spaceBetween: 30,
			},
			1440: {
				slidesPerView: 2.5,
				spaceBetween: 40,
			},
			1660: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			1800: {
				slidesPerView: 3,
				spaceBetween: 40,
			},
		},
		scrollbar: {
			el: ".swiper-scrollbar",
		},

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	// +++++++++++++++++++ Case Study Slider End ++++++++++++++++++++++++++++++





	// +++++++++++++++++++ Testimonial Slider Start++++++++++++++++++++++++++++++

	$(document).ready(function () {
		$('.testimonialSlider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			speed: 300,
			fade: true,
			nextArrow: '<i class="ri-arrow-right-s-line nextArrow"></i>',
			prevArrow: '<i class="ri-arrow-left-s-line prevArrow"></i>',
			infinite: true,
			autoplaySpeed: 5000,
			autoplay: false,
			responsive: [
				{
					breakpoint: 991,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
					}
				}
			]
		});
	});
	// +++++++++++++++++++ Testimonial Slider End ++++++++++++++++++++++++++++++







	// +++++++++++++++++++ Contact Form Start ++++++++++++++++++++++++++++++

	// Select all input fields and textarea
	const inputs = document.querySelectorAll("input, textarea");

	// Add event listeners to each input and textarea
	inputs.forEach((input) => {
		// Store original placeholder in a data attribute
		input.setAttribute("data-placeholder", input.placeholder);

		// Add hover effect to activate placeholder
		input.addEventListener("mouseover", () => {
			if (input.value.trim() === "") {
				input.classList.add("hover-active"); // Add hover-active class
			}
		});

		// Remove hover effect when no longer hovering
		input.addEventListener("mouseout", () => {
			input.classList.remove("hover-active"); // Remove hover-active class
		});

		// Add active class on focus (click)
		input.addEventListener("focus", () => {
			input.classList.add("active");
			input.placeholder = ""; // Remove placeholder text on focus
		});

		// Handle input event to keep active class when data is added
		input.addEventListener("input", () => {
			if (input.value.trim() !== "") {
				input.classList.add("active"); // Add class if data is present
			} else {
				input.classList.remove("active"); // Remove class if data is cleared
			}
		});

		// Keep the active class on blur if data is present
		input.addEventListener("blur", () => {
			if (input.value.trim() !== "") {
				input.classList.add("active");
			} else {
				input.classList.remove("active");
				input.placeholder = input.getAttribute("data-placeholder"); // Restore placeholder
			}
		});
	});
	// +++++++++++++++++++ Contact Form End ++++++++++++++++++++++++++++++



	// +++++++++++++++++++ Mobile Droodown Functionality ++++++++++++++++++++++++++++++

	// JavaScript for dropdown functionality
	document.addEventListener("DOMContentLoaded", () => {
		const navItemLink = document.querySelector(".nav-item-link");
		if (!navItemLink) return;

		// Toggle dropdown on click
		navItemLink.addEventListener("click", (e) => {
			// The submenu lives INSIDE .nav-item-link, so a tap on one of its links
			// bubbles up to here and toggled the panel shut on the way out — the
			// item never got to navigate, and all the reader saw was the dropdown
			// snapping closed. Clicks that start inside .dropdown-mob are the
			// submenu's own; leave them alone.
			if (e.target.closest(".dropdown-mob")) return;
			e.stopPropagation(); // Prevent event bubbling
			navItemLink.classList.toggle("active");
		});

		// Close dropdown when clicking outside
		document.addEventListener("click", (e) => {
			if (!navItemLink.contains(e.target)) {
				navItemLink.classList.remove("active");
			}
		});
	});



	if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);

		const sections = document.querySelectorAll(".scroll-section");

		sections.forEach((section, index) => {
			gsap.fromTo(
				section,
				{ x: index % 2 === 0 ? '-30%' : '30%' },
				{
					x: '30%', // End position
					scrollTrigger: {
						trigger: section,
						start: "top center",
						end: "bottom center",
						scrub: 1,

					},
				}
			);
		});
	}



	// +++++++++++++++++++ Case Study Slider Start ++++++++++++++++++++++++++++++



	// var swiper = new Swiper(".ourProject", {
	// 	slidesPerView: 3,
	// 	centeredSlides: false,
	// 	spaceBetween: 30,
	// 	grabCursor: true,
	// 	keyboard: {
	// 		enabled: true,
	// 	},
	// 	breakpoints: {
	// 		// Breakpoints for different screen widths
	// 		320: {
	// 			slidesPerView: 1.1,
	// 			spaceBetween: 10,
	// 		},
	// 		480: {
	// 			slidesPerView: 1.5,
	// 			spaceBetween: 15,
	// 		},
	// 		768: {
	// 			slidesPerView: 1.9,
	// 			spaceBetween: 20,
	// 		},
	// 		1024: {
	// 			slidesPerView: 1.5,
	// 			spaceBetween: 30,
	// 		},
	// 		1199: {
	// 			slidesPerView: 1.5,
	// 			spaceBetween: 30,
	// 		},
	// 		1200: {
	// 			slidesPerView: 2.5,
	// 			spaceBetween: 30,
	// 		},
	// 		1440: {
	// 			slidesPerView: 2.5,
	// 			spaceBetween: 40,
	// 		},
	// 		1660: {
	// 			slidesPerView: 3,
	// 			spaceBetween: 40,
	// 		},
	// 		1800: {
	// 			slidesPerView: 3,
	// 			spaceBetween: 40,
	// 		},
	// 	},
	// 	scrollbar: {
	// 		el: ".swiper-scrollbar",
	// 	},
	// 	navigation: {
	// 		nextEl: ".swiper-button-next",
	// 		prevEl: ".swiper-button-prev",
	// 	},
	// });

	// +++++++++++++++++++ Case Study Slider End ++++++++++++++++++++++++++++++









})(jQuery);
