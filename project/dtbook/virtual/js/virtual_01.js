var timer;
var time = 0;
var start = true;
var count;
// var timeCount = tg.attr('data-reset-time');

$(function(){
    $('#modalVirtual').addClass('modal-open').show();
    
    $('[data-control=start]').click(function(){
        var tg = $(this).closest('.tab-pane');

        tg.addClass('start');

        if(start){   
            start = false;
            count = 0;
            timeStart(tg, 0);
        }
    });

    $('.btn-flex button').click(function(){
        let tg = $(this).closest('.tab-pane');
        var tgType = tg.data('modal-type'),
        hour = tg.find('.hour'),
        num = hour.html(),
        hourType2 = tg.find('.hour2'),
        numType2 = hourType2.html(),
        maxCount = tg.data('start-count');
        count = tg.find('.interaction').attr('data-time'),
        timeCount = tg.find('.interaction').attr('data-start-time');
        console.log(count, num);
        clearInterval(timer);
        if(!tg.hasClass('start')){
            tg.addClass('start')
        } else {
            if(count < maxCount-1 || count === 0){
                if($(this).hasClass('btn-up')){
                    count++;
                    tg.find('.interaction').attr('data-time', count);
                    tg.find('.interaction').children().filter('.obj'+count).css('opacity', .5);
                    num++;
                    timeCount++;         
                    tg.find('.interaction').attr('data-start-time', timeCount);
                    amPm(tg);
                    numType2++;
                    
                } else {
                    count--;
                    tg.find('.interaction').attr('data-time', count);
                    tg.find('.interaction').children().filter(`.obj${count+2}`).css('opacity', 0);
                    num--;
                    timeCount--;   
                    numType2--;      
                    tg.find('.interaction').attr('data-start-time', timeCount);
                    amPm(tg);
                    if( count < 0) {
                        console.log('zero');
                        count = 0;
                        tg.find('.interaction').attr('data-time', count);
                        num = tg.attr('data-reset-time');
                        return false;
                    }
                }
                if(num == 24 || num ==0) {
                    num = 24;
                    hour.html('00');
                } else if( num < 0) {
                    num = 23
                    hour.html(num);
                } else if(num < 10 && num > 0) {
                    hour.html('0' + num);
                } else if(num < 10 && num > 0) {
                    hour.html('0' + num);
                } else if (num > 24){
                    num = 1;
                    hour.html('0' + num);
                } else {
                    hour.html(num);
                }
                if(numType2 < 1) {
                    numType2 = 12;
                    hourType2.html(numType2); 
                } else if(numType2 < 13) {
                    hourType2.html(numType2);
                } else if (numType2 >= 13){
                    hourType2.html(Math.abs(numType2 - 12)); 
                }
            } else {
                console.log('ddd');
                if(!$(this).hasClass('btn-up')){
                    count--;
                    tg.find('.interaction').attr('data-time', count);
                    tg.find('.interaction').children().filter('.obj'+count).css('opacity', .5);
                    num--;
                    timeCount--;         
                    tg.find('.interaction').attr('data-start-time', timeCount);
                    amPm(tg);
                    numType2--;
                    // if(num == 24) {
                    //     num = 0;
                    //     hour.html('0' + num);
                    // } else if(num < 10 && num > 1) {
                    //     hour.html('0' + num);
                    // } else if (num <= 1){
                    //     console.log('zero');
                    // }else {
                    //     hour.html(num);
                    // }
                    if(num == 24 || num ==0) {
                        num = 24;
                        hour.html('00');
                    } else if( num < 0) {
                        num = 23
                        hour.html(num);
                    } else if(num < 10 && num > 0) {
                        hour.html('0' + num);
                    } else if (num > 24){
                        num = 1;
                        hour.html('0' + num);
                    } else {
                        hour.html(num);
                    }
                    if(numType2 < 1) {
                        numType2 = 12;
                        hourType2.html(numType2); 
                    } else if(numType2 < 13) {
                        hourType2.html(numType2);
                    } else if (numType2 >= 13){
                        hourType2.html(Math.abs(numType2 - 12)); 
                    }
                }
            }
        }
    });

    function amPm(tg){
        var amtxt = tg.find('.ampm-txt');
        
        console.log(timeCount);
        if(timeCount >= 12 && timeCount < 24) {
            amtxt.text('오후');
        } else {
            amtxt.text('오전');
        }
    }

    function timeStart(tg, count){
        var tgType = tg.data('modal-type'),
        hour = tg.find('.hour'),
        num = hour.html(),
        hourType2 = tg.find('.hour2'),
        numType2 = hourType2.html(),
        maxCount = tg.data('start-count');
        timeCount = tg.find('.interaction').attr('data-start-time');
        if(!tg.hasClass('finish')){
            // 
            console.log(count);
            timer = setInterval(function(){
                count++;
                if (count < maxCount){
                    tg.find('.interaction').attr('data-time', count);
                    tg.find('.interaction').children().filter('.obj'+count).css('opacity', .5);
                    num++;
                    if(num == 24 || num ==0) {
                        num = 24;
                        hour.html('00');
                    } else if(num < 0) {
                        num = 23
                        hour.html(num);
                    } else if(num < 10 && num > 0) {
                        hour.html('0' + num);
                    } else if (num > 24){
                        num = 1;
                        hour.html('0' + num);
                    } else {
                        hour.html(num);
                    }
                    timeCount++;         
                    tg.find('.interaction').attr('data-start-time', timeCount);
                    amPm(tg);
                    numType2++;
                    if(numType2 < 1) {
                        numType2 = 12;
                        hourType2.html(numType2); 
                    } else if(numType2 < 13) {
                        hourType2.html(numType2);
                    } else if (numType2 >= 13){
                        hourType2.html(Math.abs(numType2 - 12)); 
                    }
                    console.log(numType2);
                } else if( count = maxCount-1){
                    clearInterval(timer); 
                    tg.addClass('finish');
                    tg.find('[data-control=pause]').removeClass('active');
                    tg.find('[data-control=pause]').attr('disabled',true);
                    if(tgType == 'day'){
                        $('#modalVirtualDay').show();
                        return false;
                    } else if(tgType == 'night'){
                        $('#modalVirtualNight').show();
                        return false;
                    }
                    return false;
                }
            }, 1000);
        } 
    }

    $('[data-control=pause]').click(function(){
        var t = $(this),
            tg = t.closest('.tab-pane'),
            count = tg.find('.interaction').attr('data-time');

        t.attr('disabled',true);

        if(!t.hasClass('active')){
            // 멈출때
            t.addClass('active');
            clearInterval(timer);
            start = true; 
        } else {
            // 재개할때
            t.removeClass('active');
            timeStart(tg, count);
        }
        tg.find('.hour').html()
        setTimeout(() =>{
            t.removeAttr('disabled');
        }, 1500)
    });

    $('#modalVirtual .nav button').click(function(){
        var t = $(this),
            tg =  $(t.data('target'));
            count = tg.find('.interaction').attr('data-time');

            console.log(tg, count);

        clearInterval(timer);
        start = true; 

    });

    $('[data-control=stop]').click(function(){
        var tg = $(this).closest('.tab-pane'),
        zone = tg.find('.interaction');

        tg.removeClass('start finish');
        zone.attr('data-time', 0).find('.obj').css('opacity', 0);

        clearInterval(timer); 
        start = true;
        count = 0;
        $(this).closest('.tab-pane').find('.hour').html($(this).closest('.tab-pane').data('reset-time'));
        zone.attr('data-start-time', tg.data('reset-time'));
        zone.find('.ampm-txt').text(tg.data('ap-text'));
        zone.find('.hour2').text(tg.data('de-time'));
        tg.find('[data-control=pause]').removeAttr('disabled');
        tg.find('[data-control=pause]').removeClass('active');
        var target = $(this.dataset.target);
        console.log(target);
		target.find('.drop-fix').droppable('option', 'disabled', false);
		target.find('.drop-fix').html('');
		target.find('.drop-fix').prev().val('');
		target.find('.drop-fix').prev().prop('checked', false);
		target.find('.drag-fix').draggable('option', 'disabled', false);
        console.log(tg.find('[data-control=pause]'));
    });

    // 초기화
    $('[data-toggle="reset"]').click(function(){
        var $t = $(this),
            $tg = $t.data('target') || $('#modalVirtual');

        clearInterval(timer); 
        $tg.find('.finish, .start, .active, .on, .disabled').removeClass('finish start active on disabled');
        $tg.find('.drop-fix').droppable('option', 'disabled', false).empty().prev().val('');	
        $tg.find('.drag-fix').draggable('option', 'disabled', false);

        $('.hour').each(function(){
			$(this).html($(this).closest('.tab-pane').data('reset-time'));
        });
        $('.interaction').attr('data-time', 0);
        $('.obj').css('opacity', 0);
        // $tg.find('[data-control=pause]').attr('disabled',false);
        if($tg.find('.tab-pane').length){
            $tg.find('.tab-pane, .nav button').filter(':first-child').addClass('active').siblings().removeClass('active');
        }
    });

    $('#modalVirtual [data-dismiss]').click(function(){
        clearInterval(timer); 
        $('#modalVirtual').find('.start, .finish').removeClass('.start, .finish');
    });

});