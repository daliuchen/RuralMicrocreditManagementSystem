/**
 * Created by zwq on 2018/6/25 0025.
 * 功能：ztree树相关操作
 */

//ztree相关配置初始化
var ztreeFun={
    opts:{
        zTree:null,
        value:null,
        key:null,
        nodeList:[],
        lastValue:"",
        fontCss:{},
        zNodes:null,
        newCount:1,
        editZtreeNode:false
    },
    init:function(zTreeOjb){
        var sef=this;
        (zTreeOjb != undefined) ? zTreeOjb: zTreeOjb = {};//设置参数对象
        (zTreeOjb.ztreeId != undefined) ? zTreeOjb.ztreeId: zTreeOjb.ztreeId = ""; //ztree节点ID
        (zTreeOjb.ztree != undefined) ? zTreeOjb.ztree: zTreeOjb.ztree = ""; //ztree节点ID
        (zTreeOjb.ztreeSearchInput != undefined) ? zTreeOjb.ztreeSearchInput: zTreeOjb.ztreeSearchInput = ""; //ztree节点ID
        (zTreeOjb.ztreeSearchInputBtn != undefined) ? zTreeOjb.ztreeSearchInputBtn: zTreeOjb.ztreeSearchInputBtn = "j"; //ztree节点ID
        (zTreeOjb.url != undefined) ? zTreeOjb.url: zTreeOjb.url = ""; //ztree节点ID
        ztreeFun.opts.editZtreeNode =(zTreeOjb.editZtreeNode != undefined) ? zTreeOjb.editZtreeNode: zTreeOjb.editZtreeNode = false; //ztree节点ID
        ztreeFun.getData(zTreeOjb);
    },
    //数据
    getData:function(zTreeOjb1){
        var sef=this;
        var data=[];
        $.ajax({
            type: "post",
            url: zTreeOjb.url,
            dataType: 'JSON',
            async: true,
            success: function(data) {
                var  data=data;
                data=data.data;
                if(data.data!=undefined){
                    data=data.data;
                }
                console.log(zTreeOjb.url);
                console.log(data);
                /*typeof callBack === 'function' && callBack(data);*/
                sef.ztreeInit(data,zTreeOjb1);
            },
            error: function(e) {

            }
        });
        return data;
    },
    //初始化
    ztreeInit:function(data,zTreeOjb){
        var setting = {
            check: {
                enable: true
            },
            data: {
                key: {
                    title: "t"
                },
                simpleData: {
                    enable: true,
                    pIdKey:'pid'
                }
            },
            view: {
                fontCss: ztreeFun.getFontCss,
                addHoverDom: addHoverDom,
                removeHoverDom:removeHoverDom
            },
            callback: {
                beforeClick: ztreeFun.beforeClick,
                onClick: ztreeFun.onClick,
                beforeDrag: beforeDrag,
                onMouseover:ztreeFun.mouseoverFun,
                onMouseDown: ztreeFun.onMouseDown
            }
        };
        ztreeFun.opts.zNodes=data;
        $(document).ready(function(){
            $.fn.zTree.init($(zTreeOjb.ztreeId), setting, ztreeFun.opts.zNodes);
            ztreeFun.opts.key = $(zTreeOjb.ztreeSearchInput);
            $(zTreeOjb.ztreeSearchInputBtn).click(function(){
                ztreeFun.searchNode();
            });
        });

        function addHoverDom(treeId, treeNode) {
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
            var addStr = "<span class='btn btn-set' id='addBtn_" + treeNode.tId
                + "' title='add node' onfocus='this.blur();'></span>";
            sObj.after(addStr);
            var btn = $("#addBtn_"+treeNode.tId);
            if (btn) btn.bind("click", function(e){
                var ev=e||event;
                var winX=ev.clientX;
                var winY=ev.clientY;
                var dom=$("#editTreeNode");
                dom.attr("data-id",treeNode.id).attr("data-pid",treeNode.pid).show().css({"top":(winY)+"px","left":winX+"px"});
                //新增的点击事件
               // var zTree = $.fn.zTree.getZTreeObj(zTreeOjb.ztree);
                //zTree.addNodes(treeNode, {id:(100 + ztreeFun.opts.newCount), pId:treeNode.id, name:"new node" + (ztreeFun.opts.newCount++)});
                return false;
            });
        };
        function  removeHoverDom(treeId, treeNode) {
            //alert("鼠标移除");
            ///alert(treeNode.tId);
            $("#addBtn_"+treeNode.tId).unbind().remove();
        }
        function showRemoveBtn(treeId, treeNode) {
            return !treeNode.isFirstNode;
        }
        function showRenameBtn(treeId, treeNode) {
            return !treeNode.isLastNode;
        }
        function beforeDrag(treeId, treeNodes) {
            return false;
        }
    },
    //改变搜索后的节点
    updateNodes:function(highlight){
        ztreeFun.opts.zTree = $.fn.zTree.getZTreeObj(zTreeOjb.ztree);
        for( var i=0, l=ztreeFun.opts.nodeList.length; i<l; i++) {
            ztreeFun.opts.nodeList[i].highlight = highlight;
            ztreeFun.opts.zTree.updateNode(ztreeFun.opts.nodeList[i]);
        }
    },
    //文字样式
    getFontCss:function (treeId, treeNode) {
        return (!!treeNode.highlight) ? {color:"#1a95ff", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
    },
    //查找节点
    searchNode:function () {
        ztreeFun.opts.zTree = $.fn.zTree.getZTreeObj(zTreeOjb.ztree);
        ztreeFun.opts.value = $.trim(ztreeFun.opts.key.get(0).value);
        if (ztreeFun.opts.lastValue === ztreeFun.opts.value) return;
        ztreeFun.opts.lastValue = ztreeFun.opts.value;
        if (ztreeFun.opts.value === "") return;
        ztreeFun.updateNodes(false);
        ztreeFun.opts.nodeList = ztreeFun.opts.zTree .getNodesByParamFuzzy("name", ztreeFun.opts.value);
        ztreeFun.updateNodes(true);
        if($(".ui-ztree-search-number").length==0){
            $(zTreeOjb.ztreeId).before("<div class='ui-ztree-search-number'>共找到<span style='color: #1a95ff;font-weight:bold'> "+ztreeFun.opts.nodeList.length+" </span>条相关数据</div>");
        }
    },
    //点击节点前
    beforeClick:function (treeId, treeNode) {
        return !treeNode.isParent;//当是父节点 返回false 不让选取
        //alert("点击节点前");
    },
    //点击节点
    onClick:function (event, treeId, treeNode, clickFlag) {
        if(zTreeOjb.zTreeOjbonClickFun!=undefined){
            zTreeOjb.zTreeOjbonClickFun(treeNode);
        }
    },
    mouseoverFun:function (event, treeId, treeNode, clickFlag) {
        alert("mouseoverFun");
        alert(treeNode.pid);
        alert(treeNode.id);
    },
    onMouseDown:function (event, treeId, treeNode, clickFlag) {
        //alert("鼠标按下去事件");
        //alert(treeNode.pid);
        //alert(treeNode.id);
    }
};


var zTreeOjb={
    ztreeId:"#treeDemo",
    ztree:"treeDemo",
    ztreeSearchInput:"#key",
    ztreeSearchInputBtn:".btn1",
    url:"getZtreeData/list",
    zTreeOjbonClickFun:function (obj) {
        //alert("选中的节点id是："+obj.id)
    },
    editZtreeNode:true

};
ztreeFun.init(zTreeOjb);


//针对树的新增、编辑、查看、删除等相关操作
var obj={
    url:{
       list:"getZtreeData/list", //获取树数据
       add:"getZtreeData/add", //新增
       update:"getZtreeData/update", //修改
       detail:"getZtreeData/detail", //详情
       delete:"getZtreeData/delete" //删除
    },
    opt:{
        title:{
            add:"新增树节点",
            update:"编辑树节点"
        },
        itemList:"#editTreeNode",
        formName:"#myModal",
        states:""
    },
    init:function(){
        //新增编辑删除相关操作
        this.setTree();
        //保存相关操作
        this.saveBind();
    },
    //
    setTree:function () {
        var than=this,
            itemBox=than.opt.itemList;
        $(itemBox+" .list-group-item").click(function () {
            var me=$(this);
            var ztreeId=$("#editTreeNode").attr("data-id");
            var ztreePId=$("#editTreeNode").attr("data-pid");
            than[me.attr("id")+"Tree"](ztreeId,ztreePId);
        })
    },
    //新增
    addTree:function(){
        debugger
        var than=this,
            formName=than.opt.formName,
            str=than.opt.title.add,
            temBox=than.opt.itemList;
            than.opt.states="add";
        $(formName+" input[type=text]").val();
        $(formName).find(".modal-title").html(str);
        $(formName).modal('show');
        $(temBox).hide();
    },
    //修改
    updateTree:function (ztreeId) {
        var than=this,
            formName=than.opt.formName,
            str=than.opt.title.add,
            temBox=than.opt.itemList;
        than.opt.states="update";
        $(formName+" input[type=text]").val();
        $(formName).find(".modal-title").html(str);
        $(formName).modal('show');
        $(temBox).hide();
        than.detailTree();
        than.detail({"id":ztreeId});//查看详情
    },
    //详情
    detailTree:function(){

    },
    //保存
    saveBind:function(){
        var than=this,
            formName=than.opt.formName;
        url="",
        data={};
        $(".btn-save").on("click",function () {
            if(than.opt.states=="add"){
                url=than.url.add;
            }else if(than.opt.states=="update"){
                url=than.url.update;
            }
            data={};
            $(formName+" form [name]").each(function (index,val,arr) {
                var dom=$(val);
                data[dom.attr("name")]=dom.val()
            });
            than.saveQuest(url,data);
        });
    },
    //保存
    saveQuest:function(url,data){
        var than=this;
        $.ajax({
            type: "post",
            url: url,
            dataType: 'JSON',
            async: true,
            data:data,
            success: function(data) {
                var  data=data;
                debugger
                if(data.status=="200"){
                    $.promptMmessage({ text:data.msg, status:0});
                }else {
                    $.promptMmessage({ text:data.msg, status:3});
                }
            },
            error: function(e) {

            }
        });
    },
    //删除节点
    deleteTree:function (ztreeId,ztreePId) {
        var than=this,
            formName=than.opt.formName,
            str=than.opt.title.add,
            url=than.url.delete,
            temBox=than.opt.itemList;
        $(temBox).hide();
        $.ajax({
            type: "post",
            url: url,
            dataType: 'JSON',
            async: true,
            data:{
                id:ztreeId
            },
            success: function(data) {
                var  data=data;
                debugger
                if(data.status=="200"){
                    $.promptMmessage({ text:data.msg, status:0});
                }else {
                    $.promptMmessage({ text:data.msg, status:3});
                }
            },
            error: function(e) {

            }
        });
    },
    //查看详情-编辑框数据回显
    detail:function (data) {
        var than=this;
        dosc.getOneListCallBack({
            data:data,
            type:"post",
            url:than.url.detail
        },function (obj) {
            dosc.fillDataForm(than.opt.forms+" form",obj.data[0]);
        })
    },
};
obj.init();