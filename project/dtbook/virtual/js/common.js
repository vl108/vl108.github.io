var efAudio = function(media) {
	this.effects = [
		'correct',
		'wrong',
		'fireworks',
		'again',
		'clap',
	];
	this.create();
};

function audioPause(ele){
    ele.pause();
    if (!isNaN(ele.duration)) {
        ele.currentTime = 0;
    }
}

function interSoundStop(){
	if($('.is-sound').length){
		$('.btn-auto-audio').removeClass('hide re');
        $($('.btn-auto-audio').data('target')).find('.show').removeClass('show');
	}
}

function audioStop(prop){
	interSoundStop();

	$('audio').each(function(){
		audioPause($(this)[0]);
	});

	var videos = Array.prototype.slice.call(document.getElementsByTagName("video"));
	videos.forEach(function(video){
		video.pause();
	});
}

efAudio.prototype.create = function() {
	var effectLen = this.effects.length;
	var i = 0;
	var audio = null;
	var src = 'media/effects/';
	var file;

	var audioWrap = document.createElement('div');
	audioWrap.className = 'effect-audio-wrap';
	audioWrap.setAttribute('style', 'display: none');

	for (i = 0; i < effectLen; i++) {
		audio = document.createElement('audio');
		audio.id = 'effect-audio-' + this.effects[i];
		audio.className = 'effect-audio';
		file = this.effects[i];

		audio.preload = 'auto';
		//audio.autoplay = true;
		audio.src = src + file + '.mp3';
		audioWrap.appendChild(audio);
	}

	$('body').append(audioWrap);
};

efAudio.prototype.play = function(type) {
	var audio = null;
	audio = document.getElementById('effect-audio-' + type);
	if (!audio) {
		return;
	}

	audioStop();
	setTimeout(function() {
		audio.play();
	}, 100);
};

var effectAudio = new efAudio();

function toggleAudioPlay(target, t){
    var audio = document.getElementById(target);

	interSoundStop();

    $('audio').not('#'+target).each(function(){
		audioPause($(this)[0]);
	});

    if(t.dataset.toggle === 'layer' && $(t.dataset.target).is(':visible')){
        audioPause(audio);
        return false;
    }

    audio.paused ? audio.play() : audioPause(audio);
}

