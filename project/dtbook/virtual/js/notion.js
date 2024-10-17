$(function(){

    $('.answer-scratch').each(function(){
        var $scratch = $(this);

        $scratch.wScratchPad({
            size        : 20,
            fg          : '#a1acb8',
            scratchDown  : function(e, percent){
                $scratch.addClass('done');
            },
            scratchMove : function(e, percent){
                if(percent > 40){
                    $scratch.addClass('complete');
                }

				if(percent >= 80) {
					$scratch.wScratchPad('clear');
				}

                $('.complete').length === $('.answer-scratch').length && $('.final-btns button').removeClass('disabled');
            }
        }).on('mousedown touchmove',function(event){
    		event.preventDefault();
    		event.stopPropagation();
    	});
    });


    $('.btn-scratch-check').click(function(){
        if($(this).hasClass('disabled')){
            showMsg('#answerMsg');
        }else{
            $('.answer-scratch').wScratchPad('clear').addClass('done');
        }
    });

    $('.btn-scratch-reset').click(function(){
        $('.answer-scratch').wScratchPad('reset').removeClass('done complete');
        $('.final-btns button.btn-scratch-check').addClass('disabled');
    });
});
