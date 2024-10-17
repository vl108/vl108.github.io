if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector ||Element.prototype.webkitMatchesSelector;
}

function scrollMove(t,h,s){
	'use strict';
	if(h==undefined) h=0;
	let o = $('html,body');
	let speed = (s === undefined) ? 500 : s;

	o.animate({
		scrollTop:$(t).offset().top-h
	},speed);
}

let lyrOpen = function (ele){
	"use strict";

	let o = $(ele).attr('id'),
		a = -$(window).scrollTop();

	$('#wrap').css('top',a);
	$('#'+o).before('<a class="dim" onclick="lyrClose('+o+');"><i class="sr-only">close</i></a>');
	$('body').addClass('layer-open');
	setTimeout(function  () {
		$('#'+o).show(0,function(){
			$('body').addClass(o+'-open');
		});
	});
}

let lyrClose = function (ele, t){
	'use strict';

	let o = $(ele).attr('id'),
		originScroll = -$('#wrap').position().top,
		time = t || 500;

	$('body').removeClass(o+'-open').find('.dim').remove();

	setTimeout(function(){
		$('#'+o).hide();
		$('body').removeClass('layer-open');
		if (originScroll != -0) {
			$(window).scrollTop(originScroll);
		}
		$('#wrap').removeAttr('style');
	},600);
}

