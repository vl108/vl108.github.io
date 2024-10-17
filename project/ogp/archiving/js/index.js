jQuery(function($){
	"use strict";

	$(document).on('click', '.btn-more', function(){
		$(this).closest('.collapse-toggle').next('.collapse').slideToggle();
	})
    .on('click', '[data-toggle="lightbox"]', function(){
		$('[data-lightbox="'+this.dataset.target+'"]').first().trigger('click');
	});

	$('.video').click(function () {
		var playurl = '',playHtml = '';
		playurl = 'https://www.youtube.com/embed/N4tGqt2J1ww?autoplay=1';
		playHtml 
		+= '<iframe width="100%" height="100%" src="' + playurl +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		$(this).find('#btnPlay').html(playHtml);
	});
})
