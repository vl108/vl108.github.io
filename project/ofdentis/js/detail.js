$(function(){
    'use strict';

    $('body').scrollspy({
        target: '.nav-sticky',
        offset: 180
    });

    $('.nav-sticky a').click(function(){
        scrollMove($(this).attr('href'), 100);
        return false;
    });

    // 강의 & 콘텐츠 보기
    $('.collapse-area').children().hide();
    $('.collapse-btn a').click(function(){
        let $t = $(this), 
            $index = $t.parent().index(),
            $target = $t.closest('.collapse-group').find('.collapse-area').children().eq($index);
        
        if(!$t.hasClass('active')){ 
            $t.closest('.collapse-btn').find('.active').removeClass('active');
            $t.addClass('active');
            $target.stop().fadeIn().siblings().hide();
        } else {
            $t.removeClass('active');
            $target.stop().fadeOut();
        }
        return false;
	});

    let $onlineChk = $('label.check-button>input');
    $onlineChk.change(function(){
        $onlineChk.is(':checked') ? $btnFix.addClass('show') : /*$btnFix.removeClass('show')*/ '';
    });
    let $btnFix = $('.order-buttons-fix');
    $(window).scroll(function(){
        if($onlineChk.filter(':checked').length){
            return false;
        }
        var sT = $(this).scrollTop();
        if(sT > $('.cont-info-area').offset().top+$('.cont-info-area').height() - 80 && sT < $('#ct').height() - $(window).height()){
            $btnFix.addClass('show');
        }else{
            $btnFix.removeClass('show');
        }
    }).trigger('scroll');


    // slider
	let prodMarket = new Swiper("#prod-market-slide", {
        on:{
            slideChange:function(e){
                $('#prod-market-slide-tmb [role=button]').eq(e.realIndex).click();
            },
        },
    });
    $('#prod-market-slide li').each(function(i){
        var img = $(this).find('img').attr('src'),
            a = '';
        if(i===0) a = 'active';
        $('#prod-market-slide-tmb').append('<li class="item-img ratio-1by1 '+a+'" role="button"><img src="'+img+'" alt="" /></li>');
    });
    $('#prod-market-slide-tmb [role=button]').click(function(){
        var $t = $(this);
        $t.addClass('active').siblings().removeClass('active');
        prodMarket.slideTo($t.index());
    });
});