// 주사위 - 땅따먹기
function audioStop(){
	$('audio').not('#gamebg').each(function(){
		audioPause($(this)[0]);
	});
}

$(function(){
    // 전역변수
    let player=[]// 플레이어
    let players = maxState = 1; // 인원수 (인원수 - 1)
    let point = [[0, 0], [0, 0]]; // 말이 원래 있었던 장소 & 말이 움직일 장소의 번호 배열
    let state = 0; // 턴
    let winnerCnt = 0; // 게임완료인원

    let playerMoveSet;
    let letsMoveSet;
    let playQuizSet;
    let playTurnSet;
    let isStart = false;
    let gamebgAudio = document.getElementById('gamebg');

    $('#map').addClass('disabled');
    $('#modalGame [data-dismiss="modal"]').on('click', function () {
        // 초기화
        $('#map').addClass('disabled');
        $('[class*=balloon]').stop();
        $('.dice').removeClass('last').find('.game-fin').removeClass('active');
        $('#map p').removeClass('pick').removeAttr('data-player') ;
        $('input[type=hidden]').val('') ;
        $('.player').attr('data-land','').removeClass('winner') ;
        $('#diceImg').removeClass('active disabled');
        $('#quizWrap').removeClass('active').find('li').removeClass('active');
        $("#diceTurn").html('가위바위보로<br /> 순서를 정해 보세요. <br />이기는 말이 <br /> 먼저 시작합니다.').removeClass('effect');

        clearTimeout(playerMoveSet);
        clearTimeout(letsMoveSet);
        clearTimeout(playQuizSet);
        clearTimeout(playTurnSet);

        point = [[0, 0], [0,0]];
        state = maxState + 1;
        winnerCnt = 0;
        count = 0;
		audioPause(gamebgAudio);
		isStart = false;
    });

    $('#modalFin .icon-close').on('click', function () {
        state++;
        startSetting() ;
    });

    // 게임 플레이
    var nowPlayer ;
    var maxmove = $('#map').find('p').length - 1 ;

    // 플레이어 셋팅
    for (var i = 0; i <= players; i++) {
        var playerimg = "<i class='player player"+(i+1)+"' id='player"+(i+1)+"p'></i>"
        player.push(playerimg) ;
        $("#map").append(player[i]);
    }


    // 주사위
    var dice = $('#diceImg');
    var dice1, dice2 ;
    var count = 0;


    // 주사위 굴리기 (처음 순서 정하기)
    dice.on('click',function(){
        firstdice();
        dice.find('.dice-red>i').css({"background-image":"url(images/common/game/num_"+dice1+".png)", 'background-repeat':'no-repeat', 'background-position':'center', 'background-size':'100%'});
        dice.find('.dice-blue>i').css({"background-image":"url(images/common/game/num_"+dice2+".png)", 'background-repeat':'no-repeat', 'background-position':'center', 'background-size':'100%'});
        dice.addClass('active disabled');

        if(!isStart){
            gamebgAudio.volume = 0.3;
        	gamebgAudio.play();
            isStart = true;
        }

        document.getElementById('gameding').play();

        if (dice1-dice2 === -2 || dice1-dice2 === 1) { //red first
            state = 0 ;
        } else if (dice1-dice2 === 2 || dice1-dice2 === -1){ //blue first
            state = 1 ;
        }

        playTurnSet = setTimeout( turnSet  , 1500);
    });
    function firstdice(){
        dice1 = Math.floor(Math.random() * 3) + 1;
        dice2 = Math.floor(Math.random() * 3) + 1;

        //1 바위 2 가위 3 보
        if (dice1 == dice2) {
            firstdice();
        } else {
            return;
        }
    }

    // 턴 셋팅 , 옮기기
    function turnSet(){
        $('#map').removeClass('disabled');
        $("#diceTurn").empty();
        $('.balloon1').addClass('effect');
        nowPlayer = $('#map').find("#player"+(state+1)+"p");

        if (state===0) {
            $("#diceTurn").html('빨간색 말이 <br />원하는 문제를 <br />선택하세요.');
        } else {
            $("#diceTurn").html('파란색 말이 <br />원하는 문제를 <br />선택하세요.');
        }
    }

    var $num;
    // 퀴즈 선택
    $('#map p').on('click', function(){
        $num = $(this).index();
        $('#quizWrap').addClass('active') ;
        $('#quizList').children().eq($num).addClass('active').siblings().removeClass('active');
        point[1][state] = $num;
        console.log($num, point[1][state])
    })

    // 퀴즈
    var $btnSet = $('[data-toggle^=step-]');
    $btnSet.on('click', function(){
        var $btn = $(this),
            $btnWrp = $(this).parent(),
            $answerTxt = $(this).parent().find('.answer-txt');
        $btnWrp.addClass('active').children('button').addClass('disabled');

        // o 버튼 누름
        if($btn.data('toggle')==='step-o'){
            if($btnWrp.data('answer')==='o'){
                console.log('o 누름 정답입니다.');
                oxCorrect();
            } else if($btnWrp.data('answer')==='x'){
                console.log('o 누름 정답은 x입니다.');
                oxError('X');
            }
        }
        // x 버튼 누름
        else if($btn.data('toggle')==='step-x'){
            if($btnWrp.data('answer')==='x'){
                console.log('x 누름 정답입니다.');
                oxCorrect();
            } else if($btnWrp.data('answer')==='o'){
                console.log('x 누름 정답은 o입니다.');
                oxError('O');
            }
        }
        function oxCorrect(){
            $answerTxt.html("<p class='correct'>정답입니다.</p>");
            $btnWrp.siblings('.btn-chk').removeAttr('disabled');
            effectAudio.play('correct');
            point[0][state] = point[1][state];
            landpick();
        }
        function oxError(ox){
            $answerTxt.html("<p>정답은 <strong>"+ox+"</strong>입니다.</p>");
            $btnWrp.siblings('.btn-chk').removeAttr('disabled');
            effectAudio.play('wrong');
            point[1][state] = point[0][state];
        }
    });

    // 서술형
    var $btnSet2 = $('[data-enter]');
    $btnSet2.on('click', function(){
        var $btn = $(this);

        $btn.addClass('active').parents().find('button').addClass('disabled');


        setTimeout(() => {
            $btn.parents().find('button').removeClass('disabled')
        }, 3000)

        // o 버튼 누름
        if($btn.data('enter')==='o'){  //통과
            effectAudio.play('correct');
            point[0][state] = point[1][state];
            landpick(); nextStep();
        }
        // x 버튼 누름
        else if($btn.data('enter')==='x'){ //불통과
            effectAudio.play('wrong');
            point[1][state] = point[0][state];
            nextStep();
        }
    });

    function landpick(){
        $('#map').find('p').eq(point[1][state]).addClass('pick').attr('data-player',nowPlayer.attr('id'));
    }
    function nextStep(){
        point[0][state] = point[1][state];
        nowPlayer.attr('data-land', 0);
        state++;
        startSetting();
    }

    $('.btn-chk').on('click',function(){
        nextStep();
    });

    function startSetting() {
        count = count + 1;
        dice.addClass('active disabled');
        $('.balloon1').removeClass('effect');
        $('#quizWrap').removeClass('active');
        $('#quizList').find('.active, .disabled').removeClass('active disabled answered');
        $('.btn-chk').attr('disabled',true);

        var totNo = $('#map>p:not(.pick)').length;
        if ( totNo != 0 ) { // 마지막이 아니면 턴셋
            if(state > maxState){
                state = 0;
            }
            if (count == 2){
                count = 0;
                $('#map').addClass('disabled');
                dice.removeClass('active disabled');
                $("#diceTurn").html('가위바위보를 <br />하세요.').removeClass('effect');
                dice.find('i').css({"background-image":"url(images/common/game/num_3.png)", 'background-repeat':'no-repeat', 'background-position':'center', 'background-size':'100%'});
                return;
            }
            playTurnSet = setTimeout(turnSet,1000);
        } else {
            $('.dice .game-fin').addClass('active');
            audioPause(gamebgAudio);
            document.getElementById('gameclap').play();
        }
    }
});
