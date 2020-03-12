/***
 * 合同管理 》 逾期
 */

$(function () {


    //搜索框
    $("#searchbtn").bind("click",function () {
        var idCard = $("#searchCustomerInput").val();
        if(idCard.trim() == ""){
            alert("请输入")
            return;
        }
        $("#customerTable").bootstrapTable("refresh",{query: {idCard:idCard}});
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
                status:'逾期'
            };
            return temp;
        },
        responseHandler:function(res){
            if (res.code == 200){
                console.log(res);

                //成功获取
                var constracts = res.content.list;
                var tableObj = [];//定义表格对象
                if(customers.length > 0){
                    for (var i = 0; i < customers.length; i++) {
                        //定义一个行对象
                        var rowObj = {
                            'name':'',
                            'idCard':'',
                            'no':'',
                            'begin':'',
                            'end':'',
                            'overdue':''
                        };
                        //赋值
                        rowObj.name = constracts[i].name;
                        rowObj.idCard = constracts[i].idCard;
                        rowObj.no = constracts[i].no;
                        rowObj.begin = constracts[i].begin;
                        rowObj.end = constracts[i].end;
                        rowObj.overdue = constracts[i].overdue;
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
        },
        columns:[
            // {   title:'选择',
            //     formatter:function (value,row,index) {
            //         var htm = '<input type="checkbox" value="'+row.idCard+'">';
            //         return htm;
            //     }
            // },
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
                title:'逾期天数',
                field: 'overdue'
            },

            {
                title:'操作',
                formatter:operation
            }
        ]                 //列设置
    })

    function operation(value,row,index) {
        var no = row.no;
        var htm1 = '<button class="btn btn-success" style="margin-left: 10px;" onclick="repayment('+" ' "+no+" ' "+')">已还款</button>';
        var htm3 = '<button class="btn bg-primary" style="margin-left: 10px" onclick="info('+" ' "+no+" ' "+')">查看</button>';
        var htm = htm1+htm3;
        return htm;

    }


    //bootStrap结束



});


//已还款
function repayment(no) {

    swal({
        title: "该用户确认已经还款？",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "已还款",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            $.get("constract/repayment",
                {
                    no:no,
                    status:'逾期'
                },
                function (obj) {
                    if(obj.code == 200){
                        //成功
                        swal("还款!", "还款成功！", "success");
                        window.location.href = "constractxuqi";
                    }
                });

        } else{
            swal("取消!", "取消成功！", "error")
        }
    });

}


//查看合同详细
function info(no) {
    window.location.href="constract/info/"+no+"/逾期";
}