$(function () {


    $("#newPassword").click(function () {
        var val = $("#oldPassword").val();
        if(val.trim() == "" || val.length == 0){
            alert("请填写旧密码")
        }
    });

    $("#newPassword").blur(function () {
       var val = $(this).val();
       var val1 = $("#oldPassword").val();
       if(val.trim() != val1.trim()){
           //bu相等
           alert("两次填写的密码不一样")
       }
    });



    $("#saveBtn").click(function () {

            $.post("user/modifyPassword",
                     $("form").serialize(),
                     function (obj) {
                        if(obj.code ==200){
                            alert("修改密码成功现在去登录")
                            $.get("logout",{},function (obj) {
                                if(obj.code==200){
                                    window.location.href="toLogin";
                                }
                            },"json");
                        }
                        if(obj.code==300){
                            alert(obj.msg);
                        }
                         if(obj.code==301){
                             alert(obj.msg);
                         }
                     },
                    "json");

    });

});