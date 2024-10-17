function speedQuiz(data,level){
    // make data
    //$('.quizlist').empty();
    for(var i = 0;i < Object.keys(data).length;i++){
        var num = i+1,
            t = data[num],
            html = '',
			answer1 = '',
            answer2 = '',
            answer3 = '';
        if(t.a===1){
            answer1 = 'data-answer';
        } else if(t.a===2){
            answer2 = 'data-answer';
        } else {
            answer3 = 'data-answer';
        }
        if(t.c3=="" || t.c3){
			html += '<li class="option3">';
        } else if(t.type == "longword"){
			html += '<li class="longword">';
		} else {
			html += '<li>';
		}
        html += '<div class="qbox">',
        html += '<p><b class="font-coo">'+num+'</b><span>'+t.q+'</span></p>';
        if((t.c3==undefined || !t.c3) && (t.type==undefined || !t.type)){
        	html += '<img src="../../images/step1/level'+level+'-1/'+(i+1)+'.png">'
		} else if(t.d && t.c3 && (t.type==undefined || !t.type)){
			html += '<p class="desc">'+t.d+'</p>'
		}
        html += '</div>',
        html += '<div class="abox">',
        html += '<button type="button" '+answer1+'>'+t.c1+'</button>',
        html += '<span>vs</span>',
        html += '<button type="button" '+answer2+'>'+t.c2+'</button>';
        if(t.c3){
            html += '<span>vs</span><button type="button" '+answer3+'>'+t.c3+'</button>';
        }
        html += '</div>',
        html += '</li>';
        $('.quizlist').append(html);
    }

    // start
    var $board = $('#speedQuiz'),
		$list = $('.quizlist'),
        $btn =  $list.find('button'),
        $correct = $('#correctNum'),
		count = 0,
		state = 0,
		$timeBar = $('.line'),
		gameTimer;

	function gameStop(){
		clearInterval(gameTimer);
	}

	function gameStart(){
		var gameTime = 60,
			timeS = 360 / gameTime,
			timeT = 0;

		clearInterval(gameTimer);

		gameTimer = setInterval(function(){
			--gameTime;

			timeT+= timeS;
			$timeBar.css({'transform':'rotate('+timeT+'deg)'})

			if(gameTime<1){
				gameStop();
				gameFinish();

				return;
			}
		},1000);
	}

	function gameFinish(){
		$board.removeClass('playing').addClass('finish');
		$correct.text(count);
	}

	function gameReset(){
		gameStop();
		state = 0;
		count = 0;
		gameTimer;
		$board.removeClass('finish').find('.on, .disable, .active').removeClass('on disable active');
		$timeBar.css({'transform':'rotate(0deg)'});
		$btn.children('i').remove();
		$correct.text('');
	}

	function nextStep(num){
		$list.children().eq(num).addClass('active').prev().removeClass('active');

		if(num == $list.children().length){
			setTimeout(() => {
				gameFinish();
			}, 500);
		}
	}

	$('#btnStart').click(function(){
		$board.addClass('playing');
		gameStart();
		nextStep(0);
	});

	$btn.click(function(){
		var $t = $(this),
			$answer = $t.attr('data-answer') !== undefined;

		$t.closest('li').addClass('disable');
		if(!$answer){
			$t.append("<i class='ix'></i>");
			audioPlay('wrong');
		} else {
			$t.addClass('on').append("<i class='io'></i>");
			audioPlay('correct');
			count++;
		}

		setTimeout(() => {
			state++;
            nextStep(state);
        }, 1500);
	});

	$('[data-toggle="replay"]').click(function(){
		gameReset();
	});

	$('[data-toggle="reset"]').click(function(){
		gameReset();
		location.href='game-map.html';
	});
    
}