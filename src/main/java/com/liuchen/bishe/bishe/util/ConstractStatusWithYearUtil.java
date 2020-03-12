package com.liuchen.bishe.bishe.util;

import com.liuchen.bishe.bishe.vo.CustomerContractMonthVo;
import com.liuchen.bishe.bishe.vo.CustomerPictureVo;

import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @program: bishe
 * @description: 检查数据库查到的数据的月份是否都有 如果没有补全
 * @author: liuchen
 * @create: 2020-02-23 21:43
 **/
public class ConstractStatusWithYearUtil {



    public static List invoke(List<CustomerContractMonthVo>  list){
        //TODO 判断查找的贷款的月份 是否齐全。 问题：怎么判断？如果是2，3，4 怎么找出剩下的没有的。如果是2。5。7，怎么找出
        /*
        想法：
            1:用标记位置，一个月份对应一个标记为，挨个判断。
            2:还是用string的replace方法 挨个替换，链式替换。替换的时候带上 ,
            3:用list 在里面就删除，剩下的就是不在里面的，提价上去，排序
         */
        ArrayList<Object> objects = new ArrayList<>();
        for (CustomerContractMonthVo vo:
            list ) {
            objects.add(vo.getMonth());
        }
        List month = Arrays.asList(1,2,3,4,5,6,7,8,9,10,11,12);
        ArrayList arrayList = new ArrayList<>(month);
        for (int i = 0; i<objects.size(); i++){
            if(true == arrayList.contains(objects.get(i))){
                arrayList.remove(objects.get(i));
            }
        }
        for (int i = 0; i < arrayList.size();i++){
            CustomerContractMonthVo vo = new CustomerContractMonthVo(0, (int) arrayList.get(i));
            list.add(vo);
        }

        //做排序按照冒泡排序
        for (int i = 0;i<list.size();i++){
            for (int j = 0;j<list.size()-1-i;j++){
                Integer month1 = list.get(j).getMonth();
                Integer month2 = list.get(j + 1).getMonth();
                if(month1 > month2){
                    CustomerContractMonthVo vo = list.get(j);
                    list.set(j,list.get(j+1));
                    list.set(j+1,vo);
                }
            }
        }



        return list;
    }
    
}
