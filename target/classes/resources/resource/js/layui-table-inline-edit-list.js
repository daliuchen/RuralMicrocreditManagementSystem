/**
 * Created by zwq on 2018/1/19 0019.
 */

//表格相关设置
var tableInlineSet = {
    id: "demo2",
    name: "#demo2",
    toolName: "layui-table", //toolName,工具栏所在主体
    checkboxName: "layui-table", //checkboxName,复选框所在主体
    btnGroup: ".demoTable .layui-btn",
    addBtnName: ".btn-inline-Add", //新增按钮
    delListBtnName: ".btn-inline-del", //批量删除按钮
    save: ".btn-save", //保存按钮
    update: ".btn-td-update",
    del: ".btn-td-del",
    see: ".btn-td-see",
    cancel: ".btn-cancel", //取消按钮
    toolBtnGroupName: "#barInlinDemo",
    addFormColsSet: ["", "", "ID", "username", "sex", "city", "sign", "experience", "score", "classify", "wealth", ""]  //保存的表单结构
};


//url相关请求
var tableInlineUrl = {
    list: "../json/user.json",
    add: "/use/add",
    update: "/use/update",
    getOneData: "/use/getOneDate?id=",
    del: "delList?id="
};

//表格初始化
layui.use('table', function () {
    /**
     * 获取lay_table
     */
    var table = layui.table
        , layer = layui.layer;

    //按钮组的相关
    var $ = layui.$, active = {
        //新增
        getAddData: function () {
            layer.open({
                type: 1,
                title: "新增信息",
                area: ["600px", "600px"],
                content: $("#demo_edit").attr("src", tableInlineUrl.edit + "?type=1"),
                btn: ['保存', '取消'],
                closeBtn: 0,
                yes: function (index, layero) {
                    // alert("弹出的是当前为第几行"+index);
                    // alert("保存");
                    //得到子页面的ifream中的表单对象
                    var update_form = layer.getChildFrame("form", index);
                    update_form.find("#form_demo_save_submit").click();
                },
                end: function () {

                }
            })
        },
        //删除一条数据
        getDelListData: function (delUrl, tableName) {
            var checkStatus = table.checkStatus('demo')
                , data = checkStatus.data;
            //layer.msg('选中了：'+ data.length + ' 个');
            var arr = [];
            if (data.length <= 0) {
                layer.msg('没有选中数据', {
                    icon: 5,
                    time: 3000
                });
            } else {
                arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr.push(data[i].id)
                }
                alert("选中的项目有：" + arr);
                $(".layui-form-checked").closest("tr").remove(); //页面级删除
                // active.getDelListDataRequest(tableInlineUrl.del,arr,tableInlineSet.id); //删除请求
            }
        },
        //删除数据请求
        getDelListDataRequest: function (delUrl, id, tableName) {
            $.ajax({
                url: delUrl + id,
                type: "GET",
                dataType: "json",
                success: function (result) {
                    /**
                     * 关闭询问框
                     */
                    layer.close(global.confirm);
                    if (result.status == 200) {
                        layer.msg(result.msg, {
                            icon: 6,
                            time: 3000
                        });
                        //重新加载表格
                        table.reload(tableName);
                    }
                    else {
                        layer.msg(result.msg, {
                            icon: 5,
                            time: 3000
                        });
                    }
                },
                error: function (result) {
                    layer.msg("服务器出错,请联系管理员", {
                        icon: 5,
                        time: 3000
                    });
                }
            });
        },

    };

    /**
     * 表格数据渲染
     */
    table.render(layui_inline_table.params);

    //工具栏，监听
    //1.table对象，2.layer对象，3.工具栏相关时间，4.工具栏名称
    // tableOperation.toolMonitor(table,layer,tableInlineSet.checkboxName);

    //监听表格复选框选择
    //tableOperation.checkboxMonitor(table,tableInlineSet.checkbox);


    //表格按钮组的相关时间方法，新增、批量删除
    //tableOperation.layuiBtnGroup(active,tableInlineSet.btnGroup);


    //新增
    tableInlineOperation.addData(tableInlineSet.addBtnName, tableInlineSet.addFormColsSet, tableInlineSet.id, table);

    //保存
    tableInlineOperation.save(tableInlineSet.save, table);
    //保存
    tableInlineOperation.update(tableInlineSet.update, table, tableInlineSet.addFormColsSet);


    //查看
    tableInlineOperation.see(tableInlineSet.see, table);

    //取消
    tableInlineOperation.cancel(tableInlineSet.cancel);

});

/**
 * 表格渲染-结构
 */
