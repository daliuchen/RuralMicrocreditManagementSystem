$(function () {


    //验证用户是否存在
    $("#idCard").blur(function () {
        var val = $(this).val();
        $.get("isExist",
            {idCard:val.trim()},
            function (obj) {
                if(obj.code == 200){

                }else{
                    alert("还没有注册，去注册吧");
                    window.location.href="regiest";
                }
            },"json");

    });
    var interval=null;


    //点击获取验证码
    $("#getCodeBtn").click(function () {
        $.get("getRCode",
            {email:$("#email").val().trim()},
            function (obj) {
                if(obj.code == 200){
                    alert("发送成功，请前往邮箱查看")
                    $("#getCodeBtn").attr("disabled","disabled");
                    //提示时间
                    var count=60;
                     interval = setInterval(function () {
                        $("#getCodeBtn").text(count+"秒后重试");
                        count--;
                        if(count ==0){
                            clearInterval(interval);
                            $("#getCodeBtn").removeAttr("disabled");
                            $("#getCodeBtn").text("获取验证码");
                        }
                    },1000);
                }else{
                    alert("网络出错，请前往柜台办理")
                }
            },
            "json");
    });


    //验证两次密码是否一样
    $("#password2").blur(function () {
        var val = $("#password1").val();
        var val2 = $("#password2").val();
        if(val != val2){
            alert("两次输入不一致")
        }
    });


    //提交
    $("#submit").click(function () {
        alert("1")
        $.post("user/retriveve",$("form").serialize(),
                function (obj) {
                    if(obj.code == 200){
                        //清除
                        clearInterval(interval);
                        //去登录Y额面
                        alert("找会密码成功，去登录吧!");
                        window.location.href="toLogin"
                    }
                },"json");
    })



});














