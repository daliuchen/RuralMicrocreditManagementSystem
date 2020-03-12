/**
 * Created by zwq on 2017/6/23
 * 功能描述：换肤、登录超时、退出等ui模块等公共方法
 */
$(function(){
    new publicFun();
});

function publicFun(){
    this.init();
    this.test();
}
publicFun.prototype={
    //初始化
    init:function(){
        var than=this;
        // 页面加载完毕前加载动画效果
        this.pageLoad();
        //动画基本路径执行动画
        this.performAnimation();
        //模态框居中
        this.modalCentered();
        //点击顶部按钮时收缩左侧菜单
        this.styleSidebarContraction();
        //左侧菜单的子菜单的点击显示隐藏
        this.styleSidebarSet();
        // 设置菜单的显示隐藏
        this.styleSetNav();
        //换肤效果
        this.setSkinPeeler("skinBg2");
        //测试时隐藏非测试的干扰模块（地址栏参数包含"test="字符，）
        this.test();
        //登录超时提醒
        this.overTimeOut();
        //退出
        this.logout();
        //验证用户是否登录
        //than.verifyUserLogged()
    },
    // 页面加载完毕前加载动画效果
    pageLoad:function(){
        $(window).load(function(){
            $(".loading-container").addClass("loading-inactive");
        })
    },
    //动画基本路径执行动画
    performAnimation:function(){
        $("a[data-animation]").bind("click",function(){
            var $obj=$(this);
            var $wait=$(this).data("data-animation") || 1300;
            var _attr=$obj.attr("data-animation");

            $obj.removeClass("animated-"+_attr);
            $obj.addClass("animated-"+_attr);
            setTimeout(function(){
                $obj.removeClass("animated-"+_attr);
            },$wait);
        })
    },
    //模态框居中
    modalCentered:function(){
        $(".modal").on("show.bs.modal",function(){
            var $this=$(this);
            var $modal_dialog=$this.find(".modal-dialog");
            $this.css("dislay","block");
            var _clientHeight=document.documentElement.clientHeight || document.body.clientHeight;
            console.log($modal_dialog.find("modal-content").height());
           // $modal_dialog.css({"height":_clientHeight+"px","margin-top":Math.max($(window).height()-$this.height())/2+"px auto"});
        })
    },
    //点击顶部按钮时收缩左侧菜单
    styleSidebarContraction:function(){
        $("#sidebar-collapse").bind("click",function(){
            $("body").toggleClass("sidebar-collapse");
        });
    },
    //左侧菜单的子菜单的点击显示隐藏
    styleSidebarSet:function(){
        $(".menu-dropdown").bind("click",function(){
            var _par=$(this).parent();
            $(_par).find("ul").end().toggleClass("active open").siblings().removeClass("active open");
        })
    },
    //设置菜单的显示隐藏
    styleSetNav:function(){
        $(".set-switcher-heading-icon").bind("click",function(){
            $("#setBox").toggleClass("open");
            
        });
    },
    //换肤效果
    setSkinPeeler:function(skinBgObj){
        var sef=this;
        $(".style-switcher-color").off("click").on("click",function(){
            debugger
            var bg=$(this).attr("data-color");
            sef.delCookie(skinBgObj);
            sef.setCookie(skinBgObj,bg);
           // sef.skinPeeler();
            sef.skinPeeler(skinBgObj)
        });
        sef.skinPeeler(skinBgObj)
    },
    //测试是隐藏非测试的干扰模块（地址栏参数包含"test="字符，）
    skinPeeler:function(skinBgObj){
        var than=this;
        var _bg="layout-";
        var _cookieName=skinBgObj+"=";
        var _cookie=document.cookie;
        if(_cookie.indexOf(_bg)==-1){
        }else{
            _cookie=document.cookie;
            var _index=_cookie.indexOf(_cookieName);
            if(_index!=-1){
                var a=than.getCookie(skinBgObj);
                $("body").attr("class",a);
            }
        }
    },
    //设置Cookie
    setCookie:function(name,value){
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
    },
    //获取Cookie
    getCookie:function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

        if(arr=document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    },
    //删除Cookie
    delCookie:function(name){
        var than=this;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=than.getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    } ,
    //测试时隐藏非测试的干扰模块（地址栏参数包含"test="字符，）
    test:function () {
        var str=window.location.href;
        var indexA=str.lastIndexOf("/");
        var indexA=str.substring(indexA,str.length);
        var indexB=indexA.indexOf(".");
        var indexC=indexA.substring(1,indexB);
        if(indexA.indexOf("test")!=-1){
            if(indexC!="index"){
                $("head").append('<link href="../css/test.css" rel="stylesheet">');
            }else{
                $("head").append('<link href="static/css/test.css" rel="stylesheet">>');
            }
        }

    },
    //登录超时提醒
    overTimeOut:function () {
        var than=this;
        var lastTime = new Date().getTime();
        var currentTime = new Date().getTime();
        var timeOut = 30 * 60 * 1000; //设置超时时间： 10分

        $(function(){
            /* 鼠标移动事件 */
            $(document).mouseover(function(){
                lastTime = new Date().getTime(); //更新操作时间
            });
        });

         var testTime=function(){
            currentTime = new Date().getTime(); //更新当前时间
            if(currentTime - lastTime > timeOut){ //判断是否超时
                alert("登录超时");
                //sessionStorage.token=token
                sessionStorage.removeItem("admin_token");
                than.redirectLogin();//重定向到登录页面
            }
        };

        /* 定时器  间隔1秒检测是否长时间未操作页面  */
        window.setInterval(testTime, 1000);
    },
    //退出登录
    logout:function(){
        $(".btnLogout").on("click",function () {
            sessionStorage.removeItem("admin_token");
        });
    },
    //验证用户是否登录
    verifyUserLogged:function () {
        var than=this;
        debugger
       var admin_token= sessionStorage.getItem('admin_token');
       if(admin_token==undefined||admin_token==null){
           than.redirectLogin();//重定向到登录页面
       }
    },
    //重定向到登录页面
    redirectLogin:function(){
        var hrefA=window.location.href;
        if(hrefA.lastIndexOf("index.html")!=-1){
            window.location.href="static/html/login.html";
        }else {
            window.location.href="login.html";
        }
        sessionStorage.removeItem("admin_token")
    }
};








