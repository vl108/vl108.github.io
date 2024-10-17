
var lyrOpen = function (o){
	"use strict";
	var a = -$(window).scrollTop();
	$('#wrap').css('top',a);
	$('body').addClass('nav-open');
	$('#'+o).show(0,function(){
		$('body').addClass(o+'-open');
	});
}

var lyrClose = function (o){
	'use strict';
	var originScroll = -$('#wrap').position().top;
	$('body').removeClass(o+'-open');
	setTimeout(function(){
		$('#'+o).hide();
		$('body').removeClass('nav-open');
		if(originScroll!=-0){
			$(window).scrollTop(originScroll);
		}
		$('#wrap').removeAttr('style');
	},500);
}


jQuery(function($){
	"use strict";

	var $w = $(window),
		$body = $('body');

	$w.scroll(function(){
		var sT = $(this).scrollTop(),
			m = 112;
			
		if($w.width()<991){
			m = 0;
		}
		// hd scroll
		if(sT>0){
			$body.addClass('is-scroll');
		} else {
			$body.removeClass('is-scroll');
		}
	}).trigger('scroll');
	// scroll animation
	function scrollSection(){
		var sT = $w.scrollTop(),
			wH = $w.height();
		$('.ani-sect').each(function(){
			var t = $(this),
				tT = t.offset().top,
				tH = t.innerHeight(),
				tD = 0;
			if(tT-wH<sT-tD){
				t.find('.animate__animated').removeClass('ani-stop').addClass('active');
			} else {
				t.find('.animate__animated').addClass('ani-stop').removeClass('active');
			}
		});
	}	
	
	$w.scroll(function(){
		scrollSection();
	}).trigger('scroll');
		
	// gnb
	var $gnb = $('.gnb');
	var dep = $gnb.children();

	var depHide = function () {
		dep.removeClass('open');
	}

	var depShow = function (t) {
		$(t).parent().addClass('open').siblings().removeClass('open');
	}

	$gnb.on('mouseleave', function(){
		depHide();
	});

	dep.children('a').on({
		focus:function  (e) {
			depHide();
			depShow(this);
			e.stopPropagation();
		},
		mouseover:function  (e) {
			depShow(this);
			e.stopPropagation();
		}
	});

	$('.btn-depth').click(function(){
		var target = $(this).parent();
		target.toggleClass('open');
		$gnb.find('.open').not(target).removeClass('open');
	});

	$('.hd-util>a:last, #aside a, #ct a').focus(depHide);
	
	$('.js-mn').click(function(){
		$body.hasClass('nav-open') ? lyrClose('gnb') : lyrOpen('gnb');
		return false;
	});

	$body.on('click', '[data-toggle="row"]', function(){
		$(this).closest('tr, .rows').toggleClass('open').next('.collapse-row').toggleClass('d-none');
		return false;
	})

    .on('click', '[data-toggle="lightbox"]', function(){
		$('[data-lightbox="'+this.dataset.target+'"]').first().trigger('click');
	});

	$( '.btn-top' ).click(function() {
		$( 'html, body' ).animate( { scrollTop : 0 }, 200 );
		return false;
	} );	

	$('.vision-list li .circle').click(function(e){
		e.preventDefault();
		$(this).addClass('on').parent().siblings().find('.on').removeClass('on');
	});

	$('.terms-bx, .filter-select-group').hide();	
	$('.btn-terms-more').click(function(){
		var i=$(this).parent().parent();
		if(i.hasClass('active')){
			i.removeClass('active');
			$(this).parent().next('.terms-bx').slideToggle(300);
		} else {
			i.addClass('active');
			$(this).parent().next('.terms-bx').slideToggle(300);
		}
	});

	$('.filter-select-cate').click(function(){
		var target=$(this).parent();
		if(target.hasClass('filter-open')){
			target.removeClass('filter-open');
			$(this).next('.filter-select-group').slideToggle(300);
		} else {
			// target.siblings().removeClass('filter-open').find('.filter-select-group').hide();
			target.addClass('filter-open');
			$(this).next('.filter-select-group').slideToggle(300);
		}
	});
	$('.popupAlarm .close').click(function(){
		var $tg = $(this).parents('.popupAlarm')
		$tg.slideUp(500);
	});
	$(document).on('click', '.bubble-group>*', function(e){
		e.preventDefault();
		$(this).addClass('no-pointer').closest('.bubble-group').addClass('on');
		setTimeout(removeBubble, 3000);
	});
	function removeBubble(){
		$('.bubble-group>*').each(function(){
			$(this).removeClass('no-pointer').closest('.bubble-group').removeClass('on');
		})
	}	
	$('.onair .btn-session').mouseover(function(){
		var $tg = $(this).parents('.bubble-wrp');
		$tg.addClass('on');
	}).mouseleave(function(){
		var $tg = $(this).parents('.bubble-wrp');
		$tg.removeClass('on');
	});

	$('.btn-filter').on('click', function (e) {
		$body.addClass('layer-open');
	});

	$('.inner-layer-popup .close').on('click', function (e) {
		$body.removeClass('layer-open');
	});

	$('.filter-select-group .chk-item>input').click(function(){
		var t = $(this),
			child = t.nextAll('.details-option').find('>div>input'),
			childCount = child.length,
			p = t.closest('.chk-item').children('input');
		
		//  // 아래 열림
		if(t.prop('checked')){
			child.hide().prop('checked',true);
		} else {
			child.prop('checked',false);
		}
	});
})
