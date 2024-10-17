var swiper = new Swiper(".og-gallery", {
    slidesPerView: 4,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
    navigation: {
        nextEl: '.og-gallery-next',
        prevEl: '.og-gallery-prev',
    },
    breakpoints: {
        1280: {
            slidesPerView: 3,
            slidesPerGroup: 1,
        },
        992: {
            slidesPerView: 2,
            slidesPerGroup: 1,
        },
        720: {
            slidesPerView: 1,
            slidesPerGroup: 1,
        }
    }
});

var schedulebullet = ['2021.12.15', '2021.12.16', '2021.12.17'];
var swiper2 = new Swiper(".schedule-wrp.ko", {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"><span>' + (schedulebullet[index]) + '</span></div>';
        }
    },
    navigation: {
        nextEl: '.scheduler-next',
        prevEl: '.scheduler-prev',
    },
});


var schedulebulletEn = ['Dec 15, 2021', 'Dec 16, 2021', 'Dec 17, 2021'];
var swiper3 = new Swiper(".schedule-wrp.en", {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"><span>' + (schedulebulletEn[index]) + '</span></div>';
        }
    },
    navigation: {
        nextEl: '.scheduler-next',
        prevEl: '.scheduler-prev',
    },
});

var mainSwiper = new Swiper(".mainSwiper", {
    speed:1500,
    loop: true,
    touchEventsTarget:'wrapper',
    pagination:true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    on:{
        slideChangeTransitionEnd: function(){
            if(this.activeIndex == 1){
                $('.main-visual .btn-area').hide();
            } else {
                $('.main-visual .btn-area').show();
            }
        }
    }
});
