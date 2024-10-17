$(function(){
    // dic
    function makeList(data){
        var pnHtml = '<a class="active" href="" data-group="1">1</a>';

        $('#lstDic').empty();
        l.html(data);

        l.find('.video-js').each(function(){
            $(this).find('.vjs-stop-control').trigger('click');
            this.player.width(564);
            this.player.height(Math.round(564*0.5626));
        });

        l.find('.slider-wrap:not(.evlt-slider-wrap) .swiper-container').each(function  (i) {
            var t = $(this);
            new Swiper(t, {
                nextButton: t.find('.swiper-button-next'),
                prevButton: t.find('.swiper-button-prev'),
                pagination: t.find('.swiper-pagination'),
                paginationClickable: true,
                observer: true,
                observeParents: true,
                effect: t.attr('data-effect'),
                touchRatio: 1
            });
        });

        l.find('.dic-ex').hide().parent().removeClass('open');


        l.find('.btn-dic-detail').click(function(){
            $(this).parent().toggleClass('open');
        });

        var max = l.children('li').length/4;

        l.children('li').length%4 && ++max;

        for (var i = 2; i <= max; i++){
            var pnInit = '';
            if(i>5){
                pnInit = 'not';
            }
            pnHtml = pnHtml+'<a class="'+pnInit+'" href="" data-group="'+Math.ceil(i/5)+'">'+i+'</a>';
        }

        if(l.find('li').length>20){
            pnHtml = '<a class="icon-pn" href=""></a>'+pnHtml+'<a class="icon-pn-next" href=""></a>';
        }
        pn.html(pnHtml);

        pn.find('a').not('[class^=icon-]').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            l.find('li.d-block').removeClass('d-block');
            l.find('li[data-group='+$(this).text()+']').addClass('d-block');
            l.find('.dic-ex').hide().parent().removeClass('open');
            l.find('.video-js').each(function(){
                $(this).find('.vjs-stop-control').trigger('click');
            });
            return false;
        });

        pn.find('[class^=icon-]').click(function(){
            var o = pn.find('a').not('[class^=icon-]').filter(':visible:last').next();
            if($(this).hasClass('icon-pn')){
                o = pn.find('a').not('[class^=icon-]').filter(':visible:first').prev();
            }
            if(o.hasClass('icon-pn') || o.hasClass('icon-pn-next')){
                return false;
            }
            pn.find('a:not(.not)').not('[class^=icon-]').addClass('not');
            pn.find('a[data-group='+o.attr('data-group')+']').removeClass('not');
            o.click();
            return false;
        });
    }

    function cho_hangul(str){
        var cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
        var result = "";
        var code = str.charCodeAt(0)-44032;
        if(code>-1 && code<11172){
            result = cho[Math.floor(code/588)];
        }
        if(result==='ㄲ'){
            result='ㄱ';
        } else if(result==='ㄸ'){
            result='ㄷ';
        } else if(result==='ㅃ'){
            result='ㅂ';
        } else if(result==='ㅆ'){
            result='ㅅ';
        } else if(result==='ㅉ'){
            result='ㅈ';
        }
        return result;
    }
    if($('#modalDic').length){
        // start
        var l = $('#lstDic');
        var dicList = $('#lstDic>li');
        var pn = $('#pnDic');
        var dicHtml = '',
            dicEx = '',
            dicI = 1;

        $.each(dicList,function(key,item){
            $(item).attr('data-group', Math.ceil(dicI/4)).find('.dic-ex').before('<button type="button" class="btn-dic-detail">자세히 보기</button>');
            if(dicI<5){
                $(item).addClass('d-block');
            }
            ++dicI;
        });

        makeList(dicList);

        // sort
        $('.dic-sort button').click(function(){
            var t = $(this);
            $('.dic-sort button').removeClass('active');
            t.addClass('active');
            $('ul.tab-dic').eq(t.parent().index()).removeClass('hide').siblings().addClass('hide');
            $(t.attr('data-target')).find('>li:first-child>[role=button]').trigger('click');
        });

        // tabDicChapter
        $('#tabDicChapter [role="button"]').click(function(){
            var dicI = 1,
                t = $(this),
                tI = Number(t.attr('data-href'));

            t.parent().addClass('active').siblings().removeClass('active');

            $.each(dicList,function(key,item){
                $(item).attr('data-group', Math.ceil(dicI/4));
                (dicI<5) ? $(item).addClass('d-block') : $(item).removeClass('d-block');
                ++dicI;
            });

            if(tI){
                dicI = 1;

                var dicChapterList = dicList.filter(function(idx, ele){
                    return $(ele).data('chapter') === tI;
                });

                $.each(dicChapterList,function(key,item){
                    $(item).attr('data-group', Math.ceil(dicI/4));
                    (dicI<5) ? $(item).addClass('d-block') : $(item).removeClass('d-block');
                    ++dicI;
                });
                makeList(dicChapterList);
            }else{
                makeList(dicList);
            }

            return false;
        });

        // tabDicAlphabet
        $('#tabDicAlphabet [role="button"]').click(function(){
            var dicI = 1,
                t = $(this),
                tI = t.attr('data-href');
            t.parent().addClass('active').siblings().removeClass('active');
            // make array
            var dicAlphabetList = dicList.slice();

            dicAlphabetList.sort(function(a,b){
                var a = $(a).find('.dic-title').text();
                var b = $(b).find('.dic-title').text();
                return(a < b) ? -1 : (a > b) ? 1 : 0;
            });

            $.each(dicAlphabetList,function(key,item){
                $(item).attr('data-group', Math.ceil(dicI/4));
                (dicI<5) ? $(item).addClass('d-block') : $(item).removeClass('d-block');
                ++dicI;
            });

            if(tI !== '0'){
                dicI = 1;

                var dicAlphabetSortList = dicAlphabetList.filter(function(idx, ele){
                    return cho_hangul($(ele).find('.dic-title').text()) === tI;
                });

                $.each(dicAlphabetSortList,function(key,item){
                    $(item).attr('data-group', Math.ceil(dicI/4));
                    (dicI<5) ? $(item).addClass('d-block') : $(item).removeClass('d-block');
                    ++dicI;
                });
                makeList(dicAlphabetSortList);
            }else{
                makeList(dicAlphabetList);
            }
            return false;
        });
    }
});
