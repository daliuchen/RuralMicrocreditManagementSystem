/*
    贷款管理，审批
    loanApplication/loanDetail.html
 */
function forMatterTime(obj) {
    // console.log(obj);
    var times = obj.toString().split("-");
    return times[0] + "年" + times[1] + "月";
}


//时间格式化
function dateFormat(date, format) {
    let Year = date.getFullYear();
    let Month = date.getMonth();
    let Date = date.getDate() - 1;
    let Hours = date.getHours() + 10; //解决八小时时差问题
    let Minutes = date.getMinutes();
    let Seconds = date.getSeconds();
    return Year + "年" + Month + "月" + Date + "日" + Hours + "时" + Minutes + "分" + Seconds + "秒";
}


// sweetAlert begin
$(function () {
    //格式化贷款时间
    var time = $("#loanTime").text();
    var time1 = forMatterTime(time);
    $("#loanTime").text(time1);


    //格式化申请时间
    var date1 = $("#loanCreateTime").text();
    // console.log(date1);
    date1 = new Date(date1);
    // console.log(date1);
    date1 = dateFormat(date1, " ");
    // console.log(date1);
    $("#loanCreateTime").text(date1);


    //申请不通过
    $("#notAgree").click(function () {

        swal({
            title: "该贷款申请是否不通过",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "不通过",
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                $.get("loan/notAgree",
                    {
                        no: $("#loanNo").text()
                    },
                    function (obj) {
                        if (obj.code == 200) {
                            swal("该贷款申请没有通过!", "", "error");
                            window.location.href = "shenpi";
                        } else {
                            //报错505
                        }
                    });

            } else {
                swal("取消!", "取消成功！", "error")
            }
        });

    });


    //申请通过
    $("#agree").click(function () {

        swal({
            title: "该贷款申请是否通过",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "通过",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                $.get("loan/agree",
                    {
                        no: $("#loanNo").text()
                    },
                    function (obj) {
                        if (obj.code == 200) {
                            swal({
                                title: "该贷款申请通过!",
                                text: "",
                                type: "success"
                            }, function (ifConfirm) {
                                window.location.href = "shenpi";
                            });
                        } else {
                            //报错 505
                        }
                    })


            } else {
                swal("取消!", "取消成功！", "error")
            }
        });
    });


    //初始化select
    $.get("customerYear", {
        customerId: $("#customerId").val()
    }, function (obj) {

        if (obj.code == 200) {
            console.log("该用户 有 贷款")
            $("#yearSelect").empty();
            var datas = obj.content;
            $.each(datas, function (index, dataObj) {

                $("#yearSelect").append('<option value="' + dataObj + '">' + dataObj + '</option>')
            })
        } else {
            console.log("该用户没有贷款")
            $("#yearSelect").empty();
            $("#yearSelect").append('<option value="-1">该用户目前没有贷款经历</option>')
        }
    });


    //select 下拉 根据年份查询
    //下拉select
    $("#yearSelect").change(function () {
        var valYear = $("#yearSelect option:selected").val();
        if (valYear == "-1") {
            return;
        }
        $.get("CustomerConstract", {
            customerId: $("#customerId").val(),
            year: valYear
        }, function (obj) {
            // console.log(obj);
            if (obj.code == 200) {
                // 更新用户贷款表
                initCustomerLoan(obj);
            }
        })
    });


    //页面加载初始化用户贷款折线图
    // 用户贷款表 开始
    $.get("CustomerConstract", {
        customerId: $("#customerId").val(),
        year: -1
    }, function (obj) {

        if (obj.code == 200) {
            //加载用户贷款折线图
            initCustomerLoan(obj);
        } else {
            //TODO：失败 500 页面 这个文件中这样的很多，只写一个做标记，全部改
        }

    });


    // ajax设置用户分
    $.get("CustomerScore", {
        customerId: $("#customerId").val(),
    }, function (obj) {

        if (obj.code == 200) {
            initCustomerScore("customerCred", obj.content.score);
            if (obj.content.score < 500) {
                $("#userMessage").text("信用差");
            } else if (obj.content.score < 700) {
                $("#userMessage").text("良好");
            } else {
                $("#userMessage").text("信用极好");
            }
        } else {
            //TODO 出错了
        }
    });


    //  ajax设置担保人分
    $.get("CustomerScore", {
        customerId: $("#loanId").val()
    }, function (obj) {
        if (obj.code == 200) {
            initCustomerScore("loadCustomerCred", obj.content.score);
            if (obj.content.score < 500) {
                $("#userMessage1").text("信用差");
            } else if (obj.content.score < 700) {
                $("#userMessage1").text("良好");
            } else {
                $("#userMessage1").text("信用极好");
            }

        } else {
            //TODO 出错了
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
                    data: obj.content.tiQian
                },
                {
                    name: '提前还款',
                    type: 'line',
                    stack: '总量',
                    data: obj.content.yuQi
                }

            ]


        };

        myChart.setOption(option);

    }


    function initCustomerScore(customerType, score) {
        var myChart1 = echarts.init(document.getElementById(customerType));
        myChart1.setOption({
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter: '{value}'},
                    data: [{value: score, name: '信用分'}],
                    min: 0,
                    max: 1000
                }
            ]
        })
    }


});
















