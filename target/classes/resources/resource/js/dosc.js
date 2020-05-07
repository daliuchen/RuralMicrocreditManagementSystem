/**
 * Created by zwq on 2018/5/24 0024.
 */
//.getUrlParam()
var t1;

var dosc={
    init:function(){
        var _dateTime=new Date();
        var _code="420881199505156565";
        //获得一条明细信息-带回调函数（主键id,回调函数）
        this.getOneListCallBack({
            data:{id: "001"},
            type:"post",
            url:""
        },function (obj) {
            dosc.fillDataForm("#form1",obj[0]);
           // dosc.fillDataForm("#form1",obj[0]);//优化后可以将表单名称也传入
        });
        //截取地址栏参数
        this.getUrlParam("name");
        //截取URL地址栏参数-简化版
        this.getUrlParamSimplify("name");
        //查找替换url参数
        this.getUrlParamSimplifyReplaceValue("key","val");
        //回填表单
        this.fillDataForm("#formName",{});
        //将指定的时间转换成时间戳（Wed Oct 31 2018 10:40:29 GMT+0800 (中国标准时间)）
        this.timeChangeTimeStamp(_dateTime);
        //将指定时间戳转成时间格式（1540953629640）
        this.timeStampChangeTime(1540953629640);
        //将指定时间戳转成时间格式（1540953629640）
        this.timeStampChangeTimeExit(1540953629640);
        //将指定的天数转成时间戳（3）
        this.dateChangeTimeStamp(3);
        //指定时间格式的连接符
        this.dateTimeConnector(_dateTime);
        //获取前几天([Sat Mar 03 2018 00:00:00 GMT+0800 (中国标准时间)],4)
        this.getPrevDte(_dateTime,3);
        //获取后几天([Sat Mar 03 2018 00:00:00 GMT+0800 (中国标准时间)],4)
        this.getNextDte(_dateTime,3);
        //将时间戳转为指定的时间格式（1540953629640）
        this.timeStampChangeDate(1540953629640);
        //从第七位字符开始，隐藏号码中间8位
        this.changeCode (_code);
        //自定义隐藏号码(首位保留几位数字，尾部保留几位数，原号码)
        this.resetCode(4,4,_code);
        //从第5位开始用*隐藏八位数值
        this.resetCodeExtend(4,4,_code);
        //禁止输入框输入中文
        this.checkNoInputChinese("domName");
        //定时器-阅读并同意倒计时
        this.setTimeout();
        //会计金额格式转数字格式
        this.setNumber("888,888,01");
        //数字格式转会计金额格式（number:数字值,必传; len:保留几位小数,默认保留两位小数,可不传）
        this.setMoney("888888.01",2);
        //截取字符串，并转为数组
        this.setString("");
        //判断文件格式是否符合要求
        this.interceptingFileSuffixes();
        //金额值转为会计金额
        this.outputdollars();
        this.dataFun();
        //截取cookie
        this.splitCookie();
        //截取字符串转为对象
        this.splitStr();
        //截取字符转对象
        this.setCuttingExtend();
        //截取地址栏参数
        this.splitStrExtend();
        //最简洁的数组去重
        this.arrSet();
        //生成随机字母(范围最小值,范围最大值:当不传递时表示生成指定位数的组合)返回字符串
        this.randomRange();
        //会计金额单位
        this.dealNumberToMoney("1230234234",0);
        //窗口大小改变
        this.winSize();
        //截取项目路径
        this.interceptProjectName();
        //验证码倒计时
        //this.verificationCodeCountdown();
    },
    //获得一条明细信息-带回调函数（主键id,回调函数）
    getOneListCallBack:function(obj,callBack){
        var sef=this;
        var data={};
        var src = "/json/oneList.json";
        $.ajax({
            type: obj.type,
            url: obj.url,
            data: obj.data,
            async: false,
            dataType: "json",
            error: function () {
                alert("请求异常！");

            },
            success: function (res) {
                var data=res;
                if(typeof callBack==="function" && callBack(data)){
                    return callBack(data);
                }

            }
        });
        return data;
    },
    //截取地址栏参数
    getUrlParam:function(name) {
        //console.log( name );
        var qs = location.search.length > 0 ? location.search.substring(1) : '',
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            key = null,
            value = null,
            i = 0,
            len = items.length;

        if (len === 0) {
            return null;
        }

        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            key = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (key.length) {
                args[key] = value;
            }
        }

        if (typeof(name) != 'undefined') {
            if ($.isEmptyObject(args[name]) || !args[name]) {
                return null;
            } else {
                return args[name];
            }
        } else {
            return args;
        }
    },
    //截取URL地址栏参数-简化版
    getUrlParamSimplify:function(name){
        var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");

        if (reg.test(location.href))

            return unescape(RegExp.$2.replace(/\+/g, " "));

        return "";

    },
    //查找替换url参数
    getUrlParamSimplifyReplaceValue:function(key,val){
        var sef=this;
        var index = str.indexOf(key);
        var indexA = index + itme.length + 1;
        var indexB = indexA + htmlName.length
        var xx = str.substring(indexA, indexB);
        xxA = str.replace(xx, val + "");
    },
    //回填表单
    fillDataForm:function(formName,obj){
        for (var demo in obj) {
            if (obj[demo] != undefined) {
                var text = (obj[demo].length == 0) ? "" : obj[demo];
                var dom = $(formName).find("[file-form=" + demo + "]");
                if (dom[0] != undefined) {
                    var type = dom[0].tagName.toLocaleLowerCase();
                    //文本元素
                    if (type == 'div' || type == 'span' || type == 'span' || type == 'textarea') {
                        dom.text(text);
                    }
                    //输入框
                    else if (type == 'input') {
                        if (dom.attr("type") == "radio" || dom.attr("type") == "checkbox") {
                            if (typeof text == "string" || (text + "").indexOf(",") != -1) {
                                var splitA = text.split(",");
                                $(dom).removeAttr("checked")
                                $(dom).each(function (index, val, arr) {
                                    var me = $(this);
                                    var valA = me.val();
                                    if (splitA.indexOf(valA) != -1) {
                                        me.click();
                                        me.attr("checked", "checked")
                                        if (me.next(".layui-form-radio")[0] != undefined || me.next(".layui-form-checkbox")[0] != undefined) {
                                            me.next(".layui-form-radio").addClass("layui-form-checked");
                                            me.next(".layui-form-checkbox").addClass("layui-form-checked");
                                        }
                                    }
                                })
                            } else {
                                $(dom).each(function () {
                                    var me = $(this);
                                    if (me.val() == text) {
                                        me.click();
                                        me.attr("checked", "checked")
                                        if (me.next(".layui-form-radio")[0] != undefined || me.next(".layui-form-checkbox")[0] != undefined) {
                                            me.next(".layui-form-radio").addClass("layui-form-checked");
                                            me.next(".layui-form-checkbox").addClass("layui-form-checked");
                                        }
                                    } else {
                                        me.removeAttr("checked")
                                    }
                                })
                            }

                        } else {
                            dom.val(text)
                        }
                    }

                    //下拉框
                    else if (type == 'select') {
                        $(dom).find("option").each(function (index, val, arr) {
                            var _val = $(val).val()
                            if (_val == text) {
                                $(val).attr("selected", "selected");
                            } else {
                                $(val).removeAttr("selected", "selected");
                            }
                        })
                    }
                }
            }

        }
    },
    //提交验证
    validate:function(){
        var _validate = $("#Form").data('bootstrapValidator').validate().isValid();
    },
    //将指定的时间转换成时间戳（Wed Oct 31 2018 10:40:29 GMT+0800 (中国标准时间)）
    timeChangeTimeStamp:function(date){
        //var date=new Date();
        var _date=  date.getTime();
        return _date; //1540953629640
    },
    //将指定时间戳转成时间格式（1540953629640）
    timeStampChangeTime:function (date) {
        //var date=1540953629640;
        var _date=new Date(date);
        return _date;
    },
    //将指定时间戳转成时间格式（1540953629640）
    timeStampChangeTimeExit:function (date) {
        var _date=new Date(date);
        var _year=_date.getFullYear();//年

        var _month=_date.getMonth()+1;//月(0 ~ 11)
        _month=(_month<10)?("0"+_month):_month;

        var _tian=_date.getDate();//天
        _tian=(_tian<10)?("0"+_tian):_tian;

        var _hours=_date.getHours();//小时 (0 ~ 23)
        _hours=(_hours<10)?("0"+_hours):_hours;

        var _minutes=_date.getMinutes();//分钟
        _minutes=(_minutes<10)?("0"+_minutes):_minutes;

        var _seconds=_date.getSeconds();//秒数
        _seconds=(_seconds<10)?("0"+_seconds):_seconds;

        return _year+"-"+_month+"-"+_tian+" "+_hours+":"+_minutes+":"+_seconds
    },
    //将指定的天数转成时间戳（3）
    dateChangeTimeStamp:function(data){
        //var data=3;
        var _data=data * 24 * 3600 * 1000;
        return _data;
    },
    //指定时间格式的连接符
    dateTimeConnector:function(data,oddConnector,newConnector){
        var data=new  Date();
        var str=date.toLocaleDateString();
        var oddConnector=oddConnector==undefined?"/":oddConnector;
        var newConnector=newConnector==undefined?"-":newConnector;
        var strDate = str .replace(new RegExp(oddConnector,'g'),newConnector);
        return strDate;
    },
    //获取前几天([Sat Mar 03 2018 00:00:00 GMT+0800 (中国标准时间)],4)
    getPrevDte:function (dateTime,date) {
        var sef=this;
        var _dateTime=sef.timeChangeTimeStamp(dateTime);
        var _date=sef.dateChangeTimeStamp(date);
        var _dateTime1=_dateTime-_date;
        return _dateTime1;
    },
    //获取后几天([Sat Mar 03 2018 00:00:00 GMT+0800 (中国标准时间)],4)
    getNextDte:function (dateTime,date) {
        var sef=this;
        var _dateTime=sef.timeChangeTimeStamp(dateTime);
        var _date=sef.dateChangeTimeStamp(date);
        var _dateTime1=_dateTime+_date;
        return _dateTime1;
    },
    //将时间戳转为指定的时间格式（1540953629640）
    timeStampChangeDate:function (date) {
        //var date=new Date(1540953629640);
        var date1=date.toLocaleDateString();
        return date1;
    },
    //隐藏号码中间几位
    changeCode:function (str) {
       // var str = "420881199505156565";
        var m =str.length;
        var n = str.indexOf('=');
        var j = str.substring(6,(m-4));
        var s = str.replace(j,'********');
    },
    //隐藏号码中间几位
    //(首位保留几位数字，尾部保留几位数，原号码)
    resetCode:function (firstLen,lastLen,str) {
        var str=str,
            j,
            s,
            strArr=[],
            strArr2;
        if (str === "" || str === null || str == undefined) {
            return ""
        } else {
            m = str.length;
            j = str.substring(4, (m - 4));
            strArr = [];
            for (var o = 0; o < j.length; o++) {
                strArr.push("*")
            }
            strArr2 = strArr.join("");
            s = str.replace(j, strArr2);
        }
        return s;
    },
    //从第n位开始用*隐藏m位字符
    resetCodeExtend:function (firstLen,strLen,str) {
        var str=str.toString(),
            j,
            s,
            strArr=[],
            strArr2;
        if (str === "" || str === null || str == undefined) {
            return ""
        } else {
            m = str.length;
            j = str.substring(firstLen, (firstLen+strLen));
            strArr = [];
            for (var o = 0; o < strLen; o++) {
                strArr.push("*")
            }
            strArr2 = strArr.join("");
            s = str.replace(j, strArr2);
        }
        return s;
    },
    //禁止输入框输入中文
    checkNoInputChinese:function (domName) {
        var msg;
        $(domName).bind("input propertychange change", function(event) {
            var str = $(this).val();
            var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
            if (reg.test(str)) {
                //layer.msg("编码不能输入中文");
                msg=false;
            }
        });
        return msg;
    },
    //截取cookie
    splitCookie:function () {
        var strcookie = document.cookie;
        var arrcookie = strcookie.split("; ");
        var obj={};
        var str;
        for(var i=0; i<arrcookie.length;i++){
            str=arrcookie[i].split("=");
            obj[""+str[0]]=str[1];
        }
    },
    //截取字符串转为对象
    splitStr:function(str){
        return JSON.parse('{"' + decodeURIComponent(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    },
    //字符转为"*",几位字符转为几位的
    dataFun:function(data){
        data = data.toString();
        data = data.replace(".", "");
        var str = "";
        for (var i = 0; i < data.length; i++) {
            str += "*";
        }
        return str;
    },
    //定时器-阅读并同意倒计时
    setTimeout: function (strTime) {
        var than=this;
        strTime =strTime==undefined? 5:strTime;
        $("#agreement").text("同意(" + strTime + "秒)");
        strTime--;
        if (strTime == -1) {
            window.clearInterval();
            $("#agreement").removeAttr("disabled");
            $("#agreement").text("同意");
        } else {
            t1 = window.setTimeout(function () {
                than.setTimeout();
            }, 1000)
        }
    },
    //金额值转为会计金额
    outputdollars:function (number) {
        number=(number).toString();
        if(number.indexOf(".")!=-1){
            if (number.length <= 3)
                return (number == '' ? '0' : number);
            else {
                if(number.lastIndexOf(".")==(number.length-3)){
                    var j = number.substring(number.lastIndexOf("."), (number.length-3));
                    number = str.replace(j, strArr2);
                    //var b=a.replace(".00","")
                }
                var mod = number.length % 3;
                var output = (mod == 0 ? '' : (number.substring(0, mod)));
                for (i = 0; i < Math.floor(number.length / 3); i++) {
                    if ((mod == 0) && (i == 0))
                        output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                    else
                        output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
                }
                return (output);
            }
        }else {

        }
    },
    //
    interceptingFileSuffixes:function (str,type) {
        var fileName = str.lastIndexOf("."); //取到文件名开始到最后一个点的长度
        var fileNameLength = str.length; //取到文件名长度
        var fileFormat = str.substring(fileName + 1, fileNameLength); //截
        if(type.indexOf(fileFormat)){
            alert("文件格式不符合要求");
        }
    },
    //会计格式转数字格式
    setNumber: function (number) {
		number=number.toString()
        var numberVal = (number != undefined ? number : 0);
        if (numberVal.indexOf(",") != -1) {
                numberVal = numberVal.replace(/,/g, "");
            }
            if (numberVal.indexOf("，") != -1) {
                numberVal = numberVal.replace(/，/g, "");
            }

        numberVal = parseFloat(numberVal);
        return numberVal;
    },
    //数字格式转会计金额格式
    setMoney(number,len){
        var numberVal=(number != undefined ? number : 0);
        var lenVal=(len != undefined ? len : 2);
        numberVal=numberVal.toFixed(lenVal);
        numberVal=parseFloat(number);
        numberVal=numberVal.toLocaleString();
        if(numberVal.indexOf(".")==-1){
            var arr=[]
            for(var i=0; i<len;i++){
                arr.push("0");
            }
            var strArr=arr.join("")
            numberVal= numberVal+"."+strArr;
        }
        return numberVal;
    },
    //截取字符串，并转为数组
    setString:function (str) {
        var a=str;
        var index1=a.indexOf("=");
        var b=a.substring(index1+1,a.length);
        var c=b.split(",");
        return c;
    },
    //截取字符转对象
    setCuttingExtend:function (str) {
        var str=decodeURIComponent(str);
        var arrA,arrB,arrC=[],obj={};
        if(str.indexOf("&")!=-1){
            arrA=str.split("&");
            if(arrA!=undefined){
                arrA.forEach(function (val,index,arr) {
                    var str=val.toString();
                    arrB=str.split("=");
                    if(arrB.length==2){
                        obj[arrB[0]]=arrB[1]
                    }
                })
            }
            return obj
        }else {
            arrB=str.split("=");
            obj[arrB[0]]=arrB[1]
        }
        return obj;
    },
    //截取地址栏参数
    splitStrExtend:function (str) {
      // q={}; location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v); q;

        //?ie=UTF-8&wd=jquery%20源码分析&ids=1,3,4,6,7
        // {ie: "UTF-8", wd: "jquery%20%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90", ids: "1,3,4,6,7"}
    },
    //数组去重
    arrSet:function (arr) {
       // var arr=[1,4,3,2,2,2,56,7,8,3]
        return new Set(arr)
    },
    //生成随机字母
    randomRange:function (min, max){
        var returnStr = "",
            range = (max ? Math.round(Math.random() * (max-min)) + min : min),
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for(var i=0; i<range; i++){
            var index = Math.round(Math.random() * (arr.length-1));
            returnStr += arr[index];
        }
        return returnStr;
    },
    dealNumberToMoney:function (str,unit){
        var newStr = "";
        var count = 0;
        var number="";

        if(str.indexOf(".")==-1){
            for(var i=str.length-1;i>=0;i--){
                if(count % 3 == 0 && count != 0){
                    newStr = str.charAt(i) + "," + newStr;
                }else{
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr + ".00"; //自动补小数点后两位
            number=str;
            console.log(str)
        }
        else
        {
            for(var i = str.indexOf(".")-1;i>=0;i--){
                if(count % 3 == 0 && count != 0){
                    newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
                }else{
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
            number=str;
            console.log(str)
        }
        if(unit==0){
            number=number.replace(".00","")
        }
        return number;
    },
    winSize:function () {
        $(window).resize(function(){
            $(window).resize();
        });
    },
    //截取项目路径
    interceptProjectName:function(){
        var webName=window.location.pathname;
        webName1=(webName.match(/([^\/]*\/){1}([^\/]*)/)[2]);
        hrefA=window.location.origin+"/"+webName1;
        return {
            location:hrefA,
            pathname:webName
        };
    },
    //保存json文件到本地
    saveJson:function () {
        $(".btn-save-json").click(function () {
            var me=$(this);
            var href=me.attr("data-href");
            var webName=window.location.pathname;
            webName1=(webName.match(/([^\/]*\/){1}([^\/]*)/)[2]);
            webName2=(webName.match(/([^\/]*\/){2}([^\/]*)/)[2]);
            var hrefA=window.location.origin+"/"+webName1+"/"+webName2+href;

            $.ajax({
                type: "post",
                url:hrefA,
                async: false,
                dataType: "json",
                error: function () {
                    $.promptMmessage({text:"请求失败！",status:3},true);
                },
                success: function (res) {
                    var blob = new Blob([JSON.stringify(res)], {type: ""});
                    saveAs(blob, "index.json");
                }
            });
        })
    },
    //验证码倒计时
    verificationCodeCountdown:function (dom) {
        var than=this;
        if(wait>0){
            wait--;
            $("#btnSend").text(wait+"秒后重发").attr("disabled","disabled");
            window.setTimeout(function () {
                than.verificationCodeCountdown();
            },1000)
        }else {
            wait=60
            $("#btnSend").text("发送短信验证码").removeAttr("disabled");
        }
    }

};







