stageInit.themeFn = function(){
	$('#act').removeClass('success');
}

gameReset.themeFn = function(){
	stop_the_game();
	reset_the_game();
}

$(function($){
	'use strict';
	
	$(document).on('click','.guide',function(){
		$(this).addClass('disabled');
		stop_the_game();
		reset_the_game();
		start_the_game();
	});

	$(document).on('click','[data-role=start]',function(){
		$gameWrp.addClass('guide-open');
		makeQuiz.run();
	});
});

function nextStep() {
	if(step < maxStep){
		step++;
		round = 1;
		$gameBody.attr('data-page', step);
		gameReset.themeFn();
		stageInit.run();
	} else {
		gameFinish();
		setTimeout(function(){
			$gameWrp.addClass('finish');
		}, 3000)
	}
}

function nextStage() {
	nowStage = $stage.filter('.show');
	if(nowStage.next().attr("id") == "ending"){
		roundClear();
	} else {
		nowStage.removeClass('show').next().addClass('show');

		if(nowStage.next().attr("id") == "act"){
			$gameWrp.addClass('guide-open');
		}
	}
}

function gameFinish(){
	$gameWrp.removeClass('start').addClass('end');
	$('#ending').addClass('show').siblings().removeClass('show');
}

function roundClear(){
	$('#act').addClass('success');
	if(!(step < maxStep)){
		$('#modal-success').find('p').text('모든 단계를 완료했어요.');
	}
	setTimeout(function(){
		$('#modal-success').modal({backdrop: 'static'});
	}, 1000);
}

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
				if(isEnd){
					$('#modal-fail').modal({backdrop: 'static'});
				}
			}
		}, 500);
	}, 1000);
}

var basket = $('#basket'),
	eggs = $('.ingredients').filter(":visible").children('li'),
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
	$catch,
	catchCount = 0, 
	catchHtml;

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
			if(!egg.hasClass('catch')){
				$catch = true;
				catchCount++;
				egg.addClass('hits catch');
				catchHtml += egg.html();
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
	eggs = $('.ingredients').filter(":visible").children('li');
	eggs.removeAttr('style class');
	basket.removeAttr('style');
	$catch = false;
	catchCount = 0;
	catchHtml = '';
}

function start_the_game() {
	basket.draggable('option', 'disabled', false);
	$('.basket-inner').find('.catch').removeClass('catch');
	the_game = function () {
		eggs.each(function(){
			if (!(check_egg_hits_floor($(this)) || check_egg_hits_basket($(this)))) {
				egg_down($(this));
			}
		})
		
		if((($gameBody.attr('data-page') == 1 && !$catch) || ($gameBody.attr('data-page') != 1 && catchCount < 2)) && eggs.filter('.hits').length < eggs.length){
			anim_id = requestAnimationFrame(the_game);			
		} else {
			if(!$catch && eggs.filter('.hits').length == eggs.length){
				setTimeout(() => {
					$('#act').addClass('miss');
					setTimeout(() => {					
						$('#modal-fail').modal({backdrop: 'static'});
					}, 1000);
				}, 500);
			} else {
				if(($gameBody.attr('data-page') == 1 && $catch) || ($gameBody.attr('data-page') != 1 && catchCount > 0)){
					$('.basket-inner').append('<div class="catch">'+ catchHtml +'</div>');
					setTimeout(() => {
						nextStage();
					}, 500);
				}
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

