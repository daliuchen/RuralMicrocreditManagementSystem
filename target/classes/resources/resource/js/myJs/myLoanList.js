/**
 * 我的贷款申请
 */

$(function () {


    $('#tableList').bootstrapTable({
        method : 'GET',
        url : "loan/myLoan",//请求路径
        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'server',//server:服务器端分页|client：前端分页
        pageSize : 5,//单页记录数
        pageList : [ 5, 10, 15],//可选择单页记录数
        queryParams : function (params) {
            var temp = {
                limit : params.limit, // 每页显示数量
                offset : params.offset // SQL语句起始索引
            };
            return temp;
        },
        responseHandler:function(res){
            if (res.code == 200){
                console.log(res);

                //成功获取
                var loan = res.content.list;
                var tableObj = [];//定义表格对象
                if(loan.length > 0){
                    for (var i = 0; i < loan.length; i++) {
                        //定义一个行对象
                        var rowObj = {
                            'name':'',
                            'no':'',
                            'idCard':'',
                            'money':'',
                            'time':'',
                            'createDate':'',
                            'status':''
                        };
                        //赋值
                        rowObj.no = loan[i].no;
                        rowObj.money = loan[i].money;
                        rowObj.time = loan[i].time;
                        rowObj.createDate = loan[i].createDate;
                        rowObj.status = loan[i].status;
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
            {
                title:'序号',
                formatter:function(value,row,index){
                    return index+1;
                }
            },

            {
                title:'申请编号',
                field: 'no',
                visible:true

            },
            {
                title: '贷款金额',
                field: 'money'
            },
            {
                title: '贷款时间',
                field: 'time',
                formatter:function (value,row,index) {

                    var splite = value.toString().split("-")
                    var mDate = splite[0]+"年"+splite[1]+"月";
                    return mDate;
                }

            },
            {
                title: '申请时间',
                field: 'createDate',
                formatter:function (value,row,index) {
                    return value;

                }
            },
            {
              title:'状态',
              field:'status'
            },

            {
                title:'操作',
                formatter:operation
            }
        ]                 //列设置
    });


    function operation(value,row,index) {

        var no = row.no;
        console.log(no+"合同编号");
        var htm1 = '<button class="btn btn-danger" style="margin-left: 10px;" onclick="deleteLoan('+" ' "+no+" ' "+')">撤销</button>';
        return htm1;

    }








});

//撤销
function deleteLoan(obj) {
    swal({
        title: "确认撤销",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "ok",
        cancelButtonText: "取消",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function(isConfirm) {
        if (isConfirm) {
            $.ajax({
                url:"loan/backMyLoan/"+obj,
                dataType:"json",
                success:function (obj) {
                    if(obj.code == 200){

                        $("#tableList").bootstrapTable('refresh');

                        swal("删除!", "删除成功！", "success");
                    }else{
                        swal("删除!", "删除失败！", "error");
                    }
                }
            });
        } else{
            swal("取消!", "取消成功！", "error")
        }
    })
}











