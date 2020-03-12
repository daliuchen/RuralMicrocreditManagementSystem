/**
 * Created by zwq on 2019/4/17 0006.
 * 功能描述：使用mock 模拟数据请求接口
 */
Mock.setup({
    timeout: "200-400"
});

var mockDataInit = {
    init: function () {
        this.userData.init();//用户列表
        this.roleData.init();//角色权限
        this.formulaData.init();//公式列表
        this.treeData.init();//树
        this.treeTable.init();//表格树
        this.chartData.init();//图表
    },
    //用户
    userData: {
        init: function () {
            this.list(); //列表
            this.listTest(); //列表
            this.add(); //新增
            this.update(); //修改
            this.del(); //刪除
            this.detail(); //详情
            this.setData(); //设置数据
        },
        //请求接口
        ops:{
            list:"user/list",
            listTest:"http://localhost:63343/web_template/static/user/list",
            add:"user/add",
            update:"user/update",
            del:"user/del",
            detail:"user/detail"
        },
        data1: {},
        setData: function (obj) {
            var than = this;
            var objA;
            if (obj == undefined) {
                objA = {
                    "status": "200",
                    "msg": "成功",
                    "data": {
                        "list|15": [
                            {
                                "id|+1": "@guid()",
                                "name|+1": '@name()',
                                'sex|+1': ["男", "女"],
                                "email|+1": '@email',
                                'hobby|+1': ["音乐", "编程", "看书", "电影", "画画", "美食"],
                                'createTime':  '@date("yyyy-MM-dd")',
                                'createId|+1':  '@name()',
                                'delFlag|+1': ["s", "CSGS3"],
                                'city':"",
                                'experience':'',
                                'classify|+1':['作家',"词人","打酱油","诗人"]
                            }
                        ],
                        "length": 15,
                        "pageNumber": 1,
                        "pageSize": 10
                    }
                }
            } else {
                objA = obj;
            }
            objA = Mock.mock(objA);
            than.data1 = objA;
            //return ;
        },
        list: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);
                        var dataObj = than.data1;
                        dataObjA = dataObj.data.list;
                        // Mock.mock(than.data(dataObj));
                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObjA.length, dataObjA);
                        var data = {
                            "status": "200",
                            "msg": "成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };

                        return data;
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.list, /get|post/i, list);
        },
        listTest: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);
                        var dataObj = than.data1;
                        dataObjA = dataObj.data.list;
                        // Mock.mock(than.data(dataObj));
                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObjA.length, dataObjA);
                        var data = {
                            "status": "200",
                            "msg": "成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };

                        return data;
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.listTest, /get|post/i, list);
        },
        add: function () {
            var than = this;
            var add = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var dataObj = than.data1;
                        dataObj = dataObj.data.list;

                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);//
                        var number = dataObj.length + 1;
                        urlObj.id = number;
                        dataObj.unshift(urlObj);

                        var newData = Mock.mock({
                            "status": "200",
                            "msg": "新增成功",
                            "data": {
                                list: dataObj,
                                "length": dataObj.length
                            }
                        });
                        than.data = newData;
                        than.setData(newData);
                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObj.length, newData.data.list);
                        return {
                            "status": "200",
                            "msg": "新增成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };
                        break;
                    default:
                        break;
                }
                return add;
            };
            Mock.mock(than.ops.add, /get|post/i, add);
        },
        update: function () {
            var than = this;
            var update = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var dataObj = than.data1;
                        dataObj = dataObj.data.list;
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);
                        dataObj.forEach(function (val, index, arr) {
                            if (val["id"] == urlObj["id"]) {
                                dataObj[index] = urlObj
                            }
                        });
                        var newData = {
                            "status": "200",
                            "msg": "修改成功",
                            "length": dataObj.length,
                            "data": {
                                list: dataObj
                            }
                        };

                        than.data = newData;
                        than.setData(newData);

                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObj.length, newData.data.list);
                        return {
                            "status": "200",
                            "msg": "修改成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };
                        break;
                    default:
                        break;
                }
                return update;
            };
            Mock.mock(than.ops.update, /get|post/i, update);
        },
        del: function () {
            var than = this;
            var del = function (options) {
                var dataObj = than.data1;
                dataObj = dataObj.data.list;
                var dataArr = [];
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlOjb = dosc.setCuttingExtend(str);
                        dataObj.forEach(function (val, index, arr) {
                            if (urlOjb.id.indexOf(val.id) == -1) {
                                dataArr.push(val);
                            }
                        });
                        var newData = Mock.mock({
                            "status": "200",
                            "msg": "成功",
                            "data": {
                                list: dataArr,
                                "length": dataArr.length
                            }
                        });
                        than.data = newData;
                        than.setData(newData);
                        var dataA = than.pageData(urlOjb.currentPage, urlOjb.pageSize, dataObj.length, newData.data.list);
                        return {
                            "status": "200",
                            "msg": "删除成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };
                        break;
                    default:
                        break;
                }
                return del;
            };
            Mock.mock(than.ops.del, /get|post/i, del);
        },
        detail: function () {
            var than = this;

            var detail = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var dataObj = than.data1;
                        dataObj = dataObj.data.list;
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var obj = dosc.setCuttingExtend(str);
                        var Arr = [];
                        for (var i in obj) {
                            dataObj.forEach(function (val, index, arr) {
                                if (val[i] == obj[i]) {
                                    Arr.push(val)
                                }
                            })
                        }
                        return Mock.mock({
                            "status": "200",
                            "msg": "成功",
                            "length": 11,
                            "data": Arr
                        });
                        break;
                    default:
                        break;
                }
                return detail;
            };
            Mock.mock(than.ops.detail, /get|post/i, detail);
        },
        pageData: function (pageNumber, pageSize, length, newData) {
            //页码；条数，原数据
            var than = this;
            var pageA = than.page;
            pageA.currentPage = pageNumber = pageNumber == undefined ? 1 : pageNumber;//页码
            pageA.pageSize = pageSize = pageSize == undefined ? 10 : pageSize;//条数
            pageA.offset = pageNumber = pageNumber == undefined ? 1 : pageNumber;//页码
            pageA.length = length;//总条数
            pageA.data = [];//数据
            var a = (parseInt(pageNumber) - 1) * parseInt(pageSize);
            var b = parseInt(pageNumber) * parseInt(pageSize);
            var dataA = newData;
            var data = dataA;
            for (var i = a; i < b; i++) {
                if (typeof data[i] != "undefined") {
                    pageA.data.push(data[i])
                }
            }

            return pageA;
        },
        page: {
            currentPage: Number,
            pageSize: Number,
            offset: Number,
            length: Number,
            data: []
        }
    },

    //角色权限相关操作
    roleData: {
        init: function () {
            this.login();//登录
            this.register();//注册
            this.setData(); //设置数据
        },
        data: {},
        ops:{
            login:'role/login',
            register:'role/register'
        },
        setData: function (obj) {
            var than = this;
            var objA;
            if (obj == undefined) {
                objA = {
                    "status": "200",
                    "msg": "成功",
                    "data": {
                        "list|4": [
                            {
                                id: "@guid()",
                                "userName|+1": [
                                    "admin",
                                    "user",
                                    "zhangsan",
                                    "test"
                                ],
                                'password|+1': ["admin123456", "user123456", "zs123456", "test123456"],
                                "user|+1": ["admin", "user", "user", "test"]
                            }
                        ],
                        "length": 15,
                        "pageNumber": 1,
                        "pageSize": 10,
                        "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUzMDMyODY2MywiaWF0IjoxNTI5NzIzODYzfQ.cgmhRgLhy8P0U2l1oLhZqHwlsetp4tUGWjxaDRjHq2uKYOKSveZikhsl_r1drbNQ8lg8ErviShknFVgo-nXg1g"
                    }
                }
            } else {

                objA = obj;
            }
            var storage = window.localStorage;
            var storageData = storage.getItem("data-users");
            if (storageData == null) {
                objA = (obj==undefined?objA:obj);
            } else {
                objA = JSON.parse(storageData)
            }
            objA = Mock.mock(objA);
            than.data = objA;
        },
        login: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        urlObj = decodeURIComponent(str);
                        urlObj = dosc.setCuttingExtend(str);
                        than.setData();
                        var dataObj = than.data;
                        dataObjA = dataObj.data.list;
                        var dataA = [];
                        var data = {
                            "status": "200",
                            "msg": "登录成功"
                        };
                        dataObjA.forEach(function (val, index, arr) {
                            if (val.userName==urlObj.userName) {
                                dataA.push(val);
                            }
                        });
                        if (dataA.length > 0) {
                            if (dataA[0].password == urlObj.password) {
                                data = {
                                    "status": "200",
                                    "msg": "成功",
                                    "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUzMDMyODY2MywiaWF0IjoxNTI5NzIzODYzfQ.cgmhRgLhy8P0U2l1oLhZqHwlsetp4tUGWjxaDRjHq2uKYOKSveZikhsl_r1drbNQ8lg8ErviShknFVgo-nXg1g"
                                }
                            } else {
                                data = {
                                    "status": "401",
                                    "msg": "密码错误"
                                }
                            }
                        } else {
                            data = {
                                "status": "401",
                                "msg": "账户名不存在<br>1、请检查账户名是否输入正确； <br>2、注册新账户。"
                            }
                        }
                        return data;
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.login, /get|post/i, list)
        },
        register: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        urlObj = decodeURIComponent(str);
                        urlObj = dosc.setCuttingExtend(str);
                        var dataObj = than.data;
                        dataObjA = dataObj.data.list;
                        var dataA = dataObjA;
                        var arrB = 0;
                        var data = {};
                        dataObjA.forEach(function (val, index, arr) {
                            if (val.userName == urlObj.userName) {
                                arrB++;
                            }
                        });
                        dataA.push(urlObj);
                        if (arrB == 0) {
                            data = {
                                "status": "200",
                                "msg": "成功",
                                "data": {
                                    "list": dataA,
                                    "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTUzMDMyODY2MywiaWF0IjoxNTI5NzIzODYzfQ.cgmhRgLhy8P0U2l1oLhZqHwlsetp4tUGWjxaDRjHq2uKYOKSveZikhsl_r1drbNQ8lg8ErviShknFVgo-nXg1g"
                                }
                            };
                            var storage = window.localStorage;
                            var dataA = JSON.stringify(data);
                            storage.setItem("data-users", dataA);
                        } else {
                            data = {
                                "status": "403",
                                "msg": "用户已存在"
                            }
                        }

                        than.setData(dataA);
                        return data;
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.register, /get|post/i, list)
        }
    },

    //公式
    formulaData: {
        init: function () {
            this.list();//公式列表
            this.add();//公式列表-新增
            this.update();//公式列表-修改
            this.del();//公式列表-刪除
            this.detail();//公式列表-查看详情
            this.setData();//设置数据
        },
        //请求接口
        ops:{
            list:'formula/list',
            add:'formula/add',
            update:'formula/update',
            del:'formula/del',
            detail:'formula/detail'
        },
        data1: {},
        setData: function (obj) {
            var than = this;
            var objA;
            if (obj == undefined) {
                objA = {
                    "status": "200",
                    "msg": "成功",
                    "data": {
                        "list|15": [
                            {
                                id: "@guid()",
                                "formulaName|+1": [
                                    "加法两参数",
                                    "测试公式3次",
                                    "测试公式2次",
                                    "测试常量2",
                                    "测试常量",
                                    "y",
                                    "r",
                                    "w",
                                    "q"
                                ],
                                'formulaMapping|+1': ["s", "CSGS3"],
                                'formulaValue|+1': ["a+b+c+6", "CSGS2(aaa,bbb)+zz", "aaa+bbb", "30", "12", "y(y)+2", "r+5", "w+2", "q+5"],
                                'formulaType|1-3': 3,
                                'number': 202,
                                'createTime': '@date("yyyy-MM-dd")',
                                'createId|+1': ["admin", "wenqian", "qiqi", "zhangsan", "anan"],
                                'delFlag|+1': ["s", "CSGS3"]
                            }
                        ],
                        "length": 15,
                        "pageNumber": 1,
                        "pageSize": 10
                    }
                }
            } else {
                objA = obj;
            }
            objA = Mock.mock(objA);
            than.data1 = objA;
            //return ;
        },
        list: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);
                        var dataObj = than.data1;
                        dataObjA = dataObj.data.list;
                        // Mock.mock(than.data(dataObj));
                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObjA.length, dataObjA);
                        var data = {
                            "status": "200",
                            "msg": "成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };

                        return data;
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.list, /get|post/i, list);
        },
        add: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var dataObj = than.data1;
                        dataObj = dataObj.data.list;

                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);//
                        var number = dataObj.length + 1;
                        urlObj.id = number;
                        dataObj.unshift(urlObj);

                        var newData = Mock.mock({
                            "status": "200",
                            "msg": "新增成功",
                            "data": {
                                list: dataObj,
                                "length": dataObj.length
                            }
                        });
                        than.data = newData;
                        than.setData(newData);
                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObj.length, newData.data.list);
                        return {
                            "status": "200",
                            "msg": "新增成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.add, /get|post/i, list);
        },
        update: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var dataObj = than.data1;
                        dataObj = dataObj.data.list;
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);
                        dataObj.forEach(function (val, index, arr) {
                            if (val["id"] == urlObj["id"]) {
                                dataObj[index] = urlObj
                            }
                        });
                        var newData = {
                            "status": "200",
                            "msg": "修改成功",
                            "length": dataObj.length,
                            "data": {
                                list: dataObj
                            }
                        };

                        than.data = newData;
                        than.setData(newData);

                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObj.length, newData.data.list);
                        return {
                            "status": "200",
                            "msg": "修改成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.update, /get|post/i, list);
        },
        del: function () {
            var than = this;
            var list = function (options) {
                var dataObj = than.data1;
                dataObj = dataObj.data.list;
                var dataArr = [];
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlOjb = dosc.setCuttingExtend(str);
                        dataObj.forEach(function (val, index, arr) {
                            if (urlOjb.id.indexOf(val.id) == -1) {
                                dataArr.push(val);
                            }
                        });
                        var newData = Mock.mock({
                            "status": "200",
                            "msg": "成功",
                            "data": {
                                list: dataArr,
                                "length": dataArr.length
                            }
                        });
                        than.data = newData;
                        than.setData(newData);
                        var dataA = than.pageData(urlOjb.currentPage, urlOjb.pageSize, dataObj.length, newData.data.list);
                        return {
                            "status": "200",
                            "msg": "删除成功",
                            "data": {
                                list: dataA.data,
                                "length": dataA.length
                            }
                        };
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.del, /get|post/i, list);
        },
        detail: function () {
            var than = this;

            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var dataObj = than.data1;
                        dataObj = dataObj.data.list;
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var obj = dosc.setCuttingExtend(str);
                        var Arr = [];
                        for (var i in obj) {
                            dataObj.forEach(function (val, index, arr) {
                                if (val[i] == obj[i]) {
                                    Arr.push(val)
                                }
                            })
                        }
                        return Mock.mock({
                            "status": "200",
                            "msg": "成功",
                            "length": 11,
                            "data": Arr
                        });
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.detail, /get|post/i, list);
        },
        pageData: function (pageNumber, pageSize, length, newData) {
            //页码；条数，原数据
            var than = this;
            var pageA = than.page;
            pageA.currentPage = pageNumber = pageNumber == undefined ? 1 : pageNumber;//页码
            pageA.pageSize = pageSize = pageSize == undefined ? 10 : pageSize;//条数
            pageA.offset = pageNumber = pageNumber == undefined ? 1 : pageNumber;//页码
            pageA.length = length;//总条数
            pageA.data = [];//数据
            var a = (parseInt(pageNumber) - 1) * parseInt(pageSize);
            var b = parseInt(pageNumber) * parseInt(pageSize);
            var dataA = newData;
            var data = dataA;
            for (var i = a; i < b; i++) {
                if (typeof data[i] != "undefined") {
                    pageA.data.push(data[i])
                }
            }

            return pageA;
        },
        page: {
            currentPage: Number,
            pageSize: Number,
            offset: Number,
            length: Number,
            data: []
        }
    },

    //树
    treeData: {
        init: function () {
            this.setData(); //设置数据
            this.list();
            this.add();
            this.delete();//删除
        },
        //请求接口
        ops:{
            list:'getZtreeData/list',
            add:'getZtreeData/add',
            update:'getZtreeData/update',
            delete:'getZtreeData/delete'
        },
        data: function () {

        },
        setData: function (data) {
            var than = this,
                dataA;
            if (data != undefined) {
                dataA = data;
            } else {
                dataA = {
                    "status": "200",
                    "msg": "成功",
                    "length": 10,
                    "data": {
                        "data|20": [
                            {"id|+1": 1, "name": "根节点", "pid": 0, "pName": null, chkDisabled: true, open: true},
                            {"id|+1": 20, "name": "叶子节点", "pid|1-10": 0, "pName": null, checked: true},
                            {"id|+1": 40, "name": "叶子节点1", "pid|20-40": 20, "pName": null, checked: true}
                        ]
                    }
                }
            }
            dataA = Mock.mock(dataA);
            than.data = dataA;
        },
        list: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        return than.data;
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.list, list);
        },
        add: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var dataObj = than.data;
                        dataObj = dataObj.data.data;

                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);//
                        var number = dataObj.length + 1;
                        urlObj.id = number;
                        dataObj.unshift(urlObj);

                        var newData = Mock.mock({
                            "status": "200",
                            "msg": "新增成功",
                            "data": {
                                data: dataObj,
                                "length": dataObj.length
                            }
                        });
                        than.data = newData;
                        than.setData(newData);
                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObj.length, newData.data.list);
                        return {
                            "status": "200",
                            "msg": "新增成功",
                            "data": {
                                data: dataA.data
                            }
                        };
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.add, /get|post/i, list);
        },
        update: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var dataObj = than.data;
                        dataObj = dataObj.data.data;
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlObj = dosc.setCuttingExtend(str);
                        dataObj.forEach(function (val, index, arr) {
                            if (val["id"] == urlObj["id"]) {
                                dataObj[index] = urlObj
                            }
                        });
                        var newData = {
                            "status": "200",
                            "msg": "修改成功",
                            "length": dataObj.length,
                            "data": {
                                data: dataObj
                            }
                        };

                        than.data = newData;
                        than.setData(newData);
                        //return Mock.mock(than.data(data));

                        var dataA = than.pageData(urlObj.currentPage, urlObj.pageSize, dataObj.length, newData.data.list);
                        return {
                            "status": "200",
                            "msg": "修改成功",
                            "data": {
                                data: dataA.data,
                                "length": dataA.length
                            }
                        };
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.update, /get|post/i, list);
        },
        delete: function () {
            var than = this;
            var deleteList = function (options) {
                var dataObj = than.data;
                dataObj = dataObj.data.data;
                var dataArr = [];
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlOjb = dosc.setCuttingExtend(str);
                        var returnObj = {};
                        var parentId = "";
                        dataObj.forEach(function (val, index, arr) {
                            if (urlOjb.id.indexOf(val.id) == -1) {
                                dataArr.push(val);
                            } else if (urlOjb.id == val.id) {

                                if (parseInt(val.pid) == 0 || val.pid == undefined) {
                                    parentId = "根节点不能被删除";
                                }
                            }
                        });
                        if (parentId == "") {
                            returnObj.status = "200";
                            returnObj.msg = "成功!";
                        } else {
                            returnObj.status = "400";
                            returnObj.msg = parentId;
                        }
                        returnObj.data = {
                            list: dataArr
                        };
                        var newData = Mock.mock(returnObj);
                        return newData;
                        break;
                    default:
                        break;
                }
                return deleteList;
            };
            Mock.mock(than.ops.delete, deleteList);
        }
    },

    //表格树
    treeTable: {
        init: function () {
            this.setData(); //设置数据
            this.list();  //列表
            this.delete();  //删除根节点
        },
        ops:{
            list:'gerZtreeTable/list',
            delete:'getZtreeTable/delete'
        },
        data: function () {

        },
        setData: function (data) {
            var than = this,
                dataA;
            if (data != undefined) {
                dataA = data;
            } else {
                dataA = {
                    "status": "200",
                    "msg": "成功",
                    "length": 10,
                    "data": {
                        "data": [{
                            "id": "20170525091439001010",
                            "name": "企业注册",
                            "pId": null,
                            "status": "1",
                            "typecode": "02",
                            chkDisabled: true,
                            checked: true
                        },
                            {
                                "id": "20170814183837000210",
                                "name": "企业登记",
                                "pId": null,
                                "status": "1",
                                "typecode": "111",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170725085455000110",
                                "name": "测试12",
                                "pId": null,
                                "status": "1",
                                "typecode": "11",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170731171011000410",
                                "name": "审批流程",
                                "pId": null,
                                "status": "1",
                                "typecode": "222",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170803133941018010",
                                "name": "单位登记",
                                "pId": null,
                                "status": "1",
                                "typecode": "188",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170804085419000110",
                                "name": "模拟",
                                "pId": null,
                                "status": "1",
                                "typecode": "122",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170922112245000510",
                                "name": "23",
                                "pId": null,
                                "status": "1",
                                "typecode": "03",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170922143810000010",
                                "name": "sdfa",
                                "pId": null,
                                "status": "1",
                                "typecode": "04",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170922145203000110",
                                "name": "64526",
                                "pId": null,
                                "status": "1",
                                "typecode": "34262",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170922155403001610",
                                "name": "333",
                                "pId": null,
                                "status": "1",
                                "typecode": "33354",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170922171750000210",
                                "name": "4441234",
                                "pId": null,
                                "status": "1",
                                "typecode": "44444",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170925163306007510",
                                "name": "23462111",
                                "pId": null,
                                "status": "1",
                                "typecode": "2345",
                                chkDisabled: true,
                                checked: true
                            },
                            {
                                "id": "20170724174119005610",
                                "name": "部门沟通演练",
                                "pId": "20170525091439001010",
                                "status": "1",
                                "typecode": "2"
                            },
                            {
                                "id": "20170809090321000110",
                                "name": "审批模拟（新）测试测试测试测试测试",
                                "pId": "20170525091439001010",
                                "status": "1",
                                "typecode": "110",
                                checked: true
                            },
                            {
                                "id": "20170809105407009210",
                                "name": "测测测测测测测测测测测测测测测测测测",
                                "pId": "20170809090321000110",
                                "status": "1",
                                "typecode": "123",
                                checked: true
                            },
                            {
                                "id": "20170822183437000710",
                                "name": "单事项-部门沟通",
                                "pId": "20170814183837000210",
                                "status": "1",
                                "typecode": "822",
                                checked: true
                            },
                            {
                                "id": "20170925160636007410",
                                "name": "测试数据",
                                "pId": "20170731171011000410",
                                "status": "1",
                                "typecode": "231",
                                checked: true
                            },
                            {
                                "id": "20170925163959007610",
                                "name": "242345",
                                "pId": "20170922112245000510",
                                "status": "1",
                                "typecode": "3625346",
                                checked: true
                            }]
                    }
                }
            }
            dataA = Mock.mock(dataA);
            than.data = dataA;
        },
        list: function () {
            var than = this;
            var list = function (options) {
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        return than.data;
                        break;
                    default:
                        break;
                }
                return list;
            };
            Mock.mock(than.ops.list, list);
        },
        delete: function () {
            var than = this;
            var deleteList = function (options) {
                var dataObj = than.data;
                dataObj = dataObj.data.data;
                var dataArr = [];
                var rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
                switch (rtype) {
                    case 'get':
                        break;
                    case 'post':
                        var str = options.body;
                        str = decodeURIComponent(str);
                        var urlOjb = dosc.setCuttingExtend(str);
                        var returnObj = {};
                        dataObj.forEach(function (val, index, arr) {
                            if (urlOjb["treeId"].indexOf(val.treeId) == -1) {
                                if (parseInt(val.pid) != 0 || val.pid != undefined) {
                                    dataArr.push(val);
                                    returnObj = {
                                        "status": "200",
                                        "msg": "成功",
                                        "data": {
                                            list: dataArr,
                                            "length": dataArr.length
                                        }
                                    }
                                } else {
                                    returnObj = {
                                        "status": "400",
                                        "msg": "根节点不能被删除",
                                        "data": {
                                            list: dataArr,
                                            "length": dataArr.length
                                        }
                                    }
                                }
                            }
                        });
                        var newData = Mock.mock(returnObj);
                        return newData;
                        break;
                    default:
                        break;
                }
                return deleteList;
            };
            Mock.mock(than.ops.delete, deleteList);
        }
    },

    //图表数据
    chartData:{
        init:function () {
            this.lineChartData.init();//折线图
            this.barChartData.init();//柱状图
            this.radarChartData.init();//雷达/蜘蛛网图数据结构
            this.polarareaChartData.init();//极地区域图数据结构
            this.pieChartData.init();//饼图数据结构
            this.doughnutCharData.init();//环形图数据结构
        },
        //折线图
        lineChartData:{
            //图表根据类型，按模块化处理数据
            init:function () {
                this.setData("/lineChart/list");
            },
            setData:function (url) {
                var than=this;
                var data=Mock.mock({
                    "status": "200",
                    "msg": "成功",
                    "length":10,
                    "data": {
                        "labels":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                        "dataA": [1,8,5,2,7,4,9,5,1,7,4,2],
                        "dataB": [6,2,5,2,1,1,2,6,3,5,3,9]
                    }
                });
                Mock.mock(url,data);
            }
        },
        //柱状图
        barChartData:{
            init:function () {
                this.setData("/barChart/list");
            },
            setData:function (url) {
                var than=this;
                var data=Mock.mock({
                    "status": "200",
                    "msg": "成功",
                    "length":10,
                    "data": {
                        "labels":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                        "dataA": [1,8,5,2,7,4,9,5,1,7,4,2],
                        "dataB": [6,2,5,2,1,1,2,6,3,5,3,9],
                    }
                });
                Mock.mock(url,data);
            }
        },
        //雷达/蜘蛛网图数据结构
        radarChartData:{
            init:function () {
                this.setData("/radarChartData/list");
            },
            setData:function (url) {
                var data=Mock.mock({
                    "status": "200",
                    "msg": "成功",
                    "length":10,
                    "data": {
                        "labels":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
                        "dataA": [1,8,5,2,7,4,9,5,1,7,4,2],
                        "dataB": [6,2,5,2,1,1,2,6,3,5,3,9],
                    }
                });
                Mock.mock(url,data);
            }
        },
        //极地区域图数据结构
        polarareaChartData:{
            init:function () {
                this.setData("/polarareaChartData/list");
            },
            setData:function (url) {
                var data=Mock.mock({
                    "status": "200",
                    "msg": "成功",
                    "length":10,
                    "data": [{value : 30,color: "#2dc3e8"},
                        {value : 90, color: "#a0d468"},
                        {value : 24, color: "#7D4F6D"},
                        {value : 58, color: "#ffce55"},
                        {value : 82, color: "#e75b8d"},
                        {value : 8, color: "#fb6e52"}
                    ]
                });
                Mock.mock(url,data);
            }
        },
        //饼图数据结构
        pieChartData:{
            init:function () {
                this.setData("/pieChartData/list");
            },
            setData:function (url) {
                var data=Mock.mock({
                    "status": "200",
                    "msg": "成功",
                    "length":10,
                    "data": [
                        {value: 30, color:"#a0d468"},
                        {value : 50, color : "#e75b8d"},
                        {value : 100, color : "#2dc3e8"}
                    ]
                });
                Mock.mock(url,data);
            }
        },
        //环形图数据结构
        doughnutCharData:{
            init:function () {
                this.setData("/doughnutCharData/list");
            },
            setData:function (url) {
                var data=Mock.mock({
                    "status": "200",
                    "msg": "成功",
                    "length":10,
                    "data": [
                        {value: 30, color:"#a0d468"},
                        {value : 50, color : "#e75b8d"},
                        {value : 100, color : "#2dc3e8"}
                    ]
                });
                Mock.mock(url,data);
            }
        }
    }
};
mockDataInit.init();