$(function(){
	"use strict";

	$('#wrap').append('<div id="answerMsg" class="text-hide" data-hide="#answerMsg">문제를 풀어주세요.</div>');

	//텍스트
	$('.only-num').keyup(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});

	$('.not-hangul').keyup(function(){
		$(this).val($(this).val().replace(/[^a-zA-Z0-9]/gi,""));
	});

	//버튼
	$(document).on('click', '[data-class]', function(){
		$(this.dataset.class.split(',')[0]).toggleClass(this.dataset.class.split(',')[1]);
	})

	$(document).on('click', '[data-self-class]', function(){
		$(this).toggleClass(this.dataset.selfClass);
	});

	$('[data-toggle="toggle"]').click(function(){
		$(this.dataset.target).toggle();
	})

	$('[data-remove-class]').click(function(){
		var target = this.dataset.removeClass.split(',')[0];
		var removeName = this.dataset.removeClass.split(',')[1];
		if(target.indexOf('@') !== -1){
			var targetArr = target.split('@');
			targetArr.forEach(function(ele){
				$(ele).removeClass(removeName);
			});
		}else{
			$(target).removeClass(removeName);
		}
	});

	$('.self-button input').change(function(){
		if(this.checked){
			$('[name="'+this.name+'"]').not(this).prop('checked', false);
		}
	});

	$('.btn-next').click(function(){
		var $t = $(this);
		var num = $t.closest('.tab-pane').index()+1;

		$t.closest('.tab-pane').removeClass('active');
		$t.next('.bubble-alert').stop().fadeOut(200);

		if(num === $t.closest('.tab-pane').siblings().length+1){
			num = 0;

			$t.closest('.tab-content').find('[data-toggle="answer-refresh"]').each(function(){
				$(this).trigger('click');
			});
		}

		var target = $t.closest('.tab-content').find('.tab-pane').eq(num);

		target.addClass('active');
		$t.closest('.modal').find('.nav-test').children().removeClass('active').eq(num).addClass('active');

		if(target.find('.q-line').length && !target.find('[id^=canvasqLine]').length){
			qLine(target.find('.q-line').attr('id'));
		}
	});

	document.querySelectorAll('[data-audio]').forEach(function(ele){
		ele.onclick = function(){
			toggleAudioPlay(ele.dataset.audio, ele);
		};
	});

	$('body').on('click', '[data-hide]', function(){
		$(this.dataset.hide).hide();
	});

	$('.speech-toggle button').click(function(){
		if(!$(this).data('audio')){
			var target = $(this).closest('.speech-toggle').find('[data-audio]').data('audio');
			audioPause(document.getElementById(target));
			$(this).parent('.speech').hide().siblings().show();
		}else{
			$(this).hide().siblings().show();
		}
	});

	$('[data-toggle="tab"]').click(function  (e) {
		e.preventDefault();

		var t = $(this),
			target = t.attr('data-target');

		$(target).addClass('active').siblings('.tab-pane').removeClass('active');
		t.addClass('active').siblings('[data-toggle="tab"]').removeClass('active');

		$(target).siblings().each(function(){
			$(this).find('.icon-hand.off, [data-remove-class]').trigger('click');
		});

		if($(target).find('.q-line').length && !$(target).find('[id^=canvasqLine]').length){
			qLine($(target).find('.q-line').attr('id'));
		}
	});

	$('[data-change-page]').click(function(){
		$(this).closest('.modal').find('.change-page').text(this.dataset.changePage);
	});

	// layer
	$(document).on('click', '[data-toggle=layer]', function(){
		var btn = $(this),
			o = btn.attr('data-target'),
			oParent = $(o).closest('.layer-wrp'),
			chkTarget = btn.attr('data-chk') ? $(btn.attr('data-chk')) : oParent;

		// 값 없으면 리턴
		var isAnswer = false;

		if (o.substring(1,10)!='layerSelf' && !btn.hasClass('check-none')) {
			var inputLength = chkTarget.find('input').length,
				textLength = chkTarget.find('textarea').length;
			if(textLength && inputLength){
				var num = textLength + inputLength, dataNum = 0;
				chkTarget.find('textarea').each(function(){
					if($(this).val().replace(/\s|　/gi, '')!==''){
						dataNum++
					}
				});
				chkTarget.find('input').each(function(){
					if($(this).val().replace(/\s|　/gi, '')){
						dataNum++
					}
				});
				if (dataNum == num) isAnswer = true;
				if(!isAnswer){
				   oParent.removeClass('open');
					showMsg('#answerMsg');
				   return false;
				}
			} else if(o.substring(1)!='layerSelf' && inputLength){
				var num = inputLength, dataNum = 0;
				chkTarget.find('input').each(function(){
					if($(this).val().replace(/\s|　/gi, '')){
						dataNum++
					}
				});
				if (dataNum == num) isAnswer = true;
				if(!isAnswer){
				   oParent.removeClass('open');
					showMsg('#answerMsg');
				   return false;
				}
			} else if (textLength) {
				var num = textLength, dataNum = 0;
				chkTarget.find('textarea').each(function(){
					if($(this).val().replace(/\s|　/gi, '')!==''){
						dataNum++
					}
				});
				if (dataNum == num) isAnswer = true;
				if(!isAnswer){
				   oParent.removeClass('open');
					showMsg('#answerMsg');
				   return false;
				}

			}
		}

		if(btn.data('layer-accordion')){
			$('.layer[data-toggle="layerClse"]').not(o).hide();
			$('.layer .icon-layer-clse').parent().not(o).hide();
			$('.layer-wrp').not(oParent).removeClass('open').find('.icon-hand').removeClass('off');
		}

		btn.hasClass('icon-hand') && btn.toggleClass('off');

		$(o).toggle();
		oParent.toggleClass('open');

		!btn.data('audio') && audioStop();

		//$unitGoal.length && unitGoalClose(o);

		return false;
	});

	$('body').on('click','[data-toggle=layerClse]',function(event){
		var t = $(this);

		if(t.hasClass('icon-layer-clse')){
			audioStop();
			t.parent().hide().closest('.layer-wrp').removeClass('open');
			$('.icon-hand[data-target="#'+t.parent().attr('id')+'"]').removeClass('off');
			return false;
		}

		if($(event.target).is('a,a *,button,input,textarea,label,[role=button],label *, .event-disabled, .event-disabled *')){
			return;
		}

		this.children[0].onclick == null && audioStop();

		event.stopPropagation();

		t.hide().closest('.layer-wrp').removeClass('open');
		$('.icon-hand[data-target="#'+t.attr('id')+'"]').removeClass('off');
	});

	$('[id^=drawHelper] .close').click(function(){
		$(this).parent().hide().closest('.layer-wrp').removeClass('open').find('[data-toggle=layer]').removeClass('on');
	});

	// modal
	if($('.q-line').length){
		$('.q-line').each(function(){
			!$(this).closest('.modal').length && !$(this).closest('.layer-body').length && qLine(this.id);
		});
	}


	$('[data-toggle=modal]').click(function(){
		var $btn = $(this);
		var target = $($btn.attr('data-target'));
		var expContent = target.find('.exp-content');
		audioStop();

		$('body').addClass('is-modal');

		if($btn.data('exp')){
			expContent.children().removeClass('active').eq($btn.data('exp')-1).addClass('active');
		}

		if($btn.hasClass('icon-enlarge') && this.dataset.slide){
			swiper[target.find('.swiper-container').index('.slider-wrap:not(.evlt-slider-wrap) .swiper-container')].slideTo(this.dataset.slide);
		}

		if(expContent.length){
			$('.exp-content .nav-circle').each(function(i){
				$(this).children().removeClass('active').eq(0).addClass('active');
				$(this).children().eq(0).data('change-page') && target.find('.change-page').text($(this).children().eq(0).data('change-page'));
			});
			$('.exp-content .tab-content').each(function(){
				$(this).children().removeClass('active').eq(0).addClass('active');
			});
		}

		if($btn.parent().hasClass('answer-btn-wrong')){
			$btn.next('.bubble-alert').stop().fadeOut(200);
		}

		target.show(0, function  () {
			$(target).addClass('modal-open');
			var qline = target.find('.q-line');
			if(qline.length){
				qline.each(function(){
					$(this.dataset.target).is(':visible') && !$(this.dataset.target).find('[id^=canvasqLine]').length && qLine(this.id);
				});
			}
		});

		return false;
	});

	$('[data-dismiss=modal]').click(function(){
		var $modal = $(this).closest('.modal');
		var time = $(this).data('time')*1 || 400;

		if($modal.hasClass('modal-alert')){
			$modal.stop().fadeOut(200);
			return;
		}

		audioStop();
		$modal.removeClass('modal-open');
		$('body').removeClass('is-modal');

		setTimeout(function(){
			$modal.hide().find('video.playing').removeClass('playing');
			$modal.find('video').length && audioPause($modal.find('video')[0]);
			$('.dim').remove();
		},time);

		if($modal.hasClass('modal-answer-video') || $modal.hasClass('modal-answer')){
			var wrongAnswer = $('[data-target="#'+$modal.attr('id')+'"]').parent();

			wrongAnswer.addClass('hide').next().removeClass('hide');
			showMsg(wrongAnswer.next().find('.bubble-alert'), 3000, true);
		}

		return false;
	});


	$('button.btn-narr').click(function(){
		var $modal = $(this).closest('.modal');
		$(this).toggleClass('close');
		$modal.find('.video-js').toggleClass('is-caption');

        if( $(this).text() == '자막 보기'){
            $(this).text('자막 닫기');
			$modal.find('.vjs-caption-control').attr('title', '자막 닫기');
        } else {
            $(this).text('자막 보기');
			$modal.find('.vjs-caption-control').attr('title', '자막 보기');
        }
    });

	// 정답확인
	$('[data-toggle=answer]').click(function(){
		var t = $(this),
			o = $(t.attr('data-target'));
		// 값 없으면 리턴
		var isAnswer = o.find('textarea, input:not([type="color"])').length === 0;
		var modal = this.dataset.modal;

		if(this.dataset.ex){
			var $func = new EX();
			isAnswer = $func[this.dataset.ex](this);
		} else if(t.attr('data-multi')){
			var prop1 = o.find('input[type=text]').length ? false : true,  prop2 = true;
			var num = o.find('input[type=text]').length, dataNum = 0;
			o.find('input[type=text]').each(function(){
				if($(this).val().replace(/\s|　/gi, '')){
					dataNum++
				}
				if (dataNum == num) prop1 = true;
			});

			o.find('.q-label-wrp').each(function(){
				if(!$(this).find('.q-label-wrp input[type=radio]').is(':checked')){
					prop2 = false;
					return false;
				}
			});
			if(!prop1 || !prop2){
				if(t.parent().hasClass('btn-chk-wrap')){
					showMsg(t.next('.bubble-alert'));
				}else{
					showMsg('#answerMsg');
				}
				return false;
			}
			isAnswer = true;
		}else if(o.find('textarea:not(.none), input[type="text"]:not(.none)').length){
			var num = o.find('textarea:not(.none), input[type="text"]:not(.none)').length, dataNum = 0;

			o.find('textarea:not(.none), input[type="text"]:not(.none)').each(function(){
				if($(this).val().replace(/\s|　/gi, '')!==''){
					dataNum++
				}
				if (dataNum == num) isAnswer = true;
			});
		}else if (o.find('input[type="radio"]').length || o.find('input[type="checkbox"]').length) {
			var num = o.find('input').length, dataNum = 0;
			if(o.find('.q-label-wrp').length){
				o.find('.q-label-wrp').each(function(){
					if(!$(this).find('.q-label-wrp input[type=radio]').is(':checked')){
						isAnswer = false;
						return false;
					}else{
						isAnswer = true;
					}
				});
			}else{
				isAnswer = false;
				o.find('input').each(function  () {
					if ($(this).is(':checked')) {
						isAnswer = true;
						return false;
					}
				});
			}

			if(o.find('input[type="checkbox"]').length){
				o.find('input[type="checkbox"]').each(function(){
					console.log(this.checked);
					if(this.checked){
						isAnswer = true;
						return false;
					}
				});
			}
		}

		if(!isAnswer){
			o.removeClass('answered');

			if(t.parent().hasClass('btn-chk-wrap')){
				showMsg(t.next('.bubble-alert'));
			}else{
				showMsg('#answerMsg');
			}

			return false;
		}

		t.hasClass('chk-data-button') && t.toggleClass('a-checked');

		o.toggleClass('answered');

		if(modal){
			$(modal).show(0, function  () {
			});
		}

		if(o.attr('data-qtype')==='radio' || o.attr('data-qtype')==='check'){
			o.find('input[data-answer]').toggleClass('answer-chk');
		}

		return false;
	});

	//되돌리기
	$('[data-toggle=answer-refresh]').click(function(e){
		var t = $(this),
			target= $(t.attr('data-target')),
			chkAnswer = target.find('.a-checked');

		e.stopPropagation();

		if(chkAnswer.attr('data-chance') && target.hasClass('answered')){
			target.removeData('chance');
		}

		chkAnswer.removeClass('a-checked');
		$('.answer-chk').removeClass('answer-chk');


		target.removeClass('answered open answer-o answer-x').find('.answered').removeClass('answered open answer-o answer-x');
		target.find('.drop-refresh').length && !$(this).hasClass('drop-refresh') && $('.drop-refresh').click();
		target.find('.refresh-line').length && !$(this).hasClass('refresh-line') && $('.refresh-line').click();
		target.find('.layer-wrp.open').removeClass('open').find('.layer').hide();

		// 사용자 입력데이터 삭제
		target.find('input,textarea,select.form-control').each(function(i){
			var t = $(this);
			t.prop('checked',false);
			t.filter('[type=text],textarea,select.form-control').val('');
		});

		if(target.find('.layer-draw').length){
			target.find('.layer-draw .icon-del').trigger('click');
		}

		return false;
	});

	// 테스트페이지 전체 정답확인
	$('[data-toggle=answer-all]').click(function(){
		var qI,
			all = $($(this).attr('data-target')),
			allObjCheck = all.find('[data-toggle=answer-final],[data-toggle=answer],[data-toggle=answer-line]'),
			allObj = allObjCheck.filter(function(i,ele){
				return !$(ele).hasClass('a-checked');
			}),
			t = $(this);

		if(t.hasClass('a-checked')){
			t.removeClass('a-checked');
			allObjCheck.filter('.a-checked').click().removeClass('a-checked');
		}else{
			var isNotAnswer = false;

			allObj.each(function(){
				$(this).trigger('click');
				if(!$(this).hasClass('a-checked')){
					isNotAnswer = true;
					return false;
				}
			});

			if(isNotAnswer){
				allObj.filter('.a-checked').trigger('click');
			}else{
				t.addClass('a-checked');
			}
		}
	});

	// 마무리 문제
	// 데이터 전송 준비
	var assessmentItem = $('assessmentItem'),
		namePrev='';

	$('[data-toggle=answer-final]').click(function(e){
		var t = $(this),
			o = $(t.attr('data-target')),
			qType = o.attr('data-qtype'),
			chance = t.attr('data-chance')*1,
			isTestType = t.closest('.modal-test').length || t.closest('.modal-test-blue').length;

		var noAnswerPop = function(){
			if(t.parent().hasClass('btn-chk-wrap')){
				showMsg(t.next('.bubble-alert'));
			}else{
				showMsg('#answerMsg');
			}
		}

		e.stopPropagation();

		// 값 없으면 리턴
		var isAnswer = false;
		var modal = this.dataset.modal;

		if(this.dataset.ex){
			var $func = new EX();
			isAnswer = $func[this.dataset.ex](this);
		} else if(t.attr('data-multi')){
			var prop1 = o.find('input[type=text]').length ? false : true,  prop2 = false;
			var num = o.find('input[type=text]').length, dataNum = 0;
			o.find('input[type=text]').each(function(){
				if($(this).val().replace(/\s|　/gi, '')){
					dataNum++
				}
				if (dataNum == num) prop1 = true;
			});

			o.find('.q-label-wrp').each(function(){
				if(!$(this).find('.q-label-wrp input[type=radio]').is(':checked')){
					prop2 = false;
					return false;
				}else{
					prop2 = true;
				}
			});
			if(!prop1 || !prop2){
				noAnswerPop();
				return false;
			}
			isAnswer = true;
		} else if(qType==='radio' || qType==='checkbox'){
			var dataNum = 0;

			if(!o.find('input:checked').length){
				noAnswerPop();
				return false;
			}

			if(o.find('.q-label-wrp').length){
				o.find('.q-label-wrp').each(function(){
					if(!$(this).find('.q-label-wrp input[type=radio]').is(':checked')){
						isAnswer = false;
						return false;
					}else{
						isAnswer = true;
					}
				});
			}else{
				isAnswer = true;
			}
		} else if(o.find('select.form-control').length){
			isAnswer = true;
			o.find('.form-control').each(function(){
				if(!this.value.replace(/\s|　/gi, '')){
					isAnswer = false
					return false;
				}
			});
		} else if(o.find('textarea').length || o.find('input[type="text"]').length){
			var target = o.find('textarea, input:not(.donot)');
			var num = target.length, dataNum = 0;
			target.each(function(){
				if($(this).val().replace(/\s|　/gi, '')!==''){
					dataNum++
				}
				if (dataNum == num) isAnswer = true;
			});
		}

		if(!isAnswer){
			t.removeClass('a-checked');
			o.removeClass('answered answer-x answer-o');
			noAnswerPop();
			return false;
		}

		if(o.hasClass('answered')){
			t.removeClass('a-checked');
			o.removeClass('answered answer-o answer-x').find('.answer-chk').removeClass('answer-chk');

			chance && o.data('chance', chance);

			return;
		}

		var isCorrect = false,
			answer = o.find('correctResponse').text().replace(/[\n\t\r]/g,'');

		if(!answer){
			o.addClass('no-answered');
			answer = o.find('modalFeedback').text().replace(/[\n\t\r]/g,'');
		}

		// 답 확인 부분
		if(qType==='radio'){
			// radio
			o.find('input[data-answer]').addClass('answer-chk');
			var num = o.find('input[data-answer]').length;
			if(o.find('input[data-answer]:checked').length===num){
				isCorrect = true;
			}
		}else if(qType==='checkbox'){
			// checkbox
			o.find('input[data-answer]').addClass('answer-chk');
			var c = o.find('input[data-answer]').length;

			if(c>0 && o.find('input[data-answer]:checked').length===c && o.find('input:checked').length===c){
				isCorrect = true;
			}
		}else if(qType==='random'){
			isCorrect = false;
			var totalAnswer = [];
			var totalAnswerWrap = [];
			o.find('.input-random').each(function(){
				$(this).attr('data-answer').split('@@').forEach((item, i) => {
					totalAnswer.push(item.split(','));
				});

				totalAnswerWrap.push(totalAnswer);
				totalAnswer = [];
			});

			o.find('.form-control').each(function(index, ele){
				var idx = $(this).closest('.input-random').index('#'+o.attr('id')+' .input-random');
				for (var i = 0; i < totalAnswerWrap[idx].length; i++) {
					if($.inArray($(ele).val().replace(/\s|　/gi, ''),totalAnswerWrap[idx][i]) !== -1){
						isCorrect = true;
						totalAnswerWrap[idx][i] = [];
						break;
					}else{
						isCorrect = false;
					}
				}

				if(!isCorrect){
					return false;
				}
			});
		}else if(qType==='multipleBlank' || qType==='text'){
			// multipletext
			isCorrect = true;

			var target = o.find('.form-control:not(.donot)').length ? o.find('.form-control:not(.donot)') : o.find('input.sr-only:not(.donot)');

			target.each(function(){
				var tV = $.trim($(this).val().replace(/\s|　/gi, '')),
					dA = $(this).attr('data-answer') || $(this).parent().attr('data-answer') || o.attr('data-answer'),
					dArray = dA.indexOf('@@') > -1 && dA.split('@@');

				if($(this).hasClass('sr-only') && tV.indexOf(',') !== -1){
					 var tV = tV.split(',').sort().toString();
				}else if($(this).data('chars')){
					var specialChars= $(this).data('chars');
					var chars = $(this).data('chars');

					for (var i = 0; i < tV.length; i++) {
						for (var j = 0; j < specialChars.length; j++) {
							if (tV.charAt(i) == specialChars.charAt(j)) tV = tV.replace(tV.charAt(i), "");
						}
					}
				}

				if(dArray[1] && $.inArray(tV,dArray) === -1){
					isCorrect = false;
					return false;
				}else if(!dArray && tV!==dA.replace(/\s|　/gi, '')){
					isCorrect = false;
					return false;
				}
			});

			if(isCorrect && t.attr('data-multi')){
				var num = o.find('input[data-answer]').length;
				isCorrect = o.find('input[data-answer]:checked').length===num ? true : false;
			}
		}else if(qType==='etc' && chance!==2){
			isCorrect = true;
		}

		if(chance){
			o.data('chance') === undefined && o.data('chance', chance);

			if(!isCorrect && o.data('chance')){

				if(o.data('chance') ===  1 && chance === 2){
					o.find('[data-answer="hint"]').length ? showMsg('#answerMsgHint') : showMsg('#answerMsgOnemore');
					o.find('[data-answer="hint"]').show();
				}else{
					showMsg('#answerMsgOnemore');
				}

				o.data('chance', o.data('chance')-1);
				effectAudio.play('again');

				o.removeClass('answered open answer-o answer-x').find('.answered').removeClass('answered open answer-o answer-x');

				// 사용자 입력데이터 삭제
				o.find('input,textarea,select.form-control').each(function(i){
					var t = $(this);
					t.prop('checked',false);
					t.filter('[type=text],textarea,select.form-control').val('');
				});

				if(o.find('.drag-item').length){
					o.find('.drop-item').droppable('option', 'disabled', false).children().remove();
					o.find('.drag-item').draggable('option', 'disabled', false).data('chance', 0);
				}

				if(o.find('.layer-draw').length){
					target.find('.layer-draw .icon-del').trigger('click');
				}

				return false;
			}
		}

		if(isCorrect || o.data('chance') === 0){
			var answerTargetName;
			o.find('[data-answer="hint"]').hide();

			if(qType === 'etc'){
				showMsg('#answerExMsgCheck');
			}else if(!isCorrect){
				showMsg('#answerMsgCheck');
				answerTargetName = '.answer-btn-wrong';
			}else{
				showMsg('#answerMsgGood');
				effectAudio.play('correct');
				answerTargetName = '.answer-btn';
			}

			if(isTestType){
				o.find('[class^=answer-btn]').addClass('hide');

				!o.find(answerTargetName).length && (answerTargetName = '.answer-btn');

				o.find(answerTargetName).removeClass('hide');
				showMsg(o.find(answerTargetName).find('.bubble-alert'), 3000, true);
			}else{
				showMsg(o.find('.answer-btn').find('.bubble-alert'), 3000, true);
			}

			if(modal){
				$(modal).show(0, function  () {
					$(modal).addClass('modal-open');
				});
			}
		}

		t.addClass('a-checked');
		o.addClass('answered');

		isCorrect ? o.addClass('answer-o') : o.addClass('answer-x');

		// 데이터 전송
		var $itemObject = o.find('assessmentItem'),
			userVal=[],
			userDesc = $('h1:first').text(),
			userNum = $itemObject.find('.question .num').text();

		if(!$itemObject.length) return false;

		if($itemObject.closest('.modal').hasClass('modal-exp')){
			userDesc = $itemObject.closest('.modal').find('.modal-exp-header>.font-coo').text();
			userNum = $itemObject.find('.question>.font-coo').text();
		}else if($itemObject.closest('.modal').length){
			userDesc = $itemObject.closest('.modal').find('h2').text();
		}

		o.find('input,textarea,select.form-control').each(function(i){
			var t = $(this);
			if(t.is('[type=text]') || t.is('textarea') || t.is('select.form-control')){
				userVal.push(t.val());
			} else if(t.is(':checked')){
				userVal.push(t.val());
			}
		});

		DTCaliperSensor.fire({
			correct: isCorrect,
			itemObject: $itemObject[0],
			value: o.find('correctResponse .sr-only').text().replace(/[\n\t\r]/g,''),
			userValue: userVal.join(','),
			description: userDesc+' '+userNum,
			pageNumber: $('#num b').text()
		});

		return false;
	});

	// input
	$('input').on('keyup change',function(){
		var t = $(this),
			v = t.val(),
			m = t.attr('maxlength');
		if(v.length > m){
            t.val(v.substring(0,m));
        }
	});

	// img drag
	$('img').on('dragstart', function(event) { event.preventDefault(); });

	// 평가하기
	$('<div class="rating-bubble"><i class="icon-rating-01" role="button"></i><i class="icon-rating-02" role="button"></i><i class="icon-rating-03" role="button"></i></div>').appendTo($('.rating-check'));

	$('.rating-check>button').click(function(){
		var $t = $(this);
		$('.rating-check').not($t.parent()).removeClass('active');
		$t.parent().toggleClass('active');
	});

	$(document).on('click', '.rating-bubble>[role=button]', function(){
		var $t = $(this);
		$t.closest('.rating-check').removeClass('active').find('input').prop('checked', false).eq($(this).index()).prop('checked', true);
	});
});

