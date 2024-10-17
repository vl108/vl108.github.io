$(function(){
	$('.intro').addClass('visible');
	
	setTimeout(function () {
		$('.intro').removeClass('visible');
		$('.intro').css({ 'visibility': 'hidden' });
		$('.intro').css({ 'opacity': 0 });
		$('.intro').css({ 'transition': 'all 1s ease 0s' });
    }, 3500);

	$('.btn-total-menu').on('click', function (e) {
		if(!$('body').hasClass('menu-open')){
			$('body').addClass('menu-open');
		} else {
			$('body').removeClass('menu-open');
		}
	});

	$(window).scroll(function(){
		var $sT = $(this).scrollTop();

		if($sT>0){
			$('body').addClass('is-scroll');
		} else{
			$('body').removeClass('is-scroll');
		}
	});
});