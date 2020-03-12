/**
 * Created by zwq on 2017/7/6 0006.
 * 功能：右键菜单
 */
$(function(){
    new rightMenuFun();
});

function rightMenuFun(){
    this.init();
}
rightMenuFun.prototype={
    init:function(){
        this.bind();

    },
    rightDefault:function(){
    //禁止掉浏览器自带的右键菜单
        document.oncontextmenu=function(){
            return false;
        }
    },
    bind:function(){
       var slf=this;
        slf.rightDefault();
        $(document).mousedown(function(e){
            var key= e.which;
            if(key==3){
                var _top= e.clientY;
                var _left= e.clientX;
                //得到鼠标的位置-》给menu添加位置
                $(".right-menu-nav").show().css({left:_left,top:_top});
            }
        })

    }
}
