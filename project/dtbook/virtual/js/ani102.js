var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("F5E44A5F8957564A8ABABD5E305E6476");
	var lib=comp.getLibrary();
	var loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
	var lib=comp.getLibrary();
	loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
	var images=comp.getImages();
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}
function handleComplete(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	exportRoot = new lib.ani102();
	stage = new lib.Stage(canvas);
	stage.enableMouseOver();
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.framerate = lib.properties.fps;
		createjs.Ticker.addEventListener("tick", stage);
	}
	//Code to support hidpi screens and responsive scaling.
	AdobeAn.makeResponsive(true,'both',true,1,[canvas,anim_container,dom_overlay_container]);
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}
function playSound(id, loop, offset) {
	return createjs.Sound.play(id, {'interrupt':createjs.Sound.INTERRUPT_EARLY, 'loop': loop, 'offset': offset});}

$(function(){
	init();
});

(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"ani102_atlas_1", frames: [[0,0,1536,1338],[0,1340,1359,620]]},
		{name:"ani102_atlas_2", frames: [[0,195,443,453],[0,0,1334,193],[445,494,54,73],[445,195,60,61],[1336,0,448,492]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.레이어2 = function() {
	this.initialize(ss["ani102_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.창의적으로생각해요 = function() {
	this.initialize(ss["ani102_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.back = function() {
	this.initialize(ss["ani102_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.btz_클릭S = function() {
	this.initialize(ss["ani102_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.btz_다시S = function() {
	this.initialize(ss["ani102_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Group3 = function() {
	this.initialize(ss["ani102_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Layer5 = function() {
	this.initialize(ss["ani102_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Tween3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer5();
	this.instance.setTransform(-224,-246);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-224,-246,448,492);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.레이어2();
	this.instance.setTransform(-221.5,-226.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221.5,-226.5,443,453);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Group3();
	this.instance.setTransform(-679.5,-310);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-679.5,-310,1359,620);


(lib.Symbol122 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.btz_클릭S();

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0099CC").s().p("AnpImIAAxLIPTAAIAARLg");
	this.shape.setTransform(26.5,32.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.5,-22.5,98,110);


(lib.Symbol1fdsa = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer 1
	this.instance = new lib.btz_다시S();

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0099CC").s().p("AnuHvIAAvdIPdAAIAAPdg");
	this.shape.setTransform(28.5,30.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21,-19,99,99);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween3("synched",0);
	this.instance.setTransform(10,440,1,1,0,0,0,-214,194);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},7).to({rotation:-1.7042,x:9.95},1).to({rotation:0,x:10},5).to({startPosition:0},6).to({regY:194.1,rotation:1.9762,y:430.05},1).to({regY:194,rotation:0,y:440},2).to({startPosition:0},6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.1,-12.8,476,509.90000000000003);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween2("synched",0);
	this.instance.setTransform(250,440,1,1,0,0,0,28.5,213.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},4).to({regX:28.6,rotation:1.9762,x:250.1,y:430},1).to({regX:28.5,rotation:0,x:250,y:440},4).to({startPosition:0},4).to({rotation:-2.1923,y:431},1).to({rotation:0,y:440},3).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.6,-18.3,474.6,471.8);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(679.5,310);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({startPosition:0},3).to({y:304},1).to({x:676.5,y:308},1).to({x:682.5,y:307},1).to({x:679.5,y:310},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-6,1365,626);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_1 = function() {
		playSound("pt102_1");
	}
	this.frame_335 = function() {
		var _this = this;
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(1).call(this.frame_1).wait(334).call(this.frame_335).wait(1));

	// Layer_2
	this.bt2 = new lib.Symbol1fdsa();
	this.bt2.name = "bt2";
	this.bt2.setTransform(1297,45.5,1,1,0,0,0,30,30.5);
	new cjs.ButtonHelper(this.bt2, 0, 1, 2, false, new lib.Symbol1fdsa(), 3);

	this.bt1 = new lib.Symbol122();
	this.bt1.name = "bt1";
	this.bt1.setTransform(1295,36.5,1,1,0,0,0,27,36.5);
	new cjs.ButtonHelper(this.bt1, 0, 1, 2, false, new lib.Symbol122(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.bt1},{t:this.bt2}]}).wait(336));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A/PPoIAA/PMA+fAAAIAAfPg");
	this.shape.setTransform(1120,-180);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(335));

	// Layer_1
	this.instance = new lib.Symbol5("synched",0);
	this.instance.setTransform(898,499,1,1,0,0,0,224,246);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(336));

	// Layer_5
	this.instance_1 = new lib.Symbol4("synched",0);
	this.instance_1.setTransform(466,456,1,1,0,0,0,221.5,226.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(336));

	// Layer_4
	this.instance_2 = new lib.Symbol3("synched",0);
	this.instance_2.setTransform(679.5,630,1,1,0,0,0,679.5,310);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(316).to({startPosition:6,loop:false},0).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-280,1365,1220);


// stage content:
(lib.ani102 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		var _this = this;
		this.mc_cnt = 0;
		_this.init = function init(mc)
		{
			if( mc == null ) return;
			_this.mc_cnt++;
			mc.stop();
			mc.bt2.visible = false;
			mc.bt1.on("click",function(){mc.parent.bt_dn_on(mc);	});
			mc.bt2.on("click",function(){mc.parent.bt_dn_on(mc);	});
		}
		_this.init(_this.m1);
		_this.init(_this.m2);
		_this.init(_this.m3);
		_this.init(_this.m4);
		_this.init(_this.m5);
		_this.bt_dn_on = function bt_dn_on(mc)
		{
			if( mc.currentFrame == 0 )
			{
				mc.bt2.visible = true;
				mc.bt1.visible = false;
				var n;
				var m;
				var my_n = Number(mc.name[1]);
				for(n=1;n<= _this.mc_cnt ;++n)
				{
					if(my_n != n)
					{
						m = _this["m"+n];
						if( m.totalFrames-1 != m.currentFrame)
						{
							if(m.currentFrame != 0)
							{
								m.gotoAndStop(m.totalFrames-1);
							}else
							{
								m.bt1.visible = true;
								m.bt2.visible = false;
							}
						}
					}
				}
				createjs.Sound.stop();
				mc.play();
			}
			else
			{
				mc.bt1.visible = true;
				mc.bt2.visible = false;
				if( mc.totalFrames-1 != mc.currentFrame) createjs.Sound.stop();
				mc.gotoAndStop(0);
			}
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// 레이어_1
	this.instance = new lib.창의적으로생각해요();
	this.instance.setTransform(102,1121);

	this.m1 = new lib.Symbol2();
	this.m1.name = "m1";
	this.m1.setTransform(762.5,805,1,1,0,0,0,679.5,470);

	this.instance_1 = new lib.back();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.m1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(768,669,768,669);
// library properties:
lib.properties = {
	id: 'F5E44A5F8957564A8ABABD5E305E6476',
	width: 1536,
	height: 1338,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/ani/ani102_atlas_1.png?1665901712839", id:"ani102_atlas_1"},
		{src:"images/ani/ani102_atlas_2.png?1665901712839", id:"ani102_atlas_2"},
		// {src:"media/page102/pt102_1.mp3?1665901712871", id:"pt102_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F5E44A5F8957564A8ABABD5E305E6476'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {
	var lastW, lastH, lastS=1;
	window.addEventListener('resize', resizeCanvas);
	resizeCanvas();
	function resizeCanvas() {
		var w = lib.properties.width, h = lib.properties.height;
		var iw = anim_container.dataset.w, ih=anim_container.dataset.h;
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
		if(isResp) {
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
				sRatio = lastS;
			}
			else if(!isScale) {
				if(iw<w || ih<h)
					sRatio = Math.min(xRatio, yRatio);
			}
			else if(scaleType==1) {
				sRatio = Math.min(xRatio, yRatio);
			}
			else if(scaleType==2) {
				sRatio = Math.max(xRatio, yRatio);
			}
		}
		domContainers[0].width = w * pRatio * sRatio;
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {
			container.style.width = w * sRatio + 'px';
			container.style.height = h * sRatio + 'px';
		});
		stage.scaleX = pRatio*sRatio;
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;
		stage.tickOnUpdate = false;
		stage.update();
		stage.tickOnUpdate = true;
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
