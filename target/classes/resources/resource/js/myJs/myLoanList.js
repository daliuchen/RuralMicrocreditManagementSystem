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
        showRefresh:true,//显示刷新按钮
        sidePagination : 'server',//server:服务器端分页|client：前端分页
        pageSize : 5,//单页记录数
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式

        pageList : [ 5, 10, 15],//可选择单页记录数
        queryParams : function (params) {
            var temp = {
                limit : params.limit, // 每页显示数量
                offset : params.offset, // SQL语句起始索引
                no:"-1" // 这个参数是给搜索框给的
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
                            'no':'',
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
            if(res.code==500){
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
                sortable: true,
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
                formatter:function(value,row,index){
                    var no=row.no;
                    var htm1;
                    var status = row.status;
                    if(status == '通过'){
                        //合同通过
                        htm1 = '<button class="btn btn-success" style="margin-left: 10px;" onclick="goContract('+" ' "+no+" ' "+')">生成合同</button>';
                        var html2 = '<button class="btn btn-danger" style="margin-left: 10px;" onclick="backContract('+" ' "+no+" ' "+')">撤销合同</button>';
                        htm1 = htm1+html2;
                    }else if(status =='未处理'){
                        htm1 = '<button class="btn btn-danger" style="margin-left: 10px;" onclick="deleteLoan('+" ' "+no+" ' "+')">撤销申请</button>';
                    }else if(status == '已有合同生成'){
                        htm1 = '<label class="" style="margin-left: 10px; color: orange">申请已通过。请按时还款</label>';
                    }else if(status == '不通过'){
                        htm1 = '<label class="" style="margin-left: 10px; color: red">申请不通过。请到柜台咨询</label>';
                    }else{
                        htm1 = '<label class="" style="margin-left: 10px;">申请已经撤销。</label>';
                    }


                    return htm1;
                }
            }
        ]                 //列设置
    });










});


//撤销合同
function backContract(obj) {
    //发送请求
        //合同的状态变为乙方不签署
    swal({
        title: "确认撤销此合同",
        text: "该合同还没有起效，可以撤销",
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
                url:"constract/backContract/"+obj,
                dataType:"json",
                success:function (obj) {
                    if(obj.code == 200){
                        $("#tableList").bootstrapTable('refresh');

                        swal("撤销!", "撤销成功！", "success");
                    }else{
                        swal("撤销!", "撤销失败！", "error");
                    }
                }
            });
        } else{
            swal("取消!", "取消成功！", "error")
        }
    })

}



//贷款申请通过，生成合同
function goContract(obj){
    //发送请求
       // 将对应的合同状态变为乙方签署
       // 之后将合同起效 合同状态变为未到期。
        // 对应的申请的状态变为 已有合同生成
    $.ajax({
        url:"constract/goContract/"+obj,
        dataType:"json",
        success:function (obj) {
            if(obj.code == 200){
                swal("成功!", "合同起效！", "success");
                swal("提示!", "请按期还款！", "success");
                $("#tableList").bootstrapTable('refresh');
            }else{
                //TODO：500 失败
            }
        }
    });
}






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











