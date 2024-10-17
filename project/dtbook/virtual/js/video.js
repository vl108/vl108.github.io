var Button = videojs.getComponent('Button');

// 정지버튼
var stopButton = videojs.extend(Button, {
    constructor: function() {
        Button.apply(this, arguments);
        this.controlText('정지');
        this.addClass('vjs-stop-control');
    },
    handleClick: function() {
        this.player_.pause();
        this.player_.currentTime(0);
        this.player_.hasStarted(false);
    }
});
videojs.registerComponent('stopButton', stopButton);

// 자막버튼
var CaptionToggle = videojs.extend(Button, {
    constructor : function () {
        Button.apply(this, arguments);
        this.controlText('자막 보기');
        this.addClass('vjs-caption-control');
    },
    handleClick : function () {
        this.player_.toggleClass('is-caption');
        if(this.player_.hasClass('is-caption')){
            this.controlText('자막 닫기');
            $(this.player_.el_).closest('.modal').find('.btn-narr').text('자막 닫기').addClass('close');
        }else{
            this.controlText('자막 보기');
            $(this.player_.el_).closest('.modal').find('.btn-narr').text('자막 보기').removeClass('close');
        }
    }
});
videojs.registerComponent('captionToggle', CaptionToggle);

$('.video-js').each(function(i){
    var t = $(this);
    var $caption = t.next('.narr');
    t.attr('id','dtbook-video'+i);

    var width = $(this).attr('data-w')*1 || $(this).closest('.modal').length ? 662 : 768;

    if($(this).closest('.modal-small-dic').length){
        width = 614;
    }

    videojs(document.querySelector('#'+this.id),{
        controls: true,
        width: width,
        height: this.dataset.height || Math.round(width*0.5626),
        html5: {
            nativeTextTracks: DTCaliperSensor.detect.isiOS()
        },
        controlBar: {
            volumePanel: {inline: false},
            children: [
                'playToggle',
                'stopButton',
                'progressControl',
                'volumeMenuButton',
                'currentTimeDisplay',
                'durationDisplay',
                'volumePanel',
                'captionToggle',
                'fullscreenToggle',
                'remainingTimeDisplay'
            ]
        }
    }, function onPlayerReady() {
        var player = this;
        var $video = $('#' + this.id_);
        let isDown = false;

        // 비디오 플레이어 초기 볼륨값 50%로 설정
        player.volume(0.5);

        $caption.length && $video.append($caption);

        player.on('timeupdate', function () {
            var time = player.currentTime();

            $('[data-toggle=video-caption]').each(function(){
                var t = $(this);
                var playtime = this.dataset.playtime.split(',')[0];
                var endtime = this.dataset.playtime.split(',')[1]*1+1;
                if(playtime<time && time<endtime){
                    t.removeClass('hide');
                } else {
                    t.addClass('hide');
                }
            });
        });

        $video.closest('.modal').find('[data-dismiss="modal"]').click(function(){
            player.controlBar.stopButton.trigger('click');
        });
    });
});
    
