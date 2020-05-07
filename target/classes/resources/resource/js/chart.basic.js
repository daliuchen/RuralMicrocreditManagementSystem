/**
 * Created by zwq on 2017/6/27 0027.
 * 功能模块：折线图、柱状图、雷达/蜘蛛网图、极地区域图、饼图、环形图
 * 功能描述：添加了mock模拟真实数据请求，图表按类型模块编写，便于后期复用
 */

$(function () {
    new chartDataNew();
});

function chartDataNew() {
    this.init()
}

chartDataNew.prototype = {
    init: function () {
        this.lineChart.init();//折线图
        this.barChart.init();//柱状图
        this.radarChart.init();//雷达/蜘蛛网图
        this.polarareaChart.init();//极地区域图
        this.pieChart.init();//饼图
        this.doughnutChar.init(); //环形图
    },
    //折线图
    lineChart: {
        //基本配置项
        opts: {
            dom: "myChartLine", //折线图标签的id名称
            url: "chartLine/list"
        },
        //初始化
        init: function () {
            this.ChartLine(); //折线图
        },
        //请求数据
        ChartLine: function (data) {
            var than = this;
            than.ChartLineMock(); //mock模拟数据
            data == undefined ? "" : data;
            $.ajax({
                type: "post",
                url: than.opts.url,
                data: data,
                contentType: "application/json",
                success: function (data) {
                    data = data;
                    if (typeof  data != "object") {
                        data = JSON.parse(data)
                    }
                    if (data.status == 200) {


                        than.barCharDataLine(data.data);
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    alert(JSON.stringify(data))
                },
                complete: function (XMLHttpRequest, textStatus) {

                }
            });
        },
        //mock模拟数据
        ChartLineMock: function () {
            var than = this;
            var data = Mock.mock({
                "status": "200",
                "msg": "成功",
                "length": 10,
                "data": {
                    "labels": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    "dataA": [1, 8, 5, 2, 7, 4, 9, 5, 1, 7, 4, 2],
                    "dataB": [6, 2, 5, 2, 1, 1, 2, 6, 3, 5, 3, 9]
                }
            });
            Mock.mock(than.opts.url, data);
        },
        //图表数据结构
        barCharDataLine: function (data) {
            var than = this;
            var barCharDataLine = {
                labels: data.labels,
                datasets: [
                    {
                        fillColor: "rgba(45,195,232,0.5)",
                        strokeColor: "rgba(45,195,232,1)",
                        pointColor: "rgba(45,195,232,1)",
                        pointStrokeColor: "#fff",
                        data: data.dataA
                    },
                    {
                        fillColor: "rgba(160,212,104,0.5)",
                        strokeColor: "rgba(160,212,104,1)",
                        pointColor: "rgba(160,212,104,1)",
                        pointStrokeColor: "#fff",
                        data: data.dataB
                    }
                ]
            };

            var myChartLine = document.getElementById(than.opts.dom);
            if (myChartLine != null) {
                var ctxLine = myChartLine.getContext("2d");
                window.myBar = new Chart(ctxLine).Line(barCharDataLine, {
                    responsive: true
                });
            }

        },

    },
    //柱状图
    barChart: {
        //基本配置项
        opts: {
            dom: "myChartBar",
            url: "chartBar/list"
        },
        //初始化
        init: function () {
            this.ChartBar(); //折线图
        },
        //请求数据
        ChartBar: function (data) {
            var than = this;
            than.ChartBarMock(); //mock模拟数据
            data == undefined ? "" : data
            $.ajax({
                type: "post",
                url: than.opts.url,
                data: data,
                contentType: "application/json",
                success: function (data) {
                    data = data;
                    if (typeof  data != "object") {
                        data = JSON.parse(data)
                    }
                    if (data.status == 200) {


                        than.barCharDataBar(data.data);
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    alert(JSON.stringify(data))
                },
                complete: function (XMLHttpRequest, textStatus) {

                }
            });
        },
        //mock模拟数据
        ChartBarMock: function () {
            var than = this;
            var data = Mock.mock({
                "status": "200",
                "msg": "成功",
                "length": 10,
                "data": {
                    "labels": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    "dataA": [1, 8, 5, 2, 7, 4, 9, 5, 1, 7, 4, 2],
                    "dataB": [6, 2, 5, 2, 1, 1, 2, 6, 3, 5, 3, 9],
                }
            });
            Mock.mock(than.opts.url, data);
        },
        //图表数据结构
        barCharDataBar: function (data) {
            var than = this;
            var barCharDataBar = {
                labels: data.labels,
                datasets: [
                    {
                        fillColor: "rgba(255,206,86,0.5)",
                        strokeColor: "rgba(255,206,86,1)",
                        pointColor: "rgba(255,206,86,1)",
                        pointStrokeColor: "#fff",
                        data: data.dataA
                    },
                    {
                        fillColor: "rgba(251,110,82,0.5)",
                        strokeColor: "rgba(251,110,82,1)",
                        pointColor: "rgba(251,110,82,1)",
                        pointStrokeColor: "#fff",
                        data: data.dataB
                    }
                ]
            };

            var myChartar = document.getElementById(than.opts.dom);
            if (myChartar != null) {
                var ctxBar = myChartar.getContext("2d");
                window.myBar = new Chart(ctxBar).Bar(barCharDataBar, {
                    responsive: true
                });
            }

        },

    },
    //雷达/蜘蛛网图
    radarChart: {
        //基本配置项
        opts: {
            dom: "myChartRadar",
            url: "chartRadar/list"
        },
        //初始化
        init: function () {
            this.chartRadar(); //折线图
        },
        //请求数据
        chartRadar: function (data) {
            var than = this;
            data == undefined ? "" : data
            than.chartRadarMock(); //mock模拟数据
            $.ajax({
                type: "post",
                url: than.opts.url,
                data: data,
                contentType: "application/json",
                success: function (data) {
                    data = data;
                    if (typeof  data != "object") {
                        data = JSON.parse(data)
                    }
                    if (data.status == 200) {




                        than.chartRadarDataBar(data.data);
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    alert(JSON.stringify(data))
                },
                complete: function (XMLHttpRequest, textStatus) {

                }
            });
        },
        //mock模拟数据
        chartRadarMock: function () {
            var than = this;
            var data = Mock.mock({
                "status": "200",
                "msg": "成功",
                "length": 10,
                "data": {
                    "labels": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    "dataA": [1, 8, 5, 2, 7, 4, 9, 5, 1, 7, 4, 2],
                    "dataB": [6, 2, 5, 2, 1, 1, 2, 6, 3, 5, 3, 9],
                }
            });
            Mock.mock(than.opts.url, data);
        },
        //图表数据结构
        chartRadarDataBar: function (data) {
            var than = this;
            var charDataRadar = {
                labels: data.labels,
                datasets: [
                    {
                        fillColor: "rgba(255,206,86,0.5)",
                        strokeColor: "rgba(255,206,86,1)",
                        pointColor: "rgba(255,206,86,1)",
                        pointStrokeColor: "#fff",
                        data: data.dataA
                    },
                    {
                        fillColor: "rgba(251,110,82,0.5)",
                        strokeColor: "rgba(251,110,82,1)",
                        pointColor: "rgba(251,110,82,1)",
                        pointStrokeColor: "#fff",
                        data: data.dataB
                    }
                ]
            };

            var myChartRadar = document.getElementById(than.opts.dom);
            if (myChartRadar != null) {
                var ctxRadar = myChartRadar.getContext("2d");
                window.myBar = new Chart(ctxRadar).Radar(charDataRadar, {
                    responsive: true
                });
            }

        },

    },
    //极地区域图
    polarareaChart: {
        //基本配置项
        opts: {
            dom: "myChartPloararea",
            url: "chartPolararea/list"
        },
        //初始化
        init: function () {
            this.chartPloararea(); //折线图
        },
        //请求数据
        chartPloararea: function (data) {
            var than = this;
            data == undefined ? "" : data
            than.chartPloarareaMock(); //mock模拟数据
            $.ajax({
                type: "post",
                url: than.opts.url,
                data: data,
                contentType: "application/json",
                success: function (data) {
                    data = data;
                    if (typeof  data != "object") {
                        data = JSON.parse(data)
                    }
                    if (data.status == 200) {



                        than.chartPloarareaDataBar(data.data);
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    alert(JSON.stringify(data))
                },
                complete: function (XMLHttpRequest, textStatus) {

                }
            });
        },
        //mock模拟数据
        chartPloarareaMock: function () {
            var than = this;
            var data = Mock.mock({
                "status": "200",
                "msg": "成功",
                "length": 10,
                "data": [{value: 30, color: "#2dc3e8"},
                    {value: 90, color: "#a0d468"},
                    {value: 24, color: "#7D4F6D"},
                    {value: 58, color: "#ffce55"},
                    {value: 82, color: "#e75b8d"},
                    {value: 8, color: "#fb6e52"}
                ]
            });
            Mock.mock(than.opts.url, data);
        },
        //图表数据结构
        chartPloarareaDataBar: function (data) {
            var than = this;
            var charDataPolararea = data;

            var myChartPloararea = document.getElementById(than.opts.dom);
            if (myChartPloararea != null) {
                var ctxaPolararea = myChartPloararea.getContext("2d");
                window.myBar = new Chart(ctxaPolararea).PolarArea(charDataPolararea, {
                    responsive: true
                });
            }

        },

    },
    //饼图
    pieChart: {
        //基本配置项
        opts: {
            dom: "myChartPie",
            url: "chartPie/list"
        },
        //初始化
        init: function () {
            this.chartPie(); //折线图
        },
        //请求数据
        chartPie: function (data) {
            var than = this;
            data == undefined ? "" : data
            than.chartPieMock(); //mock模拟数据
            $.ajax({
                type: "post",
                url: than.opts.url,
                data: data,
                contentType: "application/json",
                success: function (data) {
                    data = data;
                    if (typeof  data != "object") {
                        data = JSON.parse(data)
                    }
                    if (data.status == 200) {



                        than.chartPieDataBar(data.data);
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    alert(JSON.stringify(data))
                },
                complete: function (XMLHttpRequest, textStatus) {

                }
            });
        },
        //mock模拟数据
        chartPieMock: function () {
            var than = this;
            var data = Mock.mock({
                "status": "200",
                "msg": "成功",
                "length": 10,
                "data": [
                    {value: 30, color: "#a0d468"},
                    {value: 50, color: "#e75b8d"},
                    {value: 100, color: "#2dc3e8"}
                ]
            });
            Mock.mock(than.opts.url, data);
        },
        //图表数据结构
        chartPieDataBar: function (data) {
            var than = this;
            var charDataPie = data;

            var myChartPie = document.getElementById(than.opts.dom);
            if (myChartPie != null) {
                var ctxPie = myChartPie.getContext("2d");
                window.myBar = new Chart(ctxPie).Pie(charDataPie, {
                    responsive: true
                });
            }

        },

    },
    //环形图
    doughnutChar: {
        //基本配置项
        opts: {
            dom: "myChartDoughnut",
            url: "chartDoughnut/list"
        },
        //初始化
        init: function () {
            this.chartDoughnut(""); //折线图
        },
        //请求数据
        chartDoughnut: function (data) {
            var than = this;
            data == undefined ? "" : data
            than.chartDoughnutMock(); //mock模拟数据
            $.ajax({
                type: "post",
                url: than.opts.url,
                data: data,
                contentType: "application/json",
                success: function (data) {
                    data = data;
                    if (typeof  data != "object") {
                        data = JSON.parse(data)
                    }
                    if (data.status == 200) {



                        than.chartDoughnutDataBar(data.data);
                    } else {
                        alert(data.msg);
                    }
                },
                error: function (data) {
                    alert(JSON.stringify(data))
                },
                complete: function (XMLHttpRequest, textStatus) {

                }
            });
        },
        //mock模拟数据
        chartDoughnutMock: function () {
            var than = this;
            var data = Mock.mock({
                "status": "200",
                "msg": "成功",
                "length": 10,
                "data": [
                    {value: 30, color: "#a0d468"},
                    {value: 50, color: "#e75b8d"},
                    {value: 100, color: "#2dc3e8"}
                ]
            });
            Mock.mock(than.opts.url, data);
        },
        //图表数据结构
        chartDoughnutDataBar: function (data) {
            var than = this;
            var charDataDoughnut = data;
            var myChartDoughnut = document.getElementById(than.opts.dom);
            if (myChartDoughnut != null) {
                var ctxPie = myChartDoughnut.getContext("2d");
                window.myBar = new Chart(ctxPie).Doughnut(charDataDoughnut, {
                    responsive: true
                });
            }

        },

    }
};
