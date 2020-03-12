/**
 * Created by zwq on 2017/7/6 0006.
 */
$(function(){
    new datatables();
});

function datatables(){
    this.init();
}
datatables.prototype={
    init:function(){
        this.initSimpleDatatable();
        this.initCheckedAll();
    },
    initSimpleDatatable:function(){
        var oTable = $('#simpledatatable').dataTable({
            "sDom": "Tflt<'row DTTTFooter'<'col-sm-6'i><'col-sm-6'p>>",
            "iDisplayLength": 5,
            "language": {
                "sProcessing": "处理中...",
                "sLengthMenu": " _MENU_ ",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            "aoColumns": [
                {
                    "bSortable": false
                },
                null,
                { "bSortable": false },
                null,
                { "bSortable": false }
            ],

            "aaSorting": []
        });


    },
    initCheckedAll:function(){
         $('#simpledatatable').wrapAll("<div class='table-responsive-scroll'></div>");
        $("table").each(function(){
            var $this=$(this);
            var _thead=$this.find("thead").find("input[type=checkbox]");
            var _tbody=$this.find("tbody").find("input[type=checkbox]");

            $(_thead).change(function(){
                var set=$(this).is(":checked");
                _tbody.prop("checked",set);
            })
        })

    }
}
