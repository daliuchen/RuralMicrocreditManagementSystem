/**
 * Created by zwq on 2018/1/19 0019.
 * 列表渲染
 */
//是否是测试状态
var statusTest=true;
var _myData={
    init:function () {
       this.myTable();
       this.domEvent();
    },
    url:{
        list:"user/list",
        findById:"001",
        add:'user/add',
        update:'user/update',
        deleteByIds:"user/del"
    },
    ops:{
        tableName:"",
        searchBtn:"",
        searchInput:""
    },
    myTable:function () {

    },
    domEvent:function () {

    }
};
//test001();
function test001() {
    $.ajax({
        type: "post",
        url:"http://localhost:63343/web_template/static/user/list",
        async: false,
        dataType: "json",
        error: function () {
            $.promptMmessage({text:"请求失败！",status:3},true);
        },
        success: function (res) {
            debugger
        }
    });
}

//表格相关设置
var tableSet={
    id:"demo",
    toolName:"layui-table", //toolName,工具栏所在主体
    checkboxName:"layui-table", //checkboxName,复选框所在主体
    btnGroup:".demoTable .layui-btn",
    toolBtnGroupName:"#barDemo"
};
//tableSet.toolBtnGroupName

//url相关请求
var tableUrl={
    list:"../json/user.json",
    //list:"http://20181024Mock.com/user/list",
    edit:"tableLayuiForm.html",
    del:"delList?id="
};

//表格初始化
layui.use('table', function(){
    /**
     * 获取lay_table
     */
    var table = layui.table;

    //按钮组的相关
    var $ = layui.$, active = {
        //新增
        getAddData:function(){
            layer.open({
                type:1,
                title:"新增信息",
                area:["600px","600px"],
                content:$("#demo_edit").attr("src",tableUrl.edit+"?type=1"),
                btn:['保存','取消'],
                closeBtn:0,
                yes:function(index,layero){
                    // alert("弹出的是当前为第几行"+index);
                    // alert("保存");
                    //得到子页面的ifream中的表单对象
                    var update_form=layer.getChildFrame("form",index);
                    update_form.find("#form_demo_save_submit").click();
                },
                end:function(){

                }
            })
        },
        //删除一条数据
        getDelListData:function(delUrl,tableName){
            debugger
            var checkStatus = table.checkStatus('demo')
                ,data = checkStatus.data;
            //layer.msg('选中了：'+ data.length + ' 个');
            var arr=[];
            if(data.length<=0){
                layer.msg('没有选中数据', {
                    icon : 5,
                    time : 3000
                });
            }else{
                arr=[];
                for(var i=0; i<data.length; i++){
                    arr.push(data[i].id)
                }
                alert("选中的项目有："+arr);
                $(".layui-form-checked").closest("tr").remove(); //页面级删除
                // active.getDelListDataRequest(tableUrl.del,arr,tableSet.id); //删除请求
            }
        },
        //删除数据请求
        getDelListDataRequest:function(delUrl,id,tableName){
            $.ajax({
                url : delUrl+id,
                type : "GET",
                dataType : "json",
                success : function(result) {
                    /**
                     * 关闭询问框
                     */
                    layer.close(global.confirm);
                    if (result.status == 200) {
                        layer.msg(result.msg, {
                            icon : 6,
                            time : 3000
                        });
                        //重新加载表格
                        table.reload(tableName);
                    }
                    else {
                        layer.msg(result.msg, {
                            icon : 5,
                            time : 3000
                        });
                    }
                },
                error : function(result) {
                    layer.msg("服务器出错,请联系管理员", {
                        icon : 5,
                        time : 3000
                    });
                }
            });
        }

    };

    /**
     * 表格数据渲染
     */
    table.render(layui_table.params);

    //工具栏，监听
    //1.table对象，2.layer对象，3.工具栏相关时间，4.工具栏名称
    tableOperation.toolMonitor(table,layer,tableSet.checkboxName);

    //监听表格复选框选择
    tableOperation.checkboxMonitor(table,tableSet.checkbox);

    //表格按钮组的相关时间方法，新增、批量删除
    tableOperation.layuiBtnGroup(active,tableSet.btnGroup);

});

/**
 * 表格渲染-结构
 */
