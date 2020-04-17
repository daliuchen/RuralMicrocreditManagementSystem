/*
   管理管理 》 查看
   客户详情
   customer/detailCustomer.html
 */

$(function () {


    //下拉select
    $("#yearSelect").change(function () {
        var valYear = $("#yearSelect option:selected").val();
        $.get("CustomerConstract", {
            customerId: $("#customerId").val(),
            year: valYear
        }, function (obj) {
            console.log("下拉框" + obj);
            if (obj.code = 200) {
                initCustomerLoan(obj);
            }
        })
    });


    //初始化select
    $.get("customerYear", {
        customerId: $("#customerId").val()
    }, function (obj) {
        if (obj.code == 200) {
            $("#yearSelect").empty();
            var datas = obj.content;
            $.each(datas, function (index, dataObj) {

                $("#yearSelect").append('<option value="' + dataObj + '">' + dataObj + '</option>')
            })
        } else {
            //应该在页面显示 该用户没有贷款经历
            $("#conMessage").text("没有贷款经历");
        }
    });


// 用户贷款表 开始
    $.get("CustomerConstract", {
        customerId: $("#customerId").val(),
        year: -1
    }, function (obj) {
        if (obj.code = 200) {
            console.log(obj);
            initCustomerLoan(obj);
        }
    });


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
            toolbox: {},
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '按时还款',
                    type: 'line',
                    stack: '总量',
                    data: obj.content.anShi
                },
                {
                    name: '逾期还款',
                    type: 'line',
                    stack: '总量',
                    data: obj.content.yuQi
                },
                {
                    name: '提前还款',
                    type: 'line',
                    stack: '总量',
                    data: obj.content.tiQian
                }

            ]


        };

        myChart.setOption(option);

    }


    //  ajax设置用户分
    $.get("CustomerScore", {
        customerId: $("#customerId").val(),
    }, function (obj) {

        if (obj.code = 200) {
            if (obj.content.score < 500) {
                $("#scoreMessage").text("信用差")
            } else if (obj.content.score < 700) {
                $("#scoreMessage").text("信用良好")
            } else {
                $("#scoreMessage").text("信用极高")
            }
            var myChart1 = echarts.init(document.getElementById('customerCred'));
            myChart1.setOption({
                series: [
                    {
                        name: '业务指标',
                        type: 'gauge',
                        detail: {formatter: '{value}'},
                        data: [{value: obj.content.score, name: '信用分'}],
                        min: 0,
                        max: 1000
                    }
                ]
            })


        }
    });


    $(".file-upload-btn").click(function () {
        $(".file-upload").click();

    });


    //img 获取用户的身份证
    $("#idCardPicture").attr("src", "idPicture/" + $("#idCard").text());


});

