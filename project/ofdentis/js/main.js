$(function(){
    'use strict';
    
    var coursesSwiper = new Swiper(".courses-swiper", {
        slidesPerView: "auto",
        spaceBetween: 12,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
        },
        navigation: {
            nextEl: ".courses-swiper .swiper-button-next",
            prevEl: ".courses-swiper .swiper-button-prev",
        },
        breakpoints: {
            1200: {
                spaceBetween: 50,
            },
            576: {
                spaceBetween: 25,
            }
        }
    }); 
    
    var counselSwiper = new Swiper(".counsel-swiper .swiper", {
        slidesPerView: 'auto',
        spaceBetween: 40,
        navigation: {
            nextEl: ".counsel-swiper .swiper-button-next",
            prevEl: ".counsel-swiper .swiper-button-prev",
        },
        breakpoints: {
            1600: {
                spaceBetween: 150,
                slidesPerView: 2,
            },
            1200: {
                spaceBetween: 80,
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            }
        }
    }); 

    // contents youtube
    var contentsSwiper = new Swiper(".contents-swiper .swiper", {
        slidesPerView: 'auto',
        spaceBetween: 12,
        navigation: {
            nextEl: ".contents-swiper .swiper-button-next",
            prevEl: ".contents-swiper .swiper-button-prev",
        },
        breakpoints: {
            1200: {
                spaceBetween: 30,
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 5,
            },
            576: {
                spaceBetween: 25,
            }
        },
        on: {
            slideChangeTransitionEnd: function (swiper){
                currentYoutube($('.ytp-item').eq(swiper.activeIndex)[0]);
            }
        }
    }); 

    var $ytpBtn = $('.ytp-item'),
        $ytpField = $('.dentis-ytp iframe'),
        $ytpOverlay = $('.dentis-ytp-overlay');

    function currentYoutube(ele){
        var $t = $(ele);

        $ytpBtn.removeClass('active');
        $t.addClass('active');
        $ytpOverlay.show();

        $ytpField.attr('src', ele.dataset.url);
        console.log($t.find('img').attr('src'))
        $ytpOverlay.css('background-image','url('+$t.find('img').attr('src')+')').find('.font-obj').text($t.find('.font-obj').text());
        $('#ytp-title').text($t.find('.ytp-item-title').text());
    }

    $ytpBtn.click(function(e){
        e.preventDefault();
        currentYoutube(this);
	});
    $ytpBtn.eq(0).click();

    $('.icon-ytp-play').click(function(){
        var url = $ytpField.attr('src');
        $ytpOverlay.delay(500).fadeOut(500);
        url = url.split('?list')[0]+'?autoplay=1&mute=1'
        $ytpField.attr('src',url);
    });
    $('[data-toggle=index-contents]').click(function(){
        var $t = $(this),
            $o = $('.contents-swiper');
        $t.addClass('active').siblings().removeClass('active');
        if($t.data('cate')==='of'){
            $o.find('[data-cate=of]').show();
            $o.find('[data-cate=clinical]').hide();
        } else if($t.data('cate')==='clinical'){
            $o.find('[data-cate=clinical]').show();
            $o.find('[data-cate=of]').hide();
        } else {
            $o.find('.swiper-slide').show();
        }
        return false;
    });
});

/* popup */
var popupSwiper = new Swiper(".popup-swiper",{
    slidesPerView: "auto",
    /*
    navigation: {
        nextEl: ".popup-swiper .swiper-button-next",
        prevEl: ".popup-swiper .swiper-button-prev",
    },
    */
    pagination: {
        el: ".popup-swiper .swiper-pagination",
        clickable: true,
    },
}); 
// 쿠키 가져오기
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
// 24시간 기준 쿠키 설정하기  
var setCookie = function (cname, cvalue, exdays) {
    var todayDate = new Date();
    todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));    
    var expires = "expires=" + todayDate.toUTCString(); // UTC기준의 시간에 exdays인자로 받은 값에 의해서 cookie가 설정 됩니다.
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
var cookiedata = document.cookie;
if($('.popup-swiper .swiper-slide').length && cookiedata.indexOf("popupclose")<0){
    $('#modalPopup').modal();
}
$('#popupBtn1Day').click(function(){
    setCookie("popupclose","Y", 1);
});
