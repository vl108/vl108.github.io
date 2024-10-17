// grid
$('#wrap').addClass('user-mode edit-mode');
$('.block-wrap').width(1500).children().each(function(){
	var $t = $(this);
	$t.addClass('grid-stack-item').children().wrap('<div class="grid-stack-item-content"></div>');
});
var gridOption = {
	acceptWidgets: true,
	disableResize:true,
	disableOneColumnMode: true,
	float:true,
	column:6,
	row:3,
	maxRow:3,
	oneColumnSize:250,
	cellHeight:250,
};
var grid = GridStack.initAll(gridOption);
/*
grid[1].on('added removed change',function(e,items){
	let str = '';
	items.forEach(function(item) { str += ' (x,y)=' + item.x + ',' + item.y; });
	console.log(e.type + ' ' + items.length + ' items:' + str );
});
*/
// add & remove
function addBlock(i,content,w,h){
	grid[i].addWidget(content,{w:w,h:h});
}
function removeBlock(i,el){
	grid[i].removeWidget(el);
}

/*---- ui ----*/
var panel,
	editBtns=`
	<div class="block-edit-btns">
		<button type="button" class="icon-edit-delete" data-toggle="edit-delete" title="삭제">삭제</button>
		<button type="button" class="icon-edit-setting" data-toggle="edit-setting" title="편집">편집</button>
		<div class="edit-pallette">
			<p>Color</p>
			<button type="button" class="icon-edit-submit" data-toggle="edit-pallette" title="확인">확인</button>
			<div class="edit-pallette-color">
				<span><button type="button" class="block-c1" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" class="block-c2" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" class="block-c3" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" class="block-c4" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" class="block-c5" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" class="block-c6" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" class="block-c7" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" class="block-c8" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" class="block-c9" data-toggle="edit-color"><b>A</b></button></span>
				<span><button type="button" data-toggle="edit-color"><b>A</b></button></span>
			</div>
		</div>
	</div>
	`;
	editBtns = editBtns.replace(/\n+|\t/g,'');
$('.btn-step').click(function(){
	$(this).closest('.edit-step').hide().siblings().show();
});
$('.choice-section button').click(function(){
	$(this).addClass('active').parent().siblings().find('button').removeClass('active');
	panel = $(this).parent().index();
});
$('.block-wrap').append('<button type="button" class="btn btn-xs btn-grid-refresh">정렬하기</button>');
$('.btn-grid-refresh').click(function(){
	var i = $(this).parent().attr('id').split('index-')[1]-1;
	grid[i].compact();
});

// 초기화
let serializedData,
	serializedData2,
	serializedData3,
	serializedDataAll = [];
$('[data-toggle=edit-reset]').click(function(){
	$.confirm2("초기화 하시겠습니까?",function() {
		grid[0].removeAll();
		grid[1].removeAll();
		grid[2].removeAll();
		grid[0].load(dataDefault[0], true);
	});
});
// 저장
$('[data-toggle=edit-save]').click(function(){
	
	// SSO 로그인 여부 확인
	ssoLoginChk(function(loginChk){
		if (loginChk != "1"){
			$.alert('로그인 정보가 없습니다.');
			return;
		}
		else {
			$.confirm2("저장 하시겠습니까?",function() {
				serializedData = grid[0].save();
				serializedData2 = grid[1].save();
				serializedData3 = grid[2].save();
				serializedDataAll = [];
				serializedDataAll.push(serializedData);
				serializedDataAll.push(serializedData2);
				serializedDataAll.push(serializedData3);
				// 데이터 보내기 
				indexDataSave(serializedDataAll);
			});
		}
	});
	
	
});
// 종료
$('[data-toggle=edit-end]').click(function(){
	$.confirm2("저장되지 않는 정보는 손실됩니다. 종료하시겠습니까?", function(){
		location.href = '/';
	});
	return false;
});
// bg
function encodeImageFileAsURL(element) {
	var file = element.files[0];
	var reader = new FileReader();
	reader.onloadend = function(){
		//console.log(reader.result)
		$('#bg-preview').html('<img src="'+reader.result+'" alt="">');
		$('.index-bg>i').css({
			backgroundImage:'url('+reader.result+')'
		});
	}
	reader.readAsDataURL(file);
}

