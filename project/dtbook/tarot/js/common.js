// audio
function audioPlay(type, name){
	var $audio = $('#'+ type);
	$audio[0].pause();
	$audio.attr('src', 'audio/' + type + '/' + name + '.mp3');
	$audio[0].load();
	$audio[0].oncanplaythrough = $audio[0].play();
}

let $stage = $('.stage'),
 	$tab = $('.tab-pane');

function nextStage() {
	var $nowStage = $stage.filter('.show').next();

	$nowStage.addClass('show').siblings().removeClass('show');
	if($nowStage.attr("id") == "chatbx" || $nowStage.attr("id") == "chatbx2"){
		$nowStage.addClass('active');
	}
}

function stageInit(){
	$('#wrap').find('.active, .disabled, .effect, .show').removeClass('active disabled effect show');
	$stage.eq(0).addClass('show');
	$('#tab2').removeClass('effect');
	$('.tab-pane').find('button').addClass('disabled');
	$('.chatbx-btm').find('button').addClass('disabled');
	$('.interaction').css('pointer-events','none');
}

$(function(){
	audioPlay('bgm', 'intro');

	stageInit();

	$(document).on('click','.btn-start',function(){
		nextStage();
	});

	$(document).on('click','#wrap [data-action=bubble]',function(){
		var $t = $(this), 
			$tg = $($t.data("target")),
			$idx = $tg.data('index');
			
		setTimeout(() => { 
			audioPlay('effect', 'open');
		}, 1000);

		var i = 0;
		setTimeout(() => { 
			bubbleSet(i);
		}, 3000);

		function bubbleSet(idx) {
			audioPlay('effect', 'bubble');
			$($tg.children().eq(idx)).css('opacity', 1);
			setTimeout(() => { 
				audioPlay('voice', 'bubble' + $idx + '_0' + (idx+1));
			}, 500);
		}
	
		$('#voice')[0].addEventListener("ended", function(){
			if(i < $tg.children().length - 1){
				i = i+1;
				setTimeout(() => { 				
					bubbleSet(i);
				}, 1000);
			} else {
				setTimeout(() => { 
					audioPlay('effect', 'bubble');
					targetAddClass($tg.closest('.chatbx').find('.chatbx-btm'), 'active effect');
					if($tg.closest('.chatbx').find('.rating').length){
						$('.rating').css({'opacity':'1', 'visibility': 'visible'});
					}
				}, 1000);
				return false;
			}
		})
	});

	$(document).on('click','button',function(){
		if($(this).hasClass('btn-start')){
			audioPlay('effect', 'start')
		} else {
			audioPlay('effect', 'click')
		}
	});

	$(document).on('click','.chatbx button',function(){
		audioPlay('effect', 'click');

		var $t = $(this),
			$tg = $t.closest('.chatbx'),
			$form = $tg.find('input, textarea').filter(":visible");

		setTimeout(() => { 
			audioPlay('effect', 'open');
			if($(this).closest('.stage').attr("id") == "chatbx") {
				$('.message').text($form.val());
				$('#modal-chk').modal({backdrop: 'static'});
				removeAddClass($('.chatbx-btm'), 'effect');
			} else {
				$('#modal-end').modal({backdrop: 'static'});
			}
		}, 500);
	});

	$(document).on('click','.btn-chk',function(){
		nextStage();
	});

	$(document).on('click','[data-role=edit]',function(){
		targetAddClass($('.chatbx-btm'), 'effect');
	});
	

	$(document).on('click','[data-role=toggle]',function(){
		$(this).css({'opacity':'0', 'visibility': 'hidden'});
		$('#tab4').addClass('result-open');
		setTimeout(() => { 
			$('.result').addClass('flip');
		}, 1000);
	})

	$(document).on('click','[data-role=tab]',function(){
		var $t = $(this),
			$tg = $t.data('target'),
			$btn = $($tg).find('.disabled'),
			$interaction = $($tg).find('.interaction'),
			$time = 3000;
		
		$t.addClass('disabled');
		switch ($tg) {
			case '#tab1': 
				$($tg).addClass('active').siblings().removeClass('active');
				setTimeout(() => { 
					audioPlay('effect', 'card_show');
				}, 1500);

				setTimeout(() => { 
					$interaction.css('pointer-events','auto');
					$btn.removeClass('disabled');
				}, $time);
				break;

			case '#tab2': 
				audioPlay('effect', 'card_click');

				$('#tab1').find('.img-show').addClass('active');
				setTimeout(() => { 
					$($tg).addClass('active').siblings().removeClass('active');
					$('#tab1').find('.img-show').removeClass('active');
				}, 2000);


				setTimeout(() => { 
					$($tg).find('.circle-move').css({'opacity':'0', 'visibility': 'hidden'})
				}, 7500);

				setTimeout(() => { 
					$interaction.css('pointer-events','auto');
					$btn.removeClass('disabled');
					// $('.pointer').css('opacity', '1')
				}, 8000);
				break;

			case '#tab3':
				$($tg).addClass('active').siblings().removeClass('active');
				audioPlay('effect', 'click');
				cardShuffle();

				setTimeout(() => { 
					cardMotion();
					audioPlay('effect', 'card_motion');
				}, 1000);

				setTimeout(() => { 
					$('#modal-alert').modal({backdrop: 'static'});
				}, 5000);

				setTimeout(() => { 
					audioPlay('effect','alert');
					$('#modal-alert').find('.bubble').children().css('opacity', 1);
				}, 5500);

				setTimeout(() => { 
					$('#modal-alert').hide();
				}, 11000);

				setTimeout(() => { 
					$interaction.css('pointer-events','auto');
					$btn.removeClass('disabled');
				}, 11500);

				break;

			case '#tab4':
				$($tg).addClass('active').siblings().removeClass('active');
				$($tg).find('.chatbx-btm').removeClass('active effect');
				audioPlay('bgm', 'ending');
				$('#wrap').addClass('ending');

				setTimeout(() => { 
					$('.choice').addClass('effect');
					audioPlay('effect', 'card_rotate');
				}, 2200);
			
				setTimeout(() => { 
					$('.choice').addClass('flip');
				}, 3500);
				
				setTimeout(() => { 
					$interaction.css('pointer-events','auto');
					$btn.removeClass('disabled');
				}, 10000);
				break;
		}
	});

	$(document).on('mouseover','#tab3 .item',function(){
		audioPlay('effect', 'card_hover');
	})

	$(document).on('click','#tab3 .item',function(){
		audioPlay('effect', 'card_pick'); 
		var cardNum = $(this).attr('data-num');
		var $card = cardList[cardNum];
		$('#card-img').html(`
			<img src="img/card/${cardNum}_line.png" alt="">
			<img src="img/card/${cardNum}_color.png" alt="" class="fill">
		`);
		$('#card-txt').html(`
			<h4>${$card.title}</h4>
			<p>${$card.content}</p>
		`);
		$('#tab3').css('pointer-events','none').find('[data-role=tab]').click();
	})

	$(document).on('click','.rating label',function(){
		audioPlay('effect', 'rating');
	})

	$(document).on('click','[data-role=reset]',function(){
		location.reload();
	});

    $('.chatbx-btm input, .chatbx-btm textarea').on('change keyup',function(){
		var $t = $(this),
			$tg = $t.closest('.chatbx'),
			$tg2 = $t.closest('.chatbx-btm');
			
		$tg.find('.effect').removeClass('effect');
		$tg2.find('input, textarea').filter(':visible').each(function(i){
			if($(this).val()){
				$tg2.find('button').removeClass('disabled');
			} else {
				$tg2.find('button').addClass('disabled');
				return false;
			}
		});
	});
})

