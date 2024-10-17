function oxQuiz(data){
    // make data
    for(var i = 0;i < Object.keys(data).length;i++){
        var num = i+1,
            t = data[num],
            html = '';
        html += '<li>',
        html += '<div role="button" data-answer="'+t.a+'"><p>'+t.q+'</p></div>',
        html += '</li>';
        $('.quizlist').append(html);
    }
    
    // start
    var $board = $('#oxQuiz'),
        $btn =  $board.find('[role=button]'),
        $uNum = $('#userNum'),
        $aNum = $btn.filter('[data-answer="o"]').length;
        
    $('#correctNum').text($aNum);

    $btn.click(function(){
        $(this).toggleClass('on');

        audioPlay('click_ground');
    })

    $('#btnFin').click(function(){
        var chked = false;
            // onCount = $('.on').length;

        if(!$btn.filter('.on').length){
            $('#modalAlert1').modal();
            return;
        // } else if($uNum.val() === ''){
        //     $('#modalAlert2').modal();
        //     return;
        // } else if($uNum.val() != onCount){
        //     $('#modalAlert3').modal();
        //     return;
        }else{
            chked = true;
        }
        
        if(chked){
            $board.addClass('disable');
            $btn.each(function(){
                $(this).append("<i class='i"+$(this).attr('data-answer')+"'></i>");
            });
            if($btn.filter(
                function(i, ele){
                    return $(ele).attr('data-answer') == 'o' && $(ele).hasClass('on')
            }).length == $aNum){
                audioPlay('2correct');
            } else {
                audioPlay('2correct');
            }
        }
    })

    function gameReset(){
        $board.removeClass('disable correct wrong');
        $board.find('.on').removeClass('on');
        $btn.children('i').remove();
        $uNum.val('');
    }

    $('[data-toggle="replay"]').click(function(){
		gameReset();
	})

	$('[data-toggle="reset"]').click(function(){
		gameReset();
		location.href='game-map.html';
	})
}