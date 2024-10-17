
$(function(){
	"use strict";
	new Swiper('.supplies-swiper .swiper-container', {
		nextButton: '.supplies-swiper .swiper-button-next',
		prevButton: '.supplies-swiper .swiper-button-prev',
		pagination: '.supplies-swiper .swiper-pagination',
		paginationClickable: true,
		observer: true,
		observeParents: true,
		touchRatio: 1,
	});
});
