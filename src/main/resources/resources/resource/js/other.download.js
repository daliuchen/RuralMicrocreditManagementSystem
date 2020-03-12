/**
 * Created by zwq on 2019/6/11 0016.
 * 描述：下载图片到本地
 * 参考链接：
 * https://blog.csdn.net/qq_39759115/article/details/82734459
 * 调用方式：
 * downloadIamge.init("https://bootstrap-table.com/favicon.png", "图片名称")
 */
var downloadIamge={
    init:function(imgsrc, name){
        var than=this;
        //this.dataURLtoBlob(imgsrc, name);
        var image=new Image();
        image.setAttribute("crossOrigin","anonymous");
        image.onload=function () {
            var canvas=document.createElement("canvas");
            canvas.width=image.width;
            canvas.height=image.height;
            var context=canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            var _dataURL=canvas.toDataURL("image/png");//得到图片的base64编码数据
            var blob_=than.dataURLtoBlob(_dataURL);//用到Blob是因为图片文件过大时，在一部分浏览器上会下载失败，而Blob不会
            var url={
                name:name||"图片.png",//图片名称不需要加.png后缀名
                src:blob_
            };
            //判断是否是ie
            if(window.navigator.msSaveOrOpenBlob){
                //filename文件名包括扩展名
                navigator.msSaveBlob(url.src,url.name);
            }else {
                var link=document.createElement("a");
                link.setAttribute("href",window.URL.createObjectURL(url.src));
                link.setAttribute('download',url.name+".png");
                document.body.appendChild(link);
                link.click();
            }
        };
        image.src=imgsrc;
    },
    dataURLtoBlob:function (dataUrl) {
        debugger;
        var arr=dataUrl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr =atob(arr[1]),
            n=bstr.length,
            u8arr=new Uint8Array(n);
        while (n--){
            u8arr[n]=bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
};