$(function(){
    let breakpoint = {
		xl : window.matchMedia( '(min-width: 1200px)' ),
		lg : window.matchMedia( '(min-width: 992px)' )
	};

	let breakpointChecker = () => {
		// let allmenuLink = $('.allmenu-link');

		// allmenuLink.on('mouseenter mousedown', (e) => {
		// 	let depth = $(e.currentTarget).data('depth');
		// 	let hasAllmenuButton = $(e.currentTarget).hasClass('allmenu-button');

		// 	allmenuLink.filter((index, object) => {
		// 		if ($(object).data('depth') === depth) {
		// 			$(object).removeClass('active').filter(e.currentTarget).addClass('active');
		// 		}
		// 	});

		// 	for (let index = 2; index <= 5; index++) {
		// 		if ((depth + 1) === index) {
		// 			$('#allmenu-depth-' + index).hide();
		// 			$('#allmenu-depth-' + index + ' > li').removeClass('active');
		// 			$('#allmenu-depth-' + index + ' > li > ul > li > a').removeClass('active');

		// 			if (hasAllmenuButton) {
		// 				$('#allmenu-depth-' + index).show();
		// 				$('#allmenu-depth-' + index + ' > li').filter('#allmenu-list-' + $(e.currentTarget).data('cate')).addClass('active');
		// 			}
		// 		} else if ((depth + 1) < index) {
		// 			$('#allmenu-depth-' + index).hide();
		// 			$('#allmenu-depth-' + index + ' > li').removeClass('active');
		// 		}
		// 	}
		// });

		if (breakpoint.xl.matches) {
			$(document).on('mouseleave', '#hd', () => {
				!$('#hd').is(":hover") && depHide();
				$('.hd-navi').find('.on').removeClass('on');
			});
		} else {
			$('#hd').off('mouseleave');
		}
	};
	
	for(const key in breakpoint) {
		breakpoint[key].addListener(breakpointChecker);
	}

	breakpointChecker();

	// renewal
	$('.allmenu-button').click(function(){
		$('.allmenu-button').not(this).removeClass('active').next().stop().slideUp();
		$(this).toggleClass('active').next().stop().slideToggle();
	});

	$(window).scroll(function(){
		if($(this).scrollTop()>0){
			$('body').addClass('is-scroll');
		}else{
			$('body').removeClass('is-scroll');
		}
	}).trigger('scroll');


	//gnb
	$(document).on('click', '.gnb-toggle', function(){
		$('body').hasClass('gnb-open') ? lyrClose(gnb) : lyrOpen(gnb);
	});

	$(document).on('click', '.gnb [role=button]', function(){
		$(this).closest('li').toggleClass('active').find('.depth').stop().slideToggle();
	});

	let depHide = function () {
		$('#hd').removeClass('is-hover');
		$('#gnb').stop().slideUp(400);
	}

	// let depShow = function (t) {
	// 	$('#hd').addClass('is-hover').removeClass('search-open');
	// 	$('#gnb').stop().slideDown(400);
	// }

	// $(document).on('mouseenter', '.hd-navi', depShow);
	$(document).on('mouseenter', '.hd-navi>li>a', function(){
		if($(this).next('.depth').length){
			$('#hd').addClass('is-hover');
		} else {
			$('#hd').removeClass('is-hover');
		}
		$(this).closest('li').addClass('on').siblings().removeClass('on');
	});

	$(document).on('click', '.btn-mypage', function(e){
		// $.ajax({
        //     type : "POST",
        //     url : "/member/member_type_check",
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        //     success : function(result) {
        //         if(result.member_flag == "no_login" || result.member_flag == "normal_user") {
        //             $('body').hasClass('layer-open') ? lyrClose(mnb) : lyrOpen(mnb);
		// 			return false;
        //         }else if(result.member_flag == "apple_user") {
        //             alert("애플 최초사용자는 추가 정보 입력후 정상이용가능합니다.");
        //             $("#mypageEncodeData").val(result.sEncData);
        //             fnMypagePopup();
        //         }
        //     }
        // });
		$('body').hasClass('layer-open') ? lyrClose(mnb) : lyrOpen(mnb);
		return false;
	})
	.on('click', '.btn-search', function(e){
		$('#hd').toggleClass('search-open');
		depHide();
		return false;
	});

	// ios back
	$('#ios-back').click(function(){
		history.back();
		return false;
    });
	$('#to-top').click(function(){
		scrollMove('#wrap');
		return false;
    });
    
	//if($('#allmenu').length){
		//$('#wrap').addClass('market-page');
	//}

	//Search Filter
	$('.srch-filter-btn').click(function(){
		$(this).toggleClass('active');
    	$(this).next('.srch-filter').toggleClass('active');
    });

	// 03-03 추가 제조사 보기
	$('.mfg-toggle-btn').click(function(){
		$(this).toggleClass('active');
    	$(this).closest('.category-box').find('.mfg-area').toggleClass('active');
    });

    $('.srch-header [value=all]').prop("checked", true);

    $('.srch-header [value=all]').click(function(){
		let chkVal = $(this).attr('name');
		$('[name='+ chkVal + ']').prop("checked", false);
		$(this).prop("checked", true);
	});

	$('.srch-filter input[type=checkbox]').filter('[value!=all]').each(function(){
		$(this).click(function(){

			let chkVal = $(this).attr('name'),
				allObj = $('input[name='+chkVal+'][value=all]'),
				chkObj = $('input').filter('[name='+chkVal+']').not('[value=all]');

			if(chkObj.length != 1){
				if(chkObj.filter(':checked').length === 0){
					allObj.prop("checked", true);
				} else if(chkObj.length === chkObj.filter(':checked').length){
					allObj.prop("checked", true);
					chkObj.prop("checked", false);
				} else {
					allObj.prop("checked", false);
				}
			}
		});
	});

   new Swiper(".courses-post-swiper", {
		slidesPerView: 2.1,
		spaceBetween: 18,
		navigation: {
			nextEl: ".courses-post-inner .swiper-button-next",
			prevEl: ".courses-post-inner .swiper-button-prev",
		},
		breakpoints: {
			991: {
				spaceBetween: 60,
				slidesPerView: 3.1,
			},
			768: {
				spaceBetween: 40,
				slidesPerView: 2.8,
			},
		}
	});

	// sub - swiper
	$(window).resize(function(){
		var num = 3;
		if($('.swiper-general .swiper-slide').length<3){
			num = 2;
		}
		let generalSwiper = new Swiper(".swiper-general", {
			slidesPerView: 1.1,
			spaceBetween: 16,
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				1200: {
					spaceBetween: 65,
					slidesPerView:num,
				},
				768: {
					spaceBetween: 30,
					slidesPerView: 2.3,
				},
			}
		});
	}).trigger('resize');

	// sub - article - swiper
	new Swiper(".swiper-article", {
		slidesPerView: 1.1,
		spaceBetween: 16,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			1200: {
				spaceBetween: 42,
				slidesPerView: 4,
			},
			768: {
				spaceBetween: 30,
				slidesPerView: 2.3,
			},
		}
	});

	if($('.rel-course').length){
		$('.rel-course')[0].swiper.params.breakpoints[1200].slidesPerView = 3;
		$('.rel-course')[0].swiper.currentBreakpoint = false;
		$('.rel-course')[0].swiper.update();
	}

	// sub - swiper - only positing
	new Swiper(".swiper-posting", {
		slidesPerView: 1.4,
		spaceBetween: 16,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			1200: {
				spaceBetween: 53,
				slidesPerView: 4,
			},
			768: {
				spaceBetween: 30,
				slidesPerView: 2.3,
			},
		}
    });

	// sub - swiper - minimize
    let minimizeSwiper = new Swiper(".swiper-minimize", {
        slidesPerView: 1.5,
		spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			1200: {
				spaceBetween: 15,
				slidesPerView: 3,
			},
			768: {
				spaceBetween: 15,
				slidesPerView: 2.4,
			},
		}
    });

	// Scroll Animation
	let observer = new IntersectionObserver(isElScrolledIntoView,{
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    const elements = document.querySelectorAll('.js-animate');
    elements.forEach(element=>{
        observer.observe(element);
    }
    );
    function isElScrolledIntoView(entries) {
        entries.forEach(entry=>{
            if (entry.isIntersecting) {
                entry.target.classList.add('scrolled-into-view');
            } else {
                entry.target.classList.remove('scrolled-into-view');
            }
        }
        );
    }

	// board
    let $rExpandBtn = $('.btn-board-expand');
	
    $rExpandBtn.hide();

    $('.board-item p.txt').each(function(){
        let $t = $(this);
		var $tHeight = Number($t.css('fontSize').replace(/px/gi, '')) * Number($t.css('lineHeight').replace(/px/gi, '') / $t.css('fontSize').replace(/px/gi, '') * 3);

        if($t.height()> $tHeight){
            $t.addClass('minimize');
            $t.siblings().show();
        }
    })

	$rExpandBtn.click(function(){
        let $t = $(this),
            $target = $t.siblings('.txt');

        if($t.closest('.sub-story').length && !$t.hasClass('active')){
            $t.text('접기').addClass('active');
            $target.removeClass('minimize');
        } else if(!$t.hasClass('active')){
            $t.text('닫기').addClass('active');
            $target.removeClass('minimize');
        } else {
            $t.text('더보기').removeClass('active');
            $target.addClass('minimize');
        }
        return false;
    });

	let $ytpWrp = $('.sub-page .dentis-ytp'),
	$ytpField = $ytpWrp.find('iframe, video'),
	$ytpOverlay = $ytpWrp.find('.dentis-ytp-overlay');

	$ytpOverlay.click(function(e){
		e.preventDefault();
		let $t = $(this),
			$src = $ytpField.attr('src'),
			$newSrc = $src + '?autoplay=1&mute=1';

		$ytpField.attr('src', $newSrc);
		$t.hide();
	});

	// datepicker
	$('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' }).val();


	// Market
	$(document).on('click', '.icon-top', function(){
		scrollMove('#wrap', 0, 0);
	});

	$(document).on('click', '.btn-quick, .btn-allmenu', function(){
		$(this).parent().toggleClass('on');
	});

	new Swiper(".main-visual", {
		speed:1800,
		loop:true,
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
		prev: {
			shadow: true,
			translate: ["-50%", 0, -1],
		},
		next: {
			translate: ["100%", 0, 0],
		},
        },
        pagination: {
            el: ".swiper-pagination",
			clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

	new Swiper(".market-visual .swiper", {
		spaceBetween: 0,
		slidesPerView: 1,
		navigation: {
			nextEl: ".market-visual .swiper-button-next",
			prevEl: ".market-visual .swiper-button-prev",
		},
		pagination: {
            el: ".market-visual .swiper-pagination",
			clickable: true,
        },
		loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
		breakpoints: {
			1400: {
				spaceBetween: 30,
				slidesPerView: 3,
			},
			991: {
				spaceBetween: 22,
				slidesPerView: 3,
			},
		}
    });

	new Swiper(".popup-inner .swiper", {
        pagination: {
            el: ".swiper-pagination",
			clickable: true,
        }
    });

	let $marketNavi = $('.market-main-navi');

	if($marketNavi.length){
		let marketNavitop = $marketNavi.offset().top;
		$(window).scroll(function(){
			if($(this).scrollTop()>marketNavitop){
				$marketNavi.addClass('is-sticky');
			}else{
				$marketNavi.removeClass('is-sticky');
			}
		}).trigger('scroll');

		$marketNavi.children().click(function(e){
			e.preventDefault();
			scrollMove(this.hash, 180);
			$(this).addClass('active').siblings().removeClass('active');
		});

		$('body').scrollspy({
			target: '.market-main-navi',
			offset: 200
		});

	}

	$('.btn-opt').click(function(){
		$('.order-prdt-option').toggle();
	});

	// 컨텐츠
	$('.btn-reply').click(function(){
		$(this).closest('.board-item').find('.write-wrp').toggle();
	});

	$(document).on('click', '.btn-reply-view', function(){
		$(this).toggleClass('active');
	});

	// 강연자 팝업
	function showSpeaker(url){
		$.ajax({
			method:"POST" ,
			url:url,
			success : function(data) {
				//history.pushState('','',url);
				var $data = $(data).find('.sub-page');
				$('#modalLecturer').modal().find('.modal-body').html($data.html());
				// sub - article - swiper
				new Swiper(".swiper-article", {
					   slidesPerView: 1.1,
					   spaceBetween: 16,
					   navigation: {
						   nextEl: ".swiper-button-next",
						   prevEl: ".swiper-button-prev",
					   },
					   breakpoints: {
						   1200: {
							   spaceBetween: 42,
							   slidesPerView: 3,
						   },
						   768: {
							   spaceBetween: 30,
							   slidesPerView: 2.3,
						   },
					   }
				   });
			}
		});

	}
	$('[data-toggle=speaker]').click(function(){
		//var url = '/courses/speakers/detail/'+String($(this).attr("href")).split('detail/')[1];
		showSpeaker($(this).attr("href"));
		return false;
	});
	$('#modalLecturer').on('hidden.bs.modal',function(){
		$('#modalLecturer .modal-body').empty();
	});
	// 주소가 id=123 으로 들어오는 경우
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(location.href);
		if(results===null){
		   return null;
		} else{
		   return decodeURI(results[1]) || 0;
		}
	};
	if($.urlParam('id')){
		showSpeaker('/courses/speakers/detail/'+$.urlParam('id'));
	}

	//---------------------- 퍼블 임시 - 최종 배포 시 삭제 -------------------//
	var tempUrl = window.location.href,
	tempImg = '/common/web/';

	if(tempUrl.split('127.0.0.1')[1] || tempUrl.split('demo.sketchbook.kr')[1]){
		// Include
		function includeHtml(includeEl){
			let el = $(includeEl)[0];
			let xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					el.insertAdjacentHTML("beforeBegin", this.responseText);
					el.remove();
					// 로고 임시
					$('h1.hd-logo img').attr('src','img/logo.svg');
				}
			};
			xhttp.open('GET', `_${includeEl}.html`, true);
			xhttp.open('GET', `_${includeEl}.html`, true);
			xhttp.send();
		}
		includeHtml('header');
		includeHtml('footer');

		// 이미지 경로
		$('img').each(function(){
			var t = $(this),
				src = t.attr('src');
			t.attr('src',src.split(tempImg)[1]);
		});
	}
	//---------------------- 퍼블 임시 - 최종 배포 시 삭제 -------------------//
});
