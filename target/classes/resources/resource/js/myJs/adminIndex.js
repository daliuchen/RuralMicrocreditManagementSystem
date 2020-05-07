/**
 * 管理员管理
 */
// jquery begin
$(function () {


// bootstrap table---------------------------------------------------------------------



    $('#adminTable').bootstrapTable({
        method : 'get',
        url : "admin/index",//请求路径
        striped : true, //是否显示行间隔色
        pageNumber : 1, //初始化加载第一页
        pagination : true,//是否分页
        showRefresh: true,//是否显示刷新
        sidePagination : 'server',//server:服务器端分页|client：前端分页
        pageSize : 5,//单页记录数
        pageList : [ 5, 10, 15],//可选择单页记录数
        queryParams : function (params) {
            var temp = {
                limit : params.limit, // 每页显示数量
                offset : params.offset, // SQL语句起始索引
                idCard:''
            };
            return temp;
        },
        responseHandler:function(res){

            if (res.code == 200){
                //成功获取
                $("#searchCustomerInput").val("");//将搜索框里面清空
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
                            'picture':'',
                            'address':''
                        };
                        //赋值
                        rowObj.name = customers[i].name;
                        rowObj.idCard = customers[i].idCard;
                        rowObj.sex = customers[i].sex;
                        rowObj.phone = customers[i].phone;
                        rowObj.email = customers[i].email;
                        rowObj.picture = customers[i].picture;
                        rowObj.address = customers[i].address;
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
            if(res.code == 500){
                var data = {
                    total:0,
                    rows:null
                }

                return data;
            }
        },
        columns:[
            {   title:'选择',
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
                title:'地址',
                field:'address'
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
        var htm1 = '<button class="btn btn-success" style="margin-left: 10px;" onclick="modifyAdmin('+" ' "+idCard+" ' "+')">修改</button>';
        var htm2 = '<button class="btn btn-danger" style="margin-left: 10px;" onclick="deleteAdmin('+" ' "+idCard+" ' "+')">删除</button>'
        var htm = htm1+htm2;
        return htm;

    }
    function showPicture(value,row,index) {

        var htm = "<img src='data:image/png;base64,"+value+"' style='height: 40px'>"
        return htm;
    }


    //批量删除
    $("#deleteAdmins").click(function () {

        var id_array=new Array();//得到 选中的框
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
                        url:'admin/deletes',
                        type:'POST',
                        data:{
                            idCards:id_array
                        },
                        success:function (obj) {
                            if (obj.code==200){
                                //删除成功
                                swal("删除!", "删除成功！", "success")
                                $("#adminTable").bootstrapTable('refresh');// 刷新bootStrap
                            }else{
                                swal("失败!", "删除失败！", "success")
                                //TODO;删除失败，这里打算用错误页面
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
        var idCard = $("#searchCustomerInput").val();
        if(idCard.trim() == ""){
            swal("请选择","","warning");
            return;
        }

        $("#searchCustomerInput").val("");//将搜索框里面清空
        $("#adminTable").bootstrapTable("refresh",{query: {idCard:idCard}});

    });

});
// jquery end


//删除一个 customer
function deleteAdmin(obj) {

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
                url:'admin/delete/'+obj,
                type:'GET',
                dataType:'json',
                success:function (obj) {
                    if (obj.code==200){
                        swal("删除!", "删除成功！", "success")
                        $("#adminTable").bootstrapTable('refresh');
                    }else{
                        //TODO:删除admin失败，这里打算用 用错误页面
                    }
                }
            })
        } else{
            swal("取消!", "取消成功！", "error")
        }
    })


}

//显示修改页面
function modifyAdmin(obj) {
    window.location.href="admin/showModifyCusotmer/"+obj;
}


