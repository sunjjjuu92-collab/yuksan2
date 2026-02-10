///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/* MAIN-VISUAL */
$(".visual-slick").on("init", function (event, slick) {
  $(".visual-slide").eq(0).addClass("visual-on");
});
$(".visual-slick").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    $(".visual-slide").removeClass("visual-on");
    $(".visual-slide").eq(nextSlide).addClass("visual-on");
  }
);
$(".visual-txt-slick").on("init", function (event, slick) {
  $(".visual-txt-slide").eq(0).addClass("visual-on");
});
$(".visual-txt-slick").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    $(".visual-txt-slide").removeClass("visual-on");
    $(".visual-txt-slide").eq(nextSlide).addClass("visual-on");
  }
);
$(".visual-slick").slick({
  asNavFor: '.visual-txt-slick',
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
  speed: 800,
  autoplay: true,
  arrows: false,
  fade: true,
  pauseOnHover: false,
  pauseOnFocus: false,
});
$(".visual-txt-slick").slick({
  asNavFor: '.visual-slick',
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  speed: 800,
  fade: true,
  arrows: true,
  prevArrow: '.visual-nav .prev',
  nextArrow: '.visual-nav .next',
  dots: true,
  appendDots: $(".visual-dot"),
  pauseOnHover: false,
  pauseOnFocus: false,
});
/* MAIN-VISUAL */
///////////////////////////////////////////////////////////




$("#banner").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  vertical: true,
  centerMode: true,
  dots: false,
  prevArrow: $('.section2 .control-box .prev'),
  nextArrow: $('.section2 .control-box .next'),
  arrows: false,
  pauseOnHover: false,
  pauseOnFocus: false,
  responsive: [
    {  
      breakpoint: 1025,
      settings: {
        slidesToShow:3,
        vertical: false, 
      } 
    },
    {  
      breakpoint: 769,
      settings: {
        slidesToShow:2,
        vertical: false, 
      } 
    },
    {  
      breakpoint: 481,
      settings: {
        slidesToShow:1,
        vertical: false, 
      } 
    },
  ]
});

$('.section2 .left-box').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){

  var i = (currentSlide ? currentSlide : 0) + 1;

  $('.numcount').html("<span class='now'>0"+i+"</span><div class='pro-bar pro-ani'></div><span>0"+slick.slideCount+"</span>");

});

$(".visual-slick").on('afterChange',function(){
  $(".pro-bar").addClass('pro-ani');
});
$(".visual-slick").on('beforeChange',function(){
  $(".pro-bar").removeClass('pro-ani');
});













/*메인비주얼*/
$(document).ready(function () {
	$('.mainvisual-wrap').addClass('is-active');

	const progressCircle = document.querySelector(".mainvisual-slide .slide-control .progress svg");
	const video = document.getElementById("visual_video");


	let copySwiper = new Swiper(".mainvisual-slide .mainvisual-txt", {
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},
		allowTouchMove: false,
	});

	let mainSwiper = new Swiper(".mainvisual-slide .mainvisual-list", {
		loop: true,
		speed: 1200,
		parallax: true,
		slideActiveClass: 'is-active',
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: ".mainvisual-slide .paging",
			clickable: true,
		},
		navigation: {
			nextEl: '.mainvisual-slide .slide-btn.next',
			prevEl: '.mainvisual-slide .slide-btn.prev'
		},
		thumbs: {
			swiper: copySwiper,
		},



		on: {
			init: function () {
				if (video && this.realIndex === 0) {
					video.play().catch(e => {
						console.log('Video autoplay prevented:', e);
					});
				}
			},
			slideChange: function () {
				if (!video) return;

				if (this.realIndex === 0) {
					video.play().catch(e => {
						console.log('Video autoplay prevented:', e);
					});
				} else {
					video.pause();
				}
			},
			autoplayTimeLeft(s, time, progress) {
				progressCircle.style.setProperty("--progress", 1 - progress);
			}
		}
	});
	

	

	$('.mainvisual-slide .slide-control .play').click(function () {
		if ($(this).hasClass('on')) {
			mainSwiper.autoplay.start();
			$(this).children().text('Paused');
			$(this).removeClass('on');

			if (video && mainSwiper.realIndex === 0) {
				video.play().catch(e => console.log("Video play error:", e));
			}
		} else {
			mainSwiper.autoplay.stop();
			$(this).children().text('Play');
			$(this).addClass('on');

			if (video && !video.paused) {
				video.pause();
			}
		}
	});
});


//비주얼 컨트롤 박스 위치 잡기
$(function () {
	function setSlideControlPosition() {
		var wrapH = $('.mainvisual-wrap').outerHeight(true);
		var copyH = 0;
		$('.mainvisual .copy-box').each(function () {
			var h = $(this).outerHeight(true);
			if (h > copyH) copyH = h;
		});
		var posTop = wrapH - copyH;
		$('.mainvisual').css('--control-top', posTop + 'px');
	}

	$(window).on('load resize', function () {
		setSlideControlPosition();
	});
});




