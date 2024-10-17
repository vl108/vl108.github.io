$(function(){
	"use strict";

	var $w = $(window),
		$body = $('body');  

	$( ".datepicker" ).datepicker({ dateFormat: 'yy-mm-dd' }).val();

	$('button.mn-open').click(function(){
        $body.addClass('nav-open');
		return false;
	});
	$('button.close-lnb').click(function(){
        $body.removeClass('nav-open');
		return false;
	}); 

	$('[data-openlayer]').click(function(){ 
		$(this).toggleClass('active');
		$(this).parent().siblings().find('[data-openlayer]').removeClass('active');
	}); 

	$('[data-toggle="detailPopup"]').click(function(){ 
		if($(this).hasClass('active')){
			// detailPopupClose($(this));
			return;
		} else if(!$(this).hasClass('active') && $('body').hasClass('popup-open')){
			$('body').removeClass('popup-open').find('.detail-popup-open').removeClass('detail-popup-open').end().find('.btn-close-popup').click();
			detailPopupOpen($(this));
		} else {		
			detailPopupOpen($(this));
		}
	})

	$('.btn-close-popup').click(function(){
		detailPopupClose($(this));
	});

	function detailPopupOpen($tg){
		$tg.addClass('active').closest('tr').addClass('detail-popup-open');
		$('body').addClass('popup-open');
	}

	function detailPopupClose($tg){
		$('body').removeClass('popup-open');
		$tg.closest('tr').removeClass('detail-popup-open').find('.btn-detail-popup').removeClass('active');
	}

	$('.m-search').click(function(){  
		$(this).parents().find('form').addClass('active');
	}); 

	$('.datepicker + i').click(function(){ 
		$(this).parent().find('.datepicker').focus()
	})

	
	// var $lnbBtn = $('#lnb>ul>li>a');
	// $lnbBtn.css('border','5px solid red');
	// $lnbBtn.next().hide();
	// $lnbBtn.on('click', function (e) {
	// 	e.preventDefault();
	// 	var $t = $(this),
	// 		$parent = $t.parent(),
	// 		$siblings = $t.parent().siblings(),
	// 		$t_siblings = $t.next();

	// 	if($parent.hasClass('open')){
	// 		$parent.removeClass('open').find('li').removeClass('open').end().find('ul').stop().slideUp(250)
	// 	} else {
	// 		$parent.addClass('open');
	// 		$siblings.removeClass('open').find('li').removeClass('open').end().find('ul').stop().slideUp(250);
	// 		$t_siblings.stop().slideDown(250);
	// 	}
	// 	return false;
	// });


	if($w.width()>766) $body.addClass('nav-open'); 



	/*순서변경*/

	$(".sortable").find("li").each(function () {
		$(this).mouseover(function () {
			$(this).css("border-color", "#d25f0c").find(".ds-buttons").css("display", "block");
		});
		$(this).mouseout(function () {
			$(this).css("border-color", "#CCC").find(".ds-buttons").css("display", "none");
		});
	});

	//한단계 위로
	$("._moveUp").click(function(){
		var liobj = $(this).parents("li:first");
		//==== 첫번째 팝업존인지 체크 ===========			
		if( liobj.index() == 0){
			alert("첫번째 입니다.");
			return;
		}
		liobj.insertBefore(liobj.prev());

		//화살표 레이어 숨기기
		liobj.find(".ds-buttons").css("display", "none");
		// sort_complete();
	});

	//맨위로
	$("._moveTop").click(function(){
		var liobj = $(this).parents("li:first");
		//==== 첫번째 팝업존인지 체크 ===========
		if( liobj.index() == 0){
			alert("첫번째 입니다.");
			return;
		}		
		liobj.insertBefore($("#sortable").children('li:first'));

		//화살표 레이어 숨기기
		liobj.find(".ds-buttons").css("display", "none");
		// sort_complete();
		$('html,body').animate({scrollTop: $(this).offset().top}, 800);
	});
	//한단계 밑으로
	$("._moveDown").click(function(){
		var liobj = $(this).parents("li:first");
		//==== 마지막 팝업존인지 체크 ===========
		if( liobj.next("li").length==0){
			alert("마지막 입니다.");
			return;
		}
		liobj.insertAfter(liobj.next());
		
		//화살표 레이어 숨기기
		liobj.find(".ds-buttons").css("display", "none");
		// sort_complete();
	});
	//맨 밑으로
	$("._moveBottom").click(function(){
		var liobj = $(this).parents("li:first");
		//==== 마지막 팝업존인지 체크 ===========
		if( liobj.next("li").length==0){
			alert("마지막 입니다.");
			return;
		}
		liobj.insertAfter($("#sortable").children('li:last'));

		//화살표 레이어 숨기기
		liobj.find(".ds-buttons").css("display", "none");
		// sort_complete();
	});

	//순서바꾸는 함수
	$( "#sortable" ).sortable({
		placeholder: "sortable-placeholder",
		helper: 'clone',
		opacity: "1",
		cursor: 'move',
		sort: function(e, ui) {
			//$(ui.placeholder).html(Number($("#sortable > li").index(ui.placeholder)) + 1);
		},
		update: function(event, ui){
			
			// sort_complete();
		}
	});

	//화살표 함수 처리 완료
	function sort_complete(){
		var reverse = $("#sortable li").get().reverse();
		$.each(reverse, function() {
			$(this).find(".jsNum").text($(this).index() + 1);
		});
		
	}
	
	//체크박스 전체선택
	$("#main_check").click(function(){
		if($("#main_check").is(":checked")){
			$("input[name=chk]").prop("checked", true);
		} else {
			$("input[name=chk]").prop("checked", false);
		}
	});
	
	//체크박스 일부선택
	$("input[name=chk]").click(function(){
		var total = $("input[name=chk]").length;
		var checked = $("input[name=chk]:checked").length;
	
		if($("input[name=chk]").is(":checked")){
			$(this).val("Y");
		} else {
			$(this).val('N');
		}
		
		if(total != checked){
			$("#main_check").prop("checked", false);
		} else {
			$("#main_check").prop("checked", true);
		}
	});


	let $srch = $('.search-wrap');
	if($srch.height() > 300){
		$srch.addClass('minimize').append('<div class="toggle">펼치기<i class="icon-open"></i></div>')
	}
	

	$('.toggle').click(function(){
		if($srch.hasClass('minimize')){
			$srch.removeClass('minimize');
			$(this).html('접기<i class="icon-open"></i>')
		} else {
			$srch.addClass('minimize');
			$(this).html('펼치기<i class="icon-open"></i>')
		}
	});
	
	$("#page_sort").change(function(){
		$("#search [name='page_sort']").val($(this).val());
		$("#search").submit();
	});
	
});

//날짜설정 220701 - sym
function setDate(mm){
	if(mm == 'all'){
		$(".datepicker").attr("disabled", true);
		$("#date_type").val("all");
	}else{
		$(".datepicker").attr("disabled", false);
		var num = mm.substring(0, 1);
		var str = mm.substring(1, 2);
		var today = new Date();
		
		var endDate = $.datepicker.formatDate('yy-mm-dd', today);
		$("#datepicker2").val(endDate);
		
		if(str == 'd'){
			today.setDate(today.getDate() - num);
		} else if(str == 'w'){
			if(str == 'w' && num == '2'){
				today.setDate(today.getDate() - (num * 7.5));
			} else {
				today.setDate(today.getDate() - (num * 7));	
			}
		} else if(str == 'm'){
			today.setMonth(today.getMonth() - num);
			today.setDate(today.getDate() + 1);
		} else if(str == 'y'){
			today.setFullYear(today.getFullYear() - num);
			today.setDate(today.getDate() + 1);
		}
		
		var startDate = $.datepicker.formatDate('yy-mm-dd', today);
		$("#datepicker1").val(startDate);
		$("#date_type").val(mm);
	}
}