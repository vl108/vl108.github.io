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

