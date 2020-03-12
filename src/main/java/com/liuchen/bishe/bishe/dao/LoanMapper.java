package com.liuchen.bishe.bishe.dao;

import com.liuchen.bishe.bishe.entry.LoanApplication;
import com.liuchen.bishe.bishe.myEnum.LoanStatusEnum;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface LoanMapper {

    /**
     * 添加贷款
     * @param loan
     */
     void addLoan(@Param("loan") LoanApplication loan);

    /**
     * 根据id来查找
     * @param id
     * @return
     */
     List<LoanApplication> findLoanByCustomerId(int id);

    /**
     * 根据合同号 更新状态
     * @param no
     * @param status
     */
     void upDateStatusByNo(@Param("no") String no,@Param("status") String status);


    /**
     * 通过idCard和status来查找  两者可为空
     * @param customerId
     * @param status
     * @return
     */
     List<LoanApplication> findLoanApplicationByIdCardAndStatus(@Param("customerId") int customerId,@Param("status") String status);


    /**
     * 通过查找
     * @param no
     * @param status
     * @return
     */
     List<LoanApplication> findLoanByNoAndStatus(@Param("no") String no, @Param("status") String status);


    /**
     * 根据 申请号码，更新贷款的状态
     * @param no
     * @param status
     */
     void updateLoanApplication(String no,String status);


    /**
     * 通过id查找loanapplication
     * @param id
     * @return
     */
     LoanApplication getLoanApplicationById(int id);


}
