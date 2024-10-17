gameReset.themeFn = function(){
	stop_the_game();
	reset_the_game();
	$dropBox.droppable('option', 'disabled', false).data('drop', 0).attr('data-drop', 0).children().removeAttr('style');
	$dragItems.draggable('option', 'disabled', false).parent().removeClass('dropped');
	$('.basket-inner').find('i').remove();
	basket.draggable('option', 'disabled', true);
	$('#act').find('.guide').show();
}

makeQuiz.themeFn = function(){
	stop_the_game();
	reset_the_game();
	start_the_game();
}

var $dragItems = $('.drag-item'),
	$dropBox = $('.drop-box');

$(function($){
	'use strict';

	basket.draggable('option', 'disabled', true);
	$(document).on('click','.guide',function(){
		$(this).hide();
	});

	$(document).on('click','[data-role=start]',function(){
		//1단계 guide 활성화
		// if((!isStep || (social && $gameBody.attr('data-page') === '1'))){
		// 	$gameWrp.addClass('guide-open');
		// 	setTimeout(function(){
		// 		$gameWrp.removeClass('guide-open');
		// 		gameStart();
		// 	}, 3000);
		// } else {
		// 	gameStart();
		// }

		//모든 단계 guide 활성화
		$gameWrp.addClass('guide-open');
		setTimeout(function(){
			$gameWrp.removeClass('guide-open');
			gameStart();
		}, 3000);
	});

	function gameStart() {
		$gameWrp.addClass('start');
		makeQuiz.run();
	}

    $dragItems.on('touchmove',function(event){
		event.preventDefault();
		event.stopPropagation();
	});
	
	$dragItems.draggable({
		revert:true,
		revertDuration: 500,
		start: function () {
			$(this).addClass('dragging');
		},
		stop: function () {
			$(this).removeClass('dragging');
		}
	});

    $dropBox.droppable({
		accept: '.drag-item',
		drop: function (e, ui) {
			var $t = $(this),
				$dragItem = $(ui.draggable);
            
			playAudio('drop', 'game06');
            $dragItem.parent().addClass('dropped');
            $t.data('drop', $t.data('drop')+1 ).children().eq($t.data('drop')).css('opacity',1);
            $t.attr('data-drop', $t.data('drop'));
            if($t.data('drop') == $t.children().length-1){
				$dragItem.draggable('option', 'disabled', true);
				var time = 1500;
				if($gameWrp.hasClass('page02') || $gameBody.attr('data-page') === '2'){
					time = 2500;
				}
				setTimeout(function(){
                    roundClear();
                }, time);
            }
		}
	});
})

function overlayClose(){
	overlayShow = false;
	setTimeout(function(){
		$('.answered').find('input').filter(':checked').prop('checked', false);
		setTimeout(function(){
			if(isCorrect){
				round++
				makeQuiz.run();
			} else {
				$('.answered').removeClass('answered');
				setTimeout(function(){
					if(isEnd){	
						if(social){
							if(step < maxStep){
								nextStep();
							} else {
								$('#modal-fail').modal({backdrop: 'static'});
							}
						} else {
							$('#modal-fail').modal({backdrop: 'static'});
						}
					} else {
						reset_the_game();
						start_the_game();
					}
				}, 500);
			}
		}, 500);
	}, 1000);
}

var basket = $('#basket'),
	eggs = $('#controler li'),
	floor = $('#floor'),
	basket_height = basket.height(),
	$controler_height = $controler.height(),
	egg_height = eggs.height(),
	speed = 1,
	the_game = 0,
	anim_id = 0,
	egg_current_position = 0,
	egg_top = 0,
	basket_top = $controler_height - basket_height,
	downAni,
	$catch;

function collision($div1, $div2) {
	var x1 = $div1.offset().left;
	var y1 = $div1.offset().top;
	var h1 = $div1.outerHeight(true);
	var w1 = $div1.outerWidth(true);
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = $div2.offset().left;
	var y2 = $div2.offset().top;
	var h2 = $div2.outerHeight(true);
	var w2 = $div2.outerWidth(true);
	var b2 = y2 + h2;
	var r2 = x2 + w2;

	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}
function egg_down(egg) {
	egg_current_position = parseInt(egg.css('top'));
	egg.css('top', egg_current_position + speed);
}

function check_egg_hits_floor(egg) {
	if (collision(egg, floor)) {
		egg.addClass('hits miss');
		return true;
	}
	return false;
}

function check_egg_hits_basket(egg) {
	if (collision(egg, basket)) {
        egg_top = parseInt(egg.css('top'));
		if (egg_top = basket_top) {
			if(!egg.hasClass('catch') && !$catch){
				$catch = true;
				egg.addClass('hits catch');
			}
			return true;
		}
	}
	return false;
}

function stop_the_game() {
	cancelAnimationFrame(anim_id);
	basket.draggable('option', 'disabled', true);
}

function reset_the_game() {
	$('#round').removeClass('miss');
	eggs = $('#controler li');
	eggs.removeAttr('style class');
	basket.removeAttr('style');
	$catch = false;
}

function start_the_game() {
	basket.draggable('option', 'disabled', false);
	$('.basket-inner').find('.catch').removeClass('catch');
	the_game = function () {
		eggs.each(function(){
			if (!(check_egg_hits_floor($(this)) || check_egg_hits_basket($(this)))) {
				egg_down($(this));
			} else if (check_egg_hits_basket($(this))){
				if($catch){
					$(this).addClass('hits catch');
					$('.basket-inner').append('<i class="catch"></i>');
					setTimeout(() => {	
						var $a = $(this).find('input');
						$a.css('border', '2px solid red');
						if($a.attr('data-answer') != undefined){
							answerChk($a);
						} else {	
							$('#round').addClass('miss');
							setTimeout(function(){
								$('.basket-inner').find('.catch').remove();
								answerChk();
							}, 2000);
						}
					}, 500);
				}
			}
		})
		
		if(!$catch && eggs.filter('.hits').length < eggs.length){
			anim_id = requestAnimationFrame(the_game);			
		} else {
			if(!$catch && (eggs.filter('.hits').length == eggs.length)){
				setTimeout(() => {	
					answerChk();
				}, 1000)
			}
			stop_the_game();
		}
	};
	anim_id = requestAnimationFrame(the_game);
};

basket.draggable({
	containment: 'parent',
	start: function () {
		$(this).addClass('dragging');
	},
	stop: function () {
		$(this).removeClass('dragging');
	}
});

