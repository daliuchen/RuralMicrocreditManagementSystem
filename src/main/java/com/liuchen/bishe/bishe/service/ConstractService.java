package com.liuchen.bishe.bishe.service;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.Contract;
import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.exception.DeleteException;
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


    /**
     * 已经还款
     * @param no        合同编号
     * @param constractEnum     合同状态
     * @param assessingOfficerId    操作员id
     */
    void  repayment(String no ,ConstractEnum constractEnum,int assessingOfficerId);


    /**
     * 查看合同详细
     * @param no            合同编号
     * @param constractEnum 合同状态
     * @return        Contract  合同对象
     * @throws FindException
     */
    Contract getContractByNoAndStatus(String no,ConstractEnum constractEnum) throws FindException;


    /**
     * 删除合同通过no
     * @param no        合同no
     * @throws DeleteException
     */
    void deleteContractByNo(String no) throws DeleteException;


    /**
     * 增加合同
     * @param loanApplication 贷款申请
     */
    void addContract(LoanApplication loanApplication,int assessingOfficerId);



}
