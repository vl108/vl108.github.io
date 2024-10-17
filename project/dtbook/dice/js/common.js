jQuery(function($){
	'use strict';
	// scroll
	$(".content").each(function(){
		var t = $(this);
		t.prepend('<button type="button" class="icon-on-top">최상단으로 가기</button>')
		.mCustomScrollbar({
			theme:"rounded-dark",
			scrollInertia: 0,
			scrollEasing:"linear",
		});
	});
	
	$(".content-vertical").each(function(e){
		var t = $(this),
			targetH = t.innerHeight(),
			tabName = t.parent().attr('id'),
			$targetChild = t.find('div.v-child');
		$targetChild.innerHeight(targetH);
		$(this).mCustomScrollbar({
			theme:"rounded-dark",
			scrollInertia:300,
			snapAmount:targetH,
			mouseWheel:{
				scrollAmount:targetH
			},
			callbacks:{
				onInit: function(){
					$('.v-child:first-child').addClass('active');
				},
				onScrollStart :function(){
					$('.rating-bubble').hide() ;
					$('.rating-check').removeClass('active');
				},
				onScroll:function(){
					var activeIndex = Math.floor(-this.mcs.top / targetH),
						answerObj = $('.bx-btn-answer>li.active');
					if($('.tab').length){
						//console.log($('.tab.active').length);
						answerObj = answerObj.find('li');
					}
					$targetChild.eq(activeIndex).addClass('active').siblings().removeClass('active');
					answerObj.eq(activeIndex).addClass('active').siblings().removeClass('active');
					$targetChild.eq(activeIndex).find('.ani-stop').removeClass('ani-stop');
					$targetChild.eq(activeIndex).siblings().find('.ani').addClass('ani-stop');
				}
			}
		});
	});

	$(".icon-on-top").on('click',function(){
		var t = $(this),
			targetObj =  t.data('target') ;
		$(targetObj).mCustomScrollbar("scrollTo", "top");
	});


	// table
	$('.tb [rowspan]').each(function(){
		var t = $(this),
			p = t.parent(),
			spanCount = Number(p.index())+Number(t.attr('rowspan'))+1;
		// 옆에 있는 애들
		p.nextUntil(':nth-child('+spanCount+')').children(':first-child').addClass('colspan-first');
		// 마지막 애들
		if(!p.nextUntil(':nth-child('+spanCount+')').next().length){
			t.addClass('colspan-last');
		}
	});
	// tab
	$('.tab li:first-child button,.bx-btn-answer li:first-child,.tab-pane:first-child').addClass('active');
	$('.top-bar [data-toggle=tab]').on('shown.bs.tab',function(){
		var t = $(this),
			i = t.parent().index(); 
		$('.top-bar .bx-btn-answer').children().eq(i).addClass('active').siblings().removeClass('active');
		$('.rating-bubble').hide() ;
		$('.rating-check').removeClass('active');
	});
	//tab prev-next
	var tablen = $('ul.tab>li').length;
	if(tablen){
		$('#ct').append('<div class="tab-button"><button type="button" class="swiper-button-prev swiper-button-disabled"></button><button type="button" id="tab-btn-next" class="swiper-button-next"></button></div>');
	}
	$('div.tab-button>button').on('click',function(){
		var o = $('ul.tab .active').parent().next().children();
		if($(this).hasClass('swiper-button-prev')){
			o = $('ul.tab .active').parent().prev().children();
		}
		$(o).tab('show');
	});
	$('.top-bar [data-toggle=tab]').on('shown.bs.tab',function(e){
		$('div.tab-button>button').removeClass('swiper-button-disabled');
		if($(e.target).parent().index()===0){
			$('div.tab-button>.swiper-button-prev').addClass('swiper-button-disabled');
		} else if($(e.target).parent().index()+1===tablen){
			$('div.tab-button>.swiper-button-next').addClass('swiper-button-disabled');
		}
	});
	// tab url
	if(window.location.href.split('#')[1]){
		$('.tab>li>[data-target="#'+window.location.href.split('#')[1]+'"]').click();
	}

	// modal
	$('[data-toggle*=modal-show]').click(function(){
		var t = $(this),
			target = t.data('target');
		$(target).modal('show');
	});
	$('[data-toggle*=modal-hide]').click(function(){
		var t = $(this),
			target = t.closest('.modal');
		$(target).modal('hide');
	});

	/* 문제형 */
	// 이미기 보이기
	$('[data-toggle*=img-change]').click(function(){
		var t = $(this),
			target = t.data('target');
		$(target).toggleClass('active');
	});
	// 단답형
	$('[data-toggle*=short-answer]').click(function(){
		var t = $(this);
		t.toggleClass('active');
	});
	/*
	// 단답형+선택형 추가
	$('[data-toggle=lst-choice-answer]').click(function(){
		var t = $(this);
		if(t.hasClass('active')){
			t.removeClass('active');
			t.next().find('[data-answer]').prop('checked', false);
		} else {
			t.addClass('active');
			t.next().find('[data-answer]').prop('checked',true);
		}
	});
	$('[data-toggle=answer-all]').click(function(){
		var t = $(this),
			o = $(t.data('target'));
		if(t.hasClass('active')){
			o.find('[data-toggle=lst-choice-answer]').removeClass('active');
		} else {
			o.find('[data-toggle=lst-choice-answer]').addClass('active');
		}
	});*/
	$('.lst-choice input').click(function(){
		var t = $(this),
			o = t.closest('.tab-pane').find('[data-toggle=lst-choice-answer]');
		if(t.closest('.tab-pane').find('[data-answer]').length===t.closest('.tab-pane').find('[data-answer]:checked').length){
			o.addClass('active');
		} else {
			o.removeClass('active');
		}
	});

	// 스스로 확인해요 선택형 속성 추가. 
	var categorySelf = false;
	var choiceSelf = ({
		init: function(o) {  
			o.attr('data-cate','self');
			$('body').append('<audio controls data-dtext_index="dtext_cls_audio" class="position-absolute d-none"><source src="images/sound-o.mp3" type="audio/mpeg"></audio>') ;
			return true ;
		}, 
		play : function(o){  
			if(o.find('[data-answer]').length===o.find('[data-answer]:checked').length){
				console.log('true') ;
				var  s_sound  = "images/sound-o.mp3"; 
			} else {
				console.log('false') ;
				var  s_sound  = "images/sound-x.mp3";
			} 
			var audio = $('audio');
			audio.find('source').attr('src', s_sound);
			audio[0].pause();
			audio[0].load();
			audio[0].oncanplaythrough = audio[0].play();
		}
	});
	$('.choice').each(function(){ 
		var cateSelf = $(this).parents('#wrap').find('.icon-self'); 
		if(cateSelf.length) { categorySelf = choiceSelf.init( $(this) ); }
	});
	
	// 선택형
	$('.choice input').click(function(){
		var t = $(this),
			o = t.closest('.choice');
		if(t.attr('type')==='checkbox'){
			if(o.hasClass('active')){
				o.removeClass('active').find('input').prop('checked', false);
			} else if(o.find('[data-answer]').length===o.find('[data-answer]:checked').length){
				o.addClass('active');
			}
		} else {
			if(o.hasClass('active')){
				o.removeClass('active').find('input').prop('checked', false); 
			} else { 
				if (categorySelf) choiceSelf.play(o);
				o.addClass('active'); 
			}
		}
	});

	

	/* 정답 */
	// 단답형+선택형 추가
	$('[data-toggle=lst-choice-answer]').click(function(){
		var t = $(this),
			o = t.closest('.tab-pane').attr('id');
		console.log(o)
		$('.bx-btn-answer [data-target="#'+o+'"]').click();
	});
	// 전체 정답
	$('[data-toggle=answer-all]').click(function(){
		var t = $(this),
			targetObj = $(t.data('target'));
		if(!t.data('target')){
			targetObj = $('#wrap');
		}
		t.toggleClass('active');
		if(t.hasClass('active')){
			targetObj.find('[data-toggle=lst-choice-answer]').addClass('active');
			targetObj.find('input[data-answer]').filter(':visible').prop('checked',true);
			targetObj.find('[data-invisible]').addClass('active');
			targetObj.find('.choice,.choice-yn,[data-toggle*=short-answer],.img-change,.protractor').filter(':visible').addClass('active');
		} else {
			targetObj.find('[data-toggle=lst-choice-answer]').removeClass('active');
			targetObj.find('input').filter(':visible').prop('checked',false);
			targetObj.find('.choice,.choice-yn,[data-toggle*=short-answer],.img-change,.protractor').filter(':visible').removeClass('active');
			targetObj.find('[data-invisible]').removeClass('active');
			t.data({
				'qNum': 0,
				'aNum': 0,
			});
		}
	});
	// 정답에 다 되었는지 실시간 체크
	$('.choice [data-answer],.choice-yn,[data-toggle*=short-answer],[data-toggle*=img-change],[data-toggle=aid-protractor]:not([data-standalone])').click(function(){
		var targetObj = $('#wrap'),
			answerObj = $('.bx-btn-answer>.active');

		if($('.tab').length){
			targetObj = $('#ct>.tab-content>.active');
		}
		if(targetObj.find('.content-vertical').length){
			targetObj = targetObj.find('.v-child.active');
			answerObj = answerObj.find('.active');
		}
		
		if ( $(this).parents('.modal').length ){ 
			targetObj = $(this).parents('.modal') ; 
			answerObj = targetObj.find('.bx-btn-answer'); 
		} 
		var answerBtn = answerObj.find('[data-toggle=answer-all]'); 

		// 조건 : 모든 답이 체크되어야
		var q = targetObj.find('.choice [data-answer],.choice-yn,[data-toggle*=short-answer]:not([data-group]),.active[data-group],.img-change,.protractor, .q-line').filter(':visible'),
			qNum = q.length,
			aNum = q.filter('input[data-answer]:checked').length
			+ q.find('.choice-yn').length+targetObj.find('[data-toggle*=short-answer].active:not([data-group])').length+targetObj.find('[data-group]').length
			+ targetObj.find('.img-change.active').length+targetObj.find('.protractor.active').length
			+ q.filter('.end-line').length;
			answerBtn.data({
				'qNum': qNum,
				'aNum': aNum,
			});
			console.log(qNum,aNum)
		if(qNum===aNum){
			answerBtn.click();
		} else {
			answerBtn.removeClass('active');
		}
	});

	/* 스와이프 */
	var swipeBasic = [], swipeModal = [];

	// 스와이프 슬라이드 형 .slide
	$('.slide .swiper-container').each(function(i){
		var t = $(this);
		var prop = t.find('.swiper-slide').length === 1 ? false : true;
		var type = t.hasClass('swiper-ani-container') ? 'fade' : 'slide';
		var speed = t.hasClass('swiper-ani-container') ? 0 : 300;

		swipeBasic[i] = new Swiper(t,{
			observer: true,
			observeParents:true,
			threshold: 10,
			preventClicks : false,
			preventClicksPropagation : false,
			pagination:{
				el:t.find('.swiper-pagination'),
				clickable:true,
			},
			navigation:{
				nextEl:t.parent().find('.swiper-button-next'),
				prevEl:t.parent().find('.swiper-button-prev'),
			},
			on:{
				init:function(){
					setTimeout(function(){
						t.find('.swiper-slide').each(function(i){
							t.find('.swiper-pagination-bullet').eq(i).html('<img data-dtext_index="dtext_cls_image" src="'+$(this).find('img').attr('src')+'" alt="" />');
						});
					},500);
				},
				slideChange: function(){
					var inlineMove = $('.inline-movie');
					if(inlineMove.length){
						inlineMove.each(function(){
							$(this).removeClass('active');
							$(this).find('video')[0].pause();
							$(this).find('video')[0].load();
						});
					}
				}
			},
			simulateTouch : prop,
			allowTouchMove : prop,
			effect: type,
			speed: speed,
		});
	});

	// 스와이프 모달 형 .slide-pn-dot
	$('.slide-pn-dot .swiper-container').each(function(i){
		var t = $(this);
		var prop = t.find('.swiper-slide').length === 1 ? false : true;
		var type = t.hasClass('swiper-ani-container') ? 'fade' : 'slide';
		var speed = t.hasClass('swiper-ani-container') ? 0 : 300;

		swipeModal[i] = new Swiper(t,{
			observer: true,
			observeParents:true,
			pagination:{
				el:t.find('.swiper-pagination'),
				clickable:true,
			},
			navigation:{
				nextEl:t.parent().find('.swiper-button-next'),
				prevEl:t.parent().find('.swiper-button-prev'),
			},
			threshold: 10,
			preventClicks : false,
			preventClicksPropagation : false,
			simulateTouch : prop,
			allowTouchMove : prop,
			effect: type,
			speed: speed,
		});
	});

	$('.btn-modal-swipe').click(function(){
		var $t = $(this),
			$target = $($t.parent().data('target')),
			swipeIndex = $t.parent().data('parent'),
			index = $t.index();
		swipeModal[swipeIndex].slideTo(index);
		$target.modal('show');
	});

	$('.swiper-ani-restart').click(function(){
		var target = $('.swiper-slide-active');
		target.removeClass('swiper-slide-active');
		target.width();
		target.addClass('swiper-slide-active');
	});

	//button
	$('.btn-active-reset').click(function(){
		$('.active').removeClass('active');
	});

	$('[data-toggle]').click(function(){
		$($(this).data('toggle')).toggleClass('active');
	});

	$('.btn-ani-restart').click(function(){
		var target = $('.animated');
		target.addClass('ani-stop');
		target.width();
		target.removeClass('ani-stop');
	});

	$('.modal').on('hidden.bs.modal', function (e) {
		$(e.target).find('.short-answer').removeClass('active');
		$(e.target).find('.btn-answer').removeClass('active');
	});
	
	// 문제로 닫기 눌렀을 경우 정답 감춤(객관식)
	$('.top-bar [data-toggle=tab]').click(function(){
		$('.type-choice.active').removeClass('active');
		$('.lst-choice').removeClass('active').find('input').prop('checked', false);
		$('.lst-choice+.short-answer').removeClass('active');
	});

	// 평가하기
	var $rWrp = $('.rating-check'),
		$rating =  $('.rating-check button');
	$('<div class="rating-bubble"><div class="inner-rating-bubble"><div><i class="rating-01"></i></div><div><i class="rating-02"></i></div><div><i class="rating-03"></i></div></div></div>').appendTo($rWrp);

	$rating.click(function(){
		var $t = $(this);
		$rWrp.removeClass('active');
		$('.rating-bubble').hide();
		$t.parent().addClass('active').find('.rating-bubble').show();

	});
	
	$('.inner-rating-bubble div').click(function(e){
		var $t = $(this),
			$checktext = $t.html();
		
		$t.closest($rWrp).removeClass('active').find('p').html($checktext);
		console.log($t.closest($rWrp), $checktext);
	});

	if($('.video-js').length){
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
				//this.player_.posterImage.show();
				this.player_.hasStarted(false);
			}
		});
		videojs.registerComponent('stopButton', stopButton);

		// 토글버튼
		var ControlToggle  = videojs.extend(Button, {
			constructor: function() {
				Button.apply(this, arguments);
				this.controlText('숨기기');
				this.addClass('vjs-toggle-control');
				this.showing = false;
			},
			handleClick: function() {
				this.player_.toggleClass('vjs-toggle-inactive');
				(!this.showing) ? this.controlText('펼치기') : this.controlText('숨기기');
				this.showing = !this.showing;
			}
		});
		videojs.registerComponent('controlToggle', ControlToggle);

		videojs(document.querySelector('.video-js'),{
			controls: true,
			width: 1234,
			height: 694,
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
		            'fullscreenToggle',
					'controlToggle',
					'remainingTimeDisplay'
		        ]
			}
		});
	}
});
