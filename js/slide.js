/**
 * slide carousel
 * author:xugongyang
 * date: August 15, 2017
 */
;(function($) {
    $.fn.slideCarsousel=function(settings){
        settings = $.extend({}, $.fn.slideCarsousel.defaultSetting, settings);
        var wrapper=$(this),ul=wrapper.children('ul.item-list'),liList=ul.children();
        var slide={
            slideCarousel:wrapper,
            count:liList.length,
            ul:ul,
            liList:liList,
            currentIndex:0,
            indicatorList:wrapper.children('.indicator-list').children('a'),
            itemPrev:wrapper.children('.controls').children('.item-prev'),
            itemNext:wrapper.children('.controls').children('.item-next'),
            itemClassArr:[],
            init:function(){
                var i=0,length=slide.count;
                for(;i<length;i++){
                    slide.itemClassArr.push('item'+i);
                }
                //自动播放
                slide.slideAutoChange();
            },
            slideAutoChange:function(){
                if(settings.isAutoChange){
                    settings.slideInterval= setInterval(function() {
                        slide.toNext();
                    }, settings.direction);
                }
            },
            toNext:function(){
                //在数组第一个元素 添加元素
                slide.itemClassArr.unshift(slide.itemClassArr[slide.count-1]);
                //删除数组最后一个元素
                slide.itemClassArr.pop();
                slide.currentIndex++;
                slide.currentIndex=slide.currentIndex>=slide.count?0:slide.currentIndex;
                slide.resetItemClass();
            },
            toPrev:function(){
                slide.itemClassArr.push(slide.itemClassArr[0]);
                //删除数组中最后一个元素
                slide.itemClassArr.shift();
                slide.currentIndex--;
                slide.currentIndex=slide.currentIndex<0?slide.count-1:slide.currentIndex;
                slide.resetItemClass();
            },
            processIndicatorEvent:function(indicatorIndex){
                /*itemClassArr class需要重组 与之前的上一个、下一个区别在于 切换部分的class不确定
                 * 如果选取的下标小于 标记下标 元素需要向后放 相当于itemPrev 执行
                 * 如果选取的下标大于 标记下标 元素需要向前放置 相当于 itemNext 执行
                 * 如果选取下标与标记下标相等  不做任何修改
                 */
                var diffVal=indicatorIndex-slide.currentIndex;
                if(diffVal==0){
                    return;
                }
                slide.currentIndex=indicatorIndex;
                if(diffVal>0){
                    //改变原始数组 取出slide.itemClassArr.length-diffVal 位置开始到最后一个元素
                    var tempClassArr=slide.itemClassArr.splice(slide.itemClassArr.length-diffVal);
                    slide.itemClassArr=$.merge(tempClassArr,slide.itemClassArr);
                    slide.resetItemClass();
                    return ;
                }
                if(diffVal<0){
                    var tempClassArr=slide.itemClassArr.splice(0,-diffVal);
                    slide.itemClassArr=$.merge(slide.itemClassArr,tempClassArr);
                    slide.resetItemClass();
                    return;
                }
            },
            resetItemClass:function(){
                $.each(slide.liList,function(index,item){
                    $(item).removeClass().addClass(slide.itemClassArr[index]);
                });
                slide.indicatorList.removeClass('selected').eq(slide.currentIndex).addClass('selected');
                slide.processCallbackFunc(slide.currentIndex);//回调
            },
            processCallbackFunc:function(index){
                if(settings.callbackFunc!=null&&settings.callbackFunc!=undefined){
                    settings.callbackFunc(index);//回调
                }
            },
        }
        slide.init();
        slide.itemNext.click(function(){
            slide.toNext();
        });
        slide.itemPrev.click(function(){
            slide.toPrev();
        });
        //指示器事件 click 或 mouseover
        switch(settings.indicatorEvent){
            case 'click':
                slide.indicatorList.click(function(){
                    slide.processIndicatorEvent($(this).attr('data-slide-index'));
                });
                break;
            case 'mouseover':
                slide.indicatorList.mouseover(function(){
                    slide.processIndicatorEvent($(this).attr('data-slide-index'));
                });
                break;
        }
        //轮播模式 2d 或 3d
        switch(settings.slideType){
            case '2d':
                break;
            case '3d':
                slide.ul.on('click','.item1 img',function(){
                    slide.toPrev();
                });
                slide.ul.on('click','.item3 img',function(){
                    slide.toNext();
                });
                break;
        }
        //鼠标悬浮外层盒子  定时器关闭与开启
        slide.slideCarousel.mouseover(function(){
            clearInterval(settings.slideInterval);
        }).mouseleave(function(){
            slide.slideAutoChange();
        });
    }
    // the default setting
    $.fn.slideCarsousel.defaultSetting = {
        slideInterval :'slideInterval', // interval of slide
        isAutoChange :true, // true or false
        direction : 5000, // time interval between
        callbackFunc:null, // if it is not empty, it will execute
        indicatorEvent:'click', // indicator event,supports click or mouseover
        slideType:'2d' //  2d or 3d
    }
})(jQuery);
