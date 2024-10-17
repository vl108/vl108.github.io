// 로그인 메인
$('#wrap').addClass('user-mode');

// grid
var gridOption = {
	acceptWidgets: true,
	disableResize:true,
	disableOneColumnMode: true,
	float:true,
	column:6,
	//row:3,
	oneColumnSize:250,
	cellHeight:250,
	animate:false,
	staticGrid: true // 드래그 막기
};
var grid = GridStack.initAll(gridOption);
// 반응형 
let layout = 'moveScale';
function resizeGrid(){
	let width = document.body.clientWidth;
	if(width < 768){
		grid[0].column(2, layout).cellHeight('auto');
		grid[1].column(2, layout).cellHeight('auto');
		grid[2].column(2, layout).cellHeight('auto');
		setTimeout(function(){
			grid[0].compact();
			grid[1].compact();
			grid[2].compact();
		},100);
	} else if(width < 992){
		grid[0].column(4, layout).cellHeight('auto');
		grid[1].column(4, layout).cellHeight('auto');
		grid[2].column(4, layout).cellHeight('auto');
		setTimeout(function(){
			grid[0].compact();
			grid[1].compact();
			grid[2].compact();
		},100);
	} else {
		grid[0].column(6, layout).cellHeight(250);
		grid[1].column(6, layout).cellHeight(250);
		grid[2].column(6, layout).cellHeight(250);
	}
};
resizeGrid();
window.addEventListener('resize',function(){resizeGrid()});

