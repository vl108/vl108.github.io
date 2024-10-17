$(function(){
	$(window).scroll(function(){
		if($(this).scrollTop()>0){
			$('body').addClass('is-scroll');
		}else{
			$('body').removeClass('is-scroll');
		}
	}).trigger('scroll');

	$('#btnTop').on('click',function(){
		$("html, body").stop().animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	let observer = new IntersectionObserver(isElScrolledIntoView,{
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    const elements = document.querySelectorAll('.animate');
    elements.forEach(element=>{
        observer.observe(element);
    });

    function isElScrolledIntoView(entries) {
        entries.forEach(entry=>{
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            } else {
                entry.target.classList.remove('animated');
            }
        }
        );
    }
	var controller;
	let breakpoint = {
		xl : window.matchMedia( '(min-width: 1200px)' ),
	}

	let obj = {}

	let breakpointChecker = function() {
		if ( breakpoint.xl.matches ) {
			obj.projectCntTxt = "translate(-25%, -25%)"
			obj.projectCntTxtInner = "scale(.6) translateY(15%)"
		} else {
			obj.projectCntTxt = "translate(-8%, -25%)"
			obj.projectCntTxtInner = "scale(.8) translateY(15%)"
		}
	}

	for(const key in breakpoint) {
		breakpoint[key].addListener(breakpointChecker);
	}

	breakpointChecker();
    createScrollMagic(controller);

	$(window).resize(function(){
		controller.destroy(true);
		createScrollMagic(controller);
	}).trigger('resize');

	
	function createScrollMagic(){
		controller = new ScrollMagic.Controller();
		var vh = $(window).innerHeight();
	
		new ScrollMagic.Scene({
			triggerElement: "#visualCntTrigger",
			triggerHook: 0,
			duration: vh/2
		})	
        .setTween(".fill", {backgroundPosition: "0% 50%"})
		.addTo(controller);
	
      	new ScrollMagic.Scene({
			triggerElement: "#visualCntTrigger",
			offset: vh/2,
			triggerHook: 0,
			duration: vh
		})
		.setTween(".visual-typo", {opacity: 0})
		.addTo(controller);

		new ScrollMagic.Scene({
			triggerElement: "#visualCntTrigger",
			offset: vh/1,
			triggerHook: 0,
			duration: vh
		})
		.setTween("#visualCnt .primary-typo-inner>span", {opacity: 1, transform: "translateX(0)"})
		.addTo(controller);

        new ScrollMagic.Scene({
			triggerElement: "#visualCntTrigger",
			triggerHook: 0,
			offset: vh*2,
			duration: vh/2.5
		})
		
		.setTween("#visualCnt", {opacity: 0})
		.addTo(controller);



        //projectCnt
        new ScrollMagic.Scene({
            triggerElement: "#projectCntTrigger",
            triggerHook: 0,
            offset: -vh*1.1,
            duration: vh*0.8
        })
        .setTween("#projectCnt .primary-typo", {transform: obj.projectCntTxt})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#projectCntTrigger",
            triggerHook: 0,
            offset: -vh*1.1,
            duration: vh
        })
        .setTween("#projectCnt .primary-typo-inner", {transform: obj.projectCntTxtInner})
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: "#projectCntTrigger",
            triggerHook: 0,
            offset: -vh*0.9,
            duration: vh*0.8
        })
        .setTween("#projectCnt .primary-typo-inner>span:nth-child(2)", {left: 0})
        .addTo(controller);
        
		new ScrollMagic.Scene({
            triggerElement: "#projectCntTrigger",
			offset: -vh*0.5,
			triggerHook: 0,
		})
		.setTween(".scroll", {opacity: 0})   
		.addTo(controller);   

		new ScrollMagic.Scene({
            triggerElement: "#projectCntTrigger",
			offset: vh/3,
			triggerHook: 0,
		})
		.setClassToggle('#projectCnt', 'entered')
		.addTo(controller);
    }
});

(function (){ 
	$(window).resize(function(){
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}).trigger('resize');
})();