$('#bgImgFile').change(function(){
//	encodeImageFileAsURL(this);
	uploadFile(this);
});
$('input[name=bg]').change(function(){
	if($(this).val()==='img'){
		$('.index-bg>i').show().siblings().hide();
	} else {
		$('.index-bg>video').show().siblings().hide();
	}
});
$('input[name=video]').change(function(){
	$('.index-bg>video').attr('src',$(this).val());
});
// 블록 추가
$('[data-toggle=edit-done]').click(function(){
	if(!$('.choice-section button.active').length){
		$.alert('카드를 추가할 페이지를 선택해주세요.');
		return false;
	}
	var $item = $('input[name=shortcut]:checked'),
		url = $item.data('url'),
		tx = $item.data('tx'),
		title = $item.next().text(),
		i = $item.closest('li').index()+1,
		$depth1 = $item.closest('.depth').prev(),
		depth1Title = $depth1.text(),
		icon = $depth1.find('i').attr('class'),
		item,
		w = 1,
		h = 1;
	if($item.data('type')==='dept'){
		// 학부소개
		item = `
		<div class="grid-stack-item grid-stack-item" gs-w="2" gs-h="2">
		`+editBtns+`
			<div class="grid-stack-item-content">
				<div class="block block-c1">
					<div class="index-department">
						<a class="block-ele-col2" href="`+url+`">
							<p>`+tx+`</p>
							<h4>
								<small>학과소개</small>
								<span>`+title+`</span>
							</h4>
							<img src="/content/new2022/img/index/department-`+i+`.jpg" alt="">
						</a>
					</div>
				</div>
			</div>
		</div>
		`;
		w = 2;
		h = 2;
	} else if($item.data('type')==='outlink'){
		// 외부링크
		item = `
		<div class="grid-stack-item grid-stack-item">
		`+editBtns+`
			<div class="grid-stack-item-content">
				<div class="block block-c">
					<a class="align-items-center justify-content-center text-center" href="`+url+`" target="_blank">
						<span class="block-outlink-bg-`+i+`"></span>
						<h4>`+title+`</h4>
					</a>
				</div>
			</div>
		</div>
		`;
	} else if($item.data('type')==='widget-calendar'){
		// 달력 
		item = `
		<div class="grid-stack-item grid-stack-item" gs-w="2">
		`+editBtns+`
			<div class="grid-stack-item-content">
				<div id="block-calendar" class="block block-c2">
					<div class="row">
						<div id="block-calendar-today" class="col-5">
							<span>Tuesday</span>
							<b>22</b>
						</div>
						<div class="col-7">
							<div class="sec_cal">
								<div class="cal_nav">
									<a href="javascript:;" class="nav-btn go-prev">prev</a>
									<div class="year-month">2022.11</div>
									<a href="javascript:;" class="nav-btn go-next">next</a>
								</div>
								<div class="cal_wrap">
									<div class="days">
										<div class="day">MON</div>
										<div class="day">TUE</div>
										<div class="day">WED</div>
										<div class="day">THU</div>
										<div class="day">FRI</div>
										<div class="day">SAT</div>
										<div class="day">SUN</div>
									</div>
									<div class="dates"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`;
		w = 2;
		$('input[name=shortcut][data-type=widget-calendar]').attr('disabled','');
	} else if($item.data('type')==='widget-stopwatch'){
		// 스톱워치 
		item = `
		<div class="grid-stack-item grid-stack-item">
		`+editBtns+`
			<div class="grid-stack-item-content">
				<div id="block-stopwatch" class="block block-c1">
					<div class="align-items-center justify-content-center text-center">
						<b id="block-stopwatch-time">00:00:00</b>
						<button type="button" id="block-stopwatch-btn" class="btn btn-sm">Start</button>
					</div>
				</div>
			</div>
		</div>
		`;
		$('input[name=shortcut][data-type=widget-stopwatch]').attr('disabled','');
	} else if($item.data('type')==='widget-todolist'){
		// 체크리스트
		item = `
		<div class="grid-stack-item grid-stack-item" gs-w="2">
		`+editBtns+`
			<div class="grid-stack-item-content">
				<div id="block-todolist" class="block">
				`+changeData.userChecklist+`
				</div>
			</div>
		</div>
		`;
		w = 2;
		$('input[name=shortcut][data-type=widget-todolist]').attr('disabled','');
	} else if($item.data('type')==='widget-memo'){
		// 메모장
		item = `
		<div class="grid-stack-item grid-stack-item">
		`+editBtns+`
			<div class="grid-stack-item-content">
				<div id="block-memo" class="block block-c3">
					`+changeData.userMemo+`
				</div>
			</div>
		</div>
		`;
		$('input[name=shortcut][data-type=widget-memo]').attr('disabled','');
	} else {
		item = `
		<div class="grid-stack-item grid-stack-item">
		`+editBtns+`
			<div class="grid-stack-item-content">
				<div class="block block-c2">
					<a href="`+url+`">
						<h4>
							<small>`+depth1Title+`</small>
							<span>`+title+`</span>
						</h4>
						<i class="`+icon+`"></i>
					</a>
				</div>
			</div>
		</div>
		`;
	}
	// 자리가 있는 지 검사
	var emptyNum = 0;
	for(var x = 0;x < 6;x++){
		for(var y = 0;y < 3;y++){
			//console.log(x,y,w,h,grid[panel].isAreaEmpty(x,y,w,h));
			if(!grid[panel].isAreaEmpty(x,y,w,h) || (y===2 && h===2)){
				emptyNum++;
			}
		}
	}
	if(emptyNum==18){
		$.alert('공간이 부족하네요. 다른 페이지를 선택해주세요.');
		return false;
	}
	// 추가
	addBlock(panel,item.replace(/\n+|\t/g,''),w,h);
	// 종료
	$('input[name=shortcut]:checked').prop('checked',false);
	$('a[href="#tabShortcut"]').tab('show');
	$('.edit-step:first-child').show().siblings().hide();
	$('.shortcut-list .open').removeClass('open').children('div').hide();
	$('#modalEdit').modal('hide');
});

