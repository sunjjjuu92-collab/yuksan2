///////////////////////////////////////////////////////////
// html 파일 로드하고 스크립트 실행하는 함수
const load = (selectors, callback) => {
  let promises = selectors
    .filter((selector) => $(selector).length ? selector : console.log(`문서에 ${selector}가 없음`))
    .map(
      (selector) =>
        new Promise((resolve) => {
          !$(selector).children().length
            ? $(selector).load(`html/${selector.slice(1)}.html`, resolve)
            : resolve()
        })
    );
  Promise.all(promises).then(callback);
};

// 스크롤 바 너비 구하기
const getScrollWidth = () => {
  let sW = window.innerWidth - document.documentElement.clientWidth;
  $("html").css("--scroll-width", `${sW}px`);
};

const $body = $("body");
///////////////////////////////////////////////////////////
 load([".header", ".footer", "#skip-nav", "#modal"], () => {
  ///////////////////////////////////////////////////////////
  //  ▲ html문서 파일을 부를 요소들 지정
  //  ▼ 스크립트 작성
  ///////////////////////////////////////////////////////////


  $(window).on("load", getScrollWidth)

  ///////////////////////////////////////////////////////////
  	/* HEADER */
	/* GNB 높이 구하기 */
	const getGnbHeights = () => {
		let gnbHeights = [];
		$('.gnb-wrap .depth2').each(function(){
		gnbHeights.push($(this).outerHeight());
		});
		let gnbMax = Math.max.apply(null, gnbHeights);
		$('html').css("--gnb-height", `${gnbMax}px`)
	}
	getGnbHeights()

	$(window).on('resize', () => {
		getScrollWidth();
		getGnbHeights();
	})

	
	$(".gnb-wrap").on("mouseenter", () => {
		$body.addClass("is-hover");
	});

	$(".header-inner").on("mouseenter", () => {
		$body.addClass("is-hover-header");
	});
	$(".header-inner").on("mouseleave", () => {
		$body.removeClass("is-hover");
		$body.removeClass("is-hover-header");
	});

	/* 스크롤 시 헤더 고정 */
	$(window).on("scroll load", () => {
		const scrollTop = $(window).scrollTop();
		const windowWidth = $(window).width();
		const threshold = windowWidth < 1024 ? 80 : 100;

		if (scrollTop > threshold) {
			$body.addClass("is-fix");
		} else {
			$body.removeClass("is-fix");
		}
	});

  /* 언어선택창 드롭다운 */
  $body.on("click", (e) => {
    const $lang = $(".util-lang"),
      $langList = $(".util-lang-list");
    if (!$lang.hasClass("is-active") && e.target === $(".util-lang-btn")[0]) {
      $lang.addClass("is-active");
      $langList.stop().slideDown(200);
    } else {
      $lang.removeClass("is-active");
      $langList.stop().slideUp(200);
    }
  });

  /* 전체메뉴버튼 클릭 */
  $(".util-allmenu-btn").on("click", function () {
    if ($body.hasClass("is-open is-menu")) {
      $body.removeClass("is-open is-menu");
      $(".allmenu").attr("aria-hidden", true);
    } else {
      getScrollWidth();
      $body.addClass("is-open is-menu");
      $body.removeClass("is-hover");
      $(".allmenu").attr("aria-hidden", false);
    }
  });

  /* 전체메뉴 모바일화면 드롭다운 */
  $(window).on("load resize", function () {
    if (window.innerWidth > 1024) {
      $(".all-depth2").show();
    } else {
      $(".all-depth2").hide();
    }
    $(".all-depth1-btn").removeClass("on");
  });
  $(".all-depth1-btn").on("click", function () {
		if (window.innerWidth <= 1024) {
			if ($(this).hasClass("on") == false) {
				$(".all-depth2").stop().slideUp();
				$(".all-depth1-btn").removeClass("on");
				$(this).next().stop().slideDown();
				$(this).addClass("on");
				$(this).parent().addClass("is-actvie");
				$(this).parent().siblings().removeClass("is-actvie");
			} else {
				$(".all-depth2").stop().slideUp();
				$(".all-depth1-btn").removeClass("on");
				$(".all-depth1").removeClass("is-actvie");
			}
		}
	});

  /* HEADER */
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  /* FOOTER */

  /* 탑버튼 */
  $(".top-btn").on("click", () => {
    $("html, body").animate({ scrollTop: 0 }, 800, "easeInOutQuint");
  });

  /* FOOTER */
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  /* MODAL */
  let lastFocus;
  const modalClose = () => {
    $(".modal-item").removeClass("on");
    $body.removeClass("is-open");
    lastFocus.focus();
  };
  $body.on("click", "a[href^='#modal']", function () {
    getScrollWidth();
    $body.addClass("is-open");
    let $thisHash = document.querySelector(this.hash),
      $thisModal = $thisHash.querySelector(".modal-cont");
    $thisHash.classList.add("on");
    lastFocus = document.activeElement;
    if ($thisModal.clientHeight < $thisModal.scrollHeight) {
      $thisModal.setAttribute("tabindex", 0);
    }
  });
  $("#modal").on("click", (e) => {
    if (e.target.matches(".modal-item, .modal-close")) modalClose();
  });
  $(document).keydown((e) => {
    if (e.keyCode == 27) modalClose();
  });
  /* MODAL */
  ///////////////////////////////////////////////////////////
});





/*SNB*/
/*SNB*/
$(function () {
	var $snb = $(".snb");
	var mobileWidth = 1024;

	function setSnb() {
		if ($(window).width() <= mobileWidth) {
			$(".snb-1dep .snb-list, .snb-2dep .snb-list").hide();
			$(".snb-2dep .snb-btn").show();
		} else {
			$(".snb-1dep .snb-list").hide(); 
			$(".snb-2dep .snb-list").show(); 
			$(".snb-2dep .snb-btn").hide(); 
		}
	}
	setSnb();

	$(window).on("resize", function () {
		$(".snb-btn").removeClass("is-active");
		setSnb();
	});

	$(document).on("click", ".snb-1dep .snb-btn", function (e) {
		e.stopPropagation();
		$(".snb-1dep .snb-list").not($(this).next()).slideUp(300);
		$(".snb-1dep .snb-btn").not(this).removeClass("is-active");

		$(this).toggleClass("is-active");
		$(this).next(".snb-list").stop().slideToggle(300);
	});

	$(document).on("click", ".snb-2dep .snb-btn", function (e) {
		e.stopPropagation();
		if ($(window).width() <= mobileWidth) {
			$(".snb-2dep .snb-list").not($(this).next()).slideUp(300);
			$(".snb-2dep .snb-btn").not(this).removeClass("is-active");

			$(this).toggleClass("is-active");
			$(this).next(".snb-list").stop().slideToggle(300);
		}
	});


	$(document).on("click", ".snb-list a", function () {
		if ($(window).width() <= mobileWidth) {
			$(this).closest(".snb-list").slideUp(300);
			$(this).closest(".snb").find(".snb-btn").removeClass("is-active");
		}
	});

	$(document).on("click", function (e) {
		if (!$(e.target).closest(".snb").length) {
			if ($(window).width() <= mobileWidth) {
				$(".snb-1dep .snb-list, .snb-2dep .snb-list").slideUp(300);
				$(".snb-btn").removeClass("is-active");
			} else {
				$(".snb-1dep .snb-list").slideUp(300);
				$(".snb-1dep .snb-btn").removeClass("is-active");
			}
		}
	});

});