///////////////////////////////////////////////////////////
/* MAIN-R&D */
$(document).ready(function () {
	const mainRndbar = document.querySelector('.main__rnd .progress span');
	const mainRnd = new Swiper(".main__rnd-list", {
		autoplay: {
				delay: 8000,
				disableOnInteraction:false,
		},
		//speed: 500,
		loop: true,
		// bullet
		pagination: {
			el: ".main__rnd .pagination",
			clickable: false,
			type: "fraction",
				renderFraction: function (currentClass, totalClass) {
					
					return '<span class="current ' + currentClass + '"></span>' + '<span class="total ' + totalClass + '"></span>';
				},
				formatFractionCurrent: function (number) {
					return number < 10 ? '0' + number : number;  // 현재 슬라이드 숫자에 0 추가
				},
				formatFractionTotal: function (number) {
					return number < 10 ? '0' + number : number;  // 총 슬라이드 숫자에 0 추가
				},
		},
		//arrow
		navigation: {
			nextEl: ".main__rnd .slide-btn.next",
			prevEl: ".main__rnd .slide-btn.prev",
		},
		on: {
			autoplayTimeLeft(s, time, progress) {
				mainRndbar.style.setProperty("--pro", 1 - progress)
			}
		}
	});
});
/* MAIN-R&D */
///////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////
/* 제품소개 */
$(function () {
	let mainProItem = $(".main__product-wrap .item");
	let mainProWrap = $(".main__product-wrap");

	$(mainProItem).on("click mouseenter focus touchstart", function (e) {
		$(this).addClass('is-active').siblings().removeClass('is-active');
	});

	mainProWrap.on("mouseleave touchend", function () {
		mainProItem.removeClass('is-active');
	});

});
/* 제품소개 */
///////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////
/*공장소개 : S*/
$(document).ready(function () {
	var facSlide = new Swiper(".main__facility-image", {
		slideActiveClass: 'is-active',
		direction: "vertical",
		slidesPerView: 1.5,
		centeredSlides: true,
		spaceBetween: 50,
		loop: true,
		speed: 2000,
		allowTouchMove: false,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
			reverseDirection: false, // 기본: 위로 올라감
		},
		navigation: {
			nextEl: '.main__facility .slide-btn.next',
			prevEl: '.main__facility .slide-btn.prev',
		},
		breakpoints: {
			0: { // 0~1024px 이하
				direction: 'horizontal',
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 5000,
			},
			1201: {
				direction: 'vertical',
				slidesPerView: 1.8,
				spaceBetween: 50,
				speed: 5000,
			},
			1441: {
				direction: 'vertical',
				slidesPerView: 1.8,
				spaceBetween: 100,
				speed: 5000,
			}
		}
	});

	
	$('.main__facility .slide-btn.prev').on('click', function () {
		if (!facSlide.params.autoplay.reverseDirection) {
			facSlide.params.autoplay.reverseDirection = true;
			facSlide.autoplay.stop();

			// 🔹 현재 애니메이션 강제 중단
			facSlide.setTranslate(0);
			facSlide.updateProgress();
			facSlide.slideToLoop(facSlide.realIndex, 0, false);

			// 🔹 autoplay 내부 상태 완전 재설정
			facSlide.autoplay.running = false;
			facSlide.autoplay.paused = false;
			setTimeout(() => {
				facSlide.autoplay.start();
			}, 50); // 50ms 정도 텀 주면 안정적
		}
	});

	$('.main__facility .slide-btn.next').on('click', function () {
		if (facSlide.params.autoplay.reverseDirection) {
			facSlide.params.autoplay.reverseDirection = false;
			facSlide.autoplay.stop();

			facSlide.setTranslate(0);
			facSlide.updateProgress();
			facSlide.slideToLoop(facSlide.realIndex, 0, false);

			facSlide.autoplay.running = false;
			facSlide.autoplay.paused = false;
			setTimeout(() => {
				facSlide.autoplay.start();
			}, 50);
		}
	});

});

/*공장소개 : E*/
///////////////////////////////////////////////////////////







$(document).ready(function() {
	/* 스크롤이동 */
	$(".scroll-btn a").click(function(event){
		$('html,body').animate({scrollTop:$(this.hash).offset().top - 0}, 1000);
		event.preventDefault();
	});
});

$(document).ready(function () {
	function setScreenSize() {
		var vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", vh + "px");
	}
	setScreenSize();

	$(window).on("resize", function () {
		setScreenSize();
	});
});










///////////////////////////////////////////////////////////
/* LIBRARY */
Splitting();

$(document).ready(function() {
	setTimeout(function() {
		AOS.init({
		easing: 'ease-out-quad',
		duration: 1000,
		offset: 100,
		disable: false,
		once:true
	});
	}, 500);

});

/* LIBRARY */
///////////////////////////////////////////////////////////