// edit
function blockAddEdit(){
	$('.block:not([data-edit="fixed"])').before(editBtns);
}
$('#index').on('click','[data-toggle=edit-delete]',function(){
	if(confirm("이 블럭을 제거하시겠습니까?")){
		var $o = $(this).closest('.grid-stack-item'),
			i = $o.parent().attr('id').split('index-')[1]-1;
		// 제거 
		removeBlock(i,$o[0]);
		// 위젯 제거 시 모달에서 항목 반영
		if($o.find('#block-stopwatch').length){
			$('input[name=shortcut][data-type=widget-stopwatch]').removeAttr('disabled');
		} else if($o.find('#block-calendar').length){
			$('input[name=shortcut][data-type=widget-calendar]').removeAttr('disabled');
		} else if($o.find('#block-todolist').length){
			$('input[name=shortcut][data-type=widget-todolist]').removeAttr('disabled');
		} else if($o.find('#block-memo').length){
			$('input[name=shortcut][data-type=widget-memo]').removeAttr('disabled');
		}
	}
})
.on('click','[data-toggle=edit-color]',function(){
	$(this).closest('.grid-stack-item').find('.block').removeClass('block-c1 block-c2 block-c3 block-c4 block-c5 block-c6 block-c7 block-c8 block-c9').addClass($(this).attr('class'));
})
.on('click','[data-toggle=edit-setting],[data-toggle=edit-pallette]',function(){
	var $o = $(this).closest('.grid-stack-item').find('.edit-pallette');
	if($o.is(':visible')){
		$o.hide();
	} else {
		$('.edit-pallette').hide();
		$o.show();
	}
});