var layui_inline_table = {
    params: {
        id: tableInlineSet.id,
        elem: '#' + tableInlineSet.id,
        url: tableInlineUrl.list, //数据接口
        method: 'get',
        request: {
            pageName: 'pageNum',
            limitName: 'pageSize'
        },
        response: {
            // statusName : 'status',
            //statusCode : 200,
            // msgName : 'msg',
            //countName : 'total',
            //dataName : 'list'
        },
        /**
         * 修改table.js源码得到的自定义方法,主要解决多层json嵌套无法渲染表格的问题
         */
        beforeRender: function (res) {
            res.total = res.data.total;
            res.list = res.data.list;
        },
        //page : true, //实际项目中放开分页功能
        /**
         * 指定数据列
         */
        cols: [[ //表头
            {type: 'checkbox'}
            , {title: '序号', type: 'numbers'}
            , {field: 'id', title: '编号'}
            , {field: 'username', title: '用户名', width: 80}
            , {field: 'sex', title: '性别', width: 80, sort: true}
            , {field: 'city', title: '城市', width: 80}
            , {field: 'sign', title: '签名', width: 177}
            , {field: 'experience', title: '积分', width: 80, sort: true}
            , {field: 'score', title: '评分', width: 80, sort: true}
            , {field: 'classify', title: '职业', width: 80}
            , {field: 'wealth', title: '财富', width: 135, sort: true}
            , {title: '操作', align: 'center', width: 180, toolbar: tableInlineSet.toolBtnGroupName}
        ]]
    }
};


