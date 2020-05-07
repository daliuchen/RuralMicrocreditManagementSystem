/***
 * 我的业务 》 我的合同
 */

$(function () {





    $('#tableConstract').bootstrapTable({
        method : 'GET',
        url : "constract/myContract",//请求路径
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
            };
            return temp;
        },
        responseHandler:function(res){
            if (res.code == 200){


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
                        rowObj.money = constracts[i].money;
                        rowObj.status = constracts[i].status;
                        rowObj.begin = constracts[i].begin;
                        rowObj.end = constracts[i].end;
                        tableObj.push(rowObj)
                    }

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
              title: '贷款金额',
                field: 'money'
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
              title:'状态',
              field:'status'
            },
            {
                title: '其他',
                field: "other",
                formatter:function (value,row,index) {
                    var status = row.status;
                    var htm1;
                    if (status == '未到期'){
                        htm1 = '<label class="" style="margin-left: 10px; color: red "> 合同未到期，请按时还款</label>';
                    } else if (status == '今天到期'){
                        htm1 = '<label class="" style="margin-left: 10px; color: red"> 合同今天到期，请按时还款</label>';
                    } else if (status == '逾期'){
                        htm1 = '<label class="" style="margin-left: 10px; color: red" > 合同已经逾期，请按时还款，以免影响自己的信用分</label>';
                    } else if (status == '合同已经完成'){
                        htm1 = '<label class="" style="margin-left: 20px; color: green"> 合同已经完成</label>';
                    }
                    return htm1;

                }

            }
        ]                 //列设置
    })



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
                    status:'未到期'
                },
                function (obj) {
                    if(obj.code == 200){
                        //成功
                        swal("还款!", "还款成功！", "success");
                        window.location.href = "constractnoDate";
                    }
                });

        } else{
            swal("取消!", "取消成功！", "error")
        }
    });

}


//查看合同详细
function info(no) {
    window.location.href="constract/info/"+no+"/未到期";
}