// scroll 
var swipeIndexScroll = new Swiper("#index", {
	direction: "horizontal",
	slidesPerView: "auto",
	freeMode: true,
	mousewheel: true,
	simulateTouch:false
});


var uploadImageResult = {}; // 이미지 업로드 결과
async function uploadFile(element) {
	let file = element.files[0];
	let formData = new FormData(); 
	formData.append("file", file);
	let response = await fetch('/comm/cmfile/upload.do', {
		method: "POST",
		body: formData
	});
	
	if (response.ok) {
		let response_json = await response.json();
		let imageUrl = "/comm/cmfile/image.do?encSvrFileNm=" + response_json.result.encSvrFileNm;
		
		$('#bg-preview').html('<img src="'+imageUrl+'" alt="">');
		$('.index-bg>i').css({
			backgroundImage:'url('+imageUrl+')'
		});
		
		uploadImageResult = response_json.result;
		
		console.log(JSON.stringify(response_json));
	}
	
}

// 불러오기
function indexDataLoad(){
	var indexData /* = 개인화 데이터 */;
	
	try {
		indexData = JSON.parse($("#frm").find("[name=gridData]").val());
		
		// 동적 데이터 입력
		indexData.forEach(function(data) {
			
			for (const i in data) {
				if (data[i].id) {
					data[i].content = data[i].content.replace(/(<div[^>]*>)(.*)(<\/div>)/, "$1" +changeData[data[i].id] + "$3");
				}
			}
			
		});
	} catch(e) {
		console.log(e.message);
	}
	
	if(!indexData){
		indexData = dataDefault;
	}
	grid[0].load(indexData[0], true);
	grid[1].load(indexData[1], true);
	grid[2].load(indexData[2], true);
	// 에디터툴 추가
	blockAddEdit();
}

//저장 
function indexDataSave(data){
	$form = $("#frm");
	
	let formData = {};
	formData['customSeq'] = $form.find("[name=customSeq]").val();
	
	bgSel =  $("input[name=bg]:checked").val() == 'video' ? 'V' : 'I';
	formData['bgSel'] = bgSel;
	
	if (bgSel == 'I') {
		// 이미지 정보 
		for (const property in uploadImageResult) {
			formData['imgFileSeq[0].' + property] = uploadImageResult[property];
		}
	} else if (bgSel == 'V') {
		video =  $("input[name=video]").val() 
		formData['videoUrl'] = video;
	}

	
	
	// 동적 데이터 제거
	try {
		
		data.forEach(function(item) {
			
			for (const i in item) {
				
				let dom = document.createElement('div');
				dom.innerHTML = item[i].content;
				
				// 에디터 버튼 삭제
				let btns = dom.querySelectorAll('.block-edit-btns');
				for (let btn of btns) {
					dom.removeChild(btn);
				}
				
			
				// 동적 내용 삭제
				if (item[i].id) {
					dom.querySelector('.block').innerHTML='';
				}
				
				item[i].content = dom.innerHTML;
			}
			
		});
	} catch(e) {
		console.log(e.message);
		$.alert('오류가 발생하였습니다.');
		return false;
	}
	
	let gridData = JSON.stringify(data);
	formData['gridData'] = gridData;
	
	$.ajax( {
		"url" : "/user/mainCustom/proc.do" ,
		"method" : "POST" ,
		"dataType" : "json" ,
		"data" : formData ,
		"success" : function ( data ) {
			if (data.hasOwnProperty('result') && data.result > 0) {
				$form.find("[name=customSeq]").val(data.result);
				$.alert('저장 되었습니다.');
			} else {
				$.alert('오류가 발생하였습니다.');
			}
			
		}
	} );
	
	// data 를 DB에 저장하기
	//console.log(data);
//	console.log('개인그리드 데이터 : '+JSON.stringify(data,null,''));
}


