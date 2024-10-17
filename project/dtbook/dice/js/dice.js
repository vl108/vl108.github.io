// 전역변수
let player=[];// 플레이어 
let playerInfo=[];// 플레이어 정보
let pValue = [];
let pColor = [];
let players;
let point=[[],[]]; // 말이 원래 있었던 장소 & 말이 움직일 장소의 번호 배열   
let state = 0; // 턴   
let winnerCnt = 0; // 게임완료인원

$(document).ready(function() { 
    // 음성 플레이
    $('#wrap').append('<audio controls data-dtext_index="dtext_cls_audio" class="position-absolute d-none"><source src="" type="audio/mpeg"></audio>');

    $(document).on("click", "[data-audio]", function(){
        var $t=$(this),
        audio_src = $(this).data('audio'); 
        console.log(audio_src);

        if(!$t.hasClass('active')){ 
            $('audio').find('source').attr('src',audio_src);
            $('audio')[0].pause();
            $('audio')[0].load();  
            $('audio')[0].oncanplaythrough = $('audio')[0].play();
        }
    });

    // 음성 멈춤
    function audioStop(){
        $('audio').each(function(){
            $(this)[0].pause();
            $(this).find('source').removeAttr('src');
            if (!isNaN($(this)[0].duration)) {
                $(this)[0].currentTime = 0;
            }
        });
    }
    $('.modal').on('show.bs.modal', function () {
            audioStop();
    }).on('hide.bs.modal', function () {
            audioStop();
    });
    
    $('#modal').on('hide.bs.modal', function () {
        // 초기화
        $('[class*=balloon]').stop();
        clearTimeout(playerMoveSet);
        clearTimeout(playQuizSet);
        for (let i = 0; i <= letsMoveSet; i++) {
            clearTimeout(i);
        }
        $('#diceImg').find('img').attr('src','images/common/dice/dice_1.png');
        $('.player').attr('data-land','').removeClass('winner') ;
        $('#map').find('.player').remove();
        player=[]; pValue=[]; pColor=[];
        state = 0; 
        winnerCnt = 0;
        $('.nickname').text('');
        $('#playerSetBtn input').prop('checked', false);
        $('#playerInfo input').val('');
        $('#playerSetBtn>div:first-child input').prop('checked', true);
        $('#playerInfo li:eq(2), #playerInfo li:eq(3)').hide();
        startSetting() ;
    });

    $('#modalFin .icon-close').on('click', function () {
        state++;
        startSetting() ;
    });

    // 게임 플레이
    var nowPlayer ;
    var maxmove = $('#map').find('span').length - 1 ;
    
    // 닉네임 입력
    var $playerNum = $('#playerSetBtn input');
    $playerNum.click(function(){
        var $num = Number($(this).val()),
            $tg =  $('#playerInfo').children();
            $maxNum = $tg.length-1;
        
        $tg.slice(-$maxNum).css( 'display', 'none' ).end().slice(0, $num).css( 'display', 'flex' );
    });

    // 컬러 입력
    var $pColorChk = $(".choice-color");
    $pColorChk.click(function() {
        var $t = $(this),
            $colorData = $t.data('color');

        $colorData = $colorData + 1;
        $t.data('color', $colorData).attr('data-color', $colorData);

        if($colorData > $pColorChk.length){
            $colorData = 1;
            $t.data('color', $colorData).attr('data-color', $colorData);
        }     
    });

    $('#btnStart').on('click',function(){       
        $('#map').find('.player').remove();
        playerChk(); 
    })

    function playerChk(){
        // 플레이어 닉네임
        var pValue = [],
            $playerId = $('#playerInfo li').filter(':visible').find('input');

        $playerId.each(function() { 
            var $playerValue = $(this).val(); 
            console.log($playerValue);
            pValue.push($playerValue);
        });
        let pValueResult = new Set(pValue);
        console.log(pValue);

        for(i = 0; i < pValue.length; i++){
            if( pValue[i] === ""){
                alert('플레이어 이름을 모두 설정해주세요.');
                return;
            }
        }

        // 플레이어 컬러 
        var pColor = [], 
            $playerColor = $("#playerInfo li:visible .choice-color");
    
        $playerColor.each(function() { 
            var $color = $(this).data('color');
            console.log($color);
            pColor.push($color);
        });
        let pColorResult = new Set(pColor);
        console.log(pColorResult);
        players = maxState = $playerId.length-1; //플레이어 수

        if(pValue.length !== pValueResult.size) {
            alert('플레이어 이름이 중복되었습니다.');
            return;
        }
        else if(pColor.length !== pColorResult.size) {
            alert('플레이어 색상이 중복되지 않게 변경해주세요.');
            return;
        } else {
            for (var i = 0; i <= players; i++) { 
                var playerimg = "<i class='player player"+(i+1)+"' id='player"+(i+1)+"p' data-color='"+pColor[i]+"'><span>"+pValue[i]+"</span></i>";
    
                player.push(playerimg);
                $("#map").append(player[i]);
                point[0].push('0' * i);
                point[1].push('0' * i);
    
                if( i == players ) {
                    turnSet();
                    setTimeout(() => { 
                        $('#playerSet').modal('hide');
                        $('#modal').modal('show');
                    }, 500);
            
                    console.log('플레이어 설정 완료, 게임시작');
                }
               
            }
        }
    }    

    // 턴 셋팅
    function turnSet(){ 
        $("#diceTurn, #diceNum").empty();
        nowPlayer = $('#map').find("#player"+(state+1)+"p");
        playerName = nowPlayer.children().text();
        playerColor = nowPlayer.data('color');
        // $("#diceTurn").append('<img src="images/common/dice/player'+playerColor+'.png" alt="" width="110"></img>');
        $("#diceTurn").append(playerName);
        $('.balloon1').addClass('effect');
        
        if (nowPlayer.hasClass('winner')) { // 완료된 말이면 다음턴
            state++; 
            startSetting() ;
        }
    }


    // 주사위
    var dice = $('#diceImg');
    // 주사위 굴리기
    function rollDice() {  
        dice.addClass('active disable');
    	diceNum = Math.floor(Math.random() * 6) + 1;
    	dice.find('img').attr('src','images/common/dice/dice_'+diceNum+'.png');
        setTimeout(() => {
            $('#diceNum').text(diceNum);
        }, 1000);
       
        // 수 랜덤으로 뽑아 value값에 넣기
        $("#diceValue").val(diceNum);	 
        return diceNum;
    }
    
    let playerMoveSet; 
    let letsMoveSet; 
    let playQuizSet;

    // 주사위 동작
    dice.on('click',function(){
        $('.balloon1').removeClass('effect').delay(1500).fadeOut(500); 
        $('.balloon2').delay(1500).fadeIn(500) ;
        rollDice();
        playerMoveSet = setTimeout(function(){
            letsMove(diceNum); 
        }, 700)
    });

    // 게임 진행
    function letsMove(diceNum) {	  
        var processfinish = false;
      
        if ( (point[0][state] + diceNum) <= (maxmove-1)) 
        {
            // 주사위 총 더한 값이 maxmove 미만
            point[1][state] = point[0][state] + diceNum;
        } else {
            // 주사위 총 더한 값이 maxmove 이상 => 완주 
            point[1][state] = maxmove ;
            processfinish = true;
        } 
        $("#point").val(point[1][state]);


        var playerH = nowPlayer;
        
        // 말 이동 playerMove()
        if (diceNum > 0){ 
            // 앞으로 진행
            var cnt = 0 ;
            for (let i = point[0][state]+1; i <= point[1][state]; i++) {
                cnt++ ;
                letsMoveSet = setTimeout(function(){
                    playerH.attr('data-land',i);  
                    if (processfinish) {
                        if( i == point[1][state] ) { 
                            console.log('완주!!');
                            playerH.addClass('winner') ;
                            winnerCnt++ ;

                            $('.nickname').text(playerName);
                            if (winnerCnt > maxState) { // 모든 플레이어 완료
                                setTimeout(function(){
                                    $('#modalGameFin').modal({backdrop:'static'}); 
                                }, 1000);
                            } else  { //  플레이어가 남았을 때
                                setTimeout(function(){
                                        $('#modalFin').modal({backdrop:'static'}); 
                                }, 1000); 
                            }
                        }
                    } else { 
                        if( i == point[1][state] ) {afterMove()}
                    }
                }, ( cnt + 1 ) * 500); 

            }  

        } 

        // 플레이어 도착 
        function afterMove(){   
            var nowstate = $('#map').children('span').eq(point[1][state]).data('action') ; 
            switch ( nowstate ) {
                // 뒤로 한 칸
                case 'moveback1': 
                    console.log('뒤로 한 칸');
                    setTimeout(() => {  
                        point[1][state]-- ;
                        playerH.attr('data-land', point[1][state]);
                        afterMove(); 
                    }, 1000);
                    break;

                // 뒤로 두 칸
                case 'moveback2': 
                    console.log('뒤로 두 칸');
                    setTimeout(() => {  
                        var cnt = 0;
                        for (let i = 0; i <= 1; i++) {
                            cnt++ ;
                            letsMoveSet = setTimeout(function(){
                                point[1][state] = point[1][state]-1;
                                playerH.attr('data-land', point[1][state]);
                                
                                if(i == 1){
                                    afterMove(); 
                                }
                            }, ( cnt + 1 ) * 500); 
                        }  
                    }, 0);
                    break;

                // 이전으로 되돌아가기
                case 'return':  
                    setTimeout(() => {
                        console.log('이전으로 되돌아가기');
                        playerH.attr('data-land', point[0][state]); 
                        state++;
                        startSetting() ;
                    }, 1000); 
                    break;
                    
                // 앞으로 한 칸 
                case 'moveto1': 
                    console.log('앞으로 한 칸'); 
                    point[1][state]++ ;
                    setTimeout(() => {  
                        playerH.attr('data-land', point[1][state]); 
                        afterMove();
                    }, 1000);
                    break;

                // 앞으로 두 칸 
                case 'moveto2': 
                    console.log('앞으로 두 칸'); 
                    setTimeout(() => {  
                        var cnt = 0;
                        for (let i = 0; i <= 1; i++) {
                            cnt++ ;
                            letsMoveSet = setTimeout(function(){
                                point[1][state] = point[1][state]+1;
                                playerH.attr('data-land', point[1][state]);

                                if(i == 1){
                                    afterMove(); 
                                }
                            }, ( cnt + 1 ) * 500); 
                        }  
                    }, 0);
                    break;

                // 주사위 한 번 더 던지기
                case 'onemore': 
                    setTimeout(() => { 
                        console.log('주사위 한 번 더 던지기',state);
                        point[0][state] = point[1][state];    
                        startSetting() ;
                    }, 500); 
                    break;
                
                // 한 번 쉬기
                case 'nothing':  
                    setTimeout(() => {
                        console.log('한번 쉬기',state);
                        point[0][state] = point[1][state]; 
                        state++;  
                        startSetting() ;
                    }, 500); 
                    break;
                
                default:  
                    playQuiz(point[1][state]); 
                    break;
            }  
        } 
    }

    // 퀴즈
    var quizItem = $('#quizList').children(),
        $btnSet = $('[data-toggle^=step-]');

    function playQuiz(Num) {
        playQuizSet = setTimeout(function(){
            quizItem.eq(Num-1).addClass('active').siblings().removeClass('active'); 
        }, 0)
    } 

    $btnSet.on('click', function(){
        var $btn = $(this),
            $btnWrp = $(this).parent(),
            $answerTxt = $(this).parent().find('.answer-txt');
          $btnWrp.addClass('active').children('button').addClass('disable'); 

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
            $answerTxt.html("<i></i><p>정답입니다.</p><i></i>");
            $btnWrp.siblings('.btn-chk').removeAttr('disabled');
            point[0][state] = point[1][state]; 
        }
        function oxError(ox){
            $answerTxt.html("<p>정답은 <strong>"+ox+"</strong>입니다.</p>");  
            $btnWrp.siblings('.btn-chk').removeAttr('disabled');
            point[1][state] = point[0][state]; 
        }
    });

    // 서술형 캐릭터 동작
    $('.btn-answer').on('click',function(){
        $(this).addClass('disable').siblings().addClass('active').end().parent().addClass('active');
        $(this).parent().siblings('.btn-chk').removeAttr('disabled');
    });

    $('.btn-chk').on('click',function(){
        point[0][state] = point[1][state]; 
        nowPlayer.attr('data-land', point[0][state]); 
        state++;
        startSetting();
        audioStop();
    });  

    function startSetting() {
        $('.balloon1').fadeIn().addClass('effect');  
        $('.balloon2').fadeOut() ;

        //resetQuiz() {
        $('#quizList').find('.active, .disable').removeClass('active disable');
        $('.btn-chk').attr('disabled',true);

        //chkState() { 
        if(state > maxState){
            state = 0;   
        }

        // 주사위 리셋 resetDice() {
        setTimeout(function(){
            dice.removeClass('active disable');
        },1000); 
        turnSet();
    }
});