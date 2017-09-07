/**
 * slide carousel
 * author:xugongyang
 * date: August 15, 2017
 */
;(function($) {
    // slide mobile
    $.fn.slideMobile =function(settings){
        settings = $.extend({}, $.fn.slideMobile .defaultSetting, settings);
        var wrapper=$(this),ul=wrapper.children('ul.item-list'),liList=ul.children('.item');
        var slide={
            slideCarousel:wrapper,
            itemList:ul,
            itemWidth:parseInt(ul.attr('itemWidth')),
            count:liList.length,
            currentIndex:0, //指示器下标 初始值 0
            translateX:parseInt(ul.attr('translateX')),// 选项位移
            tempX:0,
            indicatorList:wrapper.children('.indicator-list').children('a'),
            startPageX:0, //滑动起始位置
            endPageX:0, //结束滑动的位置
            movePageX:0, //移动位置
            halfWidth:settings.halfWidth,
            processIndicator:function(targetIndex){
                if(slide.currentIndex==targetIndex){return;}
                if(settings.isAutoChange){clearInterval(settings.slideInterval);}
                slide.tempX=slide.tempX + slide.itemWidth*(slide.currentIndex-targetIndex);
                slide.currentIndex=targetIndex;
                slide.itemList.stop().animate({marginLeft:slide.tempX+'px'},settings.animateTime,function(){
                    if(slide.currentIndex<0) {
                        slide.currentIndex = slide.count - 1;
                        slide.tempX = -slide.itemWidth *(slide.count-1)+slide.translateX;
                        slide.itemList.css('marginLeft',slide.tempX+'px');
                    }
                    if(slide.currentIndex==slide.count){
                        slide.currentIndex=0;
                        slide.tempX=slide.translateX;
                        slide.itemList.css('marginLeft',slide.tempX+'px');
                    }
                    slide.indicatorList.removeClass('selected').eq(slide.currentIndex).addClass('selected');
                    slide.slideAutoChange();
                });
            },
            toNext:function(){
                slide.processIndicator(slide.currentIndex+1);
            },
            toPrev:function(){
                slide.processIndicator(slide.currentIndex-1);
            },
            slideAutoChange:function(){
                if(settings.isAutoChange){
                    settings.slideInterval= setInterval(function() {
                        slide.toNext();
                    }, settings.direction);
                }
            },
            init:function(){
                slide.tempX=slide.translateX;
                switch(settings.indicatorEvent){
                    case 'click':
                        slide.indicatorList.click(function(){
                            var targetIndex=parseInt($(this).attr('data-slide-index'));
                            slide.processIndicator(targetIndex);
                        });
                        break;
                    case 'mouseover':
                        slide.indicatorList.mouseover(function(){
                            var targetIndex=parseInt($(this).attr('data-slide-index'));
                            slide.processIndicator(targetIndex);
                        });
                        break;
                }
                slide.slideAutoChange();
            }
        }
        slide.init();

        slide.itemList[0].addEventListener('touchstart',function(e){
            slide.startPageX=e.changedTouches[0].pageX;
        });
        slide.itemList[0].addEventListener('touchmove',function(e){
            slide.movePageX=e.changedTouches[0].pageX;
            var tempX=slide.tempX+slide.movePageX-slide.startPageX;
           slide.itemList.css('marginLeft',tempX+'px');
        });
        slide.itemList[0].addEventListener('touchend',function(e){
            slide.endPageX=e.changedTouches[0].pageX;
            var tempPageX=slide.startPageX-slide.endPageX;
            slide.startPageX=0;
            slide.movePageX=0;
            slide.endPageX=0;
            if(tempPageX>=slide.halfWidth){
                slide.toNext();
                return;
            }
            if(-tempPageX>=slide.halfWidth){
                slide.toPrev();
                return;
            }
            slide.itemList.css('marginLeft',slide.tempX+'px');
        });
    }
    // slide tab default setting
    $.fn.slideMobile.defaultSetting = {
        slideInterval :'slideInterval', // interval of slide
        isAutoChange :true, // true or false
        direction : 5000, // time interval between
        callbackFunc:null, // if it is not empty, it will execute
        indicatorEvent:'click', // indicator event,supports click or mouseover
        animateTime:500,
        halfWidth:375
    }


})(jQuery);
