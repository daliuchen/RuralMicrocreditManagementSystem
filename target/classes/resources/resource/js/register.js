/**
 * Created by zwq on 2017/7/11 0011.
 * 功能：注册
 */


/*

TODO:这里的代码可要可不要，
    如果有，在注册页面上有很多的判断
    如果没，就很简单

 */
var registerObj={
    url:"role/register",
    init:function(){
        this.uploadImgClick();//上传头像预览
        this.registerBind();//注册
    },
    //点击上传头像
    uploadImgClick:function(){
        var slf=this;
        $("#uploadImg").bind("click",function(){
            $("#uploadInput").click();

        })
    },
    //上传头像改变
    uploadInputClick:function(){
        var self=this;
        $("#uploadInput").bind("change",function(){
            self.uploadInputBind();
        })
    },
    //转码上传的图片
    uploadInputBind:function(){
        var self=this;
        var pic = document.getElementById("uploadImg"),
            file = document.getElementById("uploadInput");
        var ext=file.value.substring(file.value.lastIndexOf(".")+1).toLowerCase();
        if(ext!='png' && ext!='jpg' && ext!='jpeg' && ext!='png' && ext!='gif'){
            alert("图片格式不正确");
            return;
        }
        var isIE = navigator.userAgent.match(/MSIE/)!= null,
            isIE6 = navigator.userAgent.match(/MSIE 6.0/)!= null;

        if(isIE) {
            file.select();
            var reallocalpath = document.selection.createRange().text;

            if (isIE6) {
                pic.src = reallocalpath;
                pic.style.height="100px";
            }else {
                pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
                pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

            }
        }else {
            self.uploadImg(file);
        }
    },
    //预览图片
    uploadImg:function(file){
        var file = file.files[0];
        var reader = new FileReader();
        var size=Math.round((file.size)/1024);//图片大小默认是以字节为单位，转为KB后取整
        console.log(file);
        reader.readAsDataURL(file);
        // if(size>500){
        //     alert("图片大小不能超过500KB");
        //     return;
        // }
        reader.onload = function(e){
            var pic = document.getElementById("uploadImg");
            pic.src=this.result;
            console.log(size);//图片大小
            $(".btn-download").attr("href",this.result)
        }
    },
    //点击注册
    registerBind:function () {
        var than=this;
        var formObj=$(".btn-register").attr("data-filter");
        $(formObj).bootstrapValidator();
        $(".btn-register").off("click").on("click",function () {
            $(formObj).data('bootstrapValidator').validate();//启用验证
            var flag = $(formObj).data('bootstrapValidator').isValid();//验证是否通过true/false
            if(flag==true){
                var me=$(this);
                var form=me.attr("data-filter");
                var dataObj={};
                $(form+" [name]").each(function (index,val,arr) {
                    var inV=$(val);
                    dataObj[inV.attr("name")]=inV.val()
                });
                than.registerRequest(dataObj,me);
            }
        })
    },
    //注册请求
    registerRequest:function (data,dom) {
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
                        window.location.href=dom.attr("data-href");
                    },2000)
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
registerObj.init();