//tableInlineOperation.addData(addBtnName,form)
//相关操作
var tableInlineOperation = {
    layuiBtnGroup: function (active, btnGroupName) {
        $(btnGroupName).on('click', function () {
            var type = $(this).data('type');
            //alert(type);
            active[type] ? active[type].call(this) : '';
        });
    },
    /*监听工具条*/
    toolMonitor: function (table, layer, toolName) {
        var sef = this;
        //监听工具条
        table.on('tool(' + toolName + ')', function (obj) {
            var data = obj.data;
            if (obj.event === 'detail') {
                var str = 'ID：' + data.id + "<br>" +
                    '姓名：' + data.username + "<br>" +
                    '性别：' + data.sex + "<br>" +
                    '城市：' + data.city + "<br>" +
                    '签名：' + data.sign + "<br>" +
                    '积分：' + data.experience + "<br>" +
                    '评分：' + data.score + "<br>" +
                    '职业：' + data.classify + "<br>" +
                    '财富：' + data.wealth + "<br>";
                layer.open({title: "查看信息", area: ["100px", "350px"], content: str})
            } else if (obj.event === 'edit') {
                var data = obj.data;
                var id = data.id;
                console.log(data.experience);
                layer.open({
                    type: 1,
                    title: "修改信息",
                    area: ["600px", "600px"],
                    content: $("#demo_edit").attr("src", tableInlineUrl.edit + "?type=2&id=" + id),
                    btn: ['保存', '取消'],
                    closeBtn: 0,
                    yes: function (index, layero) {
                        // alert("弹出的是当前为第几行"+index);
                        // alert("保存");
                        //得到子页面的ifream中的表单对象
                        var update_form = layer.getChildFrame("form", index);
                        update_form.find("#form_demo_save_submit").click();
                    },
                    end: function () {

                    }
                })

                //回填表单
                sef.fileForm(data);//实际项目中应该是在fomr.js中获取当前数据的id，发送一个ajax请求，获取到当前行的数据，然后再回填表单
                //此处，只是模拟回填表单，实际项目中不用调用此方法

            } else if (obj.event === 'del') {
                layer.confirm('真的删除行么', function (index) {
                    obj.del(); //页面级别删除
                    layer.close(index);
                });
            } else if (obj.event == "save") {
                alert("123");
            }
        });
    },
    /*监听表格复选框选择*/
    checkboxMonitor: function (table) {
        table.on('checkbox(layui-table)', function (obj) {
            console.log(obj)
        });
    },
    /*回填表单*/
    fileForm: function (data) {
        //在父页面调用表单回填的方法，需要在iframe加载完成后执行
        $("#demo_edit")[0].onload = function () {
            var _dom = $($("#demo_edit").contents().find("#form_demo"));
            dosc.fillDataForm(_dom, data);
        }
    },
    //新增
    addData: function (addBtnName, formCols, tableName, table) {
        $("body").off("click", addBtnName).on("click", addBtnName, function () {
            var _trForm = "<tr class='tr-form'>";
            var _trFormLast = "";
            for (var i = 0; i < formCols.length; i++) {
                if (formCols[i] == "") {
                    if (i == 0) {
                        _trForm += '<td data-field="0"><div class="layui-table-cell laytable-cell-1-0 laytable-cell-checkbox"><input type="checkbox" name="layTableCheckbox" lay-skin="primary"><div class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon"></i></div></div></td>';
                    }
                    if (i == 1) {
                        _trForm += '<td data-field="1"><div class="layui-table-cell laytable-cell-1-1 laytable-cell-numbers">0</div></td>';
                    }
                    if (i == (formCols.length - 1)) {
                        _trFormLast += '<td data-field="11" align="center" data-off="true"><div class="layui-table-cell laytable-cell-1-11">' +
                            '<a class="layui-btn layui-btn-xs btn-save" lay-event="save">保存</a> ' +
                            '<a class="layui-btn layui-btn-danger layui-btn-xs  btn-cancel">取消</a> ' +
                            '</div></td>';
                    }
                } else {
                    _trForm += '<td><input type="text" name="' + formCols[i] + '" lay-verify="title" autocomplete="off" class="layui-input"></td>';
                }
            }
            _trForm += _trFormLast + '</tr>';
            $("#" + tableName).next().find(".layui-table").find("tbody").prepend(_trForm);
        });
    },
    //保存
    save: function (btnSaveName, table) {
        var sef = this;
        $("body").off("click", btnSaveName).on("click", btnSaveName, function () {
            var formJson = {};
            var unNullformJson = {};
            $(".tr-form td .layui-input").each(function (index, val, arr) {
                var _val = $(val).val();
                var _name = $(val).attr("name");
                //alert(_val);
                formJson[_name] = _val;
                if (_val != "") {
                    unNullformJson[_name] = _val;
                }
            });
            //alert(JSON.stringify(formJson));  //保存的数据格式
            //alert(JSON.stringify(unNullformJson));  //保存的数据格式，没填的字段不传
            layer.open({title: "保存的数据如下", area: ["100px", "350px"], content: JSON.stringify(unNullformJson)});

            //调用表格刷新方法
            //table.render(layui_inline_table.params);

            //调用保存请求
            // sef.saveRequest(unNullformJson);


            sef.saveFun(); //模拟表格保存后的效果，由于只是页面级别的模拟，所以此处调用此方法，
                           // 真实项目中不需要调用此方法，直接调用表格的刷新方法就好
        })
    },
    //保存后的预览效果，由于此处只做效果模拟，实际项目中并不需要此方法，直接调用表格的刷新方法
    saveFun: function () {
        $(".tr-form td .layui-input").each(function () {
            var val = $(this).val();
            $(this).closest("td").html('<div class="layui-table-cell laytable-cell-1-experience">' + val + '</div>');
            $(this).remove();
        });
        $(".tr-form td:last").html('<div class="layui-table-cell laytable-cell-1-11"> <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a> <a class="layui-btn layui-btn-xs btn-td-update">编辑</a> <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a> </div>');
    },
    //保存的ajax
    saveRequest: function () {
        $.ajax({
            type: "GET",
            url: url,
            data: data,
            contentType: "application/json",
            success: function (data) {
                if (data.status == 200) {
                    $.UIprompt({text: data.msg, status: 0});
                    window.setTimeout(function () {
                        window.top.$("#uiDialog").remove();
                    }, 1000);
                    //重新加载表格
                    $(tableName).bootstrapTable('refresh');//刷新table

                    $(btnAdd).removeAttr("disabled");
                } else {
                    $.UIprompt({text: data.msg, status: 3});
                }
            },
            error: function (data) {
                $.UIprompt({text: "请求失败！", top: "50", time: "3000", status: 3});
            },
            complete: function (XMLHttpRequest, textStatus) {

            }
        });
    },
    see: function (btnSee) {
        $("body").off("click", btnSee).on("click", btnSee, function () {
            //alert("123");
        })
    },
    update: function (btnUpdate, table, formCols) {
        $("body").off("click", btnUpdate).on("click", btnUpdate, function () {
            $(this).closest("tr").find("td").each(function (index,val,arr) {
                var _me = $(val);
                var _text = _me.text();
                // for (var i = 0; i < formCols.length; i++) {
                //
                //     if (formCols[i] != "") {
                //         console.log(formCols[i]);
                //         _me.html('<input type="text" name="' + formCols[i] + '" lay-verify="title" autocomplete="off" class="layui-input" value="' + _text + '">');
                //     } else if (formCols[i] == "") {
                //
                //     }
                // }
                if(formCols[index] != ""){
                    _me.html('<input type="text" name="' + formCols[index] + '" lay-verify="title" autocomplete="off" class="layui-input" value="' + _text + '">');
                }else {

                }
                if (_me.index() == 0) {
                    _me.html('<div class="layui-table-cell laytable-cell-1-0 laytable-cell-checkbox"><input type="checkbox" name="layTableCheckbox" lay-skin="primary"><div class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon"></i></div></div>');
                }

                if (_me.index() == (formCols.length - 1)) {
                    _me.closest("tr").addClass("tr-form");
                    _me.html('<td data-field="11" align="center" data-off="true"><div class="layui-table-cell laytable-cell-1-11">' +
                        '<a class="layui-btn layui-btn-xs btn-save" lay-event="save">保存</a> ' +
                        '<a class="layui-btn layui-btn-danger layui-btn-xs  btn-cancel">取消</a> ' +
                        '</div></td>')
                }

            });
        })
    },
    cancel: function (btnCancel) {
        $("body").off("click", btnCancel).on("click", btnCancel, function () {

        });
    }

};