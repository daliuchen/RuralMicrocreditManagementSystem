package com.liuchen.bishe.bishe.service;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.ConstractEnum;

import java.util.List;
import java.util.Map;

/**
 * @program: bishe
 * @description: ConstractService
 * @author: liuchen
 * @create: 2020-02-16 10:56
 **/
public interface ConstractService {

    /**
     * 页面初始化分页查找
     * 搜索框查找
     * @param offset
     * @param pageNumber
     * @return
     */
     PageInfo findAllCusotmerByPage(int offset, int pageNumber, String idCard,ConstractEnum constractEnum) throws FindException;


    /**
     * 用户贷款情况折线图显示
     * @param year
     * @return
     */
     Map<String,List<Integer>> findCustomerContractStatusWithMonth(int customerId,String year);




     //已经还款
    void  repayment(String no ,ConstractEnum constractEnum,int assessingOfficerId);




    //查看详细
    Contract getContractByNoAndStatus(String no,ConstractEnum constractEnum) throws FindException;





}
