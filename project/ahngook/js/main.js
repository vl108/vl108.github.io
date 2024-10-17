$('#quickMenu').hide();
$('.quick-btn, .close-quick').click(function(e){
	e.preventDefault();
    $('#quickMenu').slideToggle(300)
})

var mainSwiper = new Swiper(".main-slider", {
    speed:1500,
    effect: 'fade',
	fadeEffect: { 
		crossFade: true 
	},
    loop: true,
    navigation: {
        nextEl: '.main-slider-control .swiper-button-next',
        prevEl: '.main-slider-control .swiper-button-prev',
    },
    pagination:true,
    pagination: {
        el: ".main-slider-control .swiper-pagination",
        clickable: true
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    }
});

var prodbullet = ['레보텐션정', '시네츄라 시럽', '레토프라정', '레보살탄정', '루파핀정'];
var prodswiper = new Swiper('.main-prod-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    observer: true,
    observerParents: true,
    // autoplay: {
    // 	delay: 5000,
    // },
    navigation: {
        nextEl: '.main-prod .swiper-button-next',
        prevEl: '.main-prod .swiper-button-prev',
    },
    pagination:true,
    pagination: {
        el: '.main-prod .swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<div class="' + className + '"><span>' + (prodbullet[index]) + '</span></div>';
        }
    }
});

var centerSwiper = new Swiper ('.main-center-slider', {
    spaceBetween: 0,
    slidesPerView: 2,
    breakpoints: {
        767: {    
            slidesPerView:1,
        }
    }
});

var storySwiper = new Swiper ('.main-story-slider', {
    spaceBetween: 120,
    slidesPerView: 2,
    navigation: {
        nextEl: '.main-story .swiper-button-next',
        prevEl: '.main-story .swiper-button-prev',
    },
    breakpoints: {
        1600: {    
            spaceBetween: 80,
            slidesPerView: 2,
        },
        1200: {    
            spaceBetween: 50,
            slidesPerView:1,
        },
        768: {    
            spaceBetween: 0,
            slidesPerView:1,
        },
        575: {    
            spaceBetween: 30,
            slidesPerView:1,
        }
    }
});

$('.main-story-slide-item-inner')
    .mouseover(function(){
        $(this).addClass('mouseover');
    })
    .mouseleave(function(){
    $(this).removeClass('mouseover');
});

var counter1 = new CountUp("counter1", 0, 578160, 0, 1, {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
  //   prefix: "$"
});
      
var waypoint1 = new Waypoint({
    element: document.getElementById("waypoint1"),
    handler: function (direction) {
      if (direction == "up") {
        counter1.reset();
      } else {
        counter1.start();
      }
    },
    offset: "80%"
});
  
var counter2 = new CountUp("counter2", 0, 2909146, 0, 1, {
    useEasing: true,
    useGrouping: true,
    separator: ",",
    decimal: ".",
  //   prefix: "$"
});
      
var waypoint2 = new Waypoint({
    element: document.getElementById("waypoint2"),
    handler: function (direction) {
      if (direction == "up") {
        counter2.reset();
      } else {
        counter2.start();
      }
    },
    offset: "80%"
});

