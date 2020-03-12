package com.liuchen.bishe.bishe.vo;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @program: bishe
 * @description: 贷款最大年份
 * @author: liuchen
 * @create: 2020-02-16 20:39
 **/
public class LoanMaxYearVo implements Serializable {
        private Integer id;
        private BigDecimal money;
        private Integer maxYear;

        public LoanMaxYearVo(){}

    public LoanMaxYearVo(Integer id, BigDecimal money, Integer maxYear) {
        this.id = id;
        this.money = money;
        this.maxYear = maxYear;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public Integer getMaxYear() {
        return maxYear;
    }

    public void setMaxYear(Integer maxYear) {
        this.maxYear = maxYear;
    }

    @Override
    public String toString() {
        return "LoanMaxYear{" +
                "id=" + id +
                ", money=" + money +
                ", maxYear=" + maxYear +
                '}';
    }
}
