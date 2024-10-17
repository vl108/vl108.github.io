// start
$('#index').prepend('<div class="index-scroll">SCROLL<div class="wheel"><i></i></div></div>');

// 블록랩 사이즈 
function blockWrap(){
	if(!$('#wrap').hasClass('user-mode') && $(window).width()>991){
		$('.block-wrap').each(function(){
			if($(this).children('.grid-stack-item').length){
				$(this).width($(this).children('.grid-stack-item:last-child').position().left+$(this).children('.grid-stack-item:last-child').width()+10);
			}
		});
	} else {
		$('.block-wrap').width('100%');
	}
}
$(window).resize(function(){
	blockWrap();
}).trigger('resize');

// scroll
var swipeIndexScroll = new Swiper("#index", {
	direction: "horizontal",
	slidesPerView: "auto",
	freeMode: true,
	mousewheel: {
		sensitivity:3,
	}
});

// slider
var swipeIndex = new Swiper('.index-swiper .swiper-container',{
	direction:"vertical",
	slidesPerView:3,
	centeredSlides:true,
	loop:true,
	autoplay:{
		delay:3000
	},
	navigation:{
		nextEl:'.index-swiper .swiper-button-next',
		prevEl:'.index-swiper .swiper-button-prev',
	},
	on:{
		init:function(){
			$('.index-swiper .icon-autoplay').click(function(){
				var t = $(this),
					o = swipeIndex;
				if(o.autoplay.running){
					t.addClass('active');
					o.autoplay.stop();
				} else {
					t.removeClass('active');
					o.autoplay.start();
				}
			});
		},
	},
});

// 0. popup slider 
var swipeIndex = new Swiper('#popup .swiper-container',{
	navigation:{
		nextEl:'#popup .swiper-button-next',
		prevEl:'#popup .swiper-button-prev',
	},
	nested:true,
	resistanceRatio:0
});

// 1. 스와이프 슬라이드 이미지 형
var swipeBlock = [];
$('.block-swiper').each(function(i){
	var t = $(this);
	swipeBlock[i] = new Swiper(this,{
		pagination:{
			el:t.find('.swiper-pagination')[0],
			clickable:true,
		},
		navigation:{
			nextEl:t.find('.swiper-button-next')[0],
			prevEl:t.find('.swiper-button-prev')[0],
		},
		nested:true,
		resistanceRatio:0
	});
});

// 2. 비디오 슬라이드 이미지 형
var swipeVideo = [];
$('.video-swiper').each(function(i){
	var t = this,
		$t = $(this);
	setTimeout(function(){
		swipeVideo[i] = new Swiper(t,{
			effect: "cube",
			grabCursor: true,
			cubeEffect: {
			shadow: true,
			slideShadows: true,
			shadowOffset: 20,
			shadowScale: 0.94,
			},
			speed:500,
			autoplay:{
				delay:3000
			},
			pagination:{
				el:$t.find('.swiper-pagination')[0],
				clickable:true,
			},
			navigation:{
				nextEl:$t.find('.swiper-button-next')[0],
				prevEl:$t.find('.swiper-button-prev')[0],
			},
			breakpoints:{
				768:{
					
				},
			},
			nested:true,
			resistanceRatio:0,
			on:{
				init:function(){
					$t.find('.icon-autoplay').click(function(){
						var t2 = $(this),
							o = swipeVideo[i];
						if(o.autoplay.running){
							t2.addClass('active');
							o.autoplay.stop();
						} else {
							t2.removeClass('active');
							o.autoplay.start();
						}
					});
				},
			},
		});

	},i*1500);
});