function targetAddClass(target, name){
	$(target).addClass(name);
}

function removeAddClass(target, name){
	$(target).removeClass(name);
}

// function mouseMotion() {
// 	var pointSize = pointer.width() / 2;
// 	$("#wrap").on('mousemove', function (e) {
// 		pointer.css("top", e.pageY-pointSize);
// 		pointer.css("left", e.pageX-pointSize);
// 		pointer.fadeIn();
			

// 		check_egg_hits_basket(pointer);
		
// 	});
// 	$("#wrap").on("mouseleave", function () {
// 		pointer.fadeOut();
// 	});
// }

// function collision($div1, $div2) {
// 	var x1 = $div1.offset().left;
// 	var y1 = $div1.offset().top;
// 	var h1 = $div1.outerHeight(true);
// 	var w1 = $div1.outerWidth(true);
// 	var b1 = y1 + h1;
// 	var r1 = x1 + w1;
// 	var x2 = $div2.offset().left;
// 	var y2 = $div2.offset().top;
// 	var h2 = $div2.outerHeight(true);
// 	var w2 = $div2.outerWidth(true);
// 	var b2 = y2 + h2;
// 	var r2 = x2 + w2;

// 	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
// 	return true;
// }
var pointer = $('.pointer'),
	card = $('.c');


