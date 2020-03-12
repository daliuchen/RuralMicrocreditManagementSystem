/**
 * Created by zwq on 2018/6/12 0012.
 */

//获取当前数据的id,如果是修改，地址栏或 iframe 会传过来
var formId=getUrlParam("id");

//layui
layui.use(['form', 'layedit', 'laydate'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate;

    var $ = layui.$;  //如果没有引入jquery库，可以使用layui的$对象代替
    formOperation.init(form,layer,layedit,laydate);
    // //表单验证
    // formOperation.validationInit(form,layedit);
    //
    // //初始化日期时间控件，如果有则调用此方法，没有则不调用
    // //1:layer的时间方法，2:需要初始化时间控件的标签，数组格式
    // formOperation.dateInit(laydate,formOperation.ops.dateDomName);
    //
    // //开关
    // //1:form对象，2：layer对象，3:需要初始化的开关标签，数组格式
    // formOperation.switchInit(form,layer,formOperation.ops.switchDomName);
    //
    // //保存方法
    // //1:form对象，2：layer对象，3:保存按钮的id
    // formOperation.saveSubmit(form,layer,formOperation.ops.submitBtn);
});

//相关操作
var formOperation={
    //相关配置
    ops:{
        submitBtn:"form_demo_save_submit", //保存按钮的id
        dateDomName:["#date","#date1"], //时间控件的id或者class,可能会存在多个，所以用数组接收
        switchDomName:["switchTest","switchTest1"] //开关控件的id或者class,可能会存在多个，所以用数组接收
    },
    //相关请求url
    url:{
        getOneDate:"/user/oneDateById",
        add:"/user/add",
        update:"/user/update"
    },
    init:function(form,layer,layedit,laydate){
        //表单验证
        formOperation.validationInit(form,layedit);

        //初始化日期时间控件，如果有则调用此方法，没有则不调用
        //1:layer的时间方法，2:需要初始化时间控件的标签，数组格式
        formOperation.dateInit(laydate,formOperation.ops.dateDomName);

        //开关
        //1:form对象，2：layer对象，3:需要初始化的开关标签，数组格式
        formOperation.switchInit(form,layer,formOperation.ops.switchDomName);

        //保存方法
        //1:form对象，2：layer对象，3:保存按钮的id
        formOperation.saveSubmit(form,layer,formOperation.ops.submitBtn);
    },
    //初始化时间控件
    dateInit:function(laydate,dateDomName){
        if(laydate!=undefined && dateDomName!=undefined){
            for(var i=0; i<dateDomName.length; i++){
                laydate.render({
                    elem: dateDomName[i]
                });
            }
        }else{
            alert("laydate或者时间标签传参不正确");
        }
    },
    //监听指定开关
    switchInit:function(form,layer,switchDomName){
        for(var i=0; i<switchDomName.length; i++){
            form.on('switch('+switchDomName[i]+')', function(data){
                layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
                    offset: '6px'
                });
                layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
            });
        }
    },
    //表单验证
    validationInit:function(form,layedit){
        //创建一个编辑器
        var editIndex = layedit.build('LAY_demo_editor');

        //自定义验证规则
        form.verify({
            username: function(value){
                if(value.length < 4){
                    return '用户名至少得4个字符啊';
                }
            }
            ,pass: [/(.+){6,12}$/, '密码必须6到12位']
            ,wealth:[/^([1-9]\d*|0)(\.\d{0,2})?$/,"必须是整数或两位小数"]
            ,content: function(value){
                layedit.sync(editIndex);
            }
        });
    },
    //保存的点击事件
    saveSubmit:function(layuiForm,layer,btnName){
        var sef=this;
        //layer.open({title:"查看信息",area:["100px","350px"],content:"1235"});
        //监听提交
        layuiForm.on('submit('+btnName+')', function(data){
            var data=data.field;
            sef.saveDetail(layer,data);//由于只是模拟保存效果，所以展示一下要保存的数据，实际项目中并不需要调用此方法

            //如果后台新增与修改接口是分开的
            //根据有无ID判断是“新增”还是“修改”，调用对应的接口
            //如果后台的“新增”和“修改”是一个则前台不需要判断,直接调用保存方法就好
            if(formId==null || formId==undefined){
               // sef.saveFun(layer,data,formOperation.url.add); //由于没有后台只是模拟调用所掉以暂时注释此方法
            }else{
               // sef.saveFun(layer,data,formOperation.url.update);//由于没有后台只是模拟调用所掉以暂时注释此方法
            }
            return false;
        });
    },
    //将保存的数据展示一下
    saveDetail:function(layer,data){
        var str='ID：'+ (formId?formId:"")+"<br>" +
            '姓名：'+ (data.username?data.username:"")+"<br>" +
            '性别：'+ (data.sex?data.sex:"")+"<br>" +
            '城市：'+ (data.city?data.city:"")+"<br>" +
            '签名：'+ (data.sign?data.sign:"")+"<br>" +
            '积分：'+ (data.experience?data.experience:"")+"<br>" +
            '评分：'+ (data.score?data.score:"")+"<br>"+
            '职业：'+ (data.classify?data.classify:"")+"<br>" +
            '财富：'+ (data.wealth?data.wealth:"")+"<br>";
        layer.open({title:"保存的数据如下",area:["100px","350px"],content:str});
    },
    //保存的请求
    saveFun:function(layer,data,url){
        $.ajax({
            url : url,
            type : "POST",
            dataType : "json",
            data : data,
            success : function(result){
                if(result.status == 200){

                } else {
                    layer.msg(result.msg, {
                        icon : 5,
                        time : 3000
                    });
                }
            },
            error : function(result){
                //关闭loading
                layer.close(global.loding);
                //将结果返回给父页面
                window.parent.set_result(result);
                //弹框提示
                layer.msg("服务器出错,请联系管理员", {
                    icon : 5,
                    time : 3000
                });
            }
        });
    }
};