// default data 
let dataDefault = [
	[
		{
		"x": 0,
		"y": 0,
		"w": 2,
		"content": "<div class=\"block block-c1\" data-edit=\"fixed\"><div class=\"index-swiper auto-swiper\"><div class=\"swiper-container\"><div class=\"swiper-wrapper\"><div class=\"swiper-slide\"><h4 class=\"text-truncate\"><a href=\"\">주요공지사항입니다.</a></h4></div></div></div><button type=\"button\" class=\"icon-swiper swiper-button-prev\"><span class=\"sr-only\">이전 슬라이드</span></button><button type=\"button\" class=\"icon-swiper swiper-button-next\"><span class=\"sr-only\">다음 슬라이드</span></button><button type=\"button\" class=\"icon-autoplay\"><span class=\"sr-only\">재생/일시정지</span></button></div></div>"
		},
		{
		"x": 3,
		"y": 0,
		"content": "<div id=\"block-stopwatch\" class=\"block block-c1\"><div class=\"align-items-center justify-content-center text-center\"><b id=\"block-stopwatch-time\">00:00:00</b><button type=\"button\" id=\"block-stopwatch-btn\" class=\"btn btn-sm\">Start</button></div></div>"
		},
		{
		"x": 2,
		"y": 0,
		"content": "<div class=\"block\"><a class=\"align-items-center justify-content-center text-center\" href=\"\"><div><img class=\"img-icon\" src=\"img/index/icon-hansadaero.svg\" alt=\"\"><h4>한사대로 <br>바로가기</h4></div></a></div>"
		},
		{
		"x": 0,
		"y": 1,
		"w": 2,
		"content": "<div class=\"block\" data-edit=\"fixed\"><div class=\"index-notice\"><h4><strong>공지사항</strong></h4><ul class=\"nav\"><li id=\"index-tab\" class=\"first\"><a class=\"active\" href=\"#index-tab-pane\" data-toggle=\"tab\">일반</a></li><li id=\"index-tab-2\" class=\"last\"><a href=\"#index-tab-pane-2\" data-toggle=\"tab\">학사</a></li></ul><div class=\"tab-content\"><div id=\"index-tab-pane\" class=\"tab-pane active\" role=\"tabpanel\" aria-labelledby=\"index-tab\"><ul><li class=\"first last\"><a class=\"text-truncate\" href=\"\">일반 공지사항입니다.</a></li></ul></div><div id=\"index-tab-pane-2\" class=\"tab-pane\" role=\"tabpanel\" aria-labelledby=\"index-tab-2\"><ul><li class=\"first last\"><a class=\"text-truncate\" href=\"\">학사 공지사항입니다.</a></li></ul></div></div><a class=\"icon-more btn-more\" href=\"\">더보기</a></div></div>"
		},
		{
		"x": 2,
		"y": 1,
		"content": "<div class=\"block block-c3\"><div class=\"index-info\"><h4><small>학사안내</small></h4><i class=\"icon-block-info\"></i><div class=\"swiper-container block-swiper\"><div class=\"swiper-wrapper\"><a class=\"swiper-slide\" href=\"\"><h4><small>&nbsp;</small><strong>학적</strong></h4></a><a class=\"swiper-slide\" href=\"\"><h4><small>&nbsp;</small><strong>수강</strong></h4></a><a class=\"swiper-slide\" href=\"\"><h4><small>&nbsp;</small><strong>학습/평가</strong></h4></a><a class=\"swiper-slide\" href=\"\"><h4><small>&nbsp;</small><strong>졸업</strong></h4></a><a class=\"swiper-slide\" href=\"\"><h4><small>&nbsp;</small><strong>장학</strong></h4></a></div><div class=\"swiper-pagination\"></div></div></div></div>"
		},
		{
		"x": 3,
		"y": 1,
		"w": 2,
		"content": "<div id=\"block-calendar\" class=\"block block-c2\"><div class=\"row\"><div id=\"block-calendar-today\" class=\"col-5\"><span>Tuesday</span><b>22</b></div><div class=\"col-7\"><div class=\"sec_cal\"><div class=\"cal_nav\"><a href=\"javascript:;\" class=\"nav-btn go-prev\">prev</a><div class=\"year-month\">2022.11</div><a href=\"javascript:;\" class=\"nav-btn go-next\">next</a></div><div class=\"cal_wrap\"><div class=\"days\"><div class=\"day\">MON</div><div class=\"day\">TUE</div><div class=\"day\">WED</div><div class=\"day\">THU</div><div class=\"day\">FRI</div><div class=\"day\">SAT</div><div class=\"day\">SUN</div></div><div class=\"dates\"></div></div></div></div></div></div>"
		},
		{
		"x": 4,
		"y": 0,
		"content": "<div class=\"block block-c3\"><a href=\"\"><h4><small>대학생활</small><span>24시간 <br>증명서 발급센터</span></h4><i class=\"icon-block-print\"></i></a></div>"
		},
		{
		"x": 1,
		"y": 2,
		"w": 2,
		"content": "<div class=\"block block-c2\"><div class=\"index-notice\"><h4><strong>이달의 학사일정</strong></h4><div class=\"tab-content\"><ul><li class=\"first last\"><a class=\"text-truncate\" href=\"\"><b>11.12~11.12</b> 이달의 학사일정입니다.</a></li></ul></div><a class=\"icon-more btn-more\" href=\"\">더보기</a></div></div>"
		},
		{
		"x": 3,
		"y": 2,
		"w": 2,
		"content": "<div id=\"block-todolist\" class=\"block\"><div class=\"block-todolist\"><h4><strong>체크리스트</strong></h4><ul><li class=\"first last\"><input type=\"checkbox\"><input type=\"text\" readonly=\"\" value=\"체크리스트를 사용하실 수 있습니다.\"></li></ul><div class=\"btn-more\"><button type=\"button\" id=\"block-todo-edit\" class=\"icon-edit\" data-toggle=\"index-edit\">편집</button><button type=\"button\" id=\"block-todo-submit\" class=\"icon-edit-submit\" data-toggle=\"index-edit\">등록</button></div></div></div>"
		},
		{
		"x": 5,
		"y": 1,
		"content": "<div id=\"block-memo\" class=\"block block-c3\"><div class=\"block-memo align-items-center justify-content-center text-center\"><p data-contenteditable=\"\">메모장 위젯 <br>간단한 메모를 할 수 있습니다.</p><div class=\"btn-more\"><button type=\"button\" id=\"block-memo-edit\" class=\"icon-edit\" data-toggle=\"index-edit\">편집</button><button type=\"button\" id=\"block-memo-submit\" class=\"icon-edit-submit\" data-toggle=\"index-edit\">등록</button></div></div></div>"
		}
	],
	[],
	[]
]