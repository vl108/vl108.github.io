var buzzerAni, clawAni, clawWrongAni, clawResetAni, clawCorrectAni;

var $dragItems = $('.drag-item'),
$dropBox = $('.drop-box');

gameReset.themeFn = function(){
	stopTimer();
	$dropBox.removeClass('pick moving drop dropped').droppable('option', 'disabled', false).children('.drop-item').children().not('.drop-img').remove();
	$dragItems.removeClass('on dropped').removeAttr('style').draggable('option', 'disabled', false).find('.arr').remove();
	clearTimeout(buzzerAni);
	clearTimeout(clawAni); 
	clearTimeout(clawWrongAni); 
	clearTimeout(clawResetAni); 
	clearTimeout(clawCorrectAni);
	$('.rain').children().remove();
}

var cnt = 0, timer;
function startTimer(){
	timer = setInterval(function(){
		cnt++;
		if(cnt == 3){
			$dragItems.removeClass('on');
		} 
		if(cnt == 4){
			$dragItems.addClass('on');
		} 
		if(cnt == 6){
			cnt = 0;
		} 
	}, 1000);
}

function stopTimer(){
	cnt = 0;
	$dragItems.removeClass('on');
	clearInterval(timer);
}

$(function($){
	'use strict';

	$dragItems.on('touchmove',function(event){
		event.preventDefault();
		event.stopPropagation();
	});
	
	$dragItems.draggable({
		revert:function(event, ui){
			if(event == false){
				$(this).data("uiDraggable").originalPosition = { top : 'auto', left : '668px' };
				return true;
			}else{
				return false;
			}
		},
		revertDuration: 500,
		containment: 'parent',
		start: function () {
			$(this).addClass('dragging').removeClass('on dropped').find('.arr').remove();
			$('.drop-item').find('.drag').remove();
			$('.btn-buzzer').removeClass('on');
			stopTimer();
		},
		stop: function () {
			var $t = $(this);
			$t.removeClass('dragging on');
			if(!$t.hasClass('dropped')){
				startTimer();
			}
		},
		create: function(){
			var $t = $(this);
			$t.data('originalPosition',{
				top: $t.css('top'),
				left: $t.css('left')
			});
		},
	});
	
	$dropBox.droppable({
		accept: '.drag-item',
		drop: function (e, ui) {
			var $t = $(this),
				$dragItem = $(ui.draggable);
	
			$t.addClass('dropped').siblings().removeClass('dropped');
			$t.children('.drop-item').append('<div class="drag"></div>');
			$('.drag').html(ui.draggable.clone());
			$dragItem.css({top: $t.css('top'),left: $t.css('left')}).addClass('dropped').append('<i class="arr"></i>');
			$t.find('.drag-item').append($t.find('.drop-img').html());

			stopTimer();
			buzzerAni = setTimeout(function(){
				$('.btn-buzzer').addClass('on');
			},500);
		}
	});

	$(document).on('click','.guide',function(){
		gameStart();
	});
	
	$(document).on('click','[data-role=start]',function(){
		if((!isStep || (social && $gameBody.attr('data-page') === '1'))){
			$gameWrp.addClass('guide-open');
		} else {
			gameStart();
		}
	});

	function gameStart() {
		$gameWrp.addClass('start');
		$dragItems.addClass('on');
		cnt = -2;
		startTimer();
	}

	$(document).on('click','.btn-buzzer',function(){
		stopTimer();
		playAudio('click');
		$(this).removeClass('on').addClass('active');
	
		var $t = $(this),
			$dragItem = $dragItems.filter('.ui-draggable'),
			$dropItem = $dropBox.filter('.dropped'),
			prop = $dropItem.attr('data-answer') != undefined;

		$dragItem.draggable('option', 'disabled', true).removeClass('dropped');
		$dropItem.droppable('option', 'disabled', true).addClass('pick');
		
		clawAni = setTimeout(() => $dropItem.addClass('moving'), 3000);
	
		if(!prop){
			clawWrongAni = setTimeout(function(){
				$dropItem.removeClass('moving').addClass('drop');
				playAudio('wrong');
			}, 5000);
			clawResetAni = setTimeout(function(){
				$t.removeClass('active');
				$dropItem.removeClass('drop pick moving').droppable('option', 'disabled', false);
				$dropItem.children('.drop-item').children().not('.drop-img').remove();
				$dragItem.draggable('option', 'disabled', false);
				setTimeout(function(){
					$dragItem.css({
						top: $dragItem.data('originalPosition').top,
						left: $dragItem.data('originalPosition').left,
					});
					startTimer();
				},500);
			}, 6500);
		} else {
			clawCorrectAni = setTimeout(function(){
				playAudio('correct');
				nextStage();
				makeQuiz.run();
			}, 5000);
		}
	});
})