var layui_table={
    params : {
        id : tableSet.id,
        elem : '#'+tableSet.id,
        url: tableUrl.list, //数据接口
        method : 'get',
        request : {
            pageName : 'pageNum',
            limitName : 'pageSize'
        },
        response : {
            // statusName : 'status',
            //statusCode : 200,
            // msgName : 'msg',
            //countName : 'total',
            //dataName : 'list'
        },
        /**
         * 修改table.js源码得到的自定义方法,主要解决多层json嵌套无法渲染表格的问题
         */
        beforeRender : function(res) {
            res.total = res.data.total;
            res.list = res.data.list;
        },
        //page : true, //实际项目中放开分页功能
        /**
         * 指定数据列
         */
        cols: [[ //表头
            {type : 'checkbox', fixed: true}
            ,{title : '序号',type : 'numbers', fixed: true}
            ,{field: 'id', title: '编号'}
            ,{field: 'username', title: '用户名', width:80}
            ,{field: 'sex', title: '性别', width:80, sort: true}
            ,{field: 'city', title: '城市', width:80}
            ,{field: 'sign', title: '签名', width: 177}
            ,{field: 'experience', title: '积分', width: 80, sort: true}
            ,{field: 'score', title: '评分', width: 80, sort: true}
            ,{field: 'classify', title: '职业', width: 80}
            ,{field: 'wealth', title: '财富', width: 135, sort: true}
            ,{title: '操作',align : 'center',width: 180, toolbar : tableSet.toolBtnGroupName, fixed: 'right'}
        ]]
    }
}

//相关操作
var tableOperation={
    layuiBtnGroup:function(active,btnGroupName){
        $(btnGroupName).on('click', function(){
            var type = $(this).data('type');
            //alert(type);
            active[type] ? active[type].call(this) : '';
        });
    },
    /*监听工具条*/
    toolMonitor:function(table,layer,toolName){
        var sef=this;
        //监听工具条
        table.on('tool('+toolName+')', function(obj){
            var data = obj.data;
            if(obj.event === 'detail'){
                var str='ID：'+ data.id+"<br>" +
                    '姓名：'+ data.username+"<br>" +
                    '性别：'+ data.sex+"<br>" +
                    '城市：'+ data.city+"<br>" +
                    '签名：'+ data.sign+"<br>" +
                    '积分：'+ data.experience+"<br>" +
                    '评分：'+ data.score+"<br>"+
                    '职业：'+ data.classify+"<br>" +
                    '财富：'+ data.wealth+"<br>";
                layer.open({title:"查看信息",area:["100px","350px"],content:str})
            }else if(obj.event === 'edit'){
                var data=obj.data;
                var id=data.id;
                console.log(data.experience);
                layer.open({
                    type:1,
                    title:"修改信息",
                    area:["600px","600px"],
                    content:$("#demo_edit").attr("src",tableUrl.edit+"?type=2&id="+id),
                    btn:['保存','取消'],
                    closeBtn:0,
                    yes:function(index,layero){
                        // alert("弹出的是当前为第几行"+index);
                        // alert("保存");
                        //得到子页面的ifream中的表单对象
                        var update_form=layer.getChildFrame("form",index);
                        update_form.find("#form_demo_save_submit").click();
                    },
                    end:function(){

                    }
                })

                //回填表单
                sef.fileForm(data);//实际项目中应该是在fomr.js中获取当前数据的id，发送一个ajax请求，获取到当前行的数据，然后再回填表单
                //此处，只是模拟回填表单，实际项目中不用调用此方法

            }else if(obj.event === 'del'){
                layer.confirm('真的删除行么', function(index){
                    obj.del(); //页面级别删除
                    layer.close(index);
                });
            }
        });
    },
    /*监听表格复选框选择*/
    checkboxMonitor:function(table){
        table.on('checkbox(layui-table)', function(obj){
            console.log(obj)
        });
    },
    /*回填表单*/
    fileForm:function(data){
        //在父页面调用表单回填的方法，需要在iframe加载完成后执行
        $("#demo_edit")[0].onload = function () {
            var _dom=$($("#demo_edit").contents().find("#form_demo"));
            dosc.fillDataForm(_dom,data);
        }
    }
};