$(function(){
    // 가로모드
    $('body').append(`
<div class="guide">
	<i class="icon-mobile"></i>
	<h2 class="guide-txt">최적화된 스마트 학습을 이용하기 위해 <br>‘가로 모드’로 전환해 주세요.</h2>
</div>
    `);
    var w,h;
    $(window).resize(function(){
        w = $(this).width(),
        h = $(this).height();
    }).trigger('resize');
    function resizeDirection(){
        if(window.orientation===0 || window.innerWidth>900){
            $('#wrap').css({
                transform:"none"
            });
        } else {
            setTimeout(function(){
                $('body').height(h);
                $('#wrap').css({
                    transform:'scale('+h / 768+')'
                });

            },500);
        }
    }
    $(window).on("orientationchange",function(){
        resizeDirection();
    });
    resizeDirection();
    $('.modal').appendTo('#wrap');
});

// audio
$('#wrap').append('<audio>');
function audioPlay(sound){
    audioStop();
    $('audio').attr('src', '../../effect/' + sound + '.mp3');
    $('audio')[0].oncanplaythrough = $('audio')[0].play();
}
function audioStop(){
    $('audio').each(function(){
        $(this)[0].pause();
        $(this).find('source').removeAttr('src');
    });
}