/**
 * Created by zwq on 2017/8/9 0009.
 * 功能：echarts 多Y轴图表
 * 功能描述：添加了mock模拟真实数据请求，便于复用
 */
var InitiateLineEchatrs=function(){
    return {
        //基本配置
        ops:{
            url:"combination/ECharts",//请求地址
            dom:"combinationECharts"//图表dom
        },
        //初始化
        init:function(){
            this.getDataFun();
        },
        //请求数据
        getDataFun:function(){
            var sef=this;
            sef.mockData();
            $.ajax({
                type:"GET",
                url : sef.ops.url,
                dataType: "json",
                success : function(result){
                    if(result.status == 200){
                        var data=result.data;
                        console.log("请求连接："+sef.ops.url);
                        console.log("获取到的数据"+JSON.stringify(data));
                        //echarts数据结构
                        var option=sef.processingDataFun(data);

                        // 基于准备好的dom，初始化echarts实例
                        var dome2=document.getElementById(sef.ops.dom);
                        var myChart = echarts.init(dome2);

                        myChart.clear(); //清理重绘
                        myChart.setOption(option);
                    }
                },
                complete : function(XMLHttpRequest, textStatus) {
                }
            });
        },
        //echarts数据结构
        processingDataFun:function(chartsDataObj,dom){
            var colors = ['#47a9ff', '#18dc7c', '#12d3d5', '#7eda46', '#ffc21e', '#ffa81e', '#fe6560', '#917af5'];

            var seriesData=[];//数据
            var legend=[]; //标题
            var yAxisVal=[];//多y轴说明
            var dataY=chartsDataObj.Ycoordinate;//Y轴

            for(var i=0; i<dataY.length;i++){
                var chartType='line';
                var positionType='right';
                var formatter='{value} %';
                if((dataY[i].name).indexOf("时间") != -1){
                    chartType='bar';
                    positionType='left';
                    formatter='{value} s';
                }
                var objA={
                    name:dataY[i].name,
                    type:chartType,
                    data:dataY[i].data
                };

                var objB={
                    nameLocation: 'center',
                    nameGap:'45',
                    type: 'value',
                    name: dataY[i].name,
                    min: 0,
                    max: 100,
                    position: positionType,
                    axisLine: {
                        lineStyle: {
                            color: colors[i]
                        },
                        textStyle: {
                            fontSize:12
                        }
                    },
                    axisLabel: {
                        formatter: formatter,
                    }

                }
                if(objB.position == 'right'){
                    if(i>0){
                        objB.offset=((i-1)*65);
                    }
                }
                if(dataY[i].data.length<8){
                    objA.barWidth = 30//柱图宽度
                }

                legend.push(dataY[i].name);
                seriesData.push(objA);
                yAxisVal.push(objB);
            }
            var dataX=chartsDataObj.Xcoordinate;//X轴

            if(dataX.length==0){
                $("#"+dom).next().text("暂无数据")
            }else{
                $("#"+dom).next().text(" ")
            }
            // 指定图表的配置项和数据
            option = {
                text: '水量参数',//标题
                color: colors,

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    top:'35px',
                    right: ((legend.length-1)*65)+"px",
                    left:'70px',
                    bottom: '70px',
                },
                toolbox: {
                    right:"30px",
                    feature: {
                        //dataView: {show: true, readOnly: false},
                        dataView: {
                            readOnly: true,
                            optionToContent:function(opt) {
                                var axisData = opt.xAxis[0].data;
                                var series = opt.series;
                                var tableTh="<tr><td>时间</td>";
                                var tableTd="";
                                var tableTdTd="";
                                for(var o=0; o<series.length;o++){
                                    tableTh+='<td>' + series[o].name + '</td>';
                                }
                                tableTh+='</tr>';

                                for(var p=0;p<axisData.length;p++){
                                    tableTdTd="";
                                    tableTdTd+='<tr><td>' + axisData[p] + '</td>';
                                    for(var l=0; l<series.length;l++){
                                        var title=series[l].data[p];

                                        if(title!==undefined){
                                            title=title;
                                        }else{
                                            title="0";
                                        }
                                        tableTdTd+='<td>' + title + '</td>';
                                    }
                                    tableTdTd+='</tr>';
                                    tableTd+=tableTdTd;
                                }

                                var tableDom1='<table class="table table-striped"><thead>'+tableTh+'</thead><tbody>'+tableTd+'</tbody></table>'
                                return tableDom1;
                            }
                        },
                        saveAsImage: {show: true,title:'保存为图片'}
                    }
                },
                //标题
                legend: {
                    data:legend,
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 45,
                        end: 65
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 65,
                        end: 85
                    }
                ],
                //x轴
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: dataX,
                        axisLabel:{
                            //rotate:-75
                        }
                    }
                ],
                //y轴
                yAxis:yAxisVal,
                series:seriesData
            };
            return option;
        },
        //mock模拟数据
        mockData:function(){
            var than=this;
            var data=Mock.mock({
                "status": "200",
                "msg": "成功",
                "length":10,
                "data": {
                    "Ycoordinate": [{
                        "name": "径流总量控制率",
                        "data": [30.0, 50.0, 60.0, 40.0]
                    }, {
                        "name": "峰值延迟时间",
                        "data": [40.0, 50.0, 90.0, 60.0, 100.0]
                    }, {
                        "name": "峰值削减率",
                        "data": [70.0, 80.0, 30.0, 20.0, 100.0]
                    }, {
                        "name": "SS去除率",
                        "data": [10.0, 20.0, 20.0, 60.0, 100.0]
                    }, {
                        "name": "TN去除率",
                        "data": [30.0, 40.0, 79.0, 70.0, 100.0]
                    }, {
                        "name": "TP去除率",
                        "data": [50.0, 60.0, 70.0, 55.0, 100.0]
                    }, {
                        "name": "COD去除率",
                        "data": [70.0, 80.0, 40.0, 36.0, 100.0]
                    }, {
                        "name": "NH3-N去除率",
                        "data": [90.0, 100.0, 60.0, 56.0, 100.0]
                    }],
                    "Xcoordinate": ["2018-05-14 11:50:42", "2018-05-14 11:50:57", "2018-05-19 09:23:49", "2018-05-19 09:27:33", "2018-05-29 16:04:55", "2018-05-29 16:07:40"]
                }
            });
            Mock.mock(than.ops.url,data);
        }
    }
}();
InitiateLineEchatrs.init();

