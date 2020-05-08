/**
 *
 * 首页 js
 */


$(function () {
    //初始化折线图 ajax
    $.get("index/dashBoard",
        {year:'-1'},
        function (obj) {
            if(obj.code==200){
                console.log(obj);
                //成功
                //调用初始化折线图函数
                initCustomerLoan(obj)
            }else{
                //失败
                alert("失败");
            }
        },"json"
    );

    //代审批的申请 ajax
    $.get("index/infoLoanApplication",
        {},
        function (obj) {
            if(obj.code == 200){
                $("#message1").text(obj.content);
                $("#message11").text(obj.content);
            }
        },"json");


    //今天到期贷款 ajax
    $.get("index/infoContract",
        {status:'今天到期'},
        function (obj) {
            if(obj.code == 200){
                $("#message2").text(obj.content);
                $("#message22").text(obj.content);
            }
        },"json");

    //未到期贷款 ajax
    $.get("index/infoContract",
        {status:'未到期'},
        function (obj) {
            if(obj.code == 200){
                $("#message3").text(obj.content);
                $("#message33").text(obj.content);
            }
        },"json");

    // 逾期贷款 ajax
    $.get("index/infoContract",
        {status:'逾期'},
        function (obj) {
            if(obj.code == 200){
                $("#message4").text(obj.content);
                $("#message44").text(obj.content);
            }
        },"json");

    //TODO 在用户还钱之后，我不知道自己有没有更新了 contractStatus字段 ，之后要检查


    //初始化select
    $.get("customerYear",{
        customerId:'-1'
    },function (obj) {
        if(obj.code=200){
            $("#yearSelect").empty();
            var datas = obj.content;
            var date = new Date();
            var fullYear = date .getFullYear();
            $.each(datas,function (index,dataObj) {
                if(dataObj != null || dataObj != 'null'){
                    if(fullYear == dataObj){
                        $("#yearSelect").append('<option value="'+dataObj+'" selected="selected">'+dataObj+'</option>');
                    }else{
                        $("#yearSelect").append('<option value="'+dataObj+'">'+dataObj+'</option>');
                    }
                }


            })
        }else{

        }
    });



    //下拉select
    $("#yearSelect").change(function () {
        //得到下拉框的值
        var valYear = $("#yearSelect option:selected").val();
        $.get("index/dashBoard",
            {year:valYear},
            function (obj) {
            console.log(obj);
            if(obj.code=200){
                initCustomerLoan(obj);
            }else{
                //报错
            }
        })
    });





    //折线图
    function initCustomerLoan(obj) {

        var myChart = echarts.init(document.getElementById('customerLoan'));


        option = {
            title: {
                text: '贷款详细'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['提前还款', '按时还款', '逾期还款']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '提前还款',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: obj.content.tiQian
                },
                {
                    name: '按时还款',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: obj.content.anShi
                },
                {
                    name: '逾期还款',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    data: obj.content.yuQi
                },
                // {
                //     name: '直接访问',
                //     type: 'line',
                //     stack: '总量',
                //     areaStyle: {},
                //     data: [320, 332, 301, 334, 390, 330, 320]
                // },
                // {
                //     name: '搜索引擎',
                //     type: 'line',
                //     stack: '总量',
                //     label: {
                //         normal: {
                //             show: true,
                //             position: 'top'
                //         }
                //     },
                //     areaStyle: {},
                //     data: [820, 932, 901, 934, 1290, 1330, 1320]
                // }
            ]
        };


        myChart.setOption(option);

    }

});