// popup
var getCookie = function (cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return "";
} 
var setCookie = function (cname, cvalue, exdays) {
	var todayDate = new Date();
	todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
	var expires = "expires=" + todayDate.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
var cookiedata = document.cookie;
if(cookiedata.indexOf("popupclose=Y")<0){
	$('#popup').show();
}
$('#popup input').click(function(){
	setCookie("close","Y", 1);
	$('#popup').fadeOut();
});

// edit
$('[data-toggle=index-edit]').click(function(){
	var $o = $(this).closest('.block');
	$o.toggleClass('block-edit');
	if($o.hasClass('block-edit')){
		$o.find('input[type=text]').removeAttr('readonly');
		$o.find('[data-contenteditable]').attr('contenteditable','');
	} else {
		$o.find('input[type=text]').attr('readonly','');
		$o.find('[data-contenteditable]').removeAttr('contenteditable');
	}
});

// stop watch - source from https://myhappyman.tistory.com/21
var time = 0,
	starFlag = true;
function blockStopwatch(){
	var hour = 0,
		min = 0,
		sec = 0,
		timer;
	function init(){
		document.getElementById("block-stopwatch-time").innerHTML = "00:00:00";
	}
	$('#block-stopwatch>div').append('<button type="button" id="block-stopwatch-refresh" class="icon-refresh" title="Refresh">Refresh</button>');
	// start btn
	$("#block-stopwatch-btn").click(function(){
		$(this).toggleClass('active');
		if($(this).hasClass('active')){
			$("#block-stopwatch-refresh").show();
			$(this).text('Stop');
			if(starFlag){
				starFlag = false;
				if(time == 0){
					init();
				}
				timer = setInterval(function(){
					time++;
					min = Math.floor(time/60);
					hour = Math.floor(min/60);
					sec = time%60;
					min = min%60;
					var th = hour;
					var tm = min;
					var ts = sec;
					if(th<10){
					th = "0" + hour;
					}
					if(tm < 10){
					tm = "0" + min;
					}
					if(ts < 10){
					ts = "0" + sec;
					}
					document.getElementById("block-stopwatch-time").innerHTML = th + ":" + tm + ":" + ts;
				}, 1000);
			}
		} else {
			$(this).text('Start');
			if(time != 0){
				clearInterval(timer);
				starFlag = true;
			}
		}
	});
	$("#block-stopwatch-refresh").click(function(){
		$(this).hide();
		$("#block-stopwatch-btn").text('Start').removeClass('active');
		if(time != 0){
			clearInterval(timer);
			starFlag = true;
			time = 0;
			init();
		}
	});
}
blockStopwatch();

// calendar - source from https://songsong.dev/11
function indexCalendar(){
	/*
		달력 렌더링 할 때 필요한 정보 목록 
	
		현재 월(초기값 : 현재 시간)
		금월 마지막일 날짜와 요일
		전월 마지막일 날짜와 요일
	*/

	// 날짜 정보 가져오기
	var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
	var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // uct 표준시 도출
	var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
	var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
	
	var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	// 달력에서 표기하는 날짜 객체
	
	
	var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
	var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
	var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

	// kst 기준 현재시간
	// console.log(thisMonth);

	// 캘린더 렌더링
	if($('#block-calendar').length){
		renderCalender(thisMonth);
	}
	function renderCalender(thisMonth) {

		// 렌더링을 위한 데이터 정리
		currentYear = thisMonth.getFullYear();
		currentMonth = thisMonth.getMonth();
		currentDate = thisMonth.getDate();

		// 이전 달의 마지막 날 날짜와 요일 구하기
		var startDay = new Date(currentYear, currentMonth, 0);
		var prevDate = startDay.getDate();
		var prevDay = startDay.getDay();

		// 이번 달의 마지막날 날짜와 요일 구하기
		var endDay = new Date(currentYear, currentMonth + 1, 0);
		var nextDate = endDay.getDate();
		var nextDay = endDay.getDay();

		// console.log(prevDate, prevDay, nextDate, nextDay);

		// 현재 월 표기
		$('.year-month').text(currentYear + '.' + (currentMonth + 1));

		// 렌더링 html 요소 생성
		calendar = document.querySelector('.dates')
		calendar.innerHTML = '';
		
		// 지난달
		for (var i = prevDate - prevDay + 1; i <= prevDate; i++) {
			calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable"><span>' + i + '</span></div>'
		}
		// 이번달
		for (var i = 1; i <= nextDate; i++) {
			calendar.innerHTML = calendar.innerHTML + '<div class="day current"><span>' + i + '</span></div>'
		}
		// 다음달
		for (var i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
			calendar.innerHTML = calendar.innerHTML + '<div class="day next disable"><span>' + i + '</span></div>'
		}

		// 오늘 날짜 표기
		if (today.getMonth() == currentMonth) {
			todayDate = today.getDate();
			var currentMonthDate = document.querySelectorAll('.dates .current');
			currentMonthDate[todayDate -1].classList.add('today');
		}
		const dayIs = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		const nowDay = dayIs[new Date().getDay()];

		$('#block-calendar-today b').text(today.getDate()).prev().text(nowDay);
	}

	// 이전달로 이동
	$('.go-prev').on('click', function() {
		thisMonth = new Date(currentYear, currentMonth - 1, 1);
		renderCalender(thisMonth);
	});

	// 다음달로 이동
	$('.go-next').on('click', function() {
		thisMonth = new Date(currentYear, currentMonth + 1, 1);
		renderCalender(thisMonth); 
	});
}
indexCalendar();