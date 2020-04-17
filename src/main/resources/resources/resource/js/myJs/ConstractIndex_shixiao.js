/***
 * 合同管理 》 失效合同
 */

$(function () {


    //搜索框
    $("#searchbtn").bind("click",function () {
        var idCard = $("#searchCustomerInput").val();
        if(idCard.trim() == ""){
            alert("请输入")
            return;
        }
        $("#tableConstract").bootstrapTable("refresh",{query: {idCard:idCard}});
    });



    $('#tableConstract').bootstrapTable({
        method : 'GET',
        url : "constract/index",//请求路径
        striped : true, //是否显示行间隔色
        showRefresh:true,
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'server',//server:服务器端分页|client：前端分页
        pageSize : 5,//单页记录数
        pageList : [ 5, 10, 15],//可选择单页记录数
        queryParams : function (params) {
            var temp = {
                limit : params.limit, // 每页显示数量
                offset : params.offset, // SQL语句起始索引
                idCard:'',
                status:'合同已经完成'
            };
            return temp;
        },
        responseHandler:function(res){
            if (res.code == 200){
                console.log(res);

                //成功获取
                var constracts = res.content.list;
                var tableObj = [];//定义表格对象
                if(constracts.length > 0){
                    for (var i = 0; i < constracts.length; i++) {
                        //定义一个行对象
                        var rowObj = {
                            'name':'',
                            'idCard':'',
                            'no':'',
                            'begin':'',
                            'end':''
                        };
                        //赋值
                        rowObj.name = constracts[i].customer.name;
                        rowObj.idCard = constracts[i].customer.idCard;
                        rowObj.no = constracts[i].no;
                        rowObj.begin = constracts[i].begin;
                        rowObj.end = constracts[i].end;
                        tableObj.push(rowObj)
                    }
                    console.log(tableObj);
                }
                var data = {
                    total:res.content.total,
                    rows:tableObj
                }

                return data;
            }
            if (res.code == 500){
                var data = {
                    total:0,
                    rows:null
                }
                return data;
            }
        },
        columns:[
            {
                title:'序号',
                formatter:function(value,row,index){
                    return index+1;
                }
            },
            {
                title: '姓名',
                field: 'name'
            },
            {
                title: '身份证号',
                field: 'idCard'
            },
            {
                title: '合同号',
                field: 'no'
            },
            {
                title: '合同开始时间',
                field: 'begin'
            },
            {
                title: '合同结束时间',
                field: 'end'
            },


            {
                title:'操作',
                formatter:operation
            }
        ]                 //列设置
    })

    function operation(value,row,index) {
        var no = row.no;
        var htm1 = '<button class="btn btn-danger" style="margin-left: 10px;" onclick="deleteContract('+" ' "+no+" ' "+')">删除</button>';
        var htm3 = '<button class="btn bg-primary" style="margin-left: 10px" onclick="info('+" ' "+no+" ' "+')">查看</button>';
        var htm = htm1+htm3;
        return htm;

    }


    //bootStrap结束



});


//删除
function deleteContract(no) {

    swal({
        title: "确认删除？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            $.get("constract/deleteContract",
                {
                    no:no
                },
                function (obj) {
                    if(obj.code == 200){
                        //成功
                        swal("成功!", "删除成功！", "success");
                        window.location.href = "constractnoshixiao";
                    }
                });

        } else{
            swal("取消!", "取消成功！", "error")
        }
    });

}


//查看合同详细
function info(no) {
    window.location.href="constract/deleteContract/"+no;
}