package com.liuchen.bishe.bishe.util;

import java.util.Date;

/**
 * @program: bishe
 * @description: 编号
 * @author: liuchen
 * @create: 2020-02-17 10:43
 **/
public class NoUtil {

    public static String getNo(String type){
        long time = new Date().getTime();
        int i1 = (int) (Math.random() * 10000000);
        String s = type + time + i1 + "0000000000000000000";
        String substring = s.substring(0, 24);
        return  substring;
    }

}
