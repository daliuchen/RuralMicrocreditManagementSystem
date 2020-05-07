/**
 * Created by zwq on 2018/5/30 0030.
 * 描述：全屏切换
 * 调用方式：
 * $.uiDommouseScroll.init({
    "scrollDom":document,  //滚动切换的区域，可不传使用默认值
    "scrollContainerDom":".cont",  //被切换的dom，可不传使用默认值
    "linkDom":".carousel-li",  //右侧选中页码对象，可不传使用默认值
    "topLinkDom":".scroll-link-top li",  //右侧选中页码，可不传使用默认值
    "pageNumber":0,  //当前页码，可不传使用默认值
    "time":400,   //页面切换时间，可不传使用默认值
    "goBottom":".goBottom"//乡下，可不传使用默认值
    });
 */

(function ($) {
    $.extend({
        uiDommouseScroll : {
            init:function (obj) {
                this.initOpts(obj);
                this.dommouseScroll();//滑动切换
                this.clickLink();//点击切换
                this.winResize();//窗口大小改变
            },
            //默认配置参数
            opts:{
                "scrollDom":document,  //滚动切换的区域
                "scrollContainerDom":".cont",  //被切换的dom
                "linkDom":".carousel-li",  //右侧选中页码
                "topLinkDom":".scroll-link-top li",  //右侧选中页码
                "pageNumber":0,  //当前页码
                "time":400,  //页面切换时间
                "winHeight":document.documentElement.clientHeight||document.body.clientHeight,
                "goBottom":".goBottom"
            },
            //初始化配置参数
            initOpts:function(obj){
                var than=this.opts;
                than.scrollDom=obj.scrollDom==undefined?document:obj.scrollDom;  //滚动切换的区域
                 than.scrollContainerDom=obj.scrollContainerDom==undefined?".cont":obj.scrollContainerDom;  //被切换的dom
                than.linkDom=obj.linkDom==undefined?".carousel-li":obj.linkDom;  //右侧选中页码
                than.topLinkDom=obj.topLinkDom==undefined?".scroll-link-top li":obj.topLinkDom;  //右侧选中页码
                than.pageNumber=obj.pageNumber==undefined?0:obj.pageNumber;  //当前页码
                than.time=obj.time==undefined?time:obj.time;  //页面切换时间
                than.winHeight=document.documentElement.clientHeight||document.body.clientHeight;
                than.goBottom=obj.goBottom==undefined?".goBottom":obj.goBottom;
            },
            //鼠标滚轮事件
            dommouseScroll:function(){
                var than=this,
                    opts=than.opts,
                    scrollDom=opts.scrollDom,
                    pageNumber=opts.pageNumber,
                    winHeight=opts.winHeight,
                    timet=opts.time,
                    scrollContainerDom=opts.scrollContainerDom,
                    linkDom=opts.linkDom,
                    topLinkDom=opts.topLinkDom,
                    goBottom=opts.goBottom;
                $(scrollDom).on("mousewheel DOMMouseScroll",function(e){
                    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
                    if (delta > 0) {
                        // 向上滚
                        if(pageNumber>0){
                            if(!$(scrollContainerDom).is(":animated")){
                                var num=parseInt(pageNumber)-1;
                                than.opts.pageNumber=pageNumber=num;
                                $(scrollContainerDom).animate({"margin-top":"-"+winHeight*num+"px"},timet);
                                $(linkDom).eq(num).addClass("active").siblings().removeClass("active");
                                $(topLinkDom).eq(pageNumber).addClass("active").siblings().removeClass("active");
                                $(goBottom).show();
                            }
                            //向下滚动
                        }else if(pageNumber==0){
                            than.opts.pageNumber=pageNumber=0;
                            $(scrollContainerDom).removeAttr("margin-top");
                            $(linkDom).eq(0).addClass("active").siblings().removeClass("active");
                            $(topLinkDom).eq(pageNumber).addClass("active").siblings().removeClass("active");
                            $(goBottom).show();
                        }

                    } else if (delta < 0) {
                        if(!$(scrollContainerDom).is(":animated")){
                            var num=pageNumber;
                            than.opts.pageNumber=pageNumber=num+1;
                            if(pageNumber==4){
                                pageNumber=3
                            }
                            if(num==0){
                                $(goBottom).show();
                            }else if(num==1){
                                $(goBottom).show();
                            }else if(num==2){
                                $(goBottom).hide();
                            }else if(num==3){
                                $(goBottom).hide();
                            }else{
                                than.opts.pageNumber=pageNumber=num=3;
                                $(goBottom).hide();
                            }
                            $(scrollContainerDom).animate({"margin-top":"-"+winHeight*pageNumber+"px"},timet);
                            $(linkDom).eq(pageNumber).addClass("active").siblings().removeClass("active");
                            $(topLinkDom).eq(pageNumber).addClass("active").siblings().removeClass("active");
                        }
                    }
                });
            },
            //点击切换
            clickLink:function () {
               var than=this,
                   opts=than.opts,
                   linkDom=opts.linkDom,
                   topLinkDom=opts.topLinkDom,
                   winHeight=opts.winHeight,
                   timtAm=opts.time,
                   scrollContainerDom=opts.scrollContainerDom,
                   pageNumber;
                $(linkDom).click(function(){
                    var _index=$(this).index();
                    a(_index);
                });
                $(topLinkDom).click(function(){
                    var _index=$(this).index();
                    a(_index);
                });
                function  a(_index) {
                    pageNumber=than.opts.pageNumber=_index;
                    if(!$(scrollContainerDom).is(":animated")){
                        $(scrollContainerDom).animate({"margin-top":"-"+(winHeight*parseInt(pageNumber))+"px"},timtAm);
                        $(topLinkDom).eq(pageNumber).addClass("active").siblings().removeClass("active");
                        $(linkDom).eq(pageNumber).addClass("active").siblings().removeClass("active");
                    }
                }
            },
            //窗口大小改变
            winResize:function () {
                var than=this,
                    opts=than.opts,
                    timtAm=opts.time,
                    scrollContainerDom=opts.scrollContainerDom,
                    winHeight=opts.winHeight=document.documentElement.clientHeight||document.body.clientHeight,
                    linkDom=opts.linkDom;
                $(window).resize(function(){
                    var acti=$(linkDom+".active").index();
                    $(scrollContainerDom).animate({"margin-top":"-"+winHeight*acti+"px"},timtAm);
                    window.location.reload();
                });

            }
        }
    })
})(jQuery);

//调用全屏切换
$.uiDommouseScroll.init({
    "scrollDom":document,  //滚动切换的区域，可不传
    "scrollContainerDom":".cont",  //被切换的dom，可不传
    "linkDom":".carousel-li",  //右侧选中页码对象，可不传
    "topLinkDom":".scroll-link-top li",  //右侧选中页码，可不传
    "pageNumber":0,  //当前页码，可不传
    "time":400,   //页面切换时间，可不传
    "goBottom":".goBottom"//乡下，可不传
});
