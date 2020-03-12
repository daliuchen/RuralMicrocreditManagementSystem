package com.liuchen.bishe.bishe.service;

import com.github.pagehelper.PageInfo;
import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.exception.FindException;
import com.liuchen.bishe.bishe.myEnum.LoanStatusEnum;

import java.util.List;

public interface LoanService {


        /**
         * 用户登陆 之后 申请贷款
         * @param money
         * @param year
         * @param loanPeople
         * @param idCard
         * @param customerId
         */
        public void addLoan(double money,String year,String loanPeople,String idCard,int customerId);


        /**
         * 用户登陆之后 根据id来查找。显示我的贷款
         * * @param offset
         * @param limit
         * @param customerId
         * @return
         */
        public PageInfo findMyLoanApplication(int offset, int limit, int customerId) throws FindException;


        /**
         * 撤销贷款
         * @param no
         */
        public void backMyLoan(String no);


        /**
         * 通过 申请的状态来查找loan
         * @param offset
         * @param limit
         * @param statusEnum
         * @return
         * @throws FindException
         */
        public PageInfo findLoanApplicationByStatus(int offset, int limit, String idCard, LoanStatusEnum statusEnum) throws FindException;


        /**
         * 通过贷款号或者status 查找，可为null
         * @param no
         * @param loanStatusEnum
         * @return
         */
        public List<LoanApplication> findLoanByNoAndStatus(String no, LoanStatusEnum loanStatusEnum) throws FindException;


        /**
         * 贷款申请通过
         * @param no
         */
        public void agreeloanApplication(String no);




        /**
         * 贷款申请不通过
         * @param no
         */
        public void notAgreeloanApplication(String no);



}
