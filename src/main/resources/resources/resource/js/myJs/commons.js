$(function () {

    //用户注销操作
    $("#logout").click(function () {

        $.get("user/logout",{},function (obj) {
            if(obj.code == 200){
                //成功
                //TODO:用户注销操作完成之后应该去首页,现在去的是登录，不是首页
                window.location.href='toLogin';
            }
            if(obj.code == 500){
                //报错页面
            }
        })
    });




});