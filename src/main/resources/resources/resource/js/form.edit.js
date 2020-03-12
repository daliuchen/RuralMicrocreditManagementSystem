/**
 * Created by zwq on 2017/7/6 0006.
 * 功能：扩展表单
 * 功能描述：
 */
$(function(){
    new rightMenuFun();
});

function rightMenuFun(){
    this.init();
}
rightMenuFun.prototype={
    init:function(){
        this.bind();
        this.changerInput();
    },
    //新增编辑框的扩展
    bind:function(){
        var than=this;
        //增加编辑框
        $("body").on("click",".addButton",function(){
            var index=$(this).data("index");
            if(!index){
                index=1;
                $(this).data("index",1)
            }
            index++;
            $(this).data("index",index);
            var template=$(this).attr("data-template"),
                $templateEle=$("#"+template+'Template'),
                $row=$templateEle.clone().removeAttr("id").insertBefore($templateEle).removeClass("hide"),
                $el=$row.find("input").eq(0).attr("name",template);

            if ('checkbox' == $el.attr('type') || 'radio' == $el.attr('type')) {
                $el.parent().find('span.lbl').html('选项' + index);
            } else {
                $el.attr('placeholder', 'Textbox #' + index);
            }

            $row.on("click",".removeButton",function(e){
                $row.remove();
            })
        });
    },
    //显示隐藏表单的扩展
    changerInput:function(){
        $("body").on("change","input[type='checkbox'][name='receiver']",function(){
            var sameAsSender=$(this).is(":checked");
            if(sameAsSender){
                $('#receiverInfo').hide();
            }else{
                $('#receiverInfo').show();
            }
        });
    }
};
