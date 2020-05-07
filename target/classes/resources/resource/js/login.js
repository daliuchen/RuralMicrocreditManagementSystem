var loginObj={
    url:"role/login",
    init:function () {
        this.loginBind();//登录
    },
    loginBind:function () {
        var than=this;
        $("#loginForm").bootstrapValidator();
        $(".btn-login").off("click").on("click",function () {
            var me=$(this);
             $('#loginForm').data('bootstrapValidator').validate();//启用验证
            var flag = $('#loginForm').data('bootstrapValidator').isValid();//验证是否通过true/false
            if(flag==true){
                var loginData={};
                $("#loginForm [name]").each(function (index,val,arr) {
                    var me=$(val),
                        oNme=me.attr("name"),
                        oVal=me.val();
                    loginData[oNme]=oVal;
                });
                than.loginRequest(loginData,me);
            }
        });
    },
    loginRequest:function (data,dom) {
        var than=this;
        $.ajax({
            type : "post",
            url : than.url,
            data : data,
            contentType:"application/json",
            success : function(data){
                data=data;
                if(typeof  data =="string"){
                    data=JSON.parse(data)
                }
                if(data.status==200){
                    $.promptMmessage({text:data.msg,status:0},true);
                    window.setTimeout(function () {
                        var webName=window.location.pathname;
                        webName1=(webName.match(/([^\/]*\/){1}([^\/]*)/)[2]);
                        window.location.href=window.location.origin+"/"+webName1+"/"+dom.attr("data-href");
                    },500)
                    sessionStorage.admin_token=data.token
                }else {
                    $.promptMmessage({text:data.msg,status:3},true);
                }
            },
            error : function(data){
                alert("请求失败");
            },
            complete : function(XMLHttpRequest, textStatus) {

            }
        });
    }

};
loginObj.init();
