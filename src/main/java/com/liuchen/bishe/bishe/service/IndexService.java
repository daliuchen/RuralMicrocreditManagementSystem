package com.liuchen.bishe.bishe.service;

import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.exception.FindException;

import java.util.List;
import java.util.Map;

/**
 * 首页
 */
public interface IndexService {

    /**
     * 按照年份来计算每年的贷款情况 ，map的key有三种，按时还款，逾期，提前还款，map的value是一个长度为12的数组，代表12个月
     * 查询的 字段为 contractStatus
     * @param year  年份
     * @return
     */
     Map<String, List<Integer>> findCustomerContractStatusWithMonth(String year);


    /**
     * 提示面板  具体显示 每一种贷款的数量
     * @param status
     * @return
     */
    int infoContract(String status) throws FindException;


    /**
     * 未处理的贷款申请的数量
     * @return
     * @throws FindException
     */
    int infoLoanApplication() throws FindException;


}
