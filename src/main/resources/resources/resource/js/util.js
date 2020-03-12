/**
 * Created by zwq on 2018/5/24 0024.
 * 功能描述：表单序列化、 限制输入框输入值的大小、两秒消失的提示框、会到顶部，等组件类小工具
 **/

(function ($) {
    /**
     * 功能：表单序列化
     * 调用方式：$("#form1").serializeJson();
     **/
    $.fn.serializeJson = function () {
        var serializeObj = {};
        console.log(this.serializeArray());
        $(this.serializeArray()).each(function () {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };

    /**
     * 限制输入框输入值的大小
     * 调用方式：$(".input-number").maxMinValLimit();
     * **/
    $.fn.maxMinValLimit = function (ops) {
        return this.each(function () {
            var _me = this;
            (ops != undefined) ? ops : ops = {};
            (ops.max != undefined) ? ops.max : ops.max = 100;
            (ops.min != undefined) ? ops.min : ops.min = 0;
            $(_me).on("input propertychange", function () {
                var sef = $(this);
                if (sef.val() > ops.max) {
                    sef.val(ops.max);
                }
                if (sef.val() < ops.min) {
                    sef.val(ops.min);
                }
            })
        })
    };

    /**
     * 功能：两秒消失的提示框
     * 调用方式：$.UIprompt({ text:"请求成功", status:0});
     * status: 0成功; 1提示; 2警告; 3失败
     **/
    $.extend({
        promptMmessage: function (msg) {
            (msg != undefined) ? msg : msg = {};
            (msg.text != undefined) ? msg.text : msg.text = "消息提示";  //提示文字
            (msg.bgColor != undefined) ? msg.bgColor : "red";  //提示消息值，0成功，1提示，2警告，3失败

            var top = (document.body.clientHeight - ($("#uiDialog").height())) / 2;
            var left = (document.body.clientWidth - ($("#uiDialog").width())) / 2;
            var css = "display: block;\n" +
                "    position: absolute;\n" +
                "    top: " + top + "px;\n" +
                "    left: " + left + "px;\n" +
                "    max-width: 400px;\n" +
                "    padding: 10px;\n" +
                "    background-color: #337ab7;\n" +
                "    z-index: 99999999999999999999999;\n" +
                "    color: #fff;\n" +
                "    border-radius: 3px;\n" +
                "    word-wrap: break-word;\n" +
                "    word-break: normal;\n" +
                "    min-width: 200px;\n" +
                "    opacity: 0.7;";
            var html = '<div id="uiDialog" class="ui-dialog-alert" style="' + css + '">' + msg.text + '</div>';
            var obj = window.top.$("#uiDialog");
            if (obj.html() == undefined) {
                window.top.$("body").append(html);
            }
            if (msg.status != undefined) {
                if (msg.status == 0) {
                    window.top.$("#uiDialog").addClass("ui-bg-success");
                } else if (msg.status == 1) {
                    window.top.$("#uiDialog").addClass("ui-bg-info");
                } else if (msg.status == 2) {
                    window.top.$("#uiDialog").addClass("ui-bg-warning");
                } else if (msg.status == 3) {
                    window.top.$("#uiDialog").addClass("ui-bg-dange");
                }
            } else {

            }
            window.setTimeout(function () {
                window.top.$("#uiDialog").remove();
                window.parent.$("#uiDialog").remove();
            }, 2000);

            $("body").on("click", function () {
                window.top.$("#uiDialog").remove();
                window.parent.$("#uiDialog").remove();
            });
            $(document).on("click", function () {
                window.top.$("#uiDialog").remove();
                window.parent.$("#uiDialog").remove();
            })
        }
    })


    /*
    * 功能描述：：回到顶部
    * 调用方式：dom.backTop()
    */
    $.fn.backTop = function () {
        var _me = $(this),
            options = {
                _clientHeight: '',
                _scrollTop: ''
            };

        window.onscroll = function () {
            options._clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            options._scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            if (options._scrollTop >= (options._clientHeight / 2)) {

                $(_me).fadeIn(500)
            } else {

                $(_me).fadeOut(500)
            }
        };
        $(_me).on("click", function () {
            $(document).scrollTop(0);
        });
    };
    $("#backTop").backTop();//调用回到顶部

})(jQuery);
