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

	clearTimeout(lyr);
	$(window).scrollTop(0);
	$('#wrap').css('top',a);
	$('#'+o).before('<a class="dim" onclick="lyrClose('+o+');"><i class="sr-only">close</i></a>');
	$('body').addClass('layer-open');
	$('#'+o).show(0,function(){
		$('body').addClass(o+'-open');
	});
	$('#totalmn').find('a').first().focus();
	$('#snb').find('.js-mn span').html('전체메뉴 열기');
}

let lyr;
let lyrClose = function (ele, t){
	'use strict';

	let o = $(ele).attr('id'),
		originScroll = -$('#wrap').position().top,
		time = t || 500;

	$('body').removeClass(o+'-open').find('.dim').remove();

	lyr = setTimeout(function(){
		$('#'+o).hide();
		$('body').removeClass('layer-open');
		if (originScroll != -0) {
			$(window).scrollTop(originScroll);
		}
		$('#wrap').removeAttr('style');
	},500);
	$('#snb').find('.js-mn span').html('전체메뉴 닫기');
}

$(function(){
	function totalMenuFocusMove() {
		$('[data-toggle="snb"]').focus();
		lyrClose(totalmn);
	}

	$('#totalmn').find('a').first().on("keydown", function(event) { 
		if (event.shiftKey && (event.keyCode || event.which) === 9) {
			event.preventDefault();
			totalMenuFocusMove();
        }
    })
	
	$('#totalmn').find('a:visible').last().on("blur", function(event) {
		totalMenuFocusMove();
	});

	// focus loop (popup)
	var focusAbleElement = 'a[href], input:not([disabled]), select:not([disabled]), button:not([disabled]), [tabindex="0"]';
	
	$('#popup').find(focusAbleElement).last().on("blur", function() {
		$('#popup').fadeOut();
	});

	$('#totalmn').hide();
	
	let breakpoint = {
		xl : window.matchMedia( '(min-width: 1200px)' ),
		lg : window.matchMedia( '(min-width: 992px)' )
	}

	function gnbClose() {
		$('#hd').removeClass('top-mn-open');
		$('#top-mn>li>a').filter('.on').removeClass('on');
		$('#top-mn').find('.menu-item:visible').hide();
	}

	let breakpointChecker = function() {
		if ( breakpoint.xl.matches ) {
			$(document).on('focus', '#hd .logo, [data-toggle="snb"]', function(){
				gnbClose();
			});

			$(document).on('mouseleave', '#top-mn', function(){
				gnbClose();
			});

		} else {
			$('#top-mn').off('mouseleave');
		}
	};

	for(const key in breakpoint) {
		breakpoint[key].addListener(breakpointChecker);
	}

	breakpointChecker();

	$(window).scroll(function(){
		if($(this).scrollTop()>0){
			$('body').addClass('is-scroll');
		}else{
			$('body').removeClass('is-scroll');
		}
	}).trigger('scroll');

	//gnb
	$(document).on('click','[data-toggle="snb"]', function(){
		$('body').hasClass('totalmn-open') ? lyrClose(totalmn) : lyrOpen(totalmn);
	});
	
    $(document).on('click', '[data-toggle="gnb"]', function(){
        $(this).next().slideToggle(150).parent().toggleClass('open');
        return false;
    });
    $('#gnb .active').addClass('open').children('ul').show();
	
	$(document).on('mouseenter focus', '#top-mn>li>a', function(){
		$('#hd').addClass('top-mn-open');
		$(this).addClass('on').parent().siblings().children('a').removeClass('on');
		$('#top-mn .menu-item').stop().slideUp(0);
		$(this).parent().find('.menu-item').stop().slideDown(400);
	});

	// Scroll Animation
	let observer = new IntersectionObserver(isElScrolledIntoView,{
        root: null,
        rootMargin: '0px',
        threshold: 0.2
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
});
