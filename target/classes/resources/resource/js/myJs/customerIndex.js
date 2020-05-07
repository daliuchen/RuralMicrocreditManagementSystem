/**
 * 客户列表
 */
// jquery begin
$(function () {


// bootstrap table---------------------------------------------------------------------



    $('#customerTable').bootstrapTable({
        method : 'get',
        url : "user/index",//请求路径
        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        sidePagination : 'server',//server:服务器端分页|client：前端分页
        pageSize : 5,//单页记录数
        showRefresh: true,//是否显示刷新
        pageList : [ 5, 10, 15],//可选择单页记录数
        queryParams : function (params) {
            var temp = {
                limit : params.limit, // 每页显示数量
                offset : params.offset, // SQL语句起始索引
                text:''
            };
            return temp;
        },
        responseHandler:function(res){
            if (res.code == 200){
                //成功获取
                var customers = res.content.list;
                var tableObj = [];//定义表格对象
                if(customers.length > 0){
                    for (var i = 0; i < customers.length; i++) {
                        //定义一个行对象
                        var rowObj = {
                            'name':'',
                            'idCard':'',
                            'sex':'',
                            'phone':'',
                            'email':'',
                            'picture':''
                        };
                        //赋值
                        rowObj.name = customers[i].name;
                        rowObj.idCard = customers[i].idCard;
                        rowObj.sex = customers[i].sex;
                        rowObj.phone = customers[i].phone;
                        rowObj.email = customers[i].email;
                        rowObj.picture = customers[i].picture;
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
                formatter:function (value,row,index) {
                    var htm = '<input type="checkbox" value="'+row.idCard+'">';
                    return htm;
                }
            },
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
                title: '性别',
                field: 'sex',
                formatter:formatSex
            },
            {
                title: '电话',
                field: 'phone'
            },
            {
                title: '邮箱',
                field: 'email'
            },
            {
                title:'头像',
                field: 'picture',
                formatter:showPicture
            },
            {
                title:'操作',
                formatter:operation
            }
        ]                 //列设置
    });

    function formatSex(value, row, index) {
        return value == 1?'男':'女';
    }

    function operation(value,row,index) {
        console.log("row"+row.idCard)
        var idCard = row.idCard;
        var htm1 = '<button class="btn btn-success" style="margin-left: 10px;" onclick="modifyCustomer('+" ' "+idCard+" ' "+')">修改</button>';
        var htm2 = '<button class="btn btn-danger" style="margin-left: 10px;" onclick="deleteCustomer('+" ' "+idCard+" ' "+')">删除</button>'
        var htm3 = '<button class="btn bg-primary" style="margin-left: 10px" onclick="infoCustomer('+" ' "+idCard+" ' "+')">查看</button>';
        var htm = htm1+htm2+htm3;
        return htm;

    }
    function showPicture(value,row,index) {

        var htm = "<img src='data:image/png;base64,"+value+"' style='height: 40px'>"
        return htm;
    }


    //批量删除
    $("#deleteCustomers").click(function () {

        var id_array=new Array();
        $('input:checked').each(function(){
            id_array.push($(this).val());//向数组中添加元素
        });
        if(id_array.length > 0){


            swal({
                title: "确认删除",
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
                        url:'user/deletes',
                        type:'POST',
                        data:{
                            idCards:id_array
                        },
                        success:function (obj) {
                            if (obj.code==200){
                                //删除成功
                                swal("删除!", "删除成功！", "success")
                                $("#customerTable").bootstrapTable('refresh');
                            }else{
                                swal("失败!", "删除失败！", "success")
                            }
                        }

                    })
                } else{
                    swal("取消!", "取消成功！", "error")
                }
            })



        }else{

            swal("请选择",'','warning');

        }


    })


//  -------------------------------------------------------------------------------



    //搜索框
    $("#searchbtn").bind("click",function () {
        var customer = $("#searchCustomerInput").val();
        if(customer.trim() == ""){
            alert("请输入")
            return;
        }
        $("#customerTable").bootstrapTable("refresh",{query: {text:customer}});
    });

});
// jquery end


//删除一个 customer
function deleteCustomer(obj) {

    swal({
        title: "确认删除",
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
            swal("删除!", "删除成功！", "success")
            $.ajax({
                url:'user/delete/'+obj,
                type:'POST',
                dataType:'json',
                success:function (obj) {
                    if (obj.code==200){
                        //删除成功
                        $("#customerTable").bootstrapTable('refresh');

                    }
                }

            })
        } else{
            swal("取消!", "取消成功！", "error")
        }
    })


}

//显示修改页面
function modifyCustomer(obj) {
    window.location.href="user/showModifyCusotmer/"+obj;
}
//查看用户详情
function infoCustomer(obj){
    window.location.href="user/showInfoCustmer/"+obj;
}

