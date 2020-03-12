/**
 * Created by zwq on 2017/7/27 0006.
 */
var s=0;
check();
function check(){
    s=s+1;
    if(s<=100){
        var ss=1000;
        $(".progress-load .progress-bar").text(s+"%");
        $(".progress-load .progress-bar").css("width",s+"%");
        setTimeout("check()",ss)
    }
};
