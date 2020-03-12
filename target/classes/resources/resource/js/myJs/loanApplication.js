/**
 * 申请贷款
 */
$(function () {


    //验证担保人存在还是不存在
    $("#loanPeopleIdCard").blur(function () {
        var loanName = $("#loanPeople").val().trim();
        var loanIdCard = $(this).val().trim();
        if(loanName != "" && loanIdCard != "") {
            $.get("validateLoanPeople", {
                loanName: loanName,
                loanIdCard: loanIdCard
            }, function (obj) {
                if (obj.code == 200) {
                    //此担保人存在系统中
                    $("#loanMessage").text("验证成功");
                    $("#agree").attr("class","btn btn-success btn-lg");
                }
                if (obj.code == 404) {
                    //没有这个人
                    $("#loanMessage").text(obj.msg)
                    $("#agree").attr("class","btn btn-success btn-lg disabled");
                }
                if (obj.code == 406) {
                    //用户名和密码不匹配
                    $("#loanMessage").text(obj.msg)
                    $("#agree").attr("class","btn btn-success btn-lg disabled");
                }
                $("#loanMessage").show();
            });
        }




    });


    $("#inputMoney").blur(function () {
        var money = $(this).val();
        if(money.trim() != ""){
          $.get("loanMoney",
              {
                  money:money
              },
              function (obj) {
              console.log(obj)
                    if(obj.code == 200){
                        console.log(obj)
                            $("#maxyear").text(obj.content.maxYear);
                    }else{
                        //出错
                    }
          });
        }
   });

    $("#agree").click(function () {

        swal({
            title: "是否提交该申请",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "提交",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                swal({
                    title: "申请已提交!",
                    text: "",
                    type: "success"
                },function (ifConfirm) {
                    alert(1);
                    $("#formLoan").submit();
                })

            } else{
                swal("取消!", "取消成功！", "error")
            }
        });



    });









});