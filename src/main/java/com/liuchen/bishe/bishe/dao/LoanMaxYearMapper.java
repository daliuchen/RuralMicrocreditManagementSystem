package com.liuchen.bishe.bishe.dao;

import com.liuchen.bishe.bishe.vo.LoanMaxYearVo;

import java.math.BigDecimal;
import java.util.List;

public interface LoanMaxYearMapper {

    public List<LoanMaxYearVo> findByMoney(BigDecimal money);


}
