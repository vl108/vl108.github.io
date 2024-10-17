jQuery(function($){
    'use strict';

    $('#modalVirtual').addClass('modal-open').show();

    $('.zoom').magnify({
        afterLoad: function() {
            setTimeout(function(){
                $('.magnify').show().css('background-position','-565px -383px');
            },100);
        }
    });

    // 회전
    $(".bar").on('touchmove',function(event){
		event.preventDefault();
		event.stopPropagation();
	});
    
    $(".bar").draggable({
        containment: "parent",
        start: function(){
            $(this).parent().addClass('dragging');
        },
        drag: function(){
            var $wrp = $(this).closest('.interaction').find('.rotate'),
                $position = $(this).position().left / $wrp.data('gage');

            $wrp.children('img').attr('src','images/virtual_03/rotate'+$wrp.data('type')+'_'+ Math.round($position) +'.jpg');
        },
        stop: function(){
            $(this).parent().removeClass('dragging');
        }
    });

    // 초기화
    $('[data-toggle="reset"]').click(function(){
        var $t = $(this),
            $tg = $($t.data('target')) || $('#modalVirtual');

        $tg.find('.active, .on').removeClass('active on');

        if($tg.find('.tab-pane').length){
            $tg.find('.tab-pane').filter(':first-child').addClass('active').siblings().removeClass('active');
            $tg.find('input, button').val('').removeAttr('disabled');
        }

        $('.rotate img').each(function(){
            var $wrp = $(this).closest('.interaction').find('.rotate');
            $(this).attr('src','images/virtual_03/rotate'+$wrp.data('type')+'_0.jpg');
        });

        $(".bar").css('left','0');
    });



    //

    $('.virtual-content [data-toggle=tab]').on('click',function(){
        var act = $(this).data('act') ;
        var tg1 = $(this).parents('.viewbox').find('.drag-item').attr('data-zoom'),
            tg2 = $(this).parents('.viewbox').find('.drag-item').attr('data-rot') ;

        if ( act == 'zoom' && tg1 ) {
            $(tg1).addClass('active').siblings().removeClass('active') ;
        } else {
            $(tg2).addClass('active').siblings().removeClass('active') ;
        }
    });
})
