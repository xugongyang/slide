# slide carousel
### There are 2d and 3d slide in the project 
### Style files are written in less. So you might need to compile it.
### In addition, the project supports custom parameters.

#### the default setting
```
      $.fn.slideCarsousel.defaultSetting = {
        slideInterval :null, // interval of slide
        isAutoChange :true, // true or false
        direction : 5000, // time interval between
        callbackFunc:null, // if it is not empty, it will execute
        indicatorEvent:'click', // indicator event,supports click or mouseover 
        slideType:'2d' //  2d or 3d
     }
```

#### how to use 
```
<script src="../js/slide-min.js"></script>
<script>
    $(function(){
        var slideInterval=null;
        $('.slide-carousel').slideCarsousel({slideInterval:slideInterval,slideType:'3d',indicatorEvent:'mouseover'});
    });
</script>
```

#### html
```
 <div class="slide-carousel">
            <ul id="itemList" class="item-list clearfix" count="10">
                <li class="item0">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner1.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item1">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner2.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item2">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner3.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item3">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner4.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item4">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner5.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item5">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner6.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item6">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner7.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item7">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner8.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item8">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner9.jpg" alt="">
                        </a>
                    </div>
                </li>
                <li class="item9">
                    <div class="item-content">
                        <a href="javascript:void(0);">
                            <img class="cover-img" src="../image/banner10.jpg" alt="">
                        </a>
                    </div>
                </li>
            </ul>
            <!--indicators-->
            <div class="indicator-list">
                <a href="javascript:void(0);" data-slide-index="0" class="selected"></a>
                <a href="javascript:void(0);" data-slide-index="1"></a>
                <a href="javascript:void(0);" data-slide-index="2"></a>
                <a href="javascript:void(0);" data-slide-index="3"></a>
                <a href="javascript:void(0);" data-slide-index="4"></a>
                <a href="javascript:void(0);" data-slide-index="5"></a>
                <a href="javascript:void(0);" data-slide-index="6"></a>
                <a href="javascript:void(0);" data-slide-index="7"></a>
                <a href="javascript:void(0);" data-slide-index="8"></a>
                <a href="javascript:void(0);" data-slide-index="9"></a>
            </div>
            <!--controls-->
            <div class="controls">
                <a id="itemPrev" class="item-prev glyphicon glyphicon-menu-left" href="javascript:void(0);"></a>
                <a id="itemNext" class="item-next glyphicon glyphicon-menu-right" href="javascript:void(0);"></a>
            </div>
            <!--desc-->
            <div class="desc">
                <a href=""><strong id="sliderDesc"></strong></a>
      </div>
```

#### slide common less
```
.slide-carousel{width: 100%;height: 100%;position: relative;overflow: hidden;
  .item-list{position:relative;height: 100%;width:100%;overflow: hidden;
    li{
      .item-content{width:100%;height: 100%;
        a{display: block;width:100%;height: 100%;
          .cover-img{width:100%;height: 100%;}
        }
      }
    }
  }
  .indicator-list{position: absolute;bottom:20px;left:50%;margin-left: -63px;z-index: 100;
    a{display: inline-block;width: 12px;height: 12px;border: 2px solid #fff;border-radius:50%;overflow: hidden;background-color: #ccc;margin-left: 5px;
      &.selected{border-color: #ff6700;background-color: #5fff92;}
    }
  }
  .controls{opacity: 0;
    a{cursor: pointer;text-decoration: none;width:40px;height: 60px;position: absolute;background-color:rgba(0,0,0,0.2);color:#fff;font-size: 35px;padding-top: 25px;z-index: 2;
      &:hover{background-color:rgba(0,0,0,0.5);}
    }
    .item-prev{top:50%;left: 0;margin-top: -42px;}
    .item-next{top:50%;right: 0;margin-top: -42px;}
  }
  .desc{height: 72px;width:100%;position: absolute;bottom: 0;left: 0;background-color:rgba(0,0,0,0.6);z-index: 99;
    strong{color:#fff;font-size: 20px;line-height: 72px;margin-left: 20px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  }
  &:hover .controls{opacity: 1;transition: opacity 0.5s ease;}
}
```
#### slide 3d less
```
@itemX-3d:225px;
.itemDefault(@translateX:@itemX-3d,@scale:0.8){
  transform: translate3d(@translateX, 0, 0) scale(@scale);
}

header .banner{width:1200px;height: 300px;margin: 100px auto 0;
  .slide-carousel .item-list li{width:750px;height: 300px;transition: all 0.5s ease-out;opacity: 0;position: absolute;top:0;left: 0;
    &.item0{.itemDefault(@itemX-3d*-1);}
    &.item1{ transform: translate3d(0, 0, 0) scale(0.8);transform-origin: 0 50%;opacity: 1;z-index: 2;}
    &.item2{ transform: translate3d(@itemX-3d, 0, 0) scale(1);transform-origin: 0 50%;opacity: 1;z-index: 3;}
    &.item3{ transform: translate3d(@itemX-3d*2, 0, 0) scale(0.8);transform-origin: 100% 50%;opacity: 1;z-index: 2;}
    &.item4{.itemDefault(@itemX-3d*3);}
    &.item5{.itemDefault(@itemX-3d*4);}
    &.item6{.itemDefault(@itemX-3d*5);}
    &.item7{.itemDefault(@itemX-3d*6);}
    &.item8{.itemDefault(@itemX-3d*7);}
    &.item9{.itemDefault(@itemX-3d*8);}
  }
}
```

####  slide 2d less
```
@itemX-2d:1200px;
.itemDefault(@translateX:@itemX-2d){
  transform: translateX(@translateX);
}

header .banner{width:1200px;height: 300px;margin: 100px auto 0;
  .slide-carousel .item-list li{width:1200px;height: 300px;transition: all 0.5s ease-out;position: absolute;top:0;left: 0;
    &.item0{.itemDefault(@itemX-2d*-1);}
    &.item1{.itemDefault(@itemX-2d*0);}
    &.item2{ .itemDefault(@itemX-2d);}
    &.item3{.itemDefault(@itemX-2d*2);}
    &.item4{.itemDefault(@itemX-2d*3);}
    &.item5{.itemDefault(@itemX-2d*4);}
    &.item6{.itemDefault(@itemX-2d*5);}
    &.item7{.itemDefault(@itemX-2d*6);}
    &.item8{.itemDefault(@itemX-2d*7);}
    &.item9{.itemDefault(@itemX-2d*8);}
  }
}
```




