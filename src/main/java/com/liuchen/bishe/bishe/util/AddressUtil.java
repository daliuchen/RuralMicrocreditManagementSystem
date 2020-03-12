package com.liuchen.bishe.bishe.util;

import com.liuchen.bishe.bishe.dao.AddressMapper;
import com.liuchen.bishe.bishe.vo.AddressVo;
import com.sun.tools.internal.xjc.reader.xmlschema.bindinfo.BIConversion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sun.jvm.hotspot.debugger.Address;

import java.util.ArrayList;
import java.util.List;

/**
 * @program: bishe
 * @description: 地址切分util
 * @author: liuchen
 * @create: 2020-02-09 21:04
 **/


public class AddressUtil {



    public static String spellingAddress(String... addressList){

        StringBuffer stringBuffer = new StringBuffer();
        for (String address:addressList) {
            stringBuffer.append(address).append(",");
        }
        String s = stringBuffer.toString();
        return  s.substring(0,s.lastIndexOf(","));
    }


    public static List<Integer> dismantlingAddress(String addressList){
        ArrayList<Integer> list = new ArrayList<>();
        String[] split = addressList.split(",");
        for (String s : split) {
            int i = Integer.parseInt(s);
            list.add(i);
        }
        return list;
    }






}
