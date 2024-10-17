$(function(){
	let lyrOpen = function (ele){
		"use strict";
	
		let o = $(ele).attr('aria-controls'),
			a = -$(window).scrollTop();
	
		$('#wrap').css('top',a);
		$('body').addClass('layer-open').find('.hd-toggle').removeClass('menu-open').end().find('.hd-toggler').attr('aria-expanded', 'false').end().find('[aria-hidden]').attr('aria-hidden','true');
		$('#'+o).attr('aria-hidden','false').closest('.hd-toggle').addClass('menu-open').children('.hd-toggler').attr('aria-expanded', 'true');
	}
	
	let lyrClose = function (ele, t){
		'use strict';
	
		let o = $(ele).attr('aria-controls'),
			originScroll = -$('#wrap').position().top,
			time = t || 500;
	
		$('body').find('.hd-toggle').removeClass('menu-open').end().find('.hd-toggler').attr('aria-expanded', 'false').end().find('[aria-hidden]').attr('aria-hidden','true');
	
		$('#'+o).stop().fadeOut(400, function(){
			$('body').removeClass('layer-open');
			if (originScroll != -0) {
				$(window).scrollTop(originScroll);
			}
			$('#wrap').removeAttr('style');
		}); 
	}

	$(document).on('click', '.hd-toggle button', function(ele){
		var ele = this;
		$(this).closest('.hd-toggle').hasClass('menu-open') ? lyrClose(ele) : lyrOpen(ele);
	});

	var $w = $(window),
		$tmp = 0,
		$hd = $('#hd'),
		$ft = $('#ft'),
		$hdHeight = $hd.outerHeight(),
		$ftHeight = $ft.outerHeight(),
	 	$nav = $('#nav');

	$w.resize(function(){
		$hdHeight = $hd.height();
	});

	$w.scroll(function(){
		var $sT = $(this).scrollTop();

		if($sT>0){
			$('body').addClass('is-scroll');
			if ($sT >= $hdHeight) {
				$nav.addClass('nav-sticky');
				if ($sT > $tmp){
					$nav.css('top','-1px');
					$hd.removeClass('hd-sticky');
				} else {
					$hd.addClass('hd-sticky');
					$nav.css('top',$hdHeight);
				}
			} else {
			}
			if($sT > $(document).height() - $w.height() - $ftHeight){
				$('#goTop').addClass('flexible');
			} else {
				$('#goTop').removeClass('flexible');
			}
		}else{
			$('body').removeClass('is-scroll');
			$nav.removeClass('nav-sticky').removeAttr('style');
			$hd.removeClass('hd-sticky');

		}
		$tmp = $sT;
	}).trigger('scroll');  
	
	$('#goTop').click(function(){
		$('html, body').animate({
			scrollTop: '0'
		}, 500);
		return false;
    });

	$( ".datepicker" ).datepicker({ dateFormat: 'yy-mm-dd' }).val();
});