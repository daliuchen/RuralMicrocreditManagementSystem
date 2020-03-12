/**
 * Created by zwq on 2019/6/5 0006.
 * 参考：https://juejin.im/post/5cf5e1d9e51d45773f2e8f00
 * 封装ajax,http跨域问题
 * 当我们熟练的使用axios，fetch,promise的时候是否还会想起，当年的ajax，让我们来重温ajax原理，感受一下经典
 * GET请求与POST请求的对比：
 * GET请求没有请求体，因为GET请求的参数拼接到地址栏中了
 * POST请求有请求体，就是传递的参数
 * POST请求需要指定content-type属性。
 *参数名  参数类型	 描述	 传值	      默认值
 * type    string  请求方式  get/post  只要不传post，就是get
 url       string  请求地址  接口地址  如果不传地址，不发送请求
 async     boolean 是否异步  true/fase  只要不传false，那就是true，异步请求
 data      object  请求数据  {key:value,key1:value2} 需要把这个对象拼接成参数的格式 uname=hucc&upass=12345
 dataType  string  返回的数据类型 xml/json/text text
 success   function 响应成功时调用 - -
 error     function 响应失败时调用 - -
 同源策略：协议相同、域名相同、端口相同
 *
 * 不同源以下三种行为都将收到限制
 * Cookie、LocalStorage 和 IndexDB 无法读取。
 * DOM 无法获得。
 * AJAX 请求不能发送。
 *
 * jsonp( 无兼容性问题 )仅支持get请求，发送的数据量有限。
 * script img link 标签不受同源策略限制
 * a标签下载需要更改后台服务器配置，或者后台做反向代理
 * <a href="http://www.ids123.com/img/w3logo.gif" download="t">下载</a>
 */
var $ = {
    ajax: function (options) {
        //如果options参数没有传递，直接返回。
        if (!options || typeof options !== "object") {
            return;
        }

        //处理默认参数
        //如果参数不是post，那就默认为get
        var type = options.type == "post" ? "post" : "get";
        //如果没有传url，那就传当前地址
        var url = options.url || location.pathname;
        //如果参数不是false，那就默认是true，发异步请求
        var async = options.async == false ? false : true;

        var params = this.getParams(options.data);

        //1. 创建一个XMLHttpRequest对象
        //var xhr = new XMLHttpRequest();
        //处理兼容性
        var xhr = null;
        if(XMLHttpRequest){
            //现代浏览器 IE7+
            xhr = new  XMLHttpRequest();
        }else{
            //老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        //设置请求行
        if (type == "get") {
            url = url + "?" + params;
        }
        //2. 设置请求行
        // 第一个参数:请求方式  get/post
        // 第二个参数:请求的地址 需要在url后面拼上参数列表
        //post请求的参数列表在请求体
        xhr.open(type, url, async);

        //3. 设置请求头
        //请求头中可以设置Content-Type,用以说明请求主体的内容是如何编码,get请求时没有请求体,无需设置
        // post 请求必须要设置 content-type, 标记请求体内容的解析方式, 不然后端无法解析获取数据
        if (type == "post") {
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        }
        //4. 设置请求参数
        //get请求的请求体为空,因为参数列表拼接到url后面了
        xhr.send(params);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    /*根据响应头的content-type属性指定方法接收到的内容*/
                    var contentType = xhr.getResponseHeader('content-type');
                    var data = null;
                    if (contentType.indexOf('json') > -1) {
                        data = JSON.parse(xhr.responseText);
                    } else if (contentType.indexOf('xml') > -1) {
                        data = xhr.responseXML;
                    } else {
                        data = xhr.responseText;
                    }
                    /*执行成功函数*/
                    options.success && options.success(data);
                } else {
                    options.error && options.error(xhr.responseText);
                }

            }
        }
    },
    getParams: function (obj) {
        //将obj对象转换成参数
        //将对象转换成参数列表
        if (!obj) {
            return null;
        }
        var arr = [];
        for (var k in obj) {
            arr.push(k + "=" + obj[k]);
        }
        return arr.join("&");
    }

};

//  //formData管理表单数据
// //1. 使用formData必须发送post请求
// xhr.open("post", "02-formData.php");
//
// //2. 获取表单元素
// var form = document.querySelector("#myForm");
// //3. 创建form对象，可以直接作为send的参数。
// var formData = new FormData(form);
//
// //4. formData可以使用append方法添加参数
// formData.append("id", "1111");
//
// //5. 发送，不需要指定请求头，浏览器会自动选择合适的请求头
// xhr.send(formData);



// // 文件上传
// var formData = new FormData();
// //获取上传的文件，传递到后端
// var file = document.getElementById("file").files[0];
// formData.append("file", file);
// xhr.send(formData);


//显示文件进度信息
// 需要注册 xhr.upload.onprogress = function(e){} 事件，用于监听文件上传的进度.注意：需要在send之前注册。
// 上传的进度信息会存储事件对象e中
// e.loaded表示已上传的大小   e.total表示整个文件的大小

// xhr.upload.onprogress = function (e) {
//
//     inner.style.width = (e.loaded/e.total*100).toFixed(2)+"%";
//     span.innerHTML = (e.loaded/e.total*100).toFixed(2)+"%";
// }
// xhr.send(formData);


//跨域资源共享(CORS) ( 兼容性IE10+ )
// 在响应头中添加Access-Control-Allow-Origin Header资源权限配置。

// jsonp与cors的对比:
// jsonp兼容性好，老版本浏览器也支持，但是jsonp仅支持get请求，发送的数据量有限。使用麻烦
// cors需要浏览器支持cors功能才行。但是使用简单，只要服务端设置允许跨域，对于客户端来说，跟普通的get、post请求并没有什么区别。
// 跨域的安全性问题：因为跨域是需要服务端配合控制的 ，也就是说不论jsonp还是cors，如果没有服务端的允许，浏览器是没法做到跨域的。






// 其他的跨域手段
// 以下方式基本不用啊，了解即可：
// 1、顶级域名相同的可以通过domain.name来解决，即同时设置 domain.name = 顶级域名（如example.com）
// 2、document.domain + iframe
// 3、window.name + iframe
// 4、location.hash + iframe
// 5、window.postMessage()