/*
 * jQuery UA plugin
 *
 * based on jquery.browser.addEnvClass.js
 * https://gist.github.com/373298
 */

(function ($) {

    $.ua = {
        platform: {},
        browser: {},
        engine: {}
    };

    var ua = navigator.userAgent,
        uaPlatform = $.ua.platform,
        uaBrowser = $.ua.browser,
        uaEngine = $.ua.engine;

    // detect platform
    if (/Windows/.test(ua)) {
        uaPlatform.name = 'win';
        uaPlatform.win = true;
    } else if (/Mac/.test(ua)) {
        uaPlatform.name = 'mac';
        uaPlatform.mac = true;
    } else if (/Linux/.test(ua)) {
        uaPlatform.name = 'linux';
        uaPlatform.linux = true;
    } else if (/iPhone|iPod/.test(ua)) {
        uaPlatform.name = 'iphone';
        uaPlatform.iphone = true;
    } else if (/iPad/.test(ua)) {
        uaPlatform.name = 'ipad';
        uaPlatform.ipad = true;
    } else if (/Android/.test(ua)) {
        uaPlatform.name = 'android';
        uaPlatform.android = true;
    } else {
        uaPlatform.name = 'unknown-platform';
        uaPlatform.unknown = true;
    }

    // detect browser
    if (/MSIE/.test(ua)) {
        uaBrowser.name = 'msie';
        uaBrowser.msie = true;
    } else if (/Firefox/.test(ua)) {
        uaBrowser.name = 'firefox';
        uaBrowser.firefox = true;
    } else if (/Safari/.test(ua)) {
        uaBrowser.name = 'safari';
        uaBrowser.safari = true;
    } else if (/Opera/.test(ua)) {
        uaBrowser.name = 'opera';
        uaBrowser.opera = true;
    } else {
        uaBrowser.name = 'unknown-browser';
        uaBrowser.unknown = true;
    }

    // chrome override
    if (/Chrome/.test(ua)) {
        uaBrowser.name = 'chrome';
        uaBrowser.chrome = true;
        uaBrowser.safari = false;
    }

    // detect browser version
    if (uaBrowser.msie) {
        uaBrowser.version = /MSIE (\d+(\.\d+)*)/.exec(ua)[1];
    } else if (uaBrowser.firefox) {
        uaBrowser.version = /Firefox\/(\d+(\.\d+)*)/.exec(ua)[1];
    } else if (uaBrowser.opera) {
        uaBrowser.version = /Version\/? ?(\d+(\.\d+)*)/.exec(ua)[1];
    } else if (uaBrowser.safari) {
        uaBrowser.version = /Version\/(\d+(\.\d+)*)/.exec(ua)[1];
    } else if (uaBrowser.chrome) {
        uaBrowser.version = /Chrome\/(\d+(\.\d+)*)/.exec(ua)[1];
    } else {
        uaBrowser.version = 0;
    }

    // detect engine
    if (/Trident/.test(ua) || uaBrowser.msie) {
        uaEngine.name = 'trident';
        uaEngine.trident = true;
    } else if (/Gecko/.test(ua)) {
        uaEngine.name = 'gecko';
        uaEngine.gecko = true;
    } else if (/Presto/.test(ua)) {
        uaEngine.name = 'presto';
        uaEngine.presto = true;
    } else {
        uaEngine.name = 'unknown-engine';
        uaEngine.unknown = true;
    }

    // override WebKit
    if (/WebKit/.test(ua)) {
        uaEngine.name = 'webkit';
        uaEngine.gecko = false;
        uaEngine.webkit = true;
    }


    // add classes to html element
    $('#wrap').addClass([
        uaPlatform.name,
        uaBrowser.name,
        uaBrowser.name + parseInt(uaBrowser.version, 10)
    ].join(' '));

});

var showMsg = function (target, time, prop){
	var delay = time || 1500;
	$(target).stop(true, true).fadeIn(200);

	!prop && $(target).delay(delay).fadeOut(200);
}
