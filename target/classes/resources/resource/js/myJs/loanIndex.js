/**
 * 贷款管理 > 审批
 */
$(function () {
// Jquery begin


    $('#loanList').bootstrapTable({
        method : 'GET',
        url : "loan/shenpiList",//请求路径
        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        showRefresh : true, //显示刷新
        sidePagination : 'server',//server:服务器端分页|client：前端分页
        pageSize : 5,//单页记录数
        pageList : [ 5, 10, 15],//可选择单页记录数
        queryParams : function (params) {
            var temp = {
                limit : params.limit, // 每页显示数量
                offset : params.offset, // SQL语句起始索引
                idCard:"-1"//用于搜索框
            };
            return temp;
        },
        responseHandler:function(res){
            if (res.code == 200){
                console.log("贷款申请 审批")
                console.log(res);
                //成功获取
                var loan = res.content.list;
                var tableObj = [];//定义表格对象
                if(loan.length > 0){
                    for (var i = 0; i < loan.length; i++) {
                        //定义一个行对象
                        var rowObj = {
                            'name':'',
                            'idCard':'',
                            'no':'',
                            'money':'',
                            'time':'',
                            'createDate':'',
                            'bondsmanName':'',
                            'bondsmanIdCard':''
                        };
                        //赋值
                        rowObj.name = loan[i].customer.name;
                        rowObj.idCard = loan[i].customer.idCard;
                        rowObj.no = loan[i].no;
                        rowObj.money = loan[i].money;
                        rowObj.time = loan[i].time;
                        rowObj.createDate = loan[i].createDate;
                        rowObj.bondsmanName = loan[i].bondsman.name;
                        rowObj.bondsmanIdCard = loan[i].bondsman.idCard;
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
                var data={
                    total:0,
                    rows:null
                };
                return  data;
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
                title:'姓名',
                field:"name"
            },
            {
                title:'身份证号',
                field: 'idCard'
            },
            {
                title: '申请号码',
                field: 'no'
            },
            {
                title:'贷款金额',
                field:'money'
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
                title:'担保人',
                field:'bondsmanName'
            },
            {
                title:'担保人身份证号',
                field:'bondsmanIdCard'
            },
            {
                title:'操作',
                formatter:operation
            }
        ]                 //列设置
    });


    function operation(value,row,index) {

        var no = row.no;
        var htm1 = '<button class="btn btn-primary" style="margin-left: 10px;" onclick="infoLoan('+" ' "+no+" ' "+')">查看</button>';
        return htm1;

    }





    //搜索框
    $("#searchbtn").bind("click",function () {
        var idCard = $("#searchCustomerInput").val();
        if(idCard.trim() == ""){
            swal("请输入身份证号","","warning");
            return;
        }

        $("#searchCustomerInput").val("");//将搜索框里面清空
        $("#loanList").bootstrapTable("refresh",{query: {idCard:idCard}});

    });




// Jquery end
});

//查看
function infoLoan(obj) {
    window.location.href="loan/loanInfo/"+obj;
}