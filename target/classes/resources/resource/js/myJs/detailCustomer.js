/*
   管理管理 》 查看
   客户详情
   customer/detailCustomer.html
 */

$(function () {




    //下拉select
    $("#yearSelect").change(function () {
        var valYear = $("#yearSelect option:selected").val();
        $.get("CustomerConstract",{
            customerId:$("#customerId").val(),
            year:valYear
        },function (obj) {
            console.log(obj);
            if(obj.code=200){
                initCustomerLoan(obj);
            }
        })
    });




    //初始化select
    $.get("customerYear",{
        customerId :$("#customerId").val()
    },function (obj) {
        if(obj.code=200){
            $("#yearSelect").empty();
            var datas = obj.content;
            $.each(datas,function (index,dataObj) {

                $("#yearSelect").append('<option value="'+dataObj+'">'+dataObj+'</option>')
            })
        }else{
            //TODO：失败 500 页面 这个文件中这样的很多，只写一个做标记，全部改
        }
    });




// 用户贷款表 开始
    setInterval(a,1000);
    function a (){

        $.get("CustomerConstract",{
            customerId:$("#customerId").val(),
            year:-1
        },function (obj) {
            console.log(obj);
            if(obj.code=200){
                initCustomerLoan(obj);
            }
        });


    }




    //用户贷款折线图
    function initCustomerLoan(obj) {

        var myChart = echarts.init(document.getElementById('customerLoan'));
        option = {
            title: {
                text: '贷款详细'
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {

            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '按时还款',
                    type: 'line',
                    stack: '总量',
                    data: obj.content.a[0]
                },
                {
                    name: '逾期还款',
                    type: 'line',
                    stack: '总量',
                    data: obj.content.b[0]
                },
                {
                    name: '提前还款',
                    type: 'line',
                    stack: '总量',
                    data: obj.content.c[0]
                }

            ]


        };

        myChart.setOption(option);

    }





    //  ajax设置用户分
    $.get("CustomerScore",{
        customerId:$("#customerId").val(),
    },function (obj) {

        if(obj.code=200){
            var myChart1 = echarts.init(document.getElementById('customerCred'));
            myChart1.setOption({
                series: [
                    {
                        name: '业务指标',
                        type: 'gauge',
                        detail: {formatter: '{value}'},
                        data: [{value: obj.content.score, name: '信用分'}],
                        min:0,
                        max:1000
                    }
                ]
            })



        }
    });




    $(".file-upload-btn").click(function () {
        $(".file-upload").click();

    });





    //img 获取用户的身份证
    $("#idCardPicture").attr("src","idPicture/"+$("#idCard").text());




});










q