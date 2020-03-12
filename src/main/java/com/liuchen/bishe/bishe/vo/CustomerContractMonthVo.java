package com.liuchen.bishe.bishe.vo;

import java.io.Serializable;

/**
 * @program: bishe
 * @description: 用户贷款情况折线图实体对象
 * @author: liuchen
 * @create: 2020-02-23 21:17
 **/
public class CustomerContractMonthVo implements Serializable {
    private  Integer count;
    private  Integer month;

    public CustomerContractMonthVo(){}

    public CustomerContractMonthVo(Integer count, Integer month) {
        this.count = count;
        this.month = month;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    @Override
    public String toString() {
        return "CustomerContractMonth{" +
                "count=" + count +
                ", month=" + month +
                '}';
    }
}
