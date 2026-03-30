///////////////////////////////////////////////////////////
// html 파일 로드하고 스크립트 실행하는 함수
const load = (selectors, callback) => {
  let promises = selectors
    .filter((selector) => $(selector).length ? selector : console.log(`문서에 ${selector}가 없음`))

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

  

  /* HEADER */
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
  /* 앵커 스무스 스크롤 */
  $('a[href^="#"]').on("click", function (e) {
    var hash = this.hash;
    if (!hash || hash === "#") return;
    var $target = $(hash);
    if (!$target.length) return;
    e.preventDefault();
    var headerH = $(".header").outerHeight() || 80;
    var offsetTop = $target.offset().top - headerH;
    $("html, body").stop().animate({ scrollTop: offsetTop }, 800, "easeInOutQuint");
    // 모바일 전체메뉴 열려있으면 닫기
    if ($body.hasClass("is-menu")) {
      $body.removeClass("is-open is-menu");
      $(".allmenu").attr("aria-hidden", true);
    }
  });
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





