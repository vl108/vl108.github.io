var swiper = [];
$(function(){
	"use strict";

	function stopVideo (){
		var videos = Array.prototype.slice.call(document.getElementsByTagName("video"));
		videos.forEach(function(video){
			video.pause();
		});
	}

	$('.slider-wrap:not(.evlt-slider-wrap) .swiper-container').each(function  (i) {
		var t = $(this);
		var notouch = $(this).hasClass('notouch');
		swiper[i] = new Swiper(t, {
			nextButton: t.find('.swiper-button-next'),
			prevButton: t.find('.swiper-button-prev'),
			pagination: t.find('.swiper-pagination'),
			paginationClickable: true,
			observer: true,
  			observeParents: true,
			effect: t.attr('data-effect'),
            touchRatio: notouch ? 0 : 1,
			onSlideChangeStart: function (el) {
				stopVideo();
				t.find('.icon-enlarge.on').trigger('click');
			}
		});
	});
});
