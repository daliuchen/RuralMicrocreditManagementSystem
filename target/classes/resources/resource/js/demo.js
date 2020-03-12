/**
 * Created by zwq on 2017/7/6 0006.
 * 模块：暂无
 * 模块描述：暂无
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
    data:{
        cookie: document.cookie, //获取用户cookie
        userInfo:sessionStorage.getItem('userInfo'), //获取登陆用户信息
        href:window.location.href, //"http://localhost:8080/detail.html?id=001"
        host:window.location.host, //"localhost:8080"
        hash:window.location.hash, //"#/detail/001"
        hostname:window.location.hostname, //"localhost"
        origin:window.location.origin, //"http://localhost:8080"
        pathname:window.location.pathname, //"/detail.html?id=001"
        port:window.location.port, //"8080"
        protocol:window.location.protocol, //"http:"
        search:window.location.search //?id=001
    },
    bind:function(){
       var slf=this;
    }
};