// function check_egg_hits_basket(pointer) {
// 	if (collision(pointer, card)) {
// 	}
// }

function cardMotion(){
	let positionArr = ['translate(54.5rem, 13.5rem) rotate(51deg)', 'translate(52rem, 9rem) rotate(50deg)', 'translate(50rem, 7rem) rotate(42deg)', 'translate(47rem, 4rem) rotate(38deg)', 'translate(44rem, 1rem) rotate(34deg)', 'translate(40.5rem, -1.5rem) rotate(31deg)', 'translate(37rem, -4rem) rotate(26deg)', 'translate(32.5rem, -6.5rem) rotate(23deg)', 'translate(28.5rem, -8rem) rotate(20deg)', 'translate(25rem, -9rem) rotate(14deg)', 'translate(20.5rem, -10rem) rotate(9deg)', 'translate(16.5rem, -11rem) rotate(6deg)', 'translate(12rem, -11.5rem) rotate(2deg)', 'translate(7.7rem, -12rem) rotate(-2deg)', 'translate(3rem, -12rem) rotate(-5deg)', 'translate(-1.4rem, -12rem) rotate(-8deg)',  'translate(-6rem, -11.3rem) rotate(-15deg)', 'translate(-11.6rem, -10.2rem) rotate(-18deg)', 'translate(-16.9rem, -9.3rem) rotate(-21deg)', 'translate(-21.5rem, -8rem) rotate(-26deg)', 'translate(-26.5rem, -6.5rem) rotate(-30deg)', 'translate(-31rem, -4rem) rotate(-33deg)', 'translate(-35.5rem, -1.5rem) rotate(-38deg)', 'translate(-40rem, 1rem) rotate(-41deg)', 'translate(-44rem, 3.5rem) rotate(-46deg)', 'translate(-48rem, 6.5rem) rotate(-50deg)', 'translate(-51rem, 10rem) rotate(-54deg)', 'translate(-54rem, 14rem) rotate(-58deg)']

	var $tg = $('#tab3').find('.card-wrp').filter(':visible');

	for (let i = 0; i < $tg.children().length; i++) {
		setTimeout(() => { 
			$tg.children('.item').eq(i).nextAll().css('transform', positionArr[i]);
		}, ( i * .5) * 100);
	}

}

function cardShuffle(){
	var $tg = $('#tab3').find('.card-wrp').filter(':visible');

	const numbers = Array(28).fill().map(((item, index) => index + 1));
	const random = [];

	while (numbers.length > 0){
		const num = Math.floor(Math.random() * numbers.length);
		const newArr = numbers.splice(num, 1);
		const value = newArr[0];
		random.push(value);
	}

	$tg.children('.item').each(function(){
		$(this).attr('data-num', random[$(this).index()]